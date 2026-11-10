import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const userIdHeader = req.headers.get("x-user-id");

    const userId = userIdHeader ? Number(userIdHeader) : null;

    if (userId) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          refreshToken: null,
        },
      });
    }

    const response = NextResponse.json(
      {
        success: true,
        message: "Logged out successfully.",
      },
      { status: 200 },
    );

    // Clear cookies
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    return response;
  } catch (error: any) {
    const statusCode = error.statusCode || 500;

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error during logout.",
      },
      { status: statusCode },
    );
  }
}
