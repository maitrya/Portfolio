"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DATA } from "@/lib/data";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (idx: number) => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const paletteVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: 0.12 },
  },
};

export default function CommandPalette({
  isOpen,
  onClose,
  onSelect,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter results
  const results = useMemo(() => {
    if (!query.trim()) return DATA;
    const q = query.toLowerCase();
    return DATA.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.org.toLowerCase().includes(q) ||
        d.desc.toLowerCase().includes(q) ||
        d.cat.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  // Reset on open/query change
  useEffect(() => {
    setActiveIdx(0);
  }, [query, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global keyboard shortcut
  useEffect(() => {
    const handleGlobal = (e: KeyboardEvent) => {
      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" && !isOpen && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement))
      ) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Parent should handle opening — this catches the / shortcut
          // We dispatch a custom event for the parent to listen to
          window.dispatchEvent(new CustomEvent("open-palette"));
        }
      }
    };
    window.addEventListener("keydown", handleGlobal);
    return () => window.removeEventListener("keydown", handleGlobal);
  }, [isOpen, onClose]);

  // Keyboard navigation within palette
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        const selected = results[activeIdx];
        const dataIdx = DATA.indexOf(selected);
        onSelect(dataIdx);
        onClose();
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [results, activeIdx, onSelect, onClose]
  );

  // Scroll active item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.children[activeIdx] as HTMLElement | undefined;
    if (active) {
      active.scrollIntoView({ block: "nearest" });
    }
  }, [activeIdx]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="palette-bg open"
          style={{ display: "flex" }}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="palette"
            variants={paletteVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <input
              ref={inputRef}
              className="palette-input"
              type="text"
              placeholder="Search projects, roles, tags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="palette-results" ref={listRef}>
              {results.length === 0 ? (
                <div className="palette-empty">
                  No results for &ldquo;{query}&rdquo;
                </div>
              ) : (
                results.map((item, i) => {
                  const dataIdx = DATA.indexOf(item);
                  return (
                    <div
                      key={item.num}
                      className={`palette-row${i === activeIdx ? " active" : ""}`}
                      onClick={() => {
                        onSelect(dataIdx);
                        onClose();
                      }}
                      onMouseEnter={() => setActiveIdx(i)}
                    >
                      <span className="palette-num">{item.num}</span>
                      <div className="palette-meta">
                        {item.title}
                        <div className="org">{item.org}</div>
                      </div>
                      <span className="palette-cat">{item.cat}</span>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
