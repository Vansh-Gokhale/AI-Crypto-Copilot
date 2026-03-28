"use client";

import { useOrbitX } from "@/hooks/useOrbitX";
import { useState } from "react";

export function SpendPanel({ totalValueUsd }: { totalValueUsd: number }) {
  const { isLinked, cardLast4, availableYield, monthlyYield, isLoading, linkCard, spendEarnings } = useOrbitX(totalValueUsd);
  const [spendAmount, setSpendAmount] = useState<string>("50.00");

  const handleSpend = async () => {
    const amount = parseFloat(spendAmount);
    if (isNaN(amount) || amount <= 0) return;
    await spendEarnings(amount);
  };

  return (
    <div className="spend-panel-card">
      <div className="card-header-flex">
        <h3 className="card-title">💎 DeFi Earn → Spend Loop</h3>
      </div>
      
      <div className="spend-stats">
        <div className="spend-stat-item">
          <span className="explanation-label">Current Monthly Yield</span>
          <span className="value-digits" style={{ fontSize: '24px', color: 'var(--gold)' }}>
            +${monthlyYield.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="spend-stat-item">
          <span className="explanation-label">Available Earnings</span>
          <span className="value-digits" style={{ fontSize: '24px' }}>
            ${availableYield.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="spend-interface">
        {!isLinked ? (
          <button 
            className={`btn-execute ${isLoading ? 'btn-loading' : ''}`}
            onClick={linkCard}
            disabled={isLoading}
            style={{ width: '100%', marginTop: '16px' }}
          >
            {isLoading ? <><span className="spinner"></span> Linking OrbitX...</> : (
              <><span className="btn-execute-icon">💳</span> Link OrbitX Virtual Card</>
            )}
          </button>
        ) : (
          <div className="orbitx-card-container">
            <div className="orbit-card">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="orbit-card-logo">
                    <circle cx="12" cy="12" r="10" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="12" cy="12" r="6" fill="#D4AF37" />
                    <path d="M12 4L14 10L20 12L14 14L12 20L10 14L4 12L10 10L12 4Z" fill="#1A1A1A" />
                </svg>
                <div className="orbit-card-chip"></div>
                <div className="orbit-card-number">•••• •••• •••• {cardLast4}</div>
                <div className="orbit-card-label">AUREUM × ORBITX</div>
                <div className="orbit-card-glow"></div>
            </div>
            
            <div className="spend-controls">
                <div className="goal-input-group">
                    <label className="explanation-label">Amount to Spend (Yield Only)</label>
                    <div className="simulator-input-row" style={{ marginTop: '4px' }}>
                        <span className="currency-prefix">$</span>
                        <input 
                            type="number" 
                            className="chat-input" 
                            value={spendAmount}
                            onChange={(e) => setSpendAmount(e.target.value)}
                            placeholder="0.00"
                        />
                    </div>
                </div>
                <button 
                    className={`btn-execute ${isLoading ? 'btn-loading' : ''}`}
                    onClick={handleSpend}
                    disabled={isLoading || parseFloat(spendAmount) > availableYield}
                    style={{ marginTop: '16px', width: '100%' }}
                >
                    {isLoading ? <><span className="spinner"></span> Processing...</> : (
                        <><span className="btn-execute-icon">➤</span> Spend via OrbitX</>
                    )}
                </button>
                <p className="sentiment-note" style={{ marginTop: '12px', textAlign: 'center' }}>
                    Zero slippage. Direct yield settlement.
                </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
