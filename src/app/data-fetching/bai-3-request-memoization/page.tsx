import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bài 3: Request Memoization - Learn Next.js',
};

export default function Bai3RequestMemoization() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-4xl font-bold text-white">
        Bài 3: Request Memoization
      </h1>
      <p className="mb-8 text-lg text-slate-300">
        Request Memoization là cơ chế mà React tự động loại bỏ (deduplicate) các
        fetch request trùng lặp trong cùng một lần render. Điều này giúp bạn
        fetch dữ liệu ở bất kỳ component nào mà không lo về hiệu suất.
      </p>

      {/* Cách hoạt động */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Cách hoạt động
        </h2>
        <div className="mb-6 overflow-x-auto rounded-xl bg-zinc-900 p-6 text-sm text-zinc-100">
          <pre>
            <code>{`Render Pass (1 lần server render)
│
├── ComponentA
│   └── fetch('/api/user') ──────┐
│                                │  Cùng URL + options
├── ComponentB                   ├──→ Chỉ 1 request thực sự
│   └── fetch('/api/user') ──────┘    được gửi đi!
│
├── ComponentC
│   └── fetch('/api/posts') ─────→ Request riêng (URL khác)
│
└── Kết quả: 2 request thay vì 3`}</code>
          </pre>
        </div>
        <div className="space-y-3 text-slate-300">
          <p>
            Khi React render một component tree trên server, nếu nhiều component
            gọi{' '}
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              fetch()
            </code>{' '}
            với cùng URL và options, React sẽ chỉ thực hiện request đầu tiên và
            trả về kết quả cho tất cả các component khác.
          </p>
          <p>
            Đây là tính năng của <strong>React</strong> (không phải Next.js), và
            chỉ áp dụng cho{' '}
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              GET
            </code>{' '}
            method trong{' '}
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              fetch()
            </code>
            .
          </p>
        </div>
      </section>

      {/* Ví dụ thực tế */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Ví dụ thực tế
        </h2>
        <p className="mb-4 text-slate-300">
          Giả sử bạn có một trang hiển thị thông tin user ở nhiều nơi: header,
          sidebar và nội dung chính. Thay vì truyền dữ liệu qua props (prop
          drilling), bạn có thể fetch trực tiếp trong mỗi component:
        </p>
        <pre className="mb-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// lib/data.ts
export async function getUser() {
  // Request này sẽ được memoize tự động!
  const res = await fetch('https://api.example.com/user');
  return res.json();
}

// components/Header.tsx
import { getUser } from '@/lib/data';

export default async function Header() {
  const user = await getUser(); // fetch lần 1

  return (
    <header>
      <span>Xin chào, {user.name}!</span>
    </header>
  );
}

// components/Sidebar.tsx
import { getUser } from '@/lib/data';

export default async function Sidebar() {
  const user = await getUser(); // fetch lần 2 — KHÔNG gửi request mới!

  return (
    <aside>
      <img src={user.avatar} alt={user.name} />
      <p>{user.email}</p>
    </aside>
  );
}

// app/dashboard/page.tsx
import { getUser } from '@/lib/data';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default async function DashboardPage() {
  const user = await getUser(); // fetch lần 3 — vẫn dùng kết quả memoize!

  return (
    <div>
      <Header />
      <Sidebar />
      <main>
        <h1>Dashboard của {user.name}</h1>
      </main>
    </div>
  );
}`}</code>
        </pre>
        <div className="rounded-lg border border-emerald-800 bg-emerald-900/30 p-4 text-sm text-emerald-300">
          <strong>✅ Kết quả:</strong> Dù <code>getUser()</code> được gọi 3 lần
          trong 3 component khác nhau, chỉ có <strong>1 request</strong> thực sự
          được gửi đến API. Các lần gọi sau nhận kết quả từ bộ nhớ memoize.
        </div>
      </section>

      {/* Điều kiện */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Điều kiện để Memoization hoạt động
        </h2>
        <div className="space-y-3">
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
            <h3 className="mb-1 font-semibold text-white">
              ✅ Memoization hoạt động khi:
            </h3>
            <ul className="ml-5 list-disc space-y-1 text-sm text-slate-300">
              <li>
                Cùng URL và cùng options trong{' '}
                <code className="rounded bg-slate-700 px-1">fetch()</code>
              </li>
              <li>
                Sử dụng <code className="rounded bg-slate-700 px-1">GET</code>{' '}
                method (mặc định)
              </li>
              <li>Trong cùng một lần server render (cùng request lifecycle)</li>
            </ul>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
            <h3 className="mb-1 font-semibold text-white">
              ❌ Memoization KHÔNG hoạt động khi:
            </h3>
            <ul className="ml-5 list-disc space-y-1 text-sm text-slate-300">
              <li>
                Sử dụng <code className="rounded bg-slate-700 px-1">POST</code>,{' '}
                <code className="rounded bg-slate-700 px-1">DELETE</code> hoặc
                các method khác
              </li>
              <li>
                Trong Route Handler (vì không nằm trong React component tree)
              </li>
              <li>URL hoặc options khác nhau (kể cả khác headers)</li>
              <li>Giữa các request khác nhau từ user khác nhau</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Lưu ý quan trọng */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Lưu ý quan trọng
        </h2>
        <pre className="mb-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// ⚠️ Hai request này KHÔNG được memoize vì options khác nhau:
fetch('https://api.example.com/data', { cache: 'force-cache' });
fetch('https://api.example.com/data', { cache: 'no-store' });

// ⚠️ Hai request này KHÔNG được memoize vì headers khác nhau:
fetch('https://api.example.com/data', {
  headers: { 'X-Custom': 'value-1' },
});
fetch('https://api.example.com/data', {
  headers: { 'X-Custom': 'value-2' },
});

// ✅ Hai request này ĐƯỢC memoize vì hoàn toàn giống nhau:
fetch('https://api.example.com/data');
fetch('https://api.example.com/data');`}</code>
        </pre>
        <div className="rounded-lg border border-amber-800 bg-amber-900/30 p-4 text-sm text-amber-300">
          <strong>⚠️ Nhớ:</strong> Request Memoization chỉ tồn tại trong 1 lần
          render. Nó không cache dữ liệu giữa các request từ các user khác nhau.
          Đó là nhiệm vụ của <strong>Data Cache</strong> (bài tiếp theo).
        </div>
      </section>
    </div>
  );
}
