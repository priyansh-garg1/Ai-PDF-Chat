import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import uuid4 from 'uuid4';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const base64 = buffer.toString('base64');
    const mimeType = file.type || 'application/pdf';
    const fileUrl = `data:${mimeType};base64,${base64}`;
    
    const fileName = file.name;
    const storageId = uuid4();

    return NextResponse.json({ 
      fileUrl, 
      storageId, 
      fileName 
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json({ error: "Failed to process file" }, { status: 500 });
  }
}
