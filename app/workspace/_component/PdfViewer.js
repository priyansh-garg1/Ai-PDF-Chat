"use client";
import React from "react";

function PdfViewer({ fileUrl }) {
  if (!fileUrl) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <p className="text-sm text-gray-500">No document loaded</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full h-full bg-white shadow-sm rounded border border-gray-200 overflow-hidden">
        <iframe
          src={fileUrl + "#toolbar=0&navpanes=0&scrollbar=1"}
          className="w-full h-full"
          title="PDF Document"
        />
      </div>
    </div>
  );
}

export default PdfViewer;
