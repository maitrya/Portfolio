# Maitrya's Portfolio — Cowork Project Memory

Persistent context for this project. **Read this first on every new session.**

---

## Who Maitrya is

Maitrya Anupam — Sydney-based investment analyst and systems builder. Targeting analyst & associate roles in investment management, M&A, capital markets, and corporate development.

- **Email:** maitryainfinity@gmail.com (personal) / maitryaanupam@outlook.com (career)
- **Mobile:** +61 435 912 684
- **LinkedIn:** linkedin.com/in/maitrya-anupam/ (slug not yet confirmed)
- **GitHub:** github.com/MaitryaAnupam (placeholder — confirm with Maitrya)

### Credentials

- **UTS Master of Finance** · Feb 2023 – Dec 2024 · GPA 6.4/7 (WAM 81.69) · scholarships: UTS International Postgraduate, CFA, CAIA
- **Heritage Institute of Technology, Kolkata** · B.Tech Applied Electronics & Instrumentation Engineering · Jul 2018 – Aug 2022 · GPA 8.22/10 (top 5%)
- **CAIA Level 2 candidate** · CFA Level 1 candidate
- **Two-time Startmate Student Fellow** (W24 + S25 cohorts)
- Yale Financial Markets · Stanford Statistics · Microsoft Business Analytics

### Current role

- **Afterprime · Trading Operations Specialist** · Jan 2026 – present (live multi-asset institutional book — FX, crypto, commodities, futures)

### Languages

English (professional) · Hindi (native) · Bengali (conversational)

---

## What this Project is for

This folder **is** the analyst portfolio site at the heart of Maitrya's job search. Single-page HTML site designed to be deployed on Vercel or Netlify and linked from his CV header and LinkedIn "Featured" section. The whole purpose: **a recruiter verifies his work end-to-end in 60 seconds**.

---

## File map

```
Portfolio/
├── index.html              ← The site (one source of truth)
├── resume.pdf              ← Master CV (currently Maitrya_Anupam_DFA_GCG.pdf, Feb 2026)
├── CLAUDE.md               ← This file
└── assets/
    ├── verandah-model.pdf         verandah-model.xlsx         (SI/01 Verandah 3-statement)
    ├── csl-dcf.pdf                csl-dcf.xlsx                (SI/03 CSL DCF)
    ├── three-stock-regression.pdf                             (SI/04 Ansell/Westpac/Metcash regression)
    ├── ramsay-corpfin.pdf         ramsay-corpfin.docx         (SI/06 Ramsay)
    ├── pwm-financial-plan.pdf     pwm-cashflow.xlsx           (SI/07 PWM — Cathy & Alan Smith)
    ├── drm-jet-fuel.pdf           drm-jet-fuel.docx           (SI/08 Jet Fuel hedge)
    ├── ecoventure-esg.pdf         ecoventure-sectors.xlsx     (SI/13 Eco Venture Capital ESG)
    ├── ethics-ai-finance.pdf                                  (SI/18 Ethics of AI in Finance)
    ├── source/                                                (markdown sources for the four new PDFs)
    └── gamestop-data.xlsx         (not currently linked, in reserve)
```

---

## Site structure

Sections in order:

1. **Hero** (Sydney · Investment Analyst, name in serif italic)
2. **Meta strip** (Sydney · UTS Master of Finance · CAIA L2 / CFA L1 · Open to Analyst & Associate)
3. **By the numbers** — six large serif stats: 42 ASX reports · $1B+ pipeline · 18% Sharpe · 55% risk reduction · 5% CSL outperf · 18 projects
4. **01 — About** (3 paragraphs)
5. **02 — Experience** (EX/01-06)
6. **03 — Selected Work** (SI/01-18)
7. **04 — Writing** (4 placeholder draft titles — either write them or delete this section)
8. **05 — Contact** (dark inverted card)

### Numbering conventions

- Experience entries use `EX/01`–`EX/06`, in `<div class="num">` blocks
- Projects use `SI/01`–`SI/18`, same pattern
- Both reuse the `.work-item` CSS class
- Each project card body: `<h3>` title → `<div class="org">` subtitle → `<p>` description → optional `<ul class="components">` bullets → optional `<div class="links">` (View PDF + Open source) → `<div class="tags">`

### Selected Work order (narrative groupings)

1. **Modelling & valuation** — SI/01 Verandah · SI/02 Saputo M&A · SI/03 CSL · SI/04 Ansell/Westpac/Metcash regression · SI/05 Rex Minerals
2. **Corporate finance & wealth** — SI/06 Ramsay · SI/07 PWM (Cathy & Alan Smith)
3. **Derivatives & risk** — SI/08 DRM Jet Fuel · SI/09 CRO Banking Simulation
4. **Alternatives & ESG** — SI/10 $1M Multi-Asset Alts · SI/11 Sustainable ETFs · SI/12 Rio Tinto Gulkula · SI/13 Eco Venture Capital ESG
5. **Frameworks** — SI/14 Growth Equity Term Sheets · SI/15 CAIA L2 Prep
6. **Applied AI** — SI/16 AI Job-Search Pipeline · SI/17 AI Derivatives Trading Platform · SI/18 Ethics of AI in Finance

### Experience order

