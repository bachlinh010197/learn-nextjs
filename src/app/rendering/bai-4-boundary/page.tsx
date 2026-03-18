import { CodeBlock } from '@/components/CodeBlock';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bài 4: Server-Client Boundary - Rendering Strategies',
};

function ServerInfo() {
  const buildTime = new Date().toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });
  return (
    <div className="rounded-lg border border-emerald-800 bg-emerald-900/30 p-4">
      <p className="text-sm text-emerald-300">
        🖥️ Đây là Server Component — render lúc: <strong>{buildTime}</strong>
      </p>
    </div>
  );
}

export default function Bai4Page() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-white">
        Bài 4: Server-Client Boundary
      </h1>

      <p className="mb-8 leading-relaxed text-slate-300">
        Ranh giới (boundary) giữa Server Components và Client Components là một
        trong những khái niệm quan trọng nhất cần hiểu khi làm việc với Next.js
        App Router.
      </p>

      {/* Boundary concept */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Boundary hoạt động như thế nào?
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          Khi bạn thêm <code>&quot;use client&quot;</code> vào một file,{' '}
          <strong>
            tất cả components được import trong file đó đều trở thành Client
            Components
          </strong>
          . Đây chính là &quot;boundary&quot; — ranh giới mà từ đó mọi thứ đều
          chạy trên client.
        </p>
        <CodeBlock>
          {`
            // ❌ SAI: Import Server Component trong Client Component
            "use client";
            import ServerComponent from "./ServerComponent"; // Sẽ thành Client!

            export default function ClientWrapper() {
              return <ServerComponent />; // Không còn là Server Component nữa
            }
          `}
        </CodeBlock>

        <CodeBlock>
          {`
            // ✅ ĐÚNG: Truyền Server Component qua children
            // layout.tsx (Server Component)
            import ClientWrapper from "./ClientWrapper";
            import ServerComponent from "./ServerComponent";

            export default function Layout() {
              return (
                <ClientWrapper>
                  <ServerComponent /> {/* Vẫn là Server Component! */}
                </ClientWrapper>
              );
            }

            // ClientWrapper.tsx
            "use client";
            export default function ClientWrapper({
              children,
            }: {
              children: React.ReactNode;
            }) {
              const [isOpen, setIsOpen] = useState(true);
              return isOpen ? <div>{children}</div> : null;
            }
          `}
        </CodeBlock>
      </section>

      {/* Common mistakes */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          ❌ Các lỗi thường gặp
        </h2>

        {/* Error 1 */}
        <div className="mb-6 rounded-lg border border-red-800 bg-red-900/30 p-5">
          <h3 className="mb-2 font-semibold text-red-300">
            Lỗi 1: Dùng hooks trong Server Component
          </h3>
          <CodeBlock>
            {`
              // ❌ LỖI: useState trong Server Component
              // page.tsx (Server Component - không có "use client")
              import { useState } from "react";

              export default function Page() {
                const [count, setCount] = useState(0); // Error!
                return <p>{count}</p>;
              }

              // Error: You're importing a component that needs useState.
              // It only works in a Client Component but none of its
              // parents are marked with "use client".
            `}
          </CodeBlock>
          <p className="text-sm text-red-400">
            <strong>Fix:</strong> Thêm <code>&quot;use client&quot;</code> ở đầu
            file, hoặc tách phần interactive ra thành Client Component riêng.
          </p>
        </div>

        {/* Error 2 */}
        <div className="mb-6 rounded-lg border border-red-800 bg-red-900/30 p-5">
          <h3 className="mb-2 font-semibold text-red-300">
            Lỗi 2: Truyền non-serializable props từ Server sang Client
          </h3>
          <CodeBlock>
            {`
              // ❌ LỖI: Truyền function từ Server → Client
              // page.tsx (Server Component)
              import ClientButton from "./ClientButton";

              export default function Page() {
                function handleClick() {  // function không serializable!
                  console.log("clicked");
                }

                return <ClientButton onClick={handleClick} />;
              }

              // Error: Functions cannot be passed directly to
              // Client Components unless you explicitly expose it
              // by marking it with "use server".
            `}
          </CodeBlock>
          <p className="text-sm text-red-400">
            <strong>Fix:</strong> Dùng Server Actions (
            <code>&quot;use server&quot;</code>) hoặc định nghĩa function trong
            Client Component.
          </p>
        </div>

        {/* Error 3 */}
        <div className="rounded-lg border border-red-800 bg-red-900/30 p-5">
          <h3 className="mb-2 font-semibold text-red-300">
            Lỗi 3: Đánh dấu &quot;use client&quot; quá cao trong component tree
          </h3>
          <CodeBlock>
            {`
              // ❌ KHÔNG NÊN: "use client" ở page level
              "use client"; // Toàn bộ page thành Client Component!

              export default function ProductPage() {
                const [qty, setQty] = useState(1);

                return (
                  <div>
                    <h1>iPhone 15 Pro</h1>        {/* Không cần client */}
                    <p>Mô tả sản phẩm dài...</p>  {/* Không cần client */}
                    <p>Giá: 28.990.000đ</p>       {/* Không cần client */}

                    {/* Chỉ phần này cần client */}
                    <input value={qty} onChange={e => setQty(+e.target.value)} />
                    <button>Thêm vào giỏ</button>
                  </div>
                );
              }
            `}
          </CodeBlock>
          <CodeBlock>
            {`
              // ✅ ĐÚNG: Tách phần client ra component riêng
              // page.tsx (Server Component)
              import AddToCart from "./AddToCart";

              export default function ProductPage() {
                return (
                  <div>
                    <h1>iPhone 15 Pro</h1>
                    <p>Mô tả sản phẩm dài...</p>
                    <p>Giá: 28.990.000đ</p>
                    <AddToCart /> {/* Chỉ component này là Client */}
                  </div>
                );
              }

              // AddToCart.tsx
              "use client";
              import { useState } from "react";

              export default function AddToCart() {
                const [qty, setQty] = useState(1);
                return (
                  <div>
                    <input value={qty} onChange={e => setQty(+e.target.value)} />
                    <button>Thêm vào giỏ</button>
                  </div>
                );
              }
            `}
          </CodeBlock>
        </div>
      </section>

      {/* Serializable data */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Dữ liệu nào có thể truyền qua boundary?
        </h2>
        <p className="mb-4 text-slate-300">
          Props truyền từ Server Component sang Client Component phải là{' '}
          <strong>serializable</strong> (có thể chuyển thành JSON):
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-slate-600">
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  ✅ Serializable
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  ❌ Không Serializable
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3">string, number, boolean</td>
                <td className="px-4 py-3">Functions</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3">Array, Plain Object</td>
                <td className="px-4 py-3">Class instances</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3">Date (thành string)</td>
                <td className="px-4 py-3">Symbols</td>
              </tr>
              <tr>
                <td className="px-4 py-3">JSX (React elements)</td>
                <td className="px-4 py-3">DOM nodes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Live demo */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          🎮 Demo: Server Component trong trang này
        </h2>
        <p className="mb-4 text-slate-300">
          Trang này là một Server Component. Dưới đây là một Server Component
          con hiển thị thời gian render:
        </p>
        <ServerInfo />
      </section>

      {/* Summary */}
      <section className="rounded-lg border border-sky-800 bg-sky-900/30 p-6">
        <h2 className="mb-2 text-lg font-semibold text-sky-300">📝 Tóm tắt</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-sky-400">
          <li>
            <code>&quot;use client&quot;</code> tạo ra boundary — mọi thứ import
            bên dưới đều thành Client.
          </li>
          <li>
            Truyền Server Component qua <code>children</code> prop để giữ nó là
            Server Component.
          </li>
          <li>
            Props qua boundary phải serializable (không truyền functions trực
            tiếp).
          </li>
          <li>
            Đẩy <code>&quot;use client&quot;</code> xuống thấp nhất có thể trong
            component tree.
          </li>
        </ul>
      </section>
    </div>
  );
}
