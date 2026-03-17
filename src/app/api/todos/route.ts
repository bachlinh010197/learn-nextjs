import { NextRequest, NextResponse } from 'next/server';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const todos: Todo[] = [
  { id: 1, title: 'Học Next.js Route Handlers', completed: false },
  { id: 2, title: 'Làm bài tập Server Actions', completed: true },
  { id: 3, title: 'Triển khai ứng dụng lên Vercel', completed: false },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (query) {
    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
    return NextResponse.json(filtered);
  }

  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.title || body.title.trim() === '') {
    return NextResponse.json(
      { error: 'Tiêu đề không được để trống' },
      { status: 400 },
    );
  }

  const newTodo: Todo = {
    id: Date.now(),
    title: body.title.trim(),
    completed: false,
  };

  todos.push(newTodo);

  return NextResponse.json(newTodo, { status: 201 });
}
