"use client";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import EditorExtension from "./EditorExtension";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import axios from "axios";

function TextEditor({ fileId }) {
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`/api/notes?fileId=${fileId}`);
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };
    if (fileId) {
      fetchNotes();
    }
  }, [fileId]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ 
        placeholder: "Write your notes here…",
        emptyEditorClass: "is-editor-empty",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({ multicolor: false }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none prose prose-sm max-w-none px-6 py-4 min-h-full",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && notes && !loading) {
      editor.commands.setContent(notes);
    }
  }, [editor, notes, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-gray-500">Loading notes...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <EditorExtension editor={editor} fileId={fileId} />

      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
