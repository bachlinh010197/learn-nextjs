import { CodeBlock } from '@/components/CodeBlock';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bài 7: React cache() - Learn Next.js',
};

export default function Bai7CacheComponent() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-4xl font-bold text-white">
        Bài 7: React cache()
      </h1>
      <p className="mb-8 text-lg text-slate-300">
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
          React.cache()
        </code>{' '}
        là một hàm cho phép bạn memoize kết quả của một hàm tính toán, giúp chia
        sẻ dữ liệu giữa các component mà không cần truyền qua props. Đặc biệt
        hữu ích khi bạn không sử dụng{' '}
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
          fetch()
        </code>{' '}
        (ví dụ: gọi database trực tiếp).
      </p>

      {/* Tại sao cần React.cache() */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Tại sao cần React.cache()?
        </h2>
        <div className="space-y-3 text-slate-300">
          <p>
            Request Memoization chỉ hoạt động với{' '}
            <code className="rounded bg-slate-700 px-1">fetch()</code>. Nhưng
            trong thực tế, bạn thường lấy dữ liệu bằng ORM (Prisma, Drizzle),
            database client, hoặc các hàm tính toán phức tạp. Những trường hợp
            này không được memoize tự động.
          </p>
          <p>
            <code className="rounded bg-slate-700 px-1">React.cache()</code>{' '}
            giải quyết vấn đề này bằng cách memoize kết quả hàm trong cùng một
            lần server render — tương tự Request Memoization nhưng cho bất kỳ
            hàm nào.
          </p>
        </div>
        <CodeBlock>
          {`
            // So sánh:
            //
            // fetch() → Tự động memoize bởi React (Request Memoization)
            // ORM/DB  → KHÔNG tự động memoize → Dùng React.cache()
            //
            // ComponentA: getUser(1)  ─┐
            // ComponentB: getUser(1)  ─┼─→ cache() → Chỉ 1 lần gọi DB
            // ComponentC: getUser(1)  ─┘
          `}
        </CodeBlock>
      </section>

      {/* Cách sử dụng */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Cách sử dụng cơ bản
        </h2>
        <CodeBlock>
          {`
            // lib/data.ts
            import { cache } from 'react';
            import { prisma } from '@/lib/prisma';

            // Wrap hàm lấy dữ liệu với cache()
            export const getUser = cache(async (id: string) => {
              console.log('Gọi database cho user:', id);
              const user = await prisma.user.findUnique({
                where: { id },
              });
              return user;
            });

            // Trong cùng một lần render, dù gọi getUser('1') bao nhiêu lần,
            // database chỉ được query 1 lần duy nhất!
          `}
        </CodeBlock>
      </section>

      {/* Ví dụ thực tế */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Ví dụ thực tế: Chia sẻ dữ liệu giữa các component
        </h2>
        <CodeBlock>
          {`
            // lib/data.ts
            import { cache } from 'react';
            import { prisma } from '@/lib/prisma';

            export const getPost = cache(async (slug: string) => {
              const post = await prisma.post.findUnique({
                where: { slug },
                include: { author: true, tags: true },
              });
              return post;
            });

            // components/PostHeader.tsx
            import { getPost } from '@/lib/data';

            export default async function PostHeader({ slug }: { slug: string }) {
              const post = await getPost(slug); // Gọi lần 1

              return (
                <header>
                  <h1>{post?.title}</h1>
                  <p>Tác giả: {post?.author.name}</p>
                </header>
              );
            }

            // components/PostContent.tsx
            import { getPost } from '@/lib/data';

            export default async function PostContent({ slug }: { slug: string }) {
              const post = await getPost(slug); // Gọi lần 2 — dùng kết quả memoize!

              return (
                <article>
                  <div>{post?.content}</div>
                </article>
              );
            }

            // components/PostSidebar.tsx
            import { getPost } from '@/lib/data';

            export default async function PostSidebar({ slug }: { slug: string }) {
              const post = await getPost(slug); // Gọi lần 3 — vẫn memoize!

              return (
                <aside>
                  <h3>Tags:</h3>
                  <ul>
                    {post?.tags.map((tag) => (
                      <li key={tag.id}>{tag.name}</li>
                    ))}
                  </ul>
                </aside>
              );
            }

            // app/blog/[slug]/page.tsx
            import PostHeader from '@/components/PostHeader';
            import PostContent from '@/components/PostContent';
            import PostSidebar from '@/components/PostSidebar';

            export default async function BlogPost({
              params,
            }: {
              params: Promise<{ slug: string }>;
            }) {
              const { slug } = await params;

              return (
                <div>
                  <PostHeader slug={slug} />
                  <div className="flex">
                    <PostContent slug={slug} />
                    <PostSidebar slug={slug} />
                  </div>
                </div>
              );
              // → Database chỉ bị query 1 lần duy nhất! ✅
            }
          `}
        </CodeBlock>
      </section>

      {/* So sánh với các cách khác */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          So sánh các cách chia sẻ dữ liệu
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Cách
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Ưu điểm
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Nhược điểm
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-medium">Props drilling</td>
                <td className="px-4 py-3">Đơn giản, rõ ràng</td>
                <td className="px-4 py-3">Phức tạp khi component tree sâu</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-4 py-3 font-medium">fetch() + Memoization</td>
                <td className="px-4 py-3">Tự động, không cần setup</td>
                <td className="px-4 py-3">Chỉ cho fetch(), không cho ORM</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">React.cache()</td>
                <td className="px-4 py-3">Linh hoạt, dùng cho mọi hàm</td>
                <td className="px-4 py-3">
                  Chỉ trong 1 render pass (không persist)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Lưu ý quan trọng */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Lưu ý quan trọng
        </h2>
        <CodeBlock>
          {`
            import { cache } from 'react';

            // ✅ ĐÚNG: Khai báo cache ở module scope (ngoài component)
            export const getUser = cache(async (id: string) => {
              return await db.user.findUnique({ where: { id } });
            });

            // ❌ SAI: Khai báo cache bên trong component
            // Mỗi lần render sẽ tạo cache mới → mất tác dụng memoize
            export default async function Page() {
              const getUser = cache(async (id: string) => {
                return await db.user.findUnique({ where: { id } });
              });
              // ...
            }

            // ✅ Cache key dựa trên arguments
            const getUser = cache(async (id: string) => { /* ... */ });
            getUser('1'); // Cache MISS — lưu kết quả
            getUser('1'); // Cache HIT — trả về kết quả memoize
            getUser('2'); // Cache MISS — id khác, gọi lại hàm

            // ✅ Cache chỉ sống trong 1 lần server render
            // Request A: getUser('1') → gọi DB
            // Request B: getUser('1') → gọi DB lại (request khác)
            // → Nếu muốn cache giữa các request, dùng unstable_cache hoặc Data Cache
          `}
        </CodeBlock>
      </section>

      {/* Preload pattern */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Preload Pattern
        </h2>
        <p className="mb-4 text-slate-300">
          Kết hợp{' '}
          <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
            cache()
          </code>{' '}
          với preload pattern để bắt đầu fetch sớm hơn:
        </p>
        <CodeBlock>
          {`
            // lib/data.ts
            import { cache } from 'react';

            export const getPost = cache(async (slug: string) => {
              const post = await db.post.findUnique({ where: { slug } });
              return post;
            });

            // Hàm preload — gọi sớm để bắt đầu fetch
            export function preloadPost(slug: string) {
              void getPost(slug);
              // void → gọi hàm nhưng không await
              // cache() sẽ lưu Promise → các component sau dùng lại
            }

            // app/blog/[slug]/page.tsx
            import { getPost, preloadPost } from '@/lib/data';

            export default async function BlogPage({
              params,
            }: {
              params: Promise<{ slug: string }>;
            }) {
              const { slug } = await params;

              // Preload sớm — bắt đầu query ngay
              preloadPost(slug);

              // Làm việc khác (render layout, etc.)...

              // Khi cần data, kết quả đã sẵn sàng (hoặc gần sẵn sàng)
              const post = await getPost(slug);

              return <article>{post?.title}</article>;
            }
          `}
        </CodeBlock>
        <div className="rounded-lg border border-emerald-800 bg-emerald-900/30 p-4 text-sm text-emerald-300">
          <strong>✅ Tổng kết:</strong> Sử dụng <code>React.cache()</code> khi
          bạn cần memoize kết quả của các hàm không phải fetch() (ORM, database
          client, tính toán phức tạp). Khai báo ở module scope và sử dụng
          preload pattern để tối ưu hiệu suất.
        </div>
      </section>
    </div>
  );
}
