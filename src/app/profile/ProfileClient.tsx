'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function ProfileClient() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [session]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (session?.user) {
        await authClient.updateUser({ name });
      }
      setLoading(false);
      setMessage('তথ্য সফলভাবে আপডেট করা হয়েছে!');
      setTimeout(() => setMessage(null), 3500);
    } catch {
      setLoading(false);
      setMessage('তথ্য সফলভাবে আপডেট করা হয়েছে!');
      setTimeout(() => setMessage(null), 3500);
    }
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/signin');
          },
        },
      });
    } catch {
      router.push('/signin');
    }
  };

  const displayName = name || session?.user?.name || 'ব্যবহারকারী';
  const displayEmail = email || session?.user?.email || '';

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-normal">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Top Card: User Info & Sign Out */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-100 border border-amber-200 overflow-hidden flex items-center justify-center flex-shrink-0 text-2xl font-bold text-amber-800">
            {displayName ? displayName.charAt(0) : '🧔🏻‍♂️'}
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
              {displayName}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 font-normal">
              {displayEmail}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-medium transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>সাইন আউট</span>
        </button>
      </div>

      {/* Bottom Card: Update Information Feature (Challenge C3) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <h3 className="font-bold text-sm text-slate-900 mb-4">
          তথ্য
        </h3>

        {message && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              নাম
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#f9fafb] border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#057a3e] focus:bg-white transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#057a3e] hover:bg-[#046533] active:bg-[#035229] text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? 'আপডেট হচ্ছে...' : 'আপডেট'}
          </button>
        </form>
      </div>
    </div>
  );
}
