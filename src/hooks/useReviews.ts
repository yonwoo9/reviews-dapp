import { useReadContract } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI, type Web3Review } from '../utils/web3'

export function useReviews() {
  const { data: reviews, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}` | undefined,
    abi: CONTRACT_ABI,
    functionName: 'getAllReviews',
    query: {
      enabled: !!CONTRACT_ADDRESS,
    },
  })

  return {
    reviews: (reviews as Web3Review[]) || [],
    isLoading,
    error,
  }
}

