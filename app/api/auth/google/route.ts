import { generateAccessToken, generateRefreshToken } from "@/lib/generateToken";
import { prisma } from "@/lib/prisma";
import { OAuth2Client } from "google-auth-library";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    // Verify token with Google
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.json(
        { error: "Invalid Google Token" },
        { status: 400 },
      );
    }

    const { email, name, picture } = payload;

    let user = await prisma.user.findUnique({ where: { email } });

    // Check if user exists in PostgreSQL database via Prisma
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          password: null,
          avatar: picture,
        },
      });
    }

    const accessToken = generateAccessToken(String(user.id));
    const refreshToken = generateRefreshToken(String(user.id));

    // Save refresh token to database
    const updateUser = await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: refreshToken },
    });

    const cookieStore = await cookies();

    // Send Access Token to cookie (Expire in 15 minute)
    cookieStore.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60,
      path: "/",
    });

    // Send Access Token to cookie (Expires in 7 days + 5 mins)
    cookieStore.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 + 300,
      path: "/",
    });

    // Send response back using NextResponse
    return NextResponse.json(
      {
        message: "Google login successful",
        user: updateUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Google Auth Error:", error);
    return NextResponse.json(
      { error: "Google authentication faild" },
      { status: 400 },
    );
  }
}
