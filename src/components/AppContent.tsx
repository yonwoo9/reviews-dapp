import React, { useState, useEffect } from 'react'
import { ReviewList } from './ReviewList'
import { AddReviewForm } from './AddReviewForm'
import { CategoryFilter } from './CategoryFilter'
import { Header } from './Header'
import { DemoModeNotice } from './DemoModeNotice'
import { Leaderboard } from './Leaderboard'
import { useLanguage } from '../contexts/LanguageContext'
import { getAllReviewsFromBlockchain, type Web3Review } from '../utils/web3'
import { CONTRACT_ADDRESS } from '../utils/web3'
import { usePostReview } from '../hooks/usePostReview'
import type { Category, ViewMode, Review } from '../App'

const initialReviews: Review[] = [
  {
    id: '1',
    title: '星际穿越',
    category: 'movie',
    rating: 5,
    content:
      '诺兰的又一部科幻神作，时间的相对性和父女之情交织在一起，让人震撼又感动。视觉效果令人惊叹，配乐完美契合剧情。',
    author: '电影爱好者',
    createdAt: '2025-12-08',
  },
  {
    id: '2',
    title: 'The Dark Side of the Moon',
    category: 'music',
    rating: 5,
    content:
      'Pink Floyd的经典专辑，每一首歌都是精心制作的艺术品。从Time到Money，每个音符都充满深意。',
    author: '音乐发烧友',
    createdAt: '2025-12-07',
  },
  {
    id: '3',
    title: '三体',
    category: 'book',
    rating: 5,
    content:
      '刘慈欣的科幻巨作，对人性、文明和宇宙的深刻思考。黑暗森林法则令人细思极恐。',
    author: '科幻迷',
    createdAt: '2025-12-06',
  },
  {
    id: '4',
    title: '艾尔登法环',
    category: 'game',
    rating: 5,
    content:
      'FromSoftware的开放世界杰作，探索的自由度和战斗的挑战性完美结合。每一次死亡都是学习的机会。',
    author: '游戏玩家',
    createdAt: '2025-12-05',
  },
  {
    id: '5',
    title: '肖申克的救赎',
    category: 'movie',
    rating: 5,
    content:
      '关于希望与自由的永恒赞歌。蒂姆·罗宾斯和摩根·弗里曼的表演令人难忘，每次重温都有新的感悟。',
    author: '影迷小王',
    createdAt: '2025-12-04',
  },
  {
    id: '6',
    title: 'Thriller',
    category: 'music',
    rating: 5,
    content:
      'Michael Jackson的巅峰之作，流行音乐史上最伟大的专辑之一。Billie Jean和Beat It至今仍是经典。',
    author: 'MJ粉丝',
    createdAt: '2025-12-03',
  },
  {
    id: '7',
    title: '1984',
    category: 'book',
    rating: 5,
    content:
      '乔治·奥威尔对极权主义的深刻预言，在当今时代依然具有强烈的现实意义。',
    author: '读书人',
    createdAt: '2025-12-02',
  },
  {
    id: '8',
    title: '塞尔达传说：旷野之息',
    category: 'game',
    rating: 5,
    content:
      '开放世界游戏的标杆之作，自由度极高，每个角落都充满惊喜。任天堂的匠心之作。',
    author: '任天堂玩家',
    createdAt: '2025-12-01',
  },
  {
    id: '9',
    title: '盗梦空间',
    category: 'movie',
    rating: 4,
    content:
      '诺兰的又一力作，层层递进的梦境设计令人叹为观止。需要多次观看才能完全理解。',
    author: '悬疑迷',
    createdAt: '2025-11-30',
  },
  {
    id: '10',
    title: 'Abbey Road',
    category: 'music',
    rating: 5,
    content:
      'The Beatles的告别之作，Come Together和Here Comes the Sun都是永恒的经典。',
    author: 'Beatles粉',
    createdAt: '2025-11-29',
  },
  {
    id: '11',
    title: '百年孤独',
    category: 'book',
    rating: 4,
    content: '马尔克斯的魔幻现实主义巅峰，布恩迪亚家族的传奇故事引人入胜。',
    author: '文学青年',
    createdAt: '2025-11-28',
  },
  {
    id: '12',
    title: '巫师3：狂猎',
    category: 'game',
    rating: 5,
    content:
      'RPG游戏的巅峰之作，剧情、画面、音乐无一不是顶级水准。杰洛特的冒险令人难忘。',
    author: 'RPG爱好者',
    createdAt: '2025-11-27',
  },
  {
    id: '13',
    title: '教父',
    category: 'movie',
    rating: 5,
    content:
      '黑帮电影的教科书，马龙·白兰度的表演堪称影史经典。家族、权力、背叛的完美演绎。',
    author: '经典影迷',
    createdAt: '2025-11-26',
  },
  {
    id: '14',
    title: 'Kind of Blue',
    category: 'music',
    rating: 5,
    content: 'Miles Davis的爵士乐杰作，So What展现了即兴演奏的极致魅力。',
    author: '爵士乐迷',
    createdAt: '2025-11-25',
  },
  {
    id: '15',
    title: '杀死一只知更鸟',
    category: 'book',
    rating: 4,
    content:
      '关于种族、正义和成长的经典之作。阿提克斯·芬奇是文学史上最伟大的父亲形象之一。',
    author: '书虫',
    createdAt: '2025-11-24',
  },
]

