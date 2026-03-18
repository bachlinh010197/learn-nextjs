import { CodeBlock } from '@/components/CodeBlock';
import { getTodos } from './actions';
import TodoForm from './TodoForm';

async function handleToggle(formData: FormData) {
  'use server';
  const { toggleTodo } = await import('./actions');
  await toggleTodo(formData);
}

async function handleDelete(formData: FormData) {
  'use server';
  const { deleteTodo } = await import('./actions');
  await deleteTodo(formData);
}

export default async function Bai2ServerActions() {
  const todos = await getTodos();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-3xl font-bold text-white">
        Bài 2: Server Actions
      </h1>
      <p className="mb-8 text-lg text-slate-300">
        Server Actions cho phép bạn chạy code phía server trực tiếp từ
        component, không cần tạo API route riêng. Sử dụng directive{' '}
        <code>&quot;use server&quot;</code> để đánh dấu một hàm là Server
        Action.
      </p>

      {/* Khái niệm */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          1. Directive &quot;use server&quot;
        </h2>
        <p className="mb-4 text-slate-300">
          Đặt <code>&quot;use server&quot;</code> ở đầu file hoặc đầu hàm để
          đánh dấu đó là Server Action. Khi gọi từ client, Next.js sẽ tự động
          gửi request đến server.
        </p>
        <div className="rounded-lg bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-xs text-zinc-400">📄 actions.ts</p>
          <CodeBlock>
            {`
              "use server";

              import { revalidatePath } from "next/cache";

              export async function addTodo(formData: FormData) {
                const title = formData.get("title") as string;

                // Lưu vào database...
                
                // Revalidate để cập nhật UI
                revalidatePath("/server-actions/bai-2-server-actions");
              }
            `}
          </CodeBlock>
        </div>
      </section>

      {/* Form Actions */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          2. Form Actions
        </h2>
        <p className="mb-4 text-slate-300">
          Server Actions có thể được truyền vào thuộc tính <code>action</code>{' '}
          của <code>&lt;form&gt;</code>. Khi form submit, hàm server action sẽ
          nhận <code>FormData</code> làm tham số.
        </p>
        <div className="rounded-lg bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-xs text-zinc-400">📄 TodoForm.tsx</p>
          <CodeBlock>
            {`
              "use client";

              import { addTodo } from "./actions";

              export default function TodoForm() {
                return (
                  <form action={addTodo}>
                    <input type="text" name="title" />
                    <button type="submit">Thêm</button>
                  </form>
                );
              }
            `}
          </CodeBlock>
        </div>
      </section>

      {/* Mutation & Revalidation */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          3. Mutation & Revalidation
        </h2>
        <p className="mb-4 text-slate-300">
          Sau khi thay đổi dữ liệu (mutation), bạn cần gọi{' '}
          <code>revalidatePath()</code> hoặc <code>revalidateTag()</code> để
          Next.js cập nhật lại cache và hiển thị dữ liệu mới.
        </p>
        <div className="rounded-lg bg-zinc-900 p-4 text-sm">
          <CodeBlock>
            {`
              "use server";

              import { revalidatePath } from "next/cache";
              import { revalidateTag } from "next/cache";

              export async function deleteTodo(formData: FormData) {
                const id = formData.get("id");
                
                // Xoá từ database...

                // Cách 1: Revalidate theo path
                revalidatePath("/server-actions/bai-2-server-actions");

                // Cách 2: Revalidate theo tag
                // revalidateTag("todos");
              }
            `}
          </CodeBlock>
        </div>
      </section>

      {/* useActionState */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          4. useActionState (xử lý trạng thái)
        </h2>
        <p className="mb-4 text-slate-300">
          Hook <code>useActionState</code> giúp theo dõi trạng thái pending và
          kết quả trả về từ server action:
        </p>
        <div className="rounded-lg bg-zinc-900 p-4 text-sm">
          <CodeBlock>
            {`
              "use client";

              import { useActionState } from "react";
              import { addTodo } from "./actions";

              export default function TodoForm() {
                const [state, formAction, isPending] = useActionState(
                  async (_prev, formData) => {
                    const result = await addTodo(formData);
                    if (result.error) return { error: result.error };
                    return null;
                  },
                  null
                );

                return (
                  <form action={formAction}>
                    <input type="text" name="title" />
                    <button disabled={isPending}>
                      {isPending ? "Đang thêm..." : "Thêm"}
                    </button>
                    {state?.error && <p>{state.error}</p>}
                  </form>
                );
              }
            `}
          </CodeBlock>
        </div>
      </section>

      {/* Demo */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          5. Demo: Todo App với Server Actions
        </h2>
        <p className="mb-6 text-slate-300">
          Dưới đây là demo hoạt động. Bạn có thể thêm, xoá và đánh dấu hoàn
          thành todo. Tất cả đều dùng Server Actions (không cần API route).
        </p>

        <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            📝 Danh sách Todo
          </h3>

          <TodoForm />

          <ul className="mt-6 space-y-3">
            {todos.length === 0 && (
              <li className="text-center text-sm text-zinc-400">
                Chưa có todo nào. Hãy thêm todo mới!
              </li>
            )}
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between rounded-lg border border-slate-700 border-zinc-100 bg-slate-800 bg-zinc-50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <form action={handleToggle}>
                    <input type="hidden" name="id" value={todo.id} />
                    <button
                      type="submit"
                      className={`flex h-5 w-5 items-center justify-center rounded border text-xs ${
                        todo.completed
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-slate-600'
                      }`}
                    >
                      {todo.completed && '✓'}
                    </button>
                  </form>
                  <span
                    className={`text-sm ${
                      todo.completed
                        ? 'text-zinc-400 line-through'
                        : 'text-white'
                    }`}
                  >
                    {todo.title}
                  </span>
                </div>
                <form action={handleDelete}>
                  <input type="hidden" name="id" value={todo.id} />
                  <button
                    type="submit"
                    className="rounded px-2 py-1 text-xs text-red-500 transition-colors hover:bg-red-950"
                  >
                    Xoá
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
