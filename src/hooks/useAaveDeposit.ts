"use client";

import { useState, useCallback } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { parseUnits } from "viem";
import {
  AAVE_POOL_ADDRESS,
  USDC_ADDRESS,
  AAVE_POOL_ABI,
  ERC20_ABI,
} from "@/config/contracts";

export type TxStatus = "idle" | "approving" | "approved" | "depositing" | "success" | "error";

export interface AaveDepositResult {
  status: TxStatus;
  error: string | null;
  txHash: string | null;
  deposit: (amount: string, decimals?: number) => Promise<void>;
  reset: () => void;
}

export function useAaveDeposit(): AaveDepositResult {
  const { address } = useAccount();
  const [status, setStatus] = useState<TxStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const { writeContractAsync } = useWriteContract();

  useWaitForTransactionReceipt({
    hash: txHash as `0x${string}` | undefined,
  });

  const deposit = useCallback(
    async (amount: string, decimals: number = 6) => {
      if (!address) {
        setError("Wallet not connected");
        return;
      }

      try {
        setStatus("approving");
        setError(null);

        const parsedAmount = parseUnits(amount, decimals);

        // Step 1: Approve USDC spending
        const approveTx = await writeContractAsync({
          address: USDC_ADDRESS,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [AAVE_POOL_ADDRESS, parsedAmount],
        });

        setTxHash(approveTx);
        setStatus("approved");

        // Small delay to allow approval to be mined
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Step 2: Supply to Aave
        setStatus("depositing");
        const supplyTx = await writeContractAsync({
          address: AAVE_POOL_ADDRESS,
          abi: AAVE_POOL_ABI,
          functionName: "supply",
          args: [USDC_ADDRESS, parsedAmount, address, 0],
        });

        setTxHash(supplyTx);
        setStatus("success");
      } catch (err) {
        console.error("Deposit error:", err);
        setError(err instanceof Error ? err.message : "Transaction failed");
        setStatus("error");
      }
    },
    [address, writeContractAsync]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
    setTxHash(null);
  }, []);

  return { status, error, txHash, deposit, reset };
}
