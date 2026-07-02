import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/data";
import { getAllSlugs, getItemBySlug, getSlug, getAdjacent, getRelated } from "@/lib/slugs";
import DcfSensitivity from "@/components/widgets/DcfSensitivity";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function categoryLabel(cat: string): string {
  const found = CATEGORIES.find((c) => c.key === cat);
  return found ? found.label : "Experience";
}

function truncate(text: string, max = 158): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) return {};
  const title = `${item.title} — Maitrya Anupam`;
  const description = truncate(item.desc);
  return {
    title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/work/${slug}`,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) notFound();

  const { prev, next } = getAdjacent(item);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.desc,
    url: `https://maitryaanupam.com/work/${slug}`,
    dateCreated: item.year,
    genre: categoryLabel(item.cat),
    keywords: item.tags.join(", "),
    author: {
      "@type": "Person",
      name: "Maitrya Anupam",
      url: "https://maitryaanupam.com",
    },
  };

  return (
    <div className="case-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="case-top">
        <Link href="/" className="case-back">
          &larr; Maitrya Anupam
        </Link>
        <Link href="/#work" className="case-back sub">
          All work
        </Link>
      </nav>

      <main className="case-main">
        <header className="case-head">
          <div className="case-meta-row">
            <span className="case-num">{item.num}</span>
            <span className="case-cat">{categoryLabel(item.cat)}</span>
            <span className="case-year">{item.year}</span>
          </div>
          <h1>{item.title}</h1>
          <p className="case-org">{item.org}</p>
          <div className="tags">
            {item.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {item.thumb && (
          <div className="case-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.thumb} alt={item.title} />
          </div>
        )}

        <section className="case-body">
          <p className="case-desc">{item.desc}</p>

          {item.num === "SI / 03" && <DcfSensitivity />}

          {item.extras && item.extras.length > 0 && (
            <div className="case-extras">
              {item.extras.map((extra) => (
                <div key={extra.label} className="case-extra">
                  <div className="case-extra-label">{extra.label}</div>
                  <p>{extra.text}</p>
                </div>
              ))}
            </div>
          )}

          {item.links && item.links.length > 0 && (
            <div className="case-links">
              {item.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="btn"
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label} <span className="arr">&rarr;</span>
                </a>
              ))}
            </div>
          )}
        </section>

        <section className="case-cta">
          <p>Interested in this kind of work?</p>
          <a href="mailto:maitryainfinity@gmail.com" className="btn primary">
            Get in touch <span className="arr">&rarr;</span>
          </a>
        </section>

        <section className="case-related">
          <div className="case-related-head">More like this</div>
          <div className="case-related-grid">
            {getRelated(item).map((rel) => (
              <Link
                key={rel.num}
                href={`/work/${getSlug(rel)}`}
                className="case-related-card"
              >
                <span className="case-related-num">{rel.num}</span>
                <span className="case-related-title">{rel.title}</span>
                <span className="case-related-org">{rel.org}</span>
              </Link>
            ))}
          </div>
        </section>

        <nav className="case-pager">
          <Link href={`/work/${getSlug(prev)}`} className="case-pager-link">
            <span className="case-pager-dir">&larr; Previous</span>
            <span className="case-pager-title">{prev.title}</span>
          </Link>
          <Link href={`/work/${getSlug(next)}`} className="case-pager-link right">
            <span className="case-pager-dir">Next &rarr;</span>
            <span className="case-pager-title">{next.title}</span>
          </Link>
        </nav>
      </main>
    </div>
  );
}
