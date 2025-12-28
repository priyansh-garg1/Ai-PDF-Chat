import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    // Check if user exists
    let user = await User.findOne({ email: data.email });
    
    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        fullName: data.userName,
        email: data.email,
        imageUrl: data.imageUrl,
        // Since we are using AuthContext/Clerk, we might not need a password here if it's social login
        // But the model says it's required. I'll provide a dummy one if it's missing or update the model.
        password: Math.random().toString(36).slice(-10), 
      });
      await user.save();
    }
    
    return NextResponse.json({ message: "User synced successfully", user });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
