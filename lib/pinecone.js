import { Pinecone } from '@pinecone-database/pinecone';

let pineconeClient = null;

/**
 * Get or create a Pinecone client instance
 */
export const getPineconeClient = () => {
  if (!pineconeClient) {
    pineconeClient = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
  }
  return pineconeClient;
};

/**
 * Get the Pinecone index for vector operations
 */
export const getPineconeIndex = () => {
  const client = getPineconeClient();
  return client.index(process.env.PINECONE_INDEX_NAME);
};
