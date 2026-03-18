'use client';

import { CodeBlock } from '@/components/CodeBlock';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function Bai5Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.json();
      })
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-white">
        Bài 5: Client-Side Rendering (CSR)
      </h1>

      <p className="mb-8 leading-relaxed text-slate-300">
        Client-Side Rendering là khi toàn bộ quá trình fetch dữ liệu và render
        diễn ra trên trình duyệt. Trang này sử dụng{' '}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5">
          &quot;use client&quot;
        </code>{' '}
        và <code className="rounded bg-zinc-100 px-1.5 py-0.5">useEffect</code>{' '}
        để fetch dữ liệu sau khi component mount.
      </p>

      {/* How it works */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          CSR hoạt động như thế nào?
        </h2>
        <ol className="mb-4 list-inside list-decimal space-y-2 text-slate-300">
          <li>Browser nhận HTML (chưa có dữ liệu, chỉ có loading state)</li>
          <li>JavaScript được tải và thực thi</li>
          <li>
            <code>useEffect</code> chạy → gửi request fetch dữ liệu
          </li>
          <li>Dữ liệu trả về → setState → React re-render với dữ liệu</li>
        </ol>

        <div className="rounded-lg border border-amber-800 bg-amber-900/30 p-4">
          <p className="text-sm text-amber-300">
            ⚠️ Nếu bạn <strong>View Page Source</strong>, bạn sẽ{' '}
            <strong>không thấy</strong> danh sách users! Chỉ thấy loading state.
            Đây chính là nhược điểm SEO của CSR.
          </p>
        </div>
      </section>

      {/* Code example */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Code của trang này
        </h2>
        <CodeBlock>
          {`
            "use client";

            import { useEffect, useState } from "react";

            interface User {
              id: number;
              name: string;
              email: string;
              phone: string;
            }

            export default function CSRPage() {
              const [users, setUsers] = useState<User[]>([]);
              const [loading, setLoading] = useState(true);
              const [error, setError] = useState<string | null>(null);

              useEffect(() => {
                fetch("https://jsonplaceholder.typicode.com/users")
                  .then((res) => {
                    if (!res.ok) throw new Error("Fetch failed");
                    return res.json();
                  })
                  .then((data) => {
                    setUsers(data);
                    setLoading(false);
                  })
                  .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                  });
              }, []);

              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error: {error}</p>;

              return (
                <ul>
                  {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                  ))}
                </ul>
              );
            }
          `}
        </CodeBlock>
      </section>

      {/* Live demo */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          🎮 Demo: Fetch Users từ API (CSR)
        </h2>
        <p className="mb-4 text-sm text-slate-400">
          Dữ liệu được fetch từ <code>jsonplaceholder.typicode.com/users</code>{' '}
          trên trình duyệt của bạn:
        </p>

        {loading && (
          <div className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 p-6">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            <p className="text-slate-300">Đang tải dữ liệu từ API...</p>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-800 bg-red-900/30 p-4">
            <p className="text-red-400">❌ Lỗi: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto rounded-lg border border-slate-600">
            <table className="w-full text-sm">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                    Tên
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                    Điện thoại
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-slate-700">
                    <td className="px-4 py-3 text-slate-300">{user.id}</td>
                    <td className="px-4 py-3 font-medium text-white">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-slate-300">{user.email}</td>
                    <td className="px-4 py-3 text-slate-300">{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* When to use */}
      <section className="rounded-lg border border-sky-800 bg-sky-900/30 p-6">
        <h2 className="mb-2 text-lg font-semibold text-sky-300">
          🤔 Khi nào dùng CSR?
        </h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-sky-400">
          <li>
            <strong>Dashboard / Admin panel</strong> — không cần SEO, dữ liệu cá
            nhân.
          </li>
          <li>
            <strong>Trang sau khi đăng nhập</strong> — nội dung private, bot
            không cần index.
          </li>
          <li>
            <strong>Real-time data</strong> — dữ liệu thay đổi liên tục (chat,
            notifications).
          </li>
          <li>
            <strong>Tránh dùng cho</strong>: Landing page, blog, e-commerce —
            những trang cần SEO.
          </li>
        </ul>
      </section>
    </div>
  );
}
