import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর — আজকের নিত্যপণ্যের বাজারদর ও বিশ্লেষণ",
  description: "নিত্যপ্রয়োজনীয় পণ্যের বাজার দর, দামের ওঠানামা এবং বাজারভিত্তিক বিশ্লেষণ এক নজরে।",
  icons: {
    icon: "/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} scroll-smooth`}>
      <body
        className={`${hindSiliguri.className} min-h-screen flex flex-col bg-[#f3f6f4] text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900`}
      >
        {children}
      </body>
    </html>
  );
}
