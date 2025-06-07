import { NextResponse } from 'next/server';
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// const pdfUrl = "https://sleek-owl-266.convex.cloud/api/storage/9274692b-a791-464f-a115-1f22e37dfcd2";
export async function GET(req) {

    const reqUrl = req.url;
    const {searchParams} = new URL(reqUrl);
    const pdfUrl = searchParams.get("pdfUrl");
    console.log(pdfUrl);
    

    //Load PDF file
    const response = await fetch(pdfUrl);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent = "";
    docs.forEach(doc => {
        pdfTextContent += doc.pageContent;
    });

    //Split the text content into small chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    })
    const output = await splitter.createDocuments([pdfTextContent]);

    let splitterList = [];
    output.forEach(doc => {
        splitterList.push(doc.pageContent);
    });

    return NextResponse.json({
        result: splitterList
    });
}