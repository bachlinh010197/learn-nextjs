export default function Bai2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="mb-4 rounded-lg border border-emerald-700 bg-emerald-900/30 p-3 text-sm text-emerald-300">
        🟢 Đây là <strong>Nested Layout</strong> của Bài 2 — nó bọc quanh nội
        dung page bên dưới.
      </div>
      {children}
    </div>
  );
}
