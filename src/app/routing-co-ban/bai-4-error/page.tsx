'use client';

import { useState } from 'react';

export default function Bai4ErrorPage() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error(
      'Đây là lỗi demo! Bạn đã nhấn nút để kích hoạt Error Boundary.',
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold text-white">
        Bài 4: Xử lý lỗi với Error Boundary
      </h1>
      <p className="mb-6 text-slate-300">
        File{' '}
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
          error.tsx
        </code>{' '}
        cho phép bạn bắt lỗi và hiển thị UI thân thiện thay vì crash toàn bộ
        trang. Đây là một <strong>Client Component</strong> (bắt buộc dùng
        &quot;use client&quot;).
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Cách tạo Error Boundary
        </h2>
        <pre className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// app/dashboard/error.tsx
"use client"; // Bắt buộc phải là Client Component

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Đã xảy ra lỗi!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Thử lại</button>
    </div>
  );
}`}</code>
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Cơ chế hoạt động
        </h2>
        <p className="mb-4 text-slate-300">
          Next.js tự động bọc page trong React Error Boundary:
        </p>
        <pre className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`<Layout>
  <ErrorBoundary fallback={<Error />}>
    <Page />
  </ErrorBoundary>
</Layout>`}</code>
        </pre>
        <p className="text-slate-300">
          Lưu ý:{' '}
          <strong>error.tsx không bắt được lỗi từ layout.tsx cùng cấp</strong>.
          Để bắt lỗi layout, bạn cần đặt error.tsx ở thư mục cha.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Props của Error Component
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="py-2 pr-4 font-semibold text-white">Prop</th>
                <th className="py-2 font-semibold text-white">Mô tả</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="py-2 pr-4 font-mono text-sm">error</td>
                <td className="py-2">
                  Object Error chứa thông tin lỗi (message, digest...)
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-sm">reset</td>
                <td className="py-2">Hàm để thử render lại page (retry)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-orange-800 bg-orange-900/30 p-4">
        <h3 className="mb-2 font-semibold text-orange-300">
          🧪 Demo: Kích hoạt Error Boundary
        </h3>
        <p className="mb-3 text-sm text-orange-400">
          Nhấn nút bên dưới để throw error. Error boundary (file{' '}
          <code>error.tsx</code>) sẽ bắt lỗi và hiển thị UI thay thế với nút
          &quot;Thử lại&quot;.
        </p>
        <button
          onClick={() => setShouldError(true)}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          💥 Kích hoạt lỗi!
        </button>
      </section>
    </div>
  );
}
