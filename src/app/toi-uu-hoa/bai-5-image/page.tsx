import { CodeBlock } from '@/components/CodeBlock';

export default function Bai5Image() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1>Bài 5: Tối ưu Image</h1>

      <p>
        Component <code>next/image</code> mở rộng thẻ <code>&lt;img&gt;</code>{' '}
        HTML với các tính năng tối ưu tự động: chuyển đổi format (WebP/AVIF),
        resize theo thiết bị, lazy loading, và tránh layout shift.
      </p>

      {/* --- Cơ bản --- */}
      <h2>1. Sử dụng cơ bản</h2>
      <CodeBlock>
        {`
          import Image from "next/image";

          export default function BasicImage() {
            return (
              <div>
                {/* Ảnh local (trong thư mục public/) */}
                <Image
                  src="/hero-banner.jpg"
                  alt="Banner trang chủ"
                  width={1200}
                  height={630}
                />

                {/* Ảnh remote */}
                <Image
                  src="https://example.com/photo.jpg"
                  alt="Ảnh minh họa"
                  width={800}
                  height={600}
                />
              </div>
            );
          }
        `}
      </CodeBlock>

      {/* --- Import ảnh --- */}
      <h2>2. Import ảnh tĩnh</h2>
      <p>Import trực tiếp file ảnh để Next.js tự động xác định kích thước:</p>
      <CodeBlock>
        {`
          import Image from "next/image";
          import heroImage from "@/public/images/hero.jpg";

          export default function HeroSection() {
            return (
              <Image
                src={heroImage}
                alt="Hero banner"
                // width và height tự động từ file ảnh
                placeholder="blur" // Hiệu ứng blur khi đang tải
              />
            );
          }
        `}
      </CodeBlock>

      {/* --- fill --- */}
      <h2>3. Fill Mode (lấp đầy container)</h2>
      <p>
        Khi không biết trước kích thước ảnh, dùng <code>fill</code> để ảnh lấp
        đầy container cha:
      </p>
      <CodeBlock>
        {`
          import Image from "next/image";

          export default function CardImage() {
            return (
              <div className="relative h-64 w-full">
                {/* Container cha phải có position: relative */}
                <Image
                  src="/card-image.jpg"
                  alt="Card thumbnail"
                  fill
                  className="rounded-lg object-cover"
                  // object-cover: crop ảnh để lấp đầy
                  // object-contain: giữ nguyên tỷ lệ
                />
              </div>
            );
          }

          // Ví dụ: Grid ảnh sản phẩm
          export function ProductGrid() {
            const products = [
              { id: 1, name: "Sản phẩm A", image: "/products/a.jpg" },
              { id: 2, name: "Sản phẩm B", image: "/products/b.jpg" },
              { id: 3, name: "Sản phẩm C", image: "/products/c.jpg" },
            ];

            return (
              <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="rounded-lg object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            );
          }
        `}
      </CodeBlock>

      {/* --- Responsive --- */}
      <h2>4. Responsive Images với sizes</h2>
      <p>
        Thuộc tính <code>sizes</code> giúp trình duyệt chọn kích thước ảnh phù
        hợp:
      </p>
      <CodeBlock>
        {`
          import Image from "next/image";

          export default function ResponsiveImage() {
            return (
              <Image
                src="/blog-cover.jpg"
                alt="Blog cover"
                width={1200}
                height={630}
                sizes="(max-width: 640px) 100vw,
                       (max-width: 1024px) 75vw,
                       50vw"
                // Trên mobile (<640px): ảnh chiếm 100% viewport width
                // Trên tablet (<1024px): ảnh chiếm 75% viewport width
                // Trên desktop: ảnh chiếm 50% viewport width
              />
            );
          }
        `}
      </CodeBlock>

      {/* --- Priority --- */}
      <h2>5. Priority (ảnh quan trọng)</h2>
      <p>
        Dùng <code>priority</code> cho ảnh LCP (Largest Contentful Paint) -
        thường là ảnh hero/banner đầu trang:
      </p>
      <CodeBlock>
        {`
          import Image from "next/image";

          export default function HeroBanner() {
            return (
              <Image
                src="/hero.jpg"
                alt="Hero banner"
                width={1920}
                height={1080}
                priority // ← Tải ngay, không lazy load
                sizes="100vw"
              />
            );
          }

          // ⚠️ Chỉ dùng priority cho 1-2 ảnh đầu trang (above the fold)
          // Các ảnh khác sẽ được lazy load tự động
        `}
      </CodeBlock>

      {/* --- Placeholder --- */}
      <h2>6. Placeholder Blur</h2>
      <p>Hiệu ứng blur trong khi ảnh đang tải:</p>
      <CodeBlock>
        {`
          import Image from "next/image";
          import heroImage from "@/public/hero.jpg";

          // Cách 1: Ảnh import tĩnh (tự động tạo blurDataURL)
          export function StaticBlur() {
            return (
              <Image
                src={heroImage}
                alt="Hero"
                placeholder="blur" // ← Tự động tạo blur
              />
            );
          }

          // Cách 2: Ảnh remote (cần cung cấp blurDataURL)
          export function RemoteBlur() {
            return (
              <Image
                src="https://example.com/photo.jpg"
                alt="Photo"
                width={800}
                height={600}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZ..." // base64 ảnh nhỏ
              />
            );
          }

          // Cách 3: Placeholder màu
          export function ColorPlaceholder() {
            return (
              <Image
                src="https://example.com/photo.jpg"
                alt="Photo"
                width={800}
                height={600}
                placeholder="empty" // Mặc định: không placeholder
              />
            );
          }
        `}
      </CodeBlock>

      {/* --- Remote Images --- */}
      <h2>7. Cấu hình Remote Images</h2>
      <p>
        Để sử dụng ảnh từ domain bên ngoài, cần cấu hình trong{' '}
        <code>next.config.ts</code>:
      </p>
      <CodeBlock>
        {`
          // next.config.ts
          import type { NextConfig } from "next";

          const nextConfig: NextConfig = {
            images: {
              remotePatterns: [
                {
                  protocol: "https",
                  hostname: "example.com",
                  pathname: "/images/**",
                },
                {
                  protocol: "https",
                  hostname: "cdn.mysite.com",
                },
                {
                  // Cho phép tất cả subdomain
                  protocol: "https",
                  hostname: "**.amazonaws.com",
                },
              ],
            },
          };

          export default nextConfig;
        `}
      </CodeBlock>

      {/* --- Ví dụ thực tế --- */}
      <h2>8. Ví dụ thực tế: Card sản phẩm</h2>
      <CodeBlock>
        {`
          import Image from "next/image";

          interface Product {
            id: number;
            name: string;
            price: number;
            image: string;
          }

          export default function ProductCard({ product }: { product: Product }) {
            return (
              <div className="group overflow-hidden rounded-xl border border-slate-700 bg-slate-800 transition-shadow hover:shadow-lg">
                {/* Ảnh sản phẩm */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>

                {/* Thông tin */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-red-500 font-bold">
                    {product.price.toLocaleString("vi-VN")}đ
                  </p>
                </div>
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
            <th className="text-left">Thuộc tính</th>
            <th className="text-left">Mô tả</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>width/height</code>
            </td>
            <td>Kích thước ảnh (bắt buộc nếu không dùng fill)</td>
          </tr>
          <tr>
            <td>
              <code>fill</code>
            </td>
            <td>Ảnh lấp đầy container cha</td>
          </tr>
          <tr>
            <td>
              <code>sizes</code>
            </td>
            <td>Giúp trình duyệt chọn kích thước phù hợp</td>
          </tr>
          <tr>
            <td>
              <code>priority</code>
            </td>
            <td>Tải ngay cho ảnh above-the-fold</td>
          </tr>
          <tr>
            <td>
              <code>placeholder=&quot;blur&quot;</code>
            </td>
            <td>Hiệu ứng blur khi đang tải</td>
          </tr>
          <tr>
            <td>
              <code>quality</code>
            </td>
            <td>Chất lượng ảnh (1-100, mặc định 75)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
