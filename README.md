# MetaFlux: Decentralized Expense Management Platform

![MetaFlux Logo](https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo4.png)

## Overview

MetaFlux is a decentralized expense management platform built on Linea Network that allows users to track expenses, set budgets, delegate spending, and earn rewards—all while leveraging the security and transparency of blockchain technology.

## Features

### 📊 Expense Tracking
- Automatically categorize and track all your crypto transactions
- View detailed transaction history with blockchain verification
- Export transaction data in CSV format

### 🎯 Budget Control
- Set daily, weekly, or monthly spending limits
- Receive alerts when approaching budget thresholds
- Visual progress tracking for budget adherence

### 👥 Delegation
- Assign spending limits to team members or employees
- Approve/reject spending requests
- Monitor delegated accounts in real-time

### 🎁 Rewards System
- Earn NFT badges for achieving financial milestones
- Get cashback rewards for responsible spending
- Track progress toward next reward unlock

## Tech Stack

- **Frontend**: React.js with Next.js, Tailwind CSS, Framer Motion
- **Blockchain**: Metamask integration, Linea Network
- **Authentication**: Verax (Proof of Humanity)
- **Data Visualization**: Recharts
- **Storage**: MongoDB/IPFS for off-chain data

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/metaflux.git

# Navigate to the project directory
cd metaflux

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_LINEA_RPC_URL=your_linea_rpc_url
NEXT_PUBLIC_VERAX_API_KEY=your_verax_api_key
```

## Wallet Configuration

MetaFlux integrates with Metamask for wallet connection and transaction signing. The following networks are supported:

- Linea Mainnet
- Linea Sepolia (Testnet)
- Ethereum Mainnet
- Sepolia (Testnet)

## Project Structure

```
metaflux/
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── BudgetControl/ # Budget management components
│   │   ├── Rewards/       # Rewards-related components
│   │   ├── Transactions/  # Transaction components
│   │   └── providers/     # Context providers
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Application pages
│   ├── styles/            # CSS styles
│   └── utils/             # Utility functions
├── .env.local             # Environment variables
├── next.config.js         # Next.js configuration
└── tailwind.config.js     # Tailwind CSS configuration
```

## Key Components

### Wallet Integration

The application uses Wagmi and React-Query for seamless Metamask wallet integration:

```javascript
// Connect to wallet
const { address, isConnected, connect, disconnect } = useWallet();

// Format address for display
const formattedAddress = formatAddress(address); // 0x71C...1F3d
```

### Budget Control

Manage budgets, set limits, and track spending:

```jsx
<BudgetSummary activeTab={activeTab} />
<BudgetCategoryList activeTab={activeTab} onEditLimit={handleEditLimit} />
<BudgetAlertSettings />
```

### Transactions

View and categorize your transaction history:

```jsx
<TransactionTable 
  filters={filters}
  onViewTransaction={handleViewTransaction}
  onUpdateCategory={handleUpdateCategory}
/>
```

### Rewards

Earn and track rewards for responsible financial management:

```jsx
<RewardsNFTCollection onViewNFT={handleViewReward} />
<RewardsCashbackHistory onClaimCashback={handleClaimReward} />
<RewardsProgressTracker activeTab={activeTab} />
```

## User Flows

1. **New User Onboarding**
   - Connect Metamask wallet
   - Create profile and verify identity (optional)
   - Set up initial budget categories

2. **Budget Management**
   - Create spending limits
   - Receive alerts when approaching thresholds
   - Adjust budget allocations based on spending patterns

3. **Transaction Tracking**
   - View transaction history
   - Categorize and tag transactions
   - Export reports for accounting

4. **Delegation (Business Users)**
   - Add team members as delegates
   - Set spending limits for each delegate
   - Approve or reject spending requests

5. **Rewards**
   - Track progress toward financial goals
   - Earn NFT badges for achievements
   - Claim cashback rewards

## Mobile Responsiveness

MetaFlux is designed to be fully responsive across all devices:

- Fluid layouts that adapt to screen sizes
- Touch-friendly interface elements
- Optimized data visualization for small screens

## Security Features

- Multi-signature authentication for large transactions
- Verax identity verification for team members
- Transparent on-chain records for audits
- Controlled delegation limits with expiration dates

## Future Development

- AI-powered financial insights and predictions
- Multi-chain support beyond Linea
- Fiat on/off-ramp for direct stablecoin conversion
- Enhanced mobile apps for iOS and Android

## Contributing

We welcome contributions to MetaFlux! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please reach out to team@metaflux.finance

---

Built with ❤️ by the MetaFlux Team
