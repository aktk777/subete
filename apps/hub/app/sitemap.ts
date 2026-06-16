import type { MetadataRoute } from "next";
import { tools } from "../lib/registry";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "about", "contact", "privacy", "terms"].map((p) => ({
    url: `${SITE}/${p ? p + "/" : ""}`,
    lastModified: new Date(),
  }));
  const toolPages = tools
    .filter((t) => t.status === "live")
    .map((t) => ({ url: `${SITE}/tools/${t.slug}/`, lastModified: new Date() }));
  return [...staticPages, ...toolPages];
}
