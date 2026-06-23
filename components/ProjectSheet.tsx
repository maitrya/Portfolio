"use client";

import { useEffect, useCallback, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { ProjectItem } from "@/lib/data";

interface ProjectSheetProps {
  item: ProjectItem | null;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const sheetVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    transition: { duration: 0.2 },
  },
};

function ProjectSheetInner({ item, onClose }: ProjectSheetProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  // Update URL when opening a sheet
  useEffect(() => {
    if (item) {
      const paramKey = item.kind === "si" ? "si" : "ex";
      const paramVal = item.num.split(" / ")[1];
      const url = new URL(window.location.href);
      // Clear both params first
      url.searchParams.delete("si");
      url.searchParams.delete("ex");
      url.searchParams.set(paramKey, paramVal);
      router.replace(url.pathname + url.search, { scroll: false });
      document.body.classList.add("scroll-locked");
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete("si");
      url.searchParams.delete("ex");
      const clean = url.searchParams.toString()
        ? `${url.pathname}?${url.searchParams.toString()}`
        : url.pathname;
      router.replace(clean, { scroll: false });
      document.body.classList.remove("scroll-locked");
    }
    return () => {
      document.body.classList.remove("scroll-locked");
    };
  }, [item, router]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [item, onClose]);

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="sheet-bg"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="sheet"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image panel */}
            {item.thumb ? (
              <div className="sheet-img">
                <img src={item.thumb} alt={item.title} />
              </div>
            ) : (
              <div className="sheet-img placeholder">
                <span>{item.num.split(" / ")[1]}</span>
              </div>
            )}

            {/* Body panel */}
            <div className="sheet-body">
              <div className="sheet-num">
                {item.num} &middot; {item.year}
              </div>
              <h3>{item.title}</h3>
              <div className="org">{item.org}</div>
              <p className="desc">{item.desc}</p>

              {/* Extras */}
              {item.extras && item.extras.length > 0 && (
                <ul className="components">
                  {item.extras.map((extra) => (
                    <li key={extra.label}>
                      <strong>{extra.label}:</strong> {extra.text}
                    </li>
                  ))}
                </ul>
              )}

              {/* Links */}
              {item.links && item.links.length > 0 && (
                <div className="sheet-links">
                  {item.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Tags */}
              <div className="tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Share */}
              <button className="sheet-share" onClick={handleShare}>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M6 9.5l4-3M4.5 6.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM11.5 13.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM11.5 6.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM6 9.5l4 3" />
                </svg>
                {copied ? "Link copied!" : "Share"}
              </button>
            </div>

            {/* Close button */}
            <button className="sheet-close" onClick={onClose} aria-label="Close">
              &times;
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ProjectSheet(props: ProjectSheetProps) {
  return (
    <Suspense>
      <ProjectSheetInner {...props} />
    </Suspense>
  );
}
