import Link from 'next/link';

const lessons = [
  {
    href: '/toi-uu-hoa/bai-1-metadata-seo',
    title: 'Bài 1: Metadata & SEO',
    desc: 'Tìm hiểu static metadata, generateMetadata, Open Graph, Twitter Cards.',
  },
  {
    href: '/toi-uu-hoa/bai-2-seo-khac',
    title: 'Bài 2: Các yếu tố SEO khác',
    desc: 'robots.txt, sitemap.xml, canonical URL, structured data (JSON-LD).',
  },
  {
    href: '/toi-uu-hoa/bai-3-navigation-prefetch',
    title: 'Bài 3: Navigation & Prefetch',
    desc: 'next/link, prefetch, useRouter, điều hướng chương trình.',
  },
  {
    href: '/toi-uu-hoa/bai-4-font',
    title: 'Bài 4: Tối ưu Font',
    desc: 'next/font/google, next/font/local, font display strategies.',
  },
  {
    href: '/toi-uu-hoa/bai-5-image',
    title: 'Bài 5: Tối ưu Image',
    desc: 'next/image, tự động tối ưu, responsive, priority, placeholder blur.',
  },
  {
    href: '/toi-uu-hoa/bai-6-script',
    title: 'Bài 6: Quản lý Script',
    desc: 'next/script, chiến lược tải: beforeInteractive, afterInteractive, lazyOnload.',
  },
  {
    href: '/toi-uu-hoa/bai-7-form',
    title: 'Bài 7: Quản lý Form',
    desc: 'useFormStatus, useActionState, optimistic updates với form.',
  },
  {
    href: '/toi-uu-hoa/bai-8-proxy',
    title: 'Bài 8: Làm việc với Proxy',
    desc: 'Rewrites trong next.config, proxy API requests, xử lý CORS.',
  },
];

export default function ToiUuHoaPage() {
  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold text-white">
        📈 Chương: Tối ưu hóa & SEO
      </h1>
      <p className="mb-10 text-lg text-slate-300">
        Chương này hướng dẫn bạn cách tối ưu hóa ứng dụng Next.js từ SEO,
        metadata, font, hình ảnh, script cho đến form và proxy. Mỗi bài học đi
        kèm ví dụ thực tế giúp bạn áp dụng ngay vào dự án.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {lessons.map((lesson) => (
          <Link
            key={lesson.href}
            href={lesson.href}
            className="group rounded-xl border border-slate-700 bg-slate-800 p-6 transition-all hover:border-slate-500 hover:shadow-md"
          >
            <h2 className="mb-2 text-lg font-semibold text-white group-hover:text-sky-400">
              {lesson.title}
            </h2>
            <p className="text-sm text-slate-400">{lesson.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
