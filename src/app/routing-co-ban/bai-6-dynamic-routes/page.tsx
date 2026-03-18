import Link from 'next/link';
import { CodeBlock } from '@/components/CodeBlock';

const exampleSlugs = [
  { slug: 'javascript-co-ban', title: 'JavaScript Cơ Bản' },
  { slug: 'react-hooks', title: 'React Hooks' },
  { slug: 'nextjs-routing', title: 'Next.js Routing' },
];

export default function Bai6DynamicRoutesPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold text-white">
        Bài 6: Dynamic Routes
      </h1>
      <p className="mb-6 text-slate-300">
        Dynamic Routes cho phép bạn tạo các trang có URL động bằng cách sử dụng
        dấu ngoặc vuông{' '}
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
          [slug]
        </code>{' '}
        trong tên thư mục. Rất hữu ích cho blog posts, sản phẩm, profile người
        dùng, v.v.
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Cú pháp Dynamic Segments
        </h2>
        <CodeBlock>
          {`
            app/blog/[slug]/page.tsx     → /blog/bai-viet-1, /blog/bai-viet-2
            app/shop/[id]/page.tsx      → /shop/1, /shop/2, /shop/abc
            app/user/[userId]/page.tsx  → /user/123, /user/john
          `}
        </CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Đọc params trong page
        </h2>
        <CodeBlock>
          {`
            // app/blog/[slug]/page.tsx
            export default async function BlogPost({
              params,
            }: {
              params: Promise<{ slug: string }>;
            }) {
              const { slug } = await params;

              return (
                <div>
                  <h1>Bài viết: {slug}</h1>
                </div>
              );
            }
          `}
        </CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Các loại Dynamic Segments
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="py-2 pr-4 font-semibold text-white">Cú pháp</th>
                <th className="py-2 pr-4 font-semibold text-white">
                  URL ví dụ
                </th>
                <th className="py-2 font-semibold text-white">params</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="py-2 pr-4 font-mono text-sm">[slug]</td>
                <td className="py-2 pr-4">/blog/hello</td>
                <td className="py-2 font-mono text-sm">{`{ slug: "hello" }`}</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 pr-4 font-mono text-sm">[...slug]</td>
                <td className="py-2 pr-4">/blog/a/b/c</td>
                <td className="py-2 font-mono text-sm">{`{ slug: ["a","b","c"] }`}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-sm">[[...slug]]</td>
                <td className="py-2 pr-4">/blog hoặc /blog/a/b</td>
                <td className="py-2 font-mono text-sm">{`{ slug: undefined } hoặc { slug: ["a","b"] }`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-cyan-800 bg-cyan-900/30 p-4">
        <h3 className="mb-3 font-semibold text-cyan-300">
          🧪 Demo: Nhấn vào các link bên dưới
        </h3>
        <div className="flex flex-col gap-2">
          {exampleSlugs.map((item) => (
            <Link
              key={item.slug}
              href={`/routing-co-ban/bai-6-dynamic-routes/${item.slug}`}
              className="rounded-md bg-cyan-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-cyan-700"
            >
              {item.title} → /bai-6-dynamic-routes/{item.slug}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
