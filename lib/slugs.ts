import { DATA } from "./data";
import type { ProjectItem } from "./data";

/** Stable, human-readable URL slugs keyed by item num. */
export const SLUG_MAP: Record<string, string> = {
  "SI / 01": "verandah-brands-3-statement-model",
  "SI / 02": "saputo-wcb-acquisition",
  "SI / 03": "csl-equity-valuation",
  "SI / 04": "multi-stock-regression",
  "SI / 05": "rex-minerals-mining-valuation",
  "SI / 06": "ramsay-capital-structure",
  "SI / 07": "pwm-financial-plan",
  "SI / 08": "jet-fuel-cross-hedging",
  "SI / 09": "chief-risk-officer-simulation",
  "SI / 10": "exotic-options-pricing",
  "SI / 11": "multi-asset-alternatives-portfolio",
  "SI / 12": "sustainable-etf-portfolio",
  "SI / 13": "rio-tinto-gulkula-esg",
  "SI / 14": "eco-venture-capital-esg",
  "SI / 15": "growth-equity-term-sheet",
  "SI / 16": "caia-level-2-system",
  "SI / 17": "ai-job-search-pipeline",
  "SI / 18": "ai-derivatives-trading-platform",
  "SI / 19": "ethics-of-ai-in-finance",
  "EX / 01": "prepped-talent-ai-consultant",
  "EX / 02": "afterprime-trading-operations",
  "EX / 03": "independent-quant-trader",
  "EX / 04": "atlassio-wealth-management",
  "EX / 05": "oasis-founder",
  "EX / 06": "maqro-equity-research",
  "EX / 07": "uts-research-assistant",
};

const NUM_BY_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_MAP).map(([num, slug]) => [slug, num])
);

export function getSlug(item: ProjectItem): string {
  return SLUG_MAP[item.num];
}

export function getItemBySlug(slug: string): ProjectItem | undefined {
  const num = NUM_BY_SLUG[slug];
  if (!num) return undefined;
  return DATA.find((d) => d.num === num);
}

export function getAllSlugs(): string[] {
  return DATA.map((d) => SLUG_MAP[d.num]).filter(Boolean);
}

/** Previous / next items in DATA order, wrapping around. */
export function getAdjacent(item: ProjectItem): {
  prev: ProjectItem;
  next: ProjectItem;
} {
  const idx = DATA.indexOf(item);
  const prev = DATA[(idx - 1 + DATA.length) % DATA.length];
  const next = DATA[(idx + 1) % DATA.length];
  return { prev, next };
}

/** Up to `count` items from the same category, topped up with neighbours. */
export function getRelated(item: ProjectItem, count = 3): ProjectItem[] {
  const sameCat = DATA.filter((d) => d !== item && d.cat === item.cat);
  const others = DATA.filter((d) => d !== item && d.cat !== item.cat);
  return [...sameCat, ...others].slice(0, count);
}
