import React, { useState, useEffect } from 'react'
import { Trophy, Medal, Award, TrendingUp, Calendar, Star } from 'lucide-react'
import { Pagination } from './Pagination'
import type { Review } from '../App'
import { useLanguage } from '../contexts/LanguageContext'

interface LeaderboardProps {
  reviews: Review[]
}

const ITEMS_PER_PAGE = 20 // 排行榜每页显示20条

export function Leaderboard({ reviews }: LeaderboardProps) {
  const { t } = useLanguage()
  const [currentPage, setCurrentPage] = useState(1)

  // 计算综合得分：评分权重70%，时间权重30%（越新越高分）
  const calculateScore = (review: Review): number => {
    // 确保 rating 是 number 类型（处理 BigInt 情况）
    const rating =
      typeof review.rating === 'bigint'
        ? Number(review.rating)
        : Number(review.rating)
    const ratingScore = (rating / 5) * 70
    const dateScore = getTimeScore(review.createdAt) * 30
    return ratingScore + dateScore
  }

  const getTimeScore = (dateString: string): number => {
    const reviewDate = new Date(dateString)
    const now = new Date()
    const daysDiff =
      (now.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24)

    // 30天内的评论得满分，之后每天减少一点分数
    if (daysDiff <= 30) return 1
    if (daysDiff <= 90) return 0.8
    if (daysDiff <= 180) return 0.6
    return 0.4
  }

  // 排序并限制为前100条
  const topReviews = [...reviews]
    .map((review) => ({
      ...review,
      score: calculateScore(review),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 100)

  // 当reviews改变时重置到第一页
  useEffect(() => {
    setCurrentPage(1)
  }, [reviews])

  const totalPages = Math.ceil(topReviews.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentReviews = topReviews.slice(startIndex, endIndex)

  // 滚动到顶部
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />
    return null
  }

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-500 to-yellow-600'
    if (rank === 2) return 'from-gray-400 to-gray-500'
    if (rank === 3) return 'from-amber-600 to-amber-700'
    if (rank <= 10) return 'from-purple-500 to-purple-600'
    return 'from-slate-600 to-slate-700'
  }

  if (topReviews.length === 0) {
    return (
      <div className="text-center py-16">
        <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">{t.noLeaderboardData}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="space-y-3">
        {currentReviews.map((review, index) => {
          // 实际排名 = 起始索引 + 当前索引 + 1
          const rank = startIndex + index + 1
          return (
            <div
              key={review.id}
              className={`bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all ${
                rank <= 3 ? 'shadow-lg shadow-purple-500/20' : ''
              }`}>
              <div className="flex items-center gap-4">
                {/* 排名 */}
                <div className="flex-shrink-0">
                  {rank <= 3 ? (
                    <div className="w-12 h-12 flex items-center justify-center">
                      {getRankIcon(rank)}
                    </div>
                  ) : (
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${getRankBadgeColor(
                        rank
                      )} rounded-lg flex items-center justify-center`}>
                      <span className="text-white text-sm">#{rank}</span>
                    </div>
                  )}
                </div>

                {/* 内容 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white truncate">{review.title}</h3>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-gray-300">
                            {review.rating}.0
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-400">
                            {review.createdAt}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {t.by} {review.author}
                        </span>
                      </div>
                    </div>

                    {/* 综合得分 */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-gray-400">
                        {t.comprehensiveScore}
                      </div>
                      <div className="text-lg text-purple-400">
                        {review.score.toFixed(1)}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 line-clamp-2">
                    {review.content}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* 显示当前页信息 */}
      {totalPages > 1 && (
        <div className="text-center mt-4 text-sm text-gray-400">
          {startIndex + 1} - {Math.min(endIndex, topReviews.length)} /{' '}
          {topReviews.length}
        </div>
      )}
    </div>
  )
}
