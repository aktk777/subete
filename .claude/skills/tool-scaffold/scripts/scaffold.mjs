#!/usr/bin/env node
// 使い方: node scripts/scaffold.mjs <slug>
// tools/<slug>/ に空の雛形ファイルを作る（中身は tool-builder が埋める）。
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const slug = process.argv[2];
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error("Usage: node scripts/scaffold.mjs <kebab-slug>");
  process.exit(1);
}
const dir = join(process.cwd(), "tools", slug);
if (existsSync(dir)) { console.error(`already exists: ${dir}`); process.exit(1); }
mkdirSync(dir, { recursive: true });

const files = {
  "logic.ts": `export interface Input {}\nexport interface Output {}\nexport function compute(_input: Input): Output {\n  // TODO: 公式の計算式のみ。副作用・外部依存なし。\n  return {} as Output;\n}\n`,
  "logic.test.ts": `import { describe, it, expect } from "vitest";\nimport { compute } from "./logic";\n\ndescribe("${slug}", () => {\n  it("TODO: 既知ケース", () => {\n    expect(true).toBe(true);\n  });\n});\n`,
  "ui.tsx": `"use client";\nexport default function Tool() {\n  // TODO: @factory/ui を使い CLS を出さない\n  return null;\n}\n`,
  "meta.json": JSON.stringify({ slug, title: "", description: "", keywords: [], category: "", rail: "B", affiliate_targets: [], formula_sources: [] }, null, 2) + "\n",
  "content.mdx": `{/* 本文は h2 始まり。ツール名の <h1> はページ側が描画する。 */}\n## これは何\n\n## 計算式\n\n## 使い方\n\n## FAQ\n`,
  "schema.json": JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "", applicationCategory: "UtilitiesApplication" }, null, 2) + "\n",
};
for (const [name, body] of Object.entries(files)) writeFileSync(join(dir, name), body);
console.log(`scaffolded tools/${slug}/ (${Object.keys(files).length} files). Fill them in.`);
