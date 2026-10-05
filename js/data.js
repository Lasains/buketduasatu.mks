const CONFIG = {
  namaUsaha: 'buketduasatu.mks',
  whatsappNumber: '6285931413627',
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

// Data Harga Satu Sumber (FR-P1 - Sumber Kebenaran Harga Bertingkat & Tambahan)
const HARGA = {
  'satin-glitter': {
    nama: 'Buket Satin Glitter',
    pilihanTangkai: [7, 12, 18, 30, 40, 50, 70, 100],
    pilihanModel: [
      { id: 'biasa', label: 'Model Biasa' },
      { id: 'kriwil', label: 'Model Kriwil' }
    ],
    tarif: {
      7:   { biasa: 90000,  kriwil: 100000 },
      12:  { biasa: 125000, kriwil: 150000 },
      18:  { biasa: 175000, kriwil: 200000 },
      30:  { biasa: 275000, kriwil: 300000 },
      40:  { biasa: 350000, kriwil: 400000 },
      50:  { biasa: 400000, kriwil: 450000 },
      70:  { biasa: 575000, kriwil: 650000 },
      100: { biasa: 800000, kriwil: 900000 }
    },
    tambahan: [
      { id: 'kupu-kupu', nama: 'Kupu-kupu 2 pcs', harga: 5000, satuan: 'paket' },
      { id: 'mahkota', nama: 'Mahkota', harga: 20000, satuan: 'pcs' },
      { id: 'lampu-led', nama: 'Lampu LED', harga: 15000, satuan: 'pcs' },
      { id: 'boneka-polos-toga', nama: 'Boneka polos/toga', harga: 25000, satuan: 'pcs' },
      { id: 'boneka-profesi', nama: 'Boneka profesi', harga: 35000, satuan: 'pcs' }
    ]
  },
  'buket-uang': {
    nama: 'Jasa Buket Uang',
    keterangan: 'Harga adalah jasa rangkai, belum termasuk uang.',
    paket: [
      { kapasitas: 10, harga: 75000 },
      { kapasitas: 20, harga: 100000 },
      { kapasitas: 30, harga: 135000 },
      { kapasitas: 40, harga: 165000 },
      { kapasitas: 50, harga: 200000 },
      { kapasitas: 60, harga: 235000 },
      { kapasitas: 70, harga: 275000 },
      { kapasitas: 80, harga: 335000 },
      { kapasitas: 90, harga: 375000 },
      { kapasitas: 100, harga: 400000 }
    ],
    tambahan: [
      { id: 'bunga', nama: 'Bunga', harga: 5000, satuan: 'tangkai' },
      { id: 'boneka-polos-toga', nama: 'Boneka polos/toga', harga: 25000, satuan: 'pcs' },
      { id: 'boneka-profesi', nama: 'Boneka profesi', harga: 40000, satuan: 'pcs' },
      { id: 'silverqueen', nama: 'Silverqueen', harga: 25000, satuan: 'pcs' }
    ]
  }
};

const PRODUCTS = [
  {
    id: 'prod-001',
    nama: 'Buket Bunga – Rp 35.000',
    kategori: 'Buket Bunga',
    harga: 35000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket bunga/harga-35k/20250831_085800.jpg',
    gambarLain: ["Assets/Kategori buket bunga/harga-35k/20251113_193216.jpg","Assets/Kategori buket bunga/harga-35k/IMG_20260721_075346.jpg","Assets/Kategori buket bunga/harga-35k/IMG_20260721_075418.jpg","Assets/Kategori buket bunga/harga-35k/IMG_20260721_075448.jpg","Assets/Kategori buket bunga/harga-35k/IMG_20260721_075509.jpg","Assets/Kategori buket bunga/harga-35k/IMG_20260721_075548.jpg"],
  },
  {
    id: 'prod-002',
    nama: 'Buket Bunga – Rp 55.000',
    kategori: 'Buket Bunga',
    harga: 55000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket bunga/harga-55k/20260818_085318.jpg',
    gambarLain: ["Assets/Kategori buket bunga/harga-55k/20260818_085409.jpg","Assets/Kategori buket bunga/harga-55k/20260819_174247.jpg","Assets/Kategori buket bunga/harga-55k/20260913_093937.jpg","Assets/Kategori buket bunga/harga-55k/20260913_094015.jpg","Assets/Kategori buket bunga/harga-55k/20260913_094123.jpg","Assets/Kategori buket bunga/harga-55k/20260913_094259.jpg","Assets/Kategori buket bunga/harga-55k/20260913_094429.jpg"],
  },
  {
    id: 'prod-003',
    nama: 'Buket Bunga – Rp 85.000',
    kategori: 'Buket Bunga',
    harga: 85000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket bunga/harga-85k/IMG-20260508-WA0020.jpg',
    gambarLain: ["Assets/Kategori buket bunga/harga-85k/IMG_20260613_125313.jpg","Assets/Kategori buket bunga/harga-85k/IMG-20260815-WA0006.jpg","Assets/Kategori buket bunga/harga-85k/IMG-20260815-WA0007.jpg","Assets/Kategori buket bunga/harga-85k/IMG-20260815-WA0008.jpg","Assets/Kategori buket bunga/harga-85k/IMG-20260819-WA0006.jpg","Assets/Kategori buket bunga/harga-85k/IMG_20260915_102725.jpg"],
  },
  {
    id: 'prod-004',
    nama: 'Buket Bunga – Rp 100.000',
    kategori: 'Buket Bunga',
    harga: 100000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket bunga/harga-100k/IMG-20260815-WA0013.jpg',
    gambarLain: ["Assets/Kategori buket bunga/harga-100k/IMG-20260815-WA0016.jpg","Assets/Kategori buket bunga/harga-100k/IMG-20260815-WA0017.jpg","Assets/Kategori buket bunga/harga-100k/IMG-20260912-WA0002.jpg","Assets/Kategori buket bunga/harga-100k/IMG_20260915_102808.jpg","Assets/Kategori buket bunga/harga-100k/IMG_20260915_103202.jpg","Assets/Kategori buket bunga/harga-100k/IMG_20260915_103353.jpg"],
  },
  {
    id: 'prod-005',
    nama: 'Buket Bunga – Rp 135.000',
    kategori: 'Buket Bunga',
    harga: 135000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket bunga/harga-135k/20250225_074002.jpg',
    gambarLain: ["Assets/Kategori buket bunga/harga-135k/20250430_092311.jpg","Assets/Kategori buket bunga/harga-135k/20250520_183417.jpg","Assets/Kategori buket bunga/harga-135k/20250702_072759.jpg","Assets/Kategori buket bunga/harga-135k/20250702_072900.jpg","Assets/Kategori buket bunga/harga-135k/IMG-20260815-WA0018.jpg","Assets/Kategori buket bunga/harga-135k/IMG-20260818-WA0029.jpg"],
  },
  {
    id: 'prod-006',
    nama: 'Buket Bunga – Rp 150.000',
    kategori: 'Buket Bunga',
    harga: 150000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket bunga/harga-150k/IMG-20260513-WA0003.jpg',
    gambarLain: ["Assets/Kategori buket bunga/harga-150k/IMG-20260513-WA0009.jpg","Assets/Kategori buket bunga/harga-150k/IMG_20260815_124501.jpg","Assets/Kategori buket bunga/harga-150k/IMG_20260815_133559.jpg"],
  },
  {
    id: 'prod-007',
    nama: 'Buket Bunga – Rp 200.000',
    kategori: 'Buket Bunga',
    harga: 200000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket bunga/harga-200k/20260313_120534.jpg',
    gambarLain: ["Assets/Kategori buket bunga/harga-200k/20260504_100518.jpg"],
  },
  {
    id: 'prod-008',
    nama: 'Buket Bunga – Rp 325.000',
    kategori: 'Buket Bunga',
    harga: 325000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket bunga/harga-325k/20251115_090754.jpg',
    gambarLain: [],
  },
  {
    id: 'prod-009',
    nama: 'Buket Bunga – Rp 500.000',
    kategori: 'Buket Bunga',
    harga: 500000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket bunga/harga-500k/20251220_131727.jpg',
    gambarLain: [],
  },
  {
    id: 'prod-010',
    nama: 'Buket Boneka – Rp 85.000',
    kategori: 'Buket Boneka',
    harga: 85000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket boneka/harga-85k/20250824_135246.jpg',
    gambarLain: ["Assets/Kategori buket boneka/harga-85k/20250824_135336.jpg","Assets/Kategori buket boneka/harga-85k/20250824_135355.jpg","Assets/Kategori buket boneka/harga-85k/20250824_135457.jpg","Assets/Kategori buket boneka/harga-85k/20250827_155205.jpg"],
  },
  {
    id: 'prod-011',
    nama: 'Buket Boneka – Rp 135.000',
    kategori: 'Buket Boneka',
    harga: 135000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket boneka/harga-135k/20250629_141123.jpg',
    gambarLain: ["Assets/Kategori buket boneka/harga-135k/20250724_081301.jpg","Assets/Kategori buket boneka/harga-135k/IMG_20260524_090916.jpg","Assets/Kategori buket boneka/harga-135k/IMG_20260524_091109.jpg","Assets/Kategori buket boneka/harga-135k/IMG_20260618_091603.jpg","Assets/Kategori buket boneka/harga-135k/IMG-20260625-WA0010.jpg","Assets/Kategori buket boneka/harga-135k/IMG-20260818-WA0014.jpg"],
  },
  {
    id: 'prod-012',
    nama: 'Buket Boneka – Rp 150.000',
    kategori: 'Buket Boneka',
    harga: 150000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket boneka/hraga-150k/20250325_143937.jpg',
    gambarLain: ["Assets/Kategori buket boneka/hraga-150k/20250325_144231.jpg","Assets/Kategori buket boneka/hraga-150k/20250430_092154.jpg","Assets/Kategori buket boneka/hraga-150k/20250520_183911.jpg","Assets/Kategori buket boneka/hraga-150k/20250520_183939.jpg","Assets/Kategori buket boneka/hraga-150k/20250710_200322.jpg","Assets/Kategori buket boneka/hraga-150k/20250904_211924.jpg","Assets/Kategori buket boneka/hraga-150k/20250904_212035.jpg","Assets/Kategori buket boneka/hraga-150k/20250905_163437.jpg","Assets/Kategori buket boneka/hraga-150k/20251223_112332.jpg","Assets/Kategori buket boneka/hraga-150k/20251223_112356.jpg","Assets/Kategori buket boneka/hraga-150k/20251223_161356.jpg","Assets/Kategori buket boneka/hraga-150k/20251223_165109.jpg","Assets/Kategori buket boneka/hraga-150k/20260210_185406.jpg","Assets/Kategori buket boneka/hraga-150k/20260322_102929.jpg"],
  },
  {
    id: 'prod-013',
    nama: 'Butterfly LED – Rp 85.000',
    kategori: 'Butterfly LED',
    harga: 85000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori Buket butterfly LED/harga-85k/20250228_092753.jpg',
    gambarLain: ["Assets/Kategori Buket butterfly LED/harga-85k/20250228_092922.jpg","Assets/Kategori Buket butterfly LED/harga-85k/20250304_220112.jpg","Assets/Kategori Buket butterfly LED/harga-85k/20250422_093937.jpg","Assets/Kategori Buket butterfly LED/harga-85k/20250520_183325.jpg","Assets/Kategori Buket butterfly LED/harga-85k/20260114_170557.jpg","Assets/Kategori Buket butterfly LED/harga-85k/20260224_053434.jpg"],
  },
  {
    id: 'prod-014',
    nama: 'Butterfly LED – Rp 200.000',
    kategori: 'Butterfly LED',
    harga: 200000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori Buket butterfly LED/harga-200k/20250522_212319.jpg',
    gambarLain: ["Assets/Kategori Buket butterfly LED/harga-200k/20251216_192022.jpg"],
  },
  {
    id: 'prod-015',
    nama: 'Buket Papan – Rp 75.000',
    kategori: 'Buket Papan',
    harga: 75000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket papan/harga-75k/20250618_113805.jpg',
    gambarLain: ["Assets/Kategori buket papan/harga-75k/20250618_115440.jpg","Assets/Kategori buket papan/harga-75k/20250618_120329.jpg","Assets/Kategori buket papan/harga-75k/20250618_122224.jpg","Assets/Kategori buket papan/harga-75k/20250718_105839.jpg","Assets/Kategori buket papan/harga-75k/20250718_213258.jpg","Assets/Kategori buket papan/harga-75k/20250722_230606.jpg","Assets/Kategori buket papan/harga-75k/20250722_231404.jpg","Assets/Kategori buket papan/harga-75k/20250723_184205.jpg"],
  },
  {
    id: 'prod-016',
    nama: 'Buket Satin – Rp 90.000',
    kategori: 'Buket Satin',
    harga: 90000,
    skemaHarga: 'satin-glitter', // [ASUMSI] skema buket satin
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket satin/harga-90k/IMG_20260601_080236.jpg',
    gambarLain: ["Assets/Kategori buket satin/harga-90k/IMG_20260610_082436.jpg","Assets/Kategori buket satin/harga-90k/IMG_20260612_100900.jpg","Assets/Kategori buket satin/harga-90k/IMG_20260612_101139.jpg","Assets/Kategori buket satin/harga-90k/IMG_20260612_101228.jpg","Assets/Kategori buket satin/harga-90k/IMG_20260625_120534.jpg","Assets/Kategori buket satin/harga-90k/IMG_20260706_092211.jpg","Assets/Kategori buket satin/harga-90k/IMG_20260807_100941.jpg","Assets/Kategori buket satin/harga-90k/IMG-20260819-WA0010.jpg","Assets/Kategori buket satin/harga-90k/IMG_20260823_133206.jpg","Assets/Kategori buket satin/harga-90k/IMG-20260913-WA0000.jpg","Assets/Kategori buket satin/harga-90k/IMG_20260915_095840.jpg","Assets/Kategori buket satin/harga-90k/IMG_20260915_100204.jpg"],
  },
  {
    id: 'prod-017',
    nama: 'Buket Satin – Rp 115.000',
    kategori: 'Buket Satin',
    harga: 115000,
    skemaHarga: 'satin-glitter', // [ASUMSI] skema buket satin
    tambahanDefault: { 'kupu-kupu': 1, mahkota: 1 },
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket satin/harga-115k/IMG_20260611_101931.jpg',
    gambarLain: ["Assets/Kategori buket satin/harga-115k/IMG_20261002_080228.jpg"],
  },
  {
    id: 'prod-018',
    nama: 'Buket Satin – Rp 125.000',
    kategori: 'Buket Satin',
    harga: 125000,
    skemaHarga: 'satin-glitter', // [ASUMSI] skema buket satin
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket satin/harga-125k/IMG_20260802_183826.jpg',
    gambarLain: ["Assets/Kategori buket satin/harga-125k/IMG_20260804_083652.jpg"],
  },
  {
    id: 'prod-019',
    nama: 'Buket Satin – Rp 150.000',
    kategori: 'Buket Satin',
    harga: 150000,
    skemaHarga: 'satin-glitter', // [ASUMSI] skema buket satin
    modelDefault: 'kriwil',
    tangkaiDefault: 12,
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket satin/harga-150k/IMG-20260526-WA0003.jpg',
    gambarLain: ["Assets/Kategori buket satin/harga-150k/IMG-20260531-WA0017.jpg","Assets/Kategori buket satin/harga-150k/IMG_20260619_095509.jpg","Assets/Kategori buket satin/harga-150k/IMG_20260619_095632.jpg","Assets/Kategori buket satin/harga-150k/IMG_20260720_074547.jpg","Assets/Kategori buket satin/harga-150k/IMG_20260724_072951.jpg","Assets/Kategori buket satin/harga-150k/IMG-20260904-WA0000.jpg","Assets/Kategori buket satin/harga-150k/IMG_20260912_163015.jpg"],
  },
  {
    id: 'prod-020',
    nama: 'Buket Satin – Rp 200.000',
    kategori: 'Buket Satin',
    harga: 200000,
    skemaHarga: 'satin-glitter', // [ASUMSI] skema buket satin
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket satin/harga-200k/IMG_20260703_083235.jpg',
    gambarLain: ["Assets/Kategori buket satin/harga-200k/IMG_20260709_075855.jpg","Assets/Kategori buket satin/harga-200k/IMG_20260727_083908.jpg"],
  },
  {
    id: 'prod-021',
    nama: 'Buket Uang – Rp 75.000',
    kategori: 'Buket Uang',
    skemaHarga: 'buket-uang', // [ASUMSI] skema jasa buket uang
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket uang/harga-75k/20250528_082507.jpg',
    gambarLain: ["Assets/Kategori buket uang/harga-75k/20250528_082520.jpg","Assets/Kategori buket uang/harga-75k/IMG_20260423_071041.jpg","Assets/Kategori buket uang/harga-75k/IMG_20260509_133317.jpg","Assets/Kategori buket uang/harga-75k/IMG-20260620-WA0005.jpg","Assets/Kategori buket uang/harga-75k/IMG_20260622_212947.jpg","Assets/Kategori buket uang/harga-75k/IMG_20260727_083544.jpg"],
  },
  {
    id: 'prod-022',
    nama: 'Buket Uang – Rp 100.000',
    kategori: 'Buket Uang',
    skemaHarga: 'buket-uang', // [ASUMSI] skema jasa buket uang
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket uang/harga-100k/20250621_194950.jpg',
    gambarLain: ["Assets/Kategori buket uang/harga-100k/20250825_095348.jpg","Assets/Kategori buket uang/harga-100k/IMG_20260423_071247.jpg","Assets/Kategori buket uang/harga-100k/IMG-20260519-WA0010.jpg","Assets/Kategori buket uang/harga-100k/IMG_20260622_080505.jpg"],
  },
  {
    id: 'prod-023',
    nama: 'Buket Uang – Rp 135.000',
    kategori: 'Buket Uang',
    skemaHarga: 'buket-uang', // [ASUMSI] skema jasa buket uang
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket uang/harga-135k/20250831_100152.jpg',
    gambarLain: ["Assets/Kategori buket uang/harga-135k/20250831_100843.jpg","Assets/Kategori buket uang/harga-135k/20260310_103541.jpg"],
  },
  {
    id: 'prod-024',
    nama: 'Buket Uang – Rp 180.000',
    kategori: 'Buket Uang',
    skemaHarga: 'buket-uang', // [ASUMSI] skema jasa buket uang
    tersedia: true,
    tambahanDefault: { bunga: 3 },
    gambarUtama: 'Assets/Kategori buket uang/harga-180k/20250424_112806.jpg',
    gambarLain: ["Assets/Kategori buket uang/harga-180k/20250522_165528.jpg","Assets/Kategori buket uang/harga-180k/20260518_164847.jpg"],
  },
  {
    id: 'prod-025',
    nama: 'Buket Uang – Rp 250.000',
    kategori: 'Buket Uang',
    skemaHarga: 'buket-uang', // [ASUMSI] skema jasa buket uang
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket uang/harga-250k/20250522_090521.jpg',
    gambarLain: [],
  },
  {
    id: 'prod-026',
    nama: 'Buket Valentine – Rp 55.000',
    kategori: 'Buket Valentine',
    harga: 55000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket valentine/harga-55k/20260214_190029.jpg',
    gambarLain: ["Assets/Kategori buket valentine/harga-55k/IMG_20260427_064143.jpg","Assets/Kategori buket valentine/harga-55k/IMG_20260427_064239.jpg","Assets/Kategori buket valentine/harga-55k/IMG_20260427_064429.jpg","Assets/Kategori buket valentine/harga-55k/IMG_20260427_064509.jpg"],
  },
  {
    id: 'prod-027',
    nama: 'Buket Valentine – Rp 135.000',
    kategori: 'Buket Valentine',
    harga: 135000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket valentine/harga-135k/20260113_180705.jpg',
    gambarLain: ["Assets/Kategori buket valentine/harga-135k/20260113_180846.jpg","Assets/Kategori buket valentine/harga-135k/20260127_093025.jpg","Assets/Kategori buket valentine/harga-135k/20260127_093237.jpg","Assets/Kategori buket valentine/harga-135k/20260129_102300.jpg","Assets/Kategori buket valentine/harga-135k/20260209_142105.jpg","Assets/Kategori buket valentine/harga-135k/20260209_142339.jpg","Assets/Kategori buket valentine/harga-135k/20260212_093947.jpg","Assets/Kategori buket valentine/harga-135k/20260212_094025.jpg"],
  },
  {
    id: 'prod-028',
    nama: 'Buket Valentine – Rp 185.000',
    kategori: 'Buket Valentine',
    harga: 185000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket valentine/harga-185k/20260131_133906.jpg',
    gambarLain: ["Assets/Kategori buket valentine/harga-185k/20260131_144201.jpg","Assets/Kategori buket valentine/harga-185k/20260131_144327.jpg","Assets/Kategori buket valentine/harga-185k/20260212_133037.jpg"],
  },
  {
    id: 'prod-029',
    nama: 'Buket Valentine – Rp 225.000',
    kategori: 'Buket Valentine',
    harga: 225000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket valentine/harga-225k/20260212_093848.jpg',
    gambarLain: ["Assets/Kategori buket valentine/harga-225k/20260214_112814.jpg"],
  },
  {
    id: 'prod-030',
    nama: 'Buket Valentine – Rp 250.000',
    kategori: 'Buket Valentine',
    harga: 250000,
    skemaHarga: 'tetap',
    tersedia: true,
    gambarUtama: 'Assets/Kategori buket valentine/harga-250k/20260131_134134.jpg',
    gambarLain: ["Assets/Kategori buket valentine/harga-250k/20260206_182054.jpg"],
  },
];

const FAQS = [
  { t: 'Bagaimana harga buket uang dihitung?', j: 'Pilih paket berdasarkan kapasitas maksimal lembar. Harga mengikuti kapasitas paket, bukan jumlah lembar sebenarnya; harga merupakan jasa rangkai dan belum termasuk uang.' },
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
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CONFIG,
    PRODUCTS,
    FAQS,
    KEUNGGULAN,
    HARGA
  };
}
