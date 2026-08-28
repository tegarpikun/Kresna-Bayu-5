// =============================================================
// DATA ARTIKEL BLOG — satu object = satu artikel di /blog/[slug]
// Tambahkan artikel baru dengan copy salah satu object di bawah.
// Fokus judul & isi pada PERTANYAAN yang benar-benar dicari orang
// di Google (long-tail keyword) - ini yang paling mudah ranking
// dibanding kata kunci umum seperti "tour Indonesia".
// =============================================================
export const blogPosts = [
  {
    slug: 'itinerary-3-hari-bali-rombongan',
    title: 'Itinerary 3 Hari Bali untuk Rombongan: Contoh Rute Lengkap',
    metaDescription:
      'Contoh itinerary 3 hari 2 malam tour rombongan ke Bali: rute harian, estimasi waktu, dan tips memilih destinasi sesuai jumlah peserta.',
    excerpt:
      'Bingung menyusun rute Bali untuk rombongan besar? Ini contoh itinerary 3 hari yang sudah terbukti efektif untuk grup sekolah maupun kantor.',
    publishedDate: '2026-08-28',
    relatedDestinationSlug: 'bali',
    content: [
      {
        heading: 'Hari 1: Kedatangan dan Kawasan Selatan',
        body: 'Setelah tiba di bandara, rombongan langsung menuju penginapan untuk istirahat singkat. Sore harinya, kunjungi Pantai Pandawa untuk menikmati suasana pantai dengan tebing kapur khas, dilanjutkan makan malam seafood di kawasan Jimbaran.',
      },
      {
        heading: 'Hari 2: Budaya dan Alam Ubud',
        body: 'Hari kedua difokuskan ke kawasan Ubud: mengunjungi Alas Harum untuk swing dan sawah terasering Tegalalang, dilanjutkan mampir ke pusat kerajinan lokal. Malam hari, rombongan bisa menikmati pertunjukan tari tradisional.',
      },
      {
        heading: 'Hari 3: Belanja dan Kepulangan',
        body: 'Sebelum kembali ke bandara, waktu pagi bisa dipakai untuk berbelanja oleh-oleh khas Bali di kawasan Sukawati atau Kuta, tergantung jadwal penerbangan rombongan.',
      },
      {
        heading: 'Tips Menyesuaikan Itinerary',
        body: 'Itinerary di atas adalah contoh dasar - rute sebenarnya kami sesuaikan dengan jumlah peserta, anggaran, dan minat rombongan (misalnya lebih fokus wisata alam, religi, atau edukasi). Semakin awal booking, semakin leluasa kami menyusun rute terbaik.',
      },
    ],
    faq: [
      {
        q: 'Apakah itinerary 3 hari cukup untuk menjelajah Bali?',
        a: '3 hari cukup untuk mencakup destinasi utama di kawasan selatan dan Ubud. Untuk mencakup area utara atau timur Bali juga, kami sarankan 4-5 hari.',
      },
    ],
  },
  {
    slug: 'biaya-tour-rombongan-sekolah-malang',
    title: 'Berapa Biaya Tour Rombongan Sekolah ke Malang? Ini Faktornya',
    metaDescription:
      'Panduan estimasi biaya tour rombongan sekolah ke Malang & Batu: faktor yang mempengaruhi harga per peserta dan tips menghemat anggaran study tour.',
    excerpt:
      'Merencanakan study tour ke Malang tapi belum tahu kisaran biayanya? Ini faktor-faktor yang menentukan harga per peserta.',
    publishedDate: '2026-08-28',
    relatedDestinationSlug: 'malang',
    content: [
      {
        heading: 'Faktor yang Mempengaruhi Harga',
        body: 'Harga per peserta tour rombongan sekolah ke Malang dipengaruhi beberapa hal: jumlah peserta (semakin banyak biasanya semakin efisien per orang), pilihan destinasi (BNS, Jatim Park, atau kombinasi keduanya), jenis akomodasi, dan durasi trip.',
      },
      {
        heading: 'Komponen yang Biasanya Termasuk',
        body: 'Paket tour rombongan sekolah umumnya sudah mencakup transportasi PP, tiket masuk destinasi, konsumsi selama trip, dan pemandu lokal. Detail lengkap bisa berbeda tergantung kesepakatan dengan pihak sekolah.',
      },
      {
        heading: 'Tips Menghemat Anggaran Study Tour',
        body: 'Booking jauh-jauh hari (idealnya 1-2 bulan sebelum keberangkatan), memilih musim di luar liburan sekolah nasional, dan menyesuaikan jumlah destinasi dengan durasi trip adalah cara efektif menekan biaya tanpa mengurangi kualitas pengalaman siswa.',
      },
    ],
    faq: [
      {
        q: 'Apakah harga per siswa berbeda dengan harga untuk guru pendamping?',
        a: 'Biasanya struktur harga sama untuk semua peserta, kecuali ada kebutuhan khusus. Detail lengkap kami jelaskan saat konsultasi via WhatsApp sesuai jumlah rombongan.',
      },
    ],
  },
  {
    slug: 'tips-memilih-jasa-tour-rombongan',
    title: '7 Tips Memilih Jasa Tour Rombongan yang Terpercaya',
    metaDescription:
      'Panduan memilih jasa tour rombongan yang aman dan terpercaya untuk sekolah, kantor, atau keluarga besar - dari legalitas sampai dukungan darurat.',
    excerpt:
      'Banyak pilihan jasa tour rombongan, tapi tidak semua terpercaya. Ini 7 hal yang wajib dicek sebelum booking.',
    publishedDate: '2026-08-28',
    relatedDestinationSlug: null,
    content: [
      {
        heading: '1. Cek Rekam Jejak dan Review',
        body: 'Cari tahu sudah berapa lama operator tour beroperasi dan bagaimana review dari pelanggan sebelumnya, baik di Google Maps maupun media sosial.',
      },
      {
        heading: '2. Kejelasan Itinerary',
        body: 'Operator terpercaya biasanya bersedia menjelaskan rute secara detail dan terbuka untuk penyesuaian, bukan memaksakan paket generik.',
      },
      {
        heading: '3. Transparansi Harga',
        body: 'Pastikan tidak ada biaya tersembunyi - tanyakan komponen apa saja yang termasuk dalam harga paket sejak awal.',
      },
      {
        heading: '4. Dukungan Darurat Selama Trip',
        body: 'Operator yang serius biasanya menyediakan kontak darurat 24 jam selama perjalanan berlangsung, bukan hanya sampai keberangkatan.',
      },
      {
        heading: '5. Pengalaman Menangani Rombongan Besar',
        body: 'Menangani rombongan besar (puluhan hingga ratusan orang) butuh koordinasi logistik yang berbeda dari perjalanan individu - pastikan operator punya pengalaman relevan.',
      },
      {
        heading: '6. Kemudahan Komunikasi',
        body: 'Respons cepat dan jelas saat konsultasi awal (biasanya via WhatsApp) adalah indikator bagaimana pelayanan akan berjalan selama trip.',
      },
      {
        heading: '7. Legalitas dan Kemitraan',
        body: 'Operator yang sudah dipercaya institusi (sekolah, perusahaan) biasanya lebih teruji dari sisi legalitas dan konsistensi pelayanan.',
      },
    ],
    faq: [],
  },
];

export function getBlogPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug);
}
