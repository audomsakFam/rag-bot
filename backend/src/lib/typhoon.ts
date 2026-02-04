import "dotenv/config";

export async function askTyphoon(question: string, context: string) {
  const res = await fetch(
    `${process.env.TYPHOON_BASE_URL}/chat/completions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TYPHOON_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "typhoon-v2.5-30b-a3b-instruct",
        messages: [
          {
            role: "system",
            content: "คุณเป็นผู้ช่วยตอบข้อมูลจาก transcript การศึกษา",
          },
          {
            role: "user",
            content: `ข้อมูลที่มี:\n${context}\n\nคำถาม: ${question}`,
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Typhoon API error: ${res.status} ${errText}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}
