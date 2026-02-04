import fs from "fs";
import path from "path";
import { parseTranscript } from "./parseTranscript.ts";
import { ingestChunk } from "./ingestChunk.ts";

async function main() {
  const filePath = path.join(process.cwd(), "data/transcript.txt");
  const text = fs.readFileSync(filePath, "utf-8");

  const chunks = parseTranscript(text);

  console.log(`Found ${chunks.length} courses`);

  for (const chunk of chunks) {
    console.log("Ingesting:", chunk.course_code, chunk.course_name);
    await ingestChunk(chunk);
  }

  console.log("Ingest completed");
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
