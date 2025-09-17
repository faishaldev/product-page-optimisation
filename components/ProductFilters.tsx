'use client';

import { useState, useEffect } from 'react';
import { getCategories } from '@/lib/api';
import { ProductFilters as Filters } from '@/types/product';

interface ProductFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export default function ProductFilters({
  filters,
  onFiltersChange,
}: ProductFiltersProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: category === 'all' ? undefined : category,
    });
  };

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({
      ...filters,
      sortBy:
        sortBy === 'none' ? undefined : (sortBy as 'price-asc' | 'price-desc'),
    });
  };

  const handleSearchChange = (search: string) => {
    onFiltersChange({
      ...filters,
      search: search.trim() || undefined,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">
        Filter & Sort Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-800 mb-2"
          >
            Search Products
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by name..."
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-800 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            value={filters.category || 'all'}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 cursor-pointer appearance-none bg-white"
            disabled={loading}
          >
            <option value="all" className="cursor-pointer">
              All Categories
            </option>
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="cursor-pointer"
              >
                {typeof category === 'string'
                  ? category.charAt(0).toUpperCase() +
                    category.slice(1).replace(/-/g, ' ')
                  : String(category)}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-7">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Sort by Price */}
        <div className="relative">
          <label
            htmlFor="sort"
            className="block text-sm font-medium text-gray-800 mb-2"
          >
            Sort by Price
          </label>
          <select
            id="sort"
            value={filters.sortBy || 'none'}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 cursor-pointer appearance-none bg-white"
          >
            <option value="none" className="cursor-pointer">
              Default
            </option>
            <option value="price-asc" className="cursor-pointer">
              Price: Low to High
            </option>
            <option value="price-desc" className="cursor-pointer">
              Price: High to Low
            </option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-7">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.category || filters.sortBy || filters.search) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-700 font-medium">
              Active filters:
            </span>

            {filters.search && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Search: &ldquo;{filters.search}&rdquo;
                <button
                  onClick={() => handleSearchChange('')}
                  className="ml-1 text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  ×
                </button>
              </span>
            )}

            {filters.category && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {filters.category.charAt(0).toUpperCase() +
                  filters.category.slice(1).replace('-', ' ')}
                <button
                  onClick={() => handleCategoryChange('all')}
                  className="ml-1 text-green-600 hover:text-green-800 cursor-pointer"
                >
                  ×
                </button>
              </span>
            )}

            {filters.sortBy && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {filters.sortBy === 'price-asc'
                  ? 'Price: Low to High'
                  : 'Price: High to Low'}
                <button
                  onClick={() => handleSortChange('none')}
                  className="ml-1 text-purple-600 hover:text-purple-800 cursor-pointer"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
