'use client';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg rounded-lg border border-red-800 bg-red-900/30 p-6 text-center">
      <div className="mb-3 text-4xl">⚠️</div>
      <h2 className="mb-2 text-xl font-bold text-red-300">Đã xảy ra lỗi!</h2>
      <p className="mb-4 text-sm text-red-400">{error.message}</p>
      <button
        onClick={reset}
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
      >
        Thử lại
      </button>
    </div>
  );
}
