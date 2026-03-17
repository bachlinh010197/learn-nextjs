import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bài 4: Data Cache - Learn Next.js',
};

export default function Bai4DataCache() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-4xl font-bold text-white">Bài 4: Data Cache</h1>
      <p className="mb-8 text-lg text-slate-300">
        Data Cache là tầng cache trên server, lưu trữ kết quả{' '}
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
          fetch()
        </code>{' '}
        và persist giữa các request và thậm chí giữa các lần deployment. Đây là
        tầng cache quan trọng nhất để bạn kiểm soát.
      </p>

      {/* Cơ chế hoạt động */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Cơ chế hoạt động
        </h2>
        <div className="mb-4 overflow-x-auto rounded-xl bg-zinc-900 p-6 text-sm text-zinc-100">
          <pre>
            <code>{`fetch() request
    │
    ▼
Kiểm tra Data Cache
    │
    ├── HIT (có trong cache)
    │   └── Trả về cached data ──→ Không gọi API
    │
    └── MISS (không có trong cache)
        └── Gọi API ──→ Lưu response vào cache ──→ Trả về data`}</code>
          </pre>
        </div>
      </section>

      {/* cache: 'force-cache' */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          1. cache: &apos;force-cache&apos; — Cache vĩnh viễn
        </h2>
        <p className="mb-4 text-slate-300">
          Khi sử dụng{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            {`cache: 'force-cache'`}
          </code>
          , Next.js sẽ cache response và không bao giờ tự động fetch lại cho đến
          khi bạn chủ động revalidate.
        </p>
        <pre className="mb-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// Dữ liệu được cache vĩnh viễn
// Phù hợp cho dữ liệu ít thay đổi (config, danh mục...)
const res = await fetch('https://api.example.com/categories', {
  cache: 'force-cache',
});

// Lần đầu: gọi API và lưu vào cache
// Các lần sau: trả về từ cache ngay lập tức`}</code>
        </pre>
        <div className="rounded-lg border border-sky-800 bg-sky-900/30 p-4 text-sm text-sky-300">
          <strong>💡 Lưu ý:</strong> Trong Next.js 15+, fetch() mặc định là{' '}
          <code>no-store</code> (không cache). Bạn cần chỉ định rõ{' '}
          <code>{`cache: 'force-cache'`}</code> nếu muốn cache.
        </div>
      </section>

      {/* cache: 'no-store' */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          2. cache: &apos;no-store&apos; — Không cache
        </h2>
        <p className="mb-4 text-slate-300">
          Mỗi request sẽ luôn gọi API để lấy dữ liệu mới nhất. Phù hợp cho dữ
          liệu thay đổi liên tục.
        </p>
        <pre className="mb-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// Dữ liệu luôn fresh — không cache
// Phù hợp cho dashboard real-time, giỏ hàng...
const res = await fetch('https://api.example.com/dashboard/stats', {
  cache: 'no-store',
});

// Mỗi lần user truy cập trang → gọi API mới`}</code>
        </pre>
      </section>

      {/* Time-based Revalidation */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          3. Time-based Revalidation (next.revalidate)
        </h2>
        <p className="mb-4 text-slate-300">
          Cache dữ liệu nhưng tự động làm mới sau một khoảng thời gian. Kết hợp
          ưu điểm của cả caching và dữ liệu fresh.
        </p>
        <pre className="mb-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// Cache trong 1 giờ (3600 giây)
const res = await fetch('https://api.example.com/products', {
  next: { revalidate: 3600 },
});

// Hoạt động theo cơ chế stale-while-revalidate:
// 1. Lần đầu: gọi API, cache kết quả
// 2. Trong 3600 giây: trả về từ cache
// 3. Sau 3600 giây: vẫn trả về cache (stale),
//    nhưng trigger revalidation ở background
// 4. Khi revalidation xong: cập nhật cache với data mới`}</code>
        </pre>
        <pre className="mb-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// Có thể đặt revalidate ở cấp route thay vì từng fetch:
// app/products/page.tsx
export const revalidate = 3600; // Tất cả fetch trong route revalidate sau 1h

export default async function ProductsPage() {
  // Fetch này sẽ dùng revalidate = 3600
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();

  return <ProductList products={products} />;
}`}</code>
        </pre>
      </section>

      {/* On-demand Revalidation */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          4. On-demand Revalidation (Tag-based)
        </h2>
        <p className="mb-4 text-slate-300">
          Chủ động xoá cache khi dữ liệu thay đổi, thay vì chờ hết thời gian. Sử
          dụng{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            revalidateTag
          </code>{' '}
          hoặc{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            revalidatePath
          </code>
          .
        </p>
        <pre className="mb-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// Bước 1: Gán tag cho fetch request
// app/products/page.tsx
const res = await fetch('https://api.example.com/products', {
  next: { tags: ['products'] },
});

// Bước 2: Revalidate khi cần (trong Server Action)
// app/actions.ts
'use server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  // ... tạo product mới

  // Cách 1: Revalidate theo tag
  revalidateTag('products');

  // Cách 2: Revalidate theo path
  revalidatePath('/products');
}`}</code>
        </pre>
      </section>

      {/* Ví dụ tổng hợp */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Ví dụ tổng hợp
        </h2>
        <pre className="mb-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// app/shop/page.tsx
export default async function ShopPage() {
  // Danh mục — ít thay đổi, cache vĩnh viễn
  const categories = await fetch('https://api.example.com/categories', {
    cache: 'force-cache',
    next: { tags: ['categories'] },
  }).then(r => r.json());

  // Sản phẩm — thay đổi thường xuyên, revalidate mỗi 5 phút
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 300, tags: ['products'] },
  }).then(r => r.json());

  // Giỏ hàng — dữ liệu real-time, không cache
  const cart = await fetch('https://api.example.com/cart', {
    cache: 'no-store',
  }).then(r => r.json());

  return (
    <div>
      <CategoryNav categories={categories} />
      <ProductGrid products={products} />
      <CartSummary cart={cart} />
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* Bảng tổng hợp */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Bảng tổng hợp các tuỳ chọn
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Tuỳ chọn
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Hành vi
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Khi nào dùng
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-mono text-xs">
                  {`cache: 'force-cache'`}
                </td>
                <td className="px-4 py-3">Cache vĩnh viễn</td>
                <td className="px-4 py-3">Dữ liệu tĩnh, config</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-mono text-xs">
                  {`cache: 'no-store'`}
                </td>
                <td className="px-4 py-3">Không cache</td>
                <td className="px-4 py-3">Real-time data</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-mono text-xs">
                  {`next: { revalidate: N }`}
                </td>
                <td className="px-4 py-3">Cache N giây rồi làm mới</td>
                <td className="px-4 py-3">Dữ liệu thay đổi định kỳ</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">
                  {`next: { tags: [...] }`}
                </td>
                <td className="px-4 py-3">Cache + revalidate theo tag</td>
                <td className="px-4 py-3">Dữ liệu cần invalidate chính xác</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
