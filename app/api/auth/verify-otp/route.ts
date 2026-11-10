import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "This email is not registered.",
        },
        { status: 404 },
      );
    }

    // check OTP
    if (user.otp !== otp) {
      return NextResponse.json(
        {
          message: "Invalid OTP",
        },
        { status: 400 },
      );
    }

    // Check OTP expiry
    if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      return NextResponse.json(
        {
          message: "OTP has expired",
        },
        { status: 400 },
      );
    }

    // OTP is correct
    await prisma.user.update({
      where: {
        email,
      },

      data: {
        otp: null,
        otpExpiresAt: null,
      },
    });

    return NextResponse.json(
      {
        message: "OTP verified successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Verify OTP error:", error);

    return NextResponse.json(
      {
        message: "Failed to verify OTP",
      },
      { status: 500 },
    );
  }
}
