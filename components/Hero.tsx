"use client";

import { useSettings } from "@/lib/settings";

export default function Hero() {
  const { settings } = useSettings();

  return (
    <section className="hero" id="top" data-bg={settings.bg}>
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-inner" data-stagger>
        <div className="eyebrow parallax" data-depth="-0.06">
          Investment Analyst &middot; Systems Builder &middot; Sydney
        </div>
        <h1 className="parallax" data-depth="-0.12">
          I value companies &mdash; and build the systems that{" "}
          <em>value them faster.</em>
        </h1>
        <p className="lede parallax" data-depth="-0.08">
          Fundamental research across capital markets and alternatives, paired
          with the data engineering behind it &mdash; from regulatory reporting
          pipelines to FX product analytics.
        </p>
        <div className="ctas">
          <a className="btn primary" href="#work">
            View selected work <span className="arr">&rarr;</span>
          </a>
          <a className="btn ghost" href="/resume.pdf" download>
            Download CV
          </a>
          <a
            href="mailto:maitryainfinity@gmail.com"
            style={{ fontSize: "13.5px", color: "var(--hero-accent)" }}
          >
            or email me &rarr;
          </a>
        </div>
        <div className="now-line">
          Now &mdash; <b>AI Consultant</b>, Prepped Talent &middot;{" "}
          <b>Trading Operations</b>, Afterprime
        </div>
        <div className="proof" data-stagger data-countup>
          <div>
            <div className="k">Education</div>
            <div className="v">UTS M.Fin</div>
            <div className="s">GPA 6.4 / 7</div>
          </div>
          <div>
            <div className="k">Credentials</div>
            <div className="v">CAIA L1</div>
            <div className="s">CFA L1 cand.</div>
          </div>
          <div>
            <div className="k">Fellowship</div>
            <div className="v">Startmate</div>
            <div className="s">2&times; Fellow</div>
          </div>
          <div>
            <div className="k">Track record</div>
            <div className="v">19 projects</div>
            <div className="s">7 roles</div>
          </div>
        </div>
      </div>
    </section>
  );
}
