"use client";

import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface UIState {
  isDemoMode: boolean;
  setDemoMode: (val: boolean) => void;
  isAutoMode: boolean;
  setAutoMode: (val: boolean) => void;
}

const UIContext = createContext<UIState | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [isDemoMode, setDemoMode] = useState(false);
  const [isAutoMode, setAutoMode] = useState(false);

  useEffect(() => {
    const savedDemo = localStorage.getItem("demoMode");
    const savedAuto = localStorage.getItem("autoMode");
    if (savedDemo !== null) setDemoMode(savedDemo === "true");
    if (savedAuto !== null) setAutoMode(savedAuto === "true");
  }, []);

  const updateDemoMode = (val: boolean) => {
    setDemoMode(val);
    localStorage.setItem("demoMode", String(val));
    // Clear auto mode if disabling demo mode for consistency
    if (!val) {
        setAutoMode(false);
        localStorage.setItem("autoMode", "false");
    }
  };

  const updateAutoMode = (val: boolean) => {
    setAutoMode(val);
    localStorage.setItem("autoMode", String(val));
  };

  return (
    <UIContext.Provider
      value={{
        isDemoMode,
        setDemoMode: updateDemoMode,
        isAutoMode,
        setAutoMode: updateAutoMode,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUIState() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUIState must be used within a UIProvider");
  }
  return context;
}
