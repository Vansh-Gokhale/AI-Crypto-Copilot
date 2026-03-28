/**
 * Dummy Portfolio Data for Development & Testing
 * Comprehensive realistic portfolio data for AI analysis
 */

import type { TokenBalance } from "@/hooks/usePortfolio";

/**
 * Generate realistic dummy portfolio data
 * Simulates a diversified DeFi investor portfolio
 */
export function generateDummyPortfolio(): TokenBalance[] {
  return [
    // Stablecoins (47% of portfolio)
    {
      symbol: "USDC",
      address: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
      balance: "15000.00",
      balanceRaw: BigInt("15000000000"),
      decimals: 6,
      usdPrice: 1.0,
      usdValue: 15000,
      allocation: 30,
      change24h: 0.01,
      icon: "$",
    },
    {
      symbol: "USDT",
      address: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",
      balance: "5000.00",
      balanceRaw: BigInt("5000000000"),
      decimals: 6,
      usdPrice: 1.0,
      usdValue: 5000,
      allocation: 10,
      change24h: 0.02,
      icon: "₮",
    },
    {
      symbol: "DAI",
      address: "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",
      balance: "3500.00",
      balanceRaw: BigInt("3500000000000000000"),
      decimals: 18,
      usdPrice: 1.0,
      usdValue: 3500,
      allocation: 7,
      change24h: -0.02,
      icon: "◈",
    },

    // ETH & Liquid Staking (36.4% of portfolio)
    {
      symbol: "WETH",
      address: "0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c",
      balance: "4.5",
      balanceRaw: BigInt("4500000000000000000"),
      decimals: 18,
      usdPrice: 2500,
      usdValue: 11250,
      allocation: 22.5,
      change24h: 2.5,
      icon: "Ξ",
    },
    {
      symbol: "stETH",
      address: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
      balance: "2.8",
      balanceRaw: BigInt("2800000000000000000"),
      decimals: 18,
      usdPrice: 2490,
      usdValue: 6972,
      allocation: 13.9,
      change24h: 2.4,
      icon: "⟠",
    },

    // Bitcoin (9.92% of portfolio)
    {
      symbol: "WBTC",
      address: "0x29f2D40B0605204364af54EC677bD022dA425d03",
      balance: "0.08",
      balanceRaw: BigInt("8000000"),
      decimals: 8,
      usdPrice: 62000,
      usdValue: 4960,
      allocation: 9.92,
      change24h: 1.3,
      icon: "₿",
    },

    // DeFi Governance & Utility (15% of portfolio)
    {
      symbol: "UNI",
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      balance: "850.00",
      balanceRaw: BigInt("850000000000000000000"),
      decimals: 18,
      usdPrice: 6.5,
      usdValue: 5525,
      allocation: 11.05,
      change24h: -0.5,
      icon: "◉",
    },
    {
      symbol: "LINK",
      address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      balance: "500.00",
      balanceRaw: BigInt("500000000000000000000"),
      decimals: 18,
      usdPrice: 14,
      usdValue: 7000,
      allocation: 14,
      change24h: 0.8,
      icon: "⬡",
    },
    {
      symbol: "AAVE",
      address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
      balance: "35.00",
      balanceRaw: BigInt("35000000000000000000"),
      decimals: 18,
      usdPrice: 95,
      usdValue: 3325,
      allocation: 6.65,
      change24h: 1.1,
      icon: "▲",
    },
    {
      symbol: "CRV",
      address: "0xD533a949740bb3306d119CC777fa900bA034cd52",
      decimals: 18,
      balance: "2500.00",
      balanceRaw: BigInt("2500000000000000000000"),
      usdPrice: 0.4,
      usdValue: 1000,
      allocation: 2,
      change24h: -1.2,
      icon: "◆",
    },

    // Emerging & High Growth
    {
      symbol: "LDO",
      address: "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32",
      balance: "800.00",
      balanceRaw: BigInt("800000000000000000000"),
      decimals: 18,
      usdPrice: 1.5,
      usdValue: 1200,
      allocation: 2.4,
      change24h: -0.3,
      icon: "L",
    },
    {
      symbol: "SHIB",
      address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
      balance: "5000000.00",
      balanceRaw: BigInt("5000000000000000000000000"),
      decimals: 18,
      usdPrice: 0.000009,
      usdValue: 45,
      allocation: 0.09,
      change24h: 3.2,
      icon: "🐕",
    },
  ];
}

