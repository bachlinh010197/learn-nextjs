import { CodeBlock } from '@/components/CodeBlock';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bài 2: Tổng quan về Caching - Learn Next.js',
};

export default function Bai2TongQuanCaching() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-4xl font-bold text-white">
        Bài 2: Tổng quan về Caching trong Next.js
      </h1>
      <p className="mb-8 text-lg text-slate-300">
        Next.js có một hệ thống caching đa tầng, giúp tối ưu hiệu suất bằng cách
        giảm thiểu việc render lại và request dữ liệu không cần thiết. Hiểu rõ
        các tầng cache này là chìa khoá để xây dựng ứng dụng nhanh và hiệu quả.
      </p>

      {/* Sơ đồ tổng quan */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Sơ đồ 4 tầng Caching
        </h2>
        <CodeBlock>
          {`
            ┌─────────────────────────────────────────────────────────┐
            │                      CLIENT (Browser)                   │
            │                                                         │
            │   ┌─────────────────────────────────────────────────┐   │
            │   │          4. Router Cache                        │   │
            │   │    Cache RSC payload phía client khi điều hướng │   │
            │   └──────────────────────┬──────────────────────────┘   │
            └──────────────────────────┼──────────────────────────────┘
                                       │ Navigation Request
            ┌──────────────────────────┼──────────────────────────────┐
            │                      SERVER (Next.js)                   │
            │                          ▼                              │
            │   ┌─────────────────────────────────────────────────┐   │
            │   │          3. Full Route Cache                    │   │
            │   │    Cache HTML + RSC payload đã render           │   │
            │   └──────────────────────┬──────────────────────────┘   │
            │                          │ Render                       │
            │   ┌──────────────────────▼──────────────────────────┐   │
            │   │          1. Request Memoization                 │   │
            │   │    Deduplicate fetch() trong cùng render pass   │   │
            │   └──────────────────────┬──────────────────────────┘   │
            │                          │ fetch()                      │
            │   ┌──────────────────────▼──────────────────────────┐   │
            │   │          2. Data Cache                          │   │
            │   │    Cache response từ data source                │   │
            │   └──────────────────────┬──────────────────────────┘   │
            │                          │                              │
            └──────────────────────────┼──────────────────────────────┘
                                       ▼
                                Data Source (API, DB)
          `}
        </CodeBlock>
      </section>

      {/* Chi tiết từng tầng */}
      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Chi tiết từng tầng Cache
        </h2>

        {/* Tầng 1 */}
        <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800 p-6">
          <h3 className="mb-2 text-lg font-semibold text-sky-400">
            1. Request Memoization
          </h3>
          <div className="space-y-2 text-sm text-slate-300">
            <p>
              <strong>Nơi hoạt động:</strong> Server, trong một lần render
            </p>
            <p>
              <strong>Cơ chế:</strong> React tự động deduplicate các{' '}
              <code className="rounded bg-slate-700 px-1">fetch()</code> request
              có cùng URL và options trong cùng một React component tree render.
            </p>
            <p>
              <strong>Ví dụ:</strong> Nếu 3 component cùng fetch{' '}
              <code className="rounded bg-slate-700 px-1">/api/user</code>, chỉ
              có 1 request thực sự được gửi đi.
            </p>
            <p>
              <strong>Thời gian sống:</strong> Chỉ trong một lần server render
              (không persist giữa các request).
            </p>
          </div>
        </div>

        {/* Tầng 2 */}
        <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800 p-6">
          <h3 className="mb-2 text-lg font-semibold text-emerald-400">
            2. Data Cache
          </h3>
          <div className="space-y-2 text-sm text-slate-300">
            <p>
              <strong>Nơi hoạt động:</strong> Server, persist giữa các request
              và deployment
            </p>
            <p>
              <strong>Cơ chế:</strong> Next.js lưu kết quả{' '}
              <code className="rounded bg-slate-700 px-1">fetch()</code> vào một
              cache store. Có thể cấu hình bằng{' '}
              <code className="rounded bg-slate-700 px-1">cache</code> và{' '}
              <code className="rounded bg-slate-700 px-1">next.revalidate</code>{' '}
              options.
            </p>
            <p>
              <strong>Kiểm soát:</strong>{' '}
              <code className="rounded bg-slate-700 px-1">
                {`cache: 'force-cache'`}
              </code>{' '}
              |{' '}
              <code className="rounded bg-slate-700 px-1">
                {`cache: 'no-store'`}
              </code>{' '}
              |{' '}
              <code className="rounded bg-slate-700 px-1">
                {`next: { revalidate: 3600 }`}
              </code>
            </p>
          </div>
        </div>

        {/* Tầng 3 */}
        <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800 p-6">
          <h3 className="mb-2 text-lg font-semibold text-purple-400">
            3. Full Route Cache
          </h3>
          <div className="space-y-2 text-sm text-slate-300">
            <p>
              <strong>Nơi hoạt động:</strong> Server, tại build time và
              revalidation
            </p>
            <p>
              <strong>Cơ chế:</strong> Next.js render và cache toàn bộ route
              (HTML + RSC Payload) tại build time cho các static route. Khi user
              request, trả về bản cache thay vì render lại.
            </p>
            <p>
              <strong>Khi nào bị bỏ qua:</strong> Route sử dụng dynamic
              functions (cookies, headers, searchParams) hoặc{' '}
              <code className="rounded bg-slate-700 px-1">
                {`cache: 'no-store'`}
              </code>
              .
            </p>
          </div>
        </div>

        {/* Tầng 4 */}
        <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800 p-6">
          <h3 className="mb-2 text-lg font-semibold text-orange-600">
            4. Router Cache
          </h3>
          <div className="space-y-2 text-sm text-slate-300">
            <p>
              <strong>Nơi hoạt động:</strong> Client (browser), trong suốt phiên
              điều hướng
            </p>
            <p>
              <strong>Cơ chế:</strong> RSC Payload được cache trong bộ nhớ
              browser khi user điều hướng. Khi quay lại trang đã truy cập, trang
              được hiển thị ngay lập tức từ cache.
            </p>
            <p>
              <strong>Thời gian sống:</strong> Static route: 5 phút, Dynamic
              route: 30 giây (cấu hình được qua{' '}
              <code className="rounded bg-slate-700 px-1">staleTimes</code>
              ).
            </p>
          </div>
        </div>
      </section>

      {/* Bảng tổng hợp */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Bảng tổng hợp
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Cơ chế
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Vị trí
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Mục đích
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Vô hiệu hoá
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-medium">Request Memoization</td>
                <td className="px-4 py-3">Server</td>
                <td className="px-4 py-3">Tránh fetch trùng lặp</td>
                <td className="px-4 py-3">AbortController</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-medium">Data Cache</td>
                <td className="px-4 py-3">Server</td>
                <td className="px-4 py-3">Giảm request tới data source</td>
                <td className="px-4 py-3">
                  revalidatePath, revalidateTag, no-store
                </td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-medium">Full Route Cache</td>
                <td className="px-4 py-3">Server</td>
                <td className="px-4 py-3">Giảm chi phí rendering</td>
                <td className="px-4 py-3">
                  Revalidating Data Cache, re-deploy
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Router Cache</td>
                <td className="px-4 py-3">Client</td>
                <td className="px-4 py-3">Giảm request khi điều hướng</td>
                <td className="px-4 py-3">
                  router.refresh(), revalidatePath (Server Action)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="rounded-lg border border-sky-800 bg-sky-900/30 p-4 text-sm text-sky-300">
        <strong>💡 Mẹo:</strong> Hiểu caching là hiểu &quot;mặc định Next.js
        cache tất cả&quot;. Công việc của bạn là quyết định{' '}
        <em>khi nào không nên cache</em> hoặc <em>khi nào cần revalidate</em>.
      </div>
    </div>
  );
}
