import { auth } from "@/auth";
import connectDB from "@/lib/db";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user) {
      return Response.json(
        { message: "user is not authenticated" },
        { status: 401 }
      );
    }

    const user = await User.findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json(
        { message: "user is not found" },
        { status: 404 }
      );
    }

    return Response.json(user, { status: 200 });
  } catch (error) {
    console.error("Get me error:", error);

    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}