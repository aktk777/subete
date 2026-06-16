import { tools } from "../../lib/registry";

// AI / 回答エンジン向けのサイト要約（llms.txt 規約）。registry から自動生成するので
// ツールを増やすたびに自動で反映される（手作業不要）。静的書き出しで out/llms.txt になる。
export const dynamic = "force-static";

export function GET() {
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || "";
  const lines: string[] = [
    "# 便利ツール集",
    "",
    "> 面倒な計算・換算・見積を、入力するだけで一瞬で片付ける単機能の無料ツール集。",
    "> 各ツールは公的機関や各サービスの公式情報に基づく決定論的な計算で、結果は概算です。",
    "> 投資・税務・法務・医療等の助言は行いません。最終判断は専門家にご確認ください。",
    "",
    "## ツール",
  ];
  for (const t of tools) {
    const url = SITE ? `${SITE}/tools/${t.slug}/` : `/tools/${t.slug}/`;
    lines.push(`- [${t.title}](${url}): ${t.task}`);
  }
  lines.push("");
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
