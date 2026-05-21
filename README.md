# Backoffice Capstone

Projek dashboard backoffice yang dibangun menggunakan Vite, React, dan pnpm. Projek ini merupakan bagian dari kurikulum transisi Backend ke Fullstack.

## Progres Harian

### 15 Mei, Jumat: Kickoff, Mental Model, dan Project Setup

Hari pertama melakukan init projek dengan Vite dan menerapkan struktur project sesuai dengan guideline.

**Aktivitas:**

- **Scaffold Project**: Inisialisasi projek menggunakan Vite dengan template React + TypeScript.
- **Package Management**: Menggunakan `pnpm` untuk manajemen package.
- **Cleanup**: Menghapus template bawaan Vite untuk memulai projek dari 0.
- **Project Structure**: Menerapkan struktur folder berbasis *colocation* dan *low coupling*:
  - `src/app`: Modul per halaman (fitur).
  - `src/api`: Fungsi integrasi API.
  - `src/common`: Komponen yang dapat digunakan kembali.
  - `src/libs`: Konfigurasi library pihak ketiga.
  - `src/types` & `src/utils`: Tipe data global dan fungsi pembantu.
- **Initial Domain Model**: Mendefinisikan tipe data `UserListQuery` dan konstanta default untuk fitur User Management.
- **Static UI**: Implementasi halaman awal `UsersPage` menggunakan Semantic HTML (table, header, main) untuk render awal di `App.tsx`.

### 18 Mei, Senin: Web Fundamentals, React Components, dan TypeScript

Hari kedua mempelajari konsep dasar React, bagaimana browser merender elemen, implementasi struktur layout menggunakan vanilla CSS, dan pembuatan komponen yang dapat digunakan kembali (*reusable*) dengan menggunakan tipe data TypeScript yang ketat.

**Aktivitas:**

- **Web Layouting & App Shell**: Membangun struktur layout Dashboard/Backoffice utama (`App.tsx`) menggunakan vanilla CSS (`src/index.css`) berbasis **Flexbox** (`flex-direction: row` dan `column`) serta memahami konsep **CSS Box Model**.
- **Domain Modeling**: Mendefinisikan kontrak data atau tipe data global untuk entitas utama aplikasi (`User`, `Request`, `AuditLog`) di dalam file `src/types/domain.ts`.
- **Inline Styling Concept**: Mempelajari teknik penulisan *inline style* pada JSX menggunakan *double brackets* (`{{ }}`) untuk melemparkan object JavaScript, serta konversi sintaks CSS ke format *camelCase*.
- **Local State Filtering**: Menggunakan React `useState` untuk filter user berdasarkan pencarian, role, dan status, serta menerapkan model data `UserListQuery` yang sudah didefinisikan sebelumnya.
- **Data Isolation**: Memisahkan mock data statis (`MOCK_USERS`) dan opsi menu ke dalam folder khusus `src/app/users/_mocks/` guna menjaga kerapian berkas halaman utama.
- **Component Extraction**:
  - Mengekstrak search input menjadi komponen `<SearchInput>`
  - Mengekstrak dropdown input menjadi komponen generik `<DropdownInput />`
  - Mengekstrak tabel User menjadi komponen privat `<UserTable />` khusus untuk modul `users`.
- **Performance Optimization**:
  - Menggunakan `useMemo` untuk melakukan *caching* pada hasil `.filter()` data user.
  - Menggunakan `useCallback` untuk *caching* memori dari fungsi *handler* perubahan filter di parent component.
  - Menerapkan `React.memo` pada komponen `<StatusBadge />`, `<SearchInput />`, `<DropdownInput />`, dan `<UserTable />` untuk mencegah render ulang yang tidak diperlukan jika tidak terdapat perubahan *props*.

### 19 Mei, Selasa: Tailwind, shadcn/ui, Routing, dan App Shell

Hari ketiga melakukan migrasi layout dari vanilla CSS ke Tailwind utility classes, integrasi shadcn/ui sebagai sumber komponen yang bisa diedit, dan implementasi client-side routing menggunakan React Router untuk memisahkan tiap halaman dalam SPA.

**Aktivitas:**

