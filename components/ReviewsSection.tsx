import Button from '@/components/Button';
import ReviewCard from '@/components/ReviewCard';
import ReviewsSummary from '@/components/ReviewsSummary';

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
}

export default function ReviewsSection({
  reviews,
  rating,
}: ReviewsSectionProps) {
  if (reviews.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mt-8">
      <ReviewsSummary rating={rating} reviewCount={reviews.length} />

      <div className="px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="secondary" size="lg">
            Load More Reviews
          </Button>
        </div>
      </div>
    </div>
  );
}
