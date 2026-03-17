import Link from 'next/link';

export default function Bai5NotFoundPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold text-white">
        Bài 5: Xử lý trang không tồn tại
      </h1>
      <p className="mb-6 text-slate-300">
        File{' '}
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
          not-found.tsx
        </code>{' '}
        cho phép bạn tùy chỉnh trang 404 khi người dùng truy cập URL không tồn
        tại, hoặc khi bạn chủ động gọi hàm{' '}
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
          notFound()
        </code>
        .
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Tạo trang not-found.tsx
        </h2>
        <pre className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// app/not-found.tsx (hoặc app/blog/not-found.tsx)
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Không tìm thấy trang</h2>
      <p>Trang bạn đang tìm không tồn tại.</p>
      <Link href="/">Về trang chủ</Link>
    </div>
  );
}`}</code>
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Gọi notFound() trong code
        </h2>
        <p className="mb-4 text-slate-300">
          Bạn có thể chủ động trigger trang 404 bằng hàm{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            notFound()
          </code>{' '}
          từ{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            next/navigation
          </code>
          . Thường dùng khi fetch data không tìm thấy kết quả.
        </p>
        <pre className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";

async function getPost(slug: string) {
  const res = await fetch(\`https://api.example.com/posts/\${slug}\`);
  if (!res.ok) return null;
  return res.json();
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound(); // → Hiển thị not-found.tsx gần nhất
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}`}</code>
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Phân cấp not-found.tsx
        </h2>
        <p className="mb-4 text-slate-300">
          Next.js sẽ tìm file{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            not-found.tsx
          </code>{' '}
          gần nhất trong cây thư mục. Bạn có thể có not-found.tsx khác nhau cho
          từng section:
        </p>
        <pre className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`app/
├── not-found.tsx           → 404 mặc định cho toàn app
├── blog/
│   ├── not-found.tsx       → 404 riêng cho /blog/*
│   └── [slug]/
│       └── page.tsx
└── shop/
    ├── not-found.tsx       → 404 riêng cho /shop/*
    └── [id]/
        └── page.tsx`}</code>
        </pre>
      </section>

      <section className="rounded-lg border border-purple-800 bg-purple-900/30 p-4">
        <h3 className="mb-2 font-semibold text-purple-300">🧪 Demo</h3>
        <p className="mb-3 text-sm text-purple-400">
          Thư mục <code>bai-5-not-found/</code> có file{' '}
          <code>not-found.tsx</code> tùy chỉnh. Thử truy cập một URL không tồn
          tại trong section này để xem trang 404 tùy chỉnh.
        </p>
        <Link
          href="/routing-co-ban/bai-5-not-found/trang-khong-ton-tai"
          className="inline-block rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
        >
          Truy cập trang không tồn tại →
        </Link>
      </section>
    </div>
  );
}
