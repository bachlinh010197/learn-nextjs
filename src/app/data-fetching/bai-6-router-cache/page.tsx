import { CodeBlock } from '@/components/CodeBlock';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bài 6: Router Cache - Learn Next.js',
};

export default function Bai6RouterCache() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-4xl font-bold text-white">
        Bài 6: Router Cache
      </h1>
      <p className="mb-8 text-lg text-slate-300">
        Router Cache là tầng cache phía client (browser), lưu trữ RSC Payload
        của các route đã truy cập trong phiên điều hướng. Nhờ đó, việc quay lại
        trang đã truy cập trở nên gần như tức thì.
      </p>

      {/* Cơ chế hoạt động */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Cơ chế hoạt động
        </h2>
        <CodeBlock>
          {`
            User điều hướng (client-side navigation)
            │
            ├── Trang đã có trong Router Cache?
            │   ├── CÓ → Hiển thị ngay từ cache (instant!) ⚡
            │   └── KHÔNG → Fetch RSC Payload từ server
            │               └── Lưu vào Router Cache
            │                   └── Hiển thị trang
            │
            ├── Prefetch (Link component tự động prefetch)
            │   ├── Static route → Prefetch toàn bộ RSC Payload
            │   └── Dynamic route → Prefetch đến loading.tsx boundary
            │
            └── Cache bị xoá khi:
                ├── Gọi router.refresh()
                ├── Hết thời gian staleTime
                └── Hard navigation (full page reload)
          `}
        </CodeBlock>
      </section>

      {/* Prefetching */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Prefetching với Link Component
        </h2>
        <p className="mb-4 text-slate-300">
          Next.js tự động prefetch các route khi{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            {`<Link>`}
          </code>{' '}
          xuất hiện trong viewport. Dữ liệu prefetch được lưu vào Router Cache.
        </p>
        <CodeBlock>
          {`
            import Link from 'next/link';

            export default function Navigation() {
              return (
                <nav>
                  {/* Mặc định: prefetch tự động khi Link vào viewport */}
                  <Link href="/about">Giới thiệu</Link>

                  {/* prefetch={false}: tắt prefetch */}
                  <Link href="/dashboard" prefetch={false}>
                    Dashboard
                  </Link>

                  {/* prefetch={true}: prefetch toàn bộ route data */}
                  {/* (kể cả dynamic route - thay vì chỉ loading boundary) */}
                  <Link href="/products" prefetch={true}>
                    Sản phẩm
                  </Link>
                </nav>
              );
            }

            // Prefetch hoạt động khác nhau tùy loại route:
            // ┌────────────────┬─────────────────────────────────┐
            // │ Loại route     │ Prefetch behavior               │
            // ├────────────────┼─────────────────────────────────┤
            // │ Static route   │ Prefetch toàn bộ route          │
            // │ Dynamic route  │ Prefetch đến loading.tsx gần    │
            // │                │ nhất (shared layout)            │
            // └────────────────┴─────────────────────────────────┘
          `}
        </CodeBlock>
      </section>

      {/* Stale Times */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Stale Times — Thời gian sống của cache
        </h2>
        <p className="mb-4 text-slate-300">
          Router Cache có thời gian sống (stale time) khác nhau cho static và
          dynamic route. Trong Next.js 15, mặc định đã được thay đổi:
        </p>
        <div className="mb-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Loại route
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Next.js 14
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Next.js 15+
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-medium">Dynamic route</td>
                <td className="px-4 py-3">30 giây</td>
                <td className="px-4 py-3">0 giây (không cache)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Static route</td>
                <td className="px-4 py-3">5 phút</td>
                <td className="px-4 py-3">5 phút</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-4 text-slate-300">
          Bạn có thể tuỳ chỉnh stale times trong{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            next.config.ts
          </code>
          :
        </p>
        <CodeBlock>
          {`
            // next.config.ts
            import type { NextConfig } from 'next';

            const nextConfig: NextConfig = {
              experimental: {
                staleTimes: {
                  dynamic: 30,  // Cache dynamic route 30 giây (như Next.js 14)
                  static: 180,  // Cache static route 3 phút (thay vì 5 phút)
                },
              },
            };

            export default nextConfig;
          `}
        </CodeBlock>
      </section>

      {/* Invalidation */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Cách Invalidate Router Cache
        </h2>
        <CodeBlock>
          {`
            'use client';

            import { useRouter } from 'next/navigation';

            export default function RefreshButton() {
              const router = useRouter();

              return (
                <div>
                  {/* Cách 1: router.refresh() — xoá cache và re-fetch */}
                  <button onClick={() => router.refresh()}>
                    Làm mới dữ liệu
                  </button>

                  {/* Cách 2: Hard navigation — xoá toàn bộ cache */}
                  <a href="/products">
                    Hard navigate (không qua Link component)
                  </a>
                </div>
              );
            }

            // Cách 3: Trong Server Action — revalidatePath/revalidateTag
            // cũng invalidate Router Cache
            // app/actions.ts
            'use server';
            import { revalidatePath } from 'next/cache';

            export async function updateProduct() {
              // ... update data
              revalidatePath('/products');
              // → Invalidate cả Data Cache, Full Route Cache VÀ Router Cache
            }
          `}
        </CodeBlock>
      </section>

      {/* Ví dụ thực tế */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Ví dụ thực tế: Điều hướng nhanh
        </h2>
        <CodeBlock>
          {`
            // Kịch bản: User điều hướng giữa các trang sản phẩm
            //
            // 1. User vào /products         → Fetch từ server, lưu vào Router Cache
            // 2. User click /products/1     → Fetch từ server, lưu vào Router Cache
            // 3. User click Back (quay lại) → /products hiển thị NGAY từ Router Cache ⚡
            // 4. User click /products/1     → /products/1 hiển thị NGAY từ cache ⚡
            // 5. User click /products/2     → Fetch từ server (chưa có trong cache)
            //
            // Kết quả: Trải nghiệm điều hướng mượt mà, gần như instant

            // Với layout shared:
            // app/products/layout.tsx  ← Được cache, không fetch lại
            // app/products/page.tsx    ← Cached riêng
            // app/products/[id]/page.tsx ← Cached riêng cho mỗi id
          `}
        </CodeBlock>
      </section>

      <div className="rounded-lg border border-sky-800 bg-sky-900/30 p-4 text-sm text-sky-300">
        <strong>💡 Tổng kết:</strong> Router Cache hoạt động hoàn toàn phía
        client. Nó giúp điều hướng nhanh bằng cách tránh fetch lại dữ liệu đã
        có. Trong Next.js 15+, dynamic route mặc định không được cache phía
        client (staleTime = 0), đảm bảo dữ liệu luôn fresh.
      </div>
    </div>
  );
}
