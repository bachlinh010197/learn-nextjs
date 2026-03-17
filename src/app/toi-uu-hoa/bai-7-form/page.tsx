export default function Bai7Form() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1>Bài 7: Quản lý Form</h1>

      <p>
        React 19 và Next.js cung cấp các hook mạnh mẽ để quản lý form:{' '}
        <code>useFormStatus</code>, <code>useActionState</code>, và{' '}
        <code>useOptimistic</code>. Kết hợp với Server Actions, bạn có thể xây
        dựng form hiệu quả mà không cần viết API route riêng.
      </p>

      {/* --- Server Action cơ bản --- */}
      <h2>1. Server Action với Form</h2>
      <p>
        Server Action cho phép form gửi dữ liệu trực tiếp đến server mà không
        cần tạo API endpoint:
      </p>
      <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
        <code>{`// app/actions.ts
"use server";

export async function createComment(formData: FormData) {
  const content = formData.get("content") as string;
  const postId = formData.get("postId") as string;

  // Validate
  if (!content || content.trim().length === 0) {
    return { error: "Nội dung không được để trống" };
  }

  // Lưu vào database
  await db.comment.create({
    data: { content, postId },
  });

  return { success: true };
}

// app/blog/[slug]/page.tsx
import { createComment } from "@/app/actions";

export default function BlogPost() {
  return (
    <div>
      <h1>Bài viết</h1>

      <form action={createComment}>
        <input type="hidden" name="postId" value="123" />
        <textarea
          name="content"
          placeholder="Viết bình luận..."
          className="w-full rounded-lg border p-3"
          required
        />
        <button
          type="submit"
          className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          Gửi bình luận
        </button>
      </form>
    </div>
  );
}`}</code>
      </pre>

      {/* --- useFormStatus --- */}
      <h2>2. useFormStatus - Trạng thái đang submit</h2>
      <p>
        Hook <code>useFormStatus</code> cho biết form đang được submit hay
        không. Phải dùng trong component con của <code>&lt;form&gt;</code>:
      </p>
      <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
        <code>{`"use client";

import { useFormStatus } from "react-dom";

// Component nút submit riêng
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-blue-500 px-4 py-2 text-white
                 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Đang gửi..." : "Gửi bình luận"}
    </button>
  );
}

// Sử dụng trong form
import { createComment } from "@/app/actions";

export default function CommentForm() {
  return (
    <form action={createComment}>
      <textarea
        name="content"
        placeholder="Viết bình luận..."
        className="w-full rounded-lg border p-3"
        required
      />
      {/* SubmitButton phải là CON của <form> */}
      <SubmitButton />
    </form>
  );
}`}</code>
      </pre>

      <div className="rounded-lg border border-amber-800 bg-amber-900/30 p-4">
        <p className="m-0 text-sm">
          <strong>⚠️ Lưu ý:</strong> <code>useFormStatus</code> phải được dùng
          trong component con của <code>&lt;form&gt;</code>, không phải trong
          cùng component chứa form.
        </p>
      </div>

      {/* --- useActionState --- */}
      <h2>3. useActionState - Quản lý state từ Server Action</h2>
      <p>
        <code>useActionState</code> (React 19) giúp quản lý state trả về từ
        Server Action, bao gồm cả lỗi validation:
      </p>
      <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
        <code>{`// app/actions.ts
"use server";

export type FormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
  };
};

export async function registerUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  // Validate
  const errors: FormState["errors"] = {};

  if (!name || name.length < 2) {
    errors.name = ["Tên phải có ít nhất 2 ký tự"];
  }

  if (!email || !email.includes("@")) {
    errors.email = ["Email không hợp lệ"];
  }

  if (Object.keys(errors).length > 0) {
    return { message: "Lỗi validation", errors };
  }

  // Lưu user vào database
  await db.user.create({ data: { name, email } });

  return { message: "Đăng ký thành công!" };
}`}</code>
      </pre>

      <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
        <code>{`// app/register/page.tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { registerUser, type FormState } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white
                 disabled:opacity-50"
    >
      {pending ? "Đang đăng ký..." : "Đăng ký"}
    </button>
  );
}

const initialState: FormState = { message: "" };

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <form action={formAction} className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-bold">Đăng ký tài khoản</h1>

      {/* Thông báo thành công */}
      {state.message && !state.errors && (
        <p className="rounded-lg bg-emerald-900 p-3 text-emerald-400">
          {state.message}
        </p>
      )}

      {/* Field: Tên */}
      <div>
        <label className="block text-sm font-medium">Họ và tên</label>
        <input
          name="name"
          className="mt-1 w-full rounded-lg border p-2"
          placeholder="Nguyễn Văn A"
        />
        {state.errors?.name && (
          <p className="mt-1 text-sm text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      {/* Field: Email */}
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          className="mt-1 w-full rounded-lg border p-2"
          placeholder="email@example.com"
        />
        {state.errors?.email && (
          <p className="mt-1 text-sm text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}`}</code>
      </pre>

      {/* --- useOptimistic --- */}
      <h2>4. Optimistic Updates với useOptimistic</h2>
      <p>
        <code>useOptimistic</code> cho phép cập nhật UI ngay lập tức trước khi
        Server Action hoàn thành, tạo trải nghiệm nhanh chóng:
      </p>
      <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
        <code>{`"use client";

import { useOptimistic } from "react";
import { useFormStatus } from "react-dom";
import { addTodo } from "@/app/actions";

interface Todo {
  id: string;
  text: string;
  sending?: boolean; // Đánh dấu đang gửi
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
    >
      Thêm
    </button>
  );
}

export default function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state: Todo[], newTodo: string) => [
      ...state,
      { id: "temp-" + Date.now(), text: newTodo, sending: true },
    ]
  );

  async function handleAddTodo(formData: FormData) {
    const text = formData.get("text") as string;

    // Cập nhật UI ngay lập tức (optimistic)
    addOptimisticTodo(text);

    // Gửi đến server
    await addTodo(formData);
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-bold">Danh sách việc cần làm</h1>

      {/* Danh sách todos */}
      <ul className="mb-4 space-y-2">
        {optimisticTodos.map((todo) => (
          <li
            key={todo.id}
            className={\`rounded-lg border p-3 \${
              todo.sending ? "opacity-50" : ""
            }\`}
          >
            {todo.text}
            {todo.sending && (
              <span className="ml-2 text-sm text-gray-400">
                Đang gửi...
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Form thêm todo */}
      <form action={handleAddTodo} className="flex gap-2">
        <input
          name="text"
          placeholder="Việc cần làm..."
          className="flex-1 rounded-lg border p-2"
          required
        />
        <SubmitButton />
      </form>
    </div>
  );
}`}</code>
      </pre>

      {/* --- Ví dụ Like button --- */}
      <h2>5. Ví dụ: Nút Like với Optimistic Update</h2>
      <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
        <code>{`// app/actions.ts
"use server";

export async function toggleLike(postId: string) {
  // Giả lập delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Toggle like trong database
  // await db.like.toggle({ postId, userId: currentUser.id });
}

// components/LikeButton.tsx
"use client";

import { useOptimistic, useTransition } from "react";
import { toggleLike } from "@/app/actions";

export default function LikeButton({
  postId,
  initialLiked,
  initialCount,
}: {
  postId: string;
  initialLiked: boolean;
  initialCount: number;
}) {
  const [isPending, startTransition] = useTransition();

  const [optimistic, setOptimistic] = useOptimistic(
    { liked: initialLiked, count: initialCount },
    (state, _action: void) => ({
      liked: !state.liked,
      count: state.liked ? state.count - 1 : state.count + 1,
    })
  );

  function handleClick() {
    startTransition(async () => {
      setOptimistic(undefined);
      await toggleLike(postId);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={\`flex items-center gap-2 rounded-full px-4 py-2 transition-colors \${
        optimistic.liked
          ? "bg-red-100 text-red-400"
          : "bg-gray-100 text-gray-600"
      }\`}
    >
      {optimistic.liked ? "❤️" : "🤍"} {optimistic.count}
    </button>
  );
}`}</code>
      </pre>

      {/* --- Tổng kết --- */}
      <h2>Tổng kết</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Hook / API</th>
            <th className="text-left">Mục đích</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>Server Action</code>
            </td>
            <td>Xử lý form submit trên server</td>
          </tr>
          <tr>
            <td>
              <code>useFormStatus</code>
            </td>
            <td>Biết form đang submit hay không (pending)</td>
          </tr>
          <tr>
            <td>
              <code>useActionState</code>
            </td>
            <td>Quản lý state trả về từ Server Action</td>
          </tr>
          <tr>
            <td>
              <code>useOptimistic</code>
            </td>
            <td>Cập nhật UI ngay trước khi server phản hồi</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
