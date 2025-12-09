import React, { useState, useEffect } from 'react'
import { ReviewCard } from './ReviewCard';
import { Pagination } from './Pagination';
import type { Review } from '../App';
import { useLanguage } from '../contexts/LanguageContext';

interface ReviewListProps {
  reviews: Review[];
}

const ITEMS_PER_PAGE = 12; // 2列布局，每页显示6行 = 12条

export function ReviewList({ reviews }: ReviewListProps) {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);

  // 当reviews改变时重置到第一页
  useEffect(() => {
    setCurrentPage(1);
  }, [reviews]);

  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentReviews = reviews.slice(startIndex, endIndex);

  // 滚动到顶部
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400">{t.noReviews}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        {currentReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* 显示当前页信息 */}
      {totalPages > 1 && (
        <div className="text-center mt-4 text-sm text-gray-400">
          {startIndex + 1} - {Math.min(endIndex, reviews.length)} / {reviews.length}
        </div>
      )}
    </div>
  );
}
