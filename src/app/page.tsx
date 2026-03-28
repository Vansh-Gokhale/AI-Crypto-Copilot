"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { PortfolioSummary } from "@/components/PortfolioSummary";
import { AssetTable } from "@/components/AssetTable";
import { AllocationChart } from "@/components/AllocationChart";
import { AICopilot } from "@/components/AICopilot";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useAIStrategy } from "@/hooks/useAIStrategy";

const PARTICLE_POSITIONS = [
  { x: 12, y: 8, delay: 0, duration: 5 },
  { x: 85, y: 15, delay: 1.2, duration: 4.5 },
  { x: 45, y: 92, delay: 0.5, duration: 6 },
  { x: 23, y: 67, delay: 2.3, duration: 3.5 },
  { x: 78, y: 34, delay: 3.1, duration: 5.5 },
  { x: 56, y: 78, delay: 0.8, duration: 4 },
  { x: 91, y: 45, delay: 4.2, duration: 6.5 },
  { x: 34, y: 23, delay: 1.7, duration: 3.8 },
  { x: 67, y: 89, delay: 2.9, duration: 5.2 },
  { x: 8, y: 56, delay: 0.3, duration: 4.7 },
  { x: 42, y: 12, delay: 3.5, duration: 6.2 },
  { x: 73, y: 67, delay: 1.1, duration: 3.3 },
  { x: 19, y: 45, delay: 4.8, duration: 5.8 },
  { x: 88, y: 78, delay: 2.1, duration: 4.2 },
  { x: 51, y: 34, delay: 0.6, duration: 6.8 },
  { x: 36, y: 91, delay: 3.8, duration: 3.6 },
  { x: 64, y: 23, delay: 1.4, duration: 5.1 },
  { x: 95, y: 56, delay: 4.5, duration: 4.4 },
  { x: 27, y: 82, delay: 2.7, duration: 6.3 },
  { x: 58, y: 5, delay: 0.9, duration: 3.9 },
];

import { useUIState } from "@/hooks/useUIState";

import { PortfolioHistory } from "@/components/PortfolioHistory";
import { Simulator } from "@/components/Simulator";
import { WhaleActivity } from "@/components/WhaleActivity";
import { ActivityFeed } from "@/components/ActivityFeed";
import { Goals } from "@/components/Goals";
import { Heatmap } from "@/components/Heatmap";
import { SpendPanel } from "@/components/SpendPanel";

export default function Home() {
  const { isConnected: isWalletConnected } = useAccount();
  const { isDemoMode } = useUIState();
  const isConnected = isWalletConnected || isDemoMode;
  const portfolio = usePortfolio();
  const ai = useAIStrategy();
  const [activeGoal, setActiveGoal] = useState("");

  const handleAnalyze = () => {
    ai.analyze(portfolio.tokens, portfolio.totalValueUsd, activeGoal);
  };

  if (!isConnected) {
    return (
      <div className="connect-screen">
        <div className="connect-card">
          <div className="connect-glow"></div>
          <div className="connect-content">
            {/* Left Branding Panel */}
            <div className="connect-brand-panel">
              <div className="aureum-wordmark">AUREUM</div>
              <h1 className="connect-headline">
                THE FUTURE OF INVESTING,{" "}
                <span className="gold">REFINED</span> BY INTELLIGENCE.
              </h1>
              <p className="connect-tagline">
                AI-powered portfolio analysis meets institutional-grade DeFi
                execution. Connect your wallet to begin.
              </p>
            </div>

            {/* Right Wallet Panel */}
            <div className="connect-wallet-panel">
              <div className="connect-wallet-card">
                <div className="connect-icon-wrapper">
                  <span className="connect-icon">⟠</span>
                </div>
                <h2 className="connect-title">
                  <span className="text-accent">Connect</span> Wallet
                </h2>
                <p className="connect-subtitle">
                  Securely connect your wallet to analyze your portfolio with
                  AI-powered DeFi strategies
                </p>
                <div className="connect-button-wrapper">
                  <ConnectButton />
                </div>
                <div className="connect-features">
                  <div className="connect-feature">
                    <span className="feature-icon">◆</span>
                    <span>Portfolio Analysis</span>
                  </div>
                  <div className="connect-feature">
                    <span className="feature-icon">◆</span>
                    <span>AI Strategies</span>
                  </div>
                  <div className="connect-feature">
                    <span className="feature-icon">◆</span>
                    <span>One-Click Execute</span>
                  </div>
                </div>
                <div className="connect-security-badge">
                  <span className="security-dot"></span>
                  <span>Bank-grade security</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="connect-particles">
          {PARTICLE_POSITIONS.map((p, i) => (
            <div key={i} className="particle" style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <div className="dashboard-center">
            <PortfolioSummary
              totalValue={portfolio.totalValueUsd}
              isLoading={portfolio.isLoading}
            />
            <div className="dashboard-charts-row">
              <PortfolioHistory totalValue={portfolio.totalValueUsd} />
              <div 
                style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '20px' 
                }}
              >
                  <AllocationChart tokens={portfolio.tokens} />
                  <Simulator totalValue={portfolio.totalValueUsd} />
              </div>
            </div>
            <Heatmap tokens={portfolio.tokens} />
            <Goals goal={activeGoal} setGoal={setActiveGoal} />
            <AssetTable
              tokens={portfolio.tokens}
              isLoading={portfolio.isLoading}
            />
          </div>
          <div className="dashboard-right">
            <AICopilot
              tokens={portfolio.tokens}
              strategies={ai.strategies}
              isAnalyzing={ai.isLoading}
              aiError={ai.error}
              onAnalyze={handleAnalyze}
            />
            <SpendPanel totalValueUsd={portfolio.totalValueUsd} />
            <WhaleActivity />
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
