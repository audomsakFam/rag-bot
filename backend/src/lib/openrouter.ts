import "dotenv/config";

export async function embedText(text: string): Promise<number[]> {
  const res = await fetch(
    `${process.env.OPENROUTER_BASE_URL}/embeddings`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost",
        "X-Title": "rag-transcript-bot",
      },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input: text,
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Embedding API error: ${res.status} ${errText}`);
  }

  const data = await res.json();
  return data.data[0].embedding;
}
