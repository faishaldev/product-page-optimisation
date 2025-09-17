'use client';

import { useState, useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { ProductCardSkeleton } from './skeletons';

interface LazyProductCardProps {
  product: Product;
  index: number;
}

export default function LazyProductCard({
  product,
  index,
}: LazyProductCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load first 8 products immediately for better initial experience
    if (index < 8) {
      setIsVisible(true);
      setHasLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          // Disconnect observer after loading
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Start loading 100px before the element comes into view
        threshold: 0.1,
      },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [index, hasLoaded]);

  return (
    <div ref={cardRef} className="min-h-[400px]">
      {isVisible ? <ProductCard product={product} /> : <ProductCardSkeleton />}
    </div>
  );
}
