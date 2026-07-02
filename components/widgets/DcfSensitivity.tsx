"use client";

import { useMemo, useState } from "react";

/**
 * Interactive, simplified FCFF DCF for the CSL case study.
 * Inputs are illustrative — simplified from the full valuation model —
 * tuned so the default state reflects the original sell call vs consensus.
 */
const BASE_FCFF = 5.2; // A$B, year-0 free cash flow to firm
const FORECAST_GROWTH = 0.08; // 5-year explicit growth
const FORECAST_YEARS = 5;
const NET_DEBT = 11; // A$B
const SHARES = 0.483; // billions
const REF_PRICE = 300; // A$ reference market price at coverage

const WACC_STEPS = [6.0, 6.5, 7.0, 7.5, 8.0];
const GROWTH_STEPS = [1.5, 2.0, 2.5, 3.0, 3.5];

const GOLD = "212,168,71"; // above reference price
const BLUE = "111,159,216"; // below reference price

function dcfPerShare(waccPct: number, growthPct: number): number {
  const wacc = waccPct / 100;
  const g = growthPct / 100;
  let pv = 0;
  let fcff = BASE_FCFF;
  for (let t = 1; t <= FORECAST_YEARS; t++) {
    fcff *= 1 + FORECAST_GROWTH;
    pv += fcff / Math.pow(1 + wacc, t);
  }
  const terminal = (fcff * (1 + g)) / (wacc - g);
  pv += terminal / Math.pow(1 + wacc, FORECAST_YEARS);
  return (pv - NET_DEBT) / SHARES;
}

function cellFill(value: number): string {
  const upside = (value - REF_PRICE) / REF_PRICE;
  const alpha = Math.min(Math.abs(upside) * 0.9, 0.32);
  if (alpha < 0.03) return "transparent";
  return `rgba(${upside > 0 ? GOLD : BLUE},${alpha.toFixed(3)})`;
}

export default function DcfSensitivity() {
  const [wacc, setWacc] = useState(7.0);
  const [growth, setGrowth] = useState(2.5);

  const implied = useMemo(() => dcfPerShare(wacc, growth), [wacc, growth]);
  const upside = (implied - REF_PRICE) / REF_PRICE;
  const rec = upside < -0.03 ? "SELL" : upside > 0.03 ? "BUY" : "HOLD";

  const nearestWacc = WACC_STEPS.reduce((a, b) =>
    Math.abs(b - wacc) < Math.abs(a - wacc) ? b : a
  );
  const nearestGrowth = GROWTH_STEPS.reduce((a, b) =>
    Math.abs(b - growth) < Math.abs(a - growth) ? b : a
  );

  return (
    <div className="dcf-widget">
      <div className="dcf-head">
        <span className="dcf-label">Interactive &mdash; simplified FCFF DCF</span>
        <span className="dcf-note">illustrative figures</span>
      </div>

      <div className="dcf-controls">
        <label className="dcf-control">
          <span className="dcf-control-name">
            WACC <strong>{wacc.toFixed(1)}%</strong>
          </span>
          <input
            type="range"
            min={6.0}
            max={8.0}
            step={0.1}
            value={wacc}
            onChange={(e) => setWacc(parseFloat(e.target.value))}
            aria-label="Weighted average cost of capital"
          />
        </label>
        <label className="dcf-control">
          <span className="dcf-control-name">
            Terminal growth <strong>{growth.toFixed(1)}%</strong>
          </span>
          <input
            type="range"
            min={1.5}
            max={3.5}
            step={0.1}
            value={growth}
            onChange={(e) => setGrowth(parseFloat(e.target.value))}
            aria-label="Terminal growth rate"
          />
        </label>
      </div>

      <div className="dcf-output">
        <div className="dcf-hero-wrap">
          <span className="dcf-hero-label">Implied value / share</span>
          <span className="dcf-hero">
            A${implied.toFixed(0)}
          </span>
        </div>
        <div className="dcf-verdict">
          <span className="dcf-delta">
            <span
              className="dcf-dot"
              style={{
                background: `rgb(${upside > 0 ? GOLD : BLUE})`,
              }}
            />
            {upside >= 0 ? "+" : ""}
            {(upside * 100).toFixed(1)}% vs A${REF_PRICE} market price
          </span>
          <span className={`dcf-rec ${rec.toLowerCase()}`}>{rec}</span>
        </div>
      </div>

      <div className="dcf-grid-wrap">
        <table className="dcf-grid">
          <caption className="sr-only">
            Implied value per share across WACC and terminal growth assumptions
          </caption>
          <thead>
            <tr>
              <th scope="col" className="dcf-corner">
                WACC \ g
              </th>
              {GROWTH_STEPS.map((g) => (
                <th key={g} scope="col">
                  {g.toFixed(1)}%
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {WACC_STEPS.map((w) => (
              <tr key={w}>
                <th scope="row">{w.toFixed(1)}%</th>
                {GROWTH_STEPS.map((g) => {
                  const value = dcfPerShare(w, g);
                  const active = w === nearestWacc && g === nearestGrowth;
                  return (
                    <td
                      key={g}
                      className={active ? "active" : undefined}
                      style={{ background: cellFill(value) }}
                      title={`WACC ${w.toFixed(1)}% · g ${g.toFixed(1)}% → A$${value.toFixed(0)} (${(((value - REF_PRICE) / REF_PRICE) * 100).toFixed(1)}% vs market)`}
                      onClick={() => {
                        setWacc(w);
                        setGrowth(g);
                      }}
                    >
                      {value.toFixed(0)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dcf-legend">
        <span>
          <span className="dcf-dot" style={{ background: `rgb(${GOLD})` }} />
          DCF above market price
        </span>
        <span>
          <span className="dcf-dot" style={{ background: `rgb(${BLUE})` }} />
          DCF below market price
        </span>
        <span className="dcf-legend-hint">tap a cell to set the sliders</span>
      </div>

      <p className="dcf-foot">
        Simplified from the full model: FCFF of A${BASE_FCFF.toFixed(1)}B grown{" "}
        {(FORECAST_GROWTH * 100).toFixed(0)}% p.a. for {FORECAST_YEARS} years,
        Gordon terminal value thereafter, net debt A${NET_DEBT}B,{" "}
        {(SHARES * 1000).toFixed(0)}M shares. Reference price A${REF_PRICE} at
        time of coverage. Figures are illustrative, not investment advice.
      </p>
    </div>
  );
}
