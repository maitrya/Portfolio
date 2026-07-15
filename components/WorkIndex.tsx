"use client";

import { useEffect, useRef, useState } from "react";
import { DATA, getSIItems, CATEGORIES } from "@/lib/data";
import { useSettings } from "@/lib/settings";

interface WorkIndexProps {
  onOpenSheet: (idx: number) => void;
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

const BOARD_ORDER = [
  "modelling",
  "wealth",
  "derivatives",
  "alternatives",
  "frameworks",
  "ai",
];

export default function WorkIndex({ onOpenSheet }: WorkIndexProps) {
  const { settings } = useSettings();
  const [filter, setFilter] = useState("all");
  const viewRef = useRef<HTMLDivElement>(null);

  const si = getSIItems();
  const total = si.length;

  const counts: Record<string, number> = { all: total };
  si.forEach((d) => {
    counts[d.cat] = (counts[d.cat] || 0) + 1;
  });

  const num = (n: string) => n.replace("SI / ", "");
  const isVisible = (cat: string) => filter === "all" || cat === filter;
  const shown = filter === "all" ? total : counts[filter] || 0;

  // Cascade the current view's children in whenever view or filter changes,
  // independent of the global reveal observer (which only sees mount-time nodes).
  useEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    Array.from(el.children).forEach((c, i) =>
      (c as HTMLElement).style.setProperty("--i", String(i))
    );
    el.classList.remove("is-visible");
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => el.classList.add("is-visible"));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [settings.view, filter]);

  return (
    <section id="work" className="block reveal">
      <div className="sec-head">
        <div>
          <div className="label">02 &mdash; Selected work</div>
          <h2>A research index &mdash; nineteen projects, by domain.</h2>
        </div>
        <div className="count">
          {shown} of {total} showing
        </div>
      </div>

      <div className="filters" data-stagger>
        <button
          className={`chip${filter === "all" ? " active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All <span className="ct">{counts.all}</span>
        </button>
        {CATEGORIES.filter((c) => c.key !== "all").map((c) => (
          <button
            key={c.key}
            className={`chip${filter === c.key ? " active" : ""}`}
            onClick={() => setFilter(c.key)}
          >
            {c.label} <span className="ct">{counts[c.key] || 0}</span>
          </button>
        ))}
      </div>

      <div
        ref={viewRef}
        className={`work-view view-${settings.view}`}
        data-stagger
      >
        {settings.view === "list" && (
          <>
            <div className="index-headrow">
              <span>&#8470;</span>
              <span>Project</span>
              <span>Domain</span>
              <span>Year</span>
              <span className="h-out">Output</span>
            </div>
            {si.filter((d) => isVisible(d.cat)).map((d) => (
              <button
                key={d.num}
                className="idx-row"
                onClick={() => onOpenSheet(DATA.indexOf(d))}
              >
                <span className="idx-num">{num(d.num)}</span>
                <span className="idx-title">
                  <span className="t">{d.title}</span>
                  <span className="sub">{d.org}</span>
                </span>
                <span className="idx-domain">{DOMAIN[d.cat]}</span>
                <span className="idx-year">{d.year}</span>
                <span className="idx-out">
                  {d.tags[0]}
                  <span className="go">&rarr;</span>
                </span>
              </button>
            ))}
          </>
        )}

        {settings.view === "cards" && (
          <>
            {si.filter((d) => isVisible(d.cat)).map((d) => (
              <button
                key={d.num}
                className="pcard"
                onClick={() => onOpenSheet(DATA.indexOf(d))}
              >
                <div className="pcard-top">
                  <span className="pcard-num">{num(d.num)}</span>
                  <span className="pcard-year">{d.year}</span>
                </div>
                <div className="pcard-dom">{DOMAIN[d.cat]}</div>
                <div className="pcard-title">{d.title}</div>
                <div className="pcard-out">
                  <span>{d.tags[0]}</span>
                  <span className="go">&rarr;</span>
                </div>
              </button>
            ))}
          </>
        )}

        {settings.view === "board" &&
          BOARD_ORDER.map((cat) => {
            const items = si.filter((d) => d.cat === cat && isVisible(d.cat));
            if (!items.length) return null;
            return (
              <div key={cat} className="board-col">
                <div className="board-col-head">
                  {DOMAIN[cat]}
                  <span>{items.length}</span>
                </div>
                {items.map((d) => (
                  <button
                    key={d.num}
                    className="bcard"
                    onClick={() => onOpenSheet(DATA.indexOf(d))}
                  >
                    <span className="bcard-num">{num(d.num)}</span>
                    <span className="bcard-title">{d.title}</span>
                    <span className="bcard-year">{d.year}</span>
                  </button>
                ))}
              </div>
            );
          })}
      </div>
    </section>
  );
}
