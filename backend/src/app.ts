import express from "express";
import cors from "cors";
import { embedText } from "./lib/openrouter.ts";
import { exactSearchByCourseCode, semanticSearch } from "./lib/search.ts";
import { askTyphoon } from "./lib/typhoon.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.post("/test-embed", async (req, res) => {
  const { text } = req.body;

  const embedding = await embedText(text);

  res.json({
    vectorLength: embedding.length,
  });
});

app.post("/chat", async (req, res) => {
  const { question } = req.body;

  const exactDoc = await exactSearchByCourseCode(question);
  console.log("Exact doc:", exactDoc);
  let docs = [];

  if (exactDoc) {
    docs = exactDoc;
  } else {
    docs = await semanticSearch(question);
    console.log("Semantic docs:", docs);
  }

  console.log("final docs:", docs);
  
  const context = docs
    .map(
      (d) =>
        `วิชา ${d.course_name} (${d.course_code}) เกรด ${d.grade} หน่วยกิต ${d.credits ?? "-"}`,
    )
    .join("\n");

  const answer = await askTyphoon(question, context);

  res.json({ answer, sources: docs });
});

export default app;
