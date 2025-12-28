"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UploadPdfDialog from "./_components/UploadPdfDialog";
import { Button } from "@/components/ui/button";
import { useFiles } from "@/context/FileContext";
import { FileText, Upload } from "lucide-react";

function Dashboard() {
  const { files, loading } = useFiles();

  const getDateAndTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Workspace</h1>
          <p className="text-sm text-gray-600 mt-1">
            {files?.length > 0
              ? `${files.length} document${files.length !== 1 ? "s" : ""}`
              : "No documents yet"}
          </p>
        </div>
        {files?.length > 0 && (
          <UploadPdfDialog isMaxFile={files?.length >= 5}>
            <button className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
              <Upload size={16} />
              Upload PDF
            </button>
          </UploadPdfDialog>
        )}
      </div>

      {!loading && files?.length > 0 ? (
        <div className="space-y-3">
          {files.map((file) => (
            <Link key={file.fileId} href={`/workspace/${file.fileId}`}>
              <div className="group p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                    <FileText className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-700 transition-colors truncate">
                      {file.fileName}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Uploaded {getDateAndTime(file.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 bg-white border border-gray-200 rounded-lg animate-pulse"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="max-w-sm mx-auto space-y-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">
                Upload your first PDF
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Add a document to get started. You can ask questions about it,
                take notes, and highlight important parts.
              </p>
            </div>

            <div className="pt-2">
              <UploadPdfDialog isMaxFile={false}>
                <button className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
                  <Upload size={16} />
                  Upload PDF
                </button>
              </UploadPdfDialog>
              <p className="text-xs text-gray-500 mt-3">
                Free plan includes up to 5 PDFs
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
