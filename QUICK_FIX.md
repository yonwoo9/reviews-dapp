# 快速修复 RPC 连接问题

## 🚀 立即解决方案

在 `.env` 文件中添加以下任一可用的 RPC URL：

### 选项 1: 1RPC（推荐，测试可用）
```env
SEPOLIA_RPC_URL=https://1rpc.io/sepolia
PRIVATE_KEY=你的私钥
```

### 选项 2: PublicNode
```env
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
PRIVATE_KEY=你的私钥
```

### 选项 3: Tenderly
```env
SEPOLIA_RPC_URL=https://sepolia.gateway.tenderly.co
PRIVATE_KEY=你的私钥
```

## 📝 操作步骤

1. 打开 `.env` 文件
2. 添加或修改 `SEPOLIA_RPC_URL` 为上述任一选项
3. 确保 `PRIVATE_KEY` 已设置
4. 保存文件
5. 重新运行部署：
   ```bash
   npm run deploy:sepolia
   ```

## 🔧 如果仍然失败

### 使用 Alchemy（最稳定）

1. 访问 https://www.alchemy.com/
2. 注册账号（免费）
3. 创建应用，选择 Sepolia 网络
4. 复制 API Key
5. 在 `.env` 中设置：
   ```env
   SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
   PRIVATE_KEY=你的私钥
   ```

### 使用 Infura

1. 访问 https://www.infura.io/
2. 注册账号（免费）
3. 创建项目，选择 Sepolia 网络
4. 复制 Project ID
5. 在 `.env` 中设置：
   ```env
   SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
   PRIVATE_KEY=你的私钥
   ```

## 🧪 测试 RPC 连接

运行以下命令测试哪个 RPC 可用：

```bash
npm run test-rpc
```

这会测试多个 RPC 节点并显示哪些可用。

