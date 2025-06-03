import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield } from "lucide-react";
import Image from "next/image";
import React from "react";
import UploadPdfDialog from "./UploadPdfDialog";

function SideBar() {
  return (
    <div className="shadow-md h-screen p-7">
      <Image src="/logo.svg" alt="Logo" width={125} height={40} />
      <div className="mt-10">
        <UploadPdfDialog>
          <Button>+ Upload PDF</Button>
        </UploadPdfDialog>
        <div className="mt-10 flex items-center gap-2 text-lg font-semibold">
          <Layout />
          <h2>Workspace</h2>
        </div>
        <div className="mt-10 flex items-center gap-2 text-lg font-semibold">
          <Shield />
          <h2>Upgrade</h2>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <Progress value={20} />
        <p className="text-sm mt-2">2 out of 5 Pdf Uploaded</p>
        <p className="text-sm mt-2 text-gray-500">Upgrade to upload more PDF</p>
      </div>
    </div>
  );
}

export default SideBar;
