"use client";

import type { TokenBalance } from "@/hooks/usePortfolio";

interface AllocationChartProps {
  tokens: TokenBalance[];
}

// All gold/champagne tones
const CHART_COLORS = ["#D4AF37", "#E8C95A", "#8B7327", "#C9A84C", "#B89B3E", "#A68A2B", "#F0D878", "#9B8532"];

export function AllocationChart({ tokens }: AllocationChartProps) {
  if (tokens.length === 0) return null;

  // Build conic-gradient
  const stops = tokens.reduce<{ array: string[], cumulative: number }>(
    (acc, token, i) => {
      const color = CHART_COLORS[i % CHART_COLORS.length];
      const start = acc.cumulative;
      const end = start + token.allocation;
      acc.array.push(`${color} ${start}% ${end}%`);
      acc.cumulative = end;
      return acc;
    },
    { array: [], cumulative: 0 }
  ).array;
  const gradient = `conic-gradient(${stops.join(", ")})`;

  return (
    <div className="allocation-chart-card">
      <h3 className="card-title">Allocation</h3>
      <div className="allocation-chart-container">
        <div className="donut-chart" style={{ background: gradient }}>
          <div className="donut-hole">
            <span className="donut-label">{tokens.length}</span>
            <span className="donut-sub">Core Assets</span>
          </div>
        </div>
        <div className="allocation-legend">
          {tokens.map((token, i) => (
            <div key={token.symbol} className="legend-item">
              <span
                className="legend-dot"
                style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
              ></span>
              <span className="legend-symbol">{token.symbol}</span>
              <span className="legend-pct">{token.allocation.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
