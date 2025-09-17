import SkeletonCard from './SkeletonCard';
import SkeletonLine from './SkeletonLine';

export default function ProductHighlightsSkeleton() {
  return (
    <SkeletonCard className="mb-4">
      <SkeletonLine width="w-32" height="h-5" className="mb-2" />
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
            <SkeletonLine width="w-24" />
          </div>
        ))}
      </div>
    </SkeletonCard>
  );
}
