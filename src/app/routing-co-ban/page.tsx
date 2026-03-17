import Link from 'next/link';

const lessons = [
  {
    href: '/routing-co-ban/bai-1-app-router',
    title: 'Bài 1: Cơ chế vận hành của App Router',
    description:
      'Tìm hiểu cách Next.js App Router sử dụng file-based routing để tạo các trang web.',
  },
  {
    href: '/routing-co-ban/bai-2-layout',
    title: 'Bài 2: Hệ thống Layout & Nested Layout',
    description:
      'Sử dụng layout.tsx để chia sẻ giao diện chung giữa các trang, và cách nested layout hoạt động.',
  },
  {
    href: '/routing-co-ban/bai-3-loading',
    title: 'Bài 3: Loading UI',
    description:
      'Tạo loading UI tự động với file loading.tsx và React Suspense.',
  },
  {
    href: '/routing-co-ban/bai-4-error',
    title: 'Bài 4: Xử lý lỗi với Error Boundary',
    description:
      'Sử dụng error.tsx để bắt và hiển thị lỗi một cách thân thiện với người dùng.',
  },
  {
    href: '/routing-co-ban/bai-5-not-found',
    title: 'Bài 5: Xử lý trang không tồn tại',
    description: 'Tùy chỉnh trang 404 với not-found.tsx.',
  },
  {
    href: '/routing-co-ban/bai-6-dynamic-routes',
    title: 'Bài 6: Dynamic Routes',
    description:
      'Tạo các trang động với [slug] và cách đọc params trong App Router.',
  },
  {
    href: '/routing-co-ban/bai-7-route-groups',
    title: 'Bài 7: Route Groups',
    description:
      'Sử dụng (folder) để tổ chức route mà không ảnh hưởng đến URL.',
  },
];

export default function RoutingCobanPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold text-white">
        Chương: Routing Cơ Bản
      </h1>
      <p className="mb-8 text-slate-300">
        Học cách sử dụng hệ thống routing trong Next.js App Router — từ cơ bản
        đến nâng cao.
      </p>

      <div className="flex flex-col gap-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.href}
            href={lesson.href}
            className="group rounded-lg border border-slate-700 p-5 transition-colors hover:border-sky-400 hover:border-sky-500 hover:bg-sky-950"
          >
            <h2 className="mb-1 text-lg font-semibold text-white group-hover:text-sky-400">
              {lesson.title}
            </h2>
            <p className="text-sm text-slate-400">{lesson.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
