"use client";

import type { TokenBalance } from "@/hooks/usePortfolio";
import type { AIStrategy } from "@/hooks/useAIStrategy";
import { RiskGauge } from "./RiskGauge";
import { StrategyCard } from "./StrategyCard";
import { calculatePortfolioRisk } from "@/utils/riskScorer";

interface AICopilotProps {
  tokens: TokenBalance[];
  strategies: AIStrategy[];
  isAnalyzing: boolean;
  aiError: string | null;
  onAnalyze: () => void;
}

export function AICopilot({
  tokens,
  strategies,
  isAnalyzing,
  aiError,
  onAnalyze,
}: AICopilotProps) {
  const risk = calculatePortfolioRisk(
    tokens.map((t) => ({ symbol: t.symbol, usdValue: t.usdValue }))
  );

  return (
    <div className="ai-copilot-panel">
      <div className="ai-copilot-header">
        <h2 className="ai-copilot-title">
          <span className="ai-icon">◈</span> Neural Hub
        </h2>
      </div>

      {/* Risk Gauge */}
      {tokens.length > 0 && (
        <RiskGauge score={risk.overallScore} level={risk.overallLevel} />
      )}

      {/* Market Sentiment */}
      <div className="sentiment-card">
        <h3 className="card-title">Market Sentiment</h3>
        <div className="sentiment-indicator">
          <span className="sentiment-emoji">◆</span>
          <span className="sentiment-text bullish">Bullish</span>
        </div>
        <p className="sentiment-note">Based on current market trends</p>
      </div>

      {/* Analyze Button */}
      <button
        className={`btn-analyze ${isAnalyzing ? "btn-loading" : ""}`}
        onClick={onAnalyze}
        disabled={isAnalyzing || tokens.length === 0}
      >
        {isAnalyzing ? (
          <>
            <span className="spinner"></span>
            Analyzing...
          </>
        ) : (
          <>
            <span className="btn-analyze-icon">◈</span>
            Analyze Portfolio
          </>
        )}
      </button>
      {aiError && <p className="ai-error-text">{aiError}</p>}

      {/* Strategy Cards */}
      {strategies.length > 0 && (
        <div className="strategies-section">
          <h3 className="card-title">AI-Powered Strategies</h3>
          <div className="strategies-list">
            {strategies.map((strategy, i) => (
              <StrategyCard key={i} strategy={strategy} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
