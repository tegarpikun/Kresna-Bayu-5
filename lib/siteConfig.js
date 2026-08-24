// =============================================================
// SEMUA PENGATURAN UTAMA SITUS ADA DI SINI.
// Ganti nilai di bawah ini sesuai brand tour & travel Anda.
// =============================================================
export const siteConfig = {
  brandName: 'Kresna Bayu Tour&Travel',
  tagline: 'Melayani Sepenuh Hati',
  metaTitle: 'Kresna Bayu Tour | Total Service Tour',
  metaDescription:
    'Tour Rombongan Terbaik se-Indonesia.',

  // Nomor WhatsApp WAJIB pakai format internasional TANPA tanda "+", spasi, atau strip.
  // Contoh nomor Indonesia 0812-3456-7890 -> ditulis 6281234567890
  whatsappNumber: '6281334499505',
  whatsappDefaultMessage:
    'Halo Kresna Bayu Tour, saya tertarik untuk merencanakan perjalanan bersama rombongan. Apakah bisa dibantu?',

  hero: {
    eyebrow: 'Ini adalah perjalanan Kresna Bayu Tour',
    title: 'Selama 26\nTahun',
    subtitle:
      'Dalam memberikan layanan Tour Rombongan paling totalitas se-Indonesia.',
  },

  chapters: [
    {
      eyebrow: 'Begitu Banyak Cerita',
      title: 'Telah diLalui bersama',
    },
    {
      eyebrow: 'Lebih dari ratusan client di Google review',
      title: 'sangat senang mengikuti tour bersama kami',
    },
    {
      eyebrow: 'Dalam ratusan pengalaman itu, Kami menyadari',
      title: 'Kalau anda cari totalitas kamilah jawabannya',
    },
  ],

  // === Konten bagian statis (setelah pengalaman sinematik selesai) ===
  journeySection: {
    eyebrow: 'Mengapa anda harus memilih Kresna Bayu Tour&Travel???',
    title: 'Karena setiap rangkaian anda dirancang oleh ahlinya',
    body: 'Kami merancang setiap rute bukan sekadar daftar tempat, tapi rangkaian momen yang layak dikenang. Dari destinasi tersembunyi hingga pengalaman lokal otentik, tim kami memastikan setiap detail berjalan mulus.',
    features: [
      {
        title: 'Itinerary Disusun oleh Ahlinya',
        desc: 'Mengutamakan pelanggan, Itinerary kami susun sesuai minat anda oleh Tim ahli',
      },
      {
        title: 'Dokumentasi Profesional',
        desc: 'Dokumentasi kami menggunakan fotografer dan Videografer Profesional',
      },
      {
        title: 'Layanan Totalitas End-to-End Tour Guide',
        desc: 'Tour Guide yang asik, hingga dukungan darurat 24 jam selama perjalanan membuat pelanggan bisa lebih merasa aman di perjalanan.',
      },
    ],
    destinationsTitle: 'Destinasi Favorit',
    testimonialsTitle: 'Kata Mereka',
    faqTitle: 'Yang Sering Ditanyakan',
    faq: [
      {
        q: 'Apa saja yang sudah termasuk dalam paket?',
        a: 'Transportasi PP, akomodasi sesuai paket, konsumsi selama trip, tiket masuk destinasi, dan pemandu lokal. Detail lengkap per paket bisa ditanyakan langsung ke tim kami via WhatsApp.',
      },
      {
        q: 'Berapa minimal peserta untuk rombongan?',
        a: 'Kami melayani mulai dari grup kecil hingga rombongan besar (sekolah, kantor, keluarga besar). Minimal peserta dan harga per orang menyesuaikan jumlah rombongan - chat kami untuk penawaran sesuai jumlah rombongan Anda.',
      },
      {
        q: 'Apakah itinerary bisa disesuaikan?',
        a: 'Bisa. Rute, durasi, dan destinasi bisa disusun ulang sesuai minat dan anggaran rombongan Anda - bukan paket generik yang kaku.',
      },
      {
        q: 'Bagaimana kalau ada kendala saat perjalanan?',
        a: 'Tim kami menyediakan dukungan darurat 24 jam selama trip berlangsung, jadi rombongan tetap terurus dari berangkat sampai pulang.',
      },
    ],
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

  endingHeadline: 'Perjalanan Anda Menanti',
  endingSub:
    'Setiap destinasi punya cerita. Biarkan kami membawa Anda ke sana mulai obrolan dengan tim kami sekarang.',
  ctaLabel: 'Mulai Rencanakan Perjalanan',
  creditLine: 'Bersama Kresna Bayu Tour',

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
    { name: 'BCA', src: '/logo/bca_Putih.png' },
    { name: 'PT.Pindad', src: '/logo/pindad.png' },
    { name: 'PT.Pelni' },
    { name: 'Mitra Kasih School', src: '/logo/mitra.png' },
    { name: 'Pemkab.Kediri' },
    { name: 'Kompas' },
  ],
};

export function buildWhatsappLink(customMessage) {
  const message = encodeURIComponent(
    customMessage || siteConfig.whatsappDefaultMessage
  );
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
}
