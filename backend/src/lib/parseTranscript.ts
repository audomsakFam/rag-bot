export function parseTranscript(text: string) {
  const rows = text.match(/<tr>[\s\S]*?<\/tr>/g) || [];
  const results = [];

  for (const row of rows) {
    const cols = [...row.matchAll(/<td[^>]*>(.*?)<\/td>/g)].map((m) =>
      (m[1] ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
    );

    if (cols.length === 0) continue;

    if (
      cols.join(" ").match(
        /ลงทะเบียน|หน่วยกิต|เกรดเฉลี่ย|รวมทั้งหมด|ภาคการศึกษา|เทียบโอน/,
      )
    ) {
      continue;
    }

    const codeMatch = (cols[0] ?? "").match(/^([A-Z]{0,2}\d{4,8})\s*(.+)?$/);
    if (!codeMatch) continue;

    const course_code = codeMatch[1];
    const course_name = codeMatch[2]?.trim() ?? "";

    let credits: number | null = null;
    let grade: string | null = null;

    const rest = cols.slice(1).join(" ");

    const gradeRegex = /(A|B\+|C\+|D\+|B|C|D|F|S)/;

    const gradeMatch = rest.match(gradeRegex);
    if (gradeMatch) grade = gradeMatch[1] ?? null;

    const creditMatch = rest.match(/(\d+)\s*(?=(A|B\+|B|C\+|C|D\+|D|F|S))/);
    if (creditMatch) credits = Number(creditMatch[1]);

    if (grade === "S" && credits === null) {
      credits = null;
    }

    if (!grade) continue;

    results.push({
      course_code,
      course_name,
      credits,
      grade,
      raw_text: `${course_code} ${course_name} ${credits ?? "-"} ${grade}`,
    });
  }

  return results;
}
