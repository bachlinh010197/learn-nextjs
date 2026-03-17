export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-600 border-t-blue-500" />
      <p className="text-sm text-slate-400">Đang tải bài học...</p>
    </div>
  );
}
