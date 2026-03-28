"use client";

import { useEffect, useState } from "react";

export interface WhaleTransaction {
  id: string;
  wallet: string;
  type: "Buy" | "Sell";
  asset: string;
  amount: string;
  usdValue: string;
  time: string;
}

export function useWhaleTracker() {
  const [whaleTransactions, setWhaleTransactions] = useState<WhaleTransaction[]>([]);

  useEffect(() => {
    // Simulated smart money activity
    const mockWhaleActivity: WhaleTransaction[] = [
      {
        id: "1",
        wallet: "0x742d...44e",
        type: "Buy",
        asset: "ETH",
        amount: "500",
        usdValue: "1.25M",
        time: "2m ago",
      },
      {
        id: "2",
        wallet: "0x123...abc",
        type: "Sell",
        asset: "USDC",
        amount: "1,000,000",
        usdValue: "1M",
        time: "15m ago",
      },
      {
        id: "3",
        wallet: "SmartMoney.eth",
        type: "Buy",
        asset: "UNI",
        amount: "50,000",
        usdValue: "450K",
        time: "22m ago",
      },
      {
        id: "4",
        wallet: "0xabc...789",
        type: "Buy",
        asset: "LINK",
        amount: "10,000",
        usdValue: "180K",
        time: "45m ago",
      },
    ];

    setWhaleTransactions(mockWhaleActivity);
  }, []);

  return { whaleTransactions };
}
