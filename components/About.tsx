"use client";

import { motion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function About() {
  return (
    <motion.section
      id="about"
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="sec-head">
        <div>
          <div className="label">01 &mdash; About</div>
          <h2>Background &amp; approach</h2>
        </div>
      </div>
      <div className="about-grid">
        <p>
          I graduated from UTS with a <strong>Master of Finance (6.4 / 7)</strong>,
          earning a place on the Dean&apos;s List and an Academic Excellence Award.
          My coursework spanned equity valuation, derivatives pricing,
          alternative investments, and corporate finance &mdash; every project in
          this portfolio started as a real assignment and was extended well past
          the brief.
        </p>
        <p>
          Outside the classroom I&apos;ve worked across{" "}
          <strong>institutional trading operations, equity research, private
          wealth, and quantitative strategy</strong>. I build models in Excel and
          Python, write research that people actually read, and ship software
          that connects quantitative analysis with front-office
          decision-making &mdash; recently using AI agents and MCP tooling to
          automate entire workflows.
        </p>
      </div>
    </motion.section>
  );
}
