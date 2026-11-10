import { generateAccessToken, generateRefreshToken } from "@/lib/generateToken";
import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function register(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      throw new ApiError(400, "Please provide your all detials.");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError(409, "User with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    const updatedUser = await prisma.user.update({
      where: {
        id: newUser.id,
      },
      data: { refreshToken: refreshToken },
    });

    const cookieStore = await cookies();

    const SEVEN_DAYS_AND_FIVE_MINS = 7 * 24 * 60 * 60 + 5 * 60;

    // Send Access Token to cookie (Expire in 15 minute)
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60,
    });

    // Send Refresh Token to cookie (Expire in 7 days + 5 minute*)
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: SEVEN_DAYS_AND_FIVE_MINS,
    });

    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(
      {
        success: true,
        message: "User register successfully!",
        user: userWithoutPassword,
      },
      { status: 201 },
    );
  } catch (error: any) {
    const statusCode = error.statusCode || 500;

    return NextResponse.json(
      {
        success: false,
        message: error.message || "internal Server Error.",
      },
      { status: statusCode },
    );
  }
}
