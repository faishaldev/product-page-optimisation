'use client';

import { useState, useEffect } from 'react';
import { Product, ProductFilters } from '@/types/product';
import LazyProductCard from '@/components/LazyProductCard';

interface ProductGridClientProps {
  initialProducts: Product[];
  initialFilters: ProductFilters;
}

export default function ProductGridClient({
  initialProducts,
  initialFilters,
}: ProductGridClientProps) {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);

  useEffect(() => {
    let filtered = [...initialProducts];

    if (initialFilters.category) {
      filtered = filtered.filter(
        (product) => product.category === initialFilters.category,
      );
    }

    if (initialFilters.search) {
      const searchTerm = initialFilters.search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm),
      );
    }

    if (initialFilters.sortBy) {
      filtered.sort((a, b) => {
        if (initialFilters.sortBy === 'price-asc') {
          return a.price - b.price;
        } else if (initialFilters.sortBy === 'price-desc') {
          return b.price - a.price;
        }
        return 0;
      });
    }

    setFilteredProducts(filtered);
  }, [initialProducts, initialFilters]);

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No products found
        </h3>
        <p className="text-gray-500">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product, index) => (
        <LazyProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
