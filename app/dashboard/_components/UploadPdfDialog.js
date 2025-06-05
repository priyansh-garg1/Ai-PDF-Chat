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
import { api } from "@/convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import { useAction, useMutation } from "convex/react";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

function UploadPdfDialog({ children }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);

  const { user } = useUser();

  const generateUploadUrl = useMutation(api.pdfStorage.generateUploadUrl);
  const addPdfFile = useMutation(api.pdfStorage.AddPdfFile);
  const getFileUrl = useMutation(api.pdfStorage.getFileUrl);
  const embeddDocument = useAction(api.myAction.ingest);

  const onFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onUpload = async (e) => {
    setLoading(true);
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });
    const { storageId } = await result.json();
    const fileUrl = await getFileUrl({
      storageId: storageId,
    });

    const fileId = uuid4();
    const response = await addPdfFile({
      fileId: fileId,
      storageId: storageId,
      fileName: fileName || "Untitled PDF",
      fileUrl: fileUrl,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });

    const ApiResponse = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);
    embeddDocument({
      splitText: ApiResponse.data.result,
      fileId: fileId,
    });

    setLoading(false);
    setOpen(false);
    setFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="w-full">
          Upload PDF File
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <DialogDescription>Select a PDF file to upload</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <h2 className="">Choose a file</h2>
            <div className="flex gap-2 p-3 rounded-xl border">
              <div className="border p-2 bg-gray-100 rounded-lg">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={onFileSelect}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1">File Name</label>
            <Input
              placeholder="Enter file name"
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-end mt-4">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              disabled={loading}
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={onUpload}
            type="submit"
            className="ml-2"
            disabled={!file || loading}
          >
            {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPdfDialog;
