import { ethers } from 'hardhat'

async function main() {
  console.log('开始部署 ReviewContract...')
  console.log('网络:', process.env.HARDHAT_NETWORK || 'hardhat')

  // 检查 RPC 连接
  try {
    console.log('检查 RPC 连接...')
    const network = await ethers.provider.getNetwork()
    console.log('✅ 已连接到网络:', network.name, '(Chain ID:', network.chainId.toString() + ')')
  } catch (error: any) {
    console.error('❌ RPC 连接失败:', error.message)
    console.error('\n💡 解决方案:')
    console.error('1. 检查网络连接')
    console.error('2. 尝试使用其他 RPC URL（在 .env 文件中设置 SEPOLIA_RPC_URL）')
    console.error('3. 推荐使用 Alchemy 或 Infura 的 RPC（需要注册获取 API Key）')
    throw error
  }

  // 获取部署账户
  const [deployer] = await ethers.getSigners()
  console.log('部署账户:', deployer.address)

  // 检查账户余额
  const balance = await ethers.provider.getBalance(deployer.address)
  console.log('账户余额:', ethers.formatEther(balance), 'ETH')

  if (balance === 0n) {
    throw new Error('账户余额不足，请先获取测试币')
  }

  // 获取合约工厂
  const ReviewContract = await ethers.getContractFactory('ReviewContract')

  // 部署合约
  console.log('正在部署合约...')
  const contract = await ReviewContract.deploy()

  // 等待合约部署完成
  await contract.waitForDeployment()
  const contractAddress = await contract.getAddress()

  console.log('\n✅ 合约部署成功！')
  console.log('合约地址:', contractAddress)
  console.log('部署账户:', deployer.address)
  console.log('\n📝 请将以下地址更新到 src/utils/web3.ts:')
  console.log(`export const CONTRACT_ADDRESS = '${contractAddress}';`)

  // 验证合约信息
  console.log('\n📊 合约信息:')
  const postFee = await contract.postFee()
  console.log('发布费用:', ethers.formatEther(postFee), 'ETH')
  const reviewCount = await contract.reviewCount()
  console.log('当前评论数:', reviewCount.toString())

  // 保存部署信息
  const deploymentInfo = {
    network: process.env.HARDHAT_NETWORK || 'hardhat',
    contractAddress: contractAddress,
    deployer: deployer.address,
    postFee: ethers.formatEther(postFee),
    timestamp: new Date().toISOString(),
  }

  console.log('\n📄 部署信息已保存到 deployment-info.json')
  const fs = require('fs')
  fs.writeFileSync(
    './deployment-info.json',
    JSON.stringify(deploymentInfo, null, 2)
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
