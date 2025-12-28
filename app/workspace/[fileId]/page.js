"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import WorkspaceHeader from "../_component/WorkspaceHeader";
import PdfViewer from "../_component/PdfViewer";
import TextEditor from "../_component/TextEditor";
import AiChat from "../_component/AiChat";
import { useUser } from "@/context/AuthContext";
import axios from "axios";

function Workspace() {
  const { fileId } = useParams();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [fileInfo, setFileInfo] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.replace("/");
    }
  }, [user, isLoaded, router]);

  useEffect(() => {
    const getFileInfo = async () => {
      try {
        const response = await axios.get(`/api/pdf-file?fileId=${fileId}`);
        setFileInfo(response.data);
      } catch (error) {
        console.error("Error fetching file info:", error);
      }
    };
    if (fileId) {
      getFileInfo();
    }
  }, [fileId]);

  if (!fileInfo) {
    return (
      <div className="min-h-screen bg-white">
        <WorkspaceHeader fileName="Loading..." />
        <div className="flex items-center justify-center h-[calc(100vh-60px)]">
          <div className="text-gray-500">Loading document...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <WorkspaceHeader fileName={fileInfo?.fileName} fileId={fileId} />
      
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/3 border-r border-gray-200 flex flex-col bg-white">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">Notes</h3>
          </div>
          <div className="flex-1 overflow-hidden">
            <TextEditor fileId={fileId} />
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-gray-50">
          <div className="px-4 py-3 border-b border-gray-100 bg-white">
            <h3 className="text-sm font-medium text-gray-900">Document</h3>
          </div>
          <div className="flex-1 overflow-hidden">
            <PdfViewer fileUrl={fileInfo?.fileUrl} />
          </div>
        </div>

        <div className="w-1/3 border-l border-gray-200 flex flex-col bg-white">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">AI Assistant</h3>
          </div>
          <div className="flex-1 overflow-hidden">
            <AiChat fileId={fileId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workspace;
