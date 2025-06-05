import { Bold, Italic } from "lucide-react";
import React from "react";

function EditorExtension({ editor }) {
  if (!editor) {
    return null;
  }
  return (
    <div className="p-5">
      <div className="control-group">
        <div className="button-group flex gap-3">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "text-blue-800" : ""}
          >
            <Bold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <Italic />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditorExtension;
