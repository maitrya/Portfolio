import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/slugs";

const BASE = "https://maitryaanupam.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...getAllSlugs().map((slug) => ({
      url: `${BASE}/work/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
