"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";

interface HeroProps {
  onOpenSheet: (idx: number) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero({ onOpenSheet }: HeroProps) {
  const nowIdx = DATA.findIndex((d) => d.num === "EX / 01");

  return (
    <section className="hero">
      {/* Background mesh orbs */}
      <div className="hero-bg-mesh">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="hero-grid">
        {/* Left column */}
        <div>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Analysing markets &amp; <em>building</em> the tools that make that work faster.
          </motion.h1>

          <motion.p
            className="lede"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Investment analyst at the intersection of fundamental research and applied data engineering. I cover capital markets and alternatives &mdash; and I build the systems behind the analysis, from regulatory pipelines to FX product analytics.
          </motion.p>

          <motion.div
            className="ctas"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <a href="#work" className="btn primary">
              View work <span className="arr">&rarr;</span>
            </a>
            <a href="mailto:maitryainfinity@gmail.com" className="btn">
              Get in touch <span className="arr">&rarr;</span>
            </a>
            <a href="/resume.pdf" className="btn" target="_blank" rel="noopener noreferrer">
              Download CV <span className="arr">&darr;</span>
            </a>
          </motion.div>
        </div>

        {/* Right column — hero meta card */}
        <motion.div
          className="hero-meta"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <div className="hero-meta-row">
            <span className="hero-meta-key">Based</span>
            <span className="hero-meta-val">Sydney, AU</span>
          </div>

          <div className="hero-meta-row">
            <span className="hero-meta-key">Education</span>
            <span className="hero-meta-val">
              UTS Master of Finance <span className="sub">&middot; GPA 6.4/7</span>
              <div className="edu-badges">
                <span className="edu-badge">Heritage IT &middot; BTech</span>
                <span className="edu-badge">Startmate Fellow</span>
              </div>
            </span>
          </div>

          <div className="hero-meta-row">
            <span className="hero-meta-key">Credentials</span>
            <span className="hero-meta-val">
              CAIA L1 <span className="sub">&middot; L2 candidate &middot; CFA L1 candidate</span>
            </span>
          </div>

          <div
            className="hero-meta-row"
            data-open-ex="1"
            onClick={() => {
              if (nowIdx !== -1) onOpenSheet(nowIdx);
            }}
          >
            <span className="hero-meta-key">Now</span>
            <span className="hero-meta-val">
              AI Consultant &middot; Prepped Talent <span className="sub">&middot; Apr&nbsp;2026&ndash;Now</span>
              <br />
              Trading Ops &middot; Afterprime <span className="sub">&middot; Jan&nbsp;2026&ndash;Now</span>
            </span>
          </div>

          <div className="hero-meta-row">
            <span className="hero-meta-key">Mandate</span>
            <span className="hero-meta-val">Analyst &amp; Associate &middot; IM, M&amp;A, Corp Dev</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
