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

export default function Contact() {
  const today = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.section
      id="contact"
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="contact-card">
        <div>
          <div className="eyebrow">Get in touch</div>
          <h2>
            Let&apos;s build something together.
          </h2>
          <p className="blurb">
            I&apos;m currently open to quantitative, trading operations, and
            applied-AI roles. If you think there&apos;s a fit, I&apos;d love to
            hear from you.
          </p>
          <div className="live-row">
            <span className="status-dot" />
            Available &middot; {today}
          </div>
        </div>
        <div className="c-links">
          <a href="mailto:maitryainfinity@gmail.com">
            <span>maitryainfinity@gmail.com</span>
            <span className="lbl">Email</span>
          </a>
          <a
            href="https://linkedin.com/in/maitrya-anupam"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>linkedin.com/in/maitrya-anupam</span>
            <span className="lbl">LinkedIn</span>
          </a>
          <a
            href="https://github.com/maitrya-anupam"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>github.com/maitrya-anupam</span>
            <span className="lbl">GitHub</span>
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download CV</span>
            <span className="lbl">PDF</span>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
