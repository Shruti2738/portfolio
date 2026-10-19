
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shruti2738.github.io/portfolio";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-10-19"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
