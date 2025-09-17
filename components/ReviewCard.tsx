interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start space-x-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {review.reviewerName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-bold text-gray-900 text-lg">
                {review.reviewerName}
              </h4>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
              {new Date(review.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <blockquote className="text-gray-700 leading-relaxed text-base italic border-l-4 border-blue-200 pl-4">
            &ldquo;{review.comment}&rdquo;
          </blockquote>
        </div>
      </div>
    </div>
  );
}
