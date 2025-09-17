export const updateSearchParams = (
  searchParams: URLSearchParams,
  key: string,
  value: string,
): string => {
  const params = new URLSearchParams(searchParams.toString());

  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  return `/?${params.toString()}`;
};

export const clearAllParams = (): string => '/';

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(' ');
};

export const cardStyles = {
  base: 'bg-white rounded-lg shadow-sm',
  elevated:
    'bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300',
  premium: 'bg-white rounded-2xl shadow-xl',
  compact: 'bg-white rounded-lg shadow-sm p-4',
  padded: 'bg-white rounded-lg shadow-sm p-6',
  large: 'bg-white rounded-2xl shadow-xl p-8',
};
