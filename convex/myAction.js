import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx,args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText,
      args.splitText.map(() => ({ fileId: args.fileId })),
      new GoogleGenerativeAIEmbeddings({
          apiKey: "AIzaSyCjSzhQhn9kxuYRk2y2xP4cSNKmWICLjwY",
          model: "text-embedding-004",
          taskType: TaskType.RETRIEVAL_DOCUMENT,
          title: "Convex Ingest ",
      }),
      { ctx }
    );
    return "Completed successfully";
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyCjSzhQhn9kxuYRk2y2xP4cSNKmWICLjwY",
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Convex Search",
      }),
      { ctx }
    );

    const resultOne = (await vectorStore.similaritySearch(args.query, 1)).filter(q=> q.metadata.fileId == args.fileId);
    return JSON.stringify(resultOne);
  },
});