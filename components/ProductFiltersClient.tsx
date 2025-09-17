'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductFilters as Filters, Category } from '@/types/product';
import { clearAllParams } from '@/lib/utils';
import Input from './Input';
import Select from './Select';
import Button from './Button';

interface ProductFiltersClientProps {
  categories: Category[];
  initialFilters: Filters;
}

export default function ProductFiltersClient({
  categories,
  initialFilters,
}: ProductFiltersClientProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.sortBy) params.set('sortBy', newFilters.sortBy);
    if (newFilters.search) params.set('search', newFilters.search);
    router.push(`/?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    const newFilters = {
      ...filters,
      category: category === 'all' ? undefined : category,
    };
    handleFilterChange(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    const newFilters = {
      ...filters,
      sortBy:
        sortBy === 'none' ? undefined : (sortBy as 'price-asc' | 'price-desc'),
    };
    handleFilterChange(newFilters);
  };

  const handleSearchChange = (search: string) => {
    const newFilters = { ...filters, search: search || undefined };
    handleFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    router.push(clearAllParams());
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[280px]">
          <Input
            type="text"
            placeholder="Search products..."
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            fullWidth
          />
        </div>

        <div className="flex items-center gap-3">
          <Select
            value={filters.category || 'all'}
            onChange={(e) => handleCategoryChange(e.target.value)}
            options={[
              { value: 'all', label: 'All Categories' },
              ...categories.map((category) => ({
                value: category.slug,
                label: category.name,
              })),
            ]}
          />

          <Select
            value={filters.sortBy || 'none'}
            onChange={(e) => handleSortChange(e.target.value)}
            options={[
              { value: 'none', label: 'Sort by Price' },
              { value: 'price-asc', label: 'Price: Low to High' },
              { value: 'price-desc', label: 'Price: High to Low' },
            ]}
          />

          {(filters.category || filters.sortBy || filters.search) && (
            <Button variant="secondary" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
