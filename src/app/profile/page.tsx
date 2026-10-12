import React from 'react';
import { getAllCategories, getAllProducts } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Ticker from '@/components/Ticker';
import Footer from '@/components/Footer';
import ProfileClient from './ProfileClient';

export default async function ProfilePage() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f6f4]">
      {/* Navbar with Rezwan profile */}
      <Navbar categories={categories} authMode="user" />

      {/* Marquee Ticker */}
      <Ticker products={products} />

      {/* Main Profile Body Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-10 space-y-6">
        <ProfileClient />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
