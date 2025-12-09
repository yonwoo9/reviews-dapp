import React from 'react'
import { Film, Music, Book, Gamepad2, Sparkles, Grid3x3 } from 'lucide-react'
import type { Category } from '../App';
import { useLanguage } from '../contexts/LanguageContext';

interface CategoryFilterProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const { t } = useLanguage();

  const categories = [
    { value: 'all' as Category, label: t.all, icon: Grid3x3 },
    { value: 'movie' as Category, label: t.movie, icon: Film },
    { value: 'music' as Category, label: t.music, icon: Music },
    { value: 'book' as Category, label: t.book, icon: Book },
    { value: 'game' as Category, label: t.game, icon: Gamepad2 },
    { value: 'other' as Category, label: t.other, icon: Sparkles },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => onSelectCategory(value)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
            selectedCategory === value
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
              : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
