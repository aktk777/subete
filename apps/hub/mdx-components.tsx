import type { MDXComponents } from "mdx/types";

// @next/mdx（App Router）が要求する必須ファイル。MDX本文のタグ→Reactコンポーネント対応表。
// tools/<slug>/content.mdx の本文はページ側の <h1>（ツール名）の下に描画されるため、
// 本文は h2 始まり（## これは何 …）を前提にしている。
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
