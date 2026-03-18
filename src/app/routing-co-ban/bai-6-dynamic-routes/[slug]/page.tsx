import Link from 'next/link';
import { CodeBlock } from '@/components/CodeBlock';

export default async function DynamicSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/routing-co-ban/bai-6-dynamic-routes"
        className="mb-4 inline-block text-sm text-sky-400 hover:underline"
      >
        ← Quay lại Bài 6
      </Link>

      <h1 className="mb-4 text-3xl font-bold text-white">
        Trang Dynamic Route
      </h1>

      <div className="mb-6 rounded-lg border border-slate-700 bg-slate-800 p-6">
        <p className="mb-2 text-sm text-slate-400">
          Giá trị{' '}
          <code className="rounded bg-slate-600 px-1.5 py-0.5 text-sm">
            slug
          </code>{' '}
          nhận được từ URL:
        </p>
        <p className="text-2xl font-bold text-sky-400">{slug}</p>
      </div>

      <div className="rounded-lg border border-slate-700 p-4">
        <h2 className="mb-3 text-lg font-semibold text-white">
          Code của trang này
        </h2>
        <CodeBlock>
          {`
            // bai-6-dynamic-routes/[slug]/page.tsx
            export default async function DynamicSlugPage({
              params,
            }: {
              params: Promise<{ slug: string }>;
            }) {
              const { slug } = await params;

              return (
                <div>
                  <p>Slug hiện tại: <strong>{slug}</strong></p>
                </div>
              );
            }
          `}
        </CodeBlock>
      </div>
    </div>
  );
}
