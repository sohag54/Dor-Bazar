'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { formatBnPrice, toBnNumber } from '@/lib/utils';

interface TickerProps {
  products: Product[];
}

export default function Ticker({ products }: TickerProps) {
  // Focus on items with notable price movement
  const tickerItems = products.length > 0 
    ? products.filter((p) => p.change && Math.abs(p.change.pct) > 0)
    : [];

  const items = tickerItems.length > 0 ? tickerItems : products;

  if (items.length === 0) return null;

  return (
    <div className="w-full bg-[#f8faf8] border-y border-emerald-100/60 overflow-hidden py-2 select-none">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs text-slate-600">
        {/* Render twice for continuous loop */}
        {[...items, ...items].map((product, idx) => {
          const isUp = product.change?.dir === 'up';
          const isDown = product.change?.dir === 'down';
          const pct = Math.abs(product.change?.pct ?? 0).toFixed(1);

          return (
            <Link
              key={`${product.id}-${idx}`}
              href={`/product/${product.slug}`}
              className="inline-flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
              <span className="font-medium text-slate-800">{product.nameBn}</span>
              <span className="text-slate-500">
                ({product.unit === 'kg' ? 'প্রতি কেজি' : product.unit}):
              </span>
              <span className="font-semibold text-slate-900">
                {formatBnPrice(product.today)} টাকা
              </span>
              {isUp && (
                <span className="font-semibold text-rose-600 inline-flex items-center">
                  ▲ {toBnNumber(pct)}%
                </span>
              )}
              {isDown && (
                <span className="font-semibold text-emerald-600 inline-flex items-center">
                  ▼ {toBnNumber(pct)}%
                </span>
              )}
              <span className="text-slate-300 mx-2">|</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
