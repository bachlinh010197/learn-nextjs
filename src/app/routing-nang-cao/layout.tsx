import Link from 'next/link';

const lessons = [
  { href: '/routing-nang-cao/bai-1-templates', label: 'Bài 1: Templates' },
  {
    href: '/routing-nang-cao/bai-2-parallel-routes',
    label: 'Bài 2: Parallel Routes',
  },
  {
    href: '/routing-nang-cao/bai-3-intercepting-routes',
    label: 'Bài 3: Intercepting Routes',
  },
  {
    href: '/routing-nang-cao/bai-4-after-function',
    label: 'Bài 4: After Function',
  },
];

export default function RoutingNangCaoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-slate-900">
      <aside className="w-64 shrink-0 border-r border-slate-700 bg-slate-800 p-6">
        <Link
          href="/routing-nang-cao"
          className="mb-6 block text-lg font-bold text-white"
        >
          Routing Nâng Cao
        </Link>
        <nav className="flex flex-col gap-2">
          {lessons.map((lesson) => (
            <Link
              key={lesson.href}
              href={lesson.href}
              className="rounded-md px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
            >
              {lesson.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
