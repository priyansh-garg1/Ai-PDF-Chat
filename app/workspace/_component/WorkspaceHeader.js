"use client";
import UserButton from "@/components/auth/UserButton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function WorkspaceHeader({ fileName, fileId }) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <header className="h-14 px-4 flex items-center justify-between bg-white border-b border-gray-200">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="hidden sm:inline">Back</span>
      </button>

      <div className="flex-1 text-center px-4">
        <h1 className="text-sm font-medium text-gray-900 truncate">
          {fileName || "Untitled Document"}
        </h1>
      </div>

      <UserButton />
    </header>
  );
}

export default WorkspaceHeader;
