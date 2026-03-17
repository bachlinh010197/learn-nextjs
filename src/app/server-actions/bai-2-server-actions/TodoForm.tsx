'use client';

import { useActionState } from 'react';
import { addTodo } from './actions';

export default function TodoForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error?: string } | null, formData: FormData) => {
      const result = await addTodo(formData);
      if (result.error) {
        return { error: result.error };
      }
      return null;
    },
    null,
  );

  return (
    <form action={formAction} className="flex gap-3">
      <input
        type="text"
        name="title"
        placeholder="Nhập tên todo mới..."
        required
        className="flex-1 rounded-lg border border-slate-600 px-4 py-2 text-sm text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Đang thêm...' : 'Thêm Todo'}
      </button>
      {state?.error && (
        <p className="self-center text-sm text-red-500">{state.error}</p>
      )}
    </form>
  );
}
