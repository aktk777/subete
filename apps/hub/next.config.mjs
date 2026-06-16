import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import createMDX from "@next/mdx";
const here = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",            // 静的書き出し（Cloudflare Pages 等に out/ を配信）
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  // .mdx を import できるように拡張子を登録（tools/<slug>/content.mdx を本文として読み込む）
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  transpilePackages: ["@factory/ui", "@factory/seo", "@factory/monetization", "@factory/analytics"],
  experimental: { outputFileTracingRoot: join(here, "../../") },
};

const withMDX = createMDX({});
export default withMDX(nextConfig);
