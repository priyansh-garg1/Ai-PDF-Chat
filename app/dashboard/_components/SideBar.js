"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield } from "lucide-react";
import Image from "next/image";
import React, { use } from "react";
import UploadPdfDialog from "./UploadPdfDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideBar() {
  const { user } = useUser();
  const path = usePathname();

  const fileList = useQuery(api.pdfStorage.getAllFiles, {
    userEmail: user?.emailAddresses[0]?.emailAddress || "",
  });
  return (
    <div className="shadow-md h-screen p-7">
      <div className="">
        <Link href={"/dashboard"}>
        <div
          className={
            "mt-10 flex items-center gap-2 text-lg font-semibold p-3 rounded-2xl" +
            (path === "/dashboard" ? " bg-gray-200" : "")
          }
        >
          <Layout />
          <h2>Workspace</h2>
        </div>
        </Link>
        <Link href={"/dashboard/upgrade"}>
        <div
          className={
            "mt-2 flex items-center gap-2 text-lg font-semibold p-3 rounded-2xl" +
            (path === "/dashboard/upgrade" ? " bg-gray-200" : "")
          }
        >
          <Shield />
          <h2>Upgrade</h2>
        </div>
        </Link>
      </div>
      {fileList && (
        <div className="absolute bottom-20 left-0 right-0 p-5">
          <Progress value={(fileList?.length / 5) * 100} />
          <p className="text-sm mt-2">
            {fileList?.length} out of 5 Pdf Uploaded
          </p>
          <p className="text-sm mt-2 text-gray-500">
            Upgrade to upload more PDF
          </p>
        </div>
      )}
    </div>
  );
}

export default SideBar;
