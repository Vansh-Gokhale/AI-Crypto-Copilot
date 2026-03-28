"use client";

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/config/wagmi";
import "@rainbow-me/rainbowkit/styles.css";

import { UIProvider } from "@/hooks/useUIState";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <UIProvider>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: "#D4AF37",
              accentColorForeground: "#0A0A0A",
              borderRadius: "small",
              fontStack: "system",
              overlayBlur: "small",
            })}
          >
            {children}
          </RainbowKitProvider>
        </UIProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