export function AppContent() {
  const { t } = useLanguage()
  const [reviews, setReviews] = useState<Review[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [walletProvider, setWalletProvider] = useState<any>(null)
  const [isDemoMode, setIsDemoMode] = useState(!CONTRACT_ADDRESS)
  const [showDemoNotice, setShowDemoNotice] = useState(!CONTRACT_ADDRESS)
  const [viewMode, setViewMode] = useState<ViewMode>('reviews')

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

  useEffect(() => {
    if (isDemoMode && reviews.length > 0) {
      localStorage.setItem('demoReviews', JSON.stringify(reviews))
    }
  }, [reviews, isDemoMode])

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
        setIsDemoMode(false)
      } else {
        if (isDemoMode) {
          const savedReviews = localStorage.getItem('demoReviews')
          if (savedReviews) {
            setReviews(JSON.parse(savedReviews))
          } else {
            setReviews(initialReviews)
          }
        } else {
          setReviews(initialReviews)
        }
      }
    } catch (error) {
      console.error('Failed to load reviews:', error)
      if (isDemoMode) {
        const savedReviews = localStorage.getItem('demoReviews')
        if (savedReviews) {
          setReviews(JSON.parse(savedReviews))
        } else {
          setReviews(initialReviews)
        }
      } else {
        setReviews(initialReviews)
      }
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
    if (!walletAddress && !isDemoMode) {
      alert(t.connectWalletFirst)
      return
    }

    try {
      if (isDemoMode) {
        const review: Review = {
          ...newReview,
          id: Date.now().toString(),
          createdAt: new Date().toISOString().split('T')[0],
        }
        setReviews([review, ...reviews])
        setShowAddForm(false)
      } else {
        // 使用 wagmi hook 发布评论
        postReview(
          newReview.title,
          newReview.category,
          newReview.rating,
          newReview.content
        )
        // 注意：postReview 是同步的，会触发 writeContract
        // useEffect 会监听 isConfirmed 状态，交易确认后自动刷新和关闭表单
      }
    } catch (error) {
      console.error('Failed to post review:', error)
      if (isDemoMode) {
        alert(t.postFailed)
      } else {
        alert(t.checkWalletAndBalance)
      }
      throw error
    }
  }

  const filteredReviews =
    selectedCategory === 'all'
      ? reviews
      : reviews.filter((review) => review.category === selectedCategory)

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
        {isDemoMode && showDemoNotice && (
          <DemoModeNotice onDismiss={() => setShowDemoNotice(false)} />
        )}

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
