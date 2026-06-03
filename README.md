# Backoffice Capstone

Projek dashboard backoffice yang dibangun menggunakan Vite, React, dan pnpm. Projek ini merupakan bagian dari kurikulum transisi Backend ke Fullstack.

## Example Login Account

- Username: `admin@example.com`
- Password: `password123`

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
  - Mengekstrak search input menjadi komponen `<SearchInput>` (`src/app/_components/search-input.tsx`)
  - Mengekstrak dropdown input menjadi komponen generik `<DropdownInput />` (`src/app/_components/dropdown-input.tsx`)
  - Mengekstrak tabel User menjadi komponen privat `<UserTable />` khusus untuk modul `users` (`src/app/users/_components/user-table.tsx`).
- **Performance Optimization**:
  - Menggunakan `useMemo` untuk melakukan *caching* pada hasil `.filter()` data user.
  - Menggunakan `useCallback` untuk *caching* memori dari fungsi *handler* perubahan filter di parent component.
  - Menerapkan `React.memo` pada komponen `<StatusBadge />` (`src/app/_components/status-badge.tsx`), `<SearchInput />`, `<DropdownInput />`, dan `<UserTable />` untuk mencegah render ulang yang tidak diperlukan jika tidak terdapat perubahan *props*.

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
  - `<Skeleton>` — placeholder loading untuk konten
  - `<Dialog>`, `<DialogContent>`, `<DialogHeader>`, `<DialogTitle>`, `<DialogDescription>` — modal dialog
  - Primitives ditempatkan di `src/app/_components/ui/` dengan `@/` alias.
  - `src/app/_components/ui/input.tsx` tetap sebagai primitive murni (styling saja). Logika form (label, error, forwardRef) dipisah ke `form-input.tsx`.

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
  - `AppLayout` (`src/app/_components/app-layout.tsx`) — sidebar, topbar, dan `<Outlet />` untuk konten halaman authenticated.
  - `AuthLayout` (`src/app/_components/auth-layout.tsx`) — layout minimal tanpa sidebar untuk halaman login.

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

- **AuthContext + AuthProvider** (`src/app/auth/_hooks/use-auth.tsx`): Membuat context untuk auth state global menggunakan `createContext`. Provider menyimpan `AuthResponse | null` sebagai state user (`null` = belum login). `login()` melakukan lookup ke `MOCK_USERS` dengan delay 800ms simulasi network. `logout()` mereset state ke `null`. Error throw jika `useAuth()` dipanggil di luar `AuthProvider`.

- **Route Guard — AuthGuard** (`src/app/_components/auth-guard.tsx`): Layout route component yang mengecek `isAuthenticated` dari `useAuth()`. Jika user belum login, redirect ke `/login` menggunakan `<Navigate to="/login" replace />`. Jika sudah login, render `<Outlet />` untuk melanjutkan ke halaman tujuan.

- **Restruktur Route di main.tsx**: Membungkus semua route yang membutuhkan autentikasi (dashboard, users, requests, audit-logs) dalam parent route dengan `element: <AuthGuard />`. Route `/login` tetap di luar guard agar bisa diakses tanpa login. `AuthProvider` membungkus `RouterProvider` agar context tersedia di seluruh aplikasi.

- **LoginForm** (`src/app/auth/_components/login-form.tsx`): Form login menggunakan React Hook Form + Zod:
  - Schema: `email` (z.string().email()), `password` (z.string().min(8))
  - Type otomatis dari schema via `z.infer`
  - `zodResolver` untuk integrasi RHF-Zod
  - Field errors (email format, password length) muncul di bawah masing-masing input
  - Submit error (kredensial salah) ditampilkan sebagai `root` error di atas form via `setError('root', ...)`
  - Tombol submit disabled + spinner saat `isSubmitting`
  - Sukses login → `navigate('/dashboard', { replace: true })`

- **AppLayout — Integrasi useAuth**: Mengganti hardcoded `MOCK_USERS[0]` dengan `const { user, logout } = useAuth()`. Topbar menampilkan `user?.name` dan `user?.role?.toUpperCase()` dari context. Menambahkan tombol **Logout** yang memanggil `logout()` + `navigate('/login')`.

