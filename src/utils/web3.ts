import { ethers } from 'ethers'

// 智能合约地址（部署后替换为实际地址）
// 设置为 null 表示合约未部署，将使用演示模式
export const CONTRACT_ADDRESS: string | null =
  '0x82f6428cd7Cc6dE864a6344265bd460745316E4E'

// 智能合约ABI
export const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'category',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'rating',
        type: 'uint8',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'author',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'ReviewPosted',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_category',
        type: 'string',
      },
      {
        internalType: 'uint8',
        name: '_rating',
        type: 'uint8',
      },
      {
        internalType: 'string',
        name: '_content',
        type: 'string',
      },
    ],
    name: 'postReview',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllReviews',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'category',
            type: 'string',
          },
          {
            internalType: 'uint8',
            name: 'rating',
            type: 'uint8',
          },
          {
            internalType: 'string',
            name: 'content',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct ReviewContract.Review[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'postFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'reviewCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

export interface Web3Review {
  id: bigint
  title: string
  category: string
  rating: number | bigint // 可能是 number 或 bigint
  content: string
  author: string
  timestamp: bigint
}

// 钱包类型定义
export interface WalletInfo {
  id: string
  name: string
  icon: string
  isInstalled: boolean
  provider?: any
}

// 检测可用的钱包
export function detectWallets(): WalletInfo[] {
  const wallets: WalletInfo[] = []

  // MetaMask
  if (window.ethereum?.isMetaMask) {
    wallets.push({
      id: 'metamask',
      name: 'MetaMask',
      icon: '🦊',
      isInstalled: true,
      provider: window.ethereum,
    })
  }

  // Coinbase Wallet
  if (window.ethereum?.isCoinbaseWallet) {
    wallets.push({
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: '🔵',
      isInstalled: true,
      provider: window.ethereum,
    })
  }

  // 其他 EIP-1193 兼容钱包
  if (
    window.ethereum &&
    !window.ethereum.isMetaMask &&
    !window.ethereum.isCoinbaseWallet
  ) {
    wallets.push({
      id: 'other',
      name: '其他钱包',
      icon: '💼',
      isInstalled: true,
      provider: window.ethereum,
    })
  }

  // 未安装的钱包提示
  if (!window.ethereum?.isMetaMask) {
    wallets.push({
      id: 'metamask-install',
      name: 'MetaMask',
      icon: '🦊',
      isInstalled: false,
    })
  }

  if (!window.ethereum?.isCoinbaseWallet && !window.ethereum) {
    wallets.push({
      id: 'coinbase-install',
      name: 'Coinbase Wallet',
      icon: '🔵',
      isInstalled: false,
    })
  }

  return wallets
}

// 连接指定钱包
export async function connectWallet(
  walletId?: string
): Promise<{ address: string; provider: any } | null> {
  let provider: any = null

  // 如果没有指定钱包，使用默认的 window.ethereum
  if (!walletId) {
    if (typeof window.ethereum === 'undefined') {
      alert('请先安装钱包扩展！')
      return null
    }
    provider = window.ethereum
  } else {
    // 根据钱包 ID 选择 provider
    if (walletId === 'metamask' || walletId === 'metamask-install') {
      if (window.ethereum?.isMetaMask) {
        provider = window.ethereum
      } else {
        window.open('https://metamask.io/download/', '_blank')
        return null
      }
    } else if (walletId === 'coinbase' || walletId === 'coinbase-install') {
      if (window.ethereum?.isCoinbaseWallet) {
        provider = window.ethereum
      } else {
        window.open('https://www.coinbase.com/wallet', '_blank')
        return null
      }
    } else if (walletId === 'other') {
      provider = window.ethereum
    } else {
      provider = window.ethereum
    }
  }

  if (!provider) {
    alert('无法找到可用的钱包！')
    return null
  }

  try {
    const ethersProvider = new ethers.BrowserProvider(provider)
    const accounts = await ethersProvider.send('eth_requestAccounts', [])
    return {
      address: accounts[0],
      provider: provider,
    }
  } catch (error: any) {
    if (error.code === 4001) {
      alert('用户拒绝了连接请求')
    } else {
      console.error('连接钱包失败:', error)
      alert('连接钱包失败，请重试')
    }
    return null
  }
}

// 获取账户余额
export async function getBalance(
  address: string,
  provider?: any
): Promise<string> {
  try {
    let ethersProvider: ethers.Provider

    if (provider) {
      ethersProvider = new ethers.BrowserProvider(provider)
    } else if (window.ethereum) {
      ethersProvider = new ethers.BrowserProvider(window.ethereum)
    } else {
      return '0.00'
    }

    const balance = await ethersProvider.getBalance(address)
    return ethers.formatEther(balance)
  } catch (error) {
    console.error('获取余额失败:', error)
    return '0.00'
  }
}

export async function getContract(provider?: any) {
  if (!CONTRACT_ADDRESS) {
    throw new Error('Contract not deployed')
  }

  let ethersProvider: ethers.BrowserProvider

  if (provider) {
    ethersProvider = new ethers.BrowserProvider(provider)
  } else if (window.ethereum) {
    ethersProvider = new ethers.BrowserProvider(window.ethereum)
  } else {
    throw new Error('Wallet not connected')
  }

  const signer = await ethersProvider.getSigner()
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
}

export async function postReviewToBlockchain(
  title: string,
  category: string,
  rating: number,
  content: string,
  provider?: any
): Promise<any> {
  try {
    const contract = await getContract(provider)
    const postFee = await contract.postFee()

    const tx = await contract.postReview(title, category, rating, content, {
      value: postFee,
    })

    await tx.wait()
    return tx
  } catch (error) {
    console.error('发布评论到区块链失败:', error)
    throw error
  }
}

export async function getAllReviewsFromBlockchain(): Promise<Web3Review[]> {
  try {
    // Check if contract is deployed
    if (!CONTRACT_ADDRESS) {
      console.log('智能合约未部署，使用演示模式')
      return []
    }

    if (typeof window.ethereum === 'undefined') {
      console.log('MetaMask 未安装')
      return []
    }

    const provider = new ethers.BrowserProvider(window.ethereum)
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider
    )

    // Check if contract exists at this address
    const code = await provider.getCode(CONTRACT_ADDRESS)
    if (code === '0x') {
      console.log('合约地址无效或未部署')
      return []
    }

    const reviews = await contract.getAllReviews()
    return reviews
  } catch (error) {
    console.log('从区块链获取评论失败，这可能是因为合约未部署')
    return []
  }
}

export async function getPostFee(): Promise<string> {
  try {
    if (!CONTRACT_ADDRESS) {
      return '0.001'
    }

    if (typeof window.ethereum === 'undefined') {
      return '0.001'
    }

    const provider = new ethers.BrowserProvider(window.ethereum)
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider
    )

    const code = await provider.getCode(CONTRACT_ADDRESS)
    if (code === '0x') {
      return '0.001'
    }

    const fee = await contract.postFee()
    return ethers.formatEther(fee)
  } catch (error) {
    console.error('获取发布费用失败:', error)
    return '0.001'
  }
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// 声明全局window对象的ethereum属性
declare global {
  interface Window {
    ethereum?: any
  }
}
