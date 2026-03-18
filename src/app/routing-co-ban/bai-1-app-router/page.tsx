import { CodeBlock } from '@/components/CodeBlock';

export default function Bai1AppRouterPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold text-white">
        Bài 1: Cơ chế vận hành của App Router
      </h1>
      <p className="mb-6 text-slate-300">
        Next.js sử dụng hệ thống <strong>file-based routing</strong> — mỗi file{' '}
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
          page.tsx
        </code>{' '}
        trong thư mục{' '}
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
          app/
        </code>{' '}
        sẽ tự động trở thành một route.
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Cấu trúc thư mục = URL
        </h2>
        <p className="mb-4 text-slate-300">
          Trong App Router, cấu trúc thư mục trực tiếp quyết định URL của trang.
          Mỗi thư mục con trong{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            app/
          </code>{' '}
          tạo ra một segment trong URL.
        </p>
        <CodeBlock>
          {`
            app/
            ├── page.tsx            → /
            ├── about/
            │   └── page.tsx        → /about
            ├── blog/
            │   ├── page.tsx        → /blog
            │   └── [slug]/
            │       └── page.tsx    → /blog/bai-viet-1, /blog/bai-viet-2, ...
            └── dashboard/
                ├── layout.tsx      → Layout chung cho /dashboard/*
                ├── page.tsx        → /dashboard
                └── settings/
                    └── page.tsx    → /dashboard/settings
          `}
        </CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Các file đặc biệt trong App Router
        </h2>
        <p className="mb-4 text-slate-300">
          Next.js App Router sử dụng các file đặc biệt (conventions) để xử lý
          các trường hợp khác nhau:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="py-2 pr-4 font-semibold text-white">File</th>
                <th className="py-2 font-semibold text-white">Chức năng</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="py-2 pr-4 font-mono text-sm">page.tsx</td>
                <td className="py-2">
                  Nội dung chính của trang (bắt buộc để tạo route)
                </td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 pr-4 font-mono text-sm">layout.tsx</td>
                <td className="py-2">Layout chia sẻ giữa các trang con</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 pr-4 font-mono text-sm">loading.tsx</td>
                <td className="py-2">UI hiển thị khi trang đang tải</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 pr-4 font-mono text-sm">error.tsx</td>
                <td className="py-2">Xử lý lỗi với Error Boundary</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 pr-4 font-mono text-sm">not-found.tsx</td>
                <td className="py-2">Trang 404 tùy chỉnh</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-sm">template.tsx</td>
                <td className="py-2">
                  Tương tự layout nhưng tạo instance mới khi navigate
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Ví dụ: Tạo một trang đơn giản
        </h2>
        <p className="mb-4 text-slate-300">
          Để tạo trang{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            /about
          </code>
          , bạn chỉ cần tạo file{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            app/about/page.tsx
          </code>
          :
        </p>
        <CodeBlock>
          {`
            // app/about/page.tsx
            export default function AboutPage() {
              return (
                <div>
                  <h1>Giới thiệu</h1>
                  <p>Đây là trang giới thiệu.</p>
                </div>
              );
            }
          `}
        </CodeBlock>
        <p className="text-slate-300">
          Chỉ cần vậy thôi! Next.js sẽ tự động tạo route <strong>/about</strong>{' '}
          cho bạn. Không cần cấu hình router hay khai báo route ở đâu cả.
        </p>
      </section>

      <section className="rounded-lg border border-sky-800 bg-sky-900/30 p-4">
        <h3 className="mb-2 font-semibold text-sky-300">💡 Ghi nhớ</h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-sky-400">
          <li>
            Chỉ có file <strong>page.tsx</strong> mới tạo ra route công khai
            (publicly accessible).
          </li>
          <li>
            Các file khác như component, utils, css trong thư mục app sẽ KHÔNG
            tạo route.
          </li>
          <li>
            App Router mặc định sử dụng <strong>Server Components</strong>.
          </li>
        </ul>
      </section>
    </div>
  );
}
