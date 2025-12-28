"use client";
import UserButton from "@/components/auth/UserButton";
import UploadPdfDialog from "./UploadPdfDialog";
import { useFiles } from "@/context/FileContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  const { files } = useFiles();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="px-6 py-3 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/logo.png" alt="AI Note PDF" width={32} height={32} />
          <span className="text-base font-medium text-gray-900 hidden sm:block">
            AI Note PDF
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <UploadPdfDialog isMaxFile={files?.length >= 5}>
            <button className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
              Upload PDF
            </button>
          </UploadPdfDialog>
          <UserButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
