# Backoffice Capstone

Projek dashboard backoffice yang dibangun menggunakan Vite, React, dan pnpm. Projek ini merupakan bagian dari kurikulum transisi Backend ke Fullstack.

## Progres Harian

### 15 Mei, Jumat: Kickoff, Mental Model, dan Project Setup

Hari pertama difokuskan pada inisialisasi projek dan penyelarasan mental model antara backend development ke frontend development.

**Aktivitas yang dilakukan:**

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
- **Static UI**: Implementasi halaman awal `UsersPage` menggunakan Semantic HTML (table, header, main) untuk memverifikasi render awal di `App.tsx`.
