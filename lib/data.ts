export interface ProjectLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface ProjectExtra {
  label: string;
  text: string;
}

export interface ProjectItem {
  kind: "si" | "ex";
  num: string;
  cat: string;
  title: string;
  org: string;
  year: string;
  thumb?: string;
  desc: string;
  extras?: ProjectExtra[];
  links?: ProjectLink[];
  tags: string[];
}

export const DATA: ProjectItem[] = [
  {
    kind: "si",
    num: "SI / 01",
    cat: "modelling",
    title: "Verandah Brands · 3-Statement D2C Model",
    org: "Integrated financial modelling · Base & downside cases",
    year: "2026",
    thumb: "/assets/media/stats/verandah.svg",
    desc: "Full three-statement integrated model on Verandah Brands' D2C portfolio. Monthly cohort projections on a driver tree — sessions × conversion rate × AOV → revenue — with COGS, opex, and working-capital schedules flowing through to a linked P&L, cash-flow statement, and balance sheet. Base and downside cases toggled from a single assumptions sheet.",
    extras: [
      { label: "Balance-sheet roll", text: "Assets minus Liabilities plus Equity ties to zero every period in both scenarios." },
      { label: "Cash reconciliation", text: "Closing cash on the balance sheet matches the cash-flow walk, period over period." },
      { label: "Driver tree to revenue", text: "Every revenue line traces back to a discrete operational driver." },
      { label: "Dedicated checks tab", text: "Green-cell integrity dashboard makes every tie-out visible in one place." },
    ],
    links: [
      { href: "/assets/verandah-model.pdf", label: "View the model" },
      { href: "/assets/verandah-model.xlsx", label: "Open the .xlsx" },
    ],
    tags: ["Financial modelling", "3-statement", "Driver-based", "Scenario analysis", "D2C"],
  },
  {
    kind: "si",
    num: "SI / 02",
    cat: "modelling",
    thumb: "/assets/media/stats/saputo.svg",
    title: "Saputo · Warrnambool Cheese & Butter Acquisition",
    org: "M&A valuation case · ASX dairy / consumer staples",
    year: "2024",
    desc: "Full bid-price recommendation on Saputo's acquisition of remaining WCB shares. DCF — FCFF projection, WACC ~5.15% from CAPM and after-tax cost of debt, explicit forecast plus terminal value — alongside relative-valuation cross-check on EV/EBITDA. Triangulated per-share range of $7.28–$7.73 (DCF) vs $4.90–$5.30 (comps); layered qualitative factors (China cap, sanctions, WCB position) to arrive at a $7.90 bid.",
    links: [{ href: "https://www.canva.com/d/87SSC0ztY_tJ_0o", label: "View the deck", external: true }],
    tags: ["M&A", "DCF", "Comps", "WACC · CAPM", "ASX"],
  },
  {
    kind: "si",
    num: "SI / 03",
    cat: "modelling",
    title: "CSL Limited · Equity Valuation & Analyst Report",
    org: "Investment management · ASX biotech blue-chip",
    year: "2024",
    thumb: "/assets/media/stats/csl.svg",
    desc: "Led a team of five through a full equity valuation on CSL Limited. Combined DCF and relative-valuation methodology with a 16-name biotech peer set (Novartis, Roche, AbbVie, Eli Lilly, Moderna, Gilead, Merck, Novo Nordisk and others) on EV/EBIT and EV/EBITDA. Sensitivity tables across WACC, terminal growth, and FCFF. Triangulated to a sell recommendation that beat market consensus by 5%. Built from FactSet fundamentals across nine years.",
    links: [
      { href: "/assets/csl-acv-report.pdf", label: "View the report" },
      { href: "/assets/csl-acv-model.xlsx", label: "Open the valuation .xlsx" },
      { href: "/assets/csl-dcf.pdf", label: "View the DCF deck" },
      { href: "/assets/csl-dcf.xlsx", label: "Open the DCF .xlsx" },
    ],
    tags: ["Equity research", "Relative valuation", "16-name peer set", "ASX biotech", "Team lead (5)"],
  },
  {
    kind: "si",
    num: "SI / 04",
    cat: "modelling",
    title: "Ansell, Westpac & Metcash · Multi-Stock Regression",
    org: "Financial modelling & analysis · ASX cross-sector",
    year: "2023",
    thumb: "/assets/media/stats/three-stock.svg",
    desc: "Three-stock applied econometrics study across Ansell (ANN-AU, healthcare), Westpac (WBC-ASX, major bank), and Metcash (MTS-AU, staples). Cross-correlation matrix (ANN/WBC 0.27, ANN/MTS 0.17, WBC/MTS 0.25) and two-tailed t-tests at 99% confidence for return-mean differences. Multiple regression against market and sector factors, plus simple-exponential-smoothing forecasts to test signal stability. Closed with a diversification call favouring Metcash + Ansell.",
    links: [
      { href: "/assets/three-stock-regression.pdf", label: "View the report" },
      { href: "/assets/three-stock-data.xlsx", label: "Open the working .xlsx" },
    ],
    tags: ["Applied econometrics", "Cross-correlation", "t-test", "SES forecasting", "ASX"],
  },
  {
    kind: "si",
    num: "SI / 05",
    cat: "modelling",
    thumb: "/assets/media/stats/rex.svg",
    title: "Rex Minerals · Multi-Project Mining Valuation",
    org: "Project finance & capital budgeting · ASX mining",
    year: "2024",
    desc: "Valuation and capital-budgeting for Rex Minerals across Hillside (copper-gold) and Hog Ranch — supporting a $1B+ revenue pipeline. Project-by-project NPV with peer benchmarking across comparable ASX miners over the prior decade, sized capex schedules, and stress-tested project economics under varied commodity-price scenarios.",
    tags: ["Project finance", "Capital budgeting", "NPV", "ASX mining", "Comps"],
  },
  {
    kind: "si",
    num: "SI / 06",
    cat: "wealth",
    title: "Ramsay Health Care · Capital Structure & Payout",
    org: "Corporate finance case · ASX-listed healthcare",
    year: "2024",
    thumb: "/assets/media/stats/ramsay.svg",
    desc: "Capital-structure and dividend-policy analysis on RHC, the largest private hospital operator in Australia (~A$200bn industry). Decomposed aggressive debt financing across five years against expansive investment plans; benchmarked payout strategy and capital intensity vs Sonic Healthcare (ASX) and Chemed Corp (NYSE) — covering regulation, capital and labour intensity, patient-volume dynamics, and M&A backdrop. Closed with industry-aware recommendations on financing mix and shareholder returns.",
    links: [
      { href: "/assets/ramsay-corpfin.pdf", label: "View the memo" },
      { href: "/assets/ramsay-corpfin.docx", label: "Open the .docx" },
    ],
    tags: ["Corporate finance", "Capital structure", "Dividend policy", "ASX healthcare", "Peer analysis"],
  },
  {
    kind: "si",
    num: "SI / 07",
    cat: "wealth",
    title: "PWM · Cathy & Alan Smith Financial Plan",
    org: "Private wealth case · Retirement, debt & risk planning",
    year: "2024",
    thumb: "/assets/media/stats/pwm.svg",
    desc: "End-to-end financial plan for a dual-income Sydney couple — A$670k mortgage, A$45k car loans, A$41k credit-card debt, A$85k combined super, retirement target in 14 years. Built super projections (6.5% compounding to ~A$859k funding ~A$78k p.a. for 20 years), debt-paydown sequence, life and income-protection cover sizing, and asset-allocation recommendation tuned to goals and risk tolerance.",
    links: [
      { href: "/assets/pwm-financial-plan.pdf", label: "View the plan" },
      { href: "/assets/pwm-cashflow.xlsx", label: "Open the cashflow .xlsx" },
    ],
    tags: ["Wealth management", "Retirement", "Superannuation", "Debt strategy", "Risk & insurance"],
  },
  {
    kind: "si",
    num: "SI / 08",
    cat: "derivatives",
    title: "Jet Fuel Cross-Hedging Strategy",
    org: "Derivatives & risk management · Energy commodities",
    year: "2025",
    thumb: "/assets/media/stats/drm.svg",
    desc: "Cross-hedging strategy for jet fuel price risk — a market with no exchange-traded jet fuel future. Tested three structures: heating oil futures only (Case A), crude oil futures only (Case B), and combined basket (Case C). Computed minimum-variance hedge ratios and optimal contract counts via OLS, ECM, and multiple-linear-regression across rolling windows, with both in-sample and out-of-sample performance testing. The combined hedge delivered the strongest result — 55% risk reduction at peak. Layered an April 2020 negative-WTI / super-contango case study.",
    links: [
      { href: "/assets/drm-jet-fuel.pdf", label: "View the report" },
      { href: "/assets/drm-jet-fuel.docx", label: "Open the .docx" },
    ],
    tags: ["Derivatives", "Cross-hedging", "Min-var hedge ratio", "Energy", "Risk management"],
  },
  {
    kind: "si",
    num: "SI / 09",
    cat: "derivatives",
    thumb: "/assets/media/stats/cro.svg",
    title: "Chief Risk Officer · Banking Simulation",
    org: "Risk simulation · Banking · 10 quarters",
    year: "2024",
    desc: "Led an 8-person CRO team through a 10-quarter banking risk simulation. Implemented duration analysis, VaR, and CDS overlays to manage IRRBB, liquidity risk, and capital adequacy. Maintained Basel III capital ratios across the full run.",
    tags: ["Risk management", "IRRBB", "VaR · CDS", "Basel III", "Team lead (8)"],
  },
  {
    kind: "si",
    num: "SI / 10",
    cat: "derivatives",
    thumb: "/assets/media/stats/exotic-opts.svg",
    title: "Exotic Options Pricing & Volatility Modelling",
    org: "Derivatives research · Barrier, Lookback & Asian options",
    year: "2024",
    desc: "Analytical proposal for pricing exotic and vanilla derivatives under stochastic volatility — combining real-time volatility surface calculation (LSTM + Gradient Boosting), Monte Carlo simulation + neural networks for path-dependent pricing, reinforcement learning for Barrier knock-in / knock-out triggers, and Quantum Approximate Optimization (QAOA) for high-dimensional exotic pricing problems. Critiqued Black-Scholes assumptions, mapped the $500T derivatives market context, and sized the cost-benefit case to a $4.8M revenue projection.",
    extras: [
      { label: "Barrier options", text: "RL predicts knock-in / knock-out triggers and optimises hedging response." },
      { label: "Lookback options", text: "Neural networks evaluate full historical price paths to maximise payoff." },
      { label: "Asian options", text: "Deep learning models estimate average-price forecasts under path-dependence." },
      { label: "Volatility surface", text: "Sub-second updates targeting <1% pricing error margin." },
      { label: "Quantum overlay", text: "QAOA applied to high-dimensional exotic pricing — first-class venture differentiator." },
    ],
    links: [{ href: "/assets/exotic-options.pdf", label: "View the proposal" }],
    tags: ["Exotic derivatives", "Volatility surfaces", "Monte Carlo · RL", "Barrier · Lookback · Asian", "Black-Scholes critique"],
  },
  {
    kind: "si",
    num: "SI / 11",
    cat: "alternatives",
    thumb: "/assets/media/stats/multi-asset.svg",
    title: "$1M Multi-Asset Alternatives Portfolio",
    org: "Alternative investments · Multi-asset construction",
    year: "2024",
    desc: "Constructed and managed a $1M alternatives mandate spanning gold, cryptocurrency, unlisted property (Centuria Select Opportunities Fund, 15% target IRR), and an energy ETF. Assessed pairwise correlation, inflation-hedging capacity, and liquidity profile across asset classes.",
    tags: ["Alt investments", "Multi-asset", "Portfolio construction", "Liquidity & correlation"],
  },
  {
    kind: "si",
    num: "SI / 12",
    cat: "alternatives",
    thumb: "/assets/media/stats/etfs.svg",
    title: "Sustainable ETF Portfolio Recommendation",
    org: "ESG investing · Listed funds",
    year: "2024",
    desc: "Two-fund analysis and capital-allocation recommendation across Australia's sustainable-investing universe. Compared BetaShares Global Sustainability Leaders (ETHI) against VanEck MSCI International Sustainable Equity (ESGI). Regional and sector concentration, risk-adjusted performance (Sharpe, Treynor, tracking error), and fee impact. Closed with a $10,000 ESGI allocation as the better-diversified, risk-adjusted-return option.",
    links: [{ href: "https://www.canva.com/d/lEcG4E_PbO8MjGl", label: "View the deck", external: true }],
    tags: ["ESG", "ETF analysis", "Portfolio construction", "Risk-adjusted"],
  },
  {
    kind: "si",
    num: "SI / 13",
    cat: "alternatives",
    thumb: "/assets/media/stats/gulkula.svg",
    title: "Rio Tinto · Gulkula Mining ESG Case Study",
    org: "ESG / extractives · Industry analysis",
    year: "2024",
    desc: "ESG case for Dhupuma Plateau Bauxite Mine — first Indigenous-owned and operated mining venture on traditional Yolngu land. Environmental (low-impact surface mining, native-knowledge rehabilitation), Social (Gulkula Regional Training Centre, community self-sufficiency), Governance (Gumatj Corporation oversight, NLC engagement). Thesis: culturally-aligned, capital-light ESG holding inside a Rio Tinto sustainability allocation.",
    links: [{ href: "https://www.canva.com/d/TirUDbSGLt90XZt", label: "View the deck", external: true }],
    tags: ["ESG", "Extractives", "Industry analysis", "Governance"],
  },
  {
    kind: "si",
    num: "SI / 14",
    cat: "alternatives",
    title: "Eco Venture Capital · ESG Policy & Portfolio",
    org: "Sustainable finance · Fund-level policy",
    year: "2024",
    thumb: "/assets/media/stats/ecoventure.svg",
    desc: "Fund-level ESG policy and sector-aware sustainable portfolio for Eco Venture Capital LLC — constrained to the S&P 500 universe. Defined screening criteria, exclusions (tobacco, controversial weapons, thermal coal), engagement framework, and proxy-voting policy. Constructed a sector-balanced portfolio across IT, Health Care, Financials, Industrials, Communication, and Consumer sectors with per-name justification and ESG-aligned weighting overlay.",
    links: [
      { href: "/assets/ecoventure-esg.pdf", label: "View the report" },
      { href: "/assets/ecoventure-sectors.xlsx", label: "Open the portfolio .xlsx" },
    ],
    tags: ["Sustainable finance", "ESG policy", "Portfolio construction", "S&P 500", "Exclusion screening"],
  },
  {
    kind: "si",
    num: "SI / 15",
    cat: "frameworks",
    thumb: "/assets/media/stats/growth-eq.svg",
    title: "Growth Equity Term Sheet Framework",
    org: "Personal project · Capital structure",
    year: "2026",
    desc: "Analytical framework for evaluating growth-equity term sheets — term-by-term red-flag review, market benchmarking versus current data, cap-table dilution modelling under multiple exit scenarios, and a negotiation-leverage map for founder vs. investor positions.",
    tags: ["Growth equity", "Cap-table", "Term-sheet"],
  },
  {
    kind: "si",
    num: "SI / 16",
    cat: "frameworks",
    thumb: "/assets/media/stats/caia.svg",
    title: "CAIA Level 2 Preparation System",
    org: "Personal · Self-directed study",
    year: "2025–26",
    desc: "Interactive learning system for CAIA Level 2 — spaced-repetition flashcards, constructed-response practice, and progress tracking across hedge funds, private equity, real assets, and risk management.",
    tags: ["Alt investments", "HF · PE · Real assets", "Risk management"],
  },
  {
    kind: "si",
    num: "SI / 17",
    cat: "ai",
    thumb: "/assets/media/stats/ai-job.svg",
    title: "AI-Augmented Job-Search Pipeline",
    org: "Personal · Workflow automation & applied AI",
    year: "2026",
    desc: "End-to-end system that runs my entire job search as software — replacing a spreadsheet, half a dozen browser tabs, and a calendar reminder with one workflow I open once a day. Built on Cowork MCPs, Notion, Gmail, and Calendar; designed to scale across hundreds of applications without losing fidelity on any one of them.",
    extras: [
      { label: "Notion database", text: "Custom schema covering role, company, status, source, applied date, salary, next step + date, recruiter email, and notes." },
      { label: "Daily HTML command-center", text: "Live dashboard pulling Notion, Gmail threads, and Calendar events into one view with one-click actions." },
      { label: "Auto-drafted follow-ups", text: "Identifies applications >7 days old, resolves recipient, drafts a tailored email with Haiku, saves to Gmail Drafts." },
      { label: "Multi-board sourcing", text: "Indeed MCP plus planned Apify hooks for LinkedIn, SEEK, and Glassdoor — deduped against the tracker." },
      { label: "Tailored materials flow", text: "Resume- and cover-letter-tailoring against parsed JDs through a structured prompt pipeline." },
      { label: "Interview tracking", text: "Calendar events flow back into the dashboard alongside the role so prep context is one click away." },
    ],
    tags: ["Workflow automation", "MCP · Notion · Gmail", "Applied AI · Haiku", "System design"],
  },
  {
    kind: "si",
    num: "SI / 18",
    cat: "ai",
    thumb: "/assets/media/stats/ai-deriv.svg",
    title: "AI-Driven Derivatives Trading Platform",
    org: "Applied AI venture concept · Pricing & hedging",
    year: "2025",
    desc: "End-to-end design of an AI-powered derivatives trading platform — combined ML (LSTM forecasting, Gradient Boosting), reinforcement learning for adaptive strategy selection, and quantum-computing (QAOA) overlays to optimise pricing and hedging across an instrument universe. 3-phase implementation roadmap and a financial model projecting $4.8M+ annual revenue. Benchmarked vs Bloomberg Terminal and Robinhood.",
    tags: ["Applied AI", "ML · LSTM", "Reinforcement learning", "QAOA", "Derivatives"],
  },
  {
    kind: "si",
    num: "SI / 19",
    cat: "ai",
    title: "Ethics of AI in Finance · Next Insurance, Bloomberg & Betterment",
    org: "Applied AI · Ethical & professional analysis",
    year: "2024",
    thumb: "/assets/media/stats/ethics-ai.svg",
    desc: "Critical case-study analysis of AI deployments across three fintech archetypes: Next Insurance (insurtech underwriting automation), Bloomberg (BloombergGPT and NLP), and Betterment (robo-adviser portfolio optimisation and tax-loss harvesting). Examined algorithmic bias, data-privacy exposure, transparency, market-stability risk, and workforce displacement — proposed a governance framework anchored on explainable AI, diverse training data, regular bias audits, and human-in-the-loop oversight.",
    links: [{ href: "/assets/ethics-ai-finance.pdf", label: "View the essay" }],
    tags: ["Applied AI", "Insurtech", "Algorithmic bias", "AI governance", "Fintech"],
  },
  {
    kind: "ex",
    num: "EX / 01",
    cat: "experience",
    thumb: "/assets/media/stats/prepped.svg",
    title: "Prepped Talent · AI Consultant",
    org: "Applied AI · Recruitment technology · Sydney",
    year: "Apr 2026 – Now",
    desc: "Consulting on AI strategy and implementation for a recruitment technology platform. Designing and deploying AI-powered workflows including candidate matching, resume parsing, and automated screening pipelines. Bridging technical AI capabilities with business-level hiring outcomes.",
    tags: ["AI consulting", "Recruitment tech", "Workflow automation", "Applied AI"],
  },
  {
    kind: "ex",
    num: "EX / 02",
    cat: "experience",
    thumb: "/assets/media/stats/afterprime.svg",
    title: "Afterprime · Trading Operations Specialist",
    org: "Institutional multi-asset · FX, crypto, commodities, futures",
    year: "Jan 2026 – Now",
    desc: "Day-to-day operational ownership across a live institutional book — reconciliation, break investigation, position integrity, and resolution of margin / cash / settlement discrepancies before end-of-day cutoff. Leading a cross-functional P&L attribution and revenue-reporting build with the trading and finance desks, owning the recurring deliverable end-to-end. Expanded into LP performance work (venue-level spread, fill quality, retention) and live exposure monitoring. Built Python agents and reconciliation workflows that cut cycle time by ~50%; mentor newer ops hires through the SOPs adopted across the team.",
    tags: ["Trade ops", "LP & exposure", "P&L attribution", "FX · crypto · futures", "Python ~50% faster", "Cross-functional lead"],
  },
  {
    kind: "ex",
    num: "EX / 03",
    cat: "experience",
    thumb: "/assets/media/stats/indep-quant.svg",
    title: "Independent · Quantitative Trader",
    org: "Derivatives strategies · Equity & FX markets",
    year: "Jun 2024 – Now",
    desc: "Designed and back-tested derivatives trading strategies across equity and FX markets using Python (pandas, numpy) and FactSet data — improved Sharpe ratio by 18% on the deployed strategy set. Built VaR and PnL attribution models to monitor portfolio exposure and daily position risk. Analysed transaction and market-microstructure data for liquidity, volatility, and information-response patterns. Developed Python scripts and AI agents to automate reconciliation and flag breaks across trade, margin, and cash settlement.",
    tags: ["Quant trading", "Python · FactSet", "Back-testing", "VaR · PnL", "18% Sharpe"],
  },
  {
    kind: "ex",
    num: "EX / 04",
    cat: "experience",
    thumb: "/assets/media/stats/atlassio.svg",
    title: "Atlassio Capital Partners · Wealth Management Intern",
    org: "Private wealth · APRA / ASIC compliance",
    year: "Jun – Nov 2025",
    desc: "Supported senior relationship managers servicing 15+ high-net-worth client mandates — daily portfolio summaries, asset-allocation reviews, credit exposure reports tailored to client risk profiles. Identified 3 liquidity-risk and capital-adequacy issues and prepared written escalation briefs that informed rebalancing decisions.",
    tags: ["Wealth management", "HNW coverage", "Portfolio summaries", "Regulatory compliance"],
  },
  {
    kind: "ex",
    num: "EX / 05",
    cat: "experience",
    thumb: "/assets/media/stats/oasis.svg",
    title: "Oasis · Founder & CEO",
    org: "Startmate accelerator · Hyperlocal quick-commerce",
    year: "Jan – Apr 2025",
    desc: "Founded a hyperlocal quick-commerce platform accepted into Startmate — Australia's most competitive early-stage accelerator. Built financial models, investor pitch materials, and commercial partnership agreements from inception. Managed 20+ commercial partner relationships and presented company financials and growth strategy to Startmate's institutional investor network — securing commercial commitments and advancing to the accelerator's demo day cohort.",
    tags: ["Startmate", "Financial modelling", "Investor pitch", "Partnership negotiation"],
  },
  {
    kind: "ex",
    num: "EX / 06",
    cat: "experience",
    thumb: "/assets/media/stats/maqro.svg",
    title: "Maqro Capital · Equity Research Analyst",
    org: "ASX equity research · Institutional & retail coverage",
    year: "Mar – Apr 2024",
    desc: "Authored 42 equity research reports on ASX-listed companies for institutional and retail clients — financial-statement analysis, corporate-action monitoring, sector developments, translated into structured investment recommendations. Tracked macro developments and quantified earnings sensitivity, flagging 4 high-risk positions ahead of market moves.",
    tags: ["Equity research", "ASX coverage", "42 reports", "Sector analysis"],
  },
  {
    kind: "ex",
    num: "EX / 07",
    cat: "experience",
    thumb: "/assets/media/stats/uts-ra.svg",
    title: "UTS Business School · Research Assistant",
    org: "Academic research · Python + SQL data engineering",
    year: "Nov 2023 – Nov 2025",
    desc: "Constructed a 500-firm Canadian mining database and a 10-year, 29-state Indian insurance panel dataset using Python and SQL — delivering clean, publication-ready datasets that directly contributed to two peer-reviewed academic research papers. Conducted extensive financial statement analysis and forensic accounting using LSEG, Bloomberg, and FactSet.",
    tags: ["Python · SQL", "Academic research", "Dataset construction", "Bloomberg · FactSet"],
  },
];

