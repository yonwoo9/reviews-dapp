import { useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/web3'

// 使用 wagmi hooks 与合约交互
export function usePostReview() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({
      hash,
    })

  const postReview = async (
    title: string,
    category: string,
    rating: number,
    content: string
  ) => {
    if (!CONTRACT_ADDRESS) {
      throw new Error('Contract not deployed')
    }

    try {
      // 先获取发布费用
      const postFee = await getPostFee()
      
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'postReview',
        args: [title, category, rating, content],
        value: parseEther(postFee),
      })
    } catch (error) {
      console.error('发布评论失败:', error)
      throw error
    }
  }

  return {
    postReview,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  }
}

export function useGetPostFee() {
  const { data: fee, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}` | undefined,
    abi: CONTRACT_ABI,
    functionName: 'postFee',
    query: {
      enabled: !!CONTRACT_ADDRESS,
    },
  })

  return {
    fee: fee ? formatEther(fee) : '0.001',
    isLoading,
  }
}

async function getPostFee(): Promise<string> {
  // 临时实现，实际应该使用 useReadContract hook
  return '0.001'
}

