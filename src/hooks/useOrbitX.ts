"use client";

import { useState, useEffect, useCallback } from "react";

export interface OrbitXState {
  isLinked: boolean;
  cardLast4: string | null;
  availableYield: number;
  monthlyYield: number;
  isLoading: boolean;
}

export function useOrbitX(totalValueUsd: number) {
  const [state, setState] = useState<OrbitXState>({
    isLinked: false,
    cardLast4: null,
    availableYield: 0,
    monthlyYield: 0,
    isLoading: false,
  });

  useEffect(() => {
    // Calculate simulated yield (average 4.5% APY)
    const annualYield = totalValueUsd * 0.045;
    const monthly = annualYield / 12;
    
    // Simulate available yield (accrued over some time)
    const available = monthly * 0.35; // Mock: 35% of monthly yield currently available

    setState(prev => ({
      ...prev,
      monthlyYield: monthly,
      availableYield: available,
    }));
  }, [totalValueUsd]);

  const linkCard = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate OrbitX card creation/linking
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setState(prev => ({
      ...prev,
      isLinked: true,
      cardLast4: "8824", // Mock card number
      isLoading: false,
    }));
  }, []);

  const spendEarnings = useCallback(async (amount: number) => {
    if (amount > state.availableYield) {
        alert("Insufficient earnings to cover this transaction.");
        return;
    }

    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate OrbitX spend trigger
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setState(prev => ({
        ...prev,
        availableYield: prev.availableYield - amount,
        isLoading: false,
    }));

    alert(`Successfully spent $${amount.toFixed(2)} via OrbitX Card! No off-ramping required.`);
  }, [state.availableYield]);

  return { ...state, linkCard, spendEarnings };
}
