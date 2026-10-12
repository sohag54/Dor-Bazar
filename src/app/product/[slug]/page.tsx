import React from 'react';
import Link from 'next/link';
import { getAllCategories, getAllProducts } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Ticker from '@/components/Ticker';
import Footer from '@/components/Footer';
import { formatBnPrice, formatBnUnit, toBnNumber } from '@/lib/utils';
import { ArrowLeft, Store, TrendingUp, TrendingDown, Tag } from 'lucide-react';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;

  const [categories, allProducts] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  const product = allProducts.find((p) => p.slug === slug || String(p.id) === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f3f6f4]">
        <Navbar categories={categories} authMode="user" />
        <Ticker products={allProducts} />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white p-10 rounded-3xl border border-slate-200 max-w-md w-full shadow-xs">
            <span className="text-4xl">🔍</span>
            <h1 className="text-xl font-bold text-slate-800 mt-3 mb-2">
              পণ্যটি খুঁজে পাওয়া যায়নি
            </h1>
            <p className="text-xs text-slate-500 mb-6">
              অনুরোধকৃত পণ্যের কোনো বিবরণ বা তথ্য পাওয়া যায়নি।
            </p>
            <Link
              href="/"
              className="inline-block w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate min, max, average prices across markets
  const markets = product.markets || [];
  const minPrices = markets.map((m) => m.min).filter((p) => typeof p === 'number' && !isNaN(p));
  const maxPrices = markets.map((m) => m.max).filter((p) => typeof p === 'number' && !isNaN(p));

  const minPrice = minPrices.length > 0 ? Math.min(...minPrices) : product.today;
  const maxPrice = maxPrices.length > 0 ? Math.max(...maxPrices) : product.today;
  const avgPrice =
    markets.length > 0
      ? Math.round(
          markets.reduce((acc, curr) => acc + (curr.min + curr.max) / 2, 0) / markets.length
        )
      : product.today;

  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const pct = Math.abs(product.change?.pct ?? 0).toFixed(1);

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f6f4]">
      <Navbar categories={categories} activeCategory={product.category} authMode="user" />
      <Ticker products={allProducts} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-emerald-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>

        {/* Top Product Summary Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#f8faf8] border border-slate-200 flex items-center justify-center text-4xl shadow-xs">
                {product.image || product.categoryIcon || '🧺'}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
                    <Tag className="w-3 h-3" />
                    <span>{product.categoryNameBn || product.category}</span>
                  </span>
                  <span className="text-xs text-slate-400 font-normal">
                    {formatBnUnit(product.unit)}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {product.nameBn}
                </h1>
              </div>
            </div>

            {/* Current Price and Change Pill */}
            <div className="flex flex-col sm:items-end">
              <span className="text-xs text-slate-400 font-normal">আজকের গড় মূল্য</span>
              <div className="flex items-center gap-2.5 mt-0.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {formatBnPrice(product.today)} টাকা
                </span>
                {isUp && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>▲ {toBnNumber(pct)}%</span>
                  </span>
                )}
                {isDown && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>▼ {toBnNumber(pct)}%</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Price Summary 3-Column Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="bg-[#f8faf8] rounded-2xl p-4 border border-slate-150">
              <span className="text-xs text-slate-500 font-medium">সর্বনিম্ন দাম</span>
              <p className="text-xl font-bold text-slate-900 mt-1">
                {formatBnPrice(minPrice)} টাকা
              </p>
              <span className="text-[11px] text-slate-400 mt-0.5 block">বিভিন্ন বাজার পর্যালোচনা</span>
            </div>

            <div className="bg-[#f8faf8] rounded-2xl p-4 border border-slate-150">
              <span className="text-xs text-slate-500 font-medium">গড় দাম</span>
              <p className="text-xl font-bold text-emerald-700 mt-1">
                {formatBnPrice(avgPrice)} টাকা
              </p>
              <span className="text-[11px] text-slate-400 mt-0.5 block">সারাদেশের গড় মূল্য</span>
            </div>

            <div className="bg-[#f8faf8] rounded-2xl p-4 border border-slate-150">
              <span className="text-xs text-slate-500 font-medium">সর্বোচ্চ দাম</span>
              <p className="text-xl font-bold text-rose-600 mt-1">
                {formatBnPrice(maxPrice)} টাকা
              </p>
              <span className="text-[11px] text-slate-400 mt-0.5 block">সর্বোচ্চ খুচরা দর</span>
            </div>
          </div>
        </div>

        {/* বাজারভিত্তিক আজকের দাম (Markets Breakdown Table/Grid) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Store className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900">
              বাজারভিত্তিক আজকের দাম
            </h2>
          </div>

          {markets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-medium">
                    <th className="pb-3 pr-4">বাজারের নাম</th>
                    <th className="pb-3 px-4">বিভাগ</th>
                    <th className="pb-3 px-4 text-right">সর্বনিম্ন দর</th>
                    <th className="pb-3 pl-4 text-right">সর্বোচ্চ দর</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {markets.map((m, idx) => (
                    <tr key={`${m.market}-${idx}`} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 pr-4 font-semibold text-slate-800">
                        {m.market}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {m.division}
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-slate-700">
                        {formatBnPrice(m.min)} টাকা
                      </td>
                      <td className="py-3.5 pl-4 text-right font-semibold text-slate-900">
                        {formatBnPrice(m.max)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-slate-500">বাজারভিত্তিক তথ্য পাওয়া যায়নি।</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
