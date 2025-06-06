import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="flex justify-between w-full p-5 shadow-md">
      <Image src="/logo.svg" alt="Logo" width={125} height={40} />

      <UserButton />
    </div>
  );
}

export default Header;