- **Tailwind CSS Integration**: Install dan konfigurasi Tailwind CSS v4 melalui `@tailwindcss/vite` plugin. Menggunakan utility classes untuk layout (`flex`, `grid`), spacing (`p-*`, `m-*`, `gap-*`), color (`bg-slate-*`, `text-slate-*`, `border-slate-*`), dan responsive utilities. Menghapus vanilla CSS manual sebelumnya dan menggantinya dengan konfigurasi tematik di `src/index.css`.

- **shadcn/ui Setup**: Inisialisasi shadcn/ui melalui `components.json` dengan style `radix-nova`. Menambahkan primitives UI yang bisa diedit langsung ke codebase:
  - `<Button>` — dengan variants default, outline, secondary, ghost, destructive, link
  - `<Input>` — form input dengan styling konsisten
  - `<Select>` — dropdown selection
  - `<Badge>` — status indicator
  - `<Table>`, `<TableHeader>`, `<TableBody>`, `<TableRow>`, `<TableCell>` — semantic table primitives
  - `<Spinner>` — loading indicator
  - `<Label>` — form label dengan accessibility
  - Primitives ditempatkan di `src/app/_components/ui/` dengan `@/` alias.

- **Rebuild App Shell**: Migrasi layout aplikasi dari vanilla CSS Flexbox ke Tailwind utility classes. Layout split (`flex h-screen w-screen`), sidebar fixed width (`w-64 bg-slate-900`), topbar (`h-16 bg-white border-b shadow-sm`), dan main content area (`flex-1 p-6 overflow-y-auto`).

- **React Router Setup**: Install `react-router-dom` v7. Menggunakan `createBrowserRouter` + `RouterProvider` (API modern v6.4+) di `src/main.tsx`. Router didefinisikan sebagai route objects array, bukan JSX-based `<BrowserRouter>`.

- **Route Pages**: Membuat 7 page placeholder sesuai routes wajib:
  - `/login` → `src/app/login/page.tsx`
  - `/dashboard` → `src/app/dashboard/page.tsx`
  - `/users` → `src/app/users/page.tsx` (sudah ada, di-integrasikan ke router)
  - `/users/:id` → `src/app/users/[id]/page.tsx` (menggunakan `useParams`)
  - `/requests` → `src/app/requests/page.tsx`
  - `/requests/:id` → `src/app/requests/[id]/page.tsx`
  - `/audit-logs` → `src/app/audit-logs/page.tsx`

- **Layout Extraction**: Memisahkan app shell dari `App.tsx` menjadi dua layout component:
  - `AppLayout` (`src/app/_components/AppLayout.tsx`) — sidebar, topbar, dan `<Outlet />` untuk konten halaman authenticated.
  - `AuthLayout` (`src/app/_components/AuthLayout.tsx`) — layout minimal tanpa sidebar untuk halaman login.

- **Nested Routes**: Menggunakan parent-child routing. Parent route `'/'` me-render `AppLayout`, child routes (dashboard, users, dll) di-render di dalam `<Outlet />`. Ini menggantikan pattern manual sebelumnya di mana semua konten di-render langsung di `App.tsx`.

- **Active Navigation**: Mengganti `<a href>` dengan `<NavLink>` dari React Router. Menggunakan render props `isActive` untuk memberikan active styling (`bg-slate-700 text-white font-bold`) pada link sidebar yang sedang aktif.

- **Navigation Data**: Mengekstrak data navigasi dari `MOCK_MENUS` (private ke module users) ke `src/common/consts/navigation.ts`. URL navigasi diubah dari hash anchor (`#users`) ke absolute path (`/users`) yang kompatibel dengan React Router.

- **Error Pages**: Membuat halaman untuk error states:
  - `NotFoundPage` (`src/app/not-found.tsx`) — halaman 404 untuk URL yang tidak dikenal, ditangani oleh wildcard route `path: '*'`.
  - `ForbiddenPage` (`src/app/forbidden.tsx`) — halaman 403 untuk akses tanpa izin, sebagai persiapan auth flow.

- **Root Redirect**: Route `/` (index) langsung redirect ke `/dashboard` menggunakan `<Navigate to="/dashboard" replace />`. `replace` memastikan tombol back tidak kembali ke root.