- **UserForm** (`src/app/users/_components/user-form.tsx`): Form reusable untuk create/edit user:
  - Schema: `name` (min 1), `email` (valid format), `role` (enum admin/manager/operator), `status` (enum active/inactive)
  - Mendukung mode `'create'` dan `'edit'` dengan `defaultValues` berbeda
  - Field Select (Role, Status) menggunakan `<Controller />` dari react-hook-form karena shadcn Select tidak kompatibel dengan `register()`. Wrapping dengan Controller memastikan validasi ter-trigger, default value terisi, dan ref terhubung dengan benar.
  - Props interface: `mode`, `defaultValues?`, `onSubmit` (async return `{ success, error? }`), `onSuccess` (callback)
  - Submit error handling via `setError('root', ...)` sama seperti LoginForm

- **FormInput** (`src/app/_components/ui/form-input.tsx`): Wrapper reusable untuk field input form. Menggunakan `React.forwardRef` agar kompatibel dengan `register()` dari react-hook-form. Props `label` untuk render label otomatis, `error` untuk pesan validasi + `aria-invalid`. Membungkus `Input` dari `ui/input.tsx` — sehingga logika form (label, error) terpisah dari styling primitive.

- **Dialog Create User di UsersPage**: Menambahkan state `isCreateOpen` + tombol "+ Add User" + Dialog dari shadcn/ui. UserForm di-render di dalam DialogContent. Submit sukses → dialog tertutup via `onSuccess={() => setIsCreateOpen(false)}`.

- **State Persistence via LocalStorage**: AuthProvider menyimpan data user ke `localStorage` dengan key `auth_user`. Inisialisasi menggunakan lazy initializer `useState(() => localStorage.getItem(...))`. Login → simpan, logout → hapus. Refresh browser tidak lagi redirect ke `/login`. Data password tidak ikut tersimpan (hanya AuthResponse tanpa field password).

### 21 Mei, Kamis: Mock API, API Client, dan Error States

Hari kelima implementasi MSW (Mock Service Worker) sebagai lapisan API mock, API client wrapper, dan seeded data.

**Aktivitas:**

- **MSW Setup**: Install `msw` v2, generate service worker dengan `npx msw init public/ --save`. Worker di-start secara dinamis di `src/main.tsx` via dynamic import hanya saat `import.meta.env.DEV`. Handler ditempatkan di `src/api/mocks/handlers/{domain}.ts` — path MSW handler harus sama persis dengan endpoint API (`/api/...`).

- **Seeded Data** (`src/api/mocks/data/`): Membuat data awal untuk tiap domain — 6 users (admin, manager, operator, plus beberapa dummy), 5 requests dengan variasi status (pending, approved, rejected) dan priority (low, medium, high), serta 10 audit logs mencakup berbagai event login, create user, update request, dan delete user.

- **API Client** (`src/api/client.ts`): Fetch wrapper dengan base URL dari env `VITE_API_BASE_URL`, error handling via `ApiClientError` class (status code, message, optional code), parsing response JSON otomatis, header `Content-Type: application/json`. Base URL fallback ke string kosong (`''`) untuk development — MSW hanya intercept path absolut (`/api/users`), bukan URL penuh.

- **API Endpoint Functions** (`src/api/{domain}/{domain}.ts`): Fungsi API dipisahkan dari UI modules. Untuk setiap domain dibuat fungsi `list(params?)` dan `getById(id)`, ditambah `create()`, `update()`, `patch()`, `delete()` untuk yang membutuhkan mutation. Semua fungsi mengembalikan `Promise` response.

- **MSW Handlers**: Handler untuk 4 domain ditulis dengan MSW v2 syntax (`http.get`, `http.post`, dll):
  - `auth.ts` — login (cocokkan email + password dari seeded data, return token + user), me (return current user dari header Authorization), logout.
  - `users.ts` — list (filter by search, role, status, pagination), get by id, create, update (PUT), delete. Awalnya handler DELETE belum ada (menyebabkan 404 saat delete user) — ditambahkan kemudian.
  - `requests.ts` — list (filter by search, status, priority), get by id, create, update, delete, update status.
  - `audit-logs.ts` — list (filter by search actor/action), get by id. Bersifat read-only.
  - Semua handler menyertakan `await delay(400)` untuk realistic network latency.
  - Error scenarios di-trigger via query param `?__error=401|403|500|empty`.

