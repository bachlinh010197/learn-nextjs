export default function Bai1TemplatesPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold text-white">Bài 1: Templates</h1>
      <p className="mb-6 text-slate-300">
        Hiểu sự khác biệt giữa{' '}
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
          layout.tsx
        </code>{' '}
        và{' '}
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
          template.tsx
        </code>{' '}
        trong Next.js App Router.
      </p>

      {/* Giải thích */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Layout vs Template
        </h2>
        <div className="space-y-4 text-slate-300">
          <p>
            <strong>layout.tsx</strong> — Được render một lần và{' '}
            <em>giữ nguyên state</em> khi người dùng điều hướng giữa các trang
            con. Component không bị unmount/remount.
          </p>
          <p>
            <strong>template.tsx</strong> — Tương tự layout nhưng sẽ{' '}
            <em>tạo instance mới</em> (re-mount) mỗi khi người dùng điều hướng.
            State bị reset, useEffect chạy lại, DOM được tạo mới.
          </p>
        </div>
      </section>

      {/* Bảng so sánh */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">So sánh</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="py-2 pr-4 text-left font-semibold text-white">
                  Đặc điểm
                </th>
                <th className="py-2 pr-4 text-left font-semibold text-white">
                  layout.tsx
                </th>
                <th className="py-2 text-left font-semibold text-white">
                  template.tsx
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="py-2 pr-4">Giữ state khi điều hướng</td>
                <td className="py-2 pr-4">✅ Có</td>
                <td className="py-2">❌ Không</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 pr-4">Re-mount khi chuyển trang</td>
                <td className="py-2 pr-4">❌ Không</td>
                <td className="py-2">✅ Có</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 pr-4">useEffect chạy lại</td>
                <td className="py-2 pr-4">❌ Không</td>
                <td className="py-2">✅ Có</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Use case</td>
                <td className="py-2 pr-4">Sidebar, navigation</td>
                <td className="py-2">Animations, logging, form reset</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Khi nào dùng template */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Khi nào dùng Template?
        </h2>
        <ul className="list-inside list-disc space-y-2 text-slate-300">
          <li>Cần animation enter/exit khi chuyển trang</li>
          <li>
            Cần chạy lại useEffect mỗi lần điều hướng (ví dụ: logging page view)
          </li>
          <li>Cần reset form state khi chuyển giữa các trang con</li>
          <li>Cần tạo Suspense boundary mới cho mỗi lần điều hướng</li>
        </ul>
      </section>

      {/* Ví dụ code */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Ví dụ: template.tsx
        </h2>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// app/routing-nang-cao/bai-1-templates/template.tsx
"use client";

import { useEffect } from "react";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Chạy lại mỗi khi điều hướng
    console.log("Template mounted - page view logged!");
  }, []);

  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* Ví dụ layout */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          So sánh với layout.tsx
        </h2>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// app/dashboard/layout.tsx
// Component này KHÔNG re-mount khi điều hướng
// State được giữ nguyên giữa các trang con

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>Sidebar - luôn giữ nguyên</nav>
      <main>{children}</main>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* Cấu trúc thư mục */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Cấu trúc thư mục
        </h2>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`app/
└── dashboard/
    ├── layout.tsx      ← Giữ nguyên state
    ├── template.tsx    ← Re-mount mỗi lần điều hướng
    ├── page.tsx
    ├── settings/
    │   └── page.tsx
    └── profile/
        └── page.tsx`}</code>
        </pre>
        <p className="mt-3 text-sm text-slate-300">
          Khi điều hướng từ{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sky-300">
            /dashboard/settings
          </code>{' '}
          sang{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sky-300">
            /dashboard/profile
          </code>
          : layout.tsx giữ nguyên, template.tsx sẽ re-mount.
        </p>
      </section>

      <div className="rounded-lg border border-sky-800 bg-sky-900/30 p-4">
        <p className="text-sm text-sky-300">
          💡 <strong>Lưu ý:</strong> File template.tsx trong thư mục này là một
          demo thực tế. Mở DevTools Console và điều hướng giữa các bài để thấy
          log &quot;Template mounted&quot;.
        </p>
      </div>
    </div>
  );
}
