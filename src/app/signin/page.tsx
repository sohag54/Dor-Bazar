import React from 'react';
import { getAllCategories, getAllProducts } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Ticker from '@/components/Ticker';
import Footer from '@/components/Footer';
import SignInClient from './SignInClient';

export default async function SignInPage() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f6f4]">
      {/* Navbar in Guest auth mode matching Figma */}
      <Navbar categories={categories} authMode="guest" />

      {/* Marquee Ticker */}
      <Ticker products={products} />

      {/* Sign In Body Content */}
      <main className="flex-1 flex flex-col justify-center py-10 px-4 sm:px-6">
        <SignInClient />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
