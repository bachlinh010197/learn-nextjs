import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next.js Từ Cơ Bản Đến Production',
  description:
    'Khóa học Next.js toàn diện từ cơ bản đến nâng cao, bao gồm Routing, Rendering, Data Fetching, Server Actions và Tối Ưu Hóa.',
};

const chapters = [
  { title: 'Trang chủ', href: '/' },
  { title: 'Chương 1: Routing Căn Bản', href: '/routing-co-ban' },
  { title: 'Chương 2: Chiến Lược Rendering', href: '/rendering' },
  { title: 'Chương 3: Data Fetching & Caching', href: '/data-fetching' },
  {
    title: 'Chương 4: Server Actions & Route Handlers',
    href: '/server-actions',
  },
  { title: 'Chương 5: Routing Nâng Cao', href: '/routing-nang-cao' },
  { title: 'Chương 6: Tối Ưu Hóa & SEO', href: '/toi-uu-hoa' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="fixed top-0 left-0 h-screen w-64 overflow-y-auto border-r border-[var(--card-border)] bg-[var(--sidebar-bg)] p-6">
            <Link href="/" className="mb-8 block">
              <h2 className="text-lg font-bold text-[var(--accent)]">
                Next.js Course
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Từ Cơ Bản Đến Production
              </p>
            </Link>

            <nav className="flex flex-col gap-1">
              {chapters.map((chapter) => (
                <Link
                  key={chapter.href}
                  href={chapter.href}
                  className="rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-[var(--card-bg)] hover:text-[var(--accent)]"
                >
                  {chapter.title}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="ml-64 flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
