"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export interface TransactionActivity {
  id: string;
  type: "Receive" | "Send" | "Supply" | "Stake";
  asset: string;
  amount: string;
  usdValue: string;
  status: "Completed" | "Pending";
  time: string;
}

export function useTransactions() {
  const { address } = useAccount();
  const [activities, setActivities] = useState<TransactionActivity[]>([]);

  useEffect(() => {
    // Mock user activity for demo
    const mockActivities: TransactionActivity[] = [
      {
        id: "1",
        type: "Supply",
        asset: "USDC",
        amount: "500",
        usdValue: "500.00",
        status: "Completed",
        time: "3h ago",
      },
      {
        id: "2",
        type: "Receive",
        asset: "ETH",
        amount: "0.25",
        usdValue: "625.00",
        status: "Completed",
        time: "8h ago",
      },
      {
        id: "3",
        type: "Send",
        asset: "DAI",
        amount: "100",
        usdValue: "100.00",
        status: "Completed",
        time: "1d ago",
      },
    ];

    setActivities(mockActivities);
  }, [address]);

  return { activities };
}
