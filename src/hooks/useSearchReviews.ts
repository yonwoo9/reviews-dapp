import { useReadContract } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI, type Web3Review } from '../utils/web3'
import type { Category } from '../App'

export function useSearchReviews(category: Category | null, title: string | null) {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}` | undefined,
    abi: CONTRACT_ABI,
    functionName: 'getReviewsByCategoryAndTitle',
    args: category && title ? [category, title] : undefined,
    query: {
      enabled: !!CONTRACT_ADDRESS && !!category && !!title,
    },
  })

  return {
    reviews: (data as Web3Review[]) || [],
    isLoading,
    error,
  }
}

