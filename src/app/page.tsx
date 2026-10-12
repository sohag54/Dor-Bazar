import { getAllCategories, getAllProducts } from '@/lib/api';
import HomeClient from '@/components/HomeClient';
import { Category, Product } from '@/types';

// Fallback categories in case API is temporarily unavailable
const fallbackCategories: Category[] = [
  { id: 'chal', slug: 'chal', nameBn: 'চাল', icon: '🍚' },
  { id: 'dal', slug: 'dal', nameBn: 'ডাল', icon: '🫘' },
  { id: 'tel', slug: 'tel', nameBn: 'তেল', icon: '🛢️' },
  { id: 'sobji', slug: 'sobji', nameBn: 'সবজি', icon: '🥬' },
  { id: 'mach', slug: 'mach', nameBn: 'মাছ', icon: '🐟' },
  { id: 'mangsho', slug: 'mangsho', nameBn: 'মাংস', icon: '🍗' },
  { id: 'dim-dui', slug: 'dim-dui', nameBn: 'ডিম-দুধ', icon: '🥛' },
  { id: 'mosla', slug: 'mosla', nameBn: 'মসলা', icon: '🌶️' },
];

export default async function HomePage() {
  let products: Product[] = [];
  let categories: Category[] = [];

  try {
    const [fetchedProducts, fetchedCategories] = await Promise.all([
      getAllProducts(),
      getAllCategories(),
    ]);

    products = fetchedProducts;
    categories = fetchedCategories.length > 0 ? fetchedCategories : fallbackCategories;
  } catch (error) {
    console.error('Failed to fetch home page data:', error);
    categories = fallbackCategories;
  }

  return <HomeClient products={products} categories={categories} />;
}
