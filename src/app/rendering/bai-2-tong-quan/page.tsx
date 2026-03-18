import { CodeBlock } from '@/components/CodeBlock';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bài 2: Tổng quan Rendering - Rendering Strategies',
};

export default function Bai2Page() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-white">
        Bài 2: Tổng Quan Các Chiến Lược Rendering
      </h1>

      <p className="mb-8 leading-relaxed text-slate-300">
        Next.js cung cấp nhiều chiến lược rendering khác nhau. Mỗi chiến lược
        phù hợp với một loại nội dung và yêu cầu khác nhau. Hiểu rõ chúng sẽ
        giúp bạn chọn đúng cách render cho từng trang.
      </p>

      {/* CSR */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          1. CSR — Client-Side Rendering
        </h2>
        <p className="mb-3 leading-relaxed text-slate-300">
          Toàn bộ quá trình render diễn ra trên trình duyệt. Server chỉ trả về
          HTML trống và JavaScript bundle. Sau khi JS tải xong, React mới render
          UI và fetch dữ liệu.
        </p>
        <CodeBlock>
          {`
            "use client";
            import { useEffect, useState } from "react";

            export default function CSRPage() {
              const [data, setData] = useState(null);

              useEffect(() => {
                fetch("/api/products")
                  .then((res) => res.json())
                  .then(setData);
              }, []);

              if (!data) return <p>Loading...</p>;
              return <ProductList data={data} />;
            }
          `}
        </CodeBlock>
        <p className="mt-2 text-sm text-slate-400">
          ✅ Phù hợp: Dashboard, admin panel, ứng dụng nội bộ.
          <br />❌ Không phù hợp: Trang cần SEO, landing page.
        </p>
      </section>

      {/* SSR */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          2. SSR — Server-Side Rendering
        </h2>
        <p className="mb-3 leading-relaxed text-slate-300">
          HTML được render trên server cho <strong>mỗi request</strong>. Server
          fetch dữ liệu, render React components thành HTML, và gửi về cho trình
          duyệt. Trang luôn có dữ liệu mới nhất.
        </p>
        <CodeBlock>
          {`
            // Trang này tự động SSR khi dùng Dynamic APIs
            import { cookies } from "next/headers";

            export default async function SSRPage() {
              const cookieStore = await cookies();
              const theme = cookieStore.get("theme");

              const res = await fetch("https://api.example.com/data", {
                cache: "no-store",
              });
              const data = await res.json();

              return <div>...</div>;
            }
          `}
        </CodeBlock>
        <p className="mt-2 text-sm text-slate-400">
          ✅ Phù hợp: Nội dung cá nhân hóa, dữ liệu real-time.
          <br />❌ Nhược điểm: Chậm hơn SSG vì phải render mỗi request.
        </p>
      </section>

      {/* SSG */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          3. SSG — Static Site Generation
        </h2>
        <p className="mb-3 leading-relaxed text-slate-300">
          HTML được tạo sẵn tại <strong>build time</strong>. Các trang tĩnh được
          serve trực tiếp từ CDN, cho tốc độ cực nhanh. Đây là chiến lược mặc
          định của Next.js khi không có dynamic APIs.
        </p>
        <CodeBlock>
          {`
            // Trang này tự động SSG (không có dynamic APIs)
            export default async function BlogPage() {
              const posts = await fetch("https://api.example.com/posts");
              const data = await posts.json();

              return (
                <ul>
                  {data.map((post) => (
                    <li key={post.id}>{post.title}</li>
                  ))}
                </ul>
              );
            }

            // Cho dynamic routes
            export async function generateStaticParams() {
              const posts = await fetch("https://api.example.com/posts");
              const data = await posts.json();
              return data.map((post) => ({ slug: post.slug }));
            }
          `}
        </CodeBlock>
        <p className="mt-2 text-sm text-slate-400">
          ✅ Phù hợp: Blog, docs, marketing pages.
          <br />❌ Nhược điểm: Dữ liệu chỉ cập nhật khi build lại.
        </p>
      </section>

      {/* ISR */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          4. ISR — Incremental Static Regeneration
        </h2>
        <p className="mb-3 leading-relaxed text-slate-300">
          Kết hợp ưu điểm của SSG và SSR. Trang được tạo tĩnh nhưng tự động
          regenerate sau một khoảng thời gian (revalidate). Người dùng vẫn nhận
          được trang tĩnh nhanh, trong khi dữ liệu được cập nhật định kỳ.
        </p>
        <CodeBlock>
          {`
            // Revalidate mỗi 60 giây
            export const revalidate = 60;

            export default async function ISRPage() {
              const res = await fetch("https://api.example.com/products");
              const products = await res.json();

              return (
                <div>
                  <p>Cập nhật lần cuối: {new Date().toLocaleString("vi-VN")}</p>
                  <ProductList products={products} />
                </div>
              );
            }
          `}
        </CodeBlock>
        <p className="mt-2 text-sm text-slate-400">
          ✅ Phù hợp: E-commerce, news, catalog — dữ liệu thay đổi nhưng không
          cần real-time.
        </p>
      </section>

      {/* Streaming */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">5. Streaming</h2>
        <p className="mb-3 leading-relaxed text-slate-300">
          Thay vì chờ toàn bộ trang render xong, server gửi HTML theo từng phần
          (chunks). Phần nào render xong được gửi trước, phần nào chậm sẽ hiển
          thị loading state rồi cập nhật sau.
        </p>
        <CodeBlock>
          {`
            import { Suspense } from "react";

            export default function StreamingPage() {
              return (
                <div>
                  <h1>Dashboard</h1>

                  {/* Hiển thị ngay */}
                  <header>Welcome back!</header>

                  {/* Streaming - hiện loading rồi thay thế khi xong */}
                  <Suspense fallback={<p>Đang tải thống kê...</p>}>
                    <SlowStatistics />
                  </Suspense>

                  <Suspense fallback={<p>Đang tải biểu đồ...</p>}>
                    <SlowChart />
                  </Suspense>
                </div>
              );
            }
          `}
        </CodeBlock>
        <p className="mt-2 text-sm text-slate-400">
          ✅ Phù hợp: Trang có nhiều phần với tốc độ tải khác nhau (dashboard,
          feed).
        </p>
      </section>

      {/* Comparison table */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-white">
          📊 Bảng So Sánh
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-slate-600">
                <th className="px-3 py-3 text-left font-semibold text-slate-300">
                  Chiến lược
                </th>
                <th className="px-3 py-3 text-left font-semibold text-slate-300">
                  Render ở đâu
                </th>
                <th className="px-3 py-3 text-left font-semibold text-slate-300">
                  Khi nào
                </th>
                <th className="px-3 py-3 text-left font-semibold text-slate-300">
                  SEO
                </th>
                <th className="px-3 py-3 text-left font-semibold text-slate-300">
                  Tốc độ
                </th>
                <th className="px-3 py-3 text-left font-semibold text-slate-300">
                  Dữ liệu
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="px-3 py-3 font-medium">CSR</td>
                <td className="px-3 py-3">Client</td>
                <td className="px-3 py-3">Runtime (browser)</td>
                <td className="px-3 py-3">❌</td>
                <td className="px-3 py-3">Chậm (FCP)</td>
                <td className="px-3 py-3">Luôn mới</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-3 py-3 font-medium">SSR</td>
                <td className="px-3 py-3">Server</td>
                <td className="px-3 py-3">Mỗi request</td>
                <td className="px-3 py-3">✅</td>
                <td className="px-3 py-3">Trung bình</td>
                <td className="px-3 py-3">Luôn mới</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-3 py-3 font-medium">SSG</td>
                <td className="px-3 py-3">Server</td>
                <td className="px-3 py-3">Build time</td>
                <td className="px-3 py-3">✅</td>
                <td className="px-3 py-3">Rất nhanh</td>
                <td className="px-3 py-3">Cũ (build)</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-3 py-3 font-medium">ISR</td>
                <td className="px-3 py-3">Server</td>
                <td className="px-3 py-3">Build + revalidate</td>
                <td className="px-3 py-3">✅</td>
                <td className="px-3 py-3">Nhanh</td>
                <td className="px-3 py-3">Gần mới</td>
              </tr>
              <tr>
                <td className="px-3 py-3 font-medium">Streaming</td>
                <td className="px-3 py-3">Server</td>
                <td className="px-3 py-3">Mỗi request (từng phần)</td>
                <td className="px-3 py-3">✅</td>
                <td className="px-3 py-3">Nhanh (FCP)</td>
                <td className="px-3 py-3">Luôn mới</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Decision tree */}
      <section className="rounded-lg border border-sky-800 bg-sky-900/30 p-6">
        <h2 className="mb-3 text-lg font-semibold text-sky-300">
          🤔 Chọn chiến lược nào?
        </h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-sky-400">
          <li>
            Nội dung <strong>không thay đổi</strong> (docs, blog)? →{' '}
            <strong>SSG</strong>
          </li>
          <li>
            Nội dung thay đổi <strong>không thường xuyên</strong> (catalog,
            news)? → <strong>ISR</strong>
          </li>
          <li>
            Nội dung <strong>cá nhân hóa</strong> hoặc cần dữ liệu real-time? →{' '}
            <strong>SSR</strong>
          </li>
          <li>
            Trang có nhiều phần với <strong>tốc độ tải khác nhau</strong>? →{' '}
            <strong>Streaming</strong>
          </li>
          <li>
            Dashboard, admin, <strong>không cần SEO</strong>? →{' '}
            <strong>CSR</strong>
          </li>
          <li>
            Trong thực tế, <strong>kết hợp nhiều chiến lược</strong> trong cùng
            một ứng dụng là cách phổ biến nhất!
          </li>
        </ul>
      </section>
    </div>
  );
}
