import HomePage from '@/components/HomePage';

interface SearchParams {
  category?: string;
  sortBy?: 'price-asc' | 'price-desc';
  search?: string;
}

interface HomeProps {
  searchParams: Promise<SearchParams>;
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;
  return <HomePage searchParams={resolvedSearchParams} />;
}
