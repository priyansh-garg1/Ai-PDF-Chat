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
import { useMutation } from "convex/react";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";

function UploadPdfDialog({ children }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const { user } = useUser();

  const generateUploadUrl = useMutation(api.pdfStorage.generateUploadUrl);
  const addPdfFile = useMutation(api.pdfStorage.AddPdfFile);

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

    const fileId = uuid4();
    const response = await addPdfFile({
      fileId: fileId,
      storageId: storageId,
      fileName: fileName || "Untitled PDF",
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(response);
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <DialogDescription>
            <div>
              <h2>Select a PDF file to upload</h2>
              <div className="flex gap-2 p-3 rounded-xl border">
                <div className="border p-2 bg-gray-100 rounded-lg">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => onFileSelect(e)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label>File Name </label>
                <Input placeholder="Enter file name" onChange={(e) => setFileName(e.target.value)} />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={onUpload} type="submit" className="ml-2">
            {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPdfDialog;
