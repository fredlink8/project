import { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { ReviewForm } from './review-form';
import { formatDistanceToNow } from 'date-fns';

interface Review {
  id: string;
  rating: number;
  comment: string;
  author: string;
  created_at: string;
}

interface ReviewsSectionProps {
  propertyId: string;
  reviews: Review[];
  canReview?: boolean;
}

export function ReviewsSection({ propertyId, reviews, canReview = false }: ReviewsSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 'N/A';

  const handleSubmitReview = async (data: { rating: number; comment: string }) => {
    try {
      // In a real app, this would make an API call to submit the review
      console.log('Submitting review:', data);
      alert('Review submitted successfully!');
      setShowReviewForm(false);
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Reviews</h2>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold">{averageRating}</span>
            <span className="text-gray-600">({reviews.length} reviews)</span>
          </div>
        </div>
        {canReview && !showReviewForm && (
          <Button onClick={() => setShowReviewForm(true)}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Write a Review
          </Button>
        )}
      </div>

      {showReviewForm && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <ReviewForm
            propertyId={propertyId}
            onSubmit={handleSubmitReview}
            onCancel={() => setShowReviewForm(false)}
          />
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{review.author}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500">
                {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
              </span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}