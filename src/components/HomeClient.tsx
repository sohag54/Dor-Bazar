'use client';

import React, { useState } from 'react';
import { Category, Product } from '@/types';
import Navbar from './Navbar';
import Ticker from './Ticker';
import Hero from './Hero';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';
import Footer from './Footer';
import { toBnNumber } from '@/lib/utils';

interface HomeClientProps {
  products: Product[];
  categories: Category[];
}

export default function HomeClient({
  products,
  categories,
}: HomeClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Risers: Top 6 price increases sorted by highest percentage
  const risers = [...products]
    .filter((p) => p.change && p.change.dir === 'up')
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  // Fallers: Top 6 price drops sorted by largest drop percentage
  const fallers = [...products]
    .filter((p) => p.change && p.change.dir === 'down')
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  // Filtered products for the "সব পণ্য" section
  const displayedProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const selectedCategoryObj = categories.find((c) => c.slug === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f6f4]">
      {/* Top Navigation */}
      <Navbar
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={(slug) => {
          setActiveCategory(slug);
          if (slug !== 'all') {
            const el = document.getElementById('সব-পণ্য');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
      />

      {/* Real-time Ticker Strip */}
      <Ticker products={products} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-10">
        {/* Hero Banner */}
        <Hero />

        {/* Section A: আজ দাম বেড়েছে ▲ */}
        <section aria-labelledby="risers-heading">
          <SectionHeader
            title="আজ দাম বেড়েছে"
            type="risers"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {risers.map((product) => (
              <ProductCard key={`riser-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Section B: আজ দাম কমেছে ▼ */}
        <section aria-labelledby="fallers-heading">
          <SectionHeader
            title="আজ দাম কমেছে"
            type="fallers"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fallers.map((product) => (
              <ProductCard key={`faller-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Section C: সব পণ্য */}
        <section id="সব-পণ্য" className="pt-2" aria-labelledby="all-products-heading">
          <SectionHeader
            title={selectedCategoryObj ? `${selectedCategoryObj.nameBn} বিভাগীয় পণ্য` : 'সব পণ্য'}
            subtitle={`মোট ${toBnNumber(displayedProducts.length)} টি পণ্য দেখানো হচ্ছে`}
            type="default"
          />

          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedProducts.map((product) => (
                <ProductCard key={`all-${product.id}`} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <p className="text-4xl mb-3">🧺</p>
              <h3 className="text-base font-bold text-slate-800">কোনো পণ্য পাওয়া যায়নি</h3>
              <p className="text-xs text-slate-500 mt-1">
                এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য তালিকাভুক্ত নেই।
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                সব পণ্য দেখুন
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
