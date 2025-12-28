import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Note from '@/models/Note';

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    const note = await Note.findOneAndUpdate(
      { fileId: data.fileId },
      { 
        notes: data.notes, 
        createdBy: data.createdBy,
        updatedAt: Date.now() 
      },
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ message: "Notes saved successfully", note });
  } catch (error) {
    console.error("Error saving notes:", error);
    return NextResponse.json({ error: "Failed to save notes" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");

    if (!fileId) {
      return NextResponse.json({ error: "File ID is required" }, { status: 400 });
    }

    const noteRecord = await Note.findOne({ fileId });
    return NextResponse.json(noteRecord ? noteRecord.notes : null);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
  }
}
