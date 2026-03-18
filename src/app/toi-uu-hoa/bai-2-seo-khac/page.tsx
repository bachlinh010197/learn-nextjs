import { CodeBlock } from '@/components/CodeBlock';

export default function Bai2SeoKhac() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1>Bài 2: Các yếu tố SEO khác</h1>

      <p>
        Ngoài metadata, Next.js hỗ trợ nhiều yếu tố SEO quan trọng khác như{' '}
        <strong>robots.txt</strong>, <strong>sitemap.xml</strong>,{' '}
        <strong>canonical URL</strong> và{' '}
        <strong>Structured Data (JSON-LD)</strong>.
      </p>

      {/* --- robots.txt --- */}
      <h2>1. robots.txt</h2>
      <p>
        File <code>robots.txt</code> hướng dẫn các công cụ tìm kiếm biết nên
        crawl những trang nào. Trong Next.js App Router, bạn tạo file{' '}
        <code>app/robots.ts</code>:
      </p>
      <CodeBlock>
        {`
          // app/robots.ts
          import type { MetadataRoute } from "next";

          export default function robots(): MetadataRoute.Robots {
            return {
              rules: [
                {
                  userAgent: "*",
                  allow: "/",
                  disallow: ["/admin/", "/api/", "/private/"],
                },
                {
                  userAgent: "Googlebot",
                  allow: "/",
                },
              ],
              sitemap: "https://example.com/sitemap.xml",
            };
          }

          // Kết quả tạo ra:
          // User-Agent: *
          // Allow: /
          // Disallow: /admin/
          // Disallow: /api/
          // Disallow: /private/
          //
          // User-Agent: Googlebot
          // Allow: /
          //
          // Sitemap: https://example.com/sitemap.xml
        `}
      </CodeBlock>

      {/* --- sitemap.xml --- */}
      <h2>2. sitemap.xml</h2>
      <p>
        Sitemap giúp Google biết tất cả các trang trên website của bạn. Tạo file{' '}
        <code>app/sitemap.ts</code>:
      </p>

      <h3>2.1 Sitemap tĩnh</h3>
      <CodeBlock>
        {`
          // app/sitemap.ts
          import type { MetadataRoute } from "next";

          export default function sitemap(): MetadataRoute.Sitemap {
            return [
              {
                url: "https://example.com",
                lastModified: new Date(),
                changeFrequency: "daily",
                priority: 1,
              },
              {
                url: "https://example.com/about",
                lastModified: new Date(),
                changeFrequency: "monthly",
                priority: 0.8,
              },
              {
                url: "https://example.com/blog",
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.9,
              },
            ];
          }
        `}
      </CodeBlock>

      <h3>2.2 Sitemap động (lấy từ API/Database)</h3>
      <CodeBlock>
        {`
          // app/sitemap.ts
          import type { MetadataRoute } from "next";

          async function getAllPosts() {
            const res = await fetch("https://api.example.com/posts");
            return res.json();
          }

          export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
            const posts = await getAllPosts();

            const postEntries: MetadataRoute.Sitemap = posts.map(
              (post: { slug: string; updatedAt: string }) => ({
                url: \`https://example.com/blog/\${post.slug}\`,
                lastModified: new Date(post.updatedAt),
                changeFrequency: "weekly" as const,
                priority: 0.7,
              })
            );

            return [
              {
                url: "https://example.com",
                lastModified: new Date(),
                changeFrequency: "daily",
                priority: 1,
              },
              ...postEntries,
            ];
          }
        `}
      </CodeBlock>

      {/* --- Canonical URL --- */}
      <h2>3. Canonical URL</h2>
      <p>
        Canonical URL cho Google biết đâu là URL chính thức của trang, tránh
        trùng lặp nội dung:
      </p>
      <CodeBlock>
        {`
          // app/blog/[slug]/page.tsx
          import type { Metadata } from "next";

          type Props = {
            params: Promise<{ slug: string }>;
          };

          export async function generateMetadata({ params }: Props): Promise<Metadata> {
            const { slug } = await params;

            return {
              alternates: {
                canonical: \`https://example.com/blog/\${slug}\`,
                languages: {
                  "vi-VN": \`https://example.com/vi/blog/\${slug}\`,
                  "en-US": \`https://example.com/en/blog/\${slug}\`,
                },
              },
            };
          }

          export default async function BlogPost({ params }: Props) {
            const { slug } = await params;
            return <h1>Bài viết: {slug}</h1>;
          }
        `}
      </CodeBlock>

      {/* --- Structured Data (JSON-LD) --- */}
      <h2>4. Structured Data (JSON-LD)</h2>
      <p>
        JSON-LD giúp Google hiểu nội dung trang (sản phẩm, bài viết, FAQ, v.v.)
        và hiển thị rich snippets trong kết quả tìm kiếm:
      </p>

      <h3>4.1 JSON-LD cho bài viết</h3>
      <CodeBlock>
        {`
          // app/blog/[slug]/page.tsx
          export default async function BlogPost({ params }: Props) {
            const { slug } = await params;
            const post = await getPost(slug);

            const jsonLd = {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              image: post.coverImage,
              datePublished: post.publishedAt,
              dateModified: post.updatedAt,
              author: {
                "@type": "Person",
                name: post.author.name,
              },
            };

            return (
              <>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <article>
                  <h1>{post.title}</h1>
                  <p>{post.content}</p>
                </article>
              </>
            );
          }
        `}
      </CodeBlock>

      <h3>4.2 JSON-LD cho sản phẩm</h3>
      <CodeBlock>
        {`
          // app/san-pham/[id]/page.tsx
          export default async function ProductPage({ params }: Props) {
            const { id } = await params;
            const product = await getProduct(id);

            const jsonLd = {
              "@context": "https://schema.org",
              "@type": "Product",
              name: product.name,
              description: product.description,
              image: product.image,
              offers: {
                "@type": "Offer",
                price: product.price,
                priceCurrency: "VND",
                availability: "https://schema.org/InStock",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.reviewCount,
              },
            };

            return (
              <>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <div>
                  <h1>{product.name}</h1>
                  <p>Giá: {product.price.toLocaleString("vi-VN")}đ</p>
                </div>
              </>
            );
          }
        `}
      </CodeBlock>

      <h3>4.3 JSON-LD cho FAQ</h3>
      <CodeBlock>
        {`
          // app/faq/page.tsx
          const faqs = [
            {
              question: "Next.js là gì?",
              answer: "Next.js là framework React cho production.",
            },
            {
              question: "Tại sao nên dùng Next.js?",
              answer: "Next.js hỗ trợ SSR, SSG, ISR giúp tối ưu SEO và hiệu suất.",
            },
          ];

          export default function FAQPage() {
            const jsonLd = {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            };

            return (
              <>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <div>
                  <h1>Câu hỏi thường gặp</h1>
                  {faqs.map((faq) => (
                    <div key={faq.question}>
                      <h3>{faq.question}</h3>
                      <p>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </>
            );
          }
        `}
      </CodeBlock>

      {/* --- Tổng kết --- */}
      <h2>Tổng kết</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Yếu tố</th>
            <th className="text-left">File</th>
            <th className="text-left">Mục đích</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>robots.txt</td>
            <td>
              <code>app/robots.ts</code>
            </td>
            <td>Hướng dẫn bot crawl trang</td>
          </tr>
          <tr>
            <td>sitemap.xml</td>
            <td>
              <code>app/sitemap.ts</code>
            </td>
            <td>Liệt kê tất cả URL cho Google</td>
          </tr>
          <tr>
            <td>Canonical URL</td>
            <td>
              <code>metadata.alternates</code>
            </td>
            <td>Xác định URL chính thức</td>
          </tr>
          <tr>
            <td>JSON-LD</td>
            <td>
              <code>&lt;script type=&quot;application/ld+json&quot;&gt;</code>
            </td>
            <td>Rich snippets trên Google</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
