import { CodeBlock } from '@/components/CodeBlock';

export default function Bai4Font() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1>Bài 4: Tối ưu Font</h1>

      <p>
        Next.js tích hợp module <code>next/font</code> giúp tự động tối ưu font,
        loại bỏ layout shift và tải font hiệu quả nhất. Font được tải tại thời
        điểm build và self-host cùng ứng dụng.
      </p>

      {/* --- Google Fonts --- */}
      <h2>1. Google Fonts với next/font/google</h2>
      <p>Sử dụng Google Fonts mà không cần gửi request đến Google servers:</p>

      <h3>1.1 Sử dụng cơ bản</h3>
      <CodeBlock>
        {`
          // app/layout.tsx
          import { Inter } from "next/font/google";

          const inter = Inter({
            subsets: ["latin", "vietnamese"],
          });

          export default function RootLayout({
            children,
          }: {
            children: React.ReactNode;
          }) {
            return (
              <html lang="vi" className={inter.className}>
                <body>{children}</body>
              </html>
            );
          }
        `}
      </CodeBlock>

      <h3>1.2 Sử dụng CSS Variable</h3>
      <CodeBlock>
        {`
          // app/layout.tsx
          import { Inter, Roboto } from "next/font/google";

          const inter = Inter({
            subsets: ["latin", "vietnamese"],
            variable: "--font-inter",
            display: "swap",
          });

          const roboto = Roboto({
            weight: ["400", "500", "700"],
            subsets: ["latin", "vietnamese"],
            variable: "--font-roboto",
            display: "swap",
          });

          export default function RootLayout({
            children,
          }: {
            children: React.ReactNode;
          }) {
            return (
              <html lang="vi" className={\`\${inter.variable} \${roboto.variable}\`}>
                <body>{children}</body>
              </html>
            );
          }
        `}
      </CodeBlock>

      <p>Sau đó dùng trong CSS hoặc Tailwind:</p>
      <CodeBlock>
        {`
          /* globals.css - Tailwind v4 */
          @theme {
            --font-sans: var(--font-inter), system-ui, sans-serif;
            --font-heading: var(--font-roboto), system-ui, sans-serif;
          }

          /* Sử dụng */
          h1 {
            font-family: var(--font-heading);
          }

          /* Hoặc dùng Tailwind class */
          /* <h1 className="font-heading">Tiêu đề</h1> */
          /* <p className="font-sans">Nội dung</p> */
        `}
      </CodeBlock>

      {/* --- Nhiều weight --- */}
      <h2>2. Chọn Font Weight cụ thể</h2>
      <CodeBlock>
        {`
          import { Roboto } from "next/font/google";

          // Font với nhiều weight
          const roboto = Roboto({
            weight: ["300", "400", "500", "700"],
            style: ["normal", "italic"],
            subsets: ["latin", "vietnamese"],
            display: "swap",
          });

          // Variable font (không cần chỉ định weight)
          import { Inter } from "next/font/google";

          const inter = Inter({
            subsets: ["latin", "vietnamese"],
            display: "swap",
            // Variable font tự động hỗ trợ tất cả weight
          });
        `}
      </CodeBlock>

      {/* --- Local Fonts --- */}
      <h2>3. Local Fonts với next/font/local</h2>
      <p>Khi bạn có file font riêng (tải từ nguồn khác hoặc font custom):</p>
      <CodeBlock>
        {`
          // app/layout.tsx
          import localFont from "next/font/local";

          const myFont = localFont({
            src: "./fonts/MyFont.woff2",
            display: "swap",
            variable: "--font-custom",
          });

          export default function RootLayout({
            children,
          }: {
            children: React.ReactNode;
          }) {
            return (
              <html lang="vi" className={myFont.variable}>
                <body>{children}</body>
              </html>
            );
          }
        `}
      </CodeBlock>

      <h3>3.1 Nhiều file font (nhiều weight)</h3>
      <CodeBlock>
        {`
          import localFont from "next/font/local";

          const myFont = localFont({
            src: [
              {
                path: "./fonts/MyFont-Regular.woff2",
                weight: "400",
                style: "normal",
              },
              {
                path: "./fonts/MyFont-Bold.woff2",
                weight: "700",
                style: "normal",
              },
              {
                path: "./fonts/MyFont-Italic.woff2",
                weight: "400",
                style: "italic",
              },
            ],
            display: "swap",
            variable: "--font-custom",
          });
        `}
      </CodeBlock>

      {/* --- Font Display --- */}
      <h2>4. Font Display Strategies</h2>
      <p>
        Thuộc tính <code>display</code> kiểm soát cách font hiển thị trong khi
        đang tải:
      </p>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Giá trị</th>
            <th className="text-left">Hành vi</th>
            <th className="text-left">Khi nào dùng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>swap</code>
            </td>
            <td>Hiển thị font fallback ngay, swap khi font tải xong</td>
            <td>Phổ biến nhất, tốt cho SEO</td>
          </tr>
          <tr>
            <td>
              <code>block</code>
            </td>
            <td>Ẩn text cho đến khi font tải xong (tối đa 3s)</td>
            <td>Icon fonts</td>
          </tr>
          <tr>
            <td>
              <code>fallback</code>
            </td>
            <td>Giống swap nhưng thời gian chờ ngắn hơn (~100ms)</td>
            <td>Cân bằng giữa UX và layout shift</td>
          </tr>
          <tr>
            <td>
              <code>optional</code>
            </td>
            <td>Nếu font không tải được nhanh, dùng fallback luôn</td>
            <td>Khi font không quan trọng</td>
          </tr>
          <tr>
            <td>
              <code>auto</code>
            </td>
            <td>Trình duyệt tự quyết định</td>
            <td>Hiếm khi dùng</td>
          </tr>
        </tbody>
      </table>

      <CodeBlock>
        {`
          // Khuyến nghị: dùng "swap" cho body text
          const inter = Inter({
            subsets: ["latin", "vietnamese"],
            display: "swap", // ← Khuyến nghị
          });

          // Dùng "optional" cho font trang trí
          const decorativeFont = localFont({
            src: "./fonts/Decorative.woff2",
            display: "optional",
          });
        `}
      </CodeBlock>

      {/* --- Ví dụ thực tế --- */}
      <h2>5. Ví dụ thực tế đầy đủ</h2>
      <CodeBlock>
        {`
          // app/layout.tsx
          import { Inter, Roboto } from "next/font/google";
          import localFont from "next/font/local";

          // Font chính cho body
          const inter = Inter({
            subsets: ["latin", "vietnamese"],
            variable: "--font-inter",
            display: "swap",
          });

          // Font cho heading
          const roboto = Roboto({
            weight: ["400", "700"],
            subsets: ["latin", "vietnamese"],
            variable: "--font-roboto",
            display: "swap",
          });

          // Font icon custom
          const iconFont = localFont({
            src: "./fonts/icons.woff2",
            variable: "--font-icons",
            display: "block",
          });

          export default function RootLayout({
            children,
          }: {
            children: React.ReactNode;
          }) {
            return (
              <html
                lang="vi"
                className={\`\${inter.variable} \${roboto.variable} \${iconFont.variable}\`}
              >
                <body className="font-sans">
                  <header>
                    <h1 className="font-heading text-3xl font-bold">
                      My Website
                    </h1>
                  </header>
                  <main>{children}</main>
                </body>
              </html>
            );
          }
        `}
      </CodeBlock>

      {/* --- Tổng kết --- */}
      <h2>Tổng kết</h2>
      <div className="rounded-lg border border-emerald-800 bg-emerald-900/30 p-4">
        <ul className="m-0 text-sm">
          <li>
            <strong>next/font/google:</strong> Dùng Google Fonts, tự động
            self-host
          </li>
          <li>
            <strong>next/font/local:</strong> Dùng file font riêng
          </li>
          <li>
            <strong>CSS Variable:</strong> Linh hoạt, dễ dùng với Tailwind
          </li>
          <li>
            <strong>display: swap:</strong> Khuyến nghị cho hầu hết trường hợp
          </li>
          <li>
            <strong>Subsets:</strong> Chỉ tải bộ ký tự cần thiết (latin,
            vietnamese)
          </li>
        </ul>
      </div>
    </div>
  );
}
