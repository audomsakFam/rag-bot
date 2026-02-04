import { pool } from "../config/db.ts";
import { embedText } from "./openrouter.ts";

export async function semanticSearch(query: string) {
  const queryEmbedding = await embedText(query);

  const vectorString = `[${queryEmbedding.join(",")}]`;

  const result = await pool.query(
    `
    SELECT course_code, course_name, grade, credits, content
    FROM transcript_chunks
    ORDER BY embedding <-> $1::vector
    LIMIT 3
    `,
    [vectorString],
  );

  return result.rows;
}

export async function exactSearchByCourseCode(question: string) {
  const match = question.match(/\b\d{6,8}\b/);
  if (!match) return null;

  const code = match[0];

const result = await pool.query(
  `
  SELECT course_code, course_name, grade, credits, content
  FROM transcript_chunks
  WHERE course_code LIKE $1 || '%'
  ORDER BY course_code
  LIMIT 3
  `,
  [code]
);

  return result.rows ?? null;
}
