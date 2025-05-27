# 🤝 Contributing Guide - ToKasa

Thank you for your interest in contributing to ToKasa! This guide will help you get started and provide all the necessary information to make effective contributions.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How can I contribute?](#how-can-i-contribute)
- [Development Environment Setup](#development-environment-setup)
- [Development Process](#development-process)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## 📜 Code of Conduct

By participating in this project, you commit to maintaining a respectful and collaborative environment. Please:

- Use inclusive and respectful language
- Respect different viewpoints and experiences
- Accept constructive criticism professionally
- Focus on what is best for the community

## 🛠️ How can I contribute?

### 🐛 Reporting Bugs
- Search first in [existing Issues](https://github.com/your-username/tokasa/issues)
- Use the bug report template
- Include detailed steps to reproduce the problem

### 💡 Suggesting Features
- Review the project roadmap
- Open an issue with the `enhancement` label
- Clearly describe the use case and benefits

### 💻 Contributing Code
- Fix reported bugs
- Implement new features
- Improve documentation
- Optimize performance

### 🎨 Contributing to Design
- Improve UX/UI
- Create mockups for new features
- Optimize for accessibility

## 🔧 Development Environment Setup

### Prerequisites

```bash
# Required versions
node --version  # >= 18.17
yarn --version  # >= 1.22
scarb --version # 2.11.4
snforge --version # 0.41.0
```

### Installation

1. **Fork and clone the repository**
```bash
git clone https://github.com/your-username/tokasa.git
cd tokasa
```

2. **Install dependencies**
```bash
yarn install
```

3. **Start the development environment**
```bash
# Terminal 1: Local network
yarn chain

# Terminal 2: Deploy contracts
yarn deploy

# Terminal 3: Frontend
yarn start
```

### Project Structure

```
tokasa/
├── packages/
│   ├── nextjs/                 # Next.js Frontend
│   │   ├── app/               # App Router (Next.js 13+)
│   │   ├── components/        # React components
│   │   │   ├── tokasa/       # ToKasa-specific components
│   │   │   └── ui/           # Reusable UI components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utilities and configurations
│   │   ├── styles/           # Global styles
│   │   └── types/            # TypeScript type definitions
│   └── snfoundry/             # Smart contracts
│       ├── contracts/        # Cairo contracts
│       ├── scripts-ts/       # Deployment scripts
│       └── tests/            # Contract tests
```

## 🔄 Development Process

### 1. Create a Branch

```bash
# For new features
git checkout -b feature/feature-name

# For bug fixes
git checkout -b fix/bug-description

# For documentation
git checkout -b docs/change-description
```

### 2. Development

- Write code following our standards
- Add tests for new features
- Update documentation if necessary
- Test your changes locally

### 3. Commits

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Valid commit examples
git commit -m "feat: add fractional investment functionality"
git commit -m "fix: correct yield calculation"
git commit -m "docs: update installation guide"
git commit -m "style: improve dashboard design"
git commit -m "test: add tests for tokenization contracts"
```

**Commit types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting/style changes
- `refactor`: Code refactoring
- `test`: Add or modify tests
- `chore`: Maintenance tasks

## 📏 Code Standards

### Frontend (TypeScript/React)

```typescript
// ✅ Good
interface PropertyData {
  id: string;
  name: string;
  price: bigint;
  tokenSupply: number;
}

const PropertyCard: React.FC<{ property: PropertyData }> = ({ property }) => {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-semibold">{property.name}</h3>
      <p className="text-gray-600">${property.price.toString()}</p>
    </div>
  );
};
```

### Contracts (Cairo)

```cairo
// ✅ Good
#[starknet::contract]
mod PropertyToken {
    use starknet::ContractAddress;
    
    #[storage]
    struct Storage {
        totalSupply: u256,
        owner: ContractAddress,
    }
    
    #[external(v0)]
    fn mintTokens(ref self: ContractState, to: ContractAddress, amount: u256) {
        // Implementation
    }
}
```

### General Rules

- **Descriptive names**: Variables and functions should be clear
- **Comments**: Explain the "why", not the "what"
- **Small functions**: Maximum 20-30 lines per function
- **DRY**: Don't repeat code, create reusable functions
- **Type Safety**: Use strict TypeScript

### Quality Tools

```bash
# Check formatting
yarn format:check

# Auto-fix formatting
yarn format

# Linting
yarn next:lint

# Type checking
yarn next:check-types

# Tests
yarn test
yarn test:nextjs
```

## 🔍 Pull Request Process

### Before Submitting

1. **Update your branch**
```bash
git checkout main
git pull origin main
git checkout your-branch
git rebase main
```

2. **Run all tests**
```bash
yarn test
yarn test:nextjs
yarn format:check
yarn next:lint
```

3. **Verify everything works**
```bash
yarn build
```

### Creating the Pull Request

1. **Descriptive title**
   - `feat: add investment dashboard`
   - `fix: correct yield calculation in PropertyCard`

2. **Complete description**
```markdown
## Description
Brief description of the changes made.

## Type of change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation

## How has this been tested?
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing

## Checklist
- [ ] My code follows the project standards
- [ ] I have performed a self-review of my code
- [ ] I have added tests that prove my fix/feature
- [ ] I have updated documentation if necessary
```

### Review

- All PRs require at least 1 review
- Contract changes require 2 reviews
- Respond to comments constructively
- Make requested changes

## 🐛 Reporting Bugs

### Required Information

```markdown
**Bug Description**
Clear and concise description of the problem.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll to '...'
4. See error

**Expected Behavior**
Clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain the problem.

**Environment Information:**
- OS: [e.g. iOS, Windows, Linux]
- Browser: [e.g. Chrome, Safari]
- Version: [e.g. 22]
- Wallet: [e.g. ArgentX, Braavos]

**Additional Context**
Any other relevant information about the problem.
```

## 💡 Suggesting Features

### Template for New Features

```markdown
**Is your request related to a problem?**
Clear description of the problem. E.g. "I'm frustrated when [...]"

**Describe the solution you'd like**
Clear and concise description of what you want to happen.

**Describe alternatives you've considered**
Clear description of any alternative solutions or features.

**Additional context**
Any other context or screenshots about the request.

**User impact**
How would this benefit ToKasa users?
```

## 🏷️ Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for new contributors
- `help wanted` - Extra attention is needed
- `priority: high` - High priority
- `priority: low` - Low priority
- `frontend` - Related to frontend
- `contracts` - Related to smart contracts
- `design` - Related to UX/UI

## 🎯 Roadmap and Priorities

### Upcoming Features
1. **Staking System** - Allow token staking for governance
2. **Secondary Marketplace** - Buy/sell tokens between users
3. **Advanced Analytics** - Dashboard with detailed metrics
4. **Mobile App** - Native mobile application

### Areas Needing Help
- **Contract Tests** - Increase test coverage
- **Documentation** - Guides for users and developers
- **Optimization** - Improve frontend performance
- **Accessibility** - Make the app more accessible

## 📞 Contact

Have questions about contributing?

- **Issues**: [GitHub Issues](https://github.com/your-username/tokasa/issues)

---

Thank you for contributing to ToKasa! 🏠✨
