interface SkeletonCardProps {
  className?: string;
  children?: React.ReactNode;
}

export default function SkeletonCard({
  className = '',
  children,
}: SkeletonCardProps) {
  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
