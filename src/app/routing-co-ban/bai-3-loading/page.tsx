import { CodeBlock } from '@/components/CodeBlock';

export default function Bai3LoadingPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold text-white">Bài 3: Loading UI</h1>
      <p className="mb-6 text-slate-300">
        Next.js cho phép bạn tạo loading UI tự động bằng file{' '}
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
          loading.tsx
        </code>
        . File này sử dụng React Suspense bên dưới để hiển thị fallback UI trong
        khi trang đang tải.
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Cách tạo loading UI
        </h2>
        <p className="mb-4 text-slate-300">
          Chỉ cần tạo file{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            loading.tsx
          </code>{' '}
          cùng cấp với{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            page.tsx
          </code>
          . Next.js sẽ tự động hiển thị component này trong khi page đang được
          tải.
        </p>
        <CodeBlock>
          {`
            app/dashboard/
            ├── layout.tsx
            ├── loading.tsx   ← Hiển thị khi page đang tải
            └── page.tsx
          `}
        </CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Ví dụ loading.tsx
        </h2>
        <CodeBlock>
          {`
            // app/dashboard/loading.tsx
            export default function Loading() {
              return (
                <div className="flex items-center justify-center py-20">
                  <div className="h-10 w-10 animate-spin rounded-full
                       border-4 border-slate-600 border-t-blue-500" />
                  <p className="ml-3">Đang tải...</p>
                </div>
              );
            }
          `}
        </CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Cơ chế hoạt động
        </h2>
        <p className="mb-4 text-slate-300">
          Bên dưới, Next.js tự động bọc page trong React Suspense:
        </p>
        <CodeBlock>
          {`
            // Next.js tự động tạo cấu trúc này:
            <Layout>
              <Suspense fallback={<Loading />}>
                <Page />
              </Suspense>
            </Layout>
          `}
        </CodeBlock>
        <p className="text-slate-300">
          Điều này có nghĩa là layout sẽ{' '}
          <strong>luôn hiển thị ngay lập tức</strong>, chỉ có phần page bên
          trong mới chờ tải.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Skeleton Loading (nâng cao)
        </h2>
        <p className="mb-4 text-slate-300">
          Thay vì spinner đơn giản, bạn có thể tạo skeleton UI để trải nghiệm
          mượt mà hơn:
        </p>
        <CodeBlock>
          {`
            // app/dashboard/loading.tsx — Skeleton
            export default function Loading() {
              return (
                <div className="space-y-4">
                  <div className="h-8 w-1/3 animate-pulse rounded bg-slate-600" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-600" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-slate-600" />
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="h-32 animate-pulse rounded bg-slate-600" />
                    <div className="h-32 animate-pulse rounded bg-slate-600" />
                    <div className="h-32 animate-pulse rounded bg-slate-600" />
                  </div>
                </div>
              );
            }
          `}
        </CodeBlock>
      </section>

      <section className="rounded-lg border border-sky-800 bg-sky-900/30 p-4">
        <h3 className="mb-2 font-semibold text-sky-300">🧪 Demo</h3>
        <p className="text-sm text-sky-400">
          Thư mục <code>bai-3-loading/</code> có file <code>loading.tsx</code>{' '}
          thực tế. Khi bạn navigate đến trang này, bạn có thể thấy loading
          spinner hiển thị trong khoảnh khắc trước khi nội dung xuất hiện.
        </p>
      </section>
    </div>
  );
}
