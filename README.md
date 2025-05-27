# 🏠 ToKasa - Tokenized Real Estate Platform

<h4 align="center">
  <a href="https://tokasa-five.vercel.app/">Live Demo</a> |
  <a href="./SCAFFOLD-STARK-README.md">Scaffold-Stark Documentation</a>
</h4>

🏡 **ToKasa** is an innovative tokenized real estate platform built on the Starknet blockchain. It allows users to invest in real estate properties fractionally through tokens, democratizing access to real estate investments.

⚡ Built with **Scaffold-Stark**, using NextJS, Starknet.js, Cairo, and Starknet-React.

## 🌟 Key Features

- 🏘️ **Tokenized Properties**: Invest in real estate fractionally
- 💰 **Accessible Investment**: Low minimum investment amounts
- 🔒 **Blockchain Security**: Audited smart contracts on Starknet
- 📊 **Investment Dashboard**: Real-time portfolio tracking
- 🌍 **Global Properties**: Access to international real estate markets
- 💸 **Transparent Returns**: Automatic profit distribution

## 🚀 Live Demo

Visit our live application: **[https://tokasa-five.vercel.app/](https://tokasa-five.vercel.app/)**

## 🛠️ Technologies Used

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Blockchain**: Starknet, Cairo
- **Smart Contracts**: Starknet Foundry
- **Wallet Integration**: Starknet-React
- **Deployment**: Vercel

## 📋 Prerequisites

Before getting started, make sure you have installed:

- [Node.js (>= v18.17)](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Git](https://git-scm.com/downloads)

For smart contract development, you'll also need:
- [Scarb v2.11.4](https://docs.swmansion.com/scarb/)
- [Starknet Foundry v0.41.0](https://foundry-rs.github.io/starknet-foundry/)

> 💡 **Tip**: You can easily install all Starknet tools with [Starkup](https://github.com/software-mansion/starkup)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/tokasa.git
cd tokasa
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Configure Environment Variables

Copy the example files and configure your variables:

```bash
# For the frontend
cp packages/nextjs/.env.example packages/nextjs/.env.local

# For contracts
cp packages/snfoundry/.env.example packages/snfoundry/.env
```

### 4. Run in Local Development

```bash
# Terminal 1: Start local Starknet network
yarn chain

# Terminal 2: Deploy contracts
yarn deploy

# Terminal 3: Start frontend
yarn start
```

Visit `http://localhost:3000` to see the application.

## 🏗️ Project Structure

```
tokasa/
├── packages/
│   ├── nextjs/          # Next.js Frontend
│   │   ├── app/         # Pages and routes
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom hooks
│   │   └── lib/         # Utilities
│   └── snfoundry/       # Smart contracts
│       ├── contracts/   # Cairo contracts
│       └── scripts-ts/  # Deployment scripts
├── README.md
└── SCAFFOLD-STARK-README.md  # Scaffold-Stark documentation
```

## 🤝 Contributing to the Project

We love receiving contributions! Here's how you can help:

### 🔧 For Developers

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a branch for your feature: `git checkout -b feature/new-functionality`
4. **Install** dependencies: `yarn install`
5. **Develop** your functionality
6. **Test** your changes: `yarn test`
7. **Commit** your changes: `git commit -m "feat: add new functionality"`
8. **Push** to your branch: `git push origin feature/new-functionality`
9. **Open** a Pull Request

### 📝 Code Conventions

- We use **TypeScript** for type safety
- **ESLint** and **Prettier** for consistent formatting
- **Conventional Commits** for clear commit messages
- **Tests** required for new functionalities

### 🧪 Running Tests

```bash
# Frontend tests
yarn test:nextjs

# Smart contract tests
yarn test

# Check code formatting
yarn format:check
```

### 🐛 Report Bugs

If you find a bug, please:

1. Check that it's not already reported in [Issues](https://github.com/tokasa-starknet/dApp/issues)
2. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce it
   - Expected vs actual behavior
   - Screenshots if relevant
   - Environment information (OS, browser, etc.)

### 💡 Suggest Features

To suggest new features:

1. Open an issue with the `enhancement` label
2. Clearly describe the proposed functionality
3. Explain why it would be useful for users
4. If possible, include mockups or examples

### 🎨 Design Contributions

- We follow **Material Design** guidelines and **Web3 UX patterns**
- We use **Tailwind CSS** for styling
- We prioritize **accessibility** and **responsive design**

### 📚 Documentation Contributions

- Improvements to README, code comments, or technical documentation
- Translations to other languages
- Tutorials and usage guides

## 🌐 Networks and Deployment

### Testnet (Sepolia)
- **Frontend**: [https://tokasa-five.vercel.app/](https://tokasa-five.vercel.app/)
- **Contracts**: Deployed on Starknet Sepolia

### Mainnet
- 🚧 Coming soon

## 📄 License

This project is under the MIT license. See [LICENSE](LICENSE) for more details.

## 🙏 Acknowledgments

- **[Scaffold-Stark](https://scaffoldstark.com/)** - Base framework for Starknet development
- **[Starknet](https://starknet.io/)** - Ethereum Layer 2 blockchain
- **Developer community** contributing to the ecosystem

## 📞 Contact

- **Website**: [https://tokasa-five.vercel.app/](https://tokasa-five.vercel.app/)
- **Twitter**: [@ToKasa_Official](https://twitter.com/tokasa_official)
- **OnlyDust**: 

---

**Have questions?** Don't hesitate to open an [issue](https://github.com/tokasa-starknet/dApp/issues) or contact us directly.

**Like the project?** Give it a ⭐ on GitHub! 