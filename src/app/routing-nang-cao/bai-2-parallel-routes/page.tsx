export default function Bai2ParallelRoutesPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold text-white">
        Bài 2: Parallel Routes
      </h1>
      <p className="mb-6 text-slate-300">
        Parallel Routes cho phép bạn render đồng thời nhiều trang trong cùng một
        layout, sử dụng quy ước{' '}
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
          @folder
        </code>
        .
      </p>

      {/* Giải thích */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Parallel Routes là gì?
        </h2>
        <div className="space-y-4 text-slate-300">
          <p>
            Parallel Routes cho phép bạn render đồng thời một hoặc nhiều trang
            trong cùng một layout. Chúng rất hữu ích cho các phần động của ứng
            dụng như dashboard, nơi bạn muốn hiển thị nhiều nội dung độc lập
            cùng lúc.
          </p>
          <p>
            Mỗi parallel route được định nghĩa bằng một thư mục bắt đầu với{' '}
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              @
            </code>
            . Các thư mục này được gọi là <strong>slots</strong> và được truyền
            vào layout dưới dạng props.
          </p>
        </div>
      </section>

      {/* Quy ước @folder */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Quy ước @folder
        </h2>
        <ul className="list-inside list-disc space-y-2 text-slate-300">
          <li>
            Thư mục{' '}
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              @analytics
            </code>{' '}
            tạo slot tên{' '}
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              analytics
            </code>
          </li>
          <li>
            Thư mục{' '}
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              @team
            </code>{' '}
            tạo slot tên{' '}
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              team
            </code>
          </li>
          <li>Các slot được truyền vào layout component dưới dạng props</li>
          <li>
            Slot <strong>không</strong> ảnh hưởng đến URL —{' '}
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              @analytics
            </code>{' '}
            không tạo route{' '}
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              /analytics
            </code>
          </li>
        </ul>
      </section>

      {/* Cấu trúc thư mục */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Cấu trúc thư mục
        </h2>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`app/
└── dashboard/
    ├── layout.tsx         ← Nhận props: children, analytics, team
    ├── page.tsx           ← Slot children mặc định
    ├── default.tsx        ← Fallback cho children
    ├── @analytics/
    │   ├── page.tsx       ← Nội dung analytics
    │   └── default.tsx    ← Fallback cho analytics
    └── @team/
        ├── page.tsx       ← Nội dung team
        └── default.tsx    ← Fallback cho team`}</code>
        </pre>
      </section>

      {/* Ví dụ layout nhận slots */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Layout nhận Parallel Route Slots
        </h2>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <div className="grid grid-cols-2 gap-4">
        <div>{analytics}</div>
        <div>{team}</div>
      </div>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* default.tsx */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          default.tsx — Fallback cho Parallel Routes
        </h2>
        <div className="space-y-4 text-slate-300">
          <p>
            Khi Next.js không thể xác định active state của một slot (ví dụ: sau
            khi hard reload), nó sẽ render file{' '}
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              default.tsx
            </code>
            . Nếu không có file này, Next.js sẽ render 404.
          </p>
          <p>
            <strong>Quan trọng:</strong> Luôn tạo file{' '}
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              default.tsx
            </code>{' '}
            cho mỗi slot để tránh lỗi 404 không mong muốn.
          </p>
        </div>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// app/dashboard/@analytics/default.tsx
export default function AnalyticsDefault() {
  return <div>Đang tải analytics...</div>;
}`}</code>
        </pre>
      </section>

      {/* Demo */}
      <div className="rounded-lg border border-sky-800 bg-sky-900/30 p-4">
        <p className="text-sm text-sky-300">
          💡 <strong>Demo:</strong> Thư mục hiện tại có layout.tsx nhận 2 slots:{' '}
          <code className="rounded bg-sky-900 px-1 text-sky-300">
            @analytics
          </code>{' '}
          và <code className="rounded bg-sky-900 px-1 text-sky-300">@team</code>
          . Cuộn xuống để xem chúng được render bên dưới nội dung chính.
        </p>
      </div>
    </div>
  );
}
