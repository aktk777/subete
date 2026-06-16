import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import yutaiSchema from "../../../tools/yutai-cross-cost/schema.json";

/**
 * slug → ツールUI（client component）の対応表。ツールを1本追加するたびにここへ1行足す。
 * tool-scaffold / tool-builder はこの登録も行うこと。
 */
export const toolComponents: Record<string, ComponentType> = {
  "yutai-cross-cost": dynamic(() => import("../../../tools/yutai-cross-cost/ui")),
  // "next-slug": dynamic(() => import("../../../tools/next-slug/ui")),
};

/**
 * slug → 本文（content.mdx）の対応表。問題提起→計算式→手順→FAQ を本文として描画する。
 * 本文は h2 始まり（ページ側がツール名の <h1> を描画する）。
 */
export const toolContent: Record<string, ComponentType> = {
  "yutai-cross-cost": dynamic(() => import("../../../tools/yutai-cross-cost/content.mdx")),
  // "next-slug": dynamic(() => import("../../../tools/next-slug/content.mdx")),
};

/** ツールの構造化データ（schema.json）。FAQPage をページに JSON-LD として注入する。 */
export interface ToolSchema {
  webApplication?: Record<string, unknown>;
  faqPage?: Record<string, unknown>;
}
export const toolSchemas: Record<string, ToolSchema> = {
  "yutai-cross-cost": yutaiSchema as ToolSchema,
  // "next-slug": nextSlugSchema as ToolSchema,
};
