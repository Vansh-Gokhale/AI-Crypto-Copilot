"use client";

import type { AIStrategy } from "@/hooks/useAIStrategy";
import { useAaveDeposit } from "@/hooks/useAaveDeposit";
import { useState } from "react";

interface StrategyCardProps {
  strategy: AIStrategy;
  index: number;
}

const ACTION_ICONS: Record<string, string> = {
  Lend: "◈",
  Stake: "◆",
  Swap: "◇",
  "Provide Liquidity": "◈",
};

const RISK_COLORS: Record<string, string> = {
  Low: "#4CAF76",
  Medium: "#D4AF37",
  High: "#C45C5C",
};

export function StrategyCard({ strategy, index }: StrategyCardProps) {
  const { status, error, txHash, deposit, reset } = useAaveDeposit();
  const [showDetails, setShowDetails] = useState(false);

  const canExecute =
    strategy.action === "Lend" &&
    strategy.protocol.toLowerCase().includes("aave") &&
    ["USDC", "USDT"].includes(strategy.asset);

  const handleExecute = async () => {
    const amountMatch = strategy.amount.match(/[\d.]+/);
    if (amountMatch) {
      await deposit(amountMatch[0], strategy.asset === "USDC" ? 6 : 6);
    }
  };

  return (
    <div className="strategy-card">
      <div className="strategy-card-header">
        <div className="strategy-icon">
          {ACTION_ICONS[strategy.action] || "◈"}
        </div>
        <div className="strategy-info">
          <h4 className="strategy-title">
            {strategy.action} {strategy.asset}
          </h4>
          <span className="strategy-protocol">on {strategy.protocol}</span>
        </div>
        <div className="strategy-meta">
          <span className="strategy-apy">{strategy.estimatedApy} APY</span>
          <span
            className="strategy-risk-badge"
            style={{ backgroundColor: `${RISK_COLORS[strategy.risk]}20`, color: RISK_COLORS[strategy.risk] }}
          >
            {strategy.risk}
          </span>
        </div>
      </div>

      <button
        className="strategy-details-toggle"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide details ▲" : "View details ▼"}
      </button>

      {showDetails && (
        <div className="strategy-reasoning">
          <p>{strategy.reasoning}</p>
          <div className="strategy-amount">
            Amount: <strong>{strategy.amount}</strong>
          </div>
        </div>
      )}

      <div className="strategy-card-footer">
        {canExecute ? (
          <>
            {status === "idle" && (
              <button className="btn-execute" onClick={handleExecute}>
                <span className="btn-execute-icon">◈</span>
                Execute Strategy
              </button>
            )}
            {status === "approving" && (
              <button className="btn-execute btn-loading" disabled>
                <span className="spinner"></span>
                Approving...
              </button>
            )}
            {status === "approved" && (
              <button className="btn-execute btn-loading" disabled>
                <span className="spinner"></span>
                Approved, Depositing...
              </button>
            )}
            {status === "depositing" && (
              <button className="btn-execute btn-loading" disabled>
                <span className="spinner"></span>
                Depositing...
              </button>
            )}
            {status === "success" && (
              <div className="tx-success">
                <span>✓ Transaction Successful</span>
                {txHash && (
                  <a
                    href={`https://sepolia.etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tx-link"
                  >
                    View on Etherscan →
                  </a>
                )}
                <button className="btn-reset" onClick={reset}>
                  Reset
                </button>
              </div>
            )}
            {status === "error" && (
              <div className="tx-error">
                <span>✕ {error || "Transaction failed"}</span>
                <button className="btn-reset" onClick={reset}>
                  Try Again
                </button>
              </div>
            )}
          </>
        ) : (
          <button className="btn-execute btn-disabled" disabled title="Only Aave USDC deposit is available in MVP">
            <span className="btn-execute-icon">◈</span>
            Execute Strategy
          </button>
        )}
      </div>
    </div>
  );
}
