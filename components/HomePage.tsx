import { Suspense } from 'react';
import { getProducts, getCategories } from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ProductFiltersClient from '@/components/ProductFiltersClient';
import ProductGridClient from '@/components/ProductGridClient';
import { ProductGridSkeleton } from '@/components/skeletons';

interface SearchParams {
  category?: string;
  sortBy?: 'price-asc' | 'price-desc';
  search?: string;
}

interface HomePageProps {
  searchParams: SearchParams;
}

const FiltersSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex flex-wrap gap-4">
      <div className="h-10 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded-lg w-40 animate-pulse"></div>
    </div>
  </div>
);

export default async function HomePage({ searchParams }: HomePageProps) {
  const productsData = await getProducts(searchParams);
  const categories = await getCategories();

  const totalProducts = productsData.products.length;
  const categoriesCount = categories.length;
  const avgRating =
    productsData.products.reduce((acc, p) => acc + p.rating, 0) / totalProducts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <HeroSection
          title="Premium Products"
          subtitle="Discover our curated collection of high-quality products"
          description="From electronics to fashion, find everything you need"
        />

        <StatsSection
          totalProducts={totalProducts}
          categoriesCount={categoriesCount}
          avgRating={avgRating}
        />

        <div className="mb-8">
          <Suspense fallback={<FiltersSkeleton />}>
            <ProductFiltersClient
              categories={categories}
              initialFilters={searchParams}
            />
          </Suspense>
        </div>

        <div className="mb-8">
          <Suspense fallback={<ProductGridSkeleton count={12} />}>
            <ProductGridClient
              initialProducts={productsData.products}
              initialFilters={searchParams}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
