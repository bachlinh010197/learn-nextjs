import Link from 'next/link';

const lessons = [
  {
    href: '/routing-nang-cao/bai-1-templates',
    title: 'Bài 1: Templates',
    description:
      'Tìm hiểu sự khác biệt giữa layout.tsx và template.tsx, khi nào template re-mount khi điều hướng.',
  },
  {
    href: '/routing-nang-cao/bai-2-parallel-routes',
    title: 'Bài 2: Parallel Routes',
    description:
      'Hiểu quy ước @folder, render đồng thời nhiều trang và default.tsx.',
  },
  {
    href: '/routing-nang-cao/bai-3-intercepting-routes',
    title: 'Bài 3: Intercepting Routes',
    description:
      'Tìm hiểu các quy ước (.) (..) (..)(..) (...) và ứng dụng với modal.',
  },
  {
    href: '/routing-nang-cao/bai-4-after-function',
    title: 'Bài 4: After Function',
    description:
      'Sử dụng unstable_after / after để chạy code sau khi response đã được gửi.',
  },
];

export default function RoutingNangCaoPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold text-white">
        Chương: Routing Nâng Cao
      </h1>
      <p className="mb-8 text-slate-300">
        Khám phá các tính năng routing nâng cao trong Next.js App Router:
        Templates, Parallel Routes, Intercepting Routes và After Function.
      </p>

      <div className="grid gap-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.href}
            href={lesson.href}
            className="block rounded-lg border border-slate-700 bg-slate-800 p-6 transition-shadow hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-semibold text-white">
              {lesson.title}
            </h2>
            <p className="text-sm text-slate-300">{lesson.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
