"use client";

import { useEffect, useState, useCallback } from "react";
import { useChainId } from "wagmi";
import { formatEther } from "viem";

export interface WhaleTransaction {
  id: string;
  wallet: string;
  type: "Buy" | "Sell";
  asset: string;
  amount: string;
  usdValue: string;
  time: string;
  txHash: string;
}

const ETHERSCAN_API: Record<number, string> = {
  1: "https://api.etherscan.io/api",
  11155111: "https://api-sepolia.etherscan.io/api",
};

// Known "interesting" addresses on Sepolia for whale tracking
const WHALE_THRESHOLD_ETH = 0.5; // Lower threshold for testnet

function timeAgo(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function shortenAddress(addr: string): string {
  if (!addr || addr.length < 10) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function useWhaleTracker() {
  const chainId = useChainId();
  const [whaleTransactions, setWhaleTransactions] = useState<
    WhaleTransaction[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWhaleActivity = useCallback(async () => {
    const apiBase = ETHERSCAN_API[chainId];
    if (!apiBase) return;

    setIsLoading(true);
    try {
      // Fetch the most recent blocks' transactions to find large transfers
      // We use the "block" module to get the latest block, then scan txs
      const latestBlockRes = await fetch(
        `${apiBase}?module=proxy&action=eth_blockNumber`
      );
      const latestBlockData = await latestBlockRes.json();
      const latestBlock = parseInt(latestBlockData.result, 16);

      // Fetch recent transactions from the last ~50 blocks
      const startBlock = Math.max(0, latestBlock - 50);
      const txListRes = await fetch(
        `${apiBase}?module=account&action=txlist&address=0x0000000000000000000000000000000000000000&startblock=${startBlock}&endblock=${latestBlock}&page=1&offset=100&sort=desc`
      );
      const txListData = await txListRes.json();

      // If that doesn't work (address 0 won't have txs), fetch internal txs
      // Instead, get recent blocks and check their transactions
      const blockRes = await fetch(
        `${apiBase}?module=proxy&action=eth_getBlockByNumber&tag=0x${latestBlock.toString(16)}&boolean=true`
      );
      const blockData = await blockRes.json();

      if (blockData.result && blockData.result.transactions) {
        const largeTxs = blockData.result.transactions
          .filter((tx: { value: string }) => {
            const ethValue = parseFloat(
              formatEther(BigInt(tx.value || "0"))
            );
            return ethValue >= WHALE_THRESHOLD_ETH;
          })
          .slice(0, 8)
          .map(
            (
              tx: {
                hash: string;
                from: string;
                to: string;
                value: string;
              },
              i: number
            ) => {
              const ethValue = parseFloat(
                formatEther(BigInt(tx.value || "0"))
              );
              const usdValue = ethValue * 2500;

              return {
                id: tx.hash || String(i),
                wallet: shortenAddress(tx.from),
                type: "Buy" as const,
                asset: "ETH",
                amount: ethValue.toFixed(2),
                usdValue:
                  usdValue >= 1_000_000
                    ? `${(usdValue / 1_000_000).toFixed(2)}M`
                    : usdValue >= 1000
                      ? `${(usdValue / 1000).toFixed(1)}K`
                      : `$${usdValue.toFixed(0)}`,
                time: "just now",
                txHash: tx.hash,
              };
            }
          );

        if (largeTxs.length > 0) {
          setWhaleTransactions(largeTxs);
          return;
        }
      }

      // Fallback: fetch recent internal transactions (contract calls tend to be larger)
      // If no large txs found in latest block, scan recent Aave pool activity
      const aavePool = "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951";
      const aaveTxRes = await fetch(
        `${apiBase}?module=account&action=txlist&address=${aavePool}&startblock=${startBlock}&endblock=${latestBlock}&page=1&offset=20&sort=desc`
      );
      const aaveTxData = await aaveTxRes.json();

      if (
        aaveTxData.status === "1" &&
        Array.isArray(aaveTxData.result) &&
        aaveTxData.result.length > 0
      ) {
        const aaveWhales: WhaleTransaction[] = aaveTxData.result
          .slice(0, 6)
          .map(
            (
              tx: {
                hash: string;
                from: string;
                value: string;
                timeStamp: string;
                functionName: string;
              },
              i: number
            ) => {
              const fn = tx.functionName?.split("(")[0] || "interact";
              const ethValue = parseFloat(
                formatEther(BigInt(tx.value || "0"))
              );

              return {
                id: tx.hash || String(i),
                wallet: shortenAddress(tx.from),
                type: (fn.includes("supply") || fn.includes("deposit")
                  ? "Buy"
                  : "Sell") as "Buy" | "Sell",
                asset: fn.includes("supply") ? "USDC → aUSDC" : "ETH",
                amount: ethValue > 0 ? ethValue.toFixed(4) : "various",
                usdValue: ethValue > 0 ? `$${(ethValue * 2500).toFixed(0)}` : "DeFi",
                time: timeAgo(parseInt(tx.timeStamp)),
                txHash: tx.hash,
              };
            }
          );

        setWhaleTransactions(aaveWhales);
        return;
      }

      // Final fallback — show recent block activity summary
      setWhaleTransactions([
        {
          id: "latest-block",
          wallet: `Block #${latestBlock}`,
          type: "Buy",
          asset: "ETH",
          amount: "—",
          usdValue: "Live",
          time: "just now",
          txHash: "",
        },
      ]);
    } catch (err) {
      console.error("Whale tracker error:", err);
      setWhaleTransactions([]);
    } finally {
      setIsLoading(false);
    }
  }, [chainId]);

  useEffect(() => {
    fetchWhaleActivity();
    // Refresh every 15 seconds for live feel
    const interval = setInterval(fetchWhaleActivity, 15000);
    return () => clearInterval(interval);
  }, [fetchWhaleActivity]);

  return { whaleTransactions, isLoading, refetch: fetchWhaleActivity };
}
