import Button from '@/components/Button';

interface ReviewsSummaryProps {
  rating: number;
  reviewCount: number;
}

export default function ReviewsSummary({
  rating,
  reviewCount,
}: ReviewsSummaryProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-8 lg:px-12 py-10">
      <h2 className="text-4xl font-bold text-gray-900 mb-2 text-center">
        Customer Reviews
      </h2>
      <p className="text-gray-600 text-center mb-8">
        See what our customers are saying about this product
      </p>

      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
        <div className="text-center">
          <div className="text-5xl font-bold text-blue-600 mb-2">
            {rating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-2xl ${
                  i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <div className="text-gray-700 mb-6">
            Based on {reviewCount} customer{' '}
            {reviewCount === 1 ? 'review' : 'reviews'}
          </div>
          <Button variant="primary" size="lg" fullWidth>
            Write a Review
          </Button>
        </div>
      </div>
    </div>
  );
}
