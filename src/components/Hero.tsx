'use client';

import React from 'react';
import Image from 'next/image';
import { getBanglaDate } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const banglaDate = getBanglaDate();

  const handleScrollToProducts = () => {
    const el = document.getElementById('সব-পণ্য');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full pt-4 pb-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#eaf4ed] border border-emerald-200/70 rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xs">
          {/* Left Text Content */}
          <div className="max-w-xl flex flex-col items-start z-10">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-medium mb-3.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>{banglaDate}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-3">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 max-w-lg">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মশলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA Button */}
            <button
              onClick={handleScrollToProducts}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#057a3e] hover:bg-[#046533] active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <span>সব পণ্য দেখুন</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* Right Hero Image */}
          <div className="relative w-48 sm:w-64 md:w-72 aspect-[315/263] flex-shrink-0 z-10 flex items-center justify-center">
            <Image
              src="/bazar-hero.png"
              alt="বাজার দর ফলমূল ও শাকসবজি"
              width={315}
              height={263}
              priority
              className="object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
