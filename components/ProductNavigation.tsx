'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProductNavigationProps {
  category?: string;
  title?: string;
}

export default function ProductNavigation({
  category,
  title,
}: ProductNavigationProps) {
  const router = useRouter();

  return (
    <>
      <div className="mb-6">
        <button
          className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium group cursor-pointer"
          onClick={() => router.back()}
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Products
        </button>
      </div>

      {category && title && (
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link
            href="/"
            className="hover:text-blue-600 transition-colors font-medium cursor-pointer"
          >
            Home
          </Link>
          <span>›</span>
          <span className="text-gray-800 capitalize font-medium">
            {category}
          </span>
          <span>›</span>
          <span className="text-gray-900 font-medium truncate">{title}</span>
        </nav>
      )}
    </>
  );
}
