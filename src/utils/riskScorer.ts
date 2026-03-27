export interface TokenRisk {
  symbol: string;
  riskScore: number;
  riskLevel: "Low" | "Medium" | "High";
}

export interface PortfolioRisk {
  overallScore: number;
  overallLevel: "Low" | "Medium" | "High";
  tokenRisks: TokenRisk[];
}

const STABLECOINS = ["USDC", "USDT", "DAI", "BUSD", "FRAX"];
const BLUE_CHIPS = ["ETH", "WETH", "WBTC", "BTC", "stETH"];

function getTokenRiskScore(symbol: string): number {
  const upper = symbol.toUpperCase();
  if (STABLECOINS.includes(upper)) return 15;
  if (BLUE_CHIPS.includes(upper)) return 30;
  return 65;
}

function getRiskLevel(score: number): "Low" | "Medium" | "High" {
  if (score <= 25) return "Low";
  if (score <= 50) return "Medium";
  return "High";
}

export interface PortfolioToken {
  symbol: string;
  usdValue: number;
}

export function calculatePortfolioRisk(tokens: PortfolioToken[]): PortfolioRisk {
  const totalValue = tokens.reduce((sum, t) => sum + t.usdValue, 0);

  if (totalValue === 0) {
    return {
      overallScore: 0,
      overallLevel: "Low",
      tokenRisks: [],
    };
  }

  const tokenRisks: TokenRisk[] = tokens.map((t) => {
    const riskScore = getTokenRiskScore(t.symbol);
    return {
      symbol: t.symbol,
      riskScore,
      riskLevel: getRiskLevel(riskScore),
    };
  });

  const weightedScore = tokens.reduce((sum, t) => {
    const weight = t.usdValue / totalValue;
    const score = getTokenRiskScore(t.symbol);
    return sum + weight * score;
  }, 0);

  const overallScore = Math.round(weightedScore);

  return {
    overallScore,
    overallLevel: getRiskLevel(overallScore),
    tokenRisks,
  };
}
