import { getProducts } from '@/lib/api';
import { useAsync } from './useAsync';

export function useProducts() {
  const {
    data: products,
    loading,
    error,
  } = useAsync(async () => {
    const data = await getProducts();
    return data.products;
  }, []);

  return { products: products || [], loading, error };
}
