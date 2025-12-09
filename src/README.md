# 评论世界 DApp - Web3去中心化评论平台

一个基于区块链的去中心化评论平台，用户可以评论电影、音乐、书籍、游戏等任何内容。

## 主要功能

- 🔗 **钱包连接**: 支持 MetaMask 等 Web3 钱包
- ⛓️ **区块链存储**: 所有评论永久存储在区块链上
- 💎 **Gas费用**: 发布评论需支付少量 ETH (默认 0.001 ETH)
- 🎨 **多分类支持**: 电影、音乐、书籍、游戏、其他
- ⭐ **五星评分系统**: 为每个评论对象打分
- 🎯 **分类筛选**: 快速找到感兴趣的评论

## 部署智能合约

在使用 DApp 之前，你需要先部署智能合约：

### 1. 安装 Hardhat

```bash
npm install --save-dev hardhat
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

### 2. 初始化 Hardhat 项目

```bash
npx hardhat init
```

### 3. 部署到测试网

合约文件位于 `/contracts/ReviewContract.sol`

部署脚本示例：

```javascript
// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const ReviewContract = await hre.ethers.getContractFactory("ReviewContract");
  const contract = await ReviewContract.deploy();
  await contract.deployed();
  
  console.log("ReviewContract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

部署到 Sepolia 测试网：

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 4. 更新合约地址

部署成功后，将合约地址更新到 `/utils/web3.ts` 文件中：

```typescript
export const CONTRACT_ADDRESS = '你的合约地址';
```

## 使用说明

1. **安装 MetaMask**: 确保浏览器已安装 MetaMask 钱包扩展
2. **连接钱包**: 点击右上角"连接钱包"按钮
3. **获取测试币**: 在测试网水龙头获取测试 ETH
   - Sepolia: https://sepoliafaucet.com/
4. **发布评论**: 
   - 点击"发布评论"按钮
   - 填写标题、分类、评分、内容和昵称
   - 确认交易并支付 Gas 费用
5. **查看评论**: 所有评论将从区块链加载并显示

## 技术栈

- **前端**: React + TypeScript + Tailwind CSS
- **Web3**: ethers.js
- **智能合约**: Solidity
- **图标**: lucide-react

## 网络配置

默认使用 Sepolia 测试网，你也可以部署到：
- Ethereum 主网
- Polygon
- BSC
- Arbitrum
- 其他 EVM 兼容链

## 注意事项

⚠️ **重要提示**:
- 这是一个演示项目，请勿在主网上使用未经审计的智能合约
- 发布评论需要支付 Gas 费用
- 区块链上的数据是公开的且不可删除
- 确保钱包中有足够的测试币

## Gas 费用说明

- 默认发布费用: 0.001 ETH
- 实际 Gas 费用取决于网络拥堵情况
- 合约所有者可以调整发布费用

## 开发

启动开发服务器：

```bash
npm run dev
```

## License

MIT
