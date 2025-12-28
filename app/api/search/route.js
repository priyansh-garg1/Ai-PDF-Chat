import { NextResponse } from 'next/server';
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { getPineconeIndex } from '@/lib/pinecone';

export async function POST(req) {
  try {
    const { query, fileId } = await req.json();
    
    if (!query || !fileId) {
      return NextResponse.json(
        { error: "query and fileId are required" },
        { status: 400 }
      );
    }

    // Initialize Google embeddings
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.NEXT_PUBLIC_GENAI_API_KEY,
      model: "text-embedding-004",
    });
    
    // Generate embedding for the query
    const queryEmbedding = await embeddings.embedQuery(query);
    
    const index = getPineconeIndex();
    
    // Search for similar vectors filtered by fileId
    const results = await index.query({
      vector: queryEmbedding,
      topK: 5,
      filter: { fileId: { $eq: fileId } },
      includeMetadata: true,
    });
    
    // Format results to match expected format
    const formattedResults = results.matches.map(match => ({
      pageContent: match.metadata?.text || "",
      score: match.score
    }));
    
    console.log(`Found ${formattedResults.length} results for query in file ${fileId}`);
    
    return NextResponse.json(formattedResults);
    
  } catch (error) {
    console.error("Error searching documents:", error);
    return NextResponse.json(
      { error: "Failed to search documents", details: error.message },
      { status: 500 }
    );
  }
}
