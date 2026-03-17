import Link from 'next/link';

const chapters = [
  {
    number: 1,
    title: 'Routing Căn Bản',
    href: '/routing-co-ban',
    description:
      'Tìm hiểu hệ thống routing dựa trên file của Next.js App Router, bao gồm pages, layouts, dynamic routes và route groups.',
    icon: '🗺️',
  },
  {
    number: 2,
    title: 'Chiến Lược Rendering',
    href: '/rendering',
    description:
      'Khám phá Server Components, Client Components, SSR, SSG, ISR và cách chọn chiến lược rendering phù hợp.',
    icon: '⚡',
  },
  {
    number: 3,
    title: 'Data Fetching & Caching',
    href: '/data-fetching',
    description:
      'Nắm vững cách fetch dữ liệu trên server và client, caching strategies, revalidation và request deduplication.',
    icon: '🔄',
  },
  {
    number: 4,
    title: 'Server Actions & Route Handlers',
    href: '/server-actions',
    description:
      'Sử dụng Server Actions để xử lý form mutations, và Route Handlers để xây dựng API endpoints.',
    icon: '🚀',
  },
  {
    number: 5,
    title: 'Routing Nâng Cao',
    href: '/routing-nang-cao',
    description:
      'Parallel Routes, Intercepting Routes, Middleware và các pattern routing nâng cao cho ứng dụng phức tạp.',
    icon: '🧩',
  },
  {
    number: 6,
    title: 'Tối Ưu Hóa & SEO',
    href: '/toi-uu-hoa',
    description:
      'Image, Font, Script optimization, Metadata API, sitemap, robots.txt và các kỹ thuật tối ưu hiệu năng.',
    icon: '📈',
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl">
      {/* Hero */}
      <section className="py-12">
        <p className="mb-3 text-sm font-semibold tracking-widest text-[var(--accent)] uppercase">
          Khóa học Next.js
        </p>
        <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-white md:text-5xl">
          Next.js Từ Cơ Bản
          <br />
          Đến Production
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
          Khóa học toàn diện giúp bạn nắm vững Next.js App Router — từ routing,
          rendering, data fetching đến server actions và tối ưu hóa hiệu năng.
          Sẵn sàng xây dựng ứng dụng production-ready.
        </p>
      </section>

      {/* Highlights */}
      <section className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: '6 Chương', detail: 'Từ cơ bản đến nâng cao' },
          { label: 'App Router', detail: 'Kiến trúc mới nhất' },
          { label: 'TypeScript', detail: 'Type-safe toàn bộ' },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 text-center"
          >
            <p className="text-2xl font-bold text-[var(--accent)]">
              {item.label}
            </p>
            <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
          </div>
        ))}
      </section>

      {/* Chapter cards */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-white">
          Nội dung khóa học
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {chapters.map((chapter) => (
            <Link
              key={chapter.href}
              href={chapter.href}
              className="group rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-all hover:border-[var(--accent)] hover:shadow-[var(--accent)]/5 hover:shadow-lg"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="text-2xl">{chapter.icon}</span>
                <span className="text-xs font-semibold tracking-wider text-[var(--accent)] uppercase">
                  Chương {chapter.number}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-[var(--accent-hover)]">
                {chapter.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {chapter.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
