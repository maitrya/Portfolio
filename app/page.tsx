"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { ThemeProvider } from "@/lib/theme";
import { SettingsProvider } from "@/lib/settings";
import { DATA } from "@/lib/data";
import type { ProjectItem } from "@/lib/data";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkIndex from "@/components/WorkIndex";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProjectSheet from "@/components/ProjectSheet";
import CommandPalette from "@/components/CommandPalette";
import ScrollProgress from "@/components/ScrollProgress";
import TweakPanel from "@/components/TweakPanel";
import MotionEffects from "@/components/MotionEffects";

function PortfolioApp() {
  const [sheetItem, setSheetItem] = useState<ProjectItem | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const searchParams = useSearchParams();

  const openSheet = useCallback((idx: number) => {
    const item = DATA[idx];
    if (!item) return;
    setSheetItem(item);
  }, []);

  const closeSheet = useCallback(() => {
    setSheetItem(null);
  }, []);

  // Deeplink (?si=03 / ?ex=02) opens the matching project on load.
  useEffect(() => {
    const si = searchParams.get("si");
    const ex = searchParams.get("ex");
    if (!si && !ex) return;
    const targetNum = si
      ? `SI / ${si.padStart(2, "0")}`
      : `EX / ${ex!.padStart(2, "0")}`;
    const idx = DATA.findIndex((d) => d.num === targetNum);
    if (idx >= 0) setSheetItem(DATA[idx]);
  }, [searchParams]);

  // Back/forward navigation.
  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const si = params.get("si");
      const ex = params.get("ex");
      if (si || ex) {
        const targetNum = si
          ? `SI / ${si.padStart(2, "0")}`
          : `EX / ${ex!.padStart(2, "0")}`;
        const idx = DATA.findIndex((d) => d.num === targetNum);
        if (idx >= 0) setSheetItem(DATA[idx]);
      } else {
        setSheetItem(null);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // The command palette dispatches this on the "/" shortcut.
  useEffect(() => {
    const open = () => setPaletteOpen(true);
    window.addEventListener("open-palette", open);
    return () => window.removeEventListener("open-palette", open);
  }, []);

  return (
    <>
      <ScrollProgress />
      <Header onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero />
        <About />
        <WorkIndex onOpenSheet={openSheet} />
        <Timeline onOpenSheet={openSheet} />
        <Contact />
      </main>
      <Footer />
      <TweakPanel />
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelect={(idx) => {
          setPaletteOpen(false);
          openSheet(idx);
        }}
      />
      <ProjectSheet item={sheetItem} onClose={closeSheet} onNavigate={openSheet} />
      <MotionEffects />
    </>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <Suspense>
          <PortfolioApp />
        </Suspense>
      </SettingsProvider>
    </ThemeProvider>
  );
}
