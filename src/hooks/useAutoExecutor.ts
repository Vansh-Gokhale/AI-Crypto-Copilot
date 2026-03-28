"use client";

import { useEffect, useRef } from "react";
import type { AIStrategy } from "./useAIStrategy";
import { useUIState } from "./useUIState";

export function useAutoExecutor(strategies: AIStrategy[]) {
  const { isAutoMode } = useUIState();
  const executedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!isAutoMode || strategies.length === 0) return;

    // Execute the first strategy if it hasn't been executed yet
    const strategy = strategies[0];
    const strategyId = `${strategy.action}-${strategy.protocol}-${strategy.asset}-${strategy.amount}`;

    if (!executedRef.current.has(strategyId)) {
      console.log(`[AutoExecutor] Executing strategy: ${strategyId}`);
      executedRef.current.add(strategyId);
      
      // In a real app, this would trigger the actual execution logic
      // For now, we'll simulate a notification/log
      alert(`[AI AUTO MODE] Automatically executing top strategy: ${strategy.action} ${strategy.amount} on ${strategy.protocol}`);
    }
  }, [strategies, isAutoMode]);
}
