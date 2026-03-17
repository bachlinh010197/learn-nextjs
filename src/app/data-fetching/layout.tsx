import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Data Fetching & Caching - Learn Next.js',
  description: 'Tìm hiểu về Data Fetching và Caching trong Next.js',
};

const lessons = [
  {
    href: '/data-fetching/bai-1-phuong-phap',
    title: 'Bài 1: Phương pháp Data Fetching',
  },
  {
    href: '/data-fetching/bai-2-tong-quan-caching',
    title: 'Bài 2: Tổng quan Caching',
  },
  {
    href: '/data-fetching/bai-3-request-memoization',
    title: 'Bài 3: Request Memoization',
  },
  { href: '/data-fetching/bai-4-data-cache', title: 'Bài 4: Data Cache' },
  {
    href: '/data-fetching/bai-5-full-route-cache',
    title: 'Bài 5: Full Route Cache',
  },
  { href: '/data-fetching/bai-6-router-cache', title: 'Bài 6: Router Cache' },
  {
    href: '/data-fetching/bai-7-cache-component',
    title: 'Bài 7: React cache()',
  },
];

export default function DataFetchingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-slate-900">
      <aside className="sticky top-0 h-screen w-72 shrink-0 overflow-y-auto border-r border-slate-700 bg-slate-800 p-6">
        <Link
          href="/data-fetching"
          className="mb-6 block text-lg font-bold text-white"
        >
          📦 Data Fetching &amp; Caching
        </Link>
        <nav className="flex flex-col gap-1">
          {lessons.map((lesson) => (
            <Link
              key={lesson.href}
              href={lesson.href}
              className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
            >
              {lesson.title}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">{children}</main>
    </div>
  );
}
