"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon, UploadIcon, FileText, X } from "lucide-react";
import uuid4 from "uuid4";
import { useUser } from "@/context/AuthContext";
import { useFiles } from "@/context/FileContext";
import axios from "axios";
import { toast } from "sonner";

function UploadPdfDialog({ children, isMaxFile }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);

  const { user } = useUser();
  const { refreshFiles } = useFiles();

  const onFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name.replace(".pdf", ""));
    }
  };

  const onUpload = async (e) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { fileUrl, storageId } = uploadRes.data;
      const fileId = uuid4();

      await axios.post("/api/pdf-file", {
        fileId: fileId,
        storageId: storageId,
        fileName: fileName || file.name || "Untitled PDF",
        fileUrl: fileUrl,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      const ApiResponse = await axios.post("/api/pdf-loader", {
        pdfUrl: fileUrl
      });

      await axios.post("/api/ingest", {
        splitText: ApiResponse.data.result,
        fileId: fileId,
      });

      setLoading(false);
      setOpen(false);
      setFile(null);
      setFileName("");

      await refreshFiles();

      toast.success("PDF uploaded and ready to use");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setOpen(false);
      setFile(null);
      setFileName("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Upload a PDF
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            We'll process your document so you can ask questions about it.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose file
            </label>
            
            {!file ? (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadIcon className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to select a PDF
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Max size: 10MB
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="application/pdf"
                  onChange={onFileSelect}
                  disabled={loading}
                />
              </label>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <FileText className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {!loading && (
                  <button
                    onClick={() => {
                      setFile(null);
                      setFileName("");
                    }}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                )}
              </div>
            )}
          </div>

          {file && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name this document
                <span className="text-gray-500 font-normal ml-1">
                  (optional)
                </span>
              </label>
              <Input
                placeholder="e.g., Research Paper 2024"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                disabled={loading}
                className="text-sm"
              />
              <p className="text-xs text-gray-500 mt-1.5">
                This helps you find it later.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={loading}
            className="text-sm"
          >
            Cancel
          </Button>
          <Button
            onClick={onUpload}
            disabled={!file || loading}
            className="text-sm bg-gray-900 hover:bg-gray-800"
          >
            {loading ? (
              <>
                <Loader2Icon className="animate-spin mr-2" size={16} />
                Processing...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPdfDialog;
