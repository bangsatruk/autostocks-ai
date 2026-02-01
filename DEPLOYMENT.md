# Panduan Deployment AutoStocks AI

Panduan ini akan membantu Anda mempublikasikan website AutoStocks AI ke internet, memasang custom domain, dan hosting gratis.

## Langkah 1: Push ke GitHub

Project ini sudah di-inisialisasi sebagai Git repository lokal. Sekarang kita perlu upload ke GitHub.

1.  Buka **[GitHub.com](https://github.com)** dan login.
2.  Buat **New Repository** (tombol `+` di pojok kanan atas).
    *   Nama Repository: `autostocks-ai` (atau nama lain yang Anda suka).
    *   Visibility: `Public` (agar bisa deploy gratis di beberapa provider) atau `Private`.
    *   Klik **Create repository**.
3.  Copy perintah yang muncul di bagian **"…or push an existing repository from the command line"**. Perintahnya mirip seperti ini:
    ```bash
    git remote add origin https://github.com/USERNAME/autostocks-ai.git
    git branch -M main
    git push -u origin main
    ```
4.  Jalankan perintah tersebut di terminal / command prompt proyek ini.

## Langkah 2: Hosting & Custom Domain (Rekomendasi: Vercel)

Vercel adalah pilihan terbaik untuk project Vite/React karena cepat, gratis, dan mudah setting domain.

1.  Buka **[Vercel.com](https://vercel.com)** dan Sign Up (Login with GitHub).
2.  Di dashboard, klik **Add New...** -> **Project**.
3.  Pilih repository `autostocks-ai` yang baru saja Anda push ke GitHub -> Klik **Import**.
4.  Di halaman "Configure Project", biarkan settingan default:
    *   Framework Preset: `Vite` (biasanya otomatis terdeteksi).
    *   Root Directory: `./`
    *   Build Command: `npm run build`
    *   Output Directory: `dist`
5.  Klik **Deploy**. Tunggu sebentar (sekitar 1 menit).
6.  Selamat! Website Anda sudah live dengan domain `autostocks-ai.vercel.app` (contoh).

## Langkah 3: Setting Custom Domain

Untuk mengubah domain menjadi misal `autostocks.id`:

1.  Pastikan Anda sudah membeli domain di penyedia domain (Niagahoster, Domainesia, Namecheap, dll).
2.  Di Dashboard Vercel project Anda, masuk ke **Settings** -> **Domains**.
3.  Masukkan nama domain Anda (misal: `autostocks.id`) di kolom input -> Klik **Add**.
4.  Vercel akan memberikan instruksi **DNS Records** yang harus Anda pasang di penyedia domain Anda. Biasanya berupa:
    *   **A Record**: `@` ke IP Vercel (misal `76.76.21.21`).
    *   **CNAME Record**: `www` ke `cname.vercel-dns.com`.
5.  Masuk ke dashboard penyedia domain Anda -> Cari menu **DNS Management** -> Tambahkan record tersebut.
6.  Tunggu propagasi DNS (bisa instan atau hingga 24 jam).
7.  Vercel akan otomatis mengaktifkan **SSL (HTTPS)** untuk domain Anda.

## Langkah 4: Update Berkala

Jika Anda mengubah kode di laptop:
1.  Lakukan perubahan kode.
2.  Commit dan Push ke GitHub:
    ```bash
    git add .
    git commit -m "Update fitur baru"
    git push
    ```
3.  Vercel akan **otomatis** mendeteksi perubahan dan melakukan re-deploy website Anda dalam hitungan detik.
