
  # Dapp 评论网站设计

这是一个基于区块链的去中心化评论平台 DApp，用户可以评论电影、音乐、书籍、游戏等任何内容。

![](page.png)

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:3000 启动。

## 📦 项目结构

```
reviews-dapp/
├── src/
│   ├── components/      # React 组件
│   │   ├── ui/          # 基础 UI 组件（Radix UI 封装）
│   │   ├── Header.tsx   # 页面头部（钱包连接、语言切换）
│   │   ├── SearchBar.tsx # 搜索栏组件
│   │   ├── ReviewList.tsx # 评论列表
│   │   ├── ReviewCard.tsx # 评论卡片
│   │   ├── Leaderboard.tsx # 排行榜
│   │   ├── AddReviewForm.tsx # 添加评论表单
│   │   └── ...
│   ├── contracts/       # Solidity 智能合约
│   ├── contexts/        # React Context（语言设置等）
│   ├── hooks/           # 自定义 React Hooks
│   │   ├── usePostReview.ts # 发布评论 Hook
│   │   └── useSearchReviews.ts # 搜索评论 Hook
│   ├── config/          # 配置文件（Wagmi 配置等）
│   ├── utils/           # 工具函数
│   │   ├── web3.ts      # Web3 工具函数
│   │   └── i18n.ts      # 国际化配置
│   └── ...
├── scripts/             # 部署脚本
│   ├── deploy.ts        # 合约部署脚本
│   └── test-rpc.ts      # RPC 连接测试脚本
├── hardhat.config.ts    # Hardhat 配置
└── package.json
```

## 🔗 部署智能合约

在正式使用 DApp 之前，需要先部署智能合约到区块链网络。

### 快速部署步骤

1. **安装部署依赖**
   ```bash
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv
   ```

2. **配置环境变量**
   ```bash
   cp env.example .env
   # 编辑 .env 文件，填入你的私钥和 RPC URL
   ```

3. **编译合约**
   ```bash
   npm run compile
   ```

4. **部署到测试网（推荐 Sepolia）**
   ```bash
   npm run deploy:sepolia
   ```

5. **更新合约地址**
   
   部署成功后，将合约地址更新到 `src/utils/web3.ts`:
   ```typescript
   export const CONTRACT_ADDRESS = '你的合约地址';
   ```

### 详细部署指南

查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取完整的部署说明，包括：
- 详细的初始化步骤
- 不同网络的部署方法
- 常见问题解决方案
- 安全注意事项

## 🎯 主要功能

- 🔗 **钱包连接**: 使用 RainbowKit 支持多种 Web3 钱包（MetaMask、Coinbase Wallet、WalletConnect 等）
- 💰 **余额显示**: 实时显示钱包余额和网络信息
- ⛓️ **区块链存储**: 所有评论永久存储在区块链上
- 💎 **Gas费用**: 发布评论需支付少量 ETH (默认 0.001 ETH)
- 🎨 **多分类支持**: 电影、音乐、书籍、游戏、其他
- ⭐ **五星评分系统**: 为每个评论对象打分
- 🎯 **分类筛选**: 快速找到感兴趣的评论
- 🔍 **智能搜索**: 支持按分类和标题搜索评论，支持模糊匹配
- 🚫 **防重复评论**: 同一用户不能对同一分类下的同一作品重复评论
- 📊 **排行榜**: 综合评分排行榜，展示最受欢迎的评论
- 🌐 **多语言支持**: 支持中文、英文、日文、韩文、西班牙文、法文、德文
- 📄 **分页显示**: 评论列表支持分页浏览

## 🛠️ 技术栈

- **前端框架**: React 19 + TypeScript + Vite
- **样式**: Tailwind CSS
- **UI 组件**: Radix UI
- **Web3 集成**: 
  - Wagmi (React Hooks for Ethereum)
  - Viem (以太坊工具库)
  - RainbowKit (钱包连接 UI)
  - ethers.js (智能合约交互)
- **状态管理**: React Hooks + TanStack Query
- **智能合约**: Solidity 0.8.20
- **部署工具**: Hardhat
- **网络支持**: Ethereum、Polygon、BSC 等 EVM 兼容链

## 📝 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run compile` - 编译智能合约
- `npm run deploy:local` - 部署到本地 Hardhat 网络
- `npm run deploy:sepolia` - 部署到 Sepolia 测试网
- `npm run deploy:goerli` - 部署到 Goerli 测试网
- `npm run deploy:mumbai` - 部署到 Polygon Mumbai 测试网
- `npm run deploy:bsc-testnet` - 部署到 BSC 测试网
- `npm run deploy:mainnet` - 部署到 Ethereum 主网（⚠️ 谨慎使用）

## ⚠️ 重要提示

1. **测试模式**: 如果合约地址未设置（`CONTRACT_ADDRESS = null`），应用将运行在演示模式
2. **测试币**: 部署到测试网需要先获取测试币（从测试网水龙头）
3. **私钥安全**: 永远不要将 `.env` 文件提交到 Git
4. **合约审计**: 主网部署前建议进行安全审计
5. **网络配置**: 确保钱包连接到正确的网络（Sepolia 测试网或主网）

## ✨ 最新更新

### v1.0.0
- ✅ 集成 RainbowKit，支持多种钱包连接
- ✅ 添加搜索功能，支持按分类和标题搜索评论
- ✅ 实现防重复评论机制
- ✅ 优化 UI 布局和响应式设计
- ✅ 完善多语言支持（7 种语言）
- ✅ 改进下拉框组件，优化用户体验
- ✅ 代码优化，移除未使用的组件和函数

## 📚 相关文档

- [部署指南](./DEPLOYMENT.md) - 详细的部署说明
- [智能合约源码](./src/contracts/ReviewContract.sol) - Solidity 合约代码
- [Web3 工具](./src/utils/web3.ts) - 区块链交互工具

## 🔒 安全注意事项

- 这是一个演示项目，请勿在主网上使用未经审计的智能合约
- 发布评论需要支付 Gas 费用
- 区块链上的数据是公开的且不可删除
- 确保钱包中有足够的测试币

## 📄 License

MIT
  