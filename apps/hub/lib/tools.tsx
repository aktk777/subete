import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import yutaiSchema from "../../../tools/yutai-cross-cost/schema.json";
import toushinSchema from "../../../tools/toushin-cost/schema.json";
import shiftSchema from "../../../tools/shift-cost/schema.json";
import fuyouSchema from "../../../tools/fuyou-nokori/schema.json";

/**
 * slug → ツールUI（client component）の対応表。ツールを1本追加するたびにここへ1行足す。
 * tool-scaffold / tool-builder はこの登録も行うこと。
 */
export const toolComponents: Record<string, ComponentType> = {
  "yutai-cross-cost": dynamic(() => import("../../../tools/yutai-cross-cost/ui")),
  "toushin-cost": dynamic(() => import("../../../tools/toushin-cost/ui")),
  "shift-cost": dynamic(() => import("../../../tools/shift-cost/ui")),
  "fuyou-nokori": dynamic(() => import("../../../tools/fuyou-nokori/ui")),
};

/**
 * slug → 本文（content.mdx）の対応表。問題提起→計算式→手順→FAQ を本文として描画する。
 * 本文は h2 始まり（ページ側がツール名の <h1> を描画する）。
 */
export const toolContent: Record<string, ComponentType> = {
  "yutai-cross-cost": dynamic(() => import("../../../tools/yutai-cross-cost/content.mdx")),
  "toushin-cost": dynamic(() => import("../../../tools/toushin-cost/content.mdx")),
  "shift-cost": dynamic(() => import("../../../tools/shift-cost/content.mdx")),
  "fuyou-nokori": dynamic(() => import("../../../tools/fuyou-nokori/content.mdx")),
};

/** ツールの構造化データ（schema.json）。FAQPage をページに JSON-LD として注入する。 */
export interface ToolSchema {
  webApplication?: Record<string, unknown>;
  faqPage?: Record<string, unknown>;
}
export const toolSchemas: Record<string, ToolSchema> = {
  "yutai-cross-cost": yutaiSchema as ToolSchema,
  "toushin-cost": toushinSchema as ToolSchema,
  "shift-cost": shiftSchema as ToolSchema,
  "fuyou-nokori": fuyouSchema as ToolSchema,
};
