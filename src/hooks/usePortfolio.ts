"use client";

import { useAccount, useBalance, useReadContracts } from "wagmi";
import { useState, useEffect, useCallback } from "react";
import { formatUnits } from "viem";
import { KNOWN_TOKENS, ERC20_ABI } from "@/config/contracts";
import { useUIState } from "./useUIState";

export interface TokenBalance {
  symbol: string;
  address: string;
  balance: string;
  balanceRaw: bigint;
  decimals: number;
  usdPrice: number;
  usdValue: number;
  allocation: number;
  change24h: number;
  icon: string;
}

export interface PortfolioData {
  tokens: TokenBalance[];
  totalValueUsd: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

// Fallback prices in case CoinGecko API is down or blocked by CORS
const FALLBACK_PRICES: Record<string, { usd: number; usd_24h_change: number }> = {
  ethereum: { usd: 2500, usd_24h_change: 2.5 },
  "usd-coin": { usd: 1, usd_24h_change: 0.01 },
  dai: { usd: 1, usd_24h_change: -0.02 },
  tether: { usd: 1, usd_24h_change: 0.01 },
};

// Fetch prices from CoinGecko with timeout and fallback
async function fetchPrices(
  ids: string[]
): Promise<Record<string, { usd: number; usd_24h_change: number }>> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(",")}&vs_currencies=usd&include_24hr_change=true`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    if (!response.ok) throw new Error("Price fetch failed");
    const data = await response.json();
    // Merge with fallback so we always have complete data
    return { ...FALLBACK_PRICES, ...data };
  } catch {
    // Fallback prices if API is down or CORS-blocked
    return FALLBACK_PRICES;
  }
}

export function usePortfolio(): PortfolioData {
  const { address, isConnected } = useAccount();
  const { isDemoMode } = useUIState();
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [totalValueUsd, setTotalValueUsd] = useState(0);
  const [prices, setPrices] = useState<Record<string, { usd: number; usd_24h_change: number }>>({});
  const [pricesLoading, setPricesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch ETH balance
  const { data: ethBalance, isLoading: ethLoading, refetch: refetchEth } = useBalance({
    address,
  });

  // Fetch ERC20 balances
  const tokenContracts = KNOWN_TOKENS.map((token) => ({
    address: token.address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "balanceOf" as const,
    args: [address!] as const,
  }));

  const {
    data: tokenBalances,
    isLoading: tokensLoading,
    refetch: refetchTokens,
  } = useReadContracts({
    contracts: address ? tokenContracts : [],
  });

  // Fetch prices
  const loadPrices = useCallback(async () => {
    setPricesLoading(true);
    try {
      const ids = ["ethereum", ...KNOWN_TOKENS.map((t) => t.coingeckoId)];
      const priceData = await fetchPrices(ids);
      setPrices(priceData);
    } catch (err) {
      setError("Failed to fetch prices");
      console.error(err);
    } finally {
      setPricesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isConnected || isDemoMode) {
      loadPrices();
    }
  }, [isConnected, isDemoMode, loadPrices]);

  // Build portfolio data when balances + prices are ready
  useEffect(() => {
    if ((!isConnected && !isDemoMode) || !prices.ethereum) return;

    const portfolio: TokenBalance[] = [];

    // If Demo Mode or explicitly requested demo data, show demo data
    if (isDemoMode) {
      const ethPrice = prices.ethereum?.usd || 2500;
      const ethChg = prices.ethereum?.usd_24h_change || 2.5;
      const usdcPrice = prices["usd-coin"]?.usd || 1;
      const usdcChg = prices["usd-coin"]?.usd_24h_change || 0.01;
      const usdtPrice = prices["tether"]?.usd || 1;
      const usdtChg = prices["tether"]?.usd_24h_change || 0.02;
      const daiPrice = prices["dai"]?.usd || 1;
      const daiChg = prices["dai"]?.usd_24h_change || -0.01;

      const demoTokens: TokenBalance[] = [
        {
          symbol: "ETH",
          address: "native",
          balance: "1.4500",
          balanceRaw: BigInt("1450000000000000000"),
          decimals: 18,
          usdPrice: ethPrice,
          usdValue: 1.45 * ethPrice,
          allocation: 0,
          change24h: ethChg,
          icon: "⟠",
        },
        {
          symbol: "USDC",
          address: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
          balance: "2500.00",
          balanceRaw: BigInt("2500000000"),
          decimals: 6,
          usdPrice: usdcPrice,
          usdValue: 2500 * usdcPrice,
          allocation: 0,
          change24h: usdcChg,
          icon: "💵",
        },
        {
          symbol: "USDT",
          address: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",
          balance: "1800.00",
          balanceRaw: BigInt("1800000000"),
          decimals: 6,
          usdPrice: usdtPrice,
          usdValue: 1800 * usdtPrice,
          allocation: 0,
          change24h: usdtChg,
          icon: "₮",
        },
        {
          symbol: "DAI",
          address: "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",
          balance: "750.0000",
          balanceRaw: BigInt("750000000000000000000"),
          decimals: 18,
          usdPrice: daiPrice,
          usdValue: 750 * daiPrice,
          allocation: 0,
          change24h: daiChg,
          icon: "◈",
        },
        {
          symbol: "WETH",
          address: "0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c",
          balance: "0.5200",
          balanceRaw: BigInt("520000000000000000"),
          decimals: 18,
          usdPrice: ethPrice,
          usdValue: 0.52 * ethPrice,
          allocation: 0,
          change24h: ethChg,
          icon: "⟠",
        },
      ];

      const demoTotal = demoTokens.reduce((sum, t) => sum + t.usdValue, 0);
      demoTokens.forEach((t) => {
        t.allocation = demoTotal > 0 ? (t.usdValue / demoTotal) * 100 : 0;
      });
      demoTokens.sort((a, b) => b.usdValue - a.usdValue);

      setTokens(demoTokens);
      setTotalValueUsd(demoTotal);
      return;
    }

    // Add ETH
    const ethUsdPrice = prices.ethereum?.usd || 2500;
    const ethChange = prices.ethereum?.usd_24h_change || 0;
    const ethBal = ethBalance ? parseFloat(formatUnits(ethBalance.value, 18)) : 0;
    const ethUsdValue = ethBal * ethUsdPrice;

    if (ethBal > 0) {
      portfolio.push({
        symbol: "ETH",
        address: "native",
        balance: ethBal.toFixed(4),
        balanceRaw: ethBalance?.value || BigInt(0),
        decimals: 18,
        usdPrice: ethUsdPrice,
        usdValue: ethUsdValue,
        allocation: 0,
        change24h: ethChange,
        icon: "⟠",
      });
    }

    // Add ERC20 tokens
    if (tokenBalances) {
      KNOWN_TOKENS.forEach((token, i) => {
        const result = tokenBalances[i];
        if (result && result.status === "success" && result.result) {
          const rawBalance = result.result as bigint;
          if (rawBalance > BigInt(0)) {
            const bal = parseFloat(formatUnits(rawBalance, token.decimals));
            const priceData = prices[token.coingeckoId];
            const usdPrice = priceData?.usd || 1;
            const change = priceData?.usd_24h_change || 0;

            portfolio.push({
              symbol: token.symbol,
              address: token.address,
              balance: bal.toFixed(token.decimals <= 6 ? 2 : 4),
              balanceRaw: rawBalance,
              decimals: token.decimals,
              usdPrice,
              usdValue: bal * usdPrice,
              allocation: 0,
              change24h: change,
              icon: token.icon,
            });
          }
        }
      });
    }

    // Calculate allocations
    const total = portfolio.reduce((sum, t) => sum + t.usdValue, 0);
    portfolio.forEach((t) => {
      t.allocation = total > 0 ? (t.usdValue / total) * 100 : 0;
    });

    // Sort by value descending
    portfolio.sort((a, b) => b.usdValue - a.usdValue);

    setTokens(portfolio);
    setTotalValueUsd(total);
  }, [isConnected, isDemoMode, ethBalance, tokenBalances, prices]);

  const refetch = useCallback(() => {
    refetchEth();
    refetchTokens();
    loadPrices();
  }, [refetchEth, refetchTokens, loadPrices]);

  return {
    tokens,
    totalValueUsd,
    isLoading: ethLoading || tokensLoading || pricesLoading,
    error,
    refetch,
  };
}
