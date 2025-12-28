"use client";
import { useUser } from "@/context/AuthContext";
import axios from "axios";
import {
  Bold,
  Italic,
  Heading2Icon,
  HighlighterIcon,
  Save,
} from "lucide-react";
import React from "react";
import { toast } from "sonner";

function EditorExtension({ editor, fileId }) {
  const [isSaving, setIsSaving] = React.useState(false);
  const { user } = useUser();

  const onSave = async () => {
    if (!editor) return;
    
    setIsSaving(true);
    const content = editor.getHTML();
    
    try {
      await axios.post("/api/notes", {
        notes: content,
        fileId: fileId,
        createdBy: user?.primaryEmailAddress?.emailAddress || "Anonymous",
      });
      toast.success("Notes saved");
    } catch (error) {
      toast.error("Failed to save notes");
    } finally {
      setIsSaving(false);
    }
  };

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({ onClick, isActive, children, title }) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded transition-colors ${
        isActive
          ? "bg-gray-900 text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="px-4 py-2 border-b border-gray-100 bg-white">
      <div className="flex items-center gap-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold"
        >
          <Bold size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic"
        >
          <Italic size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
          title="Heading"
        >
          <Heading2Icon size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive("highlight")}
          title="Highlight"
        >
          <HighlighterIcon size={16} />
        </ToolbarButton>

        <div className="ml-auto">
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            <Save size={14} />
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditorExtension;
