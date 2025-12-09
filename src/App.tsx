import React from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import { AppContent } from './components/AppContent'

export type Category = 'all' | 'movie' | 'music' | 'book' | 'game' | 'other';
export type ViewMode = 'reviews' | 'leaderboard';

export interface Review {
  id: string;
  title: string;
  category: Category;
  rating: number;
  content: string;
  author: string;
  createdAt: string;
  imageUrl?: string;
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
