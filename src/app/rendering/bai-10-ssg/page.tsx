import { CodeBlock } from '@/components/CodeBlock';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bài 10: SSG - Rendering Strategies',
};

export default async function Bai10Page() {
  const buildTime = new Date().toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });

  let posts: Array<{ id: number; title: string; body: string }> = [];
  try {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_limit=5',
    );
    posts = await res.json();
  } catch {
    posts = [];
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-white">
        Bài 10: SSG (Static Site Generation)
      </h1>

      <p className="mb-8 leading-relaxed text-slate-300">
        Static Site Generation (SSG) tạo HTML tại <strong>build time</strong>.
        Các trang tĩnh được serve trực tiếp từ CDN, cho tốc độ tải trang nhanh
        nhất có thể. Đây là chiến lược rendering <strong>mặc định</strong> của
        Next.js khi không có Dynamic APIs.
      </p>

      {/* How SSG works */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          SSG hoạt động như thế nào?
        </h2>
        <ol className="mb-4 list-inside list-decimal space-y-2 text-slate-300">
          <li>
            Khi chạy <code>next build</code>, Next.js render tất cả các static
            routes thành HTML files.
          </li>
          <li>
            Nếu page có <code>fetch</code>, data được fetch lúc build và embed
            vào HTML.
          </li>
          <li>
            HTML files được serve trực tiếp — không cần server render lại.
          </li>
          <li>
            Dữ liệu chỉ cập nhật khi <code>next build</code> lại (trừ khi dùng
            ISR).
          </li>
        </ol>

        <CodeBlock>
          {`
            // app/about/page.tsx
            // Trang này tự động SSG vì không có Dynamic APIs

            export default async function AboutPage() {
              // Fetch được cache mặc định → SSG
              const res = await fetch("https://api.example.com/about");
              const data = await res.json();

              return (
                <div>
                  <h1>{data.title}</h1>
                  <p>{data.content}</p>
                </div>
              );
            }
          `}
        </CodeBlock>
      </section>

      {/* generateStaticParams */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          generateStaticParams — SSG cho Dynamic Routes
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          Khi bạn có dynamic routes (ví dụ: <code>/blog/[slug]</code>), Next.js
          không biết tạo HTML cho những slug nào. Hàm{' '}
          <code>generateStaticParams</code> cho Next.js biết danh sách các
          params cần pre-render.
        </p>

        <CodeBlock>
          {`
            // app/blog/[slug]/page.tsx

            // Bước 1: Cho Next.js biết tạo HTML cho những slug nào
            export async function generateStaticParams() {
              const res = await fetch("https://api.example.com/posts");
              const posts = await res.json();

              // Trả về array of params
              return posts.map((post) => ({
                slug: post.slug,
              }));
              // → Tạo HTML cho /blog/hello-world, /blog/nextjs-guide, ...
            }

            // Bước 2: Render page cho mỗi slug
            export default async function BlogPost({
              params,
            }: {
              params: Promise<{ slug: string }>;
            }) {
              const { slug } = await params;
              const res = await fetch(\`https://api.example.com/posts/\${slug}\`);
              const post = await res.json();

              return (
                <article>
                  <h1>{post.title}</h1>
                  <p>{post.content}</p>
                </article>
              );
            }
          `}
        </CodeBlock>

        <div className="rounded-lg border border-amber-800 bg-amber-900/30 p-4">
          <p className="text-sm text-amber-300">
            💡 <strong>Lưu ý:</strong> Nếu user truy cập một slug{' '}
            <strong>không có</strong> trong <code>generateStaticParams</code>,
            Next.js sẽ render on-demand (SSR) lần đầu, rồi cache lại cho các
            request sau. Dùng <code>export const dynamicParams = false</code> để
            trả về 404.
          </p>
        </div>
      </section>

      {/* Multiple dynamic segments */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Nhiều dynamic segments
        </h2>
        <CodeBlock>
          {`
            // app/shop/[category]/[product]/page.tsx

            export async function generateStaticParams() {
              const products = await fetch("https://api.example.com/products");
              const data = await products.json();

              return data.map((product) => ({
                category: product.category,
                product: product.slug,
              }));
              // → /shop/phones/iphone-15, /shop/laptops/macbook-pro, ...
            }

            export default async function ProductPage({
              params,
            }: {
              params: Promise<{ category: string; product: string }>;
            }) {
              const { category, product } = await params;
              // ...
            }
          `}
        </CodeBlock>
      </section>

      {/* generateMetadata */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          generateMetadata — SEO cho dynamic pages
        </h2>
        <CodeBlock>
          {`
            // app/blog/[slug]/page.tsx

            import type { Metadata } from "next";

            // Dynamic metadata cho mỗi bài viết
            export async function generateMetadata({
              params,
            }: {
              params: Promise<{ slug: string }>;
            }): Promise<Metadata> {
              const { slug } = await params;
              const res = await fetch(\`https://api.example.com/posts/\${slug}\`);
              const post = await res.json();

              return {
                title: post.title,
                description: post.excerpt,
                openGraph: {
                  title: post.title,
                  description: post.excerpt,
                  images: [post.coverImage],
                },
              };
            }
          `}
        </CodeBlock>
      </section>

      {/* Live demo */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          🎮 Demo: Dữ liệu được fetch lúc build
        </h2>
        <p className="mb-2 text-sm text-slate-400">
          Trang này fetch 5 bài viết từ JSONPlaceholder. Dữ liệu được embed
          trong HTML lúc build:
        </p>

        <div className="mb-4 rounded-lg border border-emerald-800 bg-emerald-900/30 p-4">
          <p className="text-sm text-emerald-300">
            ⏰ Render lúc: <strong>{buildTime}</strong>
          </p>
          <p className="mt-1 text-xs text-emerald-400">
            Giá trị này cố định (không đổi khi reload) vì trang là static.
          </p>
        </div>

        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-lg border border-slate-700 bg-slate-800 p-4"
            >
              <h3 className="font-semibold text-white">
                {post.id}. {post.title}
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                {post.body.slice(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* dynamicParams */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          dynamicParams config
        </h2>
        <CodeBlock>
          {`
            // Cho phép render on-demand cho params không có trong
            // generateStaticParams (mặc định: true)
            export const dynamicParams = true;

            // Trả về 404 cho params không có trong generateStaticParams
            export const dynamicParams = false;
          `}
        </CodeBlock>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-slate-600">
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  dynamicParams
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  Params trong generateStaticParams
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  Params KHÔNG trong generateStaticParams
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-medium">true (mặc định)</td>
                <td className="px-4 py-3">Static (pre-render)</td>
                <td className="px-4 py-3">Dynamic (on-demand)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">false</td>
                <td className="px-4 py-3">Static (pre-render)</td>
                <td className="px-4 py-3">404</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Summary */}
      <section className="rounded-lg border border-sky-800 bg-sky-900/30 p-6">
        <h2 className="mb-2 text-lg font-semibold text-sky-300">💡 Tóm tắt</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-sky-400">
          <li>
            SSG là chiến lược <strong>mặc định</strong> — nhanh nhất, serve từ
            CDN.
          </li>
          <li>
            Dùng <code>generateStaticParams</code> cho dynamic routes (
            <code>[slug]</code>).
          </li>
          <li>
            Kết hợp <code>generateMetadata</code> cho SEO tốt nhất.
          </li>
          <li>
            Dùng <code>dynamicParams = false</code> để trả 404 cho params không
            hợp lệ.
          </li>
          <li>
            Phù hợp cho: Blog, docs, marketing pages, catalog — nội dung ít thay
            đổi.
          </li>
        </ul>
      </section>
    </div>
  );
}
