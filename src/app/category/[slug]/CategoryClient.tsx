'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Category, Product } from '@/types';
import Navbar from '@/components/Navbar';
import Ticker from '@/components/Ticker';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { toBnNumber } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface CategoryClientProps {
  category?: Category;
  slug: string;
  categories: Category[];
  categoryProducts: Product[];
  allProducts: Product[];
}

export default function CategoryClient({
  category,
  slug,
  categories,
  categoryProducts,
  allProducts,
}: CategoryClientProps) {
  const router = useRouter();
  const [sortOption, setSortOption] = useState<'default' | 'asc' | 'desc'>('default');

  const sortedProducts = useMemo(() => {
    const list = [...categoryProducts];
    if (sortOption === 'asc') {
      return list.sort((a, b) => a.today - b.today);
    }
    if (sortOption === 'desc') {
      return list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [categoryProducts, sortOption]);

  const categoryName = category?.nameBn || slug;
  const categoryIcon = category?.icon || '🧺';

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f6f4]">
      {/* Navbar with Rezwan profile and active category */}
      <Navbar
        categories={categories}
        activeCategory={slug}
        authMode="user"
        onSelectCategory={(selectedSlug) => {
          if (selectedSlug === 'all') {
            router.push('/');
          } else {
            router.push(`/category/${selectedSlug}`);
          }
        }}
      />

      {/* Marquee Ticker */}
      <Ticker products={allProducts} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-4">
        {/* Top Category Info Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex items-center gap-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#f8faf8] border border-slate-150 flex items-center justify-center text-3xl flex-shrink-0">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {categoryName}
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-normal">
              {toBnNumber(categoryProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Sort Bar Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 px-5 py-3 flex items-center justify-end shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-medium">সাজান</span>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as 'default' | 'asc' | 'desc')}
                aria-label="পণ্য সাজান"
                className="appearance-none bg-white border border-slate-200 text-slate-800 text-xs rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:border-[#057a3e] font-medium cursor-pointer"
              >
                <option value="default">ডিফল্ট</option>
                <option value="asc">দাম: কম থেকে বেশি</option>
                <option value="desc">দাম: বেশি থেকে কম</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Counter subtitle */}
        <div className="pt-2 pb-1">
          <p className="text-xs text-slate-500 font-normal">
            মোট {toBnNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
            <p className="text-4xl mb-3">🧺</p>
            <h2 className="text-base font-bold text-slate-800">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h2>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              অন্য কোনো ক্যাটাগরি দেখতে পারেন অথবা মূল পাতায় ফিরে যান।
            </p>
            <button
              onClick={() => router.push('/')}
              className="inline-block px-5 py-2.5 bg-[#057a3e] hover:bg-[#046533] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              হোম পেজে ফিরে যান
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
