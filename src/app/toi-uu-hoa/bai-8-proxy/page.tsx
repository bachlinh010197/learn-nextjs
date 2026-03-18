import { CodeBlock } from '@/components/CodeBlock';

export default function Bai8Proxy() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1>Bài 8: Làm việc với Proxy</h1>

      <p>
        Khi frontend và backend API chạy trên các domain khác nhau, bạn sẽ gặp
        vấn đề <strong>CORS</strong>. Next.js cung cấp tính năng{' '}
        <strong>rewrites</strong> trong <code>next.config.ts</code> để proxy
        request, giúp giải quyết CORS và ẩn URL API thực.
      </p>

      {/* --- Vấn đề CORS --- */}
      <h2>1. Vấn đề CORS</h2>
      <p>
        Khi gọi API từ domain khác, trình duyệt sẽ chặn request do chính sách
        CORS:
      </p>
      <CodeBlock>
        {`
          // ❌ Lỗi CORS: Frontend ở localhost:3000,
          // gọi API ở api.example.com
          fetch("https://api.example.com/products")
            .then((res) => res.json())
            .then((data) => console.log(data));

          // Lỗi: Access to fetch at 'https://api.example.com/products'
          // from origin 'http://localhost:3000' has been blocked by CORS policy
        `}
      </CodeBlock>

      {/* --- Rewrites cơ bản --- */}
      <h2>2. Rewrites - Proxy API Requests</h2>
      <p>
        Dùng <code>rewrites</code> để chuyển hướng request từ Next.js server đến
        API server:
      </p>
      <CodeBlock>
        {`
          // next.config.ts
          import type { NextConfig } from "next";

          const nextConfig: NextConfig = {
            async rewrites() {
              return [
                {
                  source: "/api/external/:path*",
                  destination: "https://api.example.com/:path*",
                },
              ];
            },
          };

          export default nextConfig;

          // Bây giờ thay vì gọi: https://api.example.com/products
          // Bạn gọi: /api/external/products
          // Next.js sẽ proxy request đến API server
        `}
      </CodeBlock>

      <p>Sử dụng trong code:</p>
      <CodeBlock>
        {`
          // ✅ Không bị CORS vì request đi qua Next.js server
          const res = await fetch("/api/external/products");
          const products = await res.json();
        `}
      </CodeBlock>

      <div className="rounded-lg border border-sky-800 bg-sky-900/30 p-4">
        <p className="m-0 text-sm">
          <strong>💡 Cách hoạt động:</strong> Trình duyệt gửi request đến
          Next.js server (cùng domain → không CORS). Next.js server gửi request
          đến API server (server-to-server → không CORS). Kết quả được trả về
          cho trình duyệt.
        </p>
      </div>

      {/* --- Nhiều API --- */}
      <h2>3. Proxy nhiều API backend</h2>
      <CodeBlock>
        {`
          // next.config.ts
          import type { NextConfig } from "next";

          const nextConfig: NextConfig = {
            async rewrites() {
              return [
                // API chính
                {
                  source: "/api/v1/:path*",
                  destination: "https://api.myapp.com/v1/:path*",
                },
                // API thanh toán
                {
                  source: "/api/payment/:path*",
                  destination: "https://payment.myapp.com/:path*",
                },
                // API upload file
                {
                  source: "/api/upload/:path*",
                  destination: "https://upload.myapp.com/:path*",
                },
              ];
            },
          };

          export default nextConfig;
        `}
      </CodeBlock>

      {/* --- Theo môi trường --- */}
      <h2>4. Proxy theo môi trường (dev/prod)</h2>
      <CodeBlock>
        {`
          // next.config.ts
          import type { NextConfig } from "next";

          const API_URL =
            process.env.NODE_ENV === "production"
              ? "https://api.myapp.com"
              : "http://localhost:8080";

          const nextConfig: NextConfig = {
            async rewrites() {
              return [
                {
                  source: "/api/backend/:path*",
                  destination: \`\${API_URL}/:path*\`,
                },
              ];
            },
          };

          export default nextConfig;

          // Hoặc dùng biến môi trường
          // .env.local
          // API_BASE_URL=http://localhost:8080
          //
          // .env.production
          // API_BASE_URL=https://api.myapp.com
        `}
      </CodeBlock>

      {/* --- Rewrites nâng cao --- */}
      <h2>5. Rewrites nâng cao</h2>

      <h3>5.1 beforeFiles, afterFiles, fallback</h3>
      <CodeBlock>
        {`
          // next.config.ts
          import type { NextConfig } from "next";

          const nextConfig: NextConfig = {
            async rewrites() {
              return {
                // Chạy trước khi kiểm tra file/page
                beforeFiles: [
                  {
                    source: "/old-blog/:slug",
                    destination: "/blog/:slug",
                  },
                ],

                // Chạy sau khi kiểm tra file/page nhưng trước dynamic routes
                afterFiles: [
                  {
                    source: "/api/proxy/:path*",
                    destination: "https://api.example.com/:path*",
                  },
                ],

                // Chạy sau khi tất cả page/dynamic routes đã kiểm tra
                fallback: [
                  {
                    source: "/:path*",
                    destination: "https://old-site.example.com/:path*",
                  },
                ],
              };
            },
          };

          export default nextConfig;
        `}
      </CodeBlock>

      <h3>5.2 Rewrites với query parameters</h3>
      <CodeBlock>
        {`
          // next.config.ts
          const nextConfig: NextConfig = {
            async rewrites() {
              return [
                // Thêm query param cố định
                {
                  source: "/api/data/:path*",
                  destination: "https://api.example.com/:path*?apiKey=my-secret-key",
                },

                // Rewrite có điều kiện dựa trên header
                {
                  source: "/api/mobile/:path*",
                  has: [
                    {
                      type: "header",
                      key: "x-platform",
                      value: "mobile",
                    },
                  ],
                  destination: "https://mobile-api.example.com/:path*",
                },
              ];
            },
          };
        `}
      </CodeBlock>

      {/* --- Ví dụ thực tế --- */}
      <h2>6. Ví dụ thực tế: Fetch dữ liệu qua Proxy</h2>
      <CodeBlock>
        {`
          // next.config.ts
          import type { NextConfig } from "next";

          const nextConfig: NextConfig = {
            async rewrites() {
              return [
                {
                  source: "/api/backend/:path*",
                  destination: "https://api.myshop.com/:path*",
                },
              ];
            },
          };

          export default nextConfig;

          // lib/api.ts
          const BASE_URL = "/api/backend";

          export async function getProducts() {
            const res = await fetch(\`\${BASE_URL}/products\`);
            if (!res.ok) throw new Error("Không thể tải sản phẩm");
            return res.json();
          }

          export async function getProduct(id: string) {
            const res = await fetch(\`\${BASE_URL}/products/\${id}\`);
            if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
            return res.json();
          }

          export async function createOrder(data: OrderData) {
            const res = await fetch(\`\${BASE_URL}/orders\`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Không thể tạo đơn hàng");
            return res.json();
          }

          // app/products/page.tsx
          import { getProducts } from "@/lib/api";

          export default async function ProductsPage() {
            const products = await getProducts();

            return (
              <div>
                <h1>Sản phẩm</h1>
                <ul>
                  {products.map((p: { id: string; name: string }) => (
                    <li key={p.id}>{p.name}</li>
                  ))}
                </ul>
              </div>
            );
          }
        `}
      </CodeBlock>

      {/* --- Headers --- */}
      <h2>7. Thêm Headers cho CORS (API Route)</h2>
      <p>Nếu bạn tự viết API route trong Next.js và cần cho phép CORS:</p>
      <CodeBlock>
        {`
          // next.config.ts
          import type { NextConfig } from "next";

          const nextConfig: NextConfig = {
            async headers() {
              return [
                {
                  // Cho phép CORS trên tất cả API routes
                  source: "/api/:path*",
                  headers: [
                    {
                      key: "Access-Control-Allow-Origin",
                      value: "https://my-frontend.com",
                    },
                    {
                      key: "Access-Control-Allow-Methods",
                      value: "GET, POST, PUT, DELETE, OPTIONS",
                    },
                    {
                      key: "Access-Control-Allow-Headers",
                      value: "Content-Type, Authorization",
                    },
                  ],
                },
              ];
            },
          };

          export default nextConfig;
        `}
      </CodeBlock>

      {/* --- Tổng kết --- */}
      <h2>Tổng kết</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Tính năng</th>
            <th className="text-left">Khi nào dùng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>rewrites</code>
            </td>
            <td>Proxy request đến API khác domain (giải quyết CORS)</td>
          </tr>
          <tr>
            <td>
              <code>beforeFiles</code>
            </td>
            <td>Redirect URL trước khi kiểm tra page</td>
          </tr>
          <tr>
            <td>
              <code>afterFiles</code>
            </td>
            <td>Proxy sau khi kiểm tra static files</td>
          </tr>
          <tr>
            <td>
              <code>fallback</code>
            </td>
            <td>Fallback đến site khác nếu không tìm thấy page</td>
          </tr>
          <tr>
            <td>
              <code>headers</code>
            </td>
            <td>Thêm CORS headers cho API routes của Next.js</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
