import { ethers } from 'ethers'

const rpcUrls = [
  'https://rpc.ankr.com/eth_sepolia',
  'https://ethereum-sepolia-rpc.publicnode.com',
  'https://1rpc.io/sepolia',
  'https://sepolia.gateway.tenderly.co',
  'https://rpc.sepolia.org',
  'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', // 公共 Infura 端点
]

async function testRpc(url: string): Promise<boolean> {
  try {
    const provider = new ethers.JsonRpcProvider(url)
    const network = await provider.getNetwork()
    const blockNumber = await provider.getBlockNumber()
    console.log(`✅ ${url}`)
    console.log(`   网络: ${network.name} (Chain ID: ${network.chainId})`)
    console.log(`   最新区块: ${blockNumber}`)
    return true
  } catch (error: any) {
    console.log(`❌ ${url}`)
    console.log(`   错误: ${error.message}`)
    return false
  }
}

async function main() {
  console.log('测试 Sepolia RPC 节点...\n')
  
  let foundWorking = false
  for (const url of rpcUrls) {
    const isWorking = await testRpc(url)
    if (isWorking && !foundWorking) {
      foundWorking = true
      console.log(`\n💡 建议使用: ${url}`)
      console.log(`   在 .env 文件中设置: SEPOLIA_RPC_URL=${url}\n`)
    }
    console.log('')
  }
  
  if (!foundWorking) {
    console.log('⚠️  所有公共 RPC 节点都不可用')
    console.log('💡 建议使用 Alchemy 或 Infura:')
    console.log('   1. 访问 https://www.alchemy.com/ 注册账号')
    console.log('   2. 创建应用，选择 Sepolia 网络')
    console.log('   3. 复制 API Key')
    console.log('   4. 在 .env 中设置: SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY')
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

