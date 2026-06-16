"use client";
import { useEffect, useRef } from "react";

/**
 * 広告枠。寸法を予約して CLS=0。NEXT_PUBLIC_ADSENSE_CLIENT が設定されている時だけ実広告を注入。
 * 未設定（審査前）は placeholder を描画する（spec §4.A.5 段階投入）。見た目は globals.css の `.ad-slot`。
 */
export function AdSlot({ slot, minHeight = 280 }: { slot?: string; minHeight?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  useEffect(() => {
    if (!client) return;
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script (added in layout when client is set)
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [client]);

  if (!client) {
    return (
      <div className="ad-slot" aria-hidden style={{ minHeight }}>
        広告枠（審査後に表示）
      </div>
    );
  }
  return (
    <div ref={ref} style={{ minHeight }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
