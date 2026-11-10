import { prisma } from "@/lib/prisma";
import generateOtp from "@/utils/generateOtp";
import sendEmail from "@/utils/sendEmail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        {
          message: "Email is required",
        },
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
          message: "User not found",
        },
        { status: 400 },
      );
    }

    // Generate OTP
    const otp = generateOtp();

    // OTP expires after 5 minuts
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Save Otp in databse
    await prisma.user.update({
      where: {
        email,
      },

      data: {
        otp,
        otpExpiresAt,
      },
    });

    // Send OTP email
    await sendEmail(email, otp);

    return NextResponse.json(
      {
        message: "OTP sent successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Send OTP error:", error);

    return NextResponse.json(
      {
        message: "Faild to send otp",
      },
      { status: 500 },
    );
  }
}
