export default function TeamSlot() {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
      <h3 className="mb-2 text-lg font-semibold text-white">👥 Team Slot</h3>
      <p className="text-sm text-slate-300">
        Đây là nội dung từ{' '}
        <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sky-300">
          @team/page.tsx
        </code>
        . Slot này được render song song với slot @analytics.
      </p>
      <ul className="mt-3 space-y-2">
        <li className="flex items-center gap-2 text-sm text-slate-300">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
          Nguyễn Văn A — Frontend
        </li>
        <li className="flex items-center gap-2 text-sm text-slate-300">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
          Trần Thị B — Backend
        </li>
        <li className="flex items-center gap-2 text-sm text-slate-300">
          <span className="inline-block h-2 w-2 rounded-full bg-yellow-500" />
          Lê Văn C — DevOps
        </li>
      </ul>
    </div>
  );
}
