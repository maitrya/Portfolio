"use client";

import { useEffect, useCallback, useState, Suspense } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { DATA } from "@/lib/data";
import type { ProjectItem } from "@/lib/data";
import { getSlug } from "@/lib/slugs";

interface ProjectSheetProps {
  item: ProjectItem | null;
  onClose: () => void;
  onNavigate?: (idx: number) => void;
}

const DOMAIN: Record<string, string> = {
  modelling: "Modelling & valuation",
  wealth: "Corp finance & wealth",
  derivatives: "Derivatives & risk",
  alternatives: "Alternatives & ESG",
  frameworks: "Frameworks",
  ai: "Applied AI",
  experience: "Experience",
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const sheetVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.18 } },
};

function ProjectSheetInner({ item, onClose, onNavigate }: ProjectSheetProps) {
  const [copied, setCopied] = useState(false);

  const itemIdx = item ? DATA.indexOf(item) : -1;
  const goPrev = useCallback(() => {
    if (itemIdx < 0 || !onNavigate) return;
    onNavigate((itemIdx - 1 + DATA.length) % DATA.length);
  }, [itemIdx, onNavigate]);
  const goNext = useCallback(() => {
    if (itemIdx < 0 || !onNavigate) return;
    onNavigate((itemIdx + 1) % DATA.length);
  }, [itemIdx, onNavigate]);

  // Sync URL to the open project using native history (Next's router.replace
  // resets scroll; replaceState does not). Keeps links shareable + deeplinkable.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("si");
    url.searchParams.delete("ex");
    if (item) {
      url.searchParams.set(item.kind === "si" ? "si" : "ex", item.num.split(" / ")[1]);
    }
    const qs = url.searchParams.toString();
    window.history.replaceState(null, "", qs ? `${url.pathname}?${qs}` : url.pathname);
  }, [item]);

  // Lock scroll while open via overflow:hidden (keeps the scroll position in
  // place — no jump — unlike position:fixed).
  const isOpen = item !== null;
  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.classList.add("scroll-locked");
    document.body.classList.add("scroll-locked");
    return () => {
      document.documentElement.classList.remove("scroll-locked");
      document.body.classList.remove("scroll-locked");
    };
  }, [isOpen]);

  // Escape closes, arrows browse
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    if (item) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [item, onClose, goPrev, goNext]);

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }, []);

  const numShort = item ? item.num.replace(/^(SI|EX) \/ /, "") : "";

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="sheet-bg open"
          style={{ display: "flex" }}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="sheet"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="sheet-close" onClick={onClose} aria-label="Close">
              &times;
            </button>

            <div className="sheet-side">
              <div className="big">{numShort}</div>
              <div className="dom">{DOMAIN[item.cat] ?? "Experience"}</div>
            </div>

            <div className="sheet-body">
              <div className="sheet-num">
                {item.num} &middot; {item.year}
              </div>
              <h3>{item.title}</h3>
              <div className="org">{item.org}</div>

              {item.thumb && (
                <figure className="sheet-fig">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.thumb} alt={item.title} loading="lazy" />
                  <figcaption>Exhibit &middot; {DOMAIN[item.cat]}</figcaption>
                </figure>
              )}

              <p className="desc">{item.desc}</p>

              {item.extras && item.extras.length > 0 && (
                <ul className="components">
                  {item.extras.map((extra) => (
                    <li key={extra.label}>
                      <strong>{extra.label}.</strong> {extra.text}
                    </li>
                  ))}
                </ul>
              )}

              {item.links && item.links.length > 0 && (
                <div className="sheet-links">
                  {item.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      {link.label} &rarr;
                    </a>
                  ))}
                </div>
              )}

              <div className="tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div>
                <Link href={`/work/${getSlug(item)}`} className="sheet-case-link">
                  Open full case study <span className="arr">&rarr;</span>
                </Link>
                <button className="sheet-share" onClick={handleShare}>
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            </div>

            {onNavigate && itemIdx >= 0 && (
              <div className="sheet-nav">
                <button onClick={goPrev} aria-label="Previous project">
                  &larr;
                </button>
                <span className="sheet-nav-count">
                  {itemIdx + 1} / {DATA.length}
                </span>
                <button onClick={goNext} aria-label="Next project">
                  &rarr;
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ProjectSheet(props: ProjectSheetProps) {
  return (
    <Suspense>
      <ProjectSheetInner {...props} />
    </Suspense>
  );
}
