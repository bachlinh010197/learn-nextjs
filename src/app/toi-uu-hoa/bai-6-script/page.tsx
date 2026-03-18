import { CodeBlock } from '@/components/CodeBlock';

export default function Bai6Script() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1>Bài 6: Quản lý Script</h1>

      <p>
        Component <code>next/script</code> giúp bạn tải script bên thứ ba một
        cách tối ưu với các chiến lược tải khác nhau, tránh ảnh hưởng đến hiệu
        suất trang.
      </p>

      {/* --- Cơ bản --- */}
      <h2>1. Sử dụng cơ bản</h2>
      <CodeBlock>
        {`
          import Script from "next/script";

          export default function MyPage() {
            return (
              <div>
                <h1>Trang của tôi</h1>

                {/* Tải script bên ngoài */}
                <Script src="https://example.com/analytics.js" />
              </div>
            );
          }
        `}
      </CodeBlock>

      {/* --- Chiến lược tải --- */}
      <h2>2. Chiến lược tải (Loading Strategies)</h2>
      <p>
        <code>next/script</code> có 3 chiến lược tải chính:
      </p>

      <h3>2.1 beforeInteractive</h3>
      <p>
        Tải script <strong>trước khi</strong> trang trở nên interactive. Dùng
        cho script quan trọng cần chạy sớm nhất (consent management, bot
        detection).
      </p>
      <CodeBlock>
        {`
          // ⚠️ Chỉ dùng trong app/layout.tsx (root layout)
          import Script from "next/script";

          export default function RootLayout({
            children,
          }: {
            children: React.ReactNode;
          }) {
            return (
              <html lang="vi">
                <body>
                  {children}
                  <Script
                    src="https://cdn.cookie-consent.com/consent.js"
                    strategy="beforeInteractive"
                  />
                </body>
              </html>
            );
          }
        `}
      </CodeBlock>

      <h3>2.2 afterInteractive (mặc định)</h3>
      <p>
        Tải script <strong>sau khi</strong> trang đã hydrate. Phù hợp cho
        analytics, chat widget, v.v.:
      </p>
      <CodeBlock>
        {`
          import Script from "next/script";

          export default function MyPage() {
            return (
              <div>
                <h1>Trang sản phẩm</h1>

                {/* afterInteractive là mặc định */}
                <Script
                  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
                  strategy="afterInteractive"
                />
              </div>
            );
          }
        `}
      </CodeBlock>

      <h3>2.3 lazyOnload</h3>
      <p>
        Tải script khi trình duyệt <strong>rảnh</strong> (idle time). Dùng cho
        script không quan trọng:
      </p>
      <CodeBlock>
        {`
          import Script from "next/script";

          export default function MyPage() {
            return (
              <div>
                <h1>Trang chủ</h1>

                {/* Chat widget - không cần tải ngay */}
                <Script
                  src="https://widget.intercom.io/widget/xxxxx"
                  strategy="lazyOnload"
                />

                {/* Social sharing buttons */}
                <Script
                  src="https://platform.twitter.com/widgets.js"
                  strategy="lazyOnload"
                />
              </div>
            );
          }
        `}
      </CodeBlock>

      {/* --- So sánh --- */}
      <h2>3. So sánh các chiến lược</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Chiến lược</th>
            <th className="text-left">Thời điểm tải</th>
            <th className="text-left">Ví dụ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>beforeInteractive</code>
            </td>
            <td>Trước hydration</td>
            <td>Cookie consent, bot detection</td>
          </tr>
          <tr>
            <td>
              <code>afterInteractive</code>
            </td>
            <td>Sau hydration</td>
            <td>Google Analytics, Tag Manager</td>
          </tr>
          <tr>
            <td>
              <code>lazyOnload</code>
            </td>
            <td>Khi browser rảnh</td>
            <td>Chat widget, social buttons</td>
          </tr>
        </tbody>
      </table>

      {/* --- Inline Script --- */}
      <h2>4. Inline Script</h2>
      <p>Viết script trực tiếp thay vì tải từ URL:</p>
      <CodeBlock>
        {`
          import Script from "next/script";

          export default function MyPage() {
            return (
              <div>
                <h1>Trang chủ</h1>

                {/* Inline script với dangerouslySetInnerHTML */}
                <Script
                  id="gtag-init" // ← id bắt buộc cho inline script
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: \`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-XXXXXXX');
                    \`,
                  }}
                />
              </div>
            );
          }
        `}
      </CodeBlock>

      {/* --- Google Analytics --- */}
      <h2>5. Ví dụ: Google Analytics 4</h2>
      <CodeBlock>
        {`
          // components/GoogleAnalytics.tsx
          import Script from "next/script";

          const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

          export default function GoogleAnalytics() {
            if (!GA_TRACKING_ID) return null;

            return (
              <>
                <Script
                  src={\`https://www.googletagmanager.com/gtag/js?id=\${GA_TRACKING_ID}\`}
                  strategy="afterInteractive"
                />
                <Script
                  id="google-analytics"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: \`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '\${GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                      });
                    \`,
                  }}
                />
              </>
            );
          }

          // app/layout.tsx
          import GoogleAnalytics from "@/components/GoogleAnalytics";

          export default function RootLayout({
            children,
          }: {
            children: React.ReactNode;
          }) {
            return (
              <html lang="vi">
                <body>
                  <GoogleAnalytics />
                  {children}
                </body>
              </html>
            );
          }
        `}
      </CodeBlock>

      {/* --- Event handlers --- */}
      <h2>6. Event Handlers</h2>
      <p>Bạn có thể lắng nghe sự kiện khi script tải xong hoặc lỗi:</p>
      <CodeBlock>
        {`
          "use client";

          import Script from "next/script";

          export default function ScriptWithEvents() {
            return (
              <Script
                src="https://example.com/sdk.js"
                strategy="afterInteractive"
                onLoad={() => {
                  console.log("Script đã tải xong!");
                  // Khởi tạo SDK...
                }}
                onReady={() => {
                  console.log("Script sẵn sàng sử dụng!");
                  // Chạy mỗi khi component mount
                }}
                onError={(e) => {
                  console.error("Lỗi tải script:", e);
                }}
              />
            );
          }
        `}
      </CodeBlock>

      {/* --- Google Tag Manager --- */}
      <h2>7. Ví dụ: Google Tag Manager</h2>
      <CodeBlock>
        {`
          // components/GTM.tsx
          import Script from "next/script";

          const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

          export function GTMScript() {
            if (!GTM_ID) return null;

            return (
              <Script
                id="gtm-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: \`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','\${GTM_ID}');
                  \`,
                }}
              />
            );
          }

          export function GTMNoScript() {
            if (!GTM_ID) return null;

            return (
              <noscript>
                <iframe
                  src={\`https://www.googletagmanager.com/ns.html?id=\${GTM_ID}\`}
                  height="0"
                  width="0"
                  style={{ display: "none", visibility: "hidden" }}
                />
              </noscript>
            );
          }
        `}
      </CodeBlock>

      {/* --- Tổng kết --- */}
      <h2>Tổng kết</h2>
      <div className="rounded-lg border border-emerald-800 bg-emerald-900/30 p-4">
        <ul className="m-0 text-sm">
          <li>
            Luôn dùng <code>next/script</code> thay vì thẻ{' '}
            <code>&lt;script&gt;</code> thông thường
          </li>
          <li>
            Chọn <code>strategy</code> phù hợp để không ảnh hưởng hiệu suất
          </li>
          <li>
            Inline script cần có thuộc tính <code>id</code>
          </li>
          <li>Đặt script analytics trong component riêng để dễ quản lý</li>
          <li>
            Dùng biến môi trường (<code>NEXT_PUBLIC_</code>) cho tracking ID
          </li>
        </ul>
      </div>
    </div>
  );
}
