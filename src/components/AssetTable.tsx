"use client";

import type { TokenBalance } from "@/hooks/usePortfolio";

interface AssetTableProps {
  tokens: TokenBalance[];
  isLoading: boolean;
}

export function AssetTable({ tokens, isLoading }: AssetTableProps) {
  const handleExport = () => {
    const headers = ["Symbol", "Balance", "USD Price", "USD Value", "Allocation %", "24h Change %"];
    const rows = tokens.map(t => [
      t.symbol,
      t.balance,
      t.usdPrice.toFixed(2),
      t.usdValue.toFixed(2),
      t.allocation.toFixed(2),
      t.change24h.toFixed(2)
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `aureum_portfolio_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="asset-table-card">
        <h3 className="card-title">Assets</h3>
        <div className="asset-table-loading">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-row">
              <div className="skeleton-text skeleton-sm"></div>
              <div className="skeleton-text skeleton-md"></div>
              <div className="skeleton-text skeleton-sm"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="asset-table-card">
        <h3 className="card-title">Assets</h3>
        <div className="asset-table-empty">
          <p>No tokens found in this wallet</p>
          <p className="text-muted">Connect a wallet with tokens on Sepolia testnet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="asset-table-card">
      <div className="card-header-flex">
        <h3 className="card-title">Assets</h3>
        <button className="btn-export" onClick={handleExport}>
          Export CSV
        </button>
      </div>
      <div className="asset-table-wrapper">
        <table className="asset-table">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Price</th>
              <th>24h</th>
              <th>Balance</th>
              <th>Value</th>
              <th>Allocation</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => (
              <tr key={token.symbol} className="asset-row">
                <td>
                  <div className="asset-name">
                    <span className="asset-icon">{token.icon}</span>
                    <div>
                      <span className="asset-symbol">{token.symbol}</span>
                    </div>
                  </div>
                </td>
                <td className="asset-price">
                  ${token.usdPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td>
                  <span className={`change-badge ${token.change24h >= 0 ? "positive" : "negative"}`}>
                    {token.change24h >= 0 ? "▲" : "▼"} {Math.abs(token.change24h).toFixed(2)}%
                  </span>
                </td>
                <td className="asset-balance">{token.balance}</td>
                <td className="asset-value">
                  ${token.usdValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td>
                  <div className="allocation-cell">
                    <div className="allocation-bar">
                      <div
                        className="allocation-fill"
                        style={{ width: `${token.allocation}%` }}
                      ></div>
                    </div>
                    <span className="allocation-pct">{token.allocation.toFixed(1)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
