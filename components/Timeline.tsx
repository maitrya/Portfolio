"use client";

import { motion } from "framer-motion";
import { DATA, getEXItems } from "@/lib/data";

interface TimelineProps {
  onOpenSheet: (idx: number) => void;
}

const tlVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Timeline({ onOpenSheet }: TimelineProps) {
  const exItems = getEXItems();

  return (
    <section className="timeline-section" id="experience">
      <div className="sec-head">
        <div>
          <div className="label">03 &mdash; Experience</div>
          <h2>Professional timeline</h2>
        </div>
        <span className="count">{exItems.length} roles</span>
      </div>
      <div className="timeline">
        {exItems.map((item, i) => {
          const isCurrent = item.year.includes("Now");
          const idx = DATA.indexOf(item);
          return (
            <motion.div
              key={item.num}
              className={`tl-item${isCurrent ? " tl-current" : ""}`}
              variants={tlVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i}
              onClick={() => onOpenSheet(idx)}
            >
              <div className="tl-dot" />
              <div className="tl-year">{item.year}</div>
              <div className="tl-card">
                <h3>{item.title}</h3>
                <div className="org">{item.org}</div>
                <p>{item.desc}</p>
                <div className="tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
