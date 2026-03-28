"use client";

import { useEffect, useState, useCallback } from "react";
import { useAccount, useChainId } from "wagmi";
import { formatEther, formatUnits } from "viem";
import { useUIState } from "./useUIState";

export interface TransactionActivity {
  id: string;
  type: "Receive" | "Send" | "Supply" | "Stake" | "Contract";
  asset: string;
  amount: string;
  usdValue: string;
  status: "Completed" | "Pending";
  time: string;
  txHash: string;
}

// Etherscan base URLs per chain
const ETHERSCAN_API: Record<number, string> = {
  1: "https://api.etherscan.io/api",
  11155111: "https://api-sepolia.etherscan.io/api",
};

function timeAgo(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function useTransactions() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { isDemoMode } = useUIState();
  const [activities, setActivities] = useState<TransactionActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = useCallback(async () => {
    if (isDemoMode) {
      setActivities([
        { id: "mock1", type: "Supply", asset: "USDC", amount: "1,500.00", usdValue: "1500.00", status: "Completed", time: "2h ago", txHash: "0x123...abc" },
        { id: "mock2", type: "Receive", asset: "ETH", amount: "0.5000", usdValue: "1250.00", status: "Completed", time: "5h ago", txHash: "0x456...def" },
        { id: "mock3", type: "Stake", asset: "ETH", amount: "0.2000", usdValue: "500.00", status: "Completed", time: "1d ago", txHash: "0x789...ghi" },
      ]);
      return;
    }

    if (!address) return;

    const apiBase = ETHERSCAN_API[chainId];
    if (!apiBase) {
      // Chain not supported by Etherscan — show empty
      setActivities([]);
      return;
    }

    setIsLoading(true);
    try {
      // Fetch last 10 normal transactions
      const url = `${apiBase}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== "1" || !Array.isArray(data.result)) {
        setActivities([]);
        return;
      }

      const txs: TransactionActivity[] = data.result.map(
        (tx: {
          hash: string;
          from: string;
          to: string;
          value: string;
          timeStamp: string;
          isError: string;
          input: string;
          functionName: string;
        }) => {
          const isReceive =
            tx.to?.toLowerCase() === address.toLowerCase();
          const isSend =
            tx.from?.toLowerCase() === address.toLowerCase() && tx.to;
          const isContract = tx.input !== "0x" && tx.input.length > 10;
          const ethValue = formatEther(BigInt(tx.value));
          const ethNum = parseFloat(ethValue);

          // Determine transaction type
          let type: TransactionActivity["type"] = "Send";
          if (isContract) {
            const fn = tx.functionName?.split("(")[0] || "";
            if (fn.includes("supply") || fn.includes("deposit")) {
              type = "Supply";
            } else if (fn.includes("stake")) {
              type = "Stake";
            } else {
              type = "Contract";
            }
          } else if (isReceive) {
            type = "Receive";
          }

          return {
            id: tx.hash,
            type,
            asset: "ETH",
            amount: ethNum > 0 ? ethNum.toFixed(4) : "0",
            usdValue: (ethNum * 2500).toFixed(2), // Rough estimate
            status:
              tx.isError === "0" ? "Completed" : ("Pending" as const),
            time: timeAgo(parseInt(tx.timeStamp)),
            txHash: tx.hash,
          };
        }
      );

      setActivities(txs);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      // Fallback to empty
      setActivities([]);
    } finally {
      setIsLoading(false);
    }
  }, [address, chainId, isDemoMode]);

  useEffect(() => {
    fetchTransactions();
    // Refresh every 30 seconds
    const interval = setInterval(fetchTransactions, 30000);
    return () => clearInterval(interval);
  }, [fetchTransactions]);

  return { activities, isLoading, refetch: fetchTransactions };
}
