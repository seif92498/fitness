import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "فورمة — متابع صحتك ولياقتك",
  description: "سجل أكلك وتمرينك وتابع تقدّمك خطوة بخطوة.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar-EG" dir="rtl">
      <body className="bg-slate-100 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
