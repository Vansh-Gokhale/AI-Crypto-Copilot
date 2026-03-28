import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aureum Elite — AI Crypto Copilot",
  description:
    "Premium AI-powered DeFi portfolio analyzer. Connect your wallet, analyze with AI, and execute strategies in one click.",
  keywords: ["DeFi", "crypto", "AI", "portfolio", "Aave", "wallet", "Aureum"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
