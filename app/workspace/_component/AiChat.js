"use client";
import { generateAIResponse } from "@/configs/AIModel";
import { useUser } from "@/context/AuthContext";
import axios from "axios";
import { Send, Loader2 } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

function AiChat({ fileId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useUser();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e?.preventDefault();
    
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage, timestamp: new Date() },
    ]);

    setLoading(true);

    try {
      const searchResponse = await axios.post("/api/search", {
        query: userMessage,
        fileId: fileId,
      });

      const contextResults = searchResponse.data;
      let contextContent = "";
      
      contextResults?.forEach((item) => {
        contextContent += item.pageContent + "\n";
      });

      const prompt = `You are a helpful AI assistant analyzing a document.

Use the following context from the document to answer the question.
If the answer isn't in the context, say so clearly.

Question: ${userMessage}

Context from document:
${contextContent}

Provide a clear, concise answer:`;

      const aiResponse = await generateAIResponse(prompt);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse, timestamp: new Date() },
      ]);
    } catch (error) {
      console.error("AI error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <p className="text-sm text-gray-600 mb-2">
              Ask questions about this document
            </p>
            <p className="text-xs text-gray-500">
              The AI will search the document and provide answers based on its content.
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 ${
                  msg.role === "user"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-900 border border-gray-200"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </p>
              </div>
            </div>
          ))
        )}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-3 py-2 border border-gray-200">
              <div className="flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-gray-600" />
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-3 bg-white">
        <form onSubmit={handleSend} className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about this document…"
            rows={2}
            disabled={loading}
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded resize-none focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-4 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send size={16} />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-1.5 px-1">
          Press Enter to send • Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}

export default AiChat;
