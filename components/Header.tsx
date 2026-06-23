"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  DATA,
  TICKER_ITEMS,
  TICKER_MAP,
  CATEGORIES,
  getCategoryCounts,
  getEXItems,
} from "@/lib/data";
import { useTheme } from "@/lib/theme";

interface HeaderProps {
  onOpenPalette: () => void;
  onOpenSheet: (idx: number) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const CAT_META: Record<string, { icon: string; sublabel: string }> = {
  all: { icon: "Σ", sublabel: "Every project" },
  modelling: { icon: "Δ", sublabel: "Valuations & models" },
  wealth: { icon: "£", sublabel: "Advisory & planning" },
  derivatives: { icon: "σ", sublabel: "Hedging & pricing" },
  alternatives: { icon: "☘", sublabel: "Alt assets & ESG" },
  frameworks: { icon: "△", sublabel: "Tools & systems" },
  ai: { icon: "✱", sublabel: "ML & automation" },
};

export default function Header({
  onOpenPalette,
  onOpenSheet,
  activeFilter,
  onFilterChange,
}: HeaderProps) {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const counts = getCategoryCounts();
  const exItems = getEXItems();

  const handleTickerClick = useCallback(
    (label: string) => {
      const ref = TICKER_MAP[label];
      if (ref === null) {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
      } else if (ref) {
        const idx = DATA.findIndex((d) => d.num === ref);
        if (idx !== -1) onOpenSheet(idx);
      }
    },
    [onOpenSheet]
  );

  const tickerDuplicated = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <>
      <header className="top">
        <div className="top-row">
          {/* Brand */}
          <Link href="/" className="brand">
            Maitrya <em>Anupam</em>
          </Link>

          {/* Nav links (desktop) */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <nav className="nav-links">
              {/* Work dropdown */}
              <div className="nav-item">
                <button className="nav-link">
                  Work
                  <svg
                    className="dd-arrow"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M2 3.5L5 6.5L8 3.5" />
                  </svg>
                </button>
                <div className="nav-dropdown">
                  <button
                    onClick={() => onFilterChange("all")}
                  >
                    <span className="dd-icon">{CAT_META.all.icon}</span>
                    <span className="dd-label">
                      All Projects
                      <small>{CAT_META.all.sublabel}</small>
                    </span>
                    <span className="dd-count">{counts.all}</span>
                  </button>
                  <div className="dd-sep" />
                  {CATEGORIES.filter((c) => c.key !== "all").map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => onFilterChange(cat.key)}
                    >
                      <span className="dd-icon">
                        {CAT_META[cat.key]?.icon ?? "•"}
                      </span>
                      <span className="dd-label">
                        {cat.label}
                        <small>
                          {CAT_META[cat.key]?.sublabel ?? ""}
                        </small>
                      </span>
                      <span className="dd-count">
                        {counts[cat.key] ?? 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience dropdown */}
              <div className="nav-item">
                <button className="nav-link">
                  Experience
                  <svg
                    className="dd-arrow"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M2 3.5L5 6.5L8 3.5" />
                  </svg>
                </button>
                <div className="nav-dropdown">
                  {exItems.map((ex) => {
                    const idx = DATA.indexOf(ex);
                    return (
                      <button key={ex.num} onClick={() => onOpenSheet(idx)}>
                        <span className="dd-icon">
                          {ex.num.split(" / ")[1]}
                        </span>
                        <span className="dd-label">
                          {ex.title.split(" · ")[0]}
                          <small>
                            {ex.title.split(" · ")[1] ?? ex.org} &middot;{" "}
                            {ex.year}
                          </small>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </nav>

            {/* Search trigger */}
            <div className="search-wrap">
              <button className="search-trigger" onClick={onOpenPalette}>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <circle cx="7" cy="7" r="5.2" />
                  <path d="M11 11l3.5 3.5" />
                </svg>
                <span>Search projects&hellip;</span>
                <span className="kbd">&thinsp;/&thinsp;</span>
              </button>
            </div>
          </div>

          {/* Top-right controls */}
          <div className="top-right">
            <span className="status-pill">
              <span className="status-dot" />
              Open to roles
            </span>
            <button
              className="theme-toggle"
              onClick={toggle}
              aria-label="Toggle theme"
            >
              <svg
                className="moon"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M6 1a7 7 0 1 0 8.9 8.9A5.5 5.5 0 0 1 6 1Z" />
              </svg>
              <svg
                className="sun"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <circle cx="8" cy="8" r="3" />
                <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
              </svg>
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Menu"
            >
              <svg
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                {mobileOpen ? (
                  <>
                    <path d="M4 4l10 10" />
                    <path d="M14 4L4 14" />
                  </>
                ) : (
                  <>
                    <path d="M2 5h14" />
                    <path d="M2 9h14" />
                    <path d="M2 13h14" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div className={`mobile-nav${mobileOpen ? " open" : ""}`}>
        <div className="mobile-nav-section">
          <div className="mobile-nav-section-title">Work</div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              className="mobile-nav-link"
              onClick={() => {
                onFilterChange(cat.key);
                setMobileOpen(false);
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="dd-icon">
                {CAT_META[cat.key]?.icon ?? "•"}
              </span>
              <span>
                {cat.label}
                <small>{CAT_META[cat.key]?.sublabel ?? ""}</small>
              </span>
            </button>
          ))}
        </div>
        <div className="mobile-nav-section">
          <div className="mobile-nav-section-title">Experience</div>
          {exItems.map((ex) => {
            const idx = DATA.indexOf(ex);
            return (
              <button
                key={ex.num}
                className="mobile-nav-link"
                onClick={() => {
                  onOpenSheet(idx);
                  setMobileOpen(false);
                }}
              >
                <span className="dd-icon">
                  {ex.num.split(" / ")[1]}
                </span>
                <span>
                  {ex.title.split(" · ")[0]}
                  <small>
                    {ex.title.split(" · ")[1] ?? ex.org} &middot;{" "}
                    {ex.year}
                  </small>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ticker */}
      <div className="ticker">
        <div className="ticker-track">
          {tickerDuplicated.map(([label, value, suffix], i) => (
            <button
              key={`${label}-${i}`}
              className="ticker-item"
              onClick={() => handleTickerClick(label)}
            >
              <strong>{label}</strong>
              <span className="tk-num">{value}</span>
              {suffix}
            </button>
          ))}
        </div>
      </div>

      {/* Filter chips bar */}
      <div className="chips-bar">
        <div className="chips-inner">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              className={`chip${activeFilter === cat.key ? " active" : ""}`}
              onClick={() => onFilterChange(cat.key)}
            >
              {cat.label}
              <span className="ct">{counts[cat.key] ?? counts.all}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
