"use client";

import { useEffect, useState } from "react";

interface PortfolioSummaryProps {
  totalValue: number;
  isLoading: boolean;
}

export function PortfolioSummary({ totalValue, isLoading }: PortfolioSummaryProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (totalValue === 0) {
      const timeoutId = setTimeout(() => setDisplayValue(0), 0);
      return () => clearTimeout(timeoutId);
    }
    const duration = 1000;
    const steps = 40;
    const increment = totalValue / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= totalValue) {
        setDisplayValue(totalValue);
        clearInterval(interval);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [totalValue]);

  return (
    <div className="portfolio-summary">
      <div className="portfolio-summary-header">
        <span className="portfolio-summary-label">Vault Valuation</span>
        <span className="portfolio-summary-badge">
          <span className="pulse-dot"></span>
          Live
        </span>
      </div>
      <div className="portfolio-summary-value">
        {isLoading ? (
          <div className="skeleton-text skeleton-lg"></div>
        ) : (
          <>
            <span className="currency-symbol">$</span>
            <span className="value-digits">
              {displayValue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </>
        )}
      </div>
      <div className="portfolio-summary-footer">
        <div className="portfolio-summary-change">
          {!isLoading && (
            <>
              <span className="change-positive">▲ +2.4%</span>
              <span className="change-period">24h</span>
            </>
          )}
        </div>
        <button 
          className="btn-rebalance" 
          onClick={() => alert("AI Rebalance: Suggesting 40% ETH, 30% USDC, 20% USDT, 10% DAI for optimal risk-adjusted yield.")}
        >
          Rebalance Portfolio
        </button>
      </div>
    </div>
  );
}
