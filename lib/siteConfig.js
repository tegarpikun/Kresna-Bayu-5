// =============================================================
// SEMUA PENGATURAN UTAMA SITUS ADA DI SINI.
// Ganti nilai di bawah ini sesuai brand tour & travel Anda.
// =============================================================
export const siteConfig = {
  brandName: 'ANTARA JOURNEYS',
  tagline: 'A Cinematic Tour & Travel Experience',
  metaTitle: 'Antara Journeys | Cinematic Tour & Travel',
  metaDescription:
    'Jelajahi destinasi impian Anda lewat pengalaman visual sinematik. Antara Journeys — perjalanan yang membekas, bukan sekadar liburan.',

  // Nomor WhatsApp WAJIB pakai format internasional TANPA tanda "+", spasi, atau strip.
  // Contoh nomor Indonesia 0812-3456-7890 -> ditulis 6281234567890
  whatsappNumber: '6281234567890',
  whatsappDefaultMessage:
    'Halo Antara Journeys, saya tertarik untuk merencanakan perjalanan. Bisa dibantu?',

  hero: {
    eyebrow: 'A Cinematic Tour & Travel Experience',
    title: 'ANTARA\nJOURNEYS',
    subtitle:
      'Setiap perjalanan adalah cerita. Gulir layar untuk membuka babak demi babak, seperti pembuka sebuah film layar lebar.',
  },

  chapters: [
    {
      eyebrow: 'Babak Satu',
      title: 'Titik Berangkat',
    },
    {
      eyebrow: 'Babak Dua',
      title: 'Jejak Perjalanan',
    },
    {
      eyebrow: 'Babak Tiga',
      title: 'Puncak Cerita',
    },
  ],

  // === Konten bagian statis (setelah pengalaman sinematik selesai) ===
  journeySection: {
    eyebrow: 'Mengapa Antara Journeys',
    title: 'Perjalanan yang Direncanakan Sepenuh Hati',
    body: 'Kami merancang setiap rute bukan sekadar daftar tempat, tapi rangkaian momen yang layak dikenang. Dari destinasi tersembunyi hingga pengalaman lokal otentik, tim kami memastikan setiap detail berjalan mulus.',
    features: [
      {
        title: 'Rute Kurasi Personal',
        desc: 'Itinerary disusun sesuai minat, waktu, dan anggaran Anda — bukan paket generik.',
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
        role: 'Traveler, Trip Bromo',
      },
      {
        quote:
          'Pemandunya sangat paham lokasi tersembunyi yang tidak ada di itinerary biasa.',
        name: 'Raka P.',
        role: 'Traveler, Trip Labuan Bajo',
      },
    ],
  },

  endingHeadline: 'Perjalanan Anda Menanti',
  endingSub:
    'Setiap destinasi punya cerita. Biarkan kami membawa Anda ke sana — mulai obrolan dengan tim kami sekarang.',
  ctaLabel: 'Mulai Rencanakan Perjalanan',
  creditLine: 'A Cinematic Journey by Antara Journeys',

  // Ganti "url" dengan link profil media sosial Anda yang sesungguhnya.
  socialLinks: [
    { name: 'Instagram', url: 'https://instagram.com/antarajourneys' },
    { name: 'TikTok', url: 'https://tiktok.com/@antarajourneys' },
    { name: 'YouTube', url: 'https://youtube.com/@antarajourneys' },
    { name: 'Facebook', url: 'https://facebook.com/antarajourneys' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/antarajourneys' },
  ],

  // Logo mitra/klien yang berjalan otomatis di bawah section "Kata Mereka".
  // Ini masih PLACEHOLDER teks — ganti "name" dengan nama mitra asli, atau
  // lihat catatan di LogoMarquee.js untuk memakai gambar logo sungguhan.
  partnerLogos: [
    { name: 'Garuda Partner' },
    { name: 'Nusantara Hotels' },
    { name: 'Pelni Cruise' },
    { name: 'Java Rail' },
    { name: 'Wanderlust Media' },
    { name: 'Kompas Travel' },
  ],
};

export function buildWhatsappLink(customMessage) {
  const message = encodeURIComponent(
    customMessage || siteConfig.whatsappDefaultMessage
  );
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
}
