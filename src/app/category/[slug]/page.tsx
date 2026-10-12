import React from 'react';
import Link from 'next/link';
import { getAllCategories, getAllProducts } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Ticker from '@/components/Ticker';
import Footer from '@/components/Footer';
import CategoryClient from './CategoryClient';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const [allCategories, allProducts] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  const currentCategory = allCategories.find((c) => c.slug === slug);
  const products = allProducts.filter((p) => p.category === slug);

  if (!currentCategory && products.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f3f6f4]">
        <Navbar categories={allCategories} activeCategory={slug} authMode="user" />
        <Ticker products={allProducts} />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white p-10 rounded-3xl border border-slate-200 max-w-md w-full shadow-xs">
            <span className="text-4xl">🔍</span>
            <h1 className="text-xl font-bold text-slate-800 mt-3 mb-2">
              ক্যাটাগরি পাওয়া যায়নি
            </h1>
            <p className="text-xs text-slate-500 mb-6">
              অনুরোধকৃত ক্যাটাগরির কোনো তথ্য বা পণ্য খুঁজে পাওয়া যায়নি।
            </p>
            <Link
              href="/"
              className="inline-block w-full py-2.5 px-4 bg-[#057a3e] hover:bg-[#046533] text-white text-xs font-semibold rounded-xl transition-colors"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <CategoryClient
      category={currentCategory}
      slug={slug}
      categories={allCategories}
      categoryProducts={products}
      allProducts={allProducts}
    />
  );
}
