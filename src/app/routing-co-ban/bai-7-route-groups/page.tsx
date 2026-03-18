import Link from 'next/link';
import { CodeBlock } from '@/components/CodeBlock';

export default function Bai7RouteGroupsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold text-white">
        Bài 7: Route Groups
      </h1>
      <p className="mb-6 text-slate-300">
        Route Groups cho phép bạn tổ chức các route theo nhóm logic mà{' '}
        <strong>không ảnh hưởng đến URL</strong>. Sử dụng dấu ngoặc tròn{' '}
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
          (folder)
        </code>{' '}
        để tạo route group.
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Cú pháp Route Group
        </h2>
        <p className="mb-4 text-slate-300">
          Bọc tên thư mục trong dấu ngoặc tròn{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            ()
          </code>
          . Thư mục này sẽ bị bỏ qua trong URL:
        </p>
        <CodeBlock>
          {`
            app/
            ├── (marketing)/
            │   ├── layout.tsx      → Layout riêng cho marketing pages
            │   ├── about/
            │   │   └── page.tsx    → /about (KHÔNG phải /marketing/about)
            │   └── contact/
            │       └── page.tsx    → /contact
            ├── (shop)/
            │   ├── layout.tsx      → Layout riêng cho shop pages
            │   ├── products/
            │   │   └── page.tsx    → /products
            │   └── cart/
            │       └── page.tsx    → /cart
            └── page.tsx            → /
          `}
        </CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Khi nào dùng Route Groups?
        </h2>
        <ul className="mb-4 list-inside list-disc space-y-2 text-slate-300">
          <li>
            <strong>Tổ chức code:</strong> Nhóm các route liên quan lại với nhau
            (marketing, shop, admin...)
          </li>
          <li>
            <strong>Layout riêng cho từng nhóm:</strong> Mỗi group có thể có
            layout.tsx riêng
          </li>
          <li>
            <strong>Tách biệt logic:</strong> Giữ code gọn gàng mà không ảnh
            hưởng URL
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Ví dụ: Layout riêng cho mỗi group
        </h2>
        <CodeBlock>
          {`
            // app/(marketing)/layout.tsx
            export default function MarketingLayout({
              children,
            }: {
              children: React.ReactNode;
            }) {
              return (
                <div>
                  <nav>Marketing Nav: Home | About | Contact</nav>
                  <main>{children}</main>
                </div>
              );
            }

            // app/(shop)/layout.tsx
            export default function ShopLayout({
              children,
            }: {
              children: React.ReactNode;
            }) {
              return (
                <div>
                  <nav>Shop Nav: Products | Cart | Account</nav>
                  <main>{children}</main>
                </div>
              );
            }
          `}
        </CodeBlock>
      </section>

      <section className="rounded-lg border border-amber-800 bg-amber-900/30 p-4">
        <h3 className="mb-3 font-semibold text-amber-300">
          🧪 Demo: Route Groups trong chương này
        </h3>
        <p className="mb-3 text-sm text-amber-400">
          Chương Routing này có 2 route group demo:{' '}
          <code>(marketing)/about</code> và <code>(shop)/products</code>. Thư
          mục ngoặc tròn không xuất hiện trong URL.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href="/routing-co-ban/about"
            className="rounded-md bg-amber-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-amber-700"
          >
            (marketing)/about → /routing-co-ban/about
          </Link>
          <Link
            href="/routing-co-ban/products"
            className="rounded-md bg-amber-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-amber-700"
          >
            (shop)/products → /routing-co-ban/products
          </Link>
        </div>
      </section>
    </div>
  );
}
