export default function ProductImageSkeleton() {
  return (
    <div className="p-8 bg-gray-50 flex flex-col">
      <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
      <div className="flex space-x-2 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}
