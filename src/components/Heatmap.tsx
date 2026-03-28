"use client";

import type { TokenBalance } from "@/hooks/usePortfolio";

export function Heatmap({ tokens }: { tokens: TokenBalance[] }) {
  if (tokens.length === 0) return null;

  const getColor = (change: number) => {
    if (change > 5) return "#4CAF76"; // Strong Gain
    if (change > 0) return "rgba(76, 175, 118, 0.45)"; // Soft Gain
    if (change < -5) return "#C45C5C"; // Strong Loss
    if (change < 0) return "rgba(196, 92, 92, 0.45)"; // Soft Loss
    return "rgba(255, 255, 255, 0.05)"; // Neutral
  };

  return (
    <div className="heatmap-card">
      <h3 className="card-title">Performance Heatmap</h3>
      <div className="heatmap-grid" style={{
        gridTemplateColumns: `repeat(${Math.min(tokens.length, 5)}, 1fr)`
      }}>
        {tokens.map((token) => (
          <div 
            key={token.symbol} 
            className="heatmap-cell"
            style={{ 
                backgroundColor: getColor(token.change24h),
                // Weight by USD value if we want square sizes to differ (optional)
            }}
            title={`${token.symbol}: ${token.change24h.toFixed(2)}%`}
          >
            <span className="heatmap-symbol">{token.symbol}</span>
            <span className="heatmap-change">{token.change24h > 0 ? "+" : ""}{token.change24h.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
