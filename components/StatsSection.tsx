interface StatsSectionProps {
  totalProducts: number;
  categoriesCount: number;
  avgRating: number;
}

export default function StatsSection({
  totalProducts,
  categoriesCount,
  avgRating,
}: StatsSectionProps) {
  return (
    <div className="mb-8 bg-white rounded-2xl shadow-md p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {totalProducts}
          </div>
          <div className="text-gray-600">Total Products</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {categoriesCount}
          </div>
          <div className="text-gray-600">Categories</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {avgRating.toFixed(1)}
          </div>
          <div className="text-gray-600">Avg Rating</div>
        </div>
      </div>
    </div>
  );
}
