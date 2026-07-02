import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://maitryaanupam.com"),
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Maitrya Anupam",
  url: "https://maitryaanupam.com",
  email: "mailto:maitryainfinity@gmail.com",
  jobTitle: "Investment Analyst & Systems Builder",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sydney",
    addressCountry: "AU",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Technology Sydney",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Heritage Institute of Technology",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/in/maitryaanupam",
    "https://github.com/maitrya",
  ],
};

// Apply the saved theme before first paint on every route (the home page's
// ThemeProvider only runs after hydration, and case-study pages have no provider).
const themeInitScript = `try{var t=localStorage.getItem("theme-pref")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

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
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
