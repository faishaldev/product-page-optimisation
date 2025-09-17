import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product, ProductFilters as FilterType } from '@/types/product';

export function useProductFilters(products: Product[]) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterType>({
    category: searchParams.get('category') || undefined,
    sortBy:
      (searchParams.get('sortBy') as 'price-asc' | 'price-desc' | undefined) ||
      undefined,
    search: searchParams.get('search') || undefined,
  });

  useEffect(() => {
    const urlFilters: FilterType = {
      category: searchParams.get('category') || undefined,
      sortBy:
        (searchParams.get('sortBy') as
          | 'price-asc'
          | 'price-desc'
          | undefined) || undefined,
      search: searchParams.get('search') || undefined,
    };
    setFilters(urlFilters);
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category,
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm),
      );
    }

    if (filters.sortBy) {
      filtered.sort((a, b) => {
        if (filters.sortBy === 'price-asc') {
          return a.price - b.price;
        } else if (filters.sortBy === 'price-desc') {
          return b.price - a.price;
        }
        return 0;
      });
    }

    setFilteredProducts(filtered);
  }, [products, filters]);

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.sortBy) params.set('sortBy', newFilters.sortBy);
    if (newFilters.search) params.set('search', newFilters.search);
    router.push(`/?${params.toString()}`);
  };

  return { filteredProducts, filters, handleFilterChange };
}
