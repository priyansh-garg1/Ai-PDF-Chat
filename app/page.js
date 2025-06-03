'use client';
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { api } from "../convex/_generated/api";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);
  useEffect(() => {
    if (user) {
      CheckUser();
    }
  }, [user]);
  const CheckUser = async () => {
    const result = await createUser({
      userName: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1>Welcome to AI Notes PDF</h1>
      <p>Your one-stop solution for generating PDF notes using AI.</p>
      <UserButton />
    </div>
  );
}
