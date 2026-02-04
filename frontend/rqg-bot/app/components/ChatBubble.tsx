/* eslint-disable @typescript-eslint/no-explicit-any */
import SourceCard from "./SourceCard";

export default function ChatBubble({ message }: any) {
  const isUser = message.role === "user";

  return (
    <div
      className={`border-b border-white/10 py-6 px-4 mb-4 ${
        isUser ? "bg-[#343541]" : "bg-[#444654]"
      }`}
    >
      <div className="flex items-start gap-4 mx-auto max-w-3xl">
        <div
          className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 ${
            isUser
              ? "bg-[#5b5c6c] text-white"
              : "bg-[#10a37f] text-white"
          }`}
        >
          {isUser ? "U" : "AI"}
        </div>

        <div className="flex-1 space-y-4">
          <div className="text-[#ececf1] leading-7 whitespace-pre-wrap">
            {message.content}
          </div>

          {message.sources && message.sources.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                Sources:
              </div>
              {message.sources.map((s: any, i: number) => (
                <SourceCard key={i} source={s} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
