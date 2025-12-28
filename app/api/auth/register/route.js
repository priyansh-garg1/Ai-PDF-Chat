import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { email, password, fullName, phoneNo } = await req.json();

    if (!email || !password || !fullName) {
      console.error("Missing fields:", { email, fullName, hasPassword: !!password });
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      fullName,
      phoneNo,
    });

    // Create JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie
    const cookie = serialize("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          imageUrl: user.imageUrl,
        },
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (error) {
    console.error("Registration error details:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error: " + error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
