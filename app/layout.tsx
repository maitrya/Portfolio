import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://maitryaanupam.com"),
  title: "Maitrya Anupam — Investment Analyst & Systems Builder",
  description:
    "Sydney-based investment analyst and systems builder. Selected work in M&A research, valuation, derivatives & risk, alternatives, and applied AI.",
  openGraph: {
    title: "Maitrya Anupam — Investment Analyst & Systems Builder",
    description:
      "Selected work in M&A research, valuation, derivatives, alternatives, and applied AI.",
    type: "website",
    url: "https://maitryaanupam.com",
    images: [{ url: "https://maitryaanupam.com/assets/og-card.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://maitryaanupam.com/assets/og-card.png"],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='16' fill='%2317160f'/%3E%3Ctext x='50' y='70' font-size='60' font-family='Georgia,serif' font-weight='500' fill='%23f4f0e4' text-anchor='middle'%3EM%3C/text%3E%3C/svg%3E",
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
    "https://www.linkedin.com/in/maitrya-anupam/",
    "https://github.com/maitrya",
  ],
};

// Apply saved theme + accent before first paint, on every route (case-study
// pages have no React provider, and this avoids a flash of the default accent).
const prefsScript = `(function(){try{
var t=localStorage.getItem('theme-pref')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
document.documentElement.setAttribute('data-theme',t);
var S={green:['#2f4a3a','#85ac92'],oxblood:['#7c2d2d','#d18f8f'],cobalt:['#1f3a5f','#8fb3d9'],champagne:['#a8842c','#d9bd7a']};
var cfg={};try{cfg=JSON.parse(localStorage.getItem('mp-view-settings')||'{}')}catch(e){}
var a=S[cfg.accent]||S.green;
var st=document.getElementById('accentStyle')||document.createElement('style');st.id='accentStyle';
st.textContent='[data-theme="light"]{--accent:'+a[0]+';--accent-soft:color-mix(in oklab,'+a[0]+' 9%,transparent);}[data-theme="dark"]{--accent:'+a[1]+';--accent-soft:color-mix(in oklab,'+a[1]+' 14%,transparent);}:root{--hero-accent:'+a[1]+';}.hero .eyebrow,.hero h1 em,.proof .s,.contact-card .eyebrow,.sheet-side .big{color:'+a[1]+' !important;}.btn.primary{background:'+a[0]+' !important;color:#f4f0e4 !important;}';
document.head.appendChild(st);
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: prefsScript }} />
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
