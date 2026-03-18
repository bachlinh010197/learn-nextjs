import { CodeBlock } from '@/components/CodeBlock';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bài 1: SPA & SEO - Rendering Strategies',
};

export default function Bai1Page() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-white">
        Bài 1: SPA & Vấn Đề SEO
      </h1>

      {/* Intro */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          SPA (Single Page Application) là gì?
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          SPA là ứng dụng web chỉ tải một trang HTML duy nhất. Khi người dùng
          điều hướng, JavaScript sẽ cập nhật nội dung trên trang mà không cần
          tải lại toàn bộ trang. React, Vue, Angular đều là các framework xây
          dựng SPA.
        </p>
        <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
          <p className="text-sm font-medium text-slate-300">
            💡 Ví dụ: Khi bạn dùng <code>create-react-app</code>, file{' '}
            <code>index.html</code> ban đầu gần như trống rỗng — chỉ có một{' '}
            <code>&lt;div id=&quot;root&quot;&gt;</code>. Toàn bộ nội dung được
            JavaScript render sau khi tải.
          </p>
        </div>
      </section>

      {/* How search engines crawl */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Search Engine crawl trang web như thế nào?
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          Khi Googlebot (hoặc bot của công cụ tìm kiếm khác) truy cập một URL,
          nó thực hiện các bước sau:
        </p>
        <ol className="mb-4 list-inside list-decimal space-y-2 text-slate-300">
          <li>
            <strong>Fetch HTML</strong> — Bot gửi HTTP request và nhận lại HTML
            response.
          </li>
          <li>
            <strong>Parse HTML</strong> — Bot đọc nội dung HTML để tìm text,
            links, metadata.
          </li>
          <li>
            <strong>Render JavaScript (tùy chọn)</strong> — Googlebot có thể
            chạy JS, nhưng với hàng đợi riêng và có thể mất vài ngày đến vài
            tuần.
          </li>
          <li>
            <strong>Index</strong> — Nội dung được lưu vào chỉ mục tìm kiếm.
          </li>
        </ol>

        <div className="rounded-lg border border-amber-800 bg-amber-900/30 p-4">
          <p className="text-sm text-amber-300">
            ⚠️ <strong>Vấn đề:</strong> Ở bước 1, nếu HTML trả về gần như trống
            (chỉ có <code>&lt;div id=&quot;root&quot;&gt;</code>), bot không
            thấy nội dung gì cả! Dù Googlebot có thể render JS, việc này không
            đảm bảo và chậm hơn nhiều.
          </p>
        </div>
      </section>

      {/* SPA HTML example */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          HTML của một SPA truyền thống
        </h2>
        <p className="mb-3 text-slate-300">
          Đây là HTML mà search engine nhận được khi crawl một SPA React:
        </p>
        <CodeBlock>
          {`
            <!DOCTYPE html>
            <html>
              <head>
                <title>My React App</title>
              </head>
              <body>
                <!-- Đây là tất cả những gì bot thấy! -->
                <div id="root"></div>

                <!-- JS sẽ render nội dung sau khi tải -->
                <script src="/static/js/bundle.js"></script>
              </body>
            </html>
          `}
        </CodeBlock>
        <p className="mt-3 text-sm text-slate-400">
          👆 Bot chỉ thấy một <code>&lt;div&gt;</code> trống. Không có nội dung,
          không có heading, không có text để index.
        </p>
      </section>

      {/* SSR HTML example */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          HTML với Server Rendering (Next.js)
        </h2>
        <p className="mb-3 text-slate-300">
          Khi sử dụng Next.js, server trả về HTML đã có sẵn nội dung:
        </p>
        <CodeBlock>
          {`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Trang Sản Phẩm | My Shop</title>
                <meta name="description" content="Xem 100+ sản phẩm..." />
              </head>
              <body>
                <div id="root">
                  <!-- Nội dung đã được render sẵn! -->
                  <h1>Danh sách sản phẩm</h1>
                  <div class="product-grid">
                    <div class="product">
                      <h2>iPhone 15 Pro</h2>
                      <p>Giá: 28.990.000đ</p>
                    </div>
                    <div class="product">
                      <h2>Samsung Galaxy S24</h2>
                      <p>Giá: 22.990.000đ</p>
                    </div>
                    <!-- ... -->
                  </div>
                </div>
                <script src="/_next/static/chunks/main.js"></script>
              </body>
            </html>
          `}
        </CodeBlock>
        <p className="mt-3 text-sm text-slate-400">
          👆 Bot thấy ngay nội dung đầy đủ — headings, text, metadata. Trang
          được index nhanh và chính xác.
        </p>
      </section>

      {/* Comparison table */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          So sánh SPA vs Server Rendering
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  Tiêu chí
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  SPA (React thuần)
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  Server Rendering (Next.js)
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-medium">HTML ban đầu</td>
                <td className="px-4 py-3">Trống rỗng</td>
                <td className="px-4 py-3">Có sẵn nội dung</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-medium">SEO</td>
                <td className="px-4 py-3">❌ Kém</td>
                <td className="px-4 py-3">✅ Tốt</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-medium">
                  First Contentful Paint
                </td>
                <td className="px-4 py-3">Chậm (chờ JS tải + render)</td>
                <td className="px-4 py-3">Nhanh (HTML có sẵn)</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-medium">Social sharing</td>
                <td className="px-4 py-3">❌ Không có preview</td>
                <td className="px-4 py-3">✅ Có meta tags</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Accessibility</td>
                <td className="px-4 py-3">Phụ thuộc JS</td>
                <td className="px-4 py-3">Hoạt động không cần JS</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Conclusion */}
      <section className="rounded-lg border border-sky-800 bg-sky-900/30 p-6">
        <h2 className="mb-2 text-lg font-semibold text-sky-300">🎯 Kết luận</h2>
        <ul className="list-inside list-disc space-y-1 text-sm text-sky-400">
          <li>
            SPA truyền thống không phù hợp cho các trang cần SEO (landing page,
            blog, e-commerce).
          </li>
          <li>
            Server rendering (SSR/SSG) giải quyết vấn đề bằng cách trả về HTML
            có sẵn nội dung.
          </li>
          <li>
            Next.js cho phép kết hợp cả hai: server rendering cho SEO + client
            interactivity.
          </li>
          <li>
            Các bài tiếp theo sẽ đi sâu vào từng chiến lược rendering cụ thể.
          </li>
        </ul>
      </section>
    </div>
  );
}
