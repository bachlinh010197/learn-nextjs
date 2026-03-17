import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Rendering Strategies - Learn Next.js',
  description: 'Tìm hiểu các chiến lược rendering trong Next.js',
};

const lessons = [
  {
    href: '/rendering/bai-1-spa-seo',
    title: 'Bài 1: SPA & SEO',
    desc: 'Tại sao SPA truyền thống (React) gặp vấn đề SEO và server rendering giải quyết như thế nào.',
  },
  {
    href: '/rendering/bai-2-tong-quan',
    title: 'Bài 2: Tổng quan Rendering',
    desc: 'Tổng quan các chiến lược rendering: CSR, SSR, SSG, ISR, Streaming với bảng so sánh.',
  },
  {
    href: '/rendering/bai-3-server-client-components',
    title: 'Bài 3: Server & Client Components',
    desc: 'Sự khác biệt giữa Server Components và Client Components, khi nào dùng, cơ chế hydration.',
  },
  {
    href: '/rendering/bai-4-boundary',
    title: 'Bài 4: Server-Client Boundary',
    desc: 'Ranh giới giữa Server và Client, các lỗi thường gặp và cách xử lý.',
  },
  {
    href: '/rendering/bai-5-csr',
    title: 'Bài 5: Client-Side Rendering (CSR)',
    desc: 'Demo CSR với "use client" và useEffect để fetch dữ liệu phía client.',
  },
  {
    href: '/rendering/bai-6-static-dynamic',
    title: 'Bài 6: Static vs Dynamic Rendering',
    desc: 'Phân biệt Static Rendering và Dynamic Rendering, khi nào Next.js chọn cái nào.',
  },
  {
    href: '/rendering/bai-7-ssr',
    title: 'Bài 7: SSR & Dynamic APIs',
    desc: 'Server-Side Rendering với cookies(), headers(), searchParams.',
  },
  {
    href: '/rendering/bai-8-streaming',
    title: 'Bài 8: Streaming & Suspense',
    desc: 'Streaming HTML với React Suspense boundaries để cải thiện UX.',
  },
  {
    href: '/rendering/bai-9-isr',
    title: 'Bài 9: ISR (Incremental Static Regeneration)',
    desc: 'Tái tạo trang tĩnh theo thời gian với revalidate.',
  },
  {
    href: '/rendering/bai-10-ssg',
    title: 'Bài 10: SSG (Static Site Generation)',
    desc: 'Tạo trang tĩnh với generateStaticParams cho dynamic routes.',
  },
];

export default function RenderingPage() {
  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold text-white">
        📖 Rendering Strategies trong Next.js
      </h1>
      <p className="mb-10 text-lg text-slate-300">
        Chương này sẽ giúp bạn hiểu rõ tất cả các chiến lược rendering trong
        Next.js — từ CSR, SSR, SSG, ISR đến Streaming. Mỗi bài học đều có giải
        thích chi tiết và ví dụ thực tế.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {lessons.map((lesson, i) => (
          <Link
            key={lesson.href}
            href={lesson.href}
            className="group rounded-xl border border-slate-700 bg-slate-800 p-6 transition-all hover:border-blue-300 hover:shadow-md"
          >
            <span className="mb-2 inline-block rounded-full bg-sky-900 px-2.5 py-0.5 text-xs font-medium text-sky-400">
              {i + 1} / {lessons.length}
            </span>
            <h2 className="mb-2 text-lg font-semibold text-white group-hover:text-sky-400">
              {lesson.title}
            </h2>
            <p className="text-sm text-slate-400">{lesson.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
