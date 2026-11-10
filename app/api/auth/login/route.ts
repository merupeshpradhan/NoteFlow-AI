import { ApiError } from "@/utils/ApiError";
import { generateAccessToken, generateRefreshToken } from "@/lib/generateToken";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse JSON body using Next.js Web Request method
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      throw new ApiError(400, "All field are required.");
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ApiError(400, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid email or password");
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const updateUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    const cookieStore = await cookies();

    // Send Access Token to cookie (Expire in 15 mins)
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60,
    });

    const SEVEN_DAYS_AND_FIVE_MINS = 7 * 24 * 60 * 60 + 5 * 60;

    // Send Refresh Token to cookie (Expire in 7 Days + 5 minute)
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: SEVEN_DAYS_AND_FIVE_MINS,
    });

    const { password: _, ...userWithoutPassword } = updateUser;

    return NextResponse.json(
      {
        success: true,
        message: "User login successfully!",
        user: userWithoutPassword,
      },
      { status: 200 },
    );
  } catch (error: any) {
    const statusCode = error.statusCode || 500;

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error.",
      },
      { status: statusCode },
    );
  }
}
