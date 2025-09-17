interface ProductRatingProps {
  rating: number;
  reviewCount: number;
  brand: string;
}

export default function ProductRating({
  rating,
  reviewCount,
  brand,
}: ProductRatingProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center gap-1">
        <span className="text-yellow-400 text-lg">★</span>
        <span className="text-lg font-semibold text-gray-800">
          {rating.toFixed(1)}
        </span>
        <span className="text-gray-600">({reviewCount} reviews)</span>
      </div>
      <span className="text-gray-400">|</span>
      <span className="text-sm text-gray-700">Brand: {brand}</span>
    </div>
  );
}
