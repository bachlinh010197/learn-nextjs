import Link from 'next/link';

const lessons = [
  {
    href: '/server-actions/bai-1-route-handlers',
    title: 'Bài 1: Route Handlers',
    description:
      'Tìm hiểu cách tạo API routes bằng file route.ts, xử lý các phương thức GET, POST, PUT, DELETE và làm việc với Request/Response.',
  },
  {
    href: '/server-actions/bai-2-server-actions',
    title: 'Bài 2: Server Actions',
    description:
      'Tìm hiểu directive "use server", form actions, mutation dữ liệu và revalidation sau khi thay đổi dữ liệu.',
  },
];

export default function ServerActionsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-3xl font-bold text-white">
        Chương: Server Actions & Route Handlers
      </h1>
      <p className="mb-8 text-lg text-slate-300">
        Trong chương này, bạn sẽ học cách xây dựng API và xử lý dữ liệu phía
        server trong Next.js. Chương gồm 2 bài học:
      </p>

      <div className="flex flex-col gap-6">
        {lessons.map((lesson) => (
          <Link
            key={lesson.href}
            href={lesson.href}
            className="group rounded-xl border border-slate-700 bg-slate-800 p-6 transition-shadow hover:shadow-md"
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
