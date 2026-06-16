#!/usr/bin/env node
// PreToolUse hook for Bash. Reads JSON on stdin. Exit code 2 = block (stderr is fed back to Claude).
// Blocks destructive/over-privileged commands and production deploys (which require human approval).
let raw = "";
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  let cmd = "";
  try { cmd = (JSON.parse(raw)?.tool_input?.command) || ""; } catch { cmd = raw; }
  const block = (msg) => { console.error(`[blocked] ${msg}`); process.exit(2); };

  // Destructive / dangerous
  if (/\brm\s+-rf?\b\s*(\/(\s|$)|~|\$HOME|\.\s*$)/.test(cmd)) block("危険な rm -rf を検出（ルート/ホーム）。");
  if (/\bgit\s+push\b[^\n]*(--force|\s-f\b)/.test(cmd)) block("force push は禁止。");
  if (/\bchmod\s+-?R?\s*777\b/.test(cmd)) block("chmod 777 は禁止。");
  if (/\bsudo\b/.test(cmd)) block("sudo は禁止。");
  if (/\bcurl\b[^\n]*\|\s*(sh|bash)\b/.test(cmd) || /\bwget\b[^\n]*\|\s*(sh|bash)\b/.test(cmd)) block("パイプ実行（curl|sh）は禁止。");

  // Production deploy / billing → require human approval (spec §7.3)
  if (/\bwrangler\s+pages\s+deploy\b/.test(cmd) && !/--branch\s+preview/.test(cmd)) {
    block("本番デプロイは人間承認が必要。承認済みなら人間が手動実行すること（プレビューは --branch preview）。");
  }
  if (/\bvercel\b[^\n]*--prod\b/.test(cmd)) block("本番デプロイ(--prod)は人間承認が必要。");
  if (/\bstripe\b[^\n]*(prices|subscriptions)\b[^\n]*(create|update|delete)/.test(cmd)) block("課金操作は人間承認が必要。");

  process.exit(0);
});