1. **EX/01 Afterprime** · Trading Operations Specialist (Jan 2026 – Now)
2. **EX/02 Independent** · Quantitative Trader (Jun 2024 – Now)
3. **EX/03 Atlassio Capital Partners** · Wealth Management Intern (Jun – Nov 2025)
4. **EX/04 Oasis** · Co-Founder & CEO (Startmate W24 + S25, 2023 – 2024)
5. **EX/05 Maqro Capital** · Equity Research Analyst (Mar – Apr 2024)
6. **EX/06 UTS Business School** · Research Assistant (Nov 2023 – Aug 2025)

---

## Visual design system

This is **deliberately editorial-finance** — think Financial Times or Bloomberg, not warm/AI-startup-y. We explicitly moved AWAY from Anthropic's cream + terracotta because it read as Claude-coded.

### Palette (CSS variables)

- `--bg: #fafaf7` (off-white)
- `--ink: #0a0a0a` (near-black)
- `--ink-muted: #4a4a4a` · `--ink-soft: #888888`
- `--accent: #a8842c` (muted FT gold)
- `--line: rgba(10,10,10,0.10)` · `--line-soft: rgba(10,10,10,0.05)`

### Typography

- Display / headlines / numbers: **Fraunces** (serif), weight 500, italic for accent fragments
- Body / labels / nav: **Inter** (sans), weights 400/500
- Both loaded via Google Fonts CDN

### Conventions

- Numbers use `font-variant-numeric: tabular-nums`
- Italic + gold (`<em>` inside `.hero h1`, `.stat-num em`) is the editorial flourish
- Hover state on work items: subtle gold-tinted background + 16px left padding shift
- Section labels: `01 — Section Name` in uppercase, letter-spaced

---

## Off-limits / sensitive

- **Afterprime is Maitrya's current employer.** The company name CAN appear (in Experience under EX/01), but **proprietary projects** (FSA Quarterly Returns, the markup orders / DPM revenue report) **MUST NOT** be added back to Selected Work. They were intentionally removed.
- **Don't borrow Anthropic's brand colours** (cream + terracotta) on the site — already corrected once.
- Saputo / Ramsay / CSL / DRM are coursework + personal research, safe to publish.
- Maitrya also has a separate **modelling resume** (literally fashion/lifestyle modelling, not financial modelling). Keep that completely separate from this portfolio.

---

## Editing conventions

- **Prefer Python scripts** via `mcp__workspace__bash` for multi-edit changes. Use a `must_replace(old, new, label)` helper that asserts exactly one match — the file has tight string anchors and Python with assertions beats individual Edit calls.
- Make all SI/EX renumbering edits **high-to-low** to avoid duplicate-number collisions.
- Section numbering: if you add a new top-level section, update labels in subsequent sections AND nav links.
- New project cards: copy an existing `.work-item` block as a template. Don't reinvent the structure.
- Editorial-finance tone in copy: declarative, sparing of adverbs, lead with the result not the method. Avoid buzzwords like "passionate", "results-driven".

---

## Pending threads

- **GitHub slug** — placeholder is `github.com/MaitryaAnupam`; not confirmed. If Maitrya's GitHub is thin, consider hiding the link until populated.
- **LinkedIn slug** in contact card is `linkedin.com/in/maitrya-anupam/` — confirm.
- **Writing section** — four draft titles currently marked "Draft". Either write the actual posts or delete the section.
- **resume.pdf** is currently the DFA_GCG version (Feb 2026). If Maitrya generates a newer Master, swap.
- **Projects still skipped from Master CV** — Heart Disease ML (not finance), Ethical AI in Finance, Open Banking API, Stock Market Price Prediction (RBFN). Could add if Maitrya wants — currently skipped because non-core-finance.
- **Apify multi-board scraping pipeline** was discussed but not built — would feed LinkedIn / SEEK / Glassdoor roles into the Notion job tracker, downstream of the existing Indeed MCP.

---

## Deployment

- **Vercel** (recommended): `vercel.com → Add Project → Import folder` → drag `Portfolio/` in → free hosting + custom domain support
- **Netlify drag-and-drop** alternative: `app.netlify.com/drop`
- **Custom domain idea:** `maitrya.com` or `maitryaanupam.com` — buy through Vercel (~$15/yr) or point an existing one
- The folder is fully self-contained: `index.html` + `resume.pdf` + `assets/` is everything needed

---

## Related Cowork systems Maitrya uses

- **Notion "Job Applications" database** (data source id `6462af10-8de3-41ce-9af0-f5fbd487ee02`) — schema: Role / Company / Status / Applied Date / Source / Link / Location / Salary / Next Step / Next Step Date / Recruiter Email / Notes. 14 rows as of last sync.
- **Live Cowork artifact** "job-search-command-center" — daily-open dashboard with Notion + Gmail + Calendar integration; action buttons for Update Status, Draft Follow-up, Add Role from JD.
- **Gmail follow-up drafts** — auto-generated 7-day-cadence follow-ups saved to Drafts.
- **Notion Master Job Search page** under Dashboard parent.

---

## Tone preference

Maitrya is casual ("mate", "bro" sometimes). Match the energy but stay competent. Keep formatting minimal — prose over bullets, headers only when scanning matters. Don't over-narrate. Don't be preachy or repeat instructions back. Ship work, then briefly explain.
