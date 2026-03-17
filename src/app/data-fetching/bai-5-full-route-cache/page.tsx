import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bài 5: Full Route Cache & connection() - Learn Next.js',
};

export default function Bai5FullRouteCache() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-4xl font-bold text-white">
        Bài 5: Full Route Cache &amp; connection()
      </h1>
      <p className="mb-8 text-lg text-slate-300">
        Full Route Cache là cơ chế Next.js cache toàn bộ kết quả render (HTML +
        RSC Payload) của một route trên server. Điều này giúp trang được phục vụ
        cực nhanh mà không cần render lại mỗi lần có request.
      </p>

      {/* Cách hoạt động */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Cách hoạt động
        </h2>
        <div className="mb-4 overflow-x-auto rounded-xl bg-zinc-900 p-6 text-sm text-zinc-100">
          <pre>
            <code>{`Build Time (next build)
│
├── Static Route (không có dynamic functions)
│   ├── Render HTML + RSC Payload
│   ├── Lưu vào Full Route Cache  ✅
│   └── User request → Trả về từ cache (rất nhanh)
│
└── Dynamic Route (có cookies, headers, searchParams...)
    ├── Không thể render lúc build
    ├── KHÔNG lưu vào Full Route Cache  ❌
    └── User request → Render on-demand mỗi lần`}</code>
          </pre>
        </div>
        <p className="text-slate-300">
          Tại build time, Next.js sẽ phân tích mỗi route. Nếu route không sử
          dụng bất kỳ dynamic function nào, nó sẽ được pre-render và lưu vào
          Full Route Cache. Kết quả bao gồm hai phần:
        </p>
        <ul className="mt-2 ml-5 list-disc space-y-1 text-slate-300">
          <li>
            <strong>HTML:</strong> Cho lần tải đầu tiên (first load)
          </li>
          <li>
            <strong>RSC Payload:</strong> Cho các lần điều hướng tiếp theo
            (client-side navigation)
          </li>
        </ul>
      </section>

      {/* Static vs Dynamic */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Static Route vs Dynamic Route
        </h2>
        <pre className="mb-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// ✅ STATIC — Được cache vào Full Route Cache
// app/about/page.tsx
export default function AboutPage() {
  return <h1>Giới thiệu về chúng tôi</h1>;
}

// ✅ STATIC — fetch có cache cũng là static
// app/products/page.tsx
export default async function ProductsPage() {
  const res = await fetch('https://api.example.com/products', {
    cache: 'force-cache',
  });
  const products = await res.json();
  return <ProductList products={products} />;
}

// ❌ DYNAMIC — Sử dụng cookies() → không cache
// app/dashboard/page.tsx
import { cookies } from 'next/headers';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  // ...
}

// ❌ DYNAMIC — Sử dụng searchParams → không cache
// app/search/page.tsx
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  // ...
}`}</code>
        </pre>
      </section>

      {/* Dynamic Functions */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Các Dynamic Functions
        </h2>
        <p className="mb-4 text-slate-300">
          Khi một route sử dụng bất kỳ hàm nào dưới đây, nó sẽ trở thành dynamic
          và bỏ qua Full Route Cache:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Hàm
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Mô tả
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-mono text-xs">cookies()</td>
                <td className="px-4 py-3">Đọc cookies từ request</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-mono text-xs">headers()</td>
                <td className="px-4 py-3">Đọc HTTP headers</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-mono text-xs">searchParams</td>
                <td className="px-4 py-3">Đọc query string parameters</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-mono text-xs">connection()</td>
                <td className="px-4 py-3">Chờ kết nối incoming request</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">
                  {`cache: 'no-store'`}
                </td>
                <td className="px-4 py-3">
                  fetch không cache cũng khiến route thành dynamic
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* connection() */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          connection() — Opt-in Dynamic Rendering
        </h2>
        <p className="mb-4 text-slate-300">
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            connection()
          </code>{' '}
          là một hàm từ{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            next/server
          </code>{' '}
          cho phép bạn chủ động khai báo rằng component cần được render
          dynamically. Khi gọi{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            await connection()
          </code>
          , Next.js sẽ đợi có incoming request trước khi render.
        </p>
        <pre className="mb-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// app/dynamic-page/page.tsx
import { connection } from 'next/server';

export default async function DynamicPage() {
  // Đánh dấu route này phải render dynamically
  await connection();

  // Bây giờ có thể sử dụng dữ liệu phụ thuộc vào request
  const currentTime = new Date().toLocaleString('vi-VN');

  return (
    <div>
      <h1>Trang Dynamic</h1>
      <p>Thời gian hiện tại: {currentTime}</p>
    </div>
  );
}

// Khi nào dùng connection()?
// - Khi bạn muốn route luôn render mới mỗi request
// - Khi cần dữ liệu phụ thuộc vào thời gian thực
// - Thay thế cho việc dùng cookies/headers chỉ để opt-in dynamic`}</code>
        </pre>
        <div className="rounded-lg border border-sky-800 bg-sky-900/30 p-4 text-sm text-sky-300">
          <strong>💡 Mẹo:</strong> Dùng <code>await connection()</code> khi bạn
          muốn opt-in dynamic rendering mà không cần đọc cookies hay headers.
          Đây là cách rõ ràng nhất để khai báo ý định.
        </div>
      </section>

      {/* Revalidation */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Cách Invalidate Full Route Cache
        </h2>
        <p className="mb-4 text-slate-300">
          Full Route Cache có thể bị vô hiệu hoá bằng các cách sau:
        </p>
        <pre className="mb-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// 1. Revalidate Data Cache → tự động invalidate Full Route Cache
// Khi Data Cache bị revalidate, Next.js sẽ re-render route
import { revalidatePath, revalidateTag } from 'next/cache';

// Trong Server Action:
revalidatePath('/products');    // Invalidate theo path
revalidateTag('products');     // Invalidate theo tag

// 2. Re-deploy
// Mỗi lần deploy mới, Full Route Cache bị xoá hoàn toàn
// (Data Cache vẫn giữ nguyên nếu dùng external cache store)

// 3. Sử dụng Segment Config
// app/products/page.tsx
export const dynamic = 'force-dynamic';  // Luôn render dynamic
export const revalidate = 0;             // Tương đương force-dynamic`}</code>
        </pre>
      </section>

      {/* Kết hợp với Partial Prerendering */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Kết hợp Static và Dynamic với Suspense
        </h2>
        <p className="mb-4 text-slate-300">
          Bạn có thể kết hợp static và dynamic content trong cùng một route bằng
          cách sử dụng{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            Suspense
          </code>
          :
        </p>
        <pre className="mb-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// app/product/[id]/page.tsx
import { Suspense } from 'react';

// Component static — dữ liệu cached
async function ProductInfo({ id }: { id: string }) {
  const res = await fetch(\`https://api.example.com/products/\${id}\`, {
    cache: 'force-cache',
  });
  const product = await res.json();
  return <h1>{product.name}</h1>;
}

// Component dynamic — dữ liệu real-time
async function ProductStock({ id }: { id: string }) {
  const res = await fetch(\`https://api.example.com/products/\${id}/stock\`, {
    cache: 'no-store',
  });
  const stock = await res.json();
  return <p>Còn {stock.quantity} sản phẩm</p>;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      {/* Phần static — render nhanh từ cache */}
      <ProductInfo id={id} />

      {/* Phần dynamic — stream khi có dữ liệu */}
      <Suspense fallback={<p>Đang kiểm tra tồn kho...</p>}>
        <ProductStock id={id} />
      </Suspense>
    </div>
  );
}`}</code>
        </pre>
        <div className="rounded-lg border border-amber-800 bg-amber-900/30 p-4 text-sm text-amber-300">
          <strong>⚠️ Lưu ý:</strong> Khi bất kỳ phần nào của route là dynamic,
          toàn bộ route sẽ trở thành dynamic. Tuy nhiên, phần static vẫn được
          gửi ngay và phần dynamic sẽ được stream khi sẵn sàng nhờ Suspense.
        </div>
      </section>
    </div>
  );
}
