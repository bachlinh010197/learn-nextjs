import Link from 'next/link';

const lessons = [
  { href: '/routing-co-ban/bai-1-app-router', title: 'Bài 1: App Router' },
  { href: '/routing-co-ban/bai-2-layout', title: 'Bài 2: Layout' },
  { href: '/routing-co-ban/bai-3-loading', title: 'Bài 3: Loading UI' },
  { href: '/routing-co-ban/bai-4-error', title: 'Bài 4: Error Boundary' },
  { href: '/routing-co-ban/bai-5-not-found', title: 'Bài 5: Not Found' },
  {
    href: '/routing-co-ban/bai-6-dynamic-routes',
    title: 'Bài 6: Dynamic Routes',
  },
  { href: '/routing-co-ban/bai-7-route-groups', title: 'Bài 7: Route Groups' },
];

export default function RoutingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 border-r border-slate-700 bg-slate-800 p-6">
        <Link
          href="/routing-co-ban"
          className="mb-6 block text-lg font-bold text-white"
        >
          Routing Cơ Bản
        </Link>
        <nav className="flex flex-col gap-1">
          {lessons.map((lesson) => (
            <Link
              key={lesson.href}
              href={lesson.href}
              className="rounded-md px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700"
            >
              {lesson.title}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
