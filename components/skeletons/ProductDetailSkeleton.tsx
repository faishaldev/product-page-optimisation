export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        {/* Back Button Skeleton */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>

        {/* Breadcrumb Skeleton */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
          <span className="text-gray-300">›</span>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <span className="text-gray-300">›</span>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Gallery Skeleton */}
            <div className="p-8 bg-gray-50 flex flex-col">
              {/* Main Image */}
              <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 bg-gray-200 rounded-lg"
                  ></div>
                ))}
              </div>

              {/* Product Highlights Skeleton */}
              <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR Code Skeleton */}
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <div className="h-5 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
                <div className="w-20 h-20 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24 mx-auto"></div>
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="p-8 lg:p-12">
              <div className="space-y-6">
                {/* Category Badge Skeleton */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 w-24 h-6"></div>

                {/* Title Skeleton */}
                <div className="space-y-2">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>

                {/* Rating Skeleton */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    <div className="h-5 bg-gray-200 rounded w-8"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>

                {/* Price Skeleton */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 bg-gray-200 rounded w-24"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>

                {/* Description Skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                </div>

                {/* Availability Skeleton */}
                <div className="flex items-center gap-4">
                  <div className="px-3 py-2 rounded-full bg-gray-200 w-20 h-8"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>

                {/* Action Buttons Skeleton */}
                <div className="space-y-4 pt-6">
                  <div className="w-full h-12 bg-gray-200 rounded-xl"></div>
                  <div className="w-full h-12 bg-gray-200 rounded-xl"></div>
                </div>

                {/* Product Features Skeleton */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="text-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-16 mx-auto mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-20 mx-auto"></div>
                    </div>
                  ))}
                </div>

                {/* Product Information Skeleton */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags Skeleton */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="h-6 bg-gray-200 rounded w-12 mb-2"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-gray-200 px-3 py-1 rounded-full h-6 w-16"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section Skeleton */}
        <div className="mt-12 space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>

          {/* Review Summary Skeleton */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-10 bg-gray-200 rounded w-12 mb-2"></div>
                <div className="flex items-center gap-1 mb-2">
                  <div className="w-5 h-5 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
          </div>

          {/* Individual Reviews Skeleton */}
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-4 h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
