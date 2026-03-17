# 📚 Next.js Từ Cơ Bản Đến Production

Dự án học Next.js theo lộ trình bài bản từ cơ bản đến production, dựa trên khóa học [MTik Code Pro](https://mtikcodepro.com/course/2-khoa-hoc-nextjs).

## 🚀 Công Nghệ Sử Dụng

- **Next.js 16** - React Framework
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS 4** - Utility-first CSS

## 📖 Nội Dung Khóa Học

### Chương 1: Routing Căn Bản (`/routing-co-ban`)
- Bài 1: Cơ chế vận hành của App Router
- Bài 2: Hệ thống Layout & Nested Layout
- Bài 3: Loading UI (loading.tsx)
- Bài 4: Xử lý lỗi với Error Boundary (error.tsx)
- Bài 5: Xử lý trang không tồn tại (not-found.tsx)
- Bài 6: Dynamic Routes & tham số động
- Bài 7: Route Groups & tổ chức cấu trúc

### Chương 2: Chiến Lược Rendering (`/rendering`)
- Bài 1: Giới hạn SEO của SPA
- Bài 2: Tổng quan các chiến lược Rendering
- Bài 3: Server Components, Client Components & Hydration
- Bài 4: Server–Client Boundary
- Bài 5: Client-Side Rendering (CSR)
- Bài 6: Static Rendering vs Dynamic Rendering
- Bài 7: SSR & Dynamic APIs
- Bài 8: Streaming & Hiển Thị Từng Phần
- Bài 9: ISR - Cập Nhật Nội Dung Tĩnh Theo Chu Kỳ
- Bài 10: SSG - Render Nội Dung Tĩnh Cho Route Động

### Chương 3: Data Fetching & Caching (`/data-fetching`)
- Bài 1: Các phương pháp truy xuất dữ liệu
- Bài 2: Tổng quan về Caching
- Bài 3: Request Memoization
- Bài 4: Data Cache
- Bài 5: Full Route Cache & connection()
- Bài 6: Router Cache
- Bài 7: cache Component

### Chương 4: Server Actions & Route Handlers (`/server-actions`)
- Bài 1: Route Handlers - RESTful API
- Bài 2: Server Actions - Mutation & Form Actions

### Chương 5: Routing Nâng Cao (`/routing-nang-cao`)
- Bài 1: Templates
- Bài 2: Parallel Routes
- Bài 3: Intercepting Routes
- Bài 4: After Function

### Chương 6: Tối Ưu Hóa & SEO (`/toi-uu-hoa`)
- Bài 1: Metadata & SEO
- Bài 2: Các yếu tố SEO khác
- Bài 3: Navigation & Link Prefetching
- Bài 4: Font Optimization
- Bài 5: Image Optimization
- Bài 6: Script Management
- Bài 7: Form Management
- Bài 8: Proxy & Rewrites

## 🛠️ Cài Đặt & Chạy Dự Án

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Chạy production server
npm start
```

Truy cập [http://localhost:3000](http://localhost:3000) để xem dự án.

## 📁 Cấu Trúc Thư Mục

```
src/app/
├── page.tsx                    # Trang chủ
├── layout.tsx                  # Root layout với sidebar
├── routing-co-ban/             # Chương 1: Routing Căn Bản
├── rendering/                  # Chương 2: Chiến Lược Rendering
├── data-fetching/              # Chương 3: Data Fetching & Caching
├── server-actions/             # Chương 4: Server Actions
├── routing-nang-cao/           # Chương 5: Routing Nâng Cao
├── toi-uu-hoa/                 # Chương 6: Tối Ưu Hóa & SEO
└── api/                        # API Route Handlers
    └── todos/                  # Demo REST API
```

## 📝 Tham Khảo

- [Next.js Documentation](https://nextjs.org/docs)
- [Khóa học MTik Code Pro](https://mtikcodepro.com/course/2-khoa-hoc-nextjs)
