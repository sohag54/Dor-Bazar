import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f3f6f4] px-4 text-center">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm max-w-md w-full">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
          🔍
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">৪০৪</h1>
        <h2 className="text-lg font-bold text-slate-800 mb-2">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ভুল লিংক দেওয়া হয়েছে।
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all"
        >
          <Home className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}
