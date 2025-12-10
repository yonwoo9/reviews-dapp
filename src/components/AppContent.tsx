import React, { useState, useEffect } from 'react'
import { ReviewList } from './ReviewList'
import { AddReviewForm } from './AddReviewForm'
import { CategoryFilter } from './CategoryFilter'
import { Header } from './Header'
import { Leaderboard } from './Leaderboard'
import { SearchBar } from './SearchBar'
import { useLanguage } from '../contexts/LanguageContext'
import { getAllReviewsFromBlockchain, type Web3Review } from '../utils/web3'
import { CONTRACT_ADDRESS } from '../utils/web3'
import { usePostReview } from '../hooks/usePostReview'
import type { Category, ViewMode, Review } from '../App'

export function AppContent() {
  const { t } = useLanguage()
  const [reviews, setReviews] = useState<Review[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [walletProvider, setWalletProvider] = useState<any>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('reviews')
  const [searchCategory, setSearchCategory] = useState<Category | null>(null)
  const [searchTitle, setSearchTitle] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Review[]>([])
  const [isInSearchMode, setIsInSearchMode] = useState(false)

  // 使用 wagmi hook 发布评论
  const {
    postReview,
    isPending,
    isConfirming,
    isConfirmed,
    error: postError,
  } = usePostReview()

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const web3Reviews = await getAllReviewsFromBlockchain()
      if (web3Reviews && web3Reviews.length > 0) {
        const formattedReviews: Review[] = web3Reviews.map((r: Web3Review) => ({
          id: r.id.toString(),
          title: r.title,
          category: r.category as Category,
          rating:
            typeof r.rating === 'bigint' ? Number(r.rating) : Number(r.rating),
          content: r.content,
          author: `${r.author.slice(0, 6)}...${r.author.slice(-4)}`,
          createdAt: new Date(Number(r.timestamp) * 1000)
            .toISOString()
            .split('T')[0],
        }))
        setReviews(formattedReviews)
      } else {
        setReviews([])
      }
    } catch (error) {
      console.error('Failed to load reviews:', error)
      setReviews([])
    } finally {
      setLoading(false)
    }
  }

  // 监听交易确认状态
  useEffect(() => {
    if (isConfirmed) {
      // 交易确认后刷新评论列表
      fetchReviews()
      setShowAddForm(false)
    }
  }, [isConfirmed]) // eslint-disable-line react-hooks/exhaustive-deps

  // 监听交易错误
  useEffect(() => {
    if (postError) {
      console.error('发布评论失败:', postError)
      alert(t.checkWalletAndBalance)
    }
  }, [postError, t])

  const handleAddReview = async (
    newReview: Omit<Review, 'id' | 'createdAt'>
  ) => {
    if (!walletAddress) {
      alert(t.connectWalletFirst)
      return
    }

    try {
      // 使用 wagmi hook 发布评论
      postReview(
        newReview.title,
        newReview.category,
        newReview.rating,
        newReview.content
      )
      // 注意：postReview 是同步的，会触发 writeContract
      // useEffect 会监听 isConfirmed 状态，交易确认后自动刷新和关闭表单
    } catch (error) {
      console.error('Failed to post review:', error)
      alert(t.checkWalletAndBalance)
      throw error
    }
  }

  // 模糊搜索函数
  const fuzzyMatch = (text: string, query: string): boolean => {
    const normalizedText = text.toLowerCase().trim()
    const normalizedQuery = query.toLowerCase().trim()

    // 如果查询为空，返回 true
    if (!normalizedQuery) return true

    // 完全匹配
    if (normalizedText === normalizedQuery) return true

    // 包含匹配
    if (normalizedText.includes(normalizedQuery)) return true

    // 分词匹配：检查查询的每个字符是否按顺序出现在文本中
    let queryIndex = 0
    for (
      let i = 0;
      i < normalizedText.length && queryIndex < normalizedQuery.length;
      i++
    ) {
      if (normalizedText[i] === normalizedQuery[queryIndex]) {
        queryIndex++
      }
    }

    return queryIndex === normalizedQuery.length
  }

  // 处理搜索（模糊搜索）
  const handleSearch = async (category: Category, title: string) => {
    setIsSearching(true)
    setSearchCategory(category)
    setSearchTitle(title)
    setIsInSearchMode(true)

    try {
      if (CONTRACT_ADDRESS) {
        // 获取所有评论，然后在前端进行模糊搜索
        const allReviews = await getAllReviewsFromBlockchain()
        const formattedAllReviews: Review[] = allReviews.map(
          (r: Web3Review) => ({
            id: r.id.toString(),
            title: r.title,
            category: r.category as Category,
            rating:
              typeof r.rating === 'bigint'
                ? Number(r.rating)
                : Number(r.rating),
            content: r.content,
            author: `${r.author.slice(0, 6)}...${r.author.slice(-4)}`,
            createdAt: new Date(Number(r.timestamp) * 1000)
              .toISOString()
              .split('T')[0],
          })
        )

        // 模糊搜索：匹配分类和标题
        const filtered = formattedAllReviews.filter(
          (review) =>
            (category === 'all' || review.category === category) &&
            fuzzyMatch(review.title, title)
        )

        setSearchResults(filtered)
        setReviews(filtered)
      } else {
        // 如果没有合约地址，使用当前评论列表进行搜索
        const filtered = reviews.filter(
          (review) =>
            (category === 'all' || review.category === category) &&
            fuzzyMatch(review.title, title)
        )
        setSearchResults(filtered)
        setReviews(filtered)
      }
    } catch (error) {
      console.error('搜索失败:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleClearSearch = () => {
    setSearchCategory(null)
    setSearchTitle(null)
    setIsInSearchMode(false)
    setSearchResults([])
    fetchReviews()
  }

  // 过滤评论：先按搜索条件，再按分类
  let filteredReviews = reviews
  if (searchCategory && searchTitle && isInSearchMode) {
    // 搜索模式：使用已搜索的结果（已经在 handleSearch 中过滤过了）
    filteredReviews = reviews
  } else {
    // 正常模式：按分类过滤
    filteredReviews =
      selectedCategory === 'all'
        ? reviews
        : reviews.filter((review) => review.category === selectedCategory)
  }

  const getCategoryTitle = () => {
    const categoryTitles: Record<Category, string> = {
      all: viewMode === 'reviews' ? t.allReviewsTitle : t.leaderboardTitle,
      movie: viewMode === 'reviews' ? t.movieReviews : t.movieLeaderboard,
      music: viewMode === 'reviews' ? t.musicReviews : t.musicLeaderboard,
      book: viewMode === 'reviews' ? t.bookReviews : t.bookLeaderboard,
      game: viewMode === 'reviews' ? t.gameReviews : t.gameLeaderboard,
      other: viewMode === 'reviews' ? t.otherReviews : t.otherLeaderboard,
    }
    return categoryTitles[selectedCategory]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header
        onAddClick={() => setShowAddForm(true)}
        walletAddress={walletAddress}
        onWalletChange={(address, provider) => {
          setWalletAddress(address)
          setWalletProvider(provider || null)
        }}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <SearchBar
          onSearch={handleSearch}
          onClear={handleClearSearch}
          isSearching={isSearching}
        />

        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setViewMode('reviews')}
            className={`px-6 py-2 rounded-lg transition-all ${
              viewMode === 'reviews'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}>
            {t.allReviews}
          </button>
          <button
            onClick={() => setViewMode('leaderboard')}
            className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 ${
              viewMode === 'leaderboard'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}>
            <span>🏆</span>
            {t.leaderboard}
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-white mb-4">{t.categoryFilter}</h2>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {showAddForm && (
          <div className="mb-8">
            <AddReviewForm
              onSubmit={handleAddReview}
              onCancel={() => {
                setShowAddForm(false)
              }}
              walletAddress={walletAddress}
            />
            {(isPending || isConfirming) && (
              <div className="mt-4 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg text-white text-center">
                {isPending ? '提交交易中...' : '等待交易确认...'}
              </div>
            )}
          </div>
        )}

        <div className="mb-4">
          <h2 className="text-white">
            {getCategoryTitle()}
            <span className="text-gray-400 ml-2">
              (
              {viewMode === 'leaderboard'
                ? Math.min(filteredReviews.length, 100)
                : filteredReviews.length}
              )
            </span>
          </h2>
          {viewMode === 'leaderboard' && (
            <p className="text-sm text-gray-400 mt-2">
              {t.leaderboardDescription}
            </p>
          )}
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">{t.loading}</p>
          </div>
        ) : (
          <>
            {viewMode === 'reviews' ? (
              <ReviewList reviews={filteredReviews} />
            ) : (
              <Leaderboard reviews={filteredReviews} />
            )}
          </>
        )}
      </main>
    </div>
  )
}