- **App.tsx Cleanup**: `App.tsx` dikosongkan karena routing dan layout sudah dikelola oleh `main.tsx` + `AppLayout`/`AuthLayout`. Entry point aplikasi sekarang adalah `RouterProvider` di `main.tsx`.

### 20 Mei, Rabu: Forms, Validation, dan Auth Flow

Hari keempat implementasi form controlled dengan React Hook Form, validasi menggunakan Zod schema, dan auth flow lengkap (login, logout, route guard).

**Aktivitas:**

- **Install Dependensi Form & Validasi**: Menambahkan `react-hook-form`, `@hookform/resolvers`, dan `zod` ke package.json. React Hook Form untuk manajemen form tanpa re-render manual per field, `@hookform/resolvers` sebagai jembatan integrasi RHF-Zod, dan Zod sebagai schema validation + TypeScript type generator.

- **Domain Types untuk Auth**: Menambahkan type `AuthRequest` (email + password) dan `AuthResponse` (id, name, email, role, status) di `src/types/domain.ts`. Menambahkan field `password` ke interface `User` untuk keperluan mock login.

- **AuthContext + AuthProvider** (`src/app/login/_hooks/use-auth.tsx`): Membuat context untuk auth state global menggunakan `createContext`. Provider menyimpan `AuthResponse | null` sebagai state user (`null` = belum login). `login()` melakukan lookup ke `MOCK_USERS` dengan delay 800ms simulasi network. `logout()` mereset state ke `null`. Error throw jika `useAuth()` dipanggil di luar `AuthProvider`.

- **Route Guard — AuthGuard** (`src/app/_components/AuthGuard.tsx`): Layout route component yang mengecek `isAuthenticated` dari `useAuth()`. Jika user belum login, redirect ke `/login` menggunakan `<Navigate to="/login" replace />`. Jika sudah login, render `<Outlet />` untuk melanjutkan ke halaman tujuan.

- **Restruktur Route di main.tsx**: Membungkus semua route yang membutuhkan autentikasi (dashboard, users, requests, audit-logs) dalam parent route dengan `element: <AuthGuard />`. Route `/login` tetap di luar guard agar bisa diakses tanpa login. `AuthProvider` membungkus `RouterProvider` agar context tersedia di seluruh aplikasi.

- **LoginForm** (`src/app/_components/LoginForm.tsx`): Form login menggunakan React Hook Form + Zod:
  - Schema: `email` (z.string().email()), `password` (z.string().min(8))
  - Type otomatis dari schema via `z.infer`
  - `zodResolver` untuk integrasi RHF-Zod
  - Field errors (email format, password length) muncul di bawah masing-masing input
  - Submit error (kredensial salah) ditampilkan sebagai `root` error di atas form via `setError('root', ...)`
  - Tombol submit disabled + spinner saat `isSubmitting`
  - Sukses login → `navigate('/dashboard', { replace: true })`

- **AppLayout — Integrasi useAuth**: Mengganti hardcoded `MOCK_USERS[0]` dengan `const { user, logout } = useAuth()`. Topbar menampilkan `user?.name` dan `user?.role?.toUpperCase()` dari context. Menambahkan tombol **Logout** yang memanggil `logout()` + `navigate('/login')`.

- **UserForm** (`src/app/users/_components/UserForm.tsx`): Form reusable untuk create/edit user:
  - Schema: `name` (min 1), `email` (valid format), `role` (enum admin/manager/operator), `status` (enum active/inactive)
  - Mendukung mode `'create'` dan `'edit'` dengan `defaultValues` berbeda
  - Field Select menggunakan pattern `setValue` + `shouldValidate: true` (karena shadcn Select tidak kompatibel dengan `register()`)
  - Props interface: `mode`, `defaultValues?`, `onSubmit` (async return `{ success, error? }`), `onSuccess` (callback)
  - Submit error handling via `setError('root', ...)` sama seperti LoginForm

- **Dialog Create User di UsersPage**: Menambahkan state `isCreateOpen` + tombol "+ Add User" + Dialog dari shadcn/ui. UserForm di-render di dalam DialogContent. Submit sukses → dialog tertutup via `onSuccess={() => setIsCreateOpen(false)}`.
