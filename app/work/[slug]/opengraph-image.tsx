import { ImageResponse } from "next/og";
import { CATEGORIES } from "@/lib/data";
import { getItemBySlug } from "@/lib/slugs";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Case study — Maitrya Anupam";

function categoryLabel(cat: string): string {
  const found = CATEGORIES.find((c) => c.key === cat);
  return found ? found.label : "Experience";
}

async function loadGoogleFont(family: string, weight: number, text: string) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(cssUrl).then((r) => r.text());
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error("font url not found");
  const res = await fetch(match[1]);
  if (!res.ok) throw new Error("font fetch failed");
  return res.arrayBuffer();
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItemBySlug(slug);

  const title = item?.title ?? "Maitrya Anupam";
  const org = item?.org ?? "";
  const num = item?.num ?? "";
  const year = item?.year ?? "";
  const cat = item ? categoryLabel(item.cat) : "";
  const tags = item?.tags.slice(0, 4) ?? [];

  const textForFont = `${title}${org}MAITRYA ANUPAM maitryaanupam.com${num}${year}${cat}${tags.join(
    ""
  )} — ·&`;

  const fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 600;
    style: "normal";
  }[] = [];
  try {
    const [fraunces, inter] = await Promise.all([
      loadGoogleFont("Fraunces", 600, textForFont),
      loadGoogleFont("Inter", 400, textForFont),
    ]);
    fonts.push(
      { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
      { name: "Inter", data: inter, weight: 400, style: "normal" }
    );
  } catch {
    // Fall back to the default bundled font if Google Fonts is unreachable.
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0c",
          color: "#f3efe5",
          padding: "64px 72px",
          fontFamily: fonts.length ? "Inter" : undefined,
        }}
      >
        {/* Top row: num stamp + category + year */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 26,
            color: "#b5b0a4",
          }}
        >
          {num && (
            <span
              style={{
                color: "#d4a847",
                border: "1.5px solid rgba(212,168,71,0.45)",
                borderRadius: 8,
                padding: "6px 16px",
              }}
            >
              {num}
            </span>
          )}
          {cat && <span>{cat}</span>}
          <span style={{ flexGrow: 1 }} />
          {year && <span>{year}</span>}
        </div>

        {/* Title + org */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: title.length > 55 ? 54 : 64,
              lineHeight: 1.12,
              fontFamily: fonts.length ? "Fraunces" : undefined,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              maxWidth: 1020,
            }}
          >
            {title}
          </div>
          {org && (
            <div style={{ fontSize: 28, color: "#b5b0a4", maxWidth: 980 }}>
              {org}
            </div>
          )}
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 21,
                    color: "#b5b0a4",
                    border: "1px solid rgba(255,255,255,0.16)",
                    borderRadius: 999,
                    padding: "7px 18px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
            fontSize: 26,
          }}
        >
          <span style={{ letterSpacing: "0.08em" }}>MAITRYA ANUPAM</span>
          <span style={{ color: "#d4a847" }}>maitryaanupam.com</span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