- **Response Format Untuk Mock API** (`src/api/mocks/response.ts` + `src/api/types.ts`):
  - Response pagination: `{ status_code, message, items[], meta: { total_page, total, page, per_size }, success, version }`
  - Response single: `{ status_code, message, data, success, version }`
  - Helper functions: `paginated()`, `single()`, `created()`, `updated()`, `deleted()`, `errorResponse()`.
  - Frontend disesuaikan: list endpoints baca `response.items`, single endpoints baca `response.data`.

- **Login via Mock API**: `use-auth.tsx` diubah dari `MOCK_USERS.find()` langsung menjadi `authApi.login()`. Response dibaca dari `response.data`. Validasi kredensial sekarang dilakukan di MSW handler, bukan di UI code.

- **CRUD**:
  - **Users**: List dengan search/role/status filter, detail page (`/users/:id`) dengan edit dialog dan delete button, create user via dialog, action column di tabel dengan confirm delete dialog.
  - **Requests**: List dengan single search (title/requester/assignee) + status/priority dropdown, detail page (`/requests/:id`) dengan edit dialog (title, priority, requestedBy, assignee), status update, delete. Create request via dialog.
  - **Audit Logs**: List dengan single search (actor/action), detail page (`/audit-logs/:id`). Read-only — create functionality dihapus karena log bersifat immutable.

### 22 Mei, Jumat: TanStack Query Integration

Hari keenam integrasi TanStack Query untuk manajemen server state, menggantikan pola `useState` + `useEffect` + fetch manual pada modul Users dan Requests.

**Aktivitas:**

- **Install Dependensi**: Menambahkan `@tanstack/react-query` ke package.json.
- **QueryClient Setup** (`src/main.tsx`): Membuat `QueryClient` dengan konfigurasi:
  - `staleTime: 30_000` — data dianggap fresh selama 30 detik
  - `retry: 1` — satu kali retry otomatis jika query gagal
  - `refetchOnWindowFocus: false` — tidak refetch saat tab kembali aktif
  - Client dibungkus dalam `<QueryClientProvider>` di root render tree
- **Query Key Factory** (`src/api/query-keys.ts`): Membuat factory functions untuk query keys terstruktur per domain (`users`, `requests`, `auditLogs`) dengan hierarki `all`, `lists()`, `list(filters)`, `details()`, `detail(id)`. Key `auditLogs` telah digunakan oleh hooks di modul Audit Logs.
- **Query & Mutation Hooks Users** (`src/app/users/_hooks/`): Membuat 5 hooks untuk modul Users:
  - `useUserList(filters)` — query list dengan filter
  - `useUser(id)` — query single user by id
  - `useCreateUser()` — mutation, invalidate `queryKeys.users.all`
  - `useUpdateUser()` — mutation dengan parameter `{ id, data }`, invalidate `queryKeys.users.all`
  - `useDeleteUser()` — mutation, invalidate `queryKeys.users.all`
- **Query & Mutation Hooks Requests** (`src/app/requests/_hooks/`): Membuat 6 hooks untuk modul Requests:
  - `useRequestList(filters)` — query list dengan filter
  - `useRequest(id)` — query single request by id
  - `useCreateRequest()` — mutation, invalidate `queryKeys.requests.all`
  - `useUpdateRequest()` — mutation dengan parameter `{ id, data }`, invalidate `queryKeys.requests.all`
  - `useDeleteRequest()` — mutation, invalidate `queryKeys.requests.all`
  - `useUpdateRequestStatus()` — mutation dengan parameter `{ id, status }`, invalidate `queryKeys.requests.all`
- **UsersPage Refactor** (`src/app/users/page.tsx`):
  - Replace `useState` + `useEffect` + `usersApi.list()` → `useUserList(filters)`
  - Replace create state manual → `useCreateUser().mutateAsync()` + `UserForm`
  - Replace delete state manual → `useDeleteUser().mutateAsync()`
  - `refetch()` untuk tombol Retry pada error state
  - Render `error?.message` untuk pesan error
