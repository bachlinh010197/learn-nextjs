export default function Bai1RouteHandlers() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-3xl font-bold text-white">
        Bài 1: Route Handlers
      </h1>
      <p className="mb-8 text-lg text-slate-300">
        Route Handlers cho phép bạn tạo các API endpoints trực tiếp trong ứng
        dụng Next.js bằng cách sử dụng file <code>route.ts</code> trong thư mục{' '}
        <code>app/</code>.
      </p>

      {/* Khái niệm cơ bản */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          1. Khái niệm cơ bản
        </h2>
        <p className="mb-4 text-slate-300">
          Route Handlers được định nghĩa trong file <code>route.ts</code> (hoặc{' '}
          <code>route.js</code>) bên trong thư mục <code>app/api/</code>. Mỗi
          file có thể export các hàm tương ứng với các HTTP method:{' '}
          <code>GET</code>, <code>POST</code>, <code>PUT</code>,{' '}
          <code>DELETE</code>, <code>PATCH</code>.
        </p>
        <div className="rounded-lg bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-xs text-zinc-400">📁 Cấu trúc thư mục:</p>
          <pre className="text-green-400">
            {`src/
└── app/
    └── api/
        └── todos/
            ├── route.ts          → /api/todos
            └── [id]/
                └── route.ts      → /api/todos/:id`}
          </pre>
        </div>
      </section>

      {/* GET method */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          2. Phương thức GET
        </h2>
        <p className="mb-4 text-slate-300">
          Dùng để lấy dữ liệu. Ví dụ lấy danh sách todos:
        </p>
        <div className="rounded-lg bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-xs text-zinc-400">
            📄 src/app/api/todos/route.ts
          </p>
          <pre className="text-green-400">
            {`import { NextResponse } from "next/server";

const todos = [
  { id: 1, title: "Học Next.js", completed: false },
  { id: 2, title: "Làm bài tập", completed: true },
];

export async function GET() {
  return NextResponse.json(todos);
}`}
          </pre>
        </div>
      </section>

      {/* POST method */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          3. Phương thức POST
        </h2>
        <p className="mb-4 text-slate-300">
          Dùng để tạo dữ liệu mới. Đọc body từ request:
        </p>
        <div className="rounded-lg bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-xs text-zinc-400">
            📄 src/app/api/todos/route.ts
          </p>
          <pre className="text-green-400">
            {`export async function POST(request: Request) {
  const body = await request.json();

  const newTodo = {
    id: Date.now(),
    title: body.title,
    completed: false,
  };

  // Trong thực tế, lưu vào database
  return NextResponse.json(newTodo, { status: 201 });
}`}
          </pre>
        </div>
      </section>

      {/* PUT method */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          4. Phương thức PUT
        </h2>
        <p className="mb-4 text-slate-300">
          Dùng để cập nhật dữ liệu. Kết hợp với dynamic route <code>[id]</code>:
        </p>
        <div className="rounded-lg bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-xs text-zinc-400">
            📄 src/app/api/todos/[id]/route.ts
          </p>
          <pre className="text-green-400">
            {`export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updatedTodo = {
    id: Number(id),
    title: body.title,
    completed: body.completed,
  };

  return NextResponse.json(updatedTodo);
}`}
          </pre>
        </div>
      </section>

      {/* DELETE method */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          5. Phương thức DELETE
        </h2>
        <p className="mb-4 text-slate-300">Dùng để xoá dữ liệu:</p>
        <div className="rounded-lg bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-xs text-zinc-400">
            📄 src/app/api/todos/[id]/route.ts
          </p>
          <pre className="text-green-400">
            {`export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Trong thực tế, xoá từ database
  return NextResponse.json(
    { message: \`Đã xoá todo \${id}\` }
  );
}`}
          </pre>
        </div>
      </section>

      {/* Xử lý Request */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          6. Xử lý Request & Response
        </h2>
        <p className="mb-4 text-slate-300">
          Bạn có thể đọc query params, headers, cookies từ request:
        </p>
        <div className="rounded-lg bg-zinc-900 p-4 text-sm">
          <pre className="text-green-400">
            {`import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Đọc query params
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  // Đọc headers
  const authHeader = request.headers.get("authorization");

  // Đọc cookies
  const token = request.cookies.get("token");

  // Trả về response với custom headers
  return NextResponse.json(
    { query, hasAuth: !!authHeader },
    {
      status: 200,
      headers: { "X-Custom-Header": "hello" },
    }
  );
}`}
          </pre>
        </div>
      </section>

      {/* Demo thực tế */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold text-white">
          7. Dùng thử API
        </h2>
        <p className="mb-4 text-slate-300">
          Dự án này đã có sẵn 2 route handlers demo. Bạn có thể truy cập trực
          tiếp trên trình duyệt hoặc dùng công cụ như Postman:
        </p>
        <ul className="list-inside list-disc space-y-2 text-slate-300">
          <li>
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              GET /api/todos
            </code>{' '}
            — Lấy danh sách todos
          </li>
          <li>
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              POST /api/todos
            </code>{' '}
            — Tạo todo mới
          </li>
          <li>
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              GET /api/todos/1
            </code>{' '}
            — Lấy todo theo id
          </li>
          <li>
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              PUT /api/todos/1
            </code>{' '}
            — Cập nhật todo
          </li>
          <li>
            <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-sky-300">
              DELETE /api/todos/1
            </code>{' '}
            — Xoá todo
          </li>
        </ul>
      </section>
    </div>
  );
}
