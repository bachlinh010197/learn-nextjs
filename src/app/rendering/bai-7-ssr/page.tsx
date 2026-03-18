import { CodeBlock } from '@/components/CodeBlock';
import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Bài 7: SSR & Dynamic APIs - Rendering Strategies',
};

export default async function Bai7Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const headersList = await headers();
  const cookieStore = await cookies();
  const params = await searchParams;

  const userAgent = headersList.get('user-agent') || 'Unknown';
  const allCookies = cookieStore.getAll();
  const renderTime = new Date().toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-white">
        Bài 7: SSR & Dynamic APIs
      </h1>

      <p className="mb-8 leading-relaxed text-slate-300">
        Server-Side Rendering (SSR) trong Next.js App Router xảy ra tự động khi
        bạn sử dụng <strong>Dynamic APIs</strong>. Trang này sử dụng{' '}
        <code>cookies()</code>, <code>headers()</code>, và{' '}
        <code>searchParams</code> — nên nó được render mới cho{' '}
        <strong>mỗi request</strong>.
      </p>

      {/* Live SSR demo */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          🎮 Demo SSR — Dữ liệu từ request hiện tại
        </h2>
        <p className="mb-4 text-sm text-slate-400">
          Reload trang để thấy thời gian thay đổi — chứng tỏ trang được render
          mới mỗi lần:
        </p>

        <div className="space-y-4">
          {/* Render time */}
          <div className="rounded-lg border border-emerald-800 bg-emerald-900/30 p-4">
            <p className="text-sm font-medium text-emerald-300">
              ⏰ Thời gian render: <strong>{renderTime}</strong>
            </p>
          </div>

          {/* Headers */}
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
            <h3 className="mb-2 font-semibold text-white">📋 headers()</h3>
            <p className="mb-1 text-sm text-slate-300">
              <strong>User-Agent:</strong>
            </p>
            <p className="rounded bg-slate-700 p-2 text-xs break-all text-slate-400">
              {userAgent}
            </p>
          </div>

          {/* Cookies */}
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
            <h3 className="mb-2 font-semibold text-white">🍪 cookies()</h3>
            {allCookies.length > 0 ? (
              <ul className="space-y-1 text-sm text-slate-300">
                {allCookies.map((cookie) => (
                  <li key={cookie.name} className="rounded bg-slate-700 p-2">
                    <strong>{cookie.name}</strong>: {cookie.value}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400">
                Không có cookies nào. Thử set cookie trong DevTools →
                Application → Cookies.
              </p>
            )}
          </div>

          {/* Search Params */}
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
            <h3 className="mb-2 font-semibold text-white">🔍 searchParams</h3>
            {Object.keys(params).length > 0 ? (
              <ul className="space-y-1 text-sm text-slate-300">
                {Object.entries(params).map(([key, value]) => (
                  <li key={key} className="rounded bg-slate-700 p-2">
                    <strong>{key}</strong>: {String(value)}
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <p className="mb-2 text-sm text-slate-400">
                  Không có query params. Thử thêm vào URL:
                </p>
                <code className="rounded bg-zinc-100 px-2 py-1 text-xs">
                  ?name=NextJS&version=15
                </code>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dynamic APIs explanation */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Các Dynamic APIs trong Next.js
        </h2>

        <div className="space-y-4">
          {/* cookies() */}
          <div>
            <h3 className="mb-2 text-lg font-medium text-slate-300">
              1. cookies()
            </h3>
            <CodeBlock>
              {`
                import { cookies } from "next/headers";

                export default async function Page() {
                  const cookieStore = await cookies();

                  // Đọc cookie
                  const theme = cookieStore.get("theme");
                  console.log(theme?.value); // "dark"

                  // Đọc tất cả cookies
                  const all = cookieStore.getAll();

                  return <div>Theme: {theme?.value}</div>;
                }
              `}
            </CodeBlock>
          </div>

          {/* headers() */}
          <div>
            <h3 className="mb-2 text-lg font-medium text-slate-300">
              2. headers()
            </h3>
            <CodeBlock>
              {`
                import { headers } from "next/headers";

                export default async function Page() {
                  const headersList = await headers();

                  const userAgent = headersList.get("user-agent");
                  const referer = headersList.get("referer");
                  const ip = headersList.get("x-forwarded-for");

                  return (
                    <div>
                      <p>Browser: {userAgent}</p>
                      <p>Từ trang: {referer}</p>
                    </div>
                  );
                }
              `}
            </CodeBlock>
          </div>

          {/* searchParams */}
          <div>
            <h3 className="mb-2 text-lg font-medium text-slate-300">
              3. searchParams
            </h3>
            <CodeBlock>
              {`
                // URL: /products?category=phone&sort=price

                export default async function Page({
                  searchParams,
                }: {
                  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
                }) {
                  const params = await searchParams;
                  const category = params.category; // "phone"
                  const sort = params.sort;         // "price"

                  return (
                    <div>
                      <p>Category: {category}</p>
                      <p>Sort: {sort}</p>
                    </div>
                  );
                }
              `}
            </CodeBlock>
          </div>
        </div>
      </section>

      {/* fetch with no-store */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Fetch không cache
        </h2>
        <p className="mb-3 text-slate-300">
          Ngoài Dynamic APIs, bạn cũng có thể dùng{' '}
          <code>cache: &quot;no-store&quot;</code> để khiến route trở thành
          dynamic:
        </p>
        <CodeBlock>
          {`
            export default async function Page() {
              // Fetch mới mỗi request - không cache
              const res = await fetch("https://api.example.com/live-data", {
                cache: "no-store",
              });
              const data = await res.json();

              return <div>{data.value}</div>;
            }
          `}
        </CodeBlock>
      </section>

      {/* Summary */}
      <section className="rounded-lg border border-sky-800 bg-sky-900/30 p-6">
        <h2 className="mb-2 text-lg font-semibold text-sky-300">💡 Tóm tắt</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-sky-400">
          <li>
            SSR xảy ra tự động khi dùng Dynamic APIs (<code>cookies</code>,{' '}
            <code>headers</code>, <code>searchParams</code>).
          </li>
          <li>HTML được render mới cho mỗi request — dữ liệu luôn fresh.</li>
          <li>Phù hợp cho trang cá nhân hóa, dữ liệu nhạy cảm theo user.</li>
          <li>
            Chậm hơn Static vì không cache — cân nhắc dùng Streaming/Suspense để
            cải thiện UX.
          </li>
        </ul>
      </section>
    </div>
  );
}
