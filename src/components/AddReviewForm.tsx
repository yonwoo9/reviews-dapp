import React, { useState, useEffect } from 'react'
import { X, Star, Loader2, AlertCircle } from 'lucide-react'
import type { Review, Category } from '../App'
import { CONTRACT_ADDRESS, checkIfUserReviewed } from '../utils/web3'
import { useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import { CONTRACT_ABI } from '../utils/web3'
import { useLanguage } from '../contexts/LanguageContext'
import { useAccount } from 'wagmi'

interface AddReviewFormProps {
  onSubmit: (review: Omit<Review, 'id' | 'createdAt'>) => Promise<void>
  onCancel: () => void
  walletAddress: string | null
}

export function AddReviewForm({
  onSubmit,
  onCancel,
  walletAddress,
}: AddReviewFormProps) {
  const { t } = useLanguage()
  const { address } = useAccount()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<Category>('movie')
  const [rating, setRating] = useState(5)
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [hasReviewed, setHasReviewed] = useState(false)

  // 使用 wagmi hook 获取发布费用
  const { data: postFeeData } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}` | undefined,
    abi: CONTRACT_ABI,
    functionName: 'postFee',
    query: {
      enabled: !!CONTRACT_ADDRESS,
    },
  })

  const postFee = postFeeData ? formatEther(postFeeData) : '0.001'

  // 检查是否已评论
  useEffect(() => {
    const checkReviewStatus = async () => {
      if (walletAddress && title.trim() && category && CONTRACT_ADDRESS) {
        setIsChecking(true)
        try {
          const reviewed = await checkIfUserReviewed(
            category,
            title.trim(),
            walletAddress
          )
          setHasReviewed(reviewed)
        } catch (error) {
          console.error('检查评论状态失败:', error)
          setHasReviewed(false)
        } finally {
          setIsChecking(false)
        }
      } else {
        setHasReviewed(false)
      }
    }

    // 延迟检查，避免频繁请求
    const timer = setTimeout(() => {
      checkReviewStatus()
    }, 500)

    return () => clearTimeout(timer)
  }, [title, category, walletAddress])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || !author.trim()) {
      return
    }

    if (!walletAddress) {
      alert(t.connectWalletFirst)
      return
    }

    if (hasReviewed) {
      alert(t.alreadyReviewed || '您已经评论过该作品了')
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit({
        title: title.trim(),
        category,
        rating,
        content: content.trim(),
        author: author.trim(),
      })

      // Reset form
      setTitle('')
      setCategory('movie')
      setRating(5)
      setContent('')
      setAuthor('')
      setHasReviewed(false)
    } catch (error) {
      console.error('Submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-white">{t.addReview}</h3>
          {CONTRACT_ADDRESS && (
            <p className="text-sm text-yellow-400 mt-1">
              Gas fee: {postFee} ETH
            </p>
          )}
        </div>
        <button
          onClick={onCancel}
          disabled={isSubmitting}
          className="text-gray-400 hover:text-white transition-colors disabled:opacity-50">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">{t.reviewTitle}</label>
          <div className="relative">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              required
            />
            {isChecking && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
              </div>
            )}
          </div>
          {hasReviewed && !isChecking && (
            <div className="mt-2 flex items-center gap-2 text-yellow-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{t.alreadyReviewed || '您已经评论过该作品了'}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-300 mb-2">{t.selectCategory}</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500">
            <option value="movie">{t.movie}</option>
            <option value="music">{t.music}</option>
            <option value="book">{t.book}</option>
            <option value="game">{t.game}</option>
            <option value="other">{t.other}</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">{t.rating}</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none">
                <Star
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-600'
                  }`}
                />
              </button>
            ))}
            <span className="text-white ml-2">{rating}.0</span>
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">{t.reviewContent}</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">{t.author}</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            required
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting || hasReviewed || isChecking}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
            {isSubmitting
              ? t.posting
              : hasReviewed
              ? t.alreadyReviewed || '已评论'
              : t.submit}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition-all disabled:opacity-50">
            {t.cancel}
          </button>
        </div>
      </form>
    </div>
  )
}
