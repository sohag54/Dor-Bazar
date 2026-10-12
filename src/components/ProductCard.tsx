'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { formatBnPrice, formatBnUnit, toBnNumber } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const isFlat = !isUp && !isDown;
  const pct = Math.abs(product.change?.pct ?? 0).toFixed(1);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs hover:shadow-md hover:border-emerald-300 hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex flex-col h-full justify-between gap-4">
        {/* Top: Icon + Title + Unit */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#f8faf8] border border-slate-150 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
            {product.image || product.categoryIcon || '🧺'}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-tight truncate group-hover:text-emerald-700 transition-colors">
              {product.nameBn}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-normal">
              {formatBnUnit(product.unit)}
            </p>
          </div>
        </div>

        {/* Bottom: Price + Percentage Change Badge */}
        <div className="flex items-end justify-between pt-1 border-t border-slate-100">
          <div>
            <span className="block text-[11px] text-slate-400 font-normal leading-tight">
              আজকের দাম
            </span>
            <span className="block font-bold text-slate-900 text-base sm:text-lg leading-tight mt-0.5">
              {formatBnPrice(product.today)} টাকা
            </span>
          </div>

          <div>
            {isUp && (
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-md bg-rose-50 text-rose-600 border border-rose-200">
                ▲ {toBnNumber(pct)}%
              </span>
            )}
            {isDown && (
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200">
                ▼ {toBnNumber(pct)}%
              </span>
            )}
            {isFlat && (
              <span className="inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-200">
                — ০.০%
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
