"use client";

import { useUIState } from "@/hooks/useUIState";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useAlerts } from "@/hooks/useAlerts";
import type { TokenBalance } from "@/hooks/usePortfolio";

import { usePortfolio } from "@/hooks/usePortfolio";

export function Header() {
  const { isDemoMode, setDemoMode, isAutoMode, setAutoMode } = useUIState();
  const [showAlerts, setShowAlerts] = useState(false);
  const { tokens } = usePortfolio();
  const { alerts, markAllRead } = useAlerts(tokens);

  const unreadCount = alerts.length;

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">
          <span className="header-title-accent">AUREUM</span> ELITE
        </h1>
        <span className="header-badge">Beta</span>
        <div className="header-controls">
          <button 
            className={`control-btn ${isDemoMode ? 'active' : ''}`}
            onClick={() => setDemoMode(!isDemoMode)}
            title="Toggle Demo Mode"
          >
            {isDemoMode ? 'Demo ON' : 'Demo OFF'}
          </button>
          <button 
            className={`control-btn ${isAutoMode ? 'active' : ''}`}
            onClick={() => setAutoMode(!isAutoMode)}
            title="Enable AI Auto Execution"
          >
            {isAutoMode ? 'Auto ON' : 'Auto OFF'}
          </button>
        </div>
      </div>
      <div className="header-right">
        <div className="header-alerts">
            <button className="alert-btn" onClick={() => setShowAlerts(!showAlerts)} title="View Alerts">
                <span className="alert-icon">🔔</span>
                {unreadCount > 0 && <span className="alert-count">{unreadCount}</span>}
            </button>
            {showAlerts && (
                <div className="alerts-dropdown">
                    <div className="alerts-header">
                        <span className="alerts-title">Notifications</span>
                        <button className="alerts-clear" onClick={markAllRead}>Mark as read</button>
                    </div>
                    <div className="alerts-list">
                        {alerts.map(a => (
                            <div key={a.id} className="alert-item">
                                <div className="alert-meta">
                                    <span className={`alert-type ${a.type.toLowerCase().replace(' ', '-')}`}>{a.type}</span>
                                    <span className="alert-time">{a.time}</span>
                                </div>
                                <p className="alert-message">{a.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
        <div className="header-network-indicator">
          <span className="network-dot"></span>
          <span className="network-label">Sepolia</span>
        </div>
        <ConnectButton
          showBalance={false}
          chainStatus="icon"
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
        />
      </div>
    </header>
  );
}
