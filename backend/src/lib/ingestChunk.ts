import { pool } from "../config/db.ts";
import { embedText } from "./openrouter.ts";

export async function ingestChunk(chunk: any) {
  const embedding = await embedText(chunk.raw_text);

  const vectorLiteral = `[${embedding.join(",")}]`;

  // console.log("Ingesting vectorLiteral:", vectorLiteral);

  await pool.query(`DELETE FROM transcript_chunks WHERE course_code = $1`, [
    chunk.course_code,
  ]);

  await pool.query(
    `
    INSERT INTO transcript_chunks
    (course_code, course_name, grade, credits, content, embedding)
    VALUES ($1,$2,$3,$4,$5,$6::vector)
    `,
    [
      chunk.course_code,
      chunk.course_name,
      chunk.grade,
      chunk.credits,
      chunk.raw_text,
      vectorLiteral,
    ],
  );
}
