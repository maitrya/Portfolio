"use client";

import { useEffect, useState } from "react";

export default function Contact() {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );
  }, []);

  return (
    <section id="contact" className="block reveal">
      <div className="contact-card">
        <div>
          <div className="eyebrow">04 &mdash; Contact</div>
          <h2>Open to analyst &amp; associate conversations.</h2>
          <p className="blurb">
            Sydney-based, willing to travel. Most interested in investment
            management, M&amp;A, capital markets, and corporate development.
            Email is fastest &mdash; happy to share a long-form CV, memo samples,
            or model walk-throughs.
          </p>
          <div className="live-row">
            <span className="status-dot" /> Open to roles &middot; updated {today}
          </div>
        </div>
        <div className="c-links" data-stagger>
          <a href="mailto:maitryainfinity@gmail.com">
            <span>
              <span className="lbl">Email</span>
              <br />
              <span className="val">maitryainfinity@gmail.com</span>
            </span>
            <span>&rarr;</span>
          </a>
          <a
            href="https://www.linkedin.com/in/maitrya-anupam/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <span className="lbl">LinkedIn</span>
              <br />
              <span className="val">in/maitrya-anupam</span>
            </span>
            <span>&rarr;</span>
          </a>
          <a
            href="https://github.com/maitrya"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <span className="lbl">GitHub</span>
              <br />
              <span className="val">github.com/maitrya</span>
            </span>
            <span>&rarr;</span>
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <span>
              <span className="lbl">CV</span>
              <br />
              <span className="val">Latest &middot; PDF</span>
            </span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
