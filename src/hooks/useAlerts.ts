"use client";

import { useEffect, useState } from "react";
import type { TokenBalance } from "./usePortfolio";

export interface Alert {
  id: string;
  type: "High Risk" | "Price Drop" | "APY Change";
  message: string;
  time: string;
  isRead: boolean;
}

export function useAlerts(tokens: TokenBalance[]) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    if (tokens.length === 0) return;

    const newAlerts: Alert[] = [];
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. High Risk Alert (e.g., if any token has High risk or if portfolio is unbalanced)
    // We'll simulate this logic
    const highRiskTokens = tokens.filter(t => t.symbol === "WETH");
    if (highRiskTokens.length > 0) {
        newAlerts.push({
            id: '1',
            type: "High Risk" as const,
            message: "WETH allocation is high, consider rebalancing to stablecoins.",
            time: "10:00 AM",
            isRead: false
        });
    }

    // 2. Price Drop Alert
    const droppedTokens = tokens.filter(t => t.change24h < -5);
    if (droppedTokens.length > 0) {
         newAlerts.push({
            id: '2',
            type: "Price Drop" as const,
            message: `${droppedTokens[0].symbol} dropped ${Math.abs(droppedTokens[0].change24h).toFixed(1)}% in 24h.`,
            time: "11:30 AM",
            isRead: false
        });
    }

    // 3. APY Change Alert (simulated)
    newAlerts.push({
        id: '3',
        type: "APY Change" as const,
        message: "Lido Staking APY increased to 3.8%.",
        time: timeStr,
        isRead: false
    });

    setAlerts(newAlerts);
  }, [tokens]);

  const markAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, isRead: true })));
  };

  return { alerts, markAllRead };
}
