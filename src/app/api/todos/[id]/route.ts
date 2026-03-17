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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    return NextResponse.json({ error: 'Không tìm thấy todo' }, { status: 404 });
  }

  return NextResponse.json(todo);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    return NextResponse.json({ error: 'Không tìm thấy todo' }, { status: 404 });
  }

  const body = await request.json();

  if (body.title !== undefined) {
    todo.title = body.title;
  }
  if (body.completed !== undefined) {
    todo.completed = body.completed;
  }

  return NextResponse.json(todo);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const index = todos.findIndex((t) => t.id === Number(id));

  if (index === -1) {
    return NextResponse.json({ error: 'Không tìm thấy todo' }, { status: 404 });
  }

  const deleted = todos.splice(index, 1)[0];

  return NextResponse.json({ message: `Đã xoá todo: ${deleted.title}` });
}
