#!/usr/bin/env node
// SubagentStop hook AND CLI. Validates registry.json; default bumps updatedAt to today.
// Usage: node scripts/update-registry.mjs [--check]
import { readFileSync, writeFileSync, existsSync } from "node:fs";
const file = new URL("../registry.json", import.meta.url);
const checkOnly = process.argv.includes("--check");
try {
  const reg = JSON.parse(readFileSync(file, "utf8"));
  if (!Array.isArray(reg.tools)) throw new Error("registry.tools must be an array");
  for (const t of reg.tools) {
    if (!/^[a-z0-9-]+$/.test(t.slug || "")) throw new Error(`invalid slug: ${t.slug}`);
  }
  if (!checkOnly) {
    reg.updatedAt = new Date().toISOString().slice(0, 10);
    writeFileSync(file, JSON.stringify(reg, null, 2) + "\n");
  }
  console.log(`registry OK (${reg.tools.length} tools)`);
  process.exit(0);
} catch (e) {
  console.error(`[registry] ${e.message}`);
  process.exit(checkOnly ? 1 : 0); // SubagentStop should not hard-fail the session
}
