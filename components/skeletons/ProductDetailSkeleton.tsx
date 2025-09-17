import SkeletonLine from './SkeletonLine';
import ProductImageSkeleton from './ProductImageSkeleton';
import ProductInfoSkeleton from './ProductInfoSkeleton';
import ProductHighlightsSkeleton from './ProductHighlightsSkeleton';

export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        {/* Back to Products Button */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
            <SkeletonLine width="w-32" />
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <SkeletonLine width="w-12" />
          <span className="text-gray-300">›</span>
          <SkeletonLine width="w-20" />
          <span className="text-gray-300">›</span>
          <SkeletonLine width="w-32" />
        </nav>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Column - Image and Highlights */}
            <div className="p-8 bg-gray-50 flex flex-col">
              <ProductImageSkeleton />
              <ProductHighlightsSkeleton />
            </div>

            {/* Right Column - Product Info */}
            <ProductInfoSkeleton />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mt-8">
          {/* Reviews Summary */}
          <div className="px-8 lg:px-12 py-8 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <SkeletonLine width="w-24" height="h-8" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <SkeletonLine width="w-20" height="h-5" />
              </div>
              <SkeletonLine width="w-32" height="h-6" />
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="px-8 lg:px-12 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <SkeletonLine width="w-24" height="h-4" />
                      <div className="flex gap-1 mt-2">
                        {[...Array(5)].map((_, j) => (
                          <div
                            key={j}
                            className="w-3 h-3 bg-gray-200 rounded"
                          ></div>
                        ))}
                      </div>
                    </div>
                    <SkeletonLine width="w-16" height="h-3" />
                  </div>
                  <div className="space-y-2">
                    <SkeletonLine />
                    <SkeletonLine width="w-4/5" />
                    <SkeletonLine width="w-3/4" />
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <div className="inline-block bg-gray-200 rounded-lg px-8 py-3">
                <SkeletonLine width="w-32" height="h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
