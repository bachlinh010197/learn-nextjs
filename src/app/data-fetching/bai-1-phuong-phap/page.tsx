import type { Metadata } from 'next';
import { CodeBlock } from '@/components/CodeBlock';

export const metadata: Metadata = {
  title: 'Bài 1: Phương pháp Data Fetching - Learn Next.js',
};

export default function Bai1PhuongPhap() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-4xl font-bold text-white">
        Bài 1: Phương pháp Data Fetching trong Next.js
      </h1>
      <p className="mb-8 text-lg text-slate-300">
        Next.js cung cấp nhiều cách để lấy dữ liệu. Mỗi phương pháp phù hợp với
        một trường hợp sử dụng khác nhau. Hãy cùng tìm hiểu từng cách.
      </p>

      {/* fetch() trên Server */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          1. fetch() trên Server Component
        </h2>
        <p className="mb-4 text-slate-300">
          Đây là cách phổ biến nhất. Next.js mở rộng Web{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            fetch()
          </code>{' '}
          API để hỗ trợ caching và revalidation. Bạn có thể gọi{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            fetch()
          </code>{' '}
          trực tiếp trong Server Component, Route Handler hoặc Server Action.
        </p>
        <CodeBlock>
          {`
            // app/products/page.tsx
            // Server Component — mặc định trong App Router

            async function getProducts() {
              const res = await fetch('https://api.example.com/products', {
                cache: 'force-cache', // Cache vĩnh viễn (mặc định)
              });
              return res.json();
            }

            export default async function ProductsPage() {
              const products = await getProducts();

              return (
                <ul>
                  {products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                  ))}
                </ul>
              );
            }
          `}
        </CodeBlock>
        <div className="rounded-lg border border-sky-800 bg-sky-900/30 p-4 text-sm text-sky-300">
          <strong>💡 Lưu ý:</strong> Trong Next.js 15+, fetch() mặc định là{' '}
          <code>cache: &apos;no-store&apos;</code> (không cache). Bạn cần chỉ
          định rõ nếu muốn cache.
        </div>
      </section>

      {/* Route Handlers */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          2. Route Handlers
        </h2>
        <p className="mb-4 text-slate-300">
          Route Handlers cho phép bạn tạo API endpoints tùy chỉnh bằng Web
          Request và Response API. Chúng chạy trên server và không được đóng gói
          vào client bundle.
        </p>
        <CodeBlock>
          {`
            // app/api/products/route.ts
            import { NextResponse } from 'next/server';

            export async function GET() {
              const res = await fetch('https://api.example.com/products');
              const data = await res.json();

              return NextResponse.json(data);
            }

            export async function POST(request: Request) {
              const body = await request.json();

              // Xử lý tạo product mới
              const res = await fetch('https://api.example.com/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
              });

              const data = await res.json();
              return NextResponse.json(data, { status: 201 });
            }
          `}
        </CodeBlock>
        <div className="rounded-lg border border-amber-800 bg-amber-900/30 p-4 text-sm text-amber-300">
          <strong>⚠️ Chú ý:</strong> Không nên gọi Route Handler từ Server
          Component. Thay vào đó, hãy gọi trực tiếp hàm lấy dữ liệu trong Server
          Component để tránh request không cần thiết.
        </div>
      </section>

      {/* Server Actions */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          3. Server Actions
        </h2>
        <p className="mb-4 text-slate-300">
          Server Actions là các hàm async chạy trên server, có thể được gọi từ
          cả Server và Client Component. Chúng thường dùng để xử lý form
          submissions và mutations (thay đổi dữ liệu).
        </p>
        <CodeBlock>
          {`
            // app/actions.ts
            'use server';

            import { revalidatePath } from 'next/cache';

            export async function createProduct(formData: FormData) {
              const name = formData.get('name') as string;
              const price = Number(formData.get('price'));

              await fetch('https://api.example.com/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, price }),
              });

              // Revalidate cache sau khi thay đổi dữ liệu
              revalidatePath('/products');
            }

            // Sử dụng trong component:
            // app/products/new/page.tsx
            import { createProduct } from '@/app/actions';

            export default function NewProductPage() {
              return (
                <form action={createProduct}>
                  <input name="name" placeholder="Tên sản phẩm" />
                  <input name="price" type="number" placeholder="Giá" />
                  <button type="submit">Tạo sản phẩm</button>
                </form>
              );
            }
          `}
        </CodeBlock>
      </section>

      {/* Thư viện bên thứ ba */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          4. Thư viện bên thứ ba
        </h2>
        <p className="mb-4 text-slate-300">
          Bạn cũng có thể sử dụng các thư viện như ORM (Prisma, Drizzle),
          database client, hoặc CMS SDK để lấy dữ liệu. Các thư viện này không
          sử dụng{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            fetch()
          </code>{' '}
          nên không được Next.js tự động cache và memoize.
        </p>
        <CodeBlock>
          {`
            // Ví dụ với Prisma ORM
            // app/users/page.tsx
            import { prisma } from '@/lib/prisma';

            export default async function UsersPage() {
              // Gọi trực tiếp database — không qua fetch()
              const users = await prisma.user.findMany({
                orderBy: { createdAt: 'desc' },
              });

              return (
                <ul>
                  {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                  ))}
                </ul>
              );
            }

            // Để cache kết quả, dùng unstable_cache hoặc React.cache:
            import { unstable_cache } from 'next/cache';

            const getCachedUsers = unstable_cache(
              async () => prisma.user.findMany(),
              ['users'],         // cache key
              { revalidate: 60 } // revalidate sau 60 giây
            );
          `}
        </CodeBlock>
      </section>

      {/* So sánh */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          So sánh các phương pháp
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Phương pháp
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Khi nào dùng
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Tự động cache
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-medium">fetch() trên server</td>
                <td className="px-4 py-3">Lấy dữ liệu từ API bên ngoài</td>
                <td className="px-4 py-3">✅ Có (cấu hình được)</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-medium">Route Handlers</td>
                <td className="px-4 py-3">Tạo API cho client hoặc webhook</td>
                <td className="px-4 py-3">⚠️ Tùy method (GET có cache)</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-medium">Server Actions</td>
                <td className="px-4 py-3">Form submission, mutations</td>
                <td className="px-4 py-3">❌ Không</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Thư viện bên thứ ba</td>
                <td className="px-4 py-3">ORM, database trực tiếp</td>
                <td className="px-4 py-3">❌ Không (cần cấu hình thêm)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
