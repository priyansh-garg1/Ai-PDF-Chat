import { NextResponse } from 'next/server';
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { getPineconeIndex } from '@/lib/pinecone';

export async function POST(req) {
  try {
    const { splitText, fileId } = await req.json();
    
    if (!splitText || !fileId) {
      return NextResponse.json(
        { error: "splitText and fileId are required" },
        { status: 400 }
      );
    }

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.NEXT_PUBLIC_GENAI_API_KEY,
      model: "text-embedding-004",
    });
    
    const index = getPineconeIndex();
    
    const batchSize = 100;
    for (let i = 0; i < splitText.length; i += batchSize) {
      const batch = splitText.slice(i, i + batchSize);
      
      const vectors = await Promise.all(
        batch.map(async (text, batchIndex) => {
          const embedding = await embeddings.embedQuery(text);
          return {
            id: `${fileId}_${i + batchIndex}`,
            values: embedding,
            metadata: { 
              text, 
              fileId,
              chunkIndex: i + batchIndex
            }
          };
        })
      );
      
      await index.upsert(vectors);
    }
    
    console.log(`Successfully ingested ${splitText.length} chunks for file ${fileId}`);
    
    return NextResponse.json({ 
      success: true, 
      message: `Ingested ${splitText.length} chunks` 
    });
    
  } catch (error) {
    console.error("Error ingesting document:", error);
    return NextResponse.json(
      { error: "Failed to ingest document", details: error.message },
      { status: 500 }
    );
  }
}
