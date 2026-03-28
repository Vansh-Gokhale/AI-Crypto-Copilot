"use client";

import type { TokenBalance } from "@/hooks/usePortfolio";

export interface SecurityStatus {
  isSafe: boolean;
  riskLevel: "Low" | "Medium" | "High";
  warnings: string[];
}

export function securityCheck(token: TokenBalance): SecurityStatus {
  const warnings: string[] = [];
  let riskScore = 0;

  // 1. Liquidity Check (Mocked logic for demo)
  if (token.usdValue < 10) {
    warnings.push("Low wallet liquidity for this asset.");
    riskScore += 1;
  }

  // 2. Volatility Check
  if (Math.abs(token.change24h) > 15) {
    warnings.push("High 24h volatility detected.");
    riskScore += 2;
  }

  // 3. Known Scam/Meme detection (Mocked based on symbol)
  const memeTokens = ["PEPE", "SHIB", "DOGE", "FLOKI"];
  if (memeTokens.includes(token.symbol.toUpperCase())) {
    warnings.push("Meme token: High speculative risk.");
    riskScore += 2;
  }

  // 4. Low Price Check (Small cap/Unit bias)
  if (token.usdPrice < 0.0001) {
      warnings.push("Extremely low unit price: Possible micro-cap risk.");
      riskScore += 1;
  }

  let riskLevel: "Low" | "Medium" | "High" = "Low";
  if (riskScore >= 4) riskLevel = "High";
  else if (riskScore >= 2) riskLevel = "Medium";

  return {
    isSafe: riskLevel !== "High",
    riskLevel,
    warnings,
  };
}
