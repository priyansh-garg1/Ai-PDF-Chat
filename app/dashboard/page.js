"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import UploadPdfDialog from "./_components/UploadPdfDialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Dashboard() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user, router]);

  const fileList = useQuery(api.pdfStorage.getAllFiles, {
    userEmail: user?.emailAddresses[0]?.emailAddress || "",
  });

  const getDateAndTime = (timestamp) => {
    const date = new Date(timestamp);
    return (
      date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }) +
      " " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  return (
    <div>
      {fileList?.length != 0 ? (
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Workspace</h2>
            <div>
              <UploadPdfDialog isMaxFile={fileList?.length >= 5 ? true : false}>
                <Button>+ Upload PDF</Button>
              </UploadPdfDialog>
            </div>
          </div>

          <div className="mt-6">
            {fileList?.length > 0
              ? fileList.map((file, index) => (
                  <Link key={file.fileId} href={`/workspace/${file.fileId}`}>
                    <div className="border rounded-lg mb-4">
                      <div
                        key={file.fileId}
                        className="p-4 border-b flex items-center space-x-4"
                      >
                        <Image
                          src={"/pdf.png"}
                          alt={file.fileName}
                          width={50}
                          height={50}
                          className="object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">
                            {file.fileName}
                          </h3>
                          <p>
                            Uploaded on: {getDateAndTime(file._creationTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              : [1, 2, 3, 4, 5].map((_, index) => (
                  <div key={index} className="p-4 border-b animate-pulse">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Workspace</h2>
            <div>
              <UploadPdfDialog isMaxFile={fileList?.length >= 5 ? true : false}>
                <Button>+ Upload PDF</Button>
              </UploadPdfDialog>
            </div>
          </div>
          <div className="text-center mt-10">
            <h2 className="text-2xl font-bold">No files found</h2>
            <p className="mt-4">You haven't uploaded any files yet.</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
