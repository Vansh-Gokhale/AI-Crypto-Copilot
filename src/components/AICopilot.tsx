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

import { useState, useRef, useEffect } from "react";
import { useAutoExecutor } from "@/hooks/useAutoExecutor";

export function AICopilot({
  tokens,
  strategies,
  isAnalyzing,
  aiError,
  onAnalyze,
}: AICopilotProps) {
  const [view, setView] = useState<"insights" | "chat">("insights");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hello! I am your Aureum AI Copilot. How can I help you with your portfolio today?" }
  ]);
  
  useAutoExecutor(strategies);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput;
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setChatInput("");
    
    // Simulate AI response
    setTimeout(() => {
      let response = "I've analyzed your portfolio. Based on your $ETH holdings, you might want to consider liquid staking for better yield.";
      if (userMsg.toLowerCase().includes("risk")) {
        response = "Your portfolio risk is currently Medium. Diversifying into stablecoins could help lower it.";
      } else if (userMsg.toLowerCase().includes("apy")) {
        response = "The highest APY currently available for your assets is 4.8% on Aave for USDC.";
      }
      setMessages(prev => [...prev, { role: "ai", text: response }]);
    }, 1000);
  };

  const risk = calculatePortfolioRisk(
    tokens.map((t) => ({ symbol: t.symbol, usdValue: t.usdValue }))
  );

  return (
    <div className="ai-copilot-panel">
      <div className="ai-copilot-header">
        <h2 className="ai-copilot-title">
          <span className="ai-icon">◈</span> Neural Hub
        </h2>
        <div className="view-toggle">
          <button 
            className={`view-btn ${view === 'insights' ? 'active' : ''}`}
            onClick={() => setView('insights')}
          >
            Insights
          </button>
          <button 
            className={`view-btn ${view === 'chat' ? 'active' : ''}`}
            onClick={() => setView('chat')}
          >
            Chat
          </button>
        </div>
      </div>

      {view === "insights" ? (
        <>
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
        </>
      ) : (
        <div className="chat-interface">
            <div className="chat-messages">
                {messages.map((m, i) => (
                    <div key={i} className={`message ${m.role}`}>
                        {m.text}
                    </div>
                ))}
            </div>
            <div className="chat-input-wrapper">
                <input 
                    type="text" 
                    className="chat-input"
                    placeholder="Type a message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="chat-send-btn" onClick={handleSendMessage}>➤</button>
            </div>
        </div>
      )}
    </div>
  );
}
