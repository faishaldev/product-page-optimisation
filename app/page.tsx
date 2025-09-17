'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product, ProductFilters as FilterType } from '@/types/product';
import { getProducts } from '@/lib/api';
import LazyProductCard from '@/components/LazyProductCard';
import ProductFilters from '@/components/ProductFilters';
import { ProductGridSkeleton } from '@/components/skeletons';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize filters from URL parameters
  const [filters, setFilters] = useState<FilterType>({
    category: searchParams.get('category') || undefined,
    sortBy:
      (searchParams.get('sortBy') as 'price-asc' | 'price-desc' | undefined) ||
      undefined,
    search: searchParams.get('search') || undefined,
  });

  // Initialize filters from URL parameters on component mount and URL changes
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
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data.products); // Extract the products array from the response
        setFilteredProducts(data.products);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...products];

      // Apply category filter
      if (filters.category) {
        filtered = filtered.filter(
          (product) => product.category === filters.category,
        );
      }

      // Apply search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filtered = filtered.filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm),
        );
      }

      // Apply sorting
      if (filters.sortBy) {
        if (filters.sortBy === 'price-asc') {
          filtered.sort((a, b) => a.price - b.price);
        } else if (filters.sortBy === 'price-desc') {
          filtered.sort((a, b) => b.price - a.price);
        }
      }

      setFilteredProducts(filtered);
    };

    // Apply filters whenever products or filters change
    if (products.length > 0) {
      applyFilters();
    } else {
      setFilteredProducts([]);
    }
  }, [products, filters]);

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);

    // Update URL parameters
    const params = new URLSearchParams();

    if (newFilters.search) {
      params.set('search', newFilters.search);
    }

    if (newFilters.category) {
      params.set('category', newFilters.category);
    }

    if (newFilters.sortBy) {
      params.set('sortBy', newFilters.sortBy);
    }

    // Update URL without page reload
    const newUrl = params.toString() ? `/?${params.toString()}` : '/';
    router.push(newUrl, { scroll: false });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section Skeleton */}
          <div className="text-center mb-16">
            <div className="h-14 bg-gray-200 rounded-lg w-96 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-80 mx-auto mb-2 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
          </div>

          {/* Stats Section Skeleton */}
          <div className="mb-8 bg-white rounded-2xl shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="h-10 bg-gray-200 rounded w-16 mx-auto mb-2 animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
              </div>
              <div>
                <div className="h-10 bg-gray-200 rounded w-16 mx-auto mb-2 animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded w-28 mx-auto animate-pulse"></div>
              </div>
              <div>
                <div className="h-10 bg-gray-200 rounded w-16 mx-auto mb-2 animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Filters Skeleton */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-wrap gap-4">
                <div className="h-10 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded-lg w-40 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="mb-8">
            <ProductGridSkeleton count={12} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Discover Amazing Products
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Explore our curated collection of high-quality products designed to
            enhance your lifestyle
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {products.length}
              </div>
              <div className="text-gray-700 font-medium">Total Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {filteredProducts.length}
              </div>
              <div className="text-gray-700 font-medium">Showing Results</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Array.isArray(products)
                  ? new Set(products.map((p) => p.category)).size
                  : 0}
              </div>
              <div className="text-gray-700 font-medium">Categories</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ProductFilters
            filters={filters}
            onFiltersChange={handleFilterChange}
          />
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          {!Array.isArray(filteredProducts) || filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-500 text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more results
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <LazyProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4 py-12">
            {/* Hero Section Skeleton */}
            <div className="text-center mb-16">
              <div className="h-14 bg-gray-200 rounded-lg w-96 mx-auto mb-6 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-80 mx-auto mb-2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
            </div>

            {/* Stats Section Skeleton */}
            <div className="mb-8 bg-white rounded-2xl shadow-md p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="h-10 bg-gray-200 rounded w-16 mx-auto mb-2 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
                </div>
                <div>
                  <div className="h-10 bg-gray-200 rounded w-16 mx-auto mb-2 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-28 mx-auto animate-pulse"></div>
                </div>
                <div>
                  <div className="h-10 bg-gray-200 rounded w-16 mx-auto mb-2 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Filters Skeleton */}
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-wrap gap-4">
                  <div className="h-10 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded-lg w-40 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Products Grid Skeleton */}
            <div className="mb-8">
              <ProductGridSkeleton count={12} />
            </div>
          </div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
