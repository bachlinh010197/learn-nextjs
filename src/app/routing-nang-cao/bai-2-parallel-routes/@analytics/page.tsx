export default function AnalyticsSlot() {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
      <h3 className="mb-2 text-lg font-semibold text-white">
        📊 Analytics Slot
      </h3>
      <p className="text-sm text-slate-300">
        Đây là nội dung từ{' '}
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sky-300">
          @analytics/page.tsx
        </code>
        . Slot này được render song song với slot @team trong cùng layout.
      </p>
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Lượt truy cập</span>
          <span className="font-mono text-sm font-semibold text-white">
            12,345
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Trang/phiên</span>
          <span className="font-mono text-sm font-semibold text-white">
            3.2
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Tỷ lệ thoát</span>
          <span className="font-mono text-sm font-semibold text-white">
            42%
          </span>
        </div>
      </div>
    </div>
  );
}
