"use client";

import React, { useState } from "react";

export function Simulator({ totalValue }: { totalValue: number }) {
  const [ethPriceIncrease, setEthPriceIncrease] = useState(10);
  const [result, setResult] = useState<number | null>(null);

  const runSimulation = () => {
    // Basic simulation: Assume ETH is X% of portfolio and it increases by ethPriceIncrease%
    // In a real app, this would use the actual token allocations
    const simulationResult = totalValue * (1 + (ethPriceIncrease / 100) * 0.4); // Assuming 40% ETH
    setResult(simulationResult);
  };

  return (
    <div className="sentiment-card simulator-card">
      <h3 className="card-title">What-If Simulator</h3>
      <div className="simulator-controls">
        <label className="explanation-label">If ETH price increases by</label>
        <div className="simulator-input-row">
            <input 
                type="range" 
                min="-50" 
                max="200" 
                value={ethPriceIncrease} 
                onChange={(e) => setEthPriceIncrease(parseInt(e.target.value))}
                className="simulator-slider"
            />
            <span className="explanation-value">{ethPriceIncrease}%</span>
        </div>
        <button className="btn-analyze" onClick={runSimulation} style={{ marginTop: '16px' }}>
            Run Simulation
        </button>
      </div>

      {result !== null && (
        <div className="simulator-result">
            <span className="explanation-label">Projected Portfolio Value</span>
            <span className="value-digits" style={{ fontSize: '24px', display: 'block' }}>
                ${result.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="change-positive">
                +{((result - totalValue) / totalValue * 100).toFixed(1)}% gain
            </span>
        </div>
      )}
    </div>
  );
}
