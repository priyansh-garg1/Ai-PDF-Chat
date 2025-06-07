import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function WorkspaceHeader({ fileName }) {
  return (
    <div className="px-4 py-3 flex justify-between items-center bg-white shadow-md">
      <Link href={"/"}>
        <div className="w-32 h-10 flex items-center justify-center">
          <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
        </div>
      </Link>
      <h2 className="font-bold">{fileName}</h2>
      <UserButton />
    </div>
  );
}

export default WorkspaceHeader;