- **UserDetailPage Refactor** (`src/app/users/[id]/page.tsx`):
  - Replace `useState` + `useEffect` + `usersApi.getById()` → `useUser(id)`
  - Replace update state manual → `useUpdateUser().mutateAsync()`
  - Replace delete state manual → `useDeleteUser().mutateAsync()`
  - Navigasi ke `/users` setelah delete sukses
  - Loading state via `isLoading`, error state via `error`
- **UserTable Delete Standardization** (`src/app/users/_components/user-table.tsx`):
  - Hapus import `usersApi` dan `ApiClientError`
  - Prop `onDelete` berubah dari `() => void` menjadi `(id: string) => Promise<void>`
  - `handleDelete` memanggil `await onDelete(deleteId)` tanpa logic API langsung
  - State `deleteError` dihapus — error handling dipindahkan ke parent page via mutation state
- **RequestsPage Refactor** (`src/app/requests/page.tsx`):
  - Replace `useState` + `useEffect` + `requestsApi.list()` → `useRequestList(filters)`
  - Replace create state manual + inline form → `useCreateRequest().mutateAsync()` + `RequestForm` component
  - Replace delete state manual → `useDeleteRequest().mutateAsync()`
  - `refetch()` untuk tombol Retry, render `error?.message`
- **RequestDetailPage Refactor** (`src/app/requests/[id]/page.tsx`):
  - Replace `useState` + `useEffect` + `requestsApi.getById()` → `useRequest(id)`
  - Replace inline edit form (13 useState) → `RequestForm` component (hanya 6 useState)
  - Replace separate delete confirmation dialog → header action button langsung
  - Mempertahankan panel "Update Status" yang unik untuk modul Requests
  - Loading/error state via `isLoading` / `error` dari React Query
- **Audit Logs Hooks & Refactor** (`src/app/audit-logs/_hooks/`): Membuat 2 hooks untuk modul Audit Logs:
  - `useAuditLogList(filters)` — query list dengan filter search
  - `useAuditLog(id)` — query single audit log by id
- **AuditLogsPage Refactor** (`src/app/audit-logs/page.tsx`):
  - Replace `useState` + `useEffect` + `auditLogsApi.list()` → `useAuditLogList(filters)`
  - Loading state via `isLoading`, error state via `error`, retry via `refetch()`
- **AuditLogDetailPage Refactor** (`src/app/audit-logs/[id]/page.tsx`):
  - Replace `useState` + `useEffect` + `auditLogsApi.getById()` → `useAuditLog(id)`
  - Loading state via `isLoading`, error state via `error`
- **Optimasi Loading & Error State**: Semua modul (Users, Requests, AuditLogs) kini memanfaatkan properti bawaan TanStack Query (`isPending`, `isError`, `error`) menggantikan `useState` manual untuk loading/error state, termasuk pada komponen table (`UserTable`, `RequestTable`) yang menerima prop `isDeleting` dari parent mutation.

### 25 Mei, Senin: TanStack Table, URL State, dan Pagination

Hari ketujuh implementasi TanStack Table untuk sorting tabel, migrasi filter state ke URL search params, dan penambahan pagination component dengan per page selector.

**Aktivitas:**

- **Install Dependensi**: Menambahkan `@tanstack/react-table` v8.21.3 ke package.json.
- **Shared Pagination Component** (`src/app/_components/ui/pagination.tsx`):
  - Tombol Previous / Next dengan disabled state
  - Nomor halaman dengan ellipsis untuk navigasi banyak halaman
  - Dropdown "Rows per page" dengan opsi 5, 10, 25, 50
  - Informasi "Page X of Y (Z total)"
  - Hanya muncul saat ada data (`total > 0`)
- **UserTable Migrasi** (`src/app/users/_components/user-table.tsx`):
  - Column definitions dengan accessor `name`, `email`, `role`, `status`
  - Sorting via `getSortedRowModel()` — klik header untuk sort asc/desc
  - Icons `ArrowUpDown`/`ArrowUp`/`ArrowDown` sebagai indikator sorting
  - Delete confirmation dialog tetap dipertahankan
