import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SITE_NAME, websiteSchema, organizationSchema } from "@factory/seo";

// GA4 測定ID。公開値（HTMLに出る）なので既定値をコミットしてよい。
// Cloudflare 等で環境変数 NEXT_PUBLIC_GA4_ID を設定すればそちらが優先される。
const GA4 = process.env.NEXT_PUBLIC_GA4_ID || "G-0XD70PG5XZ";
const ADSENSE = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "";

const SITE_DESC = "面倒な計算・換算・見積をすぐに片付ける単機能ツールの集まり。";

export const metadata: Metadata = {
  metadataBase: SITE ? new URL(SITE) : undefined,
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESC,
  openGraph: { type: "website", siteName: SITE_NAME, locale: "ja_JP", title: SITE_NAME, description: SITE_DESC },
  twitter: { card: "summary" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        {/* AdSense は審査・承認後に NEXT_PUBLIC_ADSENSE_CLIENT を設定すると有効化（spec §4.A.5） */}
        {ADSENSE && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {GA4 && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4}');
            `}</Script>
          </>
        )}
      </head>
      <body>
        {/* サイト全体の構造化データ（E-E-A-T / AEO）。全ページ共通。 */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema(SITE)) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema(SITE)) }} />
        <header className="site">
          <div className="container">
            <div className="bar">
              <a className="brand" href="/"><span className="dot" />便利ツール集</a>
              <nav className="nav-top">
                <a href="/">ツール一覧</a>
                <a href="/about/">運営者情報</a>
              </nav>
            </div>
          </div>
        </header>
        <div className="container">{children}</div>
        <footer className="site">
          <div className="container">
            <nav>
              <a href="/about/">運営者情報</a>
              <a href="/contact/">お問い合わせ</a>
              <a href="/privacy/">プライバシーポリシー</a>
              <a href="/terms/">利用規約</a>
            </nav>
            <p>© {new Date().getFullYear()} 便利ツール集 — 計算結果は概算です。最終判断はご自身または専門家にご確認ください。</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
