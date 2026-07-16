"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export type View = "list" | "cards" | "board";
export type Accent = "green" | "oxblood" | "cobalt" | "champagne";
export type Bg = "none" | "grid" | "contour" | "wash";
export type MotionPref = "full" | "calm";

export interface Settings {
  view: View;
  accent: Accent;
  bg: Bg;
  motion: MotionPref;
}

const DEFAULTS: Settings = {
  view: "cards",
  accent: "green",
  bg: "grid",
  motion: "full",
};

const ACCENTS: Record<Accent, { l: string; d: string }> = {
  green: { l: "#2f4a3a", d: "#85ac92" },
  oxblood: { l: "#7c2d2d", d: "#d18f8f" },
  cobalt: { l: "#1f3a5f", d: "#8fb3d9" },
  champagne: { l: "#a8842c", d: "#d9bd7a" },
};

function accentCss(accent: Accent): string {
  const a = ACCENTS[accent] || ACCENTS.green;
  return (
    `[data-theme="light"]{--accent:${a.l};--accent-soft:color-mix(in oklab,${a.l} 9%,transparent);}` +
    `[data-theme="dark"]{--accent:${a.d};--accent-soft:color-mix(in oklab,${a.d} 14%,transparent);}` +
    `:root{--hero-accent:${a.d};}` +
    `.hero .eyebrow,.hero h1 em,.proof .s,.contact-card .eyebrow,.sheet-side .big{color:${a.d}!important;}` +
    `.btn.primary{background:${a.l}!important;color:#f4f0e4!important;}`
  );
}

const SettingsContext = createContext<{
  settings: Settings;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}>({ settings: DEFAULTS, setSetting: () => {} });

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  // Hydrate persisted settings after mount (SSR renders defaults).
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("mp-view-settings") || "{}"
      ) as Partial<Settings>;
      setSettings((s) => ({ ...s, ...saved }));
    } catch {
      /* ignore */
    }
  }, []);

  // Keep the injected accent stylesheet in sync (the pre-paint script in
  // layout.tsx creates #accentStyle; here we just update it).
  useEffect(() => {
    let el = document.getElementById("accentStyle") as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement("style");
      el.id = "accentStyle";
      document.head.appendChild(el);
    }
    el.textContent = accentCss(settings.accent);
  }, [settings.accent]);

  // Motion preference toggles a body class the CSS reads.
  useEffect(() => {
    document.body.classList.toggle("calm", settings.motion === "calm");
  }, [settings.motion]);

  const setSetting = useCallback(
    <K extends keyof Settings>(key: K, value: Settings[K]) => {
      setSettings((prev) => {
        const next = { ...prev, [key]: value };
        try {
          localStorage.setItem("mp-view-settings", JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    []
  );

  return (
    <SettingsContext.Provider value={{ settings, setSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
