"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { DATA, getSIItems, BENTO_MAP } from "@/lib/data";

interface WorkGridProps {
  activeFilter: string;
  onOpenSheet: (idx: number) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function WorkGrid({ activeFilter, onOpenSheet }: WorkGridProps) {
  const siItems = getSIItems();

  const visible = siItems.filter(
    (item) => activeFilter === "all" || item.cat === activeFilter
  );

  const handleGlow = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      e.currentTarget.style.setProperty("--glow-x", `${x}px`);
      e.currentTarget.style.setProperty("--glow-y", `${y}px`);
    },
    []
  );

  return (
    <section id="work">
      <div className="sec-head">
        <div>
          <div className="label">02 &mdash; Selected Work &amp; Experience</div>
          <h2>Projects &amp; case studies</h2>
        </div>
        <span className="count">{visible.length} projects</span>
      </div>
      <div className="work-grid">
        {visible.map((item, i) => {
          const bentoClass = BENTO_MAP[item.num] ?? "";
          const idx = DATA.indexOf(item);
          return (
            <motion.article
              key={item.num}
              className={`card${bentoClass ? ` ${bentoClass}` : ""}`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i}
              onClick={() => onOpenSheet(idx)}
              onMouseMove={handleGlow}
            >
              {item.thumb ? (
                <div className="card-thumb">
                  <img src={item.thumb} alt={item.title} />
                  <span className="stamp">{item.num}</span>
                  <span className="year-stamp">{item.year}</span>
                </div>
              ) : (
                <div className="card-thumb placeholder">
                  {item.num.split(" / ")[1]}
                  <span className="stamp">{item.num}</span>
                  <span className="year-stamp">{item.year}</span>
                </div>
              )}
              <div className="card-body">
                <h3>{item.title}</h3>
                <div className="org">{item.org}</div>
                <p className="card-desc">{item.desc}</p>
                <div className="tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
