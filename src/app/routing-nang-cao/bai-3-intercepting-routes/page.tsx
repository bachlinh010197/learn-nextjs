export default function Bai3InterceptingRoutesPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold text-white">
        Bài 3: Intercepting Routes
      </h1>
      <p className="mb-6 text-slate-300">
        Intercepting Routes cho phép bạn &quot;chặn&quot; một route và hiển thị
        nó trong ngữ cảnh của route hiện tại — ví dụ: mở modal xem ảnh mà không
        rời khỏi feed.
      </p>

      {/* Giải thích */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Intercepting Routes là gì?
        </h2>
        <div className="space-y-4 text-slate-300">
          <p>
            Intercepting Routes cho phép bạn tải một route từ một phần khác
            trong ứng dụng bên trong layout hiện tại. Điều này rất hữu ích khi
            bạn muốn hiển thị nội dung của route mà không cần chuyển sang ngữ
            cảnh mới.
          </p>
          <p>
            Ví dụ: khi click vào một bức ảnh trong feed, bạn có thể hiển thị ảnh
            trong modal (intercepted). Nhưng khi truy cập trực tiếp URL hoặc
            refresh, trang đầy đủ sẽ hiển thị.
          </p>
        </div>
      </section>

      {/* Các quy ước */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Các quy ước đặt tên thư mục
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="py-2 pr-4 text-left font-semibold text-white">
                  Quy ước
                </th>
                <th className="py-2 pr-4 text-left font-semibold text-white">
                  Mô tả
                </th>
                <th className="py-2 text-left font-semibold text-white">
                  Tương tự
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="py-2 pr-4">
                  <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sky-300">
                    (.)
                  </code>
                </td>
                <td className="py-2 pr-4">
                  Khớp với route <strong>cùng cấp</strong>
                </td>
                <td className="py-2">
                  Giống{' '}
                  <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sky-300">
                    ./
                  </code>
                </td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 pr-4">
                  <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sky-300">
                    (..)
                  </code>
                </td>
                <td className="py-2 pr-4">
                  Khớp với route <strong>trên một cấp</strong>
                </td>
                <td className="py-2">
                  Giống{' '}
                  <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sky-300">
                    ../
                  </code>
                </td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 pr-4">
                  <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sky-300">
                    (..)(..)
                  </code>
                </td>
                <td className="py-2 pr-4">
                  Khớp với route <strong>trên hai cấp</strong>
                </td>
                <td className="py-2">
                  Giống{' '}
                  <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sky-300">
                    ../../
                  </code>
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4">
                  <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sky-300">
                    (...)
                  </code>
                </td>
                <td className="py-2 pr-4">
                  Khớp với route từ thư mục <strong>gốc (app)</strong>
                </td>
                <td className="py-2">
                  Giống{' '}
                  <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sky-300">
                    /
                  </code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Use case: Modal */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Use Case: Modal với Intercepting Routes
        </h2>
        <p className="mb-4 text-slate-300">
          Kết hợp Intercepting Routes với Parallel Routes để tạo modal pattern:
        </p>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`app/
├── feed/
│   ├── layout.tsx
│   ├── page.tsx              ← Danh sách ảnh
│   ├── @modal/
│   │   ├── default.tsx       ← Render nothing khi không có modal
│   │   └── (..)photo/[id]/
│   │       └── page.tsx      ← Modal xem ảnh (intercepted)
│   └── ...
└── photo/
    └── [id]/
        └── page.tsx          ← Trang xem ảnh đầy đủ (direct access)`}</code>
        </pre>
      </section>

      {/* Ví dụ code Modal */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">Ví dụ code</h2>

        <h3 className="mt-4 mb-2 text-lg font-medium text-white">
          1. Layout nhận modal slot
        </h3>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// app/feed/layout.tsx
export default function FeedLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}`}</code>
        </pre>

        <h3 className="mt-6 mb-2 text-lg font-medium text-white">
          2. Modal default (không hiển thị gì)
        </h3>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// app/feed/@modal/default.tsx
export default function Default() {
  return null;
}`}</code>
        </pre>

        <h3 className="mt-6 mb-2 text-lg font-medium text-white">
          3. Intercepted route (hiển thị modal)
        </h3>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// app/feed/@modal/(..)photo/[id]/page.tsx
export default function PhotoModal({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center
      justify-center bg-black/60">
      <div className="rounded-lg bg-slate-800 p-6">
        <h2>Ảnh #{params.id}</h2>
        <p>Hiển thị trong modal (intercepted)</p>
      </div>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* Cách hoạt động */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Cách hoạt động
        </h2>
        <div className="space-y-3 text-slate-300">
          <p>
            <strong>Soft navigation</strong> (click link): Route bị intercept →
            modal hiển thị, URL thay đổi nhưng layout giữ nguyên.
          </p>
          <p>
            <strong>Hard navigation</strong> (truy cập URL trực tiếp hoặc
            refresh): Route không bị intercept → trang đầy đủ hiển thị.
          </p>
        </div>
      </section>

      <div className="rounded-lg border border-sky-800 bg-sky-900/30 p-4">
        <p className="text-sm text-sky-300">
          💡 <strong>Mẹo:</strong> Intercepting Routes thường kết hợp với
          Parallel Routes (@modal slot) để tạo trải nghiệm modal mượt mà — giống
          Instagram khi click ảnh.
        </p>
      </div>
    </div>
  );
}
