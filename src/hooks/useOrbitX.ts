"use client";

import { useState, useEffect, useCallback } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseEther, formatEther } from "viem";
import { AUREUM_VAULT_ADDRESS, AUREUM_VAULT_ABI } from "@/config/contracts";

export interface OrbitXState {
  isLinked: boolean;
  cardLast4: string | null;
  availableYield: number;
  monthlyYield: number;
  isLoading: boolean;
}

export function useOrbitX(totalValueUsd: number) {
  const { address } = useAccount();
  const [state, setState] = useState<OrbitXState>({
    isLinked: false,
    cardLast4: null,
    availableYield: 0,
    monthlyYield: 0,
    isLoading: false,
  });

  const { data: onChainLinked } = useReadContract({
    address: AUREUM_VAULT_ADDRESS,
    abi: AUREUM_VAULT_ABI,
    functionName: "isLinkedToOrbitX",
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  });

  const { data: onChainEarnings } = useReadContract({
    address: AUREUM_VAULT_ADDRESS,
    abi: AUREUM_VAULT_ABI,
    functionName: "getSpendableEarnings",
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  });

  const { writeContractAsync } = useWriteContract();

  useEffect(() => {
    const annualYield = totalValueUsd * 0.045;
    const monthly = annualYield / 12;
    
    // Sync with on-chain data if available
    const available = onChainEarnings ? Number(formatEther(onChainEarnings)) : (monthly * 0.35);

    setState(prev => ({
      ...prev,
      monthlyYield: monthly,
      availableYield: available,
      isLinked: onChainLinked ?? prev.isLinked,
      cardLast4: onChainLinked ? (prev.cardLast4 || "8824") : prev.cardLast4
    }));
  }, [totalValueUsd, onChainEarnings, onChainLinked]);

  const linkCard = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
        if (address) {
            await writeContractAsync({
                address: AUREUM_VAULT_ADDRESS,
                abi: AUREUM_VAULT_ABI,
                functionName: "linkOrbitXCard",
            });
        }
        await new Promise(resolve => setTimeout(resolve, 1500));
        setState(prev => ({ ...prev, isLinked: true, cardLast4: "8824" }));
    } catch (e) {
        console.error("Link error:", e);
    } finally {
        setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [address, writeContractAsync]);

  const spendEarnings = useCallback(async (amount: number) => {
    if (amount > state.availableYield) {
        alert("Insufficient earnings to cover this transaction.");
        return;
    }

    setState(prev => ({ ...prev, isLoading: true }));
    try {
        if (address) {
            await writeContractAsync({
                address: AUREUM_VAULT_ADDRESS,
                abi: AUREUM_VAULT_ABI,
                functionName: "spendViaOrbitX",
                args: [parseEther(amount.toString()), "8824"],
            });
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
        setState(prev => ({
            ...prev,
            availableYield: prev.availableYield - amount,
        }));
        alert(`Successfully spent $${amount.toFixed(2)} via OrbitX Card!`);
    } catch (e) {
        console.error("Spend error:", e);
    } finally {
        setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [state.availableYield, address, writeContractAsync]);

  return { ...state, linkCard, spendEarnings };
}
