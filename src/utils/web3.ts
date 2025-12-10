import { ethers } from 'ethers'

// 智能合约地址（部署后替换为实际地址）
export const CONTRACT_ADDRESS: string | null =
  '0x8651F1a4Aa142f63Cd3e8519e2c9E0919f548a52'

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
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'hasReviewed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_category',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_title',
        type: 'string',
      },
    ],
    name: 'getReviewsByCategoryAndTitle',
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
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_category',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_title',
        type: 'string',
      },
    ],
    name: 'checkIfReviewed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
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

// 检查用户是否已评论
export async function checkIfUserReviewed(
  category: string,
  title: string,
  userAddress: string,
  provider?: any
): Promise<boolean> {
  try {
    if (!CONTRACT_ADDRESS) {
      return false
    }

    if (typeof window.ethereum === 'undefined' && !provider) {
      return false
    }

    // 使用只读的 provider 而不是 signer
    const actualProvider = provider || window.ethereum
    const ethersProvider = new ethers.BrowserProvider(actualProvider)
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      ethersProvider
    )

    const hasReviewed = await contract.checkIfReviewed(
      userAddress,
      category,
      title
    )
    return hasReviewed
  } catch (error) {
    console.error('检查评论状态失败:', error)
    return false
  }
}

// 根据分类和标题搜索评论（只读操作，不需要签名）
export async function searchReviewsByCategoryAndTitle(
  category: string,
  title: string
): Promise<Web3Review[]> {
  try {
    if (!CONTRACT_ADDRESS) {
      return []
    }

    if (typeof window.ethereum === 'undefined') {
      return []
    }

    // 搜索是只读操作，使用 provider 而不是 signer
    const provider = new ethers.BrowserProvider(window.ethereum)
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider
    )
    const reviews = await contract.getReviewsByCategoryAndTitle(category, title)
    return reviews
  } catch (error) {
    console.error('搜索评论失败:', error)
    return []
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

// 声明全局window对象的ethereum属性
declare global {
  interface Window {
    ethereum?: any
  }
}
