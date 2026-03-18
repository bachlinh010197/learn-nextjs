import { CodeBlock } from '@/components/CodeBlock';

export default function Bai1MetadataSeo() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1>Bài 1: Metadata & SEO</h1>

      <p>
        Next.js cung cấp một hệ thống metadata mạnh mẽ giúp bạn định nghĩa các
        thẻ meta cho SEO. Có hai cách chính: <strong>Static Metadata</strong> và{' '}
        <strong>Dynamic Metadata</strong> (generateMetadata).
      </p>

      {/* --- Static Metadata --- */}
      <h2>1. Static Metadata</h2>
      <p>
        Cách đơn giản nhất là export một object <code>metadata</code> từ file{' '}
        <code>layout.tsx</code> hoặc <code>page.tsx</code>:
      </p>
      <CodeBlock>
        {`
          // app/about/page.tsx
          import type { Metadata } from "next";

          export const metadata: Metadata = {
            title: "Về chúng tôi | My App",
            description: "Trang giới thiệu về công ty chúng tôi",
            keywords: ["nextjs", "react", "seo"],
          };

          export default function AboutPage() {
            return <h1>Về chúng tôi</h1>;
          }
        `}
      </CodeBlock>
      <p>
        Next.js sẽ tự động tạo các thẻ <code>&lt;title&gt;</code> và{' '}
        <code>&lt;meta&gt;</code> tương ứng trong <code>&lt;head&gt;</code>.
      </p>

      {/* --- Template Title --- */}
      <h2>2. Title Template</h2>
      <p>
        Bạn có thể dùng <code>title.template</code> trong layout để tự động thêm
        hậu tố/tiền tố cho title của các trang con:
      </p>
      <CodeBlock>
        {`
          // app/layout.tsx
          export const metadata: Metadata = {
            title: {
              default: "My App",
              template: "%s | My App", // %s sẽ được thay bằng title của trang con
            },
            description: "Ứng dụng Next.js",
          };

          // app/blog/page.tsx
          export const metadata: Metadata = {
            title: "Blog", // Kết quả: "Blog | My App"
          };
        `}
      </CodeBlock>

      {/* --- generateMetadata --- */}
      <h2>3. Dynamic Metadata với generateMetadata</h2>
      <p>
        Khi metadata phụ thuộc vào dữ liệu động (ví dụ: bài viết từ API), bạn
        dùng hàm <code>generateMetadata</code>:
      </p>
      <CodeBlock>
        {`
          // app/blog/[slug]/page.tsx
          import type { Metadata } from "next";

          type Props = {
            params: Promise<{ slug: string }>;
          };

          async function getPost(slug: string) {
            const res = await fetch(\`https://api.example.com/posts/\${slug}\`);
            return res.json();
          }

          export async function generateMetadata({ params }: Props): Promise<Metadata> {
            const { slug } = await params;
            const post = await getPost(slug);

            return {
              title: post.title,
              description: post.excerpt,
              openGraph: {
                title: post.title,
                description: post.excerpt,
                images: [{ url: post.coverImage }],
              },
            };
          }

          export default async function BlogPost({ params }: Props) {
            const { slug } = await params;
            const post = await getPost(slug);

            return (
              <article>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
              </article>
            );
          }
        `}
      </CodeBlock>

      {/* --- Open Graph --- */}
      <h2>4. Open Graph</h2>
      <p>
        Open Graph giúp bài viết hiển thị đẹp khi chia sẻ trên Facebook,
        LinkedIn, Zalo, v.v.:
      </p>
      <CodeBlock>
        {`
          export const metadata: Metadata = {
            openGraph: {
              title: "Tiêu đề bài viết",
              description: "Mô tả ngắn về bài viết",
              url: "https://example.com/blog/bai-viet",
              siteName: "My App",
              images: [
                {
                  url: "https://example.com/og-image.jpg",
                  width: 1200,
                  height: 630,
                  alt: "Ảnh minh họa",
                },
              ],
              locale: "vi_VN",
              type: "article",
            },
          };
        `}
      </CodeBlock>

      {/* --- Twitter Cards --- */}
      <h2>5. Twitter Cards</h2>
      <p>Tương tự Open Graph nhưng dành cho Twitter (X):</p>
      <CodeBlock>
        {`
          export const metadata: Metadata = {
            twitter: {
              card: "summary_large_image",
              title: "Tiêu đề bài viết",
              description: "Mô tả ngắn",
              images: ["https://example.com/twitter-image.jpg"],
              creator: "@taikhoan",
            },
          };
        `}
      </CodeBlock>

      {/* --- Kết hợp --- */}
      <h2>6. Ví dụ kết hợp đầy đủ</h2>
      <CodeBlock>
        {`
          // app/san-pham/[id]/page.tsx
          import type { Metadata } from "next";

          type Props = {
            params: Promise<{ id: string }>;
          };

          async function getProduct(id: string) {
            const res = await fetch(\`https://api.example.com/products/\${id}\`);
            return res.json();
          }

          export async function generateMetadata({ params }: Props): Promise<Metadata> {
            const { id } = await params;
            const product = await getProduct(id);

            return {
              title: product.name,
              description: product.description,
              openGraph: {
                title: product.name,
                description: product.description,
                images: [{ url: product.image, width: 800, height: 600 }],
                type: "website",
              },
              twitter: {
                card: "summary_large_image",
                title: product.name,
                description: product.description,
                images: [product.image],
              },
            };
          }

          export default async function ProductPage({ params }: Props) {
            const { id } = await params;
            const product = await getProduct(id);

            return (
              <div>
                <h1>{product.name}</h1>
                <p>Giá: {product.price.toLocaleString("vi-VN")}đ</p>
              </div>
            );
          }
        `}
      </CodeBlock>

      {/* --- Tổng kết --- */}
      <h2>Tổng kết</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Tính năng</th>
            <th className="text-left">Khi nào dùng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>export const metadata</code>
            </td>
            <td>Metadata tĩnh, không phụ thuộc dữ liệu</td>
          </tr>
          <tr>
            <td>
              <code>generateMetadata()</code>
            </td>
            <td>Metadata động, phụ thuộc params hoặc API</td>
          </tr>
          <tr>
            <td>
              <code>title.template</code>
            </td>
            <td>Tự động thêm suffix/prefix cho title</td>
          </tr>
          <tr>
            <td>Open Graph</td>
            <td>Hiển thị đẹp khi chia sẻ trên mạng xã hội</td>
          </tr>
          <tr>
            <td>Twitter Cards</td>
            <td>Hiển thị đẹp khi chia sẻ trên Twitter/X</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