- **RequestTable Migrasi** (`src/app/requests/_components/request-table.tsx`):
  - Column definitions: `title`, `status`, `priority`, `requestedBy`, `assignee`, `createdAt`
  - Sorting dan action column (Edit/Delete) dengan confirm dialog
- **AuditLogTable Migrasi** (`src/app/audit-logs/_components/audit-log-table.tsx`):
  - Column definitions: `actor`, `action`, `target`, `details`, `timestamp`
  - Sorting, row click navigasi ke detail
- **URL State Migration** (`src/app/users/page.tsx`, `src/app/requests/page.tsx`, `src/app/audit-logs/page.tsx`):
  - Replace `useState<TParams>(DEFAULT)` dengan `useSearchParams()` dari React Router
  - Filter (`search`, `role`, `status`, `priority`, `page`, `perPage`) dibaca/tulis dari URL
  - Setiap perubahan filter → update URL + reset `page=1`
  - Setiap perubahan halaman → update `page` di URL
  - URL dapat disalin dan mempertahankan state (shareable)
- **Fix Pagination MSW Handler** (`src/api/mocks/handlers/users.ts`, `requests.ts`, `audit-logs.ts`):
  - Bug: Data difilter tapi tidak di-slice per halaman — semua data selalu dikirim
  - Fix: Tambah `.slice((page - 1) * perPage, page * perPage)` sebelum `paginated()`
  - Pagination server-side berfungsi sesuai page dan perPage yang dikirim
- **Catatan**: Sorting bersifat client-side (data sudah difetch, di-sort di browser).

Contoh URL setelah migrasi:

```bash
/users?search=john&role=admin&status=active&page=2&perPage=10
/requests?status=pending&priority=high&page=1
/audit-logs?search=login&page=1
```

### 26 Mei, Selasa: Real API Readiness, Error States, dan Finalisasi

Hari kedelapan implementasi environment switching antara MSW dan real API, global error handling (401 auto-logout, 403 forbidden), membuat dashboard page dan kontennya, dan membuat reusable error/empty state components.

**Aktivitas:**

- **Environment & Real API Readiness** (`vite.config.ts`, `.env`):
  - Vite proxy configuration untuk forwarding `/api/*` ke real backend saat MSW disabled
  - Proxy aktif berdasarkan `VITE_API_BASE_URL` — kosong = same-origin (MSW), terisi = forward ke backend
  - Switch mode via `.env`: `VITE_ENABLE_MSW=true` untuk MSW, `false` + `VITE_API_BASE_URL` untuk real API
- **Global 401/403 HTTP Error Interceptor** (`src/api/client.ts`, `src/main.tsx`):
  - Export `setHttpErrorHandler()` dari client.ts — global callback untuk HTTP errors
  - Di `request()`, deteksi `status === 401` → trigger handler → `logout()` + redirect `/login`
  - Deteksi `status === 403` → trigger handler → redirect ke `/forbidden`
  - Handler di-set di `main.tsx` menggunakan `router.navigate()` untuk navigasi tanpa full reload
- **Dashboard Content** (`src/app/dashboard/page.tsx`):
  - Summary cards: Total Users, Total Requests, Audit Log Entries (menggunakan hooks TanStack Query yang sudah ada)
  - Recent Activity table: 5 audit logs terbaru dengan kolom Actor, Action, Timestamp
  - Link "View All Audit Logs →" navigasi ke `/audit-logs`
  - Loading state via `isLoading` dari masing-masing query
- **Reusable ErrorState Component** (`src/app/_components/error-state.tsx`):
  - Props: `message?` (pesan error), `onRetry?` (callback untuk tombol Retry)
  - Tampilan: red border box dengan pesan error + tombol Retry opsional
  - Menggantikan inline error states di users, requests, dan audit-logs pages
- **Reusable EmptyState Component** (`src/app/_components/empty-state.tsx`):
  - Props: `message?` (pesan custom)
  - Tampilan: center-aligned text dalam border box
  - Menggantikan inline empty states di users, requests, dan audit-logs pages
- **Finalisasi**:
  - Fix null safety: `error.message` → `error?.message` di audit-logs list page
  - Empty state ditampilkan terpisah dari error state (sebelumnya digabung)
  - Semua list page konsisten: loading → error → empty → data
