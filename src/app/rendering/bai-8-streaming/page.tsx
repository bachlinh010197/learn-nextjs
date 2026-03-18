import { CodeBlock } from '@/components/CodeBlock';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Bài 8: Streaming & Suspense - Rendering Strategies',
};

async function SlowPost() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    cache: 'no-store',
  });
  const post = (await res.json()) as { title: string; body: string };

  return (
    <div className="rounded-lg border border-emerald-800 bg-emerald-900/30 p-4">
      <p className="mb-1 text-xs text-emerald-400">
        ✅ Loaded sau 2 giây delay
      </p>
      <h3 className="font-semibold text-emerald-300">{post.title}</h3>
      <p className="mt-1 text-sm text-emerald-400">{post.body}</p>
    </div>
  );
}

async function SlowComments() {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts/1/comments?_limit=3',
    { cache: 'no-store' },
  );
  const comments = (await res.json()) as Array<{
    id: number;
    name: string;
    body: string;
    email: string;
  }>;

  return (
    <div className="space-y-3">
      <p className="text-xs text-purple-400">✅ Loaded sau 4 giây delay</p>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="rounded-lg border border-purple-800 bg-purple-900/30 p-4"
        >
          <p className="font-medium text-purple-300">{comment.name}</p>
          <p className="text-xs text-purple-400">{comment.email}</p>
          <p className="mt-1 text-sm text-purple-400">{comment.body}</p>
        </div>
      ))}
    </div>
  );
}

function LoadingSkeleton({ label }: { label: string }) {
  return (
    <div className="animate-pulse rounded-lg border border-slate-700 bg-slate-700 p-4">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        <p className="text-sm text-slate-400">⏳ {label}</p>
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-4 w-3/4 rounded bg-slate-600" />
        <div className="h-4 w-1/2 rounded bg-slate-600" />
      </div>
    </div>
  );
}

export default function Bai8Page() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-white">
        Bài 8: Streaming & Suspense
      </h1>

      <p className="mb-8 leading-relaxed text-slate-300">
        Streaming cho phép server gửi HTML theo từng phần thay vì chờ toàn bộ
        trang render xong. Kết hợp với React <code>Suspense</code>, bạn có thể
        hiển thị loading state cho từng phần của trang, cải thiện{' '}
        <strong>Time to First Byte (TTFB)</strong> và{' '}
        <strong>First Contentful Paint (FCP)</strong>.
      </p>

      {/* How streaming works */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Streaming hoạt động như thế nào?
        </h2>
        <ol className="mb-4 list-inside list-decimal space-y-2 text-slate-300">
          <li>
            Server bắt đầu render trang. Các phần không cần chờ data được gửi
            ngay cho browser.
          </li>
          <li>
            Các phần bọc trong <code>&lt;Suspense&gt;</code> hiển thị{' '}
            <code>fallback</code> (loading state) trước.
          </li>
          <li>
            Khi async component render xong, server gửi HTML thay thế cho
            fallback.
          </li>
          <li>
            Browser tự động swap loading state thành nội dung thật — không cần
            client-side JS!
          </li>
        </ol>

        <CodeBlock>
          {`
            import { Suspense } from "react";

            export default function Page() {
              return (
                <div>
                  {/* Gửi ngay cho browser */}
                  <h1>Dashboard</h1>
                  <nav>...</nav>

                  {/* Streaming: hiện loading, rồi thay thế */}
                  <Suspense fallback={<p>Đang tải bài viết...</p>}>
                    <SlowPost />   {/* async component - mất 2s */}
                  </Suspense>

                  <Suspense fallback={<p>Đang tải bình luận...</p>}>
                    <SlowComments /> {/* async component - mất 4s */}
                  </Suspense>
                </div>
              );
            }

            // SlowPost là async Server Component
            async function SlowPost() {
              await new Promise(r => setTimeout(r, 2000));
              const res = await fetch("https://api.example.com/post/1");
              const post = await res.json();
              return <article>{post.title}</article>;
            }
          `}
        </CodeBlock>
      </section>

      {/* Live streaming demo */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          🎮 Demo Streaming trực tiếp
        </h2>
        <p className="mb-4 text-sm text-slate-400">
          Reload trang để thấy hiệu ứng streaming. Phần tiêu đề và giải thích
          hiển thị ngay, còn bài viết (2s) và bình luận (4s) xuất hiện dần:
        </p>

        <div className="space-y-4">
          {/* This renders immediately */}
          <div className="rounded-lg border border-sky-800 bg-sky-900/30 p-4">
            <p className="text-sm text-sky-300">
              ⚡ Phần này hiển thị <strong>ngay lập tức</strong> — không cần chờ
              data.
            </p>
          </div>

          {/* Streamed: Post (2s delay) */}
          <div>
            <h3 className="mb-2 font-medium text-slate-300">
              📝 Bài viết (delay 2 giây):
            </h3>
            <Suspense
              fallback={<LoadingSkeleton label="Đang tải bài viết..." />}
            >
              <SlowPost />
            </Suspense>
          </div>

          {/* Streamed: Comments (4s delay) */}
          <div>
            <h3 className="mb-2 font-medium text-slate-300">
              💬 Bình luận (delay 4 giây):
            </h3>
            <Suspense
              fallback={<LoadingSkeleton label="Đang tải bình luận..." />}
            >
              <SlowComments />
            </Suspense>
          </div>
        </div>
      </section>

      {/* loading.tsx */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          loading.tsx — Streaming tự động
        </h2>
        <p className="mb-4 text-slate-300">
          Next.js cung cấp convention <code>loading.tsx</code> — tự động bọc
          page trong Suspense boundary:
        </p>
        <CodeBlock>
          {`
            // app/dashboard/loading.tsx
            export default function Loading() {
              return (
                <div className="animate-pulse">
                  <div className="h-8 w-48 bg-gray-200 rounded mb-4" />
                  <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                </div>
              );
            }

            // Tương đương với:
            <Suspense fallback={<Loading />}>
              <Page />
            </Suspense>
          `}
        </CodeBlock>
      </section>

      {/* Benefits */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Lợi ích của Streaming
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
            <h3 className="mb-1 font-semibold text-white">⚡ TTFB nhanh hơn</h3>
            <p className="text-sm text-slate-300">
              Server gửi HTML ngay khi có thể, không chờ tất cả data.
            </p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
            <h3 className="mb-1 font-semibold text-white">🎨 FCP nhanh hơn</h3>
            <p className="text-sm text-slate-300">
              Người dùng thấy nội dung và loading states ngay lập tức.
            </p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
            <h3 className="mb-1 font-semibold text-white">
              🧩 Độc lập từng phần
            </h3>
            <p className="text-sm text-slate-300">
              Một phần chậm không block phần khác hiển thị.
            </p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
            <h3 className="mb-1 font-semibold text-white">🔍 SEO tốt</h3>
            <p className="text-sm text-slate-300">
              HTML cuối cùng vẫn đầy đủ nội dung cho search engines.
            </p>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="rounded-lg border border-sky-800 bg-sky-900/30 p-6">
        <h2 className="mb-2 text-lg font-semibold text-sky-300">💡 Tóm tắt</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-sky-400">
          <li>
            Bọc async components trong <code>&lt;Suspense&gt;</code> để enable
            streaming.
          </li>
          <li>
            Dùng <code>loading.tsx</code> cho streaming ở page level.
          </li>
          <li>
            Các Suspense boundaries độc lập — một phần chậm không ảnh hưởng phần
            khác.
          </li>
          <li>Kết hợp với SSR để có cả dữ liệu fresh và UX tốt.</li>
        </ul>
      </section>
    </div>
  );
}
