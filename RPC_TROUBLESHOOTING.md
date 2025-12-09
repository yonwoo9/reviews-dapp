# RPC 连接问题排查指南

如果遇到 `HeadersTimeoutError` 或 RPC 连接超时问题，请按照以下步骤排查：

## 🔧 快速解决方案

### 方案 1: 使用 PublicNode（免费，无需注册）

在 `.env` 文件中设置：

```env
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
```

### 方案 2: 使用 Alchemy（推荐，更稳定）

1. 访问 [Alchemy](https://www.alchemy.com/) 注册账号
2. 创建新应用，选择 Sepolia 网络
3. 复制 API Key
4. 在 `.env` 文件中设置：

```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
```

### 方案 3: 使用 Infura

1. 访问 [Infura](https://www.infura.io/) 注册账号
2. 创建新项目，选择 Sepolia 网络
3. 复制 Project ID
4. 在 `.env` 文件中设置：

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
```

## 📋 可用的 Sepolia RPC 节点

### 免费公共节点（无需 API Key）

```env
# PublicNode
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com

# Tenderly
SEPOLIA_RPC_URL=https://sepolia.gateway.tenderly.co

# 1RPC
SEPOLIA_RPC_URL=https://1rpc.io/sepolia

# Ankr
SEPOLIA_RPC_URL=https://rpc.ankr.com/eth_sepolia
```

### 需要注册的节点（更稳定）

```env
# Alchemy
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY

# Infura
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID

# QuickNode
SEPOLIA_RPC_URL=https://YOUR_ENDPOINT.quiknode.pro/YOUR_API_KEY/
```

## 🔍 测试 RPC 连接

可以使用以下命令测试 RPC 是否可用：

```bash
# 使用 curl 测试
curl -X POST https://ethereum-sepolia-rpc.publicnode.com \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

如果返回区块号，说明 RPC 可用。

## ⚙️ 增加超时时间

如果网络较慢，可以在 `hardhat.config.ts` 中增加超时时间：

```typescript
sepolia: {
  url: process.env.SEPOLIA_RPC_URL || '...',
  accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  chainId: 11155111,
  timeout: 180000, // 增加到 180 秒
},
```

## 🚨 常见错误

### HeadersTimeoutError

**原因**: RPC 节点响应超时

**解决**: 
- 更换 RPC 节点
- 使用 Alchemy 或 Infura 等付费服务
- 检查网络连接

### ECONNREFUSED

**原因**: 无法连接到 RPC 节点

**解决**:
- 检查 RPC URL 是否正确
- 检查防火墙设置
- 尝试其他 RPC 节点

### Invalid API Key

**原因**: API Key 无效或过期

**解决**:
- 重新生成 API Key
- 检查 API Key 是否正确复制到 `.env` 文件

## 📚 获取免费 API Key

### Alchemy
1. 访问 https://www.alchemy.com/
2. 注册账号（免费）
3. 创建应用
4. 复制 API Key

### Infura
1. 访问 https://www.infura.io/
2. 注册账号（免费）
3. 创建项目
4. 复制 Project ID

## 💡 最佳实践

1. **开发环境**: 使用 PublicNode 或 Ankr 等免费公共节点
2. **生产环境**: 使用 Alchemy 或 Infura 等付费服务，更稳定可靠
3. **备用方案**: 在 `.env` 中准备多个 RPC URL，一个失败时快速切换

## 🔗 相关链接

- [Alchemy Dashboard](https://dashboard.alchemy.com/)
- [Infura Dashboard](https://infura.io/dashboard)
- [PublicNode](https://publicnode.com/)
- [Sepolia Faucet](https://sepoliafaucet.com/)

