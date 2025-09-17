import SkeletonLine from './SkeletonLine';
import ProductGridSkeleton from './ProductGridSkeleton';

export default function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12 animate-pulse">
        {/* Hero Section Skeleton - matches HeroSection component */}
        <div className="text-center mb-16">
          {/* Single title line with gradient background placeholder */}
          <div className="mb-6">
            <SkeletonLine
              width="w-80"
              height="h-12"
              className="mx-auto bg-gradient-to-r from-gray-200 to-gray-300"
            />
          </div>

          {/* Subtitle */}
          <SkeletonLine width="w-2/3" height="h-6" className="mx-auto mb-2" />

          {/* Description */}
          <SkeletonLine width="w-1/2" height="h-5" className="mx-auto" />
        </div>

        {/* Stats Section Skeleton - matches StatsSection component exactly */}
        <div className="mb-8 bg-white rounded-2xl shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Total Products Stat */}
            <div>
              <SkeletonLine
                width="w-16"
                height="h-9"
                className="mx-auto mb-2"
              />
              <SkeletonLine width="w-28" height="h-4" className="mx-auto" />
            </div>

            {/* Categories Stat */}
            <div>
              <SkeletonLine
                width="w-12"
                height="h-9"
                className="mx-auto mb-2"
              />
              <SkeletonLine width="w-20" height="h-4" className="mx-auto" />
            </div>

            {/* Average Rating Stat */}
            <div>
              <SkeletonLine
                width="w-14"
                height="h-9"
                className="mx-auto mb-2"
              />
              <SkeletonLine width="w-20" height="h-4" className="mx-auto" />
            </div>
          </div>
        </div>

        {/* Filters Section Skeleton - matches FiltersSkeleton in HomePage */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-wrap gap-4">
              {/* Search Input */}
              <div className="h-10 bg-gray-200 rounded-lg w-48"></div>

              {/* Category Filter */}
              <div className="h-10 bg-gray-200 rounded-lg w-32"></div>

              {/* Sort Filter */}
              <div className="h-10 bg-gray-200 rounded-lg w-40"></div>
            </div>
          </div>
        </div>

        {/* Product Grid Section - matches HomePage structure */}
        <div className="mb-8">
          <ProductGridSkeleton count={12} />
        </div>
      </div>
    </div>
  );
}
