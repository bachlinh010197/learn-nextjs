import Link from 'next/link';

const lessons = [
  { href: '/server-actions', label: 'Tổng quan' },
  {
    href: '/server-actions/bai-1-route-handlers',
    label: 'Bài 1: Route Handlers',
  },
  {
    href: '/server-actions/bai-2-server-actions',
    label: 'Bài 2: Server Actions',
  },
];

export default function ServerActionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-slate-900">
      <aside className="w-72 shrink-0 border-r border-slate-700 bg-slate-800 p-6">
        <h2 className="mb-6 text-lg font-bold text-white">
          Server Actions & Route Handlers
        </h2>
        <nav className="flex flex-col gap-2">
          {lessons.map((lesson) => (
            <Link
              key={lesson.href}
              href={lesson.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
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
