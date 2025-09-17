import { ProductGridSkeleton } from '@/components/skeletons';

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="h-14 bg-gray-200 rounded-lg w-96 mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-80 mx-auto mb-2 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
        </div>
        <ProductGridSkeleton count={12} />
      </div>
    </div>
  );
}