/**
 * Realistic price data for common coins
 */
export const DUMMY_PRICES: Record<
  string,
  { usd: number; usd_24h_change: number }
> = {
  ethereum: { usd: 2500, usd_24h_change: 2.5 },
  "usd-coin": { usd: 1.0, usd_24h_change: 0.01 },
  tether: { usd: 1.0, usd_24h_change: 0.02 },
  dai: { usd: 1.0, usd_24h_change: -0.02 },
  "wrapped-bitcoin": { usd: 62000, usd_24h_change: 1.3 },
  chainlink: { usd: 14, usd_24h_change: 0.8 },
  uniswap: { usd: 6.5, usd_24h_change: -0.5 },
  aave: { usd: 95, usd_24h_change: 1.1 },
  maker: { usd: 1400, usd_24h_change: 2.0 },
  "curve-dao-token": { usd: 0.4, usd_24h_change: -1.2 },
  "compound-governance-token": { usd: 50, usd_24h_change: 0.9 },
  "staked-ether": { usd: 2490, usd_24h_change: 2.4 },
  "lido-dao": { usd: 1.5, usd_24h_change: -0.3 },
  "coinbase-wrapped-staked-eth": { usd: 2505, usd_24h_change: 2.5 },
  balancer: { usd: 5.5, usd_24h_change: 0.5 },
  "yearn-finance": { usd: 4800, usd_24h_change: 1.8 },
  "shiba-inu": { usd: 0.000009, usd_24h_change: 3.2 },
  apecoin: { usd: 1.2, usd_24h_change: -2.1 },
  sushi: { usd: 0.7, usd_24h_change: -0.8 },
  "1inch": { usd: 0.5, usd_24h_change: 1.2 },
  "ethereum-name-service": { usd: 12, usd_24h_change: 2.3 },
  "matic-network": { usd: 0.8, usd_24h_change: 0.6 },
  arbitrum: { usd: 0.9, usd_24h_change: 1.5 },
  optimism: { usd: 1.8, usd_24h_change: 0.7 },
  uma: { usd: 3.2, usd_24h_change: -1.1 },
  pendle: { usd: 2.1, usd_24h_change: 2.9 },
  "spell-token": { usd: 0.002, usd_24h_change: -3.2 },
};

/**
 * Dummy DeFi strategy recommendations
 * Pre-generated AI suggestions based on portfolio composition
 */
export const DUMMY_STRATEGIES = [
  {
    action: "Lend",
    protocol: "Aave V3",
    asset: "USDC",
    amount: "9000 USDC",
    estimatedApy: "4.8%",
    risk: "Low" as const,
    reasoning:
      "Your $15,000 USDC position is ideal for lending. Aave V3 is battle-tested with $10B+ TVL. Expected annual yield: ~$720.",
  },
  {
    action: "Lend",
    protocol: "Compound",
    asset: "USDT",
    amount: "3000 USDT",
    estimatedApy: "4.2%",
    risk: "Low" as const,
    reasoning:
      "Lend remaining stablecoins to Compound for additional yield. Diversifies lending across protocols.",
  },
  {
    action: "Stake",
    protocol: "Lido",
    asset: "WETH",
    amount: "2.0 WETH",
    estimatedApy: "3.5%",
    risk: "Low" as const,
    reasoning:
      "Stake 44% of WETH holdings via Lido. Get daily staking rewards + liquid stETH for composability. Annual yield: ~$175.",
  },
  {
    action: "Provide Liquidity",
    protocol: "Uniswap V3",
    asset: "WETH/USDC",
    amount: "2.0 WETH + 5000 USDC",
    estimatedApy: "12.5%",
    risk: "Medium" as const,
    reasoning:
      "Concentrated liquidity in WETH/USDC 0.05% fee tier. Higher yields but subject to impermanent loss. Monitor weekly.",
  },
  {
    action: "Swap",
    protocol: "Uniswap",
    asset: "SHIB → LINK",
    amount: "Sell 5M SHIB (~$45)",
    estimatedApy: "N/A",
    risk: "Low" as const,
    reasoning:
      "SHIB position is minimal (0.09% allocation). Rebalance into LINK for better yield opportunities via lending.",
  },
  {
    action: "Stake",
    protocol: "Curve",
    asset: "DAI",
    amount: "3000 DAI",
    estimatedApy: "6.2%",
    risk: "Low" as const,
    reasoning:
      "Stake DAI in Curve's 3-pool. Earn both trading fees and CRV rewards. Low impermanent loss risk.",
  },
];

