import type { Metadata } from 'next';
import ClientCounter from './ClientCounter';

export const metadata: Metadata = {
  title: 'Bài 3: Server & Client Components - Rendering Strategies',
};

export default function Bai3Page() {
  const serverTime = new Date().toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-white">
        Bài 3: Server Components vs Client Components
      </h1>

      {/* Server Component intro */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Server Components là gì?
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          Trong Next.js App Router,{' '}
          <strong>mọi component mặc định đều là Server Component</strong>. Chúng
          chỉ render trên server và không gửi JavaScript xuống client. Điều này
          giúp giảm bundle size và tăng performance.
        </p>

        <div className="mb-4 rounded-lg border border-emerald-800 bg-emerald-900/30 p-4">
          <p className="mb-2 font-medium text-emerald-300">
            🖥️ Demo Server Component
          </p>
          <p className="text-sm text-emerald-400">
            Thời gian render trên server: <strong>{serverTime}</strong>
          </p>
          <p className="mt-1 text-xs text-emerald-400">
            👆 Giá trị này được tính trên server. Nếu bạn View Page Source, bạn
            sẽ thấy thời gian này nằm trong HTML.
          </p>
        </div>

        <h3 className="mb-2 text-lg font-medium text-slate-300">
          Server Components có thể:
        </h3>
        <ul className="mb-4 list-inside list-disc space-y-1 text-slate-300">
          <li>Truy cập trực tiếp database, file system</li>
          <li>Dùng async/await để fetch dữ liệu</li>
          <li>Giữ secrets an toàn (API keys, tokens)</li>
          <li>Giảm JavaScript gửi xuống client</li>
        </ul>

        <h3 className="mb-2 text-lg font-medium text-slate-300">
          Server Components KHÔNG thể:
        </h3>
        <ul className="list-inside list-disc space-y-1 text-slate-300">
          <li>
            Dùng hooks: <code>useState</code>, <code>useEffect</code>,{' '}
            <code>useRef</code>...
          </li>
          <li>Lắng nghe events: onClick, onChange...</li>
          <li>Dùng Browser APIs: localStorage, window...</li>
        </ul>
      </section>

      {/* Client Component */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Client Components là gì?
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          Client Components là components có directive{' '}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5">
            &quot;use client&quot;
          </code>{' '}
          ở đầu file. Chúng được pre-render trên server (cho SEO) rồi{' '}
          <strong>hydrate</strong> trên client để thêm interactivity.
        </p>

        <pre className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-green-400">
          <code>{`"use client";

import { useState } from "react";

export default function ClientCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        + Tăng
      </button>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* Live demo */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          🎮 Demo trực tiếp
        </h2>
        <p className="mb-4 text-slate-300">
          Dưới đây là một Client Component thực tế. Bạn có thể click các nút để
          thay đổi giá trị:
        </p>
        <ClientCounter />
      </section>

      {/* Hydration */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Hydration là gì?
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          Hydration là quá trình React &quot;gắn&quot; JavaScript vào HTML đã
          được server render. Quá trình này diễn ra như sau:
        </p>
        <ol className="mb-4 list-inside list-decimal space-y-3 text-slate-300">
          <li>
            <strong>Server render:</strong> React render component thành HTML
            trên server (bao gồm cả Client Components).
          </li>
          <li>
            <strong>Gửi HTML:</strong> HTML được gửi xuống browser. Người dùng
            thấy nội dung ngay lập tức (nhưng chưa interactive).
          </li>
          <li>
            <strong>Tải JavaScript:</strong> Browser tải JS bundle chứa code của
            các Client Components.
          </li>
          <li>
            <strong>Hydrate:</strong> React gắn event handlers (onClick,
            onChange...) vào HTML hiện có. Bây giờ trang mới thực sự
            interactive!
          </li>
        </ol>

        <div className="rounded-lg border border-amber-800 bg-amber-900/30 p-4">
          <p className="text-sm text-amber-300">
            ⚠️ <strong>Lưu ý:</strong> Trong khoảng thời gian giữa bước 2 và 4
            (HTML đã hiển thị nhưng JS chưa tải xong), nút bấm sẽ không phản
            hồi. Đây gọi là &quot;uncanny valley&quot; — trang nhìn sẵn sàng
            nhưng chưa hoạt động.
          </p>
        </div>
      </section>

      {/* When to use */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Khi nào dùng cái nào?
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-slate-600">
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  Nhu cầu
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  Component
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3">Fetch data</td>
                <td className="px-4 py-3">🖥️ Server</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3">Truy cập backend resources</td>
                <td className="px-4 py-3">🖥️ Server</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3">Giữ sensitive info (API keys)</td>
                <td className="px-4 py-3">🖥️ Server</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3">onClick, onChange, interactivity</td>
                <td className="px-4 py-3">💻 Client</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3">useState, useEffect, useRef</td>
                <td className="px-4 py-3">💻 Client</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  Browser APIs (localStorage, window)
                </td>
                <td className="px-4 py-3">💻 Client</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Best practice */}
      <section className="rounded-lg border border-sky-800 bg-sky-900/30 p-6">
        <h2 className="mb-2 text-lg font-semibold text-sky-300">
          💡 Best Practice
        </h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-sky-400">
          <li>
            <strong>Mặc định dùng Server Components</strong> — chỉ thêm
            &quot;use client&quot; khi thực sự cần interactivity.
          </li>
          <li>
            <strong>Đẩy &quot;use client&quot; xuống thấp nhất có thể</strong> —
            chỉ phần cần interactive mới là Client Component.
          </li>
          <li>
            <strong>Server Component có thể chứa Client Component</strong> như
            children, nhưng không ngược lại (không import Server Component trong
            Client Component).
          </li>
        </ul>
      </section>
    </div>
  );
}
