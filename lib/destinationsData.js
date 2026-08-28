// =============================================================
// DATA HALAMAN DESTINASI — satu object = satu halaman /tour/[slug]
// =============================================================
export const destinations = [
  // ============ DATA YANG SUDAH ADA ============
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

  // ============ 6 TAMBAHAN DESTINASI BARU (DIPINDAHKAN KE SINI) ============
  {
    slug: 'banyuwangi',
    name: 'Banyuwangi',
    metaTitle: 'Paket Tour Rombongan Banyuwangi | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rombongan ke Banyuwangi: De Djawatan, Kawah Ijen, dan destinasi alam lainnya. Itinerary custom, tour guide profesional, dukungan darurat 24 jam.',
    heroImage: '/photos/destinations/banyuwangi.jpg',
    intro:
      'Banyuwangi menawarkan wisata alam yang unik, dari hutan De Djawatan yang teduh hingga Kawah Ijen yang ikonik. Kami rancang rutenya sesuai minat dan stamina rombongan Anda.',
    highlights: [
      'De Djawatan — hutan pohon trembesi yang ikonik',
      'Kawah Ijen dan fenomena blue fire',
      'Pantai Pulau Merah dan Plengkung',
      'Kuliner khas Banyuwangi',
    ],
    idealFor: 'Rombongan pecinta alam, keluarga besar, dan komunitas hobi',
    faq: [
      {
        q: 'Apakah tour ke Kawah Ijen cocok untuk semua usia?',
        a: 'Trekking ke Kawah Ijen cukup menantang, sehingga kami sarankan cek kondisi fisik peserta dulu. Untuk rombongan dengan lansia atau anak kecil, itinerary bisa difokuskan ke destinasi yang lebih santai seperti De Djawatan.',
      },
    ],
  },
  {
    slug: 'labuan-bajo',
    name: 'Flores (Labuan Bajo)',
    metaTitle: 'Paket Tour Rombongan Labuan Bajo Flores | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rombongan ke Labuan Bajo, Flores: Pulau Komodo, snorkeling, dan pantai eksotis. Itinerary custom, tour guide profesional, dukungan darurat 24 jam.',
    heroImage: '/photos/destinations/labuan.jpg',
    intro:
      'Labuan Bajo di Flores adalah gerbang menuju Pulau Komodo dan gugusan pantai eksotis. Cocok untuk rombongan yang mencari pengalaman laut dan alam yang berbeda dari destinasi umum.',
    highlights: [
      'Pantai Labuan Bajo dan spot sunset',
      'Trip Pulau Komodo (opsional)',
      'Snorkeling di perairan sekitar',
      'Kuliner seafood khas NTT',
    ],
    idealFor: 'Rombongan pecinta laut, honeymoon group, komunitas diving/snorkeling',
    faq: [
      {
        q: 'Apakah paket sudah termasuk trip ke Pulau Komodo?',
        a: 'Trip Pulau Komodo bisa ditambahkan sebagai opsi terpisah karena biasanya butuh sewa kapal khusus — chat tim kami untuk paket lengkap termasuk Komodo.',
      },
    ],
  },
  {
    slug: 'malang',
    name: 'Malang',
    metaTitle: 'Paket Tour Rombongan Malang | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rombongan ke Malang: Batu Night Spectacular (BNS), wisata alam, dan kuliner khas. Itinerary custom, tour guide profesional, dukungan darurat 24 jam.',
    heroImage: '/photos/destinations/malang.jpg',
    intro:
      'Malang dan Batu menawarkan wisata malam yang seru seperti BNS, udara sejuk pegunungan, dan beragam wahana keluarga. Sebagai basis kami di Malang, rute di sini kami kuasai luar-dalam.',
    highlights: [
      'Batu Night Spectacular (BNS)',
      'Wisata alam dan kebun apel',
      'Jatim Park & wahana keluarga',
      'Kuliner khas Malang',
    ],
    idealFor: 'Rombongan sekolah, keluarga besar, outing kantor',
    faq: [
      {
        q: 'Apakah Kresna Bayu Tour berbasis di Malang?',
        a: 'Ya, kantor kami berada di Malang, sehingga kami sangat menguasai rute dan destinasi di Malang Raya (Batu, Malang Kota, sekitarnya).',
      },
    ],
  },
  {
    slug: 'jakarta',
    name: 'Jakarta',
    metaTitle: 'Paket Tour Rombongan Jakarta | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rombongan ke Jakarta: Sea World, Ancol, dan destinasi kota lainnya. Itinerary custom, tour guide profesional, dukungan darurat 24 jam.',
    heroImage: '/photos/destinations/antasena-tunnel.jpg',
    intro:
      'Jakarta menawarkan wisata edukasi dan hiburan keluarga, dari Sea World hingga kawasan Ancol. Cocok untuk rombongan sekolah maupun outing kantor.',
    highlights: [
      'Sea World Ancol',
      'Kawasan wisata Ancol lainnya',
      'Wisata edukasi museum',
      'Kuliner khas Jakarta',
    ],
    idealFor: 'Rombongan sekolah, study tour, outing kantor',
    faq: [
      {
        q: 'Apakah cocok untuk study tour sekolah dari luar kota?',
        a: 'Sangat cocok — kami menangani logistik lengkap termasuk transportasi antar kota, akomodasi, dan itinerary edukatif untuk rombongan sekolah.',
      },
    ],
  },
  {
    slug: 'semarang',
    name: 'Semarang',
    metaTitle: 'Paket Tour Rombongan Semarang | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rombongan ke Semarang: Lawang Sewu dan wisata sejarah lainnya. Itinerary custom, tour guide profesional, dukungan darurat 24 jam.',
    heroImage: '/photos/destinations/lawangsewu.jpg',
    intro:
      'Semarang kaya akan bangunan bersejarah, dengan Lawang Sewu sebagai ikonnya. Cocok untuk rombongan yang tertarik wisata sejarah dan budaya kolonial.',
    highlights: [
      'Lawang Sewu',
      'Kota Lama Semarang',
      'Wisata kuliner khas Semarang',
      'Klenteng Sam Poo Kong',
    ],
    idealFor: 'Rombongan sekolah, pecinta sejarah, keluarga besar',
    faq: [
      {
        q: 'Apakah ada pemandu yang menjelaskan sejarah Lawang Sewu?',
        a: 'Ya, kami menyediakan tour guide yang bisa menjelaskan latar sejarah setiap destinasi, termasuk Lawang Sewu dan Kota Lama.',
      },
    ],
  },
  {
    slug: 'banjarmasin',
    name: 'Banjarmasin',
    metaTitle: 'Paket Tour Rombongan Banjarmasin | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rombongan ke Banjarmasin: Pasar Apung dan wisata sungai khas Kalimantan Selatan. Itinerary custom, tour guide profesional, dukungan darurat 24 jam.',
    heroImage: '/photos/destinations/banjar.jpg',
    intro:
      'Banjarmasin menawarkan pengalaman unik menyusuri Pasar Apung di pagi hari, khas budaya sungai Kalimantan Selatan yang tidak ada duanya.',
    highlights: [
      'Pasar Apung (wisata pagi hari di atas sungai)',
      'Susur sungai Martapura',
      'Kuliner khas Banjar',
      'Wisata budaya lokal',
    ],
    idealFor: 'Rombongan yang mencari pengalaman budaya unik, komunitas fotografi',
    faq: [
      {
        q: 'Jam berapa sebaiknya berangkat ke Pasar Apung?',
        a: 'Pasar Apung paling ramai dan otentik di pagi hari sebelum jam 7, jadi rombongan biasanya kami jadwalkan berangkat subuh untuk pengalaman terbaik.',
      },
    ],
  },
]; // <-- TUTUP ARRAY DI SINI

// =============================================================
// FUNGSI GET BY SLUG (HARUS BERADA DI BAWAH ARRAY)
// =============================================================
export function getDestinationBySlug(slug) {
  return destinations.find((d) => d.slug === slug);
}
