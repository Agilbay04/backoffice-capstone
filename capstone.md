# Kurikulum: Backend ke Fullstack Melalui Frontend Backoffice

## Hasil Akhir Program

Pada 26 Mei 2026, setiap pair harus mengumpulkan walkthrough backoffice SPA yang berjalan. Setiap peserta harus bisa menjelaskan keputusan frontend inti secara individual: component state vs server state, tanggung jawab Tailwind vs shadcn/ui, integrasi API, validasi form, table state, dan penanganan error umum.

Mode training default adalah asinkron untuk implementasi. Mentor membagikan brief, pair memilih waktu kerja masing-masing, lalu pair menjadwalkan review progres sinkron dengan mentor pada checkpoint yang ditentukan. Mentor tidak wajib mengunci peserta dalam meeting live coding yang sama.

Hari akhir pekan tidak dihitung dalam kurikulum ini.

## Jadwal Harian

<a id="15-mei"></a>
### 15 Mei, Jumat: Kickoff, Mental Model, dan Project Setup

Tujuan belajar:
- Menjelaskan bagaimana browser, DOM, CSS, JavaScript runtime, React, dan Vite saling terhubung.
- Memahami perbedaan antara backend API contract dan frontend UI state.
- Membuat project awal Vite React TypeScript tanpa starter code dari mentor.
- Memahami struktur folder DOT Vite TypeScript dan alasan colocation, KISS, serta low coupling/high cohesion penting.

Praktik kode:
- Scaffold project Vite React TypeScript baru.
- Hapus konten demo starter dari file app yang dihasilkan.
- Buat folder awal `src/app`, `src/api`, `src/common`, `src/libs`, `src/types`, dan `src/utils` berdasarkan structure guide.
- Buat `src/app/users/_types/user-list-query.ts` dengan type `UserListQuery` untuk `search`, `role`, `status`, `page`, dan `pageSize`.
- Buat `src/app/users/_const/user-query-defaults.ts` dengan default query values untuk users table.
- Buat placeholder route users awal di `src/app/users/page.tsx`.
- Implementasikan static starter page sederhana dengan semantic HTML.

Selesai jika:
- Dev server berjalan.
- App me-render static starter page.
- Struktur folder awal tersedia tanpa route group folder.
- Pair bisa menunjuk file yang dibuat dan alasan foldernya.

Cek individual:
- Jelaskan apa yang terjadi saat `pnpm dev` dijalankan.
- Jelaskan peran `index.html`, `src/main.tsx`, dan root React component.
- Jelaskan bagian mana dari users table yang termasuk backend contract, server state, URL state, form state, dan local UI state.
- Jelaskan kenapa route-specific components sebaiknya mulai colocated di dalam route module.

<a id="18-mei"></a>
### 18 Mei, Senin: Web Fundamentals, React Components, dan TypeScript

Tujuan belajar:
- Menggunakan semantic HTML, form, button, label, table, dan landmark.
- Memahami CSS box model, flex, grid, spacing, dan responsive layout.
- Membuat React components dengan props, local state, events, dan composition.
- Menggunakan TypeScript types untuk props dan simple domain models.

Praktik kode:
- Buat sidebar, topbar, main content area, dan dashboard summary.
- Buat contoh static table, empty state, dan error state.
- Definisikan type `User`, `Request`, dan `AuditLog`.
- Extract app shell, page header, status badge, empty state, dan error state components.
- Tambahkan local state untuk simple filters sebelum nantinya diganti dengan URL state.
- Tempatkan route-specific components di dalam route module yang memilikinya.

Selesai jika:
- Layout tidak rusak di width `1024px`.
- Buttons dan form fields memiliki accessible labels.
- Tables menggunakan semantic structure yang sesuai atau accessible shadcn/ui table primitives.
- Components memiliki typed props.
- Tidak ada module yang mengimpor private `_components`, `_hooks`, `_const`, atau `_utils` dari module lain.

Review progres sinkron:
- Jadwalkan waktu dengan mentor untuk menunjukkan static shell.
- Tunjukkan satu keputusan layout, satu concern accessibility, dan satu contoh component extraction.

