import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import PdfFile from '@/models/PdfFile';

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    const newFile = new PdfFile({
      fileId: data.fileId,
      storageId: data.storageId,
      fileName: data.fileName,
      fileUrl: data.fileUrl,
      createdBy: data.createdBy,
    });
    
    await newFile.save();
    return NextResponse.json({ message: "File added successfully", file: newFile });
  } catch (error) {
    console.error("Error adding PDF file:", error);
    return NextResponse.json({ error: "Failed to add file" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");
    const fileId = searchParams.get("fileId");

    if (fileId) {
      const file = await PdfFile.findOne({ fileId });
      return NextResponse.json(file);
    }

    if (userEmail) {
      const files = await PdfFile.find({ createdBy: userEmail }).sort({ createdAt: -1 });
      return NextResponse.json(files);
    }

    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  } catch (error) {
    console.error("Error fetching PDF files:", error);
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}
