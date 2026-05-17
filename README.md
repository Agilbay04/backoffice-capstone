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
- **Component Extraction**: Mengekstrak elemen UI menjadi komponen terisolasi yang *reusable* (`src/common/StatusBadge.tsx`) menggunakan **TypeScript Props** untuk mengatur variasi visual berdasarkan status pengguna (`active`, `inactive`).
- **Inline Styling Concept**: Mempelajari teknik penulisan *inline style* pada JSX menggunakan *double brackets* (`{{ }}`) untuk melemparkan object JavaScript, serta konversi sintaks CSS ke format *camelCase*.
