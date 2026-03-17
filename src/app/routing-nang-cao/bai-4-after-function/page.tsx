export default function Bai4AfterFunctionPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold text-white">
        Bài 4: After Function
      </h1>
      <p className="mb-6 text-slate-300">
        Sử dụng{' '}
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
          after()
        </code>{' '}
        để chạy code sau khi response đã được gửi đến client.
      </p>

      {/* Giải thích */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          After Function là gì?
        </h2>
        <div className="space-y-4 text-slate-300">
          <p>
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              after()
            </code>{' '}
            (trước đây là{' '}
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              unstable_after
            </code>
            ) cho phép bạn lên lịch thực thi code{' '}
            <strong>sau khi response đã được gửi</strong> (hoặc prerender hoàn
            tất).
          </p>
          <p>
            Điều này rất hữu ích cho các tác vụ phụ như logging, analytics, đồng
            bộ dữ liệu với hệ thống bên ngoài — những thứ không nên chặn
            response gửi về cho người dùng.
          </p>
        </div>
      </section>

      {/* Khi nào dùng */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Khi nào nên dùng?
        </h2>
        <ul className="list-inside list-disc space-y-2 text-slate-300">
          <li>Ghi log sau khi xử lý request</li>
          <li>Gửi analytics event</li>
          <li>Đồng bộ dữ liệu với hệ thống bên ngoài (CMS, database)</li>
          <li>Gửi notification sau khi mutation thành công</li>
          <li>Cập nhật cache hoặc invalidate data</li>
        </ul>
      </section>

      {/* Nơi sử dụng */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Có thể dùng ở đâu?
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="py-2 pr-4 text-left font-semibold text-white">
                  Nơi sử dụng
                </th>
                <th className="py-2 text-left font-semibold text-white">
                  Hỗ trợ
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="py-2 pr-4">Server Components</td>
                <td className="py-2">✅</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 pr-4">Server Actions</td>
                <td className="py-2">✅</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 pr-4">Route Handlers</td>
                <td className="py-2">✅</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Middleware</td>
                <td className="py-2">✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Ví dụ trong Server Component */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Ví dụ 1: Trong Server Component
        </h2>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// app/dashboard/page.tsx
import { after } from "next/server";

export default function DashboardPage() {
  // Lên lịch chạy sau khi response được gửi
  after(async () => {
    await logPageView("/dashboard");
    await syncAnalytics();
  });

  // Response được gửi ngay — không bị chặn
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Nội dung hiển thị ngay lập tức</p>
    </div>
  );
}

async function logPageView(path: string) {
  console.log(\`[LOG] Page viewed: \${path}\`);
}

async function syncAnalytics() {
  // Gửi data đến analytics service
  console.log("[ANALYTICS] Syncing...");
}`}</code>
        </pre>
      </section>

      {/* Ví dụ trong Server Action */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Ví dụ 2: Trong Server Action
        </h2>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`"use server";

import { after } from "next/server";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;

  // Tạo bài viết trong database
  const post = await db.post.create({
    data: { title },
  });

  // Sau khi response gửi xong, thực hiện các tác vụ phụ
  after(async () => {
    // Gửi notification
    await sendNotification(\`Bài viết "\${title}" đã được tạo\`);
    // Cập nhật search index
    await updateSearchIndex(post.id);
    // Ghi audit log
    await auditLog("post.created", { postId: post.id });
  });

  return { success: true, post };
}`}</code>
        </pre>
      </section>

      {/* Ví dụ trong Route Handler */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Ví dụ 3: Trong Route Handler
        </h2>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// app/api/users/route.ts
import { NextResponse } from "next/server";
import { after } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  // Tạo user
  const user = await createUser(data);

  // Chạy sau khi response gửi xong
  after(async () => {
    await sendWelcomeEmail(user.email);
    await trackSignup(user.id);
  });

  return NextResponse.json(user, { status: 201 });
}`}</code>
        </pre>
      </section>

      {/* Lưu ý quan trọng */}
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Lưu ý quan trọng
        </h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-yellow-800 bg-yellow-900/30 p-4">
            <p className="text-sm text-yellow-300">
              ⚠️ <strong>after()</strong> không được đảm bảo chạy nếu server tắt
              hoặc crash trước khi callback hoàn tất.
            </p>
          </div>
          <div className="rounded-lg border border-yellow-800 bg-yellow-900/30 p-4">
            <p className="text-sm text-yellow-300">
              ⚠️ Không thể dùng{' '}
              <code className="rounded bg-yellow-900 px-1 text-yellow-300">
                cookies()
              </code>{' '}
              hoặc{' '}
              <code className="rounded bg-yellow-900 px-1 text-yellow-300">
                headers()
              </code>{' '}
              bên trong callback của after() vì response đã được gửi.
            </p>
          </div>
          <div className="rounded-lg border border-yellow-800 bg-yellow-900/30 p-4">
            <p className="text-sm text-yellow-300">
              ⚠️ Có thể gọi{' '}
              <code className="rounded bg-yellow-900 px-1 text-yellow-300">
                after()
              </code>{' '}
              nhiều lần — tất cả callbacks sẽ được thực thi.
            </p>
          </div>
        </div>
      </section>

      <div className="rounded-lg border border-sky-800 bg-sky-900/30 p-4">
        <p className="text-sm text-sky-300">
          💡 <strong>Mẹo:</strong> Sử dụng{' '}
          <code className="rounded bg-sky-900 px-1 text-sky-300">after()</code>{' '}
          thay vì{' '}
          <code className="rounded bg-sky-900 px-1 text-sky-300">
            waitUntil()
          </code>{' '}
          (Vercel) hoặc background jobs đơn giản. Nó chạy trên cùng serverless
          function mà không cần cấu hình thêm.
        </p>
      </div>
    </div>
  );
}
