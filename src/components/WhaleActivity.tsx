"use client";

import { useWhaleTracker } from "@/hooks/useWhaleTracker";

export function WhaleActivity() {
  const { whaleTransactions } = useWhaleTracker();

  return (
    <div className="whale-activity-card">
      <div className="card-header-flex">
        <h3 className="card-title">🐋 Smart Money Activity</h3>
      </div>
      <div className="whale-list">
        {whaleTransactions.map((tx) => (
          <div key={tx.id} className="whale-tx-item">
            <div className="whale-tx-summary">
              <span className="whale-wallet">{tx.wallet}</span>
              <span className={`whale-type ${tx.type.toLowerCase()}`}>
                {tx.type}
              </span>
            </div>
            <div className="whale-tx-details">
                <span className="whale-amount">{tx.amount} {tx.asset}</span>
                <span className="whale-value">(${tx.usdValue})</span>
                <span className="whale-time">{tx.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
