# 🏆 AUREUM ELITE — AI Crypto Copilot

<div align="center">

![Ethereum](https://img.shields.io/badge/Ethereum-000?logo=ethereum&logoColor=fff)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![Wagmi](https://img.shields.io/badge/wagmi-v2-blue?logo=ethereum)
![Gemini AI](https://img.shields.io/badge/Gemini-2.0%20Flash-purple?logo=google)
![Aave V3](https://img.shields.io/badge/Aave%20V3-Sepolia-9cf)
![RainbowKit](https://img.shields.io/badge/RainbowKit-v2-ff6b6b)

**Institutional-grade DeFi portfolio intelligence powered by AI**

Real-time analytics · AI strategy generation · One-click protocol execution · Multi-chain support

[Live Demo](#) · [GitHub](#) · [Documentation](#) · [Smart Contracts](#smart-contracts)

</div>

---

## 📋 Table of Contents

- [What is Aureum Elite?](#what-is-aureum-elite)
- [Unique Selling Points (USPs)](#unique-selling-points-usps)
- [How It Works](#how-it-works)
- [Project Architecture](#project-architecture)
- [Key Features](#key-features)
- [Advantages Over Existing Systems](#advantages-over-existing-systems)
- [Smart Contracts](#smart-contracts)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Technology Stack](#technology-stack)
- [Supported Networks](#supported-networks)
- [Supported Cryptocurrencies](#supported-cryptocurrencies)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 What is Aureum Elite?

**Aureum Elite** is a luxury-grade DeFi portfolio analyzer that bridges the gap between raw blockchain data and actionable financial intelligence. It's designed for both crypto-native users and institutional investors who want AI-powered insights without the complexity.

### The Problem It Solves

Traditional DeFi dashboards are:
- ❌ Fragmented across multiple apps
- ❌ Lack intelligent analysis
- ❌ Require manual protocol research
- ❌ Don't work well on mobile
- ❌ Limited to single chains
- ❌ Generic and unintuitive

### The Solution

Aureum Elite provides:
- ✅ **Unified Portfolio View** - See all your crypto across chains instantly
- ✅ **AI Strategy Engine** - Get personalized DeFi recommendations from Gemini AI
- ✅ **One-Click Execution** - Supply to Aave, claim yields, swap tokens in one tap
- ✅ **Risk Intelligence** - Real-time portfolio risk scoring
- ✅ **Mobile-First Design** - QR code login for seamless mobile experience
- ✅ **Multi-Chain Support** - Ethereum Mainnet, Sepolia, and more
- ✅ **Luxury UI/UX** - Gold and black design system with cinematic animations

---

## 💎 Unique Selling Points (USPs)

| Feature | Aureum Elite | Typical DeFi Dashboard | Advantage |
|---------|-------------|----------------------|-----------|
| **AI Strategy Engine** | ✅ Gemini 2.0 Flash | ❌ Manual research | Automated, personalized recommendations |
| **One-Click Aave Deposit** | ✅ Full approval + supply flow | ❌ Navigate to app.aave.com | Save 3-5 clicks, reduce errors |
| **Risk Scoring** | ✅ Weighted portfolio model | ❌ None | Data-driven risk assessment |
| **Luxury UI/UX** | ✅ Gold & black design system | ❌ Generic dashboards | Premium user experience |
| **Multi-Chain Auto-Detection** | ✅ Mainnet + Sepolia + future chains | ❌ Single chain | Seamless chain switching |
| **QR Mobile Login** | ✅ MetaMask/Phantom/Core/Trust | ❌ Desktop only | Mobile-native web3 experience |
| **Live Token Discovery** | ✅ Shows every token in wallet | ❌ Pre-defined token lists | Complete portfolio visibility |
| **Real CoinGecko Pricing** | ✅ Live API, no key required | ✅ Varies by platform | Transparent, decentralized pricing |
| **Portfolio Allocation Charts** | ✅ Real-time donut charts | ⚠️ Sometimes available | Beautiful data visualization |
| **24h Change Tracking** | ✅ Per-token & portfolio | ⚠️ Sometimes available | Performance monitoring |

---

## 🚀 How It Works

### Step-by-Step User Journey

```
1. CONNECT WALLET
   └─→ Click "Connect Wallet"
   └─→ Choose wallet (MetaMask, Phantom, Core, Trust, etc.)
   └─→ Scan QR code on mobile OR authorize on desktop
   └─→ Grant signature (no transaction costs)

2. PORTFOLIO ANALYSIS
   └─→ App fetches all token balances from connected wallet
   └─→ Queries CoinGecko API for real-time prices
   └─→ Calculates USD value, allocation %, 24h change
   └─→ Scores portfolio risk using weighted model

3. AI STRATEGY GENERATION
   └─→ Portfolio data → Sent to Gemini 2.0 Flash
   └─→ AI analyzes risk, yield opportunities, market conditions
   └─→ Generates 1-3 ranked strategy recommendations
   └─→ Strategies include: protocol, amount, expected yield, risk level

4. ONE-CLICK EXECUTION
   └─→ User selects top strategy
   └─→ App handles: token approval → amount calculation → Aave supply
   └─→ Transaction signed & broadcasted
   └─→ Portfolio updates in real-time

5. CONTINUOUS MONITORING
   └─→ Real-time balance updates
   └─→ 24h performance tracking
   └─→ Yield accrual visualization
   └─→ New strategy recommendations every refresh
```

## 📞 Support

- **Documentation**: [Docs site](#)
- **Discord**: [Join community](#)
- **Twitter**: [@aureumElite](#)
- **Email**: support@aureum-elite.com

---

<div align="center">

**Made with 💎 by Aureum Elite Team**

Empowering DeFi through AI intelligence.

</div>


---

## 🏗️ Project Architecture

### Directory Structure

```
v1/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main landing page
│   │   ├── layout.tsx            # Root layout with metadata
│   │   ├── providers.tsx         # Wagmi + RainbowKit providers
│   │   └── globals.css           # Global styles (Tailwind)
│   │
│   ├── components/
│   │   ├── Header.tsx            # Navigation + wallet connect
│   │   ├── PortfolioSummary.tsx  # Total USD value + changes
│   │   ├── AssetTable.tsx        # Token list with balances
│   │   ├── AllocationChart.tsx   # Donut chart visualization
│   │   ├── RiskGauge.tsx         # Risk score gauge
│   │   ├── StrategyCard.tsx      # AI strategy recommendations
│   │   ├── AICopilot.tsx         # Gemini AI integration
│   │   └── Sidebar.tsx           # Navigation sidebar
│   │
│   ├── hooks/
│   │   ├── usePortfolio.ts       # Fetch + calculate portfolio data
│   │   ├── useAIStrategy.ts      # Call Gemini for recommendations
│   │   └── useAaveDeposit.ts     # Handle Aave supply transactions
│   │
│   ├── config/
│   │   ├── contracts.ts          # Token addresses + ABIs
│   │   └── wagmi.ts              # Wagmi config + chain setup
│   │
│   └── utils/
│       ├── riskScorer.ts         # Risk calculation engine
│       ├── tokenDiscovery.ts     # Token metadata caching
│       └── dummyData.ts          # Mock data for testing
│
├── public/                        # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.ts
└── README.md
```

### Component Architecture Detailed

The application follows a hierarchical component structure:

**Top Level - RootLayout:**
- Initializes Wagmi, RainbowKit, and Query Client
- Sets up theme and global styles
- Provides context to all child components

**Second Level - Page Components:**
- Header: Displays user info, wallet connection button
- Sidebar: Navigation menu and settings
- Main Content Area: All portfolio and strategy views

**Third Level - Feature Components:**
- PortfolioSummary: Displays total value and daily changes
- AssetTable: Shows individual token holdings
- AllocationChart: Visualizes portfolio allocation
- RiskGauge: Displays risk scoring
- AICopilot: AI interaction panel
- StrategyCard: Individual strategy recommendations

---

## 🎨 Key Features Deep Dive

### 1. Universal Portfolio Visibility

The app supports all ERC20 tokens and native ETH:
- **Automatic Discovery**: Wallet connection triggers token detection
- **Real-Time Updates**: Refreshes every 30 seconds
- **Multicall Efficiency**: Batches contract calls to reduce RPC load
- **Fallback Handling**: Shows cached data while fetching

Token detection uses multiple strategies:
1. Known token list (30+ verified tokens)
2. Wallet event scanning (future)
3. User input validation (future)

### 2. AI-Powered Strategy Engine

Integrates Google Gemini 2.0 Flash for intelligent analysis:

**Input Data**:
- Portfolio composition (tokens and amounts)
- Historical prices and volatility
- Market conditions and trends
- User risk tolerance

**Output Strategies**:
- Protocol recommendation (e.g., Aave V3, Compound)
- Action description (Supply, Borrow, Swap)
- Amount optimization (% of portfolio)
- Expected APY estimation
- Risk level assessment
- Reasoning explanation

**AI Prompt Structure**:
```
Analyze this portfolio:
- Total Value: $50,000 USD
- Tokens: [USDC, ETH, DAI]
- Risk Score: 35/100 (Safe)

Recommend 3 strategies for yield farming:
1. Best ROI opportunity
2. Balanced approach
3. Conservative option

Format: JSON with protocol, amount, apy, risk, reasoning
```

### 3. One-Click Protocol Execution

Streamlines DeFi interactions to single button:

**For Aave V3 Supply**:
1. User selects strategy
2. App checks token allowance
3. If needed: Shows approval transaction
4. User signs approval (if first time)
5. App executes supply transaction
6. Portfolio updates in real-time

**Gas Optimization**:
- Uses EIP-1559 for priority gas estimation
- Batches operations when possible
- Provides gas cost estimates upfront

### 4. Advanced Risk Scoring

Multi-factor risk assessment:

**Concentration Risk (40% weight)**:
- Calculates % of portfolio in single token
- Penalizes heavy concentration
- Formula: 1 - (1 / sqrt(number_of_tokens) * concentration_ratio)

**Volatility Risk (35% weight)**:
- Uses 30-day historical volatility from CoinGecko
- Averages across all tokens in portfolio
- Weighted by allocation percentage

**Liquidity Risk (15% weight)**:
- Considers market cap of holdings
- Smaller cap = higher risk
- Ensures ability to exit positions

**Diversification Bonus (10% weight)**:
- Rewards stablecoin holdings
- Encourages healthy portfolio mix
- Reduces overall portfolio volatility

**Final Score Calculation**:
```
risk_score = (
    concentration_risk * 0.40 +
    volatility_risk * 0.35 +
    liquidity_risk * 0.15 -
    (stablecoin_percentage * 0.10)
) * 100

Color Mapping:
- 0-30: Green (Safe)
- 30-60: Yellow (Moderate)
- 60-100: Red (High)
```

### 5. Real-Time Pricing Integration

CoinGecko API provides market data:

**Data Points**:
- Current USD price
- 24h price change percentage
- 7d price change
- Market capitalization
- Trading volume
- All-time high/low

**Update Frequency**:
- Automatic refresh every 30 seconds
- Manual refresh via button
- Background sync when tab inactive

**Fallback System**:
- Caches last known prices locally
- Uses dummy prices if API unavailable
- Alerts user to stale data

### 6. Mobile-First QR Code Login

WalletConnect v2 enables seamless mobile:

**Desktop Flow**:
1. Click "Connect Wallet"
2. Select wallet from list
3. Approve in wallet popup
4. Connected instantly

**Mobile Flow**:
1. Click "Connect Wallet"
2. Tap "Mobile/QR" option
3. Scan QR with mobile wallet app
4. Confirm connection
5. Wallet opens app (deep link)
6. Return to web app, auto-connected

**Wallets Supported**:
- MetaMask
- Phantom (Solana/EVM)
- Core (formerly Avalanche wallet)
- Trust Wallet
- Rainbow
- Coinbase Wallet
- Ledger Live
- Argent
- All WalletConnect v2 compatible wallets (200+)

### 7. Multi-Chain Architecture

Ready for expansion to 11+ networks:

