'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { authClient } from '@/lib/auth-client';

export default function SignUpClient() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (password !== confirmPassword) {
      setStatus({ type: 'error', text: 'পাসওয়ার্ড দুটি মিলছে না।' });
      return;
    }

    if (password.length < 8) {
      setStatus({ type: 'error', text: 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।' });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      setLoading(false);

      if (error) {
        setStatus({
          type: 'error',
          text: error.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',
        });
        return;
      }

      setStatus({
        type: 'success',
        text: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! সাইন ইন পেজে নেওয়া হচ্ছে...',
      });
      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    } catch (err: unknown) {
      setLoading(false);
      setStatus({
        type: 'error',
        text: 'একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
      });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-normal">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        {status && (
          <div
            className={`mb-4 p-3 rounded-xl text-xs font-medium text-center ${
              status.type === 'error'
                ? 'bg-rose-50 border border-rose-200 text-rose-700'
                : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
            }`}
          >
            {status.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* নাম */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              নাম
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="যেমন: রহিম উদ্দিন"
              className="w-full bg-[#f9fafb] border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#057a3e] focus:bg-white transition-colors"
            />
          </div>

          {/* ইমেইল */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              ইমেইল
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#f9fafb] border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#057a3e] focus:bg-white transition-colors"
            />
          </div>

          {/* পাসওয়ার্ড */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full bg-[#f9fafb] border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#057a3e] focus:bg-white transition-colors"
            />
          </div>

          {/* পাসওয়ার্ড নিশ্চিত করুন */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="আবার লিখুন"
              className="w-full bg-[#f9fafb] border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#057a3e] focus:bg-white transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#057a3e] hover:bg-[#046533] active:bg-[#035229] text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer disabled:opacity-50 mt-1"
          >
            {loading ? 'প্রক্রিয়াকরণ হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-[11px]">
            <span className="px-2.5 bg-white text-slate-400">অথবা</span>
          </div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full py-2 px-2.5 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full py-2 px-2.5 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Bottom signin link */}
        <p className="mt-5 text-center text-xs text-slate-500">
          অ্যাকাউন্ট আছে?{' '}
          <Link href="/signin" className="font-semibold text-[#057a3e] hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      {/* Return to home link */}
      <div className="text-center mt-5">
        <Link
          href="/"
          className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
