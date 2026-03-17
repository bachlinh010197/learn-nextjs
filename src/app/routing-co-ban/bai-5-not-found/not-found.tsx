import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 text-6xl">🔍</div>
      <h2 className="mb-2 text-2xl font-bold text-white">
        Không tìm thấy trang
      </h2>
      <p className="mb-6 text-slate-400">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link
        href="/routing-co-ban/bai-5-not-found"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Quay lại bài học
      </Link>
    </div>
  );
}
