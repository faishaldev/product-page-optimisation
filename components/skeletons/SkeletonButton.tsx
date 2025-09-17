interface SkeletonButtonProps {
  width?: string;
  height?: string;
  className?: string;
}

export default function SkeletonButton({
  width = 'w-24',
  height = 'h-10',
  className = '',
}: SkeletonButtonProps) {
  return (
    <div
      className={`bg-gray-200 rounded ${width} ${height} ${className}`}
    ></div>
  );
}
