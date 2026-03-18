import { CodeBlock } from '@/components/CodeBlock';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bài 6: Static vs Dynamic Rendering - Rendering Strategies',
};

export default async function Bai6Page() {
  const buildTime = new Date().toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-white">
        Bài 6: Static vs Dynamic Rendering
      </h1>

      <p className="mb-8 leading-relaxed text-slate-300">
        Trong Next.js App Router, mỗi route có thể được render theo kiểu{' '}
        <strong>Static</strong> hoặc <strong>Dynamic</strong>. Next.js tự động
        chọn chiến lược phù hợp dựa trên cách bạn viết code.
      </p>

      {/* Static Rendering */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Static Rendering (Mặc định)
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          Khi một route được render <strong>statically</strong>, HTML được tạo
          tại <strong>build time</strong> (hoặc sau revalidation). Kết quả được
          cache và có thể serve từ CDN.
        </p>
        <CodeBlock>
          {`
            // ✅ Static Rendering - tự động vì không có dynamic APIs
            export default async function AboutPage() {
              // Fetch này được cache mặc định
              const res = await fetch("https://api.example.com/about");
              const data = await res.json();

              return <div>{data.content}</div>;
            }

            // Kết quả: HTML được tạo lúc build
            // → Trang load cực nhanh từ CDN
          `}
        </CodeBlock>

        <div className="rounded-lg border border-emerald-800 bg-emerald-900/30 p-4">
          <p className="text-sm text-emerald-300">
            🖥️ Trang này được render lúc: <strong>{buildTime}</strong>
          </p>
          <p className="mt-1 text-xs text-emerald-400">
            Nếu đây là static rendering, thời gian này sẽ giống nhau mỗi lần bạn
            tải trang (cho đến khi build lại).
          </p>
        </div>
      </section>

      {/* Dynamic Rendering */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Dynamic Rendering
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          Khi route sử dụng <strong>Dynamic APIs</strong>, Next.js tự động
          chuyển sang dynamic rendering — HTML được tạo mới cho mỗi request.
        </p>

        <h3 className="mb-2 text-lg font-medium text-slate-300">
          Các Dynamic APIs khiến route thành dynamic:
        </h3>
        <ul className="mb-4 list-inside list-disc space-y-1 text-slate-300">
          <li>
            <code>cookies()</code> — đọc cookies của request
          </li>
          <li>
            <code>headers()</code> — đọc headers của request
          </li>
          <li>
            <code>searchParams</code> — đọc query parameters
          </li>
          <li>
            <code>fetch</code> với <code>cache: &quot;no-store&quot;</code>
          </li>
        </ul>

        <CodeBlock>
          {`
            // 🔄 Dynamic Rendering - vì dùng cookies()
            import { cookies } from "next/headers";

            export default async function DashboardPage() {
              const cookieStore = await cookies();
              const token = cookieStore.get("auth-token");

              // Fetch với no-store cũng trigger dynamic
              const res = await fetch("https://api.example.com/user", {
                cache: "no-store",
                headers: { Authorization: \`Bearer \${token?.value}\` },
              });
              const user = await res.json();

              return <div>Xin chào, {user.name}!</div>;
            }

            // Kết quả: HTML được tạo mới cho mỗi request
            // → Dữ liệu luôn fresh, nhưng chậm hơn static
          `}
        </CodeBlock>
      </section>

      {/* How Next.js decides */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Next.js quyết định Static hay Dynamic như thế nào?
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-slate-600">
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  Điều kiện
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  Kết quả
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3">
                  Không có Dynamic APIs, fetch mặc định
                </td>
                <td className="px-4 py-3">🟢 Static</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3">
                  Dùng <code>cookies()</code> hoặc <code>headers()</code>
                </td>
                <td className="px-4 py-3">🔴 Dynamic</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3">
                  Dùng <code>searchParams</code> prop
                </td>
                <td className="px-4 py-3">🔴 Dynamic</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3">
                  Fetch với <code>cache: &quot;no-store&quot;</code>
                </td>
                <td className="px-4 py-3">🔴 Dynamic</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3">
                  Có{' '}
                  <code>export const dynamic = &quot;force-dynamic&quot;</code>
                </td>
                <td className="px-4 py-3">🔴 Dynamic</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  Có <code>export const revalidate = N</code>
                </td>
                <td className="px-4 py-3">🟡 Static + ISR</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Force static/dynamic */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Ép buộc Static hoặc Dynamic
        </h2>
        <p className="mb-4 text-slate-300">
          Bạn có thể ghi đè quyết định tự động bằng route segment config:
        </p>
        <CodeBlock>
          {`
            // Ép buộc dynamic rendering
            export const dynamic = "force-dynamic";

            // Ép buộc static rendering
            export const dynamic = "force-static";

            // ISR: static nhưng revalidate mỗi 60 giây
            export const revalidate = 60;
          `}
        </CodeBlock>
      </section>

      {/* Build output */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Cách kiểm tra trong build output
        </h2>
        <p className="mb-4 text-slate-300">
          Khi chạy <code>next build</code>, Next.js sẽ hiển thị từng route với
          ký hiệu cho biết chiến lược rendering:
        </p>
        <CodeBlock>
          {`
            Route (app)                    Size    First Load JS
            ┌ ○ /                          5.2 kB   89 kB
            ├ ○ /about                     1.1 kB   85 kB
            ├ λ /dashboard                 3.4 kB   87 kB
            ├ ○ /blog                      2.1 kB   86 kB
            └ λ /api/users                 0 B      84 kB

            ○  (Static)   prerendered as static content
            λ  (Dynamic)  server-rendered on demand
          `}
        </CodeBlock>
        <p className="mt-2 text-sm text-slate-400">
          <code>○</code> = Static (tạo sẵn lúc build), <code>λ</code> = Dynamic
          (render mỗi request).
        </p>
      </section>

      {/* Summary */}
      <section className="rounded-lg border border-sky-800 bg-sky-900/30 p-6">
        <h2 className="mb-2 text-lg font-semibold text-sky-300">💡 Tóm tắt</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-sky-400">
          <li>
            Next.js <strong>mặc định chọn Static</strong> — nhanh nhất, serve từ
            CDN.
          </li>
          <li>
            Khi dùng Dynamic APIs (<code>cookies</code>, <code>headers</code>,{' '}
            <code>searchParams</code>), tự động chuyển sang Dynamic.
          </li>
          <li>
            Dùng route segment config (<code>dynamic</code>,{' '}
            <code>revalidate</code>) để ghi đè khi cần.
          </li>
          <li>
            Kiểm tra <code>next build</code> output để xác nhận chiến lược.
          </li>
        </ul>
      </section>
    </div>
  );
}
