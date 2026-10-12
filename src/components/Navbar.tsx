'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Category } from '@/types';
import { getBanglaDate } from '@/lib/utils';
import { ChevronDown, User, LogOut } from 'lucide-react';

interface NavbarProps {
  categories: Category[];
  activeCategory?: string;
  onSelectCategory?: (slug: string) => void;
  authMode?: 'guest' | 'user';
}

export default function Navbar({
  categories,
  activeCategory = '',
  onSelectCategory,
  authMode = 'user',
}: NavbarProps) {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const banglaDate = getBanglaDate();

  const handleCategoryClick = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
    } else {
      router.push(`/category/${slug}`);
    }
  };

  return (
    <header className="w-full bg-[#f3f6f4] border-b border-slate-200/80 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
      {/* Top Navbar Row */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo & Bangla Date */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#057a3e] flex items-center justify-center shadow-xs group-hover:bg-[#046533] transition-colors">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={18}
              height={18}
              priority
              className="w-4.5 h-4.5 object-contain brightness-0 invert"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                বাজার দর
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
              {banglaDate}
            </span>
          </div>
        </Link>

        {/* Right Auth / Profile Button */}
        {authMode === 'guest' ? (
          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors px-2 py-1"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="px-4 py-1.5 rounded-lg bg-[#057a3e] hover:bg-[#046533] text-white text-xs font-semibold shadow-xs transition-all"
            >
              সাইন আপ
            </Link>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/80 border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all text-xs font-medium text-slate-700 cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-[10px] font-bold text-amber-800 overflow-hidden">
                <span className="text-xs">🧔🏻‍♂️</span>
              </div>
              <span className="font-semibold text-slate-800">Rezwan</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-150 py-1.5 z-50 text-xs">
                <div className="px-3.5 py-2 border-b border-slate-100">
                  <p className="font-semibold text-slate-800">Rezwan Ahmed</p>
                  <p className="text-[11px] text-slate-400 truncate">rezwanahmed@gmail.com</p>
                </div>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 text-slate-700 transition-colors"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>আমার প্রোফাইল</span>
                </Link>
                <Link
                  href="/signin"
                  className="flex items-center gap-2 px-3.5 py-2 hover:bg-rose-50 text-rose-600 transition-colors border-t border-slate-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>সাইন আউট</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Category Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 overflow-x-auto no-scrollbar">
        <nav className="flex items-center gap-2 min-w-max pb-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#057a3e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
