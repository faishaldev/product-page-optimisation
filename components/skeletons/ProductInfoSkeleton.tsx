import SkeletonLine from './SkeletonLine';

export default function ProductInfoSkeleton() {
  return (
    <div className="p-8 lg:p-12">
      <div className="space-y-6">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 w-24 h-6"></div>

        <div className="space-y-2">
          <SkeletonLine width="w-3/4" height="h-8" />
          <SkeletonLine width="w-1/2" height="h-8" />
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-5 h-5 bg-gray-200 rounded"></div>
            ))}
            <SkeletonLine width="w-8" height="h-5" />
            <SkeletonLine width="w-20" />
          </div>
          <span className="text-gray-300">|</span>
          <SkeletonLine width="w-16" />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <SkeletonLine width="w-24" height="h-10" />
            <SkeletonLine width="w-16" height="h-6" />
            <SkeletonLine width="w-20" height="h-6" />
          </div>
          <SkeletonLine width="w-32" />
        </div>

        <div className="space-y-2">
          <SkeletonLine />
          <SkeletonLine width="w-5/6" />
          <SkeletonLine width="w-4/5" />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-200 rounded-full"></div>
          <SkeletonLine width="w-20" />
        </div>

        <div className="space-y-3">
          <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
          <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
