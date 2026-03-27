"use client";

import { useAccount, useBalance, useReadContracts } from "wagmi";
import { useState, useEffect, useCallback } from "react";
import { formatUnits } from "viem";
import { KNOWN_TOKENS, ERC20_ABI } from "@/config/contracts";

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

// Fetch prices from CoinGecko
async function fetchPrices(
  ids: string[]
): Promise<Record<string, { usd: number; usd_24h_change: number }>> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(",")}&vs_currencies=usd&include_24hr_change=true`
    );
    if (!response.ok) throw new Error("Price fetch failed");
    return await response.json();
  } catch {
    // Fallback prices if API is down
    return {
      ethereum: { usd: 2500, usd_24h_change: 2.5 },
      "usd-coin": { usd: 1, usd_24h_change: 0.01 },
      dai: { usd: 1, usd_24h_change: -0.02 },
      tether: { usd: 1, usd_24h_change: 0.01 },
    };
  }
}

export function usePortfolio(): PortfolioData {
  const { address, isConnected } = useAccount();
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
    if (isConnected) {
      loadPrices();
    }
  }, [isConnected, loadPrices]);

  // Build portfolio data when balances + prices are ready
  useEffect(() => {
    if (!isConnected || !ethBalance || !prices.ethereum) return;

    const portfolio: TokenBalance[] = [];

    // Add ETH
    const ethUsdPrice = prices.ethereum?.usd || 2500;
    const ethChange = prices.ethereum?.usd_24h_change || 0;
    const ethBal = parseFloat(formatUnits(ethBalance.value, 18));
    const ethUsdValue = ethBal * ethUsdPrice;

    if (ethBal > 0) {
      portfolio.push({
        symbol: "ETH",
        address: "native",
        balance: ethBal.toFixed(4),
        balanceRaw: ethBalance.value,
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
  }, [isConnected, ethBalance, tokenBalances, prices]);

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
