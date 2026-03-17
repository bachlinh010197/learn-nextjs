import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bài 9: ISR - Rendering Strategies',
};

export const revalidate = 30;

export default async function Bai9Page() {
  const renderTime = new Date().toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });

  let post: { id: number; title: string; body: string } | null = null;
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    post = await res.json();
  } catch {
    post = null;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-white">
        Bài 9: ISR (Incremental Static Regeneration)
      </h1>

      <p className="mb-8 leading-relaxed text-slate-300">
        ISR kết hợp ưu điểm của SSG (tốc độ nhanh) và SSR (dữ liệu mới). Trang
        được tạo tĩnh lúc build, nhưng tự động{' '}
        <strong>regenerate (tái tạo)</strong> sau một khoảng thời gian nhất
        định.
      </p>

      {/* How ISR works */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          ISR hoạt động như thế nào?
        </h2>
        <ol className="mb-4 list-inside list-decimal space-y-3 text-slate-300">
          <li>
            <strong>Build time:</strong> Trang được render và cache (giống SSG).
          </li>
          <li>
            <strong>Trong thời gian revalidate:</strong> Mọi request đều nhận
            được trang đã cache — cực nhanh.
          </li>
          <li>
            <strong>Sau thời gian revalidate:</strong> Request tiếp theo vẫn
            nhận trang cũ (stale), nhưng Next.js bắt đầu regenerate trang mới ở
            background.
          </li>
          <li>
            <strong>Regeneration xong:</strong> Trang mới thay thế trang cũ
            trong cache. Request tiếp theo nhận trang mới.
          </li>
        </ol>

        <div className="rounded-lg border border-amber-800 bg-amber-900/30 p-4">
          <p className="text-sm text-amber-300">
            ⚠️ Đây là chiến lược{' '}
            <strong>&quot;stale-while-revalidate&quot;</strong>— người dùng luôn
            nhận response ngay (không chờ), dù đôi khi là dữ liệu cũ.
          </p>
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Cách triển khai ISR
        </h2>
        <p className="mb-3 text-slate-300">
          Chỉ cần thêm <code>export const revalidate = N</code> vào page hoặc
          layout:
        </p>
        <pre className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-green-400">
          <code>{`// app/products/page.tsx

// Revalidate mỗi 60 giây
export const revalidate = 60;

export default async function ProductsPage() {
  // Fetch được cache và revalidate theo revalidate config
  const res = await fetch("https://api.example.com/products");
  const products = await res.json();

  return (
    <div>
      <h1>Sản phẩm</h1>
      <p>Cập nhật lúc: {new Date().toLocaleString("vi-VN")}</p>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name} - {p.price}đ</li>
        ))}
      </ul>
    </div>
  );
}`}</code>
        </pre>

        <h3 className="mb-2 text-lg font-medium text-slate-300">
          Hoặc revalidate ở mức fetch:
        </h3>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-green-400">
          <code>{`// Revalidate từng fetch riêng biệt
const res = await fetch("https://api.example.com/products", {
  next: { revalidate: 60 }, // Cache 60 giây
});

// Kết hợp: page revalidate 120s, nhưng fetch này revalidate 30s
export const revalidate = 120;

const fastData = await fetch("https://api.example.com/fast", {
  next: { revalidate: 30 }, // Override: 30s cho fetch này
});

const slowData = await fetch("https://api.example.com/slow");
// Dùng page-level revalidate: 120s`}</code>
        </pre>
      </section>

      {/* Live demo */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          🎮 Demo ISR — Trang này dùng revalidate = 30
        </h2>
        <p className="mb-4 text-sm text-slate-400">
          Trang này có <code>export const revalidate = 30</code>. Reload nhiều
          lần và quan sát thời gian render:
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-emerald-800 bg-emerald-900/30 p-4">
            <p className="text-sm text-emerald-300">
              ⏰ Thời gian render: <strong>{renderTime}</strong>
            </p>
            <p className="mt-1 text-xs text-emerald-400">
              👆 Nếu reload trong vòng 30 giây, thời gian này sẽ giống nhau
              (đang serve cached version). Sau 30 giây, trang được regenerate.
            </p>
          </div>

          {post && (
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
              <h3 className="font-semibold text-white">📝 Dữ liệu đã fetch:</h3>
              <p className="mt-1 text-sm font-medium text-slate-300">
                {post.title}
              </p>
              <p className="mt-1 text-sm text-slate-400">{post.body}</p>
            </div>
          )}
        </div>
      </section>

      {/* On-demand revalidation */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          On-Demand Revalidation
        </h2>
        <p className="mb-4 text-slate-300">
          Ngoài time-based revalidation, bạn có thể trigger revalidation thủ
          công (ví dụ: khi CMS publish bài mới):
        </p>
        <pre className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-green-400">
          <code>{`// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { path, tag } = await request.json();

  // Revalidate theo path
  if (path) {
    revalidatePath(path);
    return Response.json({ revalidated: true, path });
  }

  // Revalidate theo tag
  if (tag) {
    revalidateTag(tag);
    return Response.json({ revalidated: true, tag });
  }

  return Response.json({ error: "Missing path or tag" }, { status: 400 });
}

// Sử dụng tag trong fetch:
const res = await fetch("https://api.example.com/posts", {
  next: { tags: ["posts"] },
});

// Trigger revalidation:
// POST /api/revalidate { "tag": "posts" }
// → Tất cả pages dùng tag "posts" sẽ được regenerate`}</code>
        </pre>
      </section>

      {/* Comparison */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-white">
          ISR vs SSG vs SSR
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-slate-600">
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  Tiêu chí
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  SSG
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  ISR
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  SSR
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-medium">Render khi nào</td>
                <td className="px-4 py-3">Build time</td>
                <td className="px-4 py-3">Build + revalidate</td>
                <td className="px-4 py-3">Mỗi request</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-medium">Tốc độ</td>
                <td className="px-4 py-3">⚡ Rất nhanh</td>
                <td className="px-4 py-3">⚡ Nhanh</td>
                <td className="px-4 py-3">🐢 Trung bình</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-medium">Dữ liệu</td>
                <td className="px-4 py-3">Cũ (từ build)</td>
                <td className="px-4 py-3">Gần mới (revalidate)</td>
                <td className="px-4 py-3">Luôn mới</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Cần rebuild</td>
                <td className="px-4 py-3">Có</td>
                <td className="px-4 py-3">Không</td>
                <td className="px-4 py-3">Không</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Summary */}
      <section className="rounded-lg border border-sky-800 bg-sky-900/30 p-6">
        <h2 className="mb-2 text-lg font-semibold text-sky-300">💡 Tóm tắt</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-sky-400">
          <li>
            ISR = SSG + tự động cập nhật. Dùng{' '}
            <code>export const revalidate = N</code>.
          </li>
          <li>
            Chiến lược stale-while-revalidate: phục vụ cache cũ, regenerate ở
            background.
          </li>
          <li>
            On-demand revalidation cho phép trigger regeneration thủ công.
          </li>
          <li>
            Phù hợp cho: e-commerce, news, catalog — dữ liệu thay đổi nhưng
            không cần real-time.
          </li>
        </ul>
      </section>
    </div>
  );
}
