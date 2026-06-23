import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maitrya Anupam — Investment Analyst & Systems Builder",
  description:
    "Sydney-based investment analyst and systems builder. Selected work in M&A research, regulatory reporting automation, FX/CFD product analytics, and alternative investments.",
  openGraph: {
    title: "Maitrya Anupam — Investment Analyst & Systems Builder",
    description:
      "Selected work in M&A research, regulatory reporting automation, and alternative investments.",
    type: "website",
    url: "https://maitryaanupam.com",
    images: [{ url: "https://maitryaanupam.com/assets/og-card.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://maitryaanupam.com/assets/og-card.png"],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='18' fill='%230a0a0a'/%3E%3Ctext x='50' y='68' font-size='62' font-family='Georgia,serif' font-weight='500' fill='%23fafaf7' text-anchor='middle'%3EM%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
