import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  type?: 'risers' | 'fallers' | 'default';
}

export default function SectionHeader({
  title,
  subtitle,
  type = 'default',
}: SectionHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-1.5">
        {type === 'risers' && (
          <span className="text-rose-600 font-bold text-base leading-none">▲</span>
        )}
        {type === 'fallers' && (
          <span className="text-emerald-600 font-bold text-base leading-none">▼</span>
        )}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-xs text-slate-500 mt-0.5 font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
