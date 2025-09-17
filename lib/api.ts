import { Product, ProductsResponse, ProductFilters } from '@/types/product';

const BASE_URL = 'https://dummyjson.com';

// Cache for API responses
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCacheKey(url: string): string {
  return url;
}

function isValidCache(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_DURATION;
}

async function fetchWithCache<T>(url: string): Promise<T> {
  const cacheKey = getCacheKey(url);
  const cached = cache.get(cacheKey);
  
  if (cached && isValidCache(cached.timestamp)) {
    return cached.data as T;
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Next.js cache for 5 minutes
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Store in cache
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });
    
    return data;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

export async function getProducts(filters?: ProductFilters): Promise<ProductsResponse> {
  let url = `${BASE_URL}/products`;
  const params = new URLSearchParams();
  
  // Add pagination
  params.append('limit', '30');
  
  // Add search if provided
  if (filters?.search) {
    url = `${BASE_URL}/products/search`;
    params.append('q', filters.search);
  }
  
  // Add category filter if provided
  if (filters?.category && filters.category !== 'all') {
    url = `${BASE_URL}/products/category/${encodeURIComponent(filters.category)}`;
  }
  
  const fullUrl = `${url}?${params.toString()}`;
  const response = await fetchWithCache<ProductsResponse>(fullUrl);
  
  // Sort by price if requested
  if (filters?.sortBy) {
    response.products.sort((a, b) => {
      if (filters.sortBy === 'price-asc') {
        return a.price - b.price;
      } else if (filters.sortBy === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });
  }
  
  return response;
}

export async function getProduct(id: number): Promise<Product> {
  const url = `${BASE_URL}/products/${id}`;
  return fetchWithCache<Product>(url);
}

export async function getCategories(): Promise<string[]> {
  const url = `${BASE_URL}/products/categories`;
  const categories = await fetchWithCache<Array<{slug: string; name: string; url: string}>>(url);
  // Extract just the slug values to maintain compatibility
  return categories.map(category => category.slug);
}

// Preload critical product data
export async function preloadProducts(): Promise<void> {
  try {
    await getProducts();
    await getCategories();
  } catch (error) {
    console.error('Failed to preload products:', error);
  }
}