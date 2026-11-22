// Reads the live Google Form and writes its questions to lib/form.json, so the
// site renders the same questions (with the same entry IDs) in its own style.
// Runs before every build. If Google can't be reached, the last snapshot is kept.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const FORM_ID = "1FAIpQLSeni26wBYlJGdsxWMLh6cwWdDXvkLZIpITwMVN0zH_wAnedgg";
const OUT = new URL("../lib/form.json", import.meta.url);

// Google Forms item types
const TYPES = { 0: "text", 1: "paragraph", 2: "radio", 3: "dropdown", 4: "checkbox", 5: "scale", 8: "section" };

try {
  const res = await fetch(`https://docs.google.com/forms/d/e/${FORM_ID}/viewform`, {
    headers: { "accept-language": "en-US" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const m = html.match(/FB_PUBLIC_LOAD_DATA_ = (.*?);<\/script>/s);
  if (!m) throw new Error("form data not found");
  const data = JSON.parse(m[1]);
  const items = data[1][1] ?? [];

  let sections = 0;
  const questions = [];
  for (const it of items) {
    const type = TYPES[it[3]];
    if (type === "section") {
      sections++;
      continue;
    }
    if (!type || !it[4]?.[0]) continue; // unsupported item (grid, file upload, ...)
    const field = it[4][0];
    const q = {
      entry: `entry.${field[0]}`,
      type,
      label: (it[1] ?? "").trim(),
      description: it[2] ?? undefined,
      required: field[2] === 1,
    };
    if (["radio", "dropdown", "checkbox"].includes(type)) q.options = (field[1] ?? []).map((o) => o[0]).filter(Boolean);
    if (type === "scale") {
      const opts = (field[1] ?? []).map((o) => o[0]);
      q.min = Number(opts[0]);
      q.max = Number(opts[opts.length - 1]);
      q.minLabel = field[3]?.[0] ?? "";
      q.maxLabel = field[3]?.[1] ?? "";
    }
    questions.push(q);
  }

  const out = {
    id: FORM_ID,
    title: data[1][8] ?? data[3] ?? "",
    pageHistory: Array.from({ length: sections + 1 }, (_, i) => i).join(","),
    questions,
  };
  writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
  console.log(`form: synced ${questions.length} question(s)`);
} catch (err) {
  if (!existsSync(OUT)) throw err;
  JSON.parse(readFileSync(OUT, "utf8"));
  console.warn(`form: couldn't sync (${err.message}), using the saved copy`);
}
