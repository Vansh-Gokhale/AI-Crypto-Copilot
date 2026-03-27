"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">
          <span className="header-title-accent">AI</span> Crypto Copilot
        </h1>
        <span className="header-badge">Beta</span>
      </div>
      <div className="header-right">
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
