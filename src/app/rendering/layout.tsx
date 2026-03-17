import Link from 'next/link';

const lessons = [
  { href: '/rendering/bai-1-spa-seo', title: 'Bài 1: SPA & SEO' },
  { href: '/rendering/bai-2-tong-quan', title: 'Bài 2: Tổng quan Rendering' },
  {
    href: '/rendering/bai-3-server-client-components',
    title: 'Bài 3: Server & Client Components',
  },
  { href: '/rendering/bai-4-boundary', title: 'Bài 4: Server-Client Boundary' },
  { href: '/rendering/bai-5-csr', title: 'Bài 5: Client-Side Rendering' },
  {
    href: '/rendering/bai-6-static-dynamic',
    title: 'Bài 6: Static vs Dynamic',
  },
  { href: '/rendering/bai-7-ssr', title: 'Bài 7: SSR & Dynamic APIs' },
  { href: '/rendering/bai-8-streaming', title: 'Bài 8: Streaming & Suspense' },
  { href: '/rendering/bai-9-isr', title: 'Bài 9: ISR' },
  { href: '/rendering/bai-10-ssg', title: 'Bài 10: SSG' },
];

export default function RenderingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 overflow-y-auto border-r border-slate-700 bg-slate-800 p-6 lg:block">
        <Link
          href="/rendering"
          className="mb-6 block text-lg font-bold text-white"
        >
          📖 Rendering Strategies
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

      {/* Mobile nav */}
      <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-slate-700 bg-slate-800 p-2 lg:hidden">
        <div className="flex gap-1 overflow-x-auto">
          <Link
            href="/rendering"
            className="shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-700"
          >
            Tổng quan
          </Link>
          {lessons.map((lesson) => (
            <Link
              key={lesson.href}
              href={lesson.href}
              className="shrink-0 rounded-lg px-3 py-2 text-xs text-slate-400 hover:bg-slate-700"
            >
              {lesson.title.replace(/Bài \d+: /, '')}
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="min-w-0 flex-1 px-6 py-10 pb-20 lg:px-16 lg:pb-10">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
