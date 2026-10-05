const fs = require('fs');

const imgList = fs.readFileSync('img_list.txt', 'utf8').trim().split('\n');

const prods = [
  { id: 'prod-001', cat: 'Buket Bunga', price: 35000, folder: 'Kategori buket bunga/harga-35k' },
  { id: 'prod-002', cat: 'Buket Bunga', price: 55000, folder: 'Kategori buket bunga/harga-55k' },
  { id: 'prod-003', cat: 'Buket Bunga', price: 85000, folder: 'Kategori buket bunga/harga-85k' },
  { id: 'prod-004', cat: 'Buket Bunga', price: 100000, folder: 'Kategori buket bunga/harga-100k' },
  { id: 'prod-005', cat: 'Buket Bunga', price: 135000, folder: 'Kategori buket bunga/harga-135k' },
  { id: 'prod-006', cat: 'Buket Bunga', price: 150000, folder: 'Kategori buket bunga/harga-150k' },
  { id: 'prod-007', cat: 'Buket Bunga', price: 200000, folder: 'Kategori buket bunga/harga-200k' },
  { id: 'prod-008', cat: 'Buket Bunga', price: 325000, folder: 'Kategori buket bunga/harga-325k' },
  { id: 'prod-009', cat: 'Buket Bunga', price: 500000, folder: 'Kategori buket bunga/harga-500k' },
  { id: 'prod-010', cat: 'Buket Boneka', price: 85000, folder: 'Kategori buket boneka/harga-85k' },
  { id: 'prod-011', cat: 'Buket Boneka', price: 135000, folder: 'Kategori buket boneka/harga-135k' },
  { id: 'prod-012', cat: 'Buket Boneka', price: 150000, folder: 'Kategori buket boneka/hraga-150k' },
  { id: 'prod-013', cat: 'Butterfly LED', price: 85000, folder: 'Kategori Buket butterfly LED/harga-85k' },
  { id: 'prod-014', cat: 'Butterfly LED', price: 200000, folder: 'Kategori Buket butterfly LED/harga-200k' },
  { id: 'prod-015', cat: 'Buket Papan', price: 75000, folder: 'Kategori buket papan/harga-75k' },
  { id: 'prod-016', cat: 'Buket Satin', price: 90000, folder: 'Kategori buket satin/harga-90k' },
  { id: 'prod-017', cat: 'Buket Satin', price: 115000, folder: 'Kategori buket satin/harga-115k' },
  { id: 'prod-018', cat: 'Buket Satin', price: 125000, folder: 'Kategori buket satin/harga-125k' },
  { id: 'prod-019', cat: 'Buket Satin', price: 150000, folder: 'Kategori buket satin/harga-150k' },
  { id: 'prod-020', cat: 'Buket Satin', price: 200000, folder: 'Kategori buket satin/harga-200k' },
  { id: 'prod-021', cat: 'Buket Uang', price: 75000, folder: 'Kategori buket uang/harga-75k' },
  { id: 'prod-022', cat: 'Buket Uang', price: 100000, folder: 'Kategori buket uang/harga-100k' },
  { id: 'prod-023', cat: 'Buket Uang', price: 135000, folder: 'Kategori buket uang/harga-135k' },
  { id: 'prod-024', cat: 'Buket Uang', price: 180000, folder: 'Kategori buket uang/harga-180k' },
  { id: 'prod-025', cat: 'Buket Uang', price: 250000, folder: 'Kategori buket uang/harga-250k' },
  { id: 'prod-026', cat: 'Buket Valentine', price: 55000, folder: 'Kategori buket valentine/harga-55k' },
  { id: 'prod-027', cat: 'Buket Valentine', price: 135000, folder: 'Kategori buket valentine/harga-135k' },
  { id: 'prod-028', cat: 'Buket Valentine', price: 185000, folder: 'Kategori buket valentine/harga-185k' },
  { id: 'prod-029', cat: 'Buket Valentine', price: 225000, folder: 'Kategori buket valentine/harga-225k' },
  { id: 'prod-030', cat: 'Buket Valentine', price: 250000, folder: 'Kategori buket valentine/harga-250k' }
];

let js = `const CONFIG = {
  namaUsaha: 'buketduasatu.mks',
  whatsappNumber: '6285241234567',
  instagram: '@buketduasatu.mks',
  instagramUrl: 'https://instagram.com/buketduasatu.mks',
  alamat: 'Jl. Zebra No.21 Makassar(Sekitaran Mall Ratu Indah)',
  jamOperasional: 'Setiap hari 07.00–22.00 WITA',
  kota: 'Makassar',
  currency: 'Rp',
  localStorageKey: 'buket_cart',
  maxUcapan: 200,
  maxCatatan: 300,
};

const PRODUCTS = [\n`;

prods.forEach(p => {
  let images = imgList
    .filter(path => path.includes(`Assets/${p.folder}/`))
    .map(path => path.replace('/home/lasains/ssd2/web promosi/', ''));
  
  if (images.length === 0) {
      console.log("No images for", p.folder);
  }
  
  js += `  {
    id: '${p.id}',
    nama: '${p.cat} – Rp ${new Intl.NumberFormat('id-ID').format(p.price)}',
    kategori: '${p.cat}',
    harga: ${p.price},
    tersedia: true,
    gambarUtama: '${images[0] || ''}',
    gambarLain: ${JSON.stringify(images.slice(1))},
  },\n`;
});

js += `];

const FAQS = [
  { t: 'Berapa lama proses pembuatan?', j: 'Proses pembuatan memakan waktu 1-3 hari tergantung antrian.' },
  { t: 'Apakah bisa custom request?', j: 'Tentu, silakan hubungi kami via WhatsApp untuk custom.' },
  { t: 'Pengiriman via apa saja?', j: 'Bisa ambil sendiri di lokasi atau diantar via kurir lokal Makassar.' },
  { t: 'Bagaimana cara bayar?', j: 'Pembayaran dilakukan via transfer setelah pesanan dikonfirmasi di WA.' },
  { t: 'Apakah bunga segar atau palsu?', j: 'Kami menyediakan bunga artificial (palsu) yang tahan lama.' }
];

const KEUNGGULAN = [
  {
    icon: '📸',
    judul: 'Foto Sebelum Kirim',
    deskripsi: 'Hasil buket difoto dan dikirimkan via WhatsApp sebelum dipickup atau diantar kurir untuk memastikan kepuasan Anda.'
  },
  {
    icon: '💌',
    judul: 'Free Kartu Ucapan & Custom Wrap',
    deskripsi: 'Bebas request tulisan ucapan manis dan sesuaikan warna kertas buket favorit sesuai momen spesial Anda.'
  },
  {
    icon: '⚡',
    judul: 'Pengerjaan Cepat & Siap Sameday',
    deskripsi: 'Butuh buket mendadak untuk wisuda atau perayaan hari ini? Tim kami siap melayani pesanan siap ambil/antar.'
  },
  {
    icon: '🌸',
    judul: 'Bunga Artificial Awet & Rapi',
    deskripsi: 'Rangkaian menggunakan bunga artifisial berkualitas tinggi yang rapi, awet bertahun-tahun tanpa layu sebagai kenangan.'
  }
];
`;

fs.writeFileSync('js/data.js', js);
console.log('data.js generated');
