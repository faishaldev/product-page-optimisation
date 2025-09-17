import {
  Product,
  ProductsResponse,
  ProductFilters,
  Category,
} from '@/types/product';

const BASE_URL = 'https://dummyjson.com';

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000;

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
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

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

export async function getProducts(
  filters?: ProductFilters,
): Promise<ProductsResponse> {
  let url = `${BASE_URL}/products`;
  const params = new URLSearchParams();

  params.append('limit', '30');

  if (filters?.search) {
    url = `${BASE_URL}/products/search`;
    params.append('q', filters.search);
  }

  if (filters?.category && filters.category !== 'all') {
    url = `${BASE_URL}/products/category/${encodeURIComponent(
      filters.category,
    )}`;
  }

  const fullUrl = `${url}?${params.toString()}`;
  const response = await fetchWithCache<ProductsResponse>(fullUrl);

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

export async function getCategories(): Promise<Category[]> {
  const url = `${BASE_URL}/products/categories`;
  const categories = await fetchWithCache<Category[]>(url);
  return categories;
}

export async function preloadProducts(): Promise<void> {
  try {
    await getProducts();
    await getCategories();
  } catch (error) {
    console.error('Failed to preload products:', error);
  }
}
