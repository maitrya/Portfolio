"use client";

import { useEffect, useRef, useState } from "react";
import { useSettings, type Accent, type Bg, type MotionPref, type View } from "@/lib/settings";
import { useTheme } from "@/lib/theme";

const VIEWS: { val: View; label: string }[] = [
  { val: "list", label: "List" },
  { val: "cards", label: "Placards" },
  { val: "board", label: "Board" },
];

const ACCENTS: { val: Accent; color: string; label: string }[] = [
  { val: "green", color: "#2f4a3a", label: "Ledger green" },
  { val: "oxblood", color: "#7c2d2d", label: "Oxblood" },
  { val: "cobalt", color: "#1f3a5f", label: "Cobalt" },
  { val: "champagne", color: "#a8842c", label: "Champagne" },
];

const BGS: { val: Bg; label: string }[] = [
  { val: "none", label: "None" },
  { val: "grid", label: "Grid" },
  { val: "contour", label: "Contour" },
  { val: "wash", label: "Wash" },
];

const MOTIONS: { val: MotionPref; label: string }[] = [
  { val: "full", label: "Full" },
  { val: "calm", label: "Calm" },
];

export default function TweakPanel() {
  const { settings, setSetting } = useSettings();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const fabRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        fabRef.current &&
        !fabRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  const setTheme = (val: "light" | "dark") => {
    if (theme !== val) toggle();
  };

  return (
    <>
      <button
        ref={fabRef}
        className="tweak-fab"
        aria-label="Customise view"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
      </button>

      <div
        ref={panelRef}
        className={`tweak-panel${open ? " open" : ""}`}
        role="dialog"
        aria-label="View settings"
      >
        <div className="tweak-head">Customise</div>

        <div className="tweak-group">
          <div className="tweak-label">Work layout</div>
          <div className="seg">
            {VIEWS.map((v) => (
              <button
                key={v.val}
                className={settings.view === v.val ? "active" : ""}
                onClick={() => setSetting("view", v.val)}
              >
                {v.label}
              </button>
            ))}
          </div>
          <div className="tweak-hint">
            Placards &amp; board trade the long scroll for a scan.
          </div>
        </div>

        <div className="tweak-group">
          <div className="tweak-label">Accent</div>
          <div className="swatches">
            {ACCENTS.map((a) => (
              <button
                key={a.val}
                className={`swatch${settings.accent === a.val ? " active" : ""}`}
                style={{ background: a.color }}
                aria-label={a.label}
                onClick={() => setSetting("accent", a.val)}
              />
            ))}
          </div>
        </div>

        <div className="tweak-group">
          <div className="tweak-label">Hero backdrop</div>
          <div className="seg">
            {BGS.map((b) => (
              <button
                key={b.val}
                className={settings.bg === b.val ? "active" : ""}
                onClick={() => setSetting("bg", b.val)}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <div className="tweak-group">
          <div className="tweak-label">Theme</div>
          <div className="seg">
            <button
              className={theme === "light" ? "active" : ""}
              onClick={() => setTheme("light")}
            >
              Light
            </button>
            <button
              className={theme === "dark" ? "active" : ""}
              onClick={() => setTheme("dark")}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="tweak-group">
          <div className="tweak-label">Motion</div>
          <div className="seg">
            {MOTIONS.map((m) => (
              <button
                key={m.val}
                className={settings.motion === m.val ? "active" : ""}
                onClick={() => setSetting("motion", m.val)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
