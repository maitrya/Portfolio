"use client";

import { useTheme } from "@/lib/theme";

interface HeaderProps {
  onOpenPalette: () => void;
}

export default function Header({ onOpenPalette }: HeaderProps) {
  const { toggle } = useTheme();

  return (
    <header className="top">
      <div className="top-row">
        <div style={{ display: "flex", alignItems: "center" }}>
          <a className="brand" href="#top">
            Maitrya <em>Anupam</em>
          </a>
          <nav className="nav-links">
            <a className="nav-link" href="#about">About</a>
            <a className="nav-link" href="#work">Work</a>
            <a className="nav-link" href="#experience">Experience</a>
            <a className="nav-link" href="#contact">Contact</a>
          </nav>
        </div>
        <div className="top-right">
          <button className="search-btn" onClick={onOpenPalette} aria-label="Open search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="lbl">Search</span>
            <span className="kbd">&#8984;K</span>
          </button>
          <span className="status-pill">
            <span className="status-dot" /> <span className="lbl-full">Open to roles</span>
          </span>
          <button className="icon-btn theme-toggle" onClick={toggle} aria-label="Toggle theme">
            <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
