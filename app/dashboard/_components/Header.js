import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="p-4 flex justify-between items-center bg-white shadow-md">
      <Link href={"/"}>
        <div className="w-32 h-10 flex items-center justify-center">
          <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
        </div>
      </Link>
      <UserButton />
    </div>
  );
}

export default Header;
