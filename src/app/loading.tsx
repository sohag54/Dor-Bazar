import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f3f6f4] p-4 sm:p-8 max-w-6xl mx-auto space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-12 bg-slate-200/70 rounded-2xl w-full"></div>
      
      {/* Hero Skeleton */}
      <div className="h-64 bg-slate-200/70 rounded-3xl w-full"></div>

      {/* Grid Skeletons */}
      <div className="space-y-4">
        <div className="h-6 bg-slate-200/70 rounded w-48"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-28 bg-white border border-slate-200 rounded-2xl p-4"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
