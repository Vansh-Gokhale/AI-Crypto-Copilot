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
                <img 
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACTCAYAAAC0n84RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAB+xJREFUeNrsnXuIVWUUxk+fM3fMvK9RRi+GZpZWVhkRSXpC6Umih3oSIUFEkFAkRIRKIBIRKRGhiAgKiUiIiEBEEEGRZfREhkZZXhm9zK6Puc68fXvP+L5v7Tl79p6169p71pffD4aZc377zN/ve7/3+60uqqqKMAL/3f3fXf+E/v/yKAnPOfWj4f8P4f8TIdE76An9uD+Z0o8P51I9yAic2I+T0u+n9WOv6I9HqAsZ0Y+T+rFf9MeH7mToRizXo0XfM6ofB0XfOR6hLpL6cf8Z9B1D+rFF9C2PQ6gL0aL3p4q9mY29ovfBexGqE0n9uP+sEHtH9H6GToRyV7G3s7F3on/rTKhOJNX+8eL+hGZid+fC6E0ovNqPHWKXUf0yUiwvTInthUnxeGFSbE6YFJsTJsXjhUmxOSe8t8p7q6pG0O8C7+Vv8V78Fu/Fb/Fe/BbvxW/Nf9v8t81/2/y3zX+X+e8y/13mv8v8d5n/XpD575X+9Vf79VfD/fqrD/rL0u9X8f1T8T1U8X1U8W0vE96XUf0YUnvY0W63mXF78FpXfU0ZscuoZhlR82vEzK1RM7eEmlvDTm6JmN0S0bsloHczdH6GTM/QuSWit0T0/AyZ6BkqfX6GxM+QzM+QiZ6hzM+QiZ6hcjUkoUfI6Bky9I0G8Q6hruXU80TfN6p7R987onuHtL3pS+vH/WpI+3uEegM9oR938B3Uj+26uA6S+jH/C9WPTfocI0M9yIienNSP/fqxv7DIdL0u7U9K98P6/aB0WfT/InSu3n/X7y+XnsuoKq5K/qB6zMvUjM/X68zX58zX58zX58zX58zX58zX57wD6fO+9Plt9f470Pe3fP6Wzl9n/fofUv931f67fP466fO+6Of9vP698mO59HyZ3u9f6f3+ld7vX3v/7/f5p9X/fXq/S88lWp2S1u80v89pv89pv9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/S49v9f6/Xun/SyT+/T39/lv7/bvq/q9/f9P67az//r/a43Z3X5vY6nU7n/nTe76/T6Z/pdFr/09/vt/v9f/0+5/S7/X6n8+8ep/d7V89P6/nU/29K/3f6/p/+fp++D6h/k/176X9X/73r+/p//9/Vf59X+r9L//t9en+qTl8l6/o/sfddp/sedobT6XTuT+f9/jqd/plOp/U//f1+u9//1+9zTr/b73c6/++xP6nDn9pXf7iY/2nHv2qU2n/lf4r/e/S/y7979L/Lv3v0v8u/e/sf+l/j/770L+vLf1/L/1X+q84/9Xmv9r8t5v/8+ZfPv9nnP833H9m8f1T+/ZfPrc/v+2//0Xfn9b+7n/Rd6a1n0r7f8rrv7J/29d2/7vT/+72v7v9707v79T+jrSmT5X+af1T+idK/6b03UPnd8j0DJn2DB0/Q6aeIZ2f3ydT8uXJlN/JpM/Pkv/PTM+fIf+fIdP/SeZfMj8tmX/J/Humqb837sfcTs/GzlZ7fzrT7THdHp33o/N+dN7nRT/6dNGHPl18vT9P//1e/vl9+vu39P930/9d/f6m999d+/l/tcfV+n/6fP6+Wp+fNf37mP4eU7+mPsd+S/16S9/R/Y770L/+59O9ZkO96KxOvz68n9+nPx/87+rPD+//98n/Xv35Ufrz/9A7nP6H/m/X9ZPoX07v6f6f2v/v9H9Xf89H+jvr/z1/v84Zp/7uTOfz7793p7Xf3ee33/ffUu85Tf376/X1rP/veP377xWnv3f6D9Onz9Pv0u6m39Pv1O7U/6e3MvWzf/0m6vTrU+9f/216vlvP6/H7eP179YmPxP9X+pT7r/D7+p9+p38v9V790P9Z+h79qN+D+/33vY9+H9f9j/S+H/X/mfr1lPr0P9SPhz59PnW/pX599f6m1/mO9P3V99P36uL/3f0v+v8983/v+O4v6ue8z3+69HlPv6fTr43frxe9n13p93X6PqXf+7T/+vL9rvT/n96/6fv5Xv/v/+P/0f6H7v/z8JfX4S+tw198rP/Uo191Ku2/0n+l/13636X/Xfrfpf9d+t+l/13639n/0v8e/fehf19b+v9e+q/0X3H+q81/tflvN/9Hzf8fDf/36X93+n8X/10n9R9p7a+P7uf/I8AA9wtuxO3o1MAAAAAASUVORK5CYII=" 
                    alt="OrbitX" 
                    className="orbit-card-logo" 
                />
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
