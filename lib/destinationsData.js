// =============================================================
// DATA HALAMAN DESTINASI — satu object = satu halaman /tour/[slug]
// Tambahkan destinasi baru dengan copy salah satu object di bawah,
// lalu ganti isinya. "slug" akan jadi bagian URL, contoh:
// slug: 'bali' -> https://www.kresnabayutour.co.id/tour/bali
// =============================================================
export const destinations = [
  {
    slug: 'bali',
    name: 'Bali',
    metaTitle: 'Paket Tour Rombongan Bali | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rombongan ke Bali: itinerary custom, transportasi PP, akomodasi, tour guide 24 jam. Cocok untuk sekolah, kantor, dan keluarga besar. Chat WhatsApp untuk penawaran.',
    heroImage: '/photos/destinations/bali.jpg',
    intro:
      'Bali menawarkan perpaduan pantai, budaya, dan spot foto ikonik seperti Alas Harum yang cocok untuk rombongan besar maupun kecil. Kresna Bayu Tour menyusun itinerary Bali sesuai minat dan anggaran rombongan Anda — bukan paket generik yang kaku.',
    highlights: [
      'Alas Harum & sawah terasering Tegalalang',
      'Pantai Pandawa dan Uluwatu saat sunset',
      'Desa wisata & pusat kerajinan lokal',
      'Kuliner khas Bali untuk rombongan besar',
    ],
    idealFor: 'Rombongan sekolah, kantor, keluarga besar, dan grup komunitas',
    faq: [
      {
        q: 'Berapa lama waktu ideal tour rombongan ke Bali?',
        a: 'Paket 3-4 hari paling umum untuk rombongan, tapi itinerary bisa disesuaikan mulai dari 2 hari hingga lebih dari seminggu tergantung kebutuhan.',
      },
      {
        q: 'Apakah harga per orang bisa berubah sesuai jumlah rombongan?',
        a: 'Ya, harga per orang menyesuaikan jumlah peserta — semakin besar rombongan biasanya semakin efisien. Chat tim kami untuk penawaran sesuai jumlah rombongan Anda.',
      },
    ],
  },
  {
    slug: 'yogyakarta',
    name: 'Yogyakarta',
    metaTitle: 'Paket Tour Rombongan Yogyakarta | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rombongan ke Yogyakarta: Keraton, Malioboro, dan destinasi budaya lainnya. Itinerary custom, tour guide profesional, dukungan darurat 24 jam.',
    heroImage: '/photos/destinations/jogja.jpg',
    intro:
      'Yogyakarta adalah destinasi favorit untuk rombongan yang ingin memadukan wisata budaya dan belanja. Dari Keraton Yogyakarta hingga Malioboro, kami rancang rutenya sesuai minat rombongan Anda.',
    highlights: [
      'Keraton Yogyakarta dan kawasan Malioboro',
      'Candi Borobudur & Prambanan',
      'Kuliner malam khas Jogja',
      'Pusat oleh-oleh dan kerajinan lokal',
    ],
    idealFor: 'Rombongan sekolah, study tour, keluarga besar',
    faq: [
      {
        q: 'Apakah tour Yogyakarta cocok untuk study tour sekolah?',
        a: 'Sangat cocok — kami sering menangani rombongan study tour sekolah dengan itinerary edukatif yang memadukan sejarah, budaya, dan hiburan.',
      },
    ],
  },
  // Tambahkan destinasi lain di sini: Banyuwangi, Flores, Malang, Jakarta,
  // Semarang, Banjarmasin — format sama seperti di atas.
];

export function getDestinationBySlug(slug) {
  return destinations.find((d) => d.slug === slug);
}
