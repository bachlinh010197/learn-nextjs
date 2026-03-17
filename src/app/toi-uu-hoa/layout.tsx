import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tối ưu hóa & SEO | Learn Next.js',
  description: 'Học cách tối ưu hóa ứng dụng Next.js và SEO',
};

const lessons = [
  { href: '/toi-uu-hoa/bai-1-metadata-seo', label: 'Bài 1: Metadata & SEO' },
  { href: '/toi-uu-hoa/bai-2-seo-khac', label: 'Bài 2: Các yếu tố SEO khác' },
  {
    href: '/toi-uu-hoa/bai-3-navigation-prefetch',
    label: 'Bài 3: Navigation & Prefetch',
  },
  { href: '/toi-uu-hoa/bai-4-font', label: 'Bài 4: Tối ưu Font' },
  { href: '/toi-uu-hoa/bai-5-image', label: 'Bài 5: Tối ưu Image' },
  { href: '/toi-uu-hoa/bai-6-script', label: 'Bài 6: Quản lý Script' },
  { href: '/toi-uu-hoa/bai-7-form', label: 'Bài 7: Quản lý Form' },
  { href: '/toi-uu-hoa/bai-8-proxy', label: 'Bài 8: Làm việc với Proxy' },
];

export default function ToiUuHoaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-slate-900">
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 overflow-y-auto border-r border-slate-700 bg-slate-800 p-6 lg:block">
        <Link
          href="/toi-uu-hoa"
          className="mb-6 block text-lg font-bold text-white"
        >
          📈 Tối ưu hóa & SEO
        </Link>
        <nav className="flex flex-col gap-1">
          {lessons.map((lesson) => (
            <Link
              key={lesson.href}
              href={lesson.href}
              className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
            >
              {lesson.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 px-6 py-10 md:px-12 lg:px-16">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
