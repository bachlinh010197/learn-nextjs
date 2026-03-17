'use server';

import { revalidatePath } from 'next/cache';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Dữ liệu mẫu (trong thực tế sẽ lưu trong database)
const todos: Todo[] = [
  { id: 1, title: 'Học Next.js', completed: false },
  { id: 2, title: 'Làm bài tập Server Actions', completed: false },
];

export async function getTodos(): Promise<Todo[]> {
  return todos;
}

export async function addTodo(formData: FormData) {
  const title = formData.get('title') as string;

  if (!title || title.trim() === '') {
    return { error: 'Tiêu đề không được để trống' };
  }

  const newTodo: Todo = {
    id: Date.now(),
    title: title.trim(),
    completed: false,
  };

  todos.push(newTodo);
  revalidatePath('/server-actions/bai-2-server-actions');
  return { success: true, todo: newTodo };
}

export async function deleteTodo(formData: FormData) {
  const id = Number(formData.get('id'));
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return { error: 'Không tìm thấy todo' };
  }

  todos.splice(index, 1);
  revalidatePath('/server-actions/bai-2-server-actions');
  return { success: true };
}

export async function toggleTodo(formData: FormData) {
  const id = Number(formData.get('id'));
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return { error: 'Không tìm thấy todo' };
  }

  todo.completed = !todo.completed;
  revalidatePath('/server-actions/bai-2-server-actions');
  return { success: true };
}
