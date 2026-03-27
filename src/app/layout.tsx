import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI Crypto Copilot — DeFi Portfolio Analyzer",
  description:
    "Connect your wallet, analyze your portfolio with AI, and execute DeFi strategies in one click.",
  keywords: ["DeFi", "crypto", "AI", "portfolio", "Aave", "wallet"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
