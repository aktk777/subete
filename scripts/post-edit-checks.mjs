#!/usr/bin/env node
// PostToolUse hook for Edit/Write. Advisory only (exit 0). Reminds of the unit checklist.
let raw = ""; process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  let path = "";
  try { const j = JSON.parse(raw); path = j?.tool_input?.file_path || j?.tool_input?.path || ""; } catch {}
  if (/tools\/[^/]+\/(logic|ui)\.(ts|tsx)$/.test(path)) {
    console.error("[reminder] ツール変更後チェック: `pnpm test` で当該 logic.test を緑に / CLS用に寸法予約 / 公式出典を meta.json に。");
  }
  process.exit(0); // non-blocking
});