Cek individual:
- Jelaskan props vs state.
- Jelaskan satu keputusan layout dan satu concern accessibility.
- Jelaskan kenapa frontend DTO types harus sesuai dengan ekspektasi API.

<a id="19-mei"></a>
### 19 Mei, Selasa: Tailwind, shadcn/ui, Routing, dan App Shell

Tujuan belajar:
- Menggunakan Tailwind untuk layout, spacing, color, dan responsive utilities.
- Menggunakan shadcn/ui sebagai sumber komponen yang bisa diedit, bukan black-box library.
- Mengimplementasikan backoffice routes menggunakan React Router.
- Memisahkan login behavior dari authenticated app behavior di dalam struktur route `src/app` yang flat.

Routes wajib:
- `/login`
- `/dashboard`
- `/users`
- `/users/:id`
- `/requests`
- `/requests/:id`
- `/audit-logs`

Praktik kode:
- Install Tailwind dan shadcn/ui dari official docs.
- Tambahkan Button, Input, Select, Dialog, Badge, Skeleton, dan Table primitives.
- Rebuild app shell menggunakan Tailwind dan shadcn/ui primitives.
- Buat React Router route mapping untuk semua routes wajib.
- Buat app layout dengan nested routes, active navigation, not-found page, dan forbidden page.

Selesai jika:
- Semua routes wajib bisa dibuka dari navigation.
- Refresh browser pada primary routes tetap menampilkan route yang benar.
- App shell menggunakan Tailwind untuk layout dan shadcn/ui untuk controls.
- Tidak ada extra route grouping folder.

Cek individual:
- Jelaskan apa yang menjadi tanggung jawab Tailwind dan apa yang menjadi tanggung jawab shadcn/ui.
- Jelaskan bagaimana URL state membantu backoffice users membagikan view.

<a id="20-mei"></a>
### 20 Mei, Rabu: Forms, Validation, dan Auth Flow

Tujuan belajar:
- Membuat form yang terlihat controlled tanpa mengelola setiap input secara manual.
- Melakukan validasi dengan Zod dan menampilkan field-level errors.
- Membedakan client-side validation, submit errors, dan auth errors.

Praktik kode:
- Buat login form.
- Buat user create/edit form.
- Tambahkan field role dan status.
- Gunakan React Hook Form dan Zod untuk validation schema.
- Tambahkan validation messages dan disabled submit state.
- Buat skeleton auth flow pertama: login, current user placeholder, logout, dan guarded app shell.

Selesai jika:
- Invalid email, empty name, missing role, dan missing status ditangani.
- Field-level errors muncul dekat field yang bermasalah.
- API-level submit failure ditampilkan di luar field-level validation.
- Guarded app shell mengarahkan user yang belum login ke `/login`.

Cek individual:
- Jelaskan schema validation.
- Jelaskan kenapa submit errors berbeda dari field errors.

<a id="21-mei"></a>
### 21 Mei, Kamis: Mock API, API Client, dan Error States

Tujuan belajar:
- Menggunakan mock API untuk membuka blocking pada frontend delivery.
- Menyamakan mock responses dengan real backend contracts.
- Menjaga API endpoint functions di luar UI modules, sementara feature query hooks tetap colocated dengan route-nya.

Praktik kode:
- Tambahkan MSW.
- Tambahkan MSW handlers untuk auth, users, requests, dan audit logs.
- Tambahkan seeded data untuk users, requests, dan audit logs.
- Tambahkan skenario realistic delay, empty response, 401, 403, dan 500.
- Buat API client wrapper.
- Hubungkan login dan current-user reads ke mock API.

Selesai jika:
- App bisa berjalan tanpa real backend.
- Pair bisa men-trigger setiap error state secara intentional.
- API client wrapper menangani base request dan error mapping awal.
- Login dan current-user reads memakai mock API, bukan hardcoded local data.

Cek individual:
- Debug satu request yang gagal menggunakan browser DevTools.
- Jelaskan apakah failure tersebut termasuk auth, validation, permission, atau server error handling.

<a id="22-mei"></a>
### 22 Mei, Jumat: TanStack Query dan First Users Vertical Slice

Tujuan belajar:
- Memperlakukan API data sebagai server state.
- Menggunakan query keys, invalidation, mutations, dan stale data secara intentional.
- Menyelesaikan satu users workflow lengkap end to end.

