// =============================================================
// SEMUA PENGATURAN UTAMA SITUS ADA DI SINI.
// Ganti nilai di bawah ini sesuai brand tour & travel Anda.
// =============================================================
export const siteConfig = {
  brandName: 'Kresna Bayu Tour&Travel',
  tagline: 'Total Service Tour',
  metaTitle: 'Kresna Bayu Tour | Total Service Tour',
  metaDescription:
    'Tour Rombongan Terbaik se-Indonesia.',

  // Nomor WhatsApp WAJIB pakai format internasional TANPA tanda "+", spasi, atau strip.
  // Contoh nomor Indonesia 0812-3456-7890 -> ditulis 6281234567890
  whatsappNumber: '6281334499505',
  whatsappDefaultMessage:
    'Halo Kresna Bayu Tour, saya tertarik untuk merencanakan perjalanan bersama rombongan. Apakah bisa dibantu?',

  hero: {
    eyebrow: 'Kisah Perjalanan kami',
    title: 'Selama 26\nTahun',
    subtitle:
      'Hadir untuk memberikan layanan Tour Rombongan terbaik.',
  },

  chapters: [
    {
      eyebrow: 'Begitu Banyak Cerita',
      title: 'Telah diLalui bersama',
    },
    {
      eyebrow: 'Memberi pengalaman Liburan terbaik',
      title: 'Untuk lebih dari 1000 rombongan',
    },
    {
      eyebrow: 'Dalam kenangan yang tidak terulang dan ribuan pengalaman, Kami menyadari',
      title: 'Memberikan yang terbaik lebih penting daripada menjual harga murah',
    },
  ],

  // === Konten bagian statis (setelah pengalaman sinematik selesai) ===
  journeySection: {
    eyebrow: 'Mengapa anda harus memilih Kresna Bayu Tour&Travel',
    title: 'Karena setiap rangkaian anda dirancang oleh ahlinya',
    body: 'Kami merancang setiap rute bukan sekadar daftar tempat, tapi rangkaian momen yang layak dikenang. Dari destinasi tersembunyi hingga pengalaman lokal otentik, tim kami memastikan setiap detail berjalan mulus.',
    features: [
      {
        title: 'Rute Kurasi Personal',
        desc: 'Itinerary disusun sesuai minat, waktu, dan anggaran Anda bukan paket generik.',
      },
      {
        title: 'Pemandu Lokal Berpengalaman',
        desc: 'Didampingi pemandu yang memahami budaya dan medan setempat secara mendalam.',
      },
      {
        title: 'Layanan End-to-End',
        desc: 'Dari transportasi, akomodasi, hingga dukungan darurat 24 jam selama perjalanan.',
      },
    ],
    destinationsTitle: 'Destinasi Favorit',
    testimonialsTitle: 'Kata Mereka',
    testimonials: [
      {
        quote:
          'Perjalanan paling rapi yang pernah saya ikuti. Semua detail diurus, saya tinggal menikmati.',
        name: 'Dinda A.',
        role: 'Head Office Ciputra Group, Trip Bromo',
      },
      {
        quote:
          'Pemandunya sangat paham lokasi tersembunyi yang tidak ada di itinerary biasa.',
        name: 'Raka P.',
        role: 'CEO BCA Group, Trip Labuan Bajo',
      },
    ],
  },

  endingHeadline: 'Kresna Bayu Tour solusinya',
  endingSub:
    'Mau rencanakan mulai dari sekarang? QNA',
  ctaLabel: 'Mulai Rencanakan Perjalanan',
  creditLine: 'A Cinematic Journey by Kresna Bayu Tour And Travel',

  // Ganti "url" dengan link profil media sosial Anda yang sesungguhnya.
  socialLinks: [
    { name: 'Instagram', url: 'https://instagram.com/kresnabayu' },
    { name: 'TikTok', url: 'https://tiktok.com/@kresnabayu' },
    { name: 'YouTube', url: 'https://youtube.com/@kresnabayu' },
    { name: 'Facebook', url: 'https://facebook.com/kresnabayu' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/kresnabayu' },
  ],

  // Logo mitra/klien yang berjalan otomatis di bawah section "Kata Mereka".
  // Ini masih PLACEHOLDER teks — ganti "name" dengan nama mitra asli, atau
  // lihat catatan di LogoMarquee.js untuk memakai gambar logo sungguhan.
  partnerLogos: [
    { name: 'BCA' },
    { name: 'PT.Pindad' },
    { name: 'PT.Pelni' },
    { name: 'Mitra Kasih School' },
    { name: 'Pemkab.Kediri' },
    { name: 'Kompas Travel' },
  ],
};

export function buildWhatsappLink(customMessage) {
  const message = encodeURIComponent(
    customMessage || siteConfig.whatsappDefaultMessage
  );
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
}
