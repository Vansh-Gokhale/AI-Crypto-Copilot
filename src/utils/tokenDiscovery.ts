/**
 * Token Discovery Utility
 * Helps fetch and cache token metadata from blockchain
 * and CoinGecko API for dynamic token discovery
 */

export interface TokenMetadata {
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
  coingeckoId: string | null;
}

const tokenMetadataCache: Map<string, TokenMetadata> = new Map();

/**
 * Try to fetch token metadata from CoinGecko
 * Uses token address to search
 */
export async function fetchTokenMetadataFromCoinGecko(
  address: string,
  symbol: string
): Promise<TokenMetadata | null> {
  try {
    // Try to search by symbol first
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${symbol}`
    );

    if (!response.ok) return null;

    const data = await response.json();

    if (data.coins && data.coins.length > 0) {
      const coin = data.coins[0];
      return {
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        decimals: 18, // Default, will be overridden
        icon: coin.symbol.charAt(0).toUpperCase(),
        coingeckoId: coin.id,
      };
    }
  } catch (error) {
    console.warn(`Failed to fetch metadata for ${symbol}:`, error);
  }

  return null;
}

/**
 * Get icon for a token symbol
 */
export function getTokenIcon(symbol: string): string {
  const iconMap: Record<string, string> = {
    ETH: "Ξ",
    WETH: "Ξ",
    BTC: "₿",
    WBTC: "₿",
    USDC: "$",
    USDT: "₮",
    DAI: "◈",
    LINK: "⬡",
    UNI: "◉",
    AAVE: "▲",
    CURVE: "◆",
    stETH: "⟠",
    cbETH: "⟠",
    SNX: "Σ",
    OP: "O",
    ARB: "A",
    APE: "🐵",
    SUSHI: "🍣",
    SHIB: "🐕",
    MKR: "M",
  };

  return iconMap[symbol.toUpperCase()] || symbol.charAt(0).toUpperCase();
}

/**
 * Get CoinGecko ID for a token symbol
 */
export function getCoinGeckoId(symbol: string): string | null {
  const coingeckoMap: Record<string, string> = {
    ETH: "ethereum",
    WETH: "ethereum",
    BTC: "bitcoin",
    WBTC: "wrapped-bitcoin",
    USDC: "usd-coin",
    USDT: "tether",
    DAI: "dai",
    LINK: "chainlink",
    UNI: "uniswap",
    AAVE: "aave",
    CURVE: "curve-dao-token",
    CRV: "curve-dao-token",
    stETH: "staked-ether",
    cbETH: "coinbase-wrapped-staked-eth",
    SNX: "synthetix-network-token",
    OP: "optimism",
    ARB: "arbitrum",
    APE: "apecoin",
    SUSHI: "sushi",
    SHIB: "shiba-inu",
    MKR: "maker",
    BAL: "balancer",
    COMP: "compound-governance-token",
    YFI: "yearn-finance",
    LDO: "lido-dao",
  };

  return coingeckoMap[symbol.toUpperCase()] || null;
}

/**
 * Cache token metadata
 */
export function cacheTokenMetadata(
  address: string,
  metadata: TokenMetadata
): void {
  tokenMetadataCache.set(address.toLowerCase(), metadata);
}

/**
 * Get cached token metadata
 */
export function getCachedTokenMetadata(
  address: string
): TokenMetadata | null {
  return tokenMetadataCache.get(address.toLowerCase()) || null;
}

/**
 * Clear the metadata cache
 */
export function clearMetadataCache(): void {
  tokenMetadataCache.clear();
}
