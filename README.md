# buketduasatu.mks

Website e-commerce statis untuk toko buket bunga **buketduasatu.mks**.

## Struktur File
- `index.html`: Halaman utama website.
- `css/style.css`: Gaya tampilan kustom (termasuk animasi).
- `js/data.js`: Konfigurasi toko, data produk, FAQ, dan testimoni.
- `js/app.js`: Bootstrap aplikasi browser setelah modul logika dimuat.
- `js/app-*.js`: Modul logika interaktif yang dimuat dari `index.html` setelah `js/data.js`, dipisah berdasarkan tanggung jawab seperti katalog, keranjang, konfigurator, harga, dan pemesanan.

Kode aplikasi berjalan sebagai JavaScript native di browser dan tidak memerlukan Node.js atau bundler. Node.js hanya digunakan untuk menjalankan tes.

## Cara Mengubah Data Produk & Konfigurasi
Semua perubahan data dilakukan di dalam file `js/data.js`.

### Mengubah Konfigurasi Toko
Cari bagian `const CONFIG` di file `data.js`.
- `whatsappNumber`: Ganti dengan nomor WA baru (wajib diawali '62').
- `jamOperasional`: Ganti jam buka/tutup toko.

### Menambah/Mengubah Produk
Cari bagian `const PRODUCTS = [ ... ]` di file `data.js`.
Format satu produk:
```javascript
{
  id: 'prod-001',           // ID unik produk
  nama: 'Buket Bunga – Rp 35.000', // Nama yang tampil
  kategori: 'Buket Bunga',  // Untuk filter kategori
  harga: 35000,             // Harga dalam angka
  tersedia: true,           // true = ada stok, false = stok habis
  gambarUtama: 'Assets/.../gambar1.jpg', // Path foto utama
  gambarLain: ['Assets/.../gambar2.jpg'], // Path foto tambahan
}
```
Jika stok habis, ubah `tersedia: true` menjadi `tersedia: false`.

### Mengubah FAQ dan Testimoni
Cari bagian `const FAQS` dan `const TESTIMONIALS` di bawah file `data.js` untuk menambahkan pertanyaan baru atau review pembeli.

## Deployment
Karena ini adalah website statis murni tanpa backend/build tools, Anda cukup mengunggah seluruh folder ini ke layanan hosting statis (misalnya Cloudflare Pages, GitHub Pages, atau Vercel).

## Peringatan Pengembang
- Jangan menghapus struktur HTML pada file index.
- Pastikan tidak ada karakter aneh pada nama file gambar.
- `localStorage` digunakan sebagai database sementara untuk keranjang belanja.
