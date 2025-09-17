import { getProduct } from '@/lib/api';
import { useAsync } from './useAsync';

export function useProduct(productId: string | string[] | undefined) {
  const {
    data: product,
    loading,
    error,
  } = useAsync(
    async () => {
      if (!productId) {
        throw new Error('Product ID is required');
      }

      const id = parseInt(productId as string);
      if (isNaN(id)) {
        throw new Error('Invalid product ID');
      }

      return await getProduct(id);
    },
    [productId],
    { immediate: !!productId },
  );

  return { product, loading, error };
}
