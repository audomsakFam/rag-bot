/* eslint-disable @typescript-eslint/no-explicit-any */
export default function SourceCard({ source }: any) {
  return (
    <div className="text-sm bg-[#2d2e38] rounded-lg p-3 border border-white/10">
      <div className="font-semibold text-[#ececf1] mb-1">
        {source.course_code} — {source.course_name}
      </div>
      <div className="text-gray-400 text-xs mb-2">
        เกรด: {source.grade} | หน่วยกิต: {source.credits}
      </div>
      <div className="text-gray-300 text-xs leading-relaxed">
        {source.content}
      </div>
    </div>
  );
}
