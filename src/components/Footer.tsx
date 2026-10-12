import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#f3f6f4] border-t border-slate-200 mt-16 py-6 text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <span className="font-medium text-slate-700">বাজার দর</span>
          <span className="mx-1.5">—</span>
          <span>প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
        </div>
        <div className="text-[11px] sm:text-xs text-slate-400">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>
  );
}
