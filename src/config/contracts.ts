// Aave V3 Pool - Sepolia Testnet
export const AAVE_POOL_ADDRESS = "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951" as const;

// USDC - Sepolia Testnet (Aave faucet USDC)
export const USDC_ADDRESS = "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8" as const;

// Aave Pool ABI - only the supply function we need
export const AAVE_POOL_ABI = [
  {
    inputs: [
      { name: "asset", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "onBehalfOf", type: "address" },
      { name: "referralCode", type: "uint16" },
    ],
    name: "supply",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

// ERC20 ABI - approve function
export const ERC20_ABI = [
  {
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

// Known tokens on Sepolia for portfolio display
export const KNOWN_TOKENS = [
  {
    address: USDC_ADDRESS,
    symbol: "USDC",
    decimals: 6,
    icon: "💵",
    coingeckoId: "usd-coin",
  },
  {
    address: "0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c" as const,
    symbol: "WETH",
    decimals: 18,
    icon: "⟠",
    coingeckoId: "ethereum",
  },
  {
    address: "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357" as const,
    symbol: "DAI",
    decimals: 18,
    icon: "◈",
    coingeckoId: "dai",
  },
  {
    address: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0" as const,
    symbol: "USDT",
    decimals: 6,
    icon: "₮",
    coingeckoId: "tether",
  },
] as const;
