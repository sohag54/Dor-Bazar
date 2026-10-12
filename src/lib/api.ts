import { Category, Product } from '@/types';

const API_BASES = [
  'https://openapi.programming-hero.com/api/bazardor',
  'https://api.api-store.workers.dev/api/bazardor',
  'https://api.abcz.workers.dev/api/bazardor',
];

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  let lastError: unknown = null;

  for (const base of API_BASES) {
    try {
      const res = await fetch(`${base}${endpoint}`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        return (await res.json()) as T;
      }
    } catch (err) {
      lastError = err;
      // Try next base URL
    }
  }

  throw new Error(`Failed to fetch from all API endpoints: ${String(lastError)}`);
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    return await fetchFromApi<Product[]>('/products');
  } catch (err) {
    console.error('Error fetching all products:', err);
    return [];
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    return await fetchFromApi<Category[]>('/categories');
  } catch (err) {
    console.error('Error fetching categories:', err);
    return [];
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    return await fetchFromApi<Product[]>(`/products?category=${encodeURIComponent(categorySlug)}`);
  } catch (err) {
    console.error(`Error fetching products for category ${categorySlug}:`, err);
    return [];
  }
}

export async function getProductById(id: string | number): Promise<Product | null> {
  try {
    return await fetchFromApi<Product>(`/products/${id}`);
  } catch (err) {
    console.error(`Error fetching product ${id}:`, err);
    return null;
  }
}
