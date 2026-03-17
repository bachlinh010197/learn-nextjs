import Link from 'next/link';

export default function MarketingAboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/routing-co-ban/bai-7-route-groups"
        className="mb-4 inline-block text-sm text-sky-400 hover:underline"
      >
        ← Quay lại Bài 7
      </Link>

      <h1 className="mb-4 text-3xl font-bold text-white">
        Trang About (Marketing Group)
      </h1>

      <div className="mb-6 rounded-lg border border-emerald-800 bg-emerald-900/30 p-6">
        <p className="mb-2 text-sm font-semibold text-emerald-300">
          📁 Vị trí file:
        </p>
        <code className="text-sm text-emerald-400">
          app/routing-co-ban/(marketing)/about/page.tsx
        </code>
        <p className="mt-3 text-sm text-emerald-400">
          📌 URL thực tế: <strong>/routing-co-ban/about</strong>
        </p>
        <p className="mt-1 text-sm text-emerald-400">
          Thư mục <code>(marketing)</code> không xuất hiện trong URL!
        </p>
      </div>

      <p className="text-slate-300">
        Đây là trang demo thuộc route group <strong>(marketing)</strong>. Dù
        file nằm trong thư mục <code>(marketing)/about/</code>, URL truy cập vẫn
        là <code>/routing-co-ban/about</code> — không có &quot;marketing&quot;
        trong đường dẫn.
      </p>
    </div>
  );
}
