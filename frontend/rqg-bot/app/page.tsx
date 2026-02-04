/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import ChatBubble from "./components/ChatBubble";
import ChatInput from "./components/ChatInput";

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: any[];
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, showLoading]);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function chat(question: string) {
    setLoading(true);

    setMessages((m) => [...m, { role: "user", content: question }]);

    setShowLoading(false);
    await delay(1000);
    setShowLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      await delay(600);
      setShowLoading(false);

      if (!res.ok || data.error) {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: data.error,
          },
        ]);
        return;
      }

      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: data.answer,
          sources: data.sources,
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setShowLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col h-screen bg-[#343541]">
      <div className="border-b border-white/10 p-4 flex items-center justify-center">
        <h1 className="text-xl font-semibold text-white">RAG Transcript Bot</h1>
      </div>

      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-semibold text-white">
                RAG Transcript Bot
              </h2>
              <p className="text-gray-400">ถามเกี่ยวกับ transcript ของคุณ</p>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            {messages.map((m, i) => (
              <ChatBubble key={i} message={m} />
            ))}
            {showLoading && (
              <div className="py-6 px-4 bg-[#444654] border-b border-white/10">
                <div className="flex items-center gap-4 mx-auto max-w-3xl">
                  <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 bg-[#10a37f] text-white">
                    AI
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="flex gap-1">
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      >
                        ●
                      </span>
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      >
                        ●
                      </span>
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      >
                        ●
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <ChatInput onSend={chat} disabled={loading} />
    </main>
  );
}
