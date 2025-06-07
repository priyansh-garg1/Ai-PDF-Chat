"use client";
import { chatSession } from "@/configs/AIModel";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
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
  SaveIcon,
  SparklesIcon,
  UnderlineIcon,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function EditorExtension({ editor }) {
  const { fileId } = useParams();

  const [loading, setLoading] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const SearchAI = useAction(api.myAction.search);
  const saveNotes = useMutation(api.notes.AddNotes);
  const { user } = useUser();
  const onAiClick = async () => {
    toast("AI is fetching answer for you...");
    setLoading(true);
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

    const PROMPT = `
You are a factual and reliable AI assistant.

Use only the information provided in "The answer content" below to answer the question.  
⚠️ If the answer is not found in the content, reply with: "⚠️The answer is not available in the provided content. Provide more context or details for a better response."

Please return your answer in **detailed HTML format**.

For Question: ${slectedText}

The answer content is:
========================
${AllUnformattedAnswer}
========================

Provide an appropriate, complete, and accurate answer in HTML only:
`;

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
    setLoading(false);

    saveNotes({
      notes: editor.getHTML(),
      fileId: fileId,
      createdBy: user?.primaryEmailAddress?.emailAddress || "Anonymous",
    });
  };

  const onSave = async () => {
    setIsSaving(true);
    const AllText = editor.getHTML();
    await saveNotes({
      notes: AllText,
      fileId: fileId,
      createdBy: user?.primaryEmailAddress?.emailAddress || "Anonymous",
    });
    setIsSaving(false);
    toast.success("Notes saved successfully!");
  };

  if (!editor) {
    return null;
  }
  return (
    <div className="px-5 py-2">
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
              " bg-gray-200 hover:bg-cyan-500 hover:text-white p-2 rounded-md transition-colors duration-200 flex items-center gap-2"
            }
            disabled={loading}
          >
            {loading ? (
              <>
                Executing
                <span className="animate-spin">
                  <SparklesIcon />
                </span>
              </>
            ) : (
              <>
                Execute
                <SparklesIcon />
              </>
            )}
          </button>
          <button
            onClick={() => onSave()}
            className={
              " bg-black text-white cursor-pointer p-2 rounded-md transition-colors duration-200 flex items-center gap-2"
            }
            disabled={isSaving}
          >
            {isSaving ? (
              <>Saving</>
            ) : (
              <>
                <SaveIcon />
                Save
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditorExtension;
