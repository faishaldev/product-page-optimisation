'use client';

import { useState, useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

interface LazyProductCardProps {
  product: Product;
  index: number;
}

export default function LazyProductCard({ product, index }: LazyProductCardProps) {
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
      }
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
      {isVisible ? (
        <ProductCard product={product} />
      ) : (
        // Skeleton loader
        <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="aspect-square bg-gray-200"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}