/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";

export default function ChatInput({ onSend, disabled }: any) {
  const [value, setValue] = useState("");

  function submit() {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  }

  return (
    <div className="border-t border-white/10 p-4 bg-[#343541]">
      <div className="mx-auto max-w-3xl">
        <div className="relative flex items-center">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="ถามเกี่ยวกับ transcript ของคุณ…"
            disabled={disabled}
            rows={1}
            className="w-full bg-[#40414f] text-white rounded-lg px-4 py-3 pr-12 border border-white/10 focus:outline-none focus:border-white/20 resize-none placeholder-gray-400 disabled:opacity-50"
            style={{ minHeight: "52px", maxHeight: "200px" }}
          />
          <button
            onClick={submit}
            disabled={disabled || !value.trim()}
            className="absolute right-2 bottom-2 p-2 rounded-md hover:bg-[#565869] disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            title="Send message"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
