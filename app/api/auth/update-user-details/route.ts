import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function updateUserDetials(req: Request) {
  try {
    const body = await req.json();
    const { name, email } = body;

    // Extract user ID from headers (set by my auth middleware) and convert to number
    const userIdHeader = req.headers.get("x-user-id");
    const userId = userIdHeader ? Number(userIdHeader) : null;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login again.",
        },
        { status: 401 },
      );
    }

    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
    });

    // Remove password before sending user object back
    const { password: _, ...userWithoutPassword } = updateUser;

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        user: userWithoutPassword,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Update profile error:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          message: "This email is already registered with another account.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Failed to update profile.",
      },
      { status: 500 },
    );
  }
}
