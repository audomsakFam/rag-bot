import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Backend error:", text);

      return NextResponse.json(
        { error: "ไม่สามารถเชื่อมต่อระบบ AI ได้" },
        { status: 500 },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("API /chat error:", err);

    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง" },
      { status: 500 },
    );
  }
}
