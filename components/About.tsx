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
          <h2>Fundamental research, built on systems I design myself.</h2>
        </div>
        <div className="count">2 paragraphs</div>
      </div>
      <div className="about-grid">
        <p>
          My work sits at the boundary between investment analysis and applied data engineering. I read the same primary sources, models, and disclosures any analyst would &mdash; and then I build the pipelines that surface what matters faster than spreadsheets can.
        </p>
        <p>
          I&apos;m a <strong>UTS Master of Finance</strong> graduate (Dec 2024, GPA 6.4/7) with an undergraduate <strong>BTech in Engineering</strong> from Heritage Institute of Technology, and a <strong>two-time Startmate Student Fellow</strong>. Currently an AI Consultant at Prepped Talent and Trading Operations Specialist at Afterprime. Prior experience spans equity research at Maqro Capital (42 ASX reports), wealth management at Atlassio Capital Partners (HNW coverage), and founding Oasis &mdash; a Startmate-backed quick-commerce venture.
        </p>
      </div>
    </motion.section>
  );
}
