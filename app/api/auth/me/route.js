import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

export async function GET(req) {
  try {
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) {
      return new Response(JSON.stringify({ message: "Not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const cookies = parse(cookieHeader);
    const token = cookies.auth_token;

    if (!token) {
      return new Response(JSON.stringify({ message: "Not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return new Response(JSON.stringify({ message: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();
    const user = await User.findById(decoded.userId);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          imageUrl: user.imageUrl,
          phoneNo: user.phoneNo,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Auth check error:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
