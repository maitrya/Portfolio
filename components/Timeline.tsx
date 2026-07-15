"use client";

import { DATA, getEXItems } from "@/lib/data";

interface TimelineProps {
  onOpenSheet: (idx: number) => void;
}

export default function Timeline({ onOpenSheet }: TimelineProps) {
  const exItems = getEXItems();

  return (
    <section id="experience" className="block reveal">
      <div className="sec-head">
        <div>
          <div className="label">03 &mdash; Experience</div>
          <h2>Seven roles across research, trading, wealth &amp; venture.</h2>
        </div>
        <div className="count">7 roles</div>
      </div>
      <div className="timeline" data-stagger>
        {exItems.map((item) => {
          const isCurrent = item.year.includes("Now");
          const idx = DATA.indexOf(item);
          return (
            <div
              key={item.num}
              className={`tl-item${isCurrent ? " tl-current" : ""}`}
              onClick={() => onOpenSheet(idx)}
            >
              <div className="tl-dot" />
              <div className="tl-year">{item.year}</div>
              <div className="tl-card">
                <h3>{item.title}</h3>
                <div className="org">{item.org}</div>
                <p>{item.desc}</p>
                <div className="tags">
                  {item.tags.slice(0, 5).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
