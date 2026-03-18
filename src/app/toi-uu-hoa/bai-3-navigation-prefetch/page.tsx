'use client';

import { CodeBlock } from '@/components/CodeBlock';

export default function Bai3NavigationPrefetch() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1>Bài 3: Navigation & Link Prefetching</h1>

      <p>
        Next.js cung cấp component <code>next/link</code> và hook{' '}
        <code>useRouter</code> để điều hướng nhanh chóng với tính năng prefetch
        tự động.
      </p>

      {/* --- next/link --- */}
      <h2>1. Component next/link</h2>
      <p>
        <code>Link</code> là cách chính để điều hướng trong Next.js. Nó tự động
        prefetch trang đích khi link xuất hiện trong viewport:
      </p>
      <CodeBlock>
        {`
          import Link from "next/link";

          export default function Navigation() {
            return (
              <nav className="flex gap-4">
                {/* Link cơ bản */}
                <Link href="/about">Về chúng tôi</Link>

                {/* Link với dynamic route */}
                <Link href="/blog/bai-viet-1">Bài viết 1</Link>

                {/* Link với query string */}
                <Link href="/products?category=dien-thoai">Điện thoại</Link>

                {/* Link với object */}
                <Link
                  href={{
                    pathname: "/blog/[slug]",
                    query: { slug: "bai-viet-1" },
                  }}
                >
                  Bài viết 1
                </Link>
              </nav>
            );
          }
        `}
      </CodeBlock>

      {/* --- Prefetch --- */}
      <h2>2. Prefetch Behavior</h2>
      <p>
        Mặc định, Next.js sẽ prefetch trang khi <code>Link</code> xuất hiện
        trong viewport. Bạn có thể kiểm soát hành vi này:
      </p>
      <CodeBlock>
        {`
          import Link from "next/link";

          export default function NavLinks() {
            return (
              <nav>
                {/* Prefetch mặc định (true trong production) */}
                <Link href="/dashboard">Dashboard</Link>

                {/* Tắt prefetch - chỉ prefetch khi hover */}
                <Link href="/settings" prefetch={false}>
                  Cài đặt
                </Link>

                {/* Thay thế history thay vì push */}
                <Link href="/login" replace>
                  Đăng nhập
                </Link>

                {/* Scroll lên đầu trang khi navigate (mặc định: true) */}
                <Link href="/faq" scroll={false}>
                  FAQ
                </Link>
              </nav>
            );
          }
        `}
      </CodeBlock>

      <div className="rounded-lg border border-sky-800 bg-sky-900/30 p-4">
        <p className="m-0 text-sm">
          <strong>💡 Lưu ý:</strong> Trong development mode, prefetch không hoạt
          động. Chỉ hoạt động trong production build (<code>next build</code> +{' '}
          <code>next start</code>).
        </p>
      </div>

      {/* --- Active Link --- */}
      <h2>3. Active Link (Link đang active)</h2>
      <p>
        Dùng <code>usePathname</code> để xác định link nào đang active:
      </p>
      <CodeBlock>
        {`
          "use client";

          import Link from "next/link";
          import { usePathname } from "next/navigation";

          const links = [
            { href: "/", label: "Trang chủ" },
            { href: "/about", label: "Giới thiệu" },
            { href: "/blog", label: "Blog" },
            { href: "/contact", label: "Liên hệ" },
          ];

          export default function MainNav() {
            const pathname = usePathname();

            return (
              <nav className="flex gap-4">
                {links.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={\`px-3 py-2 rounded-lg transition-colors \${
                        isActive
                          ? "bg-blue-500 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }\`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            );
          }
        `}
      </CodeBlock>

      {/* --- useRouter --- */}
      <h2>4. useRouter - Điều hướng chương trình</h2>
      <p>
        <code>useRouter</code> cho phép điều hướng bằng code (programmatic
        navigation):
      </p>
      <CodeBlock>
        {`
          "use client";

          import { useRouter } from "next/navigation";

          export default function LoginForm() {
            const router = useRouter();

            async function handleSubmit(e: React.FormEvent) {
              e.preventDefault();

              const res = await fetch("/api/login", { method: "POST" });

              if (res.ok) {
                // Điều hướng đến dashboard
                router.push("/dashboard");

                // Hoặc thay thế history entry hiện tại
                // router.replace("/dashboard");
              }
            }

            return (
              <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Mật khẩu" />
                <button type="submit">Đăng nhập</button>
              </form>
            );
          }
        `}
      </CodeBlock>

      {/* --- Các phương thức useRouter --- */}
      <h2>5. Các phương thức của useRouter</h2>
      <CodeBlock>
        {`
          "use client";

          import { useRouter } from "next/navigation";

          export default function RouterMethods() {
            const router = useRouter();

            return (
              <div className="flex flex-col gap-4">
                {/* push - thêm vào history */}
                <button onClick={() => router.push("/about")}>
                  Đi đến About
                </button>

                {/* replace - thay thế history entry hiện tại */}
                <button onClick={() => router.replace("/login")}>
                  Đi đến Login (replace)
                </button>

                {/* back - quay lại trang trước */}
                <button onClick={() => router.back()}>
                  ← Quay lại
                </button>

                {/* forward - đi tiếp trang sau */}
                <button onClick={() => router.forward()}>
                  Đi tiếp →
                </button>

                {/* refresh - tải lại trang hiện tại */}
                <button onClick={() => router.refresh()}>
                  🔄 Tải lại
                </button>

                {/* prefetch - prefetch trang thủ công */}
                <button onClick={() => router.prefetch("/dashboard")}>
                  Prefetch Dashboard
                </button>
              </div>
            );
          }
        `}
      </CodeBlock>

      {/* --- redirect --- */}
      <h2>6. redirect() - Server-side Redirect</h2>
      <p>
        Dùng <code>redirect()</code> trong Server Component hoặc Server Action:
      </p>
      <CodeBlock>
        {`
          // app/dashboard/page.tsx (Server Component)
          import { redirect } from "next/navigation";
          import { getUser } from "@/lib/auth";

          export default async function DashboardPage() {
            const user = await getUser();

            if (!user) {
              redirect("/login"); // Redirect nếu chưa đăng nhập
            }

            return <h1>Xin chào, {user.name}!</h1>;
          }

          // Trong Server Action
          "use server";

          import { redirect } from "next/navigation";

          export async function createPost(formData: FormData) {
            const title = formData.get("title") as string;

            // Lưu bài viết...
            await savePost({ title });

            redirect("/blog"); // Redirect sau khi hoàn thành
          }
        `}
      </CodeBlock>

      {/* --- Tổng kết --- */}
      <h2>Tổng kết</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Cách điều hướng</th>
            <th className="text-left">Khi nào dùng</th>
            <th className="text-left">Loại</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>&lt;Link&gt;</code>
            </td>
            <td>Điều hướng khai báo (declarative)</td>
            <td>Client</td>
          </tr>
          <tr>
            <td>
              <code>useRouter().push()</code>
            </td>
            <td>Điều hướng chương trình (programmatic)</td>
            <td>Client</td>
          </tr>
          <tr>
            <td>
              <code>redirect()</code>
            </td>
            <td>Redirect phía server</td>
            <td>Server</td>
          </tr>
          <tr>
            <td>
              <code>prefetch</code>
            </td>
            <td>Tải trước trang để chuyển nhanh hơn</td>
            <td>Client</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
