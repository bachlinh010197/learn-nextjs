'use client';

import { useState } from 'react';

export default function ClientCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
      <h3 className="mb-3 text-lg font-semibold text-white">
        🖱️ Client Counter (Interactive)
      </h3>
      <p className="mb-4 text-slate-300">
        Component này dùng{' '}
        <code className="rounded bg-zinc-100 px-1">&quot;use client&quot;</code>{' '}
        vì cần <code className="rounded bg-zinc-100 px-1">useState</code> để
        quản lý state.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition-colors hover:bg-red-600"
        >
          - Giảm
        </button>
        <span className="min-w-[3rem] text-center text-2xl font-bold text-white">
          {count}
        </span>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-lg bg-green-500 px-4 py-2 font-medium text-white transition-colors hover:bg-green-600"
        >
          + Tăng
        </button>
      </div>
      <p className="mt-3 text-xs text-zinc-400">
        Thử inspect HTML source (View Page Source) — bạn sẽ thấy count ban đầu
        là 0 được pre-render trên server.
      </p>
    </div>
  );
}
