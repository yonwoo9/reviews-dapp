import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import type { Category } from '../App'
import { useLanguage } from '../contexts/LanguageContext'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface SearchBarProps {
  onSearch: (category: Category, title: string) => void
  onClear: () => void
  isSearching: boolean
}

export function SearchBar({ onSearch, onClear, isSearching }: SearchBarProps) {
  const { t } = useLanguage()
  const [category, setCategory] = useState<Category>('movie')
  const [title, setTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onSearch(category, title.trim())
    }
  }

  const handleClear = () => {
    setTitle('')
    onClear()
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8 w-full">
      <h3 className="text-white mb-4 flex items-center gap-2 text-lg font-medium w-full">
        <Search className="w-5 h-5" />
        {t.searchReviews || '搜索评论'}
      </h3>
      <form
        onSubmit={handleSubmit}
        className="w-full block m-0"
        style={{ width: '100%', margin: 0 }}>
        <div
          className="flex items-center gap-3 w-full"
          style={{ width: '100%', display: 'flex' }}>
          <div className="flex-[2] flex-shrink-0" style={{ flex: '2 0 0%' }}>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as Category)}>
              <SelectTrigger
                className="w-full h-[42px] bg-white/5 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-purple-500/50 focus:ring-2 transition-all hover:bg-white/10 data-[placeholder]:text-gray-400"
                style={{ height: '42px' }}>
                <SelectValue placeholder={t.all || '全部'} />
              </SelectTrigger>
              <SelectContent
                className="bg-gray-900/98 backdrop-blur-md border border-white/30 rounded-xl shadow-2xl shadow-purple-500/20 z-50 w-[var(--radix-select-trigger-width)] p-1"
                style={{ width: 'var(--radix-select-trigger-width)' }}>
                <SelectItem
                  value="all"
                  className="cursor-pointer h-11 px-4 py-2.5 hover:bg-white/10 focus:bg-white/15 text-white data-[state=checked]:bg-white/10 data-[state=checked]:shadow-lg data-[state=checked]:shadow-purple-500/50 data-[state=checked]:border data-[state=checked]:border-purple-500/50 rounded-lg my-1 w-full">
                  {t.all || '全部'}
                </SelectItem>
                <SelectItem
                  value="movie"
                  className="cursor-pointer h-11 px-4 py-2.5 hover:bg-white/10 focus:bg-white/15 text-white data-[state=checked]:bg-white/10 data-[state=checked]:shadow-lg data-[state=checked]:shadow-purple-500/50 data-[state=checked]:border data-[state=checked]:border-purple-500/50 rounded-lg my-1 w-full">
                  {t.movie}
                </SelectItem>
                <SelectItem
                  value="music"
                  className="cursor-pointer h-11 px-4 py-2.5 hover:bg-white/10 focus:bg-white/15 text-white data-[state=checked]:bg-white/10 data-[state=checked]:shadow-lg data-[state=checked]:shadow-purple-500/50 data-[state=checked]:border data-[state=checked]:border-purple-500/50 rounded-lg my-1 w-full">
                  {t.music}
                </SelectItem>
                <SelectItem
                  value="book"
                  className="cursor-pointer h-11 px-4 py-2.5 hover:bg-white/10 focus:bg-white/15 text-white data-[state=checked]:bg-white/10 data-[state=checked]:shadow-lg data-[state=checked]:shadow-purple-500/50 data-[state=checked]:border data-[state=checked]:border-purple-500/50 rounded-lg my-1 w-full">
                  {t.book}
                </SelectItem>
                <SelectItem
                  value="game"
                  className="cursor-pointer h-11 px-4 py-2.5 hover:bg-white/10 focus:bg-white/15 text-white data-[state=checked]:bg-white/10 data-[state=checked]:shadow-lg data-[state=checked]:shadow-purple-500/50 data-[state=checked]:border data-[state=checked]:border-purple-500/50 rounded-lg my-1 w-full">
                  {t.game}
                </SelectItem>
                <SelectItem
                  value="other"
                  className="cursor-pointer h-11 px-4 py-2.5 hover:bg-white/10 focus:bg-white/15 text-white data-[state=checked]:bg-white/10 data-[state=checked]:shadow-lg data-[state=checked]:shadow-purple-500/50 data-[state=checked]:border data-[state=checked]:border-purple-500/50 rounded-lg my-1 w-full">
                  {t.other}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-[6] flex-shrink-0" style={{ flex: '6 0 0%' }}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                t.searchPlaceholder || '输入作品名称（支持模糊搜索）...'
              }
              className="w-full px-4 h-[42px] bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
              style={{ height: '42px' }}
            />
          </div>
          <div
            className="flex-[1] flex-shrink-0"
            style={{ flex: '1 0 0%', minWidth: '90px' }}>
            <button
              type="submit"
              disabled={!title.trim() || isSearching}
              className="w-full h-[42px] px-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 whitespace-nowrap overflow-hidden"
              style={{ height: '42px', minWidth: '90px' }}>
              {isSearching ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                  <span className="text-xs whitespace-nowrap">
                    {t.searching || '搜索中...'}
                  </span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-xs whitespace-nowrap">
                    {t.search || '搜索'}
                  </span>
                </>
              )}
            </button>
          </div>
          {title && (
            <div className="flex-[1] flex-shrink-0" style={{ flex: '1 0 0%' }}>
              <button
                type="button"
                onClick={handleClear}
                className="w-full h-[42px] px-4 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center"
                style={{ height: '42px' }}
                title={t.clear || '清除'}>
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
