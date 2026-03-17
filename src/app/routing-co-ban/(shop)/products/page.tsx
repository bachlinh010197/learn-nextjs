import Link from 'next/link';

const products = [
  { id: 1, name: 'Next.js Khóa học Pro', price: '499.000đ' },
  { id: 2, name: 'React Mastery', price: '399.000đ' },
  { id: 3, name: 'TypeScript Nâng cao', price: '299.000đ' },
];

export default function ShopProductsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/routing-co-ban/bai-7-route-groups"
        className="mb-4 inline-block text-sm text-sky-400 hover:underline"
      >
        ← Quay lại Bài 7
      </Link>

      <h1 className="mb-4 text-3xl font-bold text-white">
        Trang Products (Shop Group)
      </h1>

      <div className="mb-6 rounded-lg border border-indigo-800 bg-indigo-900/30 p-6">
        <p className="mb-2 text-sm font-semibold text-indigo-300">
          📁 Vị trí file:
        </p>
        <code className="text-sm text-indigo-400">
          app/routing-co-ban/(shop)/products/page.tsx
        </code>
        <p className="mt-3 text-sm text-indigo-400">
          📌 URL thực tế: <strong>/routing-co-ban/products</strong>
        </p>
        <p className="mt-1 text-sm text-indigo-400">
          Thư mục <code>(shop)</code> không xuất hiện trong URL!
        </p>
      </div>

      <h2 className="mb-3 text-xl font-semibold text-white">
        Danh sách sản phẩm (demo)
      </h2>
      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded-lg border border-slate-700 p-4"
          >
            <div>
              <p className="font-medium text-white">{product.name}</p>
              <p className="text-sm text-slate-400">ID: {product.id}</p>
            </div>
            <span className="font-semibold text-indigo-400">
              {product.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