/**
 * Market data for chart visualization
 */
export const DUMMY_MARKET_DATA = {
  historicalPrices: {
    ethereum: [
      { date: "2024-03-18", price: 2420 },
      { date: "2024-03-19", price: 2438 },
      { date: "2024-03-20", price: 2445 },
      { date: "2024-03-21", price: 2420 },
      { date: "2024-03-22", price: 2468 },
      { date: "2024-03-23", price: 2487 },
      { date: "2024-03-24", price: 2500 },
      { date: "2024-03-25", price: 2512 },
      { date: "2024-03-26", price: 2505 },
      { date: "2024-03-27", price: 2515 },
      { date: "2024-03-28", price: 2500 },
    ],
    bitcoin: [
      { date: "2024-03-18", price: 61000 },
      { date: "2024-03-19", price: 61200 },
      { date: "2024-03-20", price: 61350 },
      { date: "2024-03-21", price: 61100 },
      { date: "2024-03-22", price: 61600 },
      { date: "2024-03-23", price: 61800 },
      { date: "2024-03-24", price: 61950 },
      { date: "2024-03-25", price: 62100 },
      { date: "2024-03-26", price: 62050 },
      { date: "2024-03-27", price: 62150 },
      { date: "2024-03-28", price: 62000 },
    ],
  },
  riskMetrics: {
    portfolioVolatility: 18.5,
    betaToEth: 1.2,
    sharpeRatio: 0.85,
    maxDrawdown: -12.3,
  },
};

/**
 * Calculate total portfolio value
 */
export function calculateTotalPortfolioValue(portfolio: TokenBalance[]): number {
  return portfolio.reduce((sum, token) => sum + token.usdValue, 0);
}

/**
 * Calculate allocation percentages
 */
export function calculateAllocations(
  portfolio: TokenBalance[]
): TokenBalance[] {
  const total = calculateTotalPortfolioValue(portfolio);
  return portfolio.map((token) => ({
    ...token,
    allocation: (token.usdValue / total) * 100,
  }));
}

/**
 * Get portfolio summary stats
 */
export interface PortfolioStats {
  totalValue: number;
  largestHolding: TokenBalance | null;
  highestAllocation: { symbol: string; allocation: number } | null;
  topGainer: TokenBalance | null;
  topLoser: TokenBalance | null;
  stablecoinRatio: number;
  defiExposure: number;
  ethExposure: number;
}

export function getPortfolioStats(portfolio: TokenBalance[]): PortfolioStats {
  const total = calculateTotalPortfolioValue(portfolio);
  const sorted = [...portfolio].sort((a, b) => b.usdValue - a.usdValue);
  const sorted24h = [...portfolio].sort((a, b) => b.change24h - a.change24h);

  const stablecoins = portfolio.filter((t) =>
    ["USDC", "USDT", "DAI", "TUSD"].includes(t.symbol)
  );
  const defi = portfolio.filter((t) =>
    [
      "UNI",
      "AAVE",
      "CRV",
      "LINK",
      "COMP",
      "BAL",
      "YFI",
      "LDO",
      "SNX",
      "OP",
      "ARB",
    ].includes(t.symbol)
  );
  const eth = portfolio.filter((t) =>
    ["ETH", "WETH", "stETH", "cbETH"].includes(t.symbol)
  );

  const stablecoinValue = stablecoins.reduce((sum, t) => sum + t.usdValue, 0);
  const defiValue = defi.reduce((sum, t) => sum + t.usdValue, 0);
  const ethValue = eth.reduce((sum, t) => sum + t.usdValue, 0);

  return {
    totalValue: total,
    largestHolding: sorted[0] || null,
    highestAllocation: sorted[0]
      ? { symbol: sorted[0].symbol, allocation: sorted[0].allocation }
      : null,
    topGainer: sorted24h[0] || null,
    topLoser: sorted24h[sorted24h.length - 1] || null,
    stablecoinRatio: (stablecoinValue / total) * 100,
    defiExposure: (defiValue / total) * 100,
    ethExposure: (ethValue / total) * 100,
  };
}
