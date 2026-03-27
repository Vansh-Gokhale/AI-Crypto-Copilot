import { getDefaultConfig, type Wallet } from "@rainbow-me/rainbowkit";
import { walletConnectWallet, rainbowWallet, coinbaseWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { sepolia, mainnet } from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694";

const metaMaskMobileQRWallet = (): Wallet => {
  const baseWallet = walletConnectWallet({ projectId });
  return {
    ...baseWallet,
    id: "metamask-mobile-qr",
    name: "MetaMask (QR)",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
    iconBackground: "#fff",
  };
};

export const config = getDefaultConfig({
  appName: "AI Crypto Copilot",
  projectId,
  chains: [sepolia, mainnet],
  ssr: true,
  wallets: [
    {
      groupName: "Popular",
      wallets: [
        metaMaskWallet,
        metaMaskMobileQRWallet,
        walletConnectWallet,
        rainbowWallet,
        coinbaseWallet,
      ],
    },
  ],
});
