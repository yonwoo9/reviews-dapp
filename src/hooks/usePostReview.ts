import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { parseEther } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/web3'

export function usePostReview() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({
      hash,
    })

  // 获取发布费用
  const { data: postFeeData } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}` | undefined,
    abi: CONTRACT_ABI,
    functionName: 'postFee',
    query: {
      enabled: !!CONTRACT_ADDRESS,
    },
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
      const fee = postFeeData || parseEther('0.001')
      
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'postReview',
        args: [title, category, BigInt(rating), content],
        value: fee as bigint,
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

