"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";

interface HistoryData {
  date: string;
  value: number;
}

export function PortfolioHistory({ totalValue }: { totalValue: number }) {
  const [history, setHistory] = useState<HistoryData[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("portfolioHistory");
    let currentHistory: HistoryData[] = savedHistory ? JSON.parse(savedHistory) : [];

    // Add current value if it's the first time or enough time has passed (simulated 1 snapshot per session/refresh for demo)
    const now = new Date();
    const dateStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // For demo purposes, we'll generate some dummy historical data if history is empty
    if (currentHistory.length === 0) {
      currentHistory = [
        { date: "10:00", value: totalValue * 0.95 },
        { date: "11:00", value: totalValue * 0.97 },
        { date: "12:00", value: totalValue * 0.96 },
        { date: "13:00", value: totalValue * 0.98 },
        { date: "14:00", value: totalValue * 0.99 },
        { date: "15:00", value: totalValue * 1.02 },
      ];
    }

    // Add latest point
    if (currentHistory[currentHistory.length - 1]?.date !== dateStr) {
        currentHistory.push({ date: dateStr, value: totalValue });
    }
    
    // Keep only last 20 points
    if (currentHistory.length > 20) {
        currentHistory = currentHistory.slice(-20);
    }

    setHistory(currentHistory);
    localStorage.setItem("portfolioHistory", JSON.stringify(currentHistory));
  }, [totalValue]);

  return (
    <div className="portfolio-history-card">
      <h3 className="card-title">Portfolio Performance</h3>
      <div style={{ width: "100%", height: "220px", marginTop: "10px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 175, 55, 0.05)" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#5C5446" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
            />
            <YAxis 
              hide 
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1A1A1A', 
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#F5F0E8'
              }}
              itemStyle={{ color: '#D4AF37' }}
              labelStyle={{ color: '#9A8F7A' }}
              formatter={(value: any) => [`$${parseFloat(value).toFixed(2)}`, 'Value']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#D4AF37"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