Praktik kode:
- Buat query hooks untuk current user, users, requests, request detail, dan audit logs.
- Buat mutation hooks untuk create user, edit user, user status update, dan request status update.
- Fetch current user, users, requests, dan audit logs dengan TanStack Query.
- Tambahkan loading, error, empty, dan success states di setiap query-backed page.
- Buat users list, search, create user, edit user, dan user status update.
- Invalidate affected queries setelah mutations.
- Simpan endpoint functions di `src/api` dan feature query hooks di route module yang relevan.

Selesai jika:
- Refreshing, loading, stale data, dan mutation pending states terlihat.
- Tidak ada API-backed list yang menyimpan fetched data hanya di local component state.
- Users workflow bisa dijalankan dari list sampai create/edit/status update.
- Mutation success memperbarui UI tanpa manual page refresh.

Review progres sinkron:
- Jadwalkan waktu dengan mentor untuk menunjukkan progres users workflow.
- Walk through component tree, data flow, API handler, mutation, dan cache refresh.

Cek individual:
- Jelaskan kenapa fetched API data biasanya tidak seharusnya disimpan di `useState`.

<a id="25-mei"></a>
### 25 Mei, Senin: TanStack Table, URL State, dan Requests Workflow

Tujuan belajar:
- Membuat operational tables untuk scanning, filtering, sorting, dan row actions.
- Menjaga table state agar bisa dibagikan melalui URL search params.
- Membuat request status workflow yang realistis.

Praktik kode:
- Gunakan TanStack Table untuk users dan requests.
- Tambahkan users table dengan pagination, role filter, status filter, sorting, dan search.
- Tambahkan requests table dengan status, priority, assignee, sorting, pagination, dan row actions.
- Simpan filters, sorting, dan pagination di URL search params.
- Buat request detail route.
- Tambahkan request status update action dengan pending, success, 403, dan 500 states.

Selesai jika:
- URL yang disalin mempertahankan filters, sorting, dan page state.
- Row actions jelas dan tidak perlu ditebak.
- Filtered empty state berbeda dari initial empty state.
- Request status update menampilkan pending, success, dan failure feedback.

Cek individual:
- Jelaskan client-side table state vs server-style query params.
- Jelaskan bagaimana UI harus berperilaku saat mutation gagal.

<a id="26-mei"></a>
### 26 Mei, Selasa: Audit Logs, Real API Readiness, Review Kualitas, dan Penilaian Final

Tujuan belajar:
- Menyelesaikan surface area backoffice yang wajib.
- Berpindah dari mock API ke real backend tanpa menulis ulang screens.
- Mereview capstone terhadap workflow utama dan error scenarios.
- Berlatih menjelaskan keputusan engineering.

Praktik kode:
- Buat audit logs list dengan actor/action filtering dan pagination.
- Tambahkan environment-based API base URL.
- Update API client agar bisa switch antara MSW dan real API base URL melalui environment config.
- Tambahkan loading, empty, error, dan success states yang terlihat di users, requests, dan audit logs pages.
- Tambahkan auth error, forbidden, dan server error states yang accessible di UI.
- Perbaiki primary route yang rusak sebelum final walkthrough.

Selesai jika:
- App bisa switch antara MSW dan real API tanpa screen rewrites.
- Users, requests, dan audit logs punya loading, empty, error, dan success states.
- Auth failures redirect ke `/login`.
- Permission failures menampilkan forbidden state.
- Demo path berjalan secara lokal.
- Known limitations dan follow-up fixes dicatat sebelum penilaian final.

Penilaian final:
- Pair menjadwalkan final walkthrough sinkron dengan mentor.
- Setiap peserta menjelaskan keputusan code mereka saat review atau mengumpulkan recorded explanation jika scheduling terblokir.
- Pair membandingkan MSW contract dengan real backend docs atau endpoints dan mencatat mismatch di real API readiness template.
- Pair mencatat known limitations dan follow-up fixes.
- Mentor memberi skor dengan rubrik dan memberikan rekomendasi next step.

Demo wajib:
- Login.
- Filter table.
- Create atau edit user.
- Update request status.
- Buka audit logs.
- Trigger dan jelaskan API error state.
