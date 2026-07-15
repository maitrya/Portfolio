"use client";

import { useEffect } from "react";

/**
 * Framer-style motion, ported from the design's vanilla script:
 * reveal-on-scroll (blur + stagger), count-up on stat values, magnetic
 * buttons, and hero parallax. Runs once after mount; WorkIndex manages its
 * own view-switch reveals so this only needs the mount-time nodes.
 */
export default function MotionEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // index stagger children so they cascade
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
      Array.from(el.children).forEach((c, i) =>
        (c as HTMLElement).style.setProperty("--i", String(i))
      );
    });

    // hero entrance on load
    const hero = document.querySelector(".hero-inner");
    const rafId = requestAnimationFrame(() =>
      requestAnimationFrame(() => hero?.classList.add("is-visible"))
    );

    function runCountUp(scope: Element) {
      if (reduce) return;
      scope.querySelectorAll<HTMLElement>(".v, .s").forEach((node) => {
        const raw = node.textContent || "";
        const m = raw.match(/(\d+(?:\.\d+)?)/);
        if (!m || m.index === undefined) return;
        const target = parseFloat(m[1]);
        const decimals = (m[1].split(".")[1] || "").length;
        const before = raw.slice(0, m.index);
        const after = raw.slice(m.index + m[1].length);
        const dur = 1100;
        const t0 = performance.now();
        function tick(now: number) {
          const p = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          node.textContent = before + (target * eased).toFixed(decimals) + after;
          if (p < 1) requestAnimationFrame(tick);
          else node.textContent = raw;
        }
        requestAnimationFrame(tick);
      });
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            if ((e.target as HTMLElement).hasAttribute("data-countup"))
              runCountUp(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    document
      .querySelectorAll(".reveal, [data-stagger]")
      .forEach((el) => obs.observe(el));

    // magnetic buttons
    const magnetCleanups: Array<() => void> = [];
    if (!reduce) {
      document
        .querySelectorAll<HTMLElement>(".btn, .icon-btn, .search-btn")
        .forEach((el) => {
          const strength = el.classList.contains("btn") ? 0.32 : 0.22;
          const move = (e: PointerEvent) => {
            if (document.body.classList.contains("calm")) return;
            const r = el.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width / 2) * strength;
            const y = (e.clientY - r.top - r.height / 2) * strength;
            el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
          };
          const leave = () => {
            el.style.transform = "";
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          magnetCleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });
    }

    // hero parallax
    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>(".parallax")
    );
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.pageYOffset;
        if (
          !reduce &&
          !document.body.classList.contains("calm") &&
          y < window.innerHeight * 1.2
        ) {
          parallaxEls.forEach((el) => {
            const depth = parseFloat(el.getAttribute("data-depth") || "0") || 0;
            el.style.transform = `translate3d(0,${(y * depth).toFixed(1)}px,0)`;
          });
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      obs.disconnect();
      magnetCleanups.forEach((fn) => fn());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
