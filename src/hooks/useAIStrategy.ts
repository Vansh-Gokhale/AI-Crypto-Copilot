"use client";

import { useState, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { TokenBalance } from "./usePortfolio";

export interface AIStrategy {
  action: string;
  protocol: string;
  asset: string;
  amount: string;
  estimatedApy: string;
  risk: "Low" | "Medium" | "High";
  reasoning: string;
  confidenceScore: number;
  riskReasoning: string;
}

export interface AIStrategyResult {
  strategies: AIStrategy[];
  isLoading: boolean;
  error: string | null;
  analyze: (tokens: TokenBalance[], totalValue: number, goal?: string) => Promise<void>;
}

export function useAIStrategy(): AIStrategyResult {
  const [strategies, setStrategies] = useState<AIStrategy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(
    async (tokens: TokenBalance[], totalValue: number, goal?: string) => {
      setIsLoading(true);
      setError(null);
      setStrategies([]);

      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

      if (!apiKey) {
        setStrategies(generateMockStrategies(tokens));
        setIsLoading(false);
        return;
      }

      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const portfolioSummary = tokens
          .map(
            (t) =>
              `${t.symbol}: ${t.balance} tokens ($${t.usdValue.toFixed(2)}, ${t.allocation.toFixed(1)}% of portfolio)`
          )
          .join("\n");

        const goalContext = goal ? `INVESTMENT GOAL: "${goal}". Provide a strategic roadmap action to achieve this.` : "";

        const prompt = `You are a DeFi strategy advisor.
${goalContext}

Portfolio (Total Value: $${totalValue.toFixed(2)}):
${portfolioSummary}

Rules:
- Only suggest proven, safe protocols (Aave, Lido, Compound, Uniswap)
- Focus on yield generation for idle stablecoins
- Consider staking for ETH holdings
- Be realistic with APY estimates

Return ONLY a JSON array with objects containing:
{
  "action": "Lend" | "Stake" | "Swap" | "Provide Liquidity",
  "protocol": "string",
  "asset": "string",
  "amount": "string",
  "estimatedApy": "string",
  "risk": "Low" | "Medium" | "High",
  "reasoning": "string",
  "confidenceScore": number (0-100),
  "riskReasoning": "string"
}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // Parse JSON from response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]) as AIStrategy[];
          setStrategies(parsed);
        } else {
          throw new Error("Could not parse AI response");
        }
      } catch (err) {
        console.error("AI Strategy error:", err);
        // Fallback to mock strategies
        setStrategies(generateMockStrategies(tokens));
        setError("Using suggested strategies (AI unavailable)");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { strategies, isLoading, error, analyze };
}

function generateMockStrategies(tokens: TokenBalance[]): AIStrategy[] {
  const strategies: AIStrategy[] = [];

  const stablecoins = tokens.filter((t) =>
    ["USDC", "USDT", "DAI"].includes(t.symbol)
  );
  const eth = tokens.find((t) => ["ETH", "WETH"].includes(t.symbol));

  if (stablecoins.length > 0) {
    const largest = stablecoins.sort((a, b) => b.usdValue - a.usdValue)[0];
    const amount = (parseFloat(largest.balance) * 0.6).toFixed(2);
    strategies.push({
      action: "Lend",
      protocol: "Aave V3",
      asset: largest.symbol,
      amount: `${amount} ${largest.symbol}`,
      estimatedApy: "4.8%",
      risk: "Low",
      reasoning: `Lend idle ${largest.symbol} on Aave V3 for stable yield. Aave is battle-tested with billions in TVL.`,
      confidenceScore: 95,
      riskReasoning: "Aave V3 has robust liquidation mechanisms and high liquidity, making it one of the safest DeFi protocols.",
    });
  }

  if (eth && parseFloat(eth.balance) > 0.01) {
    const amount = (parseFloat(eth.balance) * 0.5).toFixed(4);
    strategies.push({
      action: "Stake",
      protocol: "Lido",
      asset: "ETH",
      amount: `${amount} ETH`,
      estimatedApy: "3.5%",
      risk: "Low",
      reasoning:
        "Stake ETH via Lido for stETH yield. Lido is the largest liquid staking protocol with deep liquidity.",
      confidenceScore: 88,
      riskReasoning: "Lido is highly decentralized but carries smart contract risk common to liquid staking protocols.",
    });
  }

  if (strategies.length === 0) {
    strategies.push({
      action: "Swap",
      protocol: "Uniswap",
      asset: "ETH",
      amount: "0.1 ETH",
      estimatedApy: "N/A",
      risk: "Medium",
      reasoning:
        "Consider diversifying into stablecoins to access lending yield opportunities.",
      confidenceScore: 75,
      riskReasoning: "Swapping assets involves market timing risk and price slippage depending on DEX liquidity.",
    });
  }

  return strategies;
}
