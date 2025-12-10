import React from 'react'
import {
  Star,
  User,
  Calendar,
  Film,
  Music,
  Book,
  Gamepad2,
  Sparkles,
} from 'lucide-react'
import type { Review, Category } from '../App'
import { useLanguage } from '../contexts/LanguageContext'

interface ReviewCardProps {
  review: Review
}

const categoryIcons: Record<Category, any> = {
  all: Sparkles,
  movie: Film,
  music: Music,
  book: Book,
  game: Gamepad2,
  other: Sparkles,
}

const categoryColors: Record<Category, string> = {
  all: 'from-purple-500 to-pink-500',
  movie: 'from-red-500 to-orange-500',
  music: 'from-blue-500 to-cyan-500',
  book: 'from-green-500 to-emerald-500',
  game: 'from-violet-500 to-purple-500',
  other: 'from-yellow-500 to-orange-500',
}

export function ReviewCard({ review }: ReviewCardProps) {
  const { t } = useLanguage()
  const CategoryIcon = categoryIcons[review.category]

  const getCategoryName = (category: Category): string => {
    const categoryMap: Record<Category, string> = {
      all: t.all,
      movie: t.movie,
      music: t.music,
      book: t.book,
      game: t.game,
      other: t.other,
    }
    return categoryMap[category]
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:shadow-xl hover:shadow-purple-500/20">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-8 h-8 bg-gradient-to-r ${
                categoryColors[review.category]
              } rounded-lg flex items-center justify-center`}>
              <CategoryIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-gray-400">
              {getCategoryName(review.category)}
            </span>
          </div>
          <h3 className="text-white mb-2">{review.title}</h3>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < review.rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-600'
            }`}
          />
        ))}
        <span className="text-white ml-2">{review.rating}.0</span>
      </div>

      <p className="text-gray-300 mb-4 line-clamp-3">{review.content}</p>

      <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>{review.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{review.createdAt}</span>
        </div>
      </div>
    </div>
  )
}
