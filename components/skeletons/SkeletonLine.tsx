interface SkeletonLineProps {
  width?: string;
  height?: string;
  className?: string;
}

export default function SkeletonLine({
  width = 'w-full',
  height = 'h-4',
  className = '',
}: SkeletonLineProps) {
  return (
    <div
      className={`bg-gray-200 rounded ${width} ${height} ${className}`}
    ></div>
  );
}
