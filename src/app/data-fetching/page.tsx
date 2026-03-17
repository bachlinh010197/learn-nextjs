import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Data Fetching & Caching - Learn Next.js',
};

const lessons = [
  {
    href: '/data-fetching/bai-1-phuong-phap',
    title: 'Bài 1: Phương pháp Data Fetching',
    description:
      'Tìm hiểu các cách lấy dữ liệu trong Next.js: fetch() trên server, Route Handlers, Server Actions và thư viện bên thứ ba.',
  },
  {
    href: '/data-fetching/bai-2-tong-quan-caching',
    title: 'Bài 2: Tổng quan về Caching',
    description:
      'Hiểu 4 tầng caching trong Next.js: Request Memoization, Data Cache, Full Route Cache và Router Cache.',
  },
  {
    href: '/data-fetching/bai-3-request-memoization',
    title: 'Bài 3: Request Memoization',
    description:
      'React tự động loại bỏ các fetch request trùng lặp trong cùng một lần render. Tìm hiểu cơ chế hoạt động.',
  },
  {
    href: '/data-fetching/bai-4-data-cache',
    title: 'Bài 4: Data Cache',
    description:
      "Tìm hiểu cache: 'force-cache', 'no-store', revalidate và cách kiểm soát Data Cache.",
  },
  {
    href: '/data-fetching/bai-5-full-route-cache',
    title: 'Bài 5: Full Route Cache & connection()',
    description:
      'Next.js cache toàn bộ HTML/RSC payload của route. Tìm hiểu khi nào cache bị vô hiệu hoá.',
  },
  {
    href: '/data-fetching/bai-6-router-cache',
    title: 'Bài 6: Router Cache',
    description:
      'Cache phía client cho điều hướng, hành vi prefetching và cấu hình staleTimes.',
  },
  {
    href: '/data-fetching/bai-7-cache-component',
    title: 'Bài 7: React cache()',
    description:
      'Sử dụng React.cache để memoize kết quả hàm tính toán và chia sẻ dữ liệu giữa các component.',
  },
];

export default function DataFetchingPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-4xl font-bold text-white">
        📦 Data Fetching &amp; Caching
      </h1>
      <p className="mb-8 text-lg text-slate-300">
        Chương này sẽ giúp bạn hiểu rõ cách lấy dữ liệu và các chiến lược
        caching trong Next.js. Từ việc sử dụng <code>fetch()</code> trên server
        cho đến việc tối ưu hiệu suất với 4 tầng caching mà Next.js cung cấp.
      </p>

      <div className="grid gap-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.href}
            href={lesson.href}
            className="group rounded-xl border border-slate-700 bg-slate-800 p-6 transition-all hover:border-slate-500 hover:border-slate-600 hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-semibold text-white group-hover:text-sky-400">
              {lesson.title}
            </h2>
            <p className="text-sm text-slate-400">{lesson.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
