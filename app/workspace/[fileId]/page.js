"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import WorkspaceHeader from "../_component/WorkspaceHeader";
import PdfViewer from "../_component/PdfViewer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextEditor from "../_component/TextEditor";

function Workspace() {
  const { fileId } = useParams();

  const fileInfo = useQuery(api.pdfStorage.getFileRecord, {
    fileId: fileId,
  });

  useEffect(() => {
    if (fileInfo) {
      console.log(fileInfo);
    }
  }, [fileInfo]);


  return (
    <div>
      <WorkspaceHeader />
      <div className="grid grid-cols-2 gap-5">
        <div>{/* Text Editor */}
            <TextEditor />
        </div>
        <div>
          {/* PDF Viewer */}
          <PdfViewer fileUrl = {fileInfo?.fileUrl}/>
        </div>
      </div>
    </div>
  );
}

export default Workspace;
