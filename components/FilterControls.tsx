'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Input from './Input';
import Select from './Select';
import { updateSearchParams, clearAllParams } from '@/lib/utils';

import { Category } from '@/types/product';

interface FilterControlsProps {
  categories: Category[];
  compact?: boolean;
  loading?: boolean;
  onLoadingChange?: (loading: boolean) => void;
}

export default function FilterControls({
  categories,
  compact = false,
  loading = false,
  onLoadingChange,
}: FilterControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || '';
  const currentSort = searchParams.get('sort') || 'name';
  const currentSearch = searchParams.get('search') || '';
  const currentPriceRange = searchParams.get('priceRange') || '';
  const currentRating = searchParams.get('rating') || '';

  const updateFilters = (key: string, value: string) => {
    if (onLoadingChange) {
      onLoadingChange(true);
      setTimeout(() => onLoadingChange(false), 300);
    }
    router.push(updateSearchParams(searchParams, key, value));
  };

  const clearFilters = () => {
    router.push(clearAllParams());
  };

  const hasActiveFilters =
    currentCategory ||
    currentSearch ||
    currentPriceRange ||
    currentRating ||
    currentSort !== 'name';

  if (compact) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Input
            label="Search Products"
            type="text"
            placeholder="Search products..."
            value={currentSearch}
            onChange={(e) => updateFilters('search', e.target.value)}
            disabled={loading}
            fullWidth
          />
        </div>

        <div>
          <Select
            label="Category"
            value={currentCategory}
            onChange={(e) => updateFilters('category', e.target.value)}
            options={[
              { value: '', label: 'All Categories' },
              ...categories.map((cat) => ({
                value: cat.slug,
                label: cat.name,
              })),
            ]}
            disabled={loading}
            fullWidth
          />
        </div>

        <div>
          <Select
            label="Sort By"
            value={currentSort}
            onChange={(e) => updateFilters('sort', e.target.value)}
            options={[
              { value: 'name', label: 'Name' },
              { value: 'price-low', label: 'Price: Low to High' },
              { value: 'price-high', label: 'Price: High to Low' },
              { value: 'rating', label: 'Rating' },
              { value: 'newest', label: 'Newest' },
            ]}
            disabled={loading}
            fullWidth
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter Products</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <Input
            label="Search"
            type="text"
            placeholder="Search products..."
            value={currentSearch}
            onChange={(e) => updateFilters('search', e.target.value)}
            fullWidth
          />
        </div>

        <div>
          <Select
            label="Category"
            value={currentCategory}
            onChange={(e) => updateFilters('category', e.target.value)}
            options={[
              { value: '', label: 'All Categories' },
              ...categories.map((cat) => ({
                value: cat.slug,
                label: cat.name,
              })),
            ]}
            fullWidth
          />
        </div>

        <div>
          <Select
            label="Price Range"
            value={currentPriceRange}
            onChange={(e) => updateFilters('priceRange', e.target.value)}
            options={[
              { value: '', label: 'Any Price' },
              { value: '0-50', label: 'Under $50' },
              { value: '50-100', label: '$50 - $100' },
              { value: '100-200', label: '$100 - $200' },
              { value: '200-500', label: '$200 - $500' },
              { value: '500+', label: 'Over $500' },
            ]}
            fullWidth
          />
        </div>

        <div>
          <Select
            label="Rating"
            value={currentRating}
            onChange={(e) => updateFilters('rating', e.target.value)}
            options={[
              { value: '', label: 'Any Rating' },
              { value: '4+', label: '4+ Stars' },
              { value: '3+', label: '3+ Stars' },
              { value: '2+', label: '2+ Stars' },
              { value: '1+', label: '1+ Stars' },
            ]}
            fullWidth
          />
        </div>

        <div>
          <Select
            label="Sort By"
            value={currentSort}
            onChange={(e) => updateFilters('sort', e.target.value)}
            options={[
              { value: 'name', label: 'Name' },
              { value: 'price-asc', label: 'Price: Low to High' },
              { value: 'price-desc', label: 'Price: High to Low' },
              { value: 'rating', label: 'Rating' },
              { value: 'newest', label: 'Newest' },
            ]}
            fullWidth
          />
        </div>
      </div>
    </>
  );
}
