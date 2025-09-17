'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { ProductCardSkeleton } from './skeletons';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazyProductCardProps {
  product: Product;
  index: number;
}

export default function LazyProductCard({
  product,
  index,
}: LazyProductCardProps) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { isVisible, elementRef } = useIntersectionObserver({
    rootMargin: '100px',
    threshold: 0.1,
  });

  useEffect(() => {
    // Load first 8 products immediately for better initial experience
    if (index < 8) {
      setHasLoaded(true);
      return;
    }

    if (isVisible && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [isVisible, hasLoaded, index]);

  return (
    <div ref={elementRef} className="min-h-[400px]">
      {hasLoaded ? <ProductCard product={product} /> : <ProductCardSkeleton />}
    </div>
  );
}
