export default function Bai2LayoutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold text-white">
        Bài 2: Hệ thống Layout & Nested Layout
      </h1>
      <p className="mb-6 text-slate-300">
        File{' '}
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
          layout.tsx
        </code>{' '}
        cho phép bạn chia sẻ giao diện chung (header, sidebar, footer) giữa
        nhiều trang. Layout được <strong>giữ nguyên state</strong> khi navigate
        giữa các trang con.
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Root Layout (bắt buộc)
        </h2>
        <p className="mb-4 text-slate-300">
          File{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            app/layout.tsx
          </code>{' '}
          là root layout, bắt buộc phải có và phải chứa thẻ{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">{`<html>`}</code>{' '}
          và{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">{`<body>`}</code>
          .
        </p>
        <pre className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// app/layout.tsx — Root Layout
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My App",
  description: "Ứng dụng Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <header>Header chung cho toàn bộ app</header>
        {children}
        <footer>Footer chung</footer>
      </body>
    </html>
  );
}`}</code>
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">Nested Layout</h2>
        <p className="mb-4 text-slate-300">
          Bạn có thể tạo layout riêng cho từng section bằng cách đặt{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            layout.tsx
          </code>{' '}
          trong thư mục con. Layout con sẽ được lồng bên trong layout cha.
        </p>
        <pre className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`app/
├── layout.tsx          → Root Layout (html, body)
├── page.tsx            → Trang chủ
└── dashboard/
    ├── layout.tsx      → Dashboard Layout (sidebar)
    ├── page.tsx        → /dashboard
    └── settings/
        └── page.tsx    → /dashboard/settings`}</code>
        </pre>

        <pre className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// app/dashboard/layout.tsx — Nested Layout
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100">
        <nav>
          <a href="/dashboard">Tổng quan</a>
          <a href="/dashboard/settings">Cài đặt</a>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}`}</code>
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Cách layout lồng nhau hoạt động
        </h2>
        <p className="mb-4 text-slate-300">
          Khi truy cập{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            /dashboard/settings
          </code>
          , Next.js sẽ render theo thứ tự:
        </p>
        <pre className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`<RootLayout>        {/* app/layout.tsx */}
  <DashboardLayout>  {/* app/dashboard/layout.tsx */}
    <SettingsPage />  {/* app/dashboard/settings/page.tsx */}
  </DashboardLayout>
</RootLayout>`}</code>
        </pre>
      </section>

      <section className="rounded-lg border border-emerald-800 bg-emerald-900/30 p-4">
        <h3 className="mb-2 font-semibold text-emerald-300">
          🧪 Demo trực tiếp
        </h3>
        <p className="text-sm text-emerald-400">
          Bạn có thấy thanh thông báo màu xanh phía trên không? Đó chính là{' '}
          <strong>nested layout</strong> của bài này — file{' '}
          <code>bai-2-layout/layout.tsx</code> đang bọc quanh trang này, và nó
          nằm bên trong layout sidebar của chương Routing.
        </p>
      </section>
    </div>
  );
}
