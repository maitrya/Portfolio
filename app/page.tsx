"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { ThemeProvider } from "@/lib/theme";
import { DATA } from "@/lib/data";
import type { ProjectItem } from "@/lib/data";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkGrid from "@/components/WorkGrid";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProjectSheet from "@/components/ProjectSheet";
import CommandPalette from "@/components/CommandPalette";
import ScrollProgress from "@/components/ScrollProgress";

function PortfolioApp() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sheetItem, setSheetItem] = useState<ProjectItem | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const searchParams = useSearchParams();

  const openSheet = useCallback((idx: number) => {
    const item = DATA[idx];
    if (!item) return;
    setSheetItem(item);
    const kind = item.kind;
    const numOnly = item.num.replace(/[^0-9]/g, "");
    window.history.pushState({ idx }, "", `?${kind}=${numOnly}`);
  }, []);

  const closeSheet = useCallback(() => {
    setSheetItem(null);
    if (window.location.search) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const si = searchParams.get("si");
    const ex = searchParams.get("ex");
    if (!si && !ex) return;
    const targetNum = si
      ? `SI / ${si.padStart(2, "0")}`
      : `EX / ${ex!.padStart(2, "0")}`;
    const idx = DATA.findIndex((d) => d.num === targetNum);
    if (idx >= 0) {
      setActiveFilter("all");
      setSheetItem(DATA[idx]);
    }
  }, [searchParams]);

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

  return (
    <>
      <ScrollProgress />
      <Header
        onOpenPalette={() => setPaletteOpen(true)}
        onOpenSheet={openSheet}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <main>
        <Hero onOpenSheet={openSheet} />
        <About />
        <WorkGrid activeFilter={activeFilter} onOpenSheet={openSheet} />
        <Timeline onOpenSheet={openSheet} />
        <Contact />
      </main>
      <Footer />
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelect={(idx) => {
          setPaletteOpen(false);
          openSheet(idx);
        }}
      />
      <ProjectSheet item={sheetItem} onClose={closeSheet} onNavigate={openSheet} />
    </>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <Suspense>
        <PortfolioApp />
      </Suspense>
    </ThemeProvider>
  );
}