export const TICKER_ITEMS: [string, string, string][] = [
  ["ASX coverage", "42", "reports at Maqro"],
  ["Pipeline", "$1B+", "revenue modelled"],
  ["Sharpe lift", "18%", "quant book"],
  ["Risk cut", "55%", "jet-fuel hedge"],
  ["CSL outperf", "5%", "vs consensus"],
  ["Projects", "19", "selected work"],
  ["Cycle time", "-50%", "Afterprime ops"],
  ["Roles", "7", "industry tenures"],
];

export const BENTO_MAP: Record<string, string> = {
  "SI / 01": "bento-feature",
  "SI / 03": "bento-wide",
  "SI / 08": "bento-wide",
  "SI / 10": "bento-tall",
  "SI / 17": "bento-wide",
};

export const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "modelling", label: "Modelling & valuation" },
  { key: "wealth", label: "Corp finance & wealth" },
  { key: "derivatives", label: "Derivatives & risk" },
  { key: "alternatives", label: "Alternatives & ESG" },
  { key: "frameworks", label: "Frameworks" },
  { key: "ai", label: "Applied AI" },
] as const;

export const TICKER_MAP: Record<string, string | null> = {
  "ASX coverage": "EX / 06",
  Pipeline: "SI / 05",
  "Sharpe lift": "EX / 03",
  "Risk cut": "SI / 08",
  "CSL outperf": "SI / 03",
  Projects: null,
  "Cycle time": "EX / 02",
  Roles: null,
};

export function getSIItems() {
  return DATA.filter((d) => d.kind === "si");
}

export function getEXItems() {
  return DATA.filter((d) => d.kind === "ex");
}

export function getCategoryCounts() {
  const si = getSIItems();
  const counts: Record<string, number> = { all: si.length };
  si.forEach((d) => {
    counts[d.cat] = (counts[d.cat] || 0) + 1;
  });
  return counts;
}
