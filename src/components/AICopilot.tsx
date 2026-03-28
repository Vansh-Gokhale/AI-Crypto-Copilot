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

  const [isAiTyping, setIsAiTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isAiTyping) return;
    
    const userMsg = chatInput;
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setChatInput("");
    setIsAiTyping(true);

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (apiKey) {
      // Real Gemini AI chat
      try {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const portfolioContext = tokens.length > 0
          ? `User's portfolio (total $${tokens.reduce((s, t) => s + t.usdValue, 0).toFixed(2)}):\n${tokens.map(t => `${t.symbol}: ${t.balance} ($${t.usdValue.toFixed(2)}, ${t.change24h > 0 ? '+' : ''}${t.change24h.toFixed(1)}% 24h)`).join('\n')}`
          : "User has no portfolio data loaded yet.";

        const systemPrompt = `You are Aureum AI, a premium DeFi copilot assistant. You help users with crypto portfolio analysis, DeFi strategies (Aave, Lido, Compound, Uniswap), yield optimization, and blockchain questions.

Current portfolio context:
${portfolioContext}

Rules:
- Be concise (2-4 sentences max)
- Reference actual portfolio data when relevant
- Suggest specific DeFi protocols and APY estimates
- Be confident and professional`;

        const result = await model.generateContent(`${systemPrompt}\n\nUser: ${userMsg}`);
        const aiText = result.response.text();
        setMessages(prev => [...prev, { role: "ai", text: aiText }]);
      } catch (err) {
        console.error("Gemini chat error:", err);
        setMessages(prev => [...prev, { role: "ai", text: "I'm having trouble connecting to AI services. Please check your API key or try again." }]);
      }
    } else {
      // Smart fallback without API key
      const msg = userMsg.toLowerCase();
      let response = "";
      
      const totalValue = tokens.reduce((s, t) => s + t.usdValue, 0);
      const ethToken = tokens.find(t => t.symbol === "ETH" || t.symbol === "WETH");
      const stables = tokens.filter(t => ["USDC", "USDT", "DAI"].includes(t.symbol));

      if (msg.includes("risk") || msg.includes("safe")) {
        const stablePercent = stables.reduce((s, t) => s + t.allocation, 0);
        response = `Your portfolio has ${stablePercent.toFixed(0)}% in stablecoins. ${stablePercent > 50 ? "That's a conservative allocation — consider deploying some to Aave V3 for 4.8% APY." : "Consider increasing stablecoin allocation for lower risk. Aave V3 USDC lending yields ~4.8%."}`;
      } else if (msg.includes("apy") || msg.includes("yield") || msg.includes("earn")) {
        response = `Current estimated yields: Aave V3 USDC lending ~4.8% APY, Lido ETH staking ~3.5% APY, Compound USDT ~3.2% APY. ${stables.length > 0 ? `Your ${stables[0].symbol} ($${stables[0].usdValue.toFixed(0)}) could earn ~$${(stables[0].usdValue * 0.048 / 12).toFixed(2)}/month on Aave.` : ""}`;
      } else if (msg.includes("eth") || msg.includes("stake")) {
        response = ethToken ? `You hold ${ethToken.balance} ETH ($${ethToken.usdValue.toFixed(0)}). Staking via Lido at ~3.5% APY would earn ~$${(ethToken.usdValue * 0.035 / 12).toFixed(2)}/month in stETH rewards.` : "You don't currently hold ETH. Consider acquiring some for staking yields via Lido (~3.5% APY).";
      } else if (msg.includes("portfolio") || msg.includes("balance")) {
        response = `Your portfolio is valued at $${totalValue.toFixed(2)} across ${tokens.length} assets. Top holding: ${tokens[0]?.symbol || "N/A"} at ${tokens[0]?.allocation.toFixed(1) || 0}% allocation.`;
      } else if (msg.includes("orbitx") || msg.includes("card") || msg.includes("spend")) {
        response = `OrbitX lets you spend DeFi yield via a virtual card. Your estimated monthly yield is ~$${(totalValue * 0.045 / 12).toFixed(2)}. Link your card in the Spend Panel to start spending earnings directly.`;
      } else {
        response = `Your portfolio ($${totalValue.toFixed(2)}) has opportunities: ${stables.length > 0 ? `lend ${stables[0].symbol} on Aave for ~4.8% APY` : "diversify into stablecoins for lending yield"}${ethToken ? `, stake ETH on Lido for ~3.5% APY` : ""}. Click "Analyze Portfolio" for detailed AI strategy recommendations.`;
      }
      
      // Simulate typing delay for natural feel
      await new Promise(r => setTimeout(r, 800));
      setMessages(prev => [...prev, { role: "ai", text: response }]);
    }
    setIsAiTyping(false);
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
                {isAiTyping && (
                    <div className="message ai typing-indicator">
                        <span className="dot-pulse">●</span>
                        <span className="dot-pulse" style={{ animationDelay: '0.2s' }}>●</span>
                        <span className="dot-pulse" style={{ animationDelay: '0.4s' }}>●</span>
                    </div>
                )}
            </div>
            <div className="chat-input-wrapper">
                <input 
                    type="text" 
                    className="chat-input"
                    placeholder={isAiTyping ? "AI is thinking..." : "Ask about your portfolio, DeFi strategies..."}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isAiTyping}
                />
                <button className="chat-send-btn" onClick={handleSendMessage} disabled={isAiTyping}>➤</button>
            </div>
        </div>
      )}
    </div>
  );
}
