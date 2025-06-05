import { chatSession } from "@/configs/AIModel";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  Bold,
  Heading1,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  HighlighterIcon,
  Italic,
  SparklesIcon,
  UnderlineIcon,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function EditorExtension({ editor }) {
  const { fileId } = useParams();

  const SearchAI = useAction(api.myAction.search);
  const onAiClick = async () => {
    toast("AI is fetching answer for you...")
    const slectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    const result = await SearchAI({ query: slectedText, fileId: fileId });

    const UnformattedAnswer = JSON.parse(result);

    let AllUnformattedAnswer = "";
    UnformattedAnswer &&
      UnformattedAnswer.forEach((item) => {
        AllUnformattedAnswer += item.pageContent;
      });

    const PROMPT =
      "For Question: " +
      slectedText +
      " ans with given content as answer, please give appropriate answer in HTML format. The answer content is: " +
      AllUnformattedAnswer;

    const AiModelResult = await chatSession.sendMessage(PROMPT);
    console.log("AI Model Result:", AiModelResult.response.text());
    const FinalAnswer = AiModelResult.response
      .text()
      .replace("```", "")
      .replace("```", "")
      .replace("html", "");

    const AllText = editor.getHTML();

    editor.commands.setContent(
      AllText + "<p> <strong>Response:</strong> " + FinalAnswer + "</p>",
      false
    );
  };

  if (!editor) {
    return null;
  }
  return (
    <div className="p-5">
      <div className="control-group">
        <div className="button-group flex gap-3">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "text-cyan-500" : ""}
          >
            <Bold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "text-cyan-500" : ""}
          >
            <Italic />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "text-cyan-500" : ""
            }
          >
            <Heading1Icon />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "text-cyan-500" : ""
            }
          >
            <Heading2Icon />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "text-cyan-500" : ""
            }
          >
            <Heading3Icon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "text-cyan-500" : ""}
          >
            <UnderlineIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "text-cyan-500" : ""
            }
          >
            <AlignLeftIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" }) ? "text-cyan-500" : ""
            }
          >
            <AlignCenterIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" }) ? "text-cyan-500" : ""
            }
          >
            <AlignRightIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive("highlight") ? "text-cyan-500" : ""}
          >
            <HighlighterIcon />
          </button>

          <button
            onClick={() => onAiClick()}
            className={
              " bg-gray-100 hover:bg-cyan-500 hover:text-white p-2 rounded-md transition-colors duration-200 flex items-center gap-2"
            }
          >
            Execute AI
            <SparklesIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditorExtension;
