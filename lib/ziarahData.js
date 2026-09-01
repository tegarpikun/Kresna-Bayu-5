// =============================================================
// DATA HALAMAN ZIARAH KATOLIK — pola sama seperti destinationsData.js
// slug -> URL: /ziarah-katolik/[slug]
//
// CATATAN: 4 entri paling bawah (Sendang Purwaningsih, Pasionis,
// Karmel Ngadireso, Regina Pacis) baru ditambahkan untuk menargetkan
// keyword lokal "gua maria Malang" / "ziarah dekat Malang" — ini
// destinasi yang secara lokasi ada di Kabupaten/Kota Malang sendiri,
// jadi persaingan SEO-nya lebih rendah dibanding keyword nasional
// seperti "ziarah katolik" yang sudah dikuasai spesialis ziarah lama.
//
// GANTI heroImage di masing-masing entri baru dengan foto asli
// (upload ke /public/photos/ziarah/) sebelum publish — sekarang
// masih placeholder path.
// =============================================================
export const ziarahDestinations = [
  {
    slug: 'gua-maria-puhsarang',
    name: 'Gua Maria Lourdes Puhsarang, Kediri',
    metaTitle: 'Paket Ziarah Maria Puhsarang Kediri dari Malang | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rohani ziarah Maria ke Gua Maria Lourdes Puhsarang Kediri dari Malang. Transportasi rombongan, itinerary fleksibel, cocok untuk komunitas paroki atau keluarga.',
    heroImage: '/photos/ziarah/puhsarang.jpg',
    intro:
      'Gua Maria Lourdes Puhsarang di Kediri adalah salah satu tempat ziarah Maria paling dikenal di Jawa Timur, dengan arsitektur unik bergaya candi Jawa. Jaraknya relatif dekat dari Malang, cocok untuk ziarah sehari atau digabung dengan destinasi rohani lain.',
    highlights: [
      'Gua Maria dengan arsitektur khas Jawa yang unik',
      'Suasana tenang, cocok untuk doa dan renungan bersama rombongan',
      'Bisa digabung dengan kunjungan ke gereja tua di sekitar Kediri',
      'Akses relatif dekat dari Malang',
    ],
    idealFor: 'Komunitas paroki, keluarga besar, rombongan sekolah Katolik',
    faq: [
      {
        q: 'Berapa lama perjalanan dari Malang ke Puhsarang Kediri?',
        a: 'Perjalanan darat dari Malang ke Puhsarang biasanya memakan waktu sekitar 2-3 jam tergantung kondisi lalu lintas, sehingga bisa dijalankan sebagai ziarah sehari.',
      },
      {
        q: 'Apakah bisa digabung dengan destinasi ziarah lain dalam satu itinerary?',
        a: 'Bisa, itinerary dapat disesuaikan untuk menggabungkan beberapa tempat ziarah sekaligus sesuai waktu dan preferensi rombongan.',
      },
    ],
  },
  {
    slug: 'gua-maria-sendangsono',
    name: 'Gua Maria Sendangsono, Yogyakarta',
    metaTitle: 'Paket Ziarah Maria Sendangsono Yogyakarta dari Malang | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rohani ziarah Maria ke Gua Maria Sendangsono, Kulon Progo Yogyakarta dari Malang. Transportasi rombongan, pendampingan, cocok untuk komunitas paroki.',
    heroImage: '/photos/ziarah/sendangsono.jpg',
    intro:
      'Sendangsono adalah salah satu tempat ziarah Maria tertua dan paling bersejarah di Indonesia, terletak di kawasan perbukitan Kulon Progo, Yogyakarta. Suasananya asri dan teduh, sering jadi tujuan ziarah rombongan besar dari berbagai daerah.',
    highlights: [
      'Situs ziarah Maria bersejarah dengan nilai budaya tinggi',
      'Suasana perbukitan yang asri dan teduh',
      'Bisa digabung dengan destinasi wisata Yogyakarta lainnya',
      'Fasilitas memadai untuk rombongan besar',
    ],
    idealFor: 'Komunitas paroki, rombongan lintas kota, keluarga besar',
    faq: [
      {
        q: 'Apakah cocok digabung dengan wisata Yogyakarta lainnya?',
        a: 'Sangat cocok. Banyak rombongan menggabungkan ziarah ke Sendangsono dengan kunjungan ke destinasi budaya Yogyakarta lain dalam satu itinerary.',
      },
    ],
  },
  {
    slug: 'gereja-hati-kudus-ganjuran',
    name: 'Gereja Hati Kudus Tuhan Yesus Ganjuran, Yogyakarta',
    metaTitle: 'Paket Ziarah Ganjuran Yogyakarta dari Malang | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rohani ziarah ke Gereja Hati Kudus Tuhan Yesus Ganjuran, Bantul Yogyakarta dari Malang. Cocok untuk rombongan komunitas paroki dan keluarga.',
    heroImage: '/photos/ziarah/ganjuran.jpg',
    intro:
      'Ganjuran dikenal dengan arsitektur candi bergaya Jawa yang memadukan unsur budaya lokal dengan iman Katolik, menjadikannya salah satu destinasi ziarah yang unik secara budaya maupun spiritual.',
    highlights: [
      'Arsitektur candi Jawa yang memadukan budaya dan iman',
      'Suasana khidmat untuk doa dan renungan',
      'Bisa digabung dengan ziarah Sendangsono dalam satu perjalanan Yogyakarta',
    ],
    idealFor: 'Komunitas paroki, rombongan yang tertarik budaya dan spiritualitas',
    faq: [
      {
        q: 'Apakah Gereja Ganjuran bisa dikunjungi sebagai bagian dari ziarah sehari dari Malang?',
        a: 'Karena jaraknya cukup jauh dari Malang, Ganjuran biasanya digabung dengan destinasi ziarah Yogyakarta lain seperti Sendangsono dalam paket 2 hari 1 malam.',
      },
    ],
  },

  // =============================================================
  // DESTINASI BARU — Gua Maria di Malang (target keyword lokal)
  // =============================================================
  {
    slug: 'gua-maria-sendang-purwaningsih',
    name: 'Gua Maria Sendang Purwaningsih, Donomulyo Malang',
    metaTitle: 'Paket Ziarah Gua Maria Sendang Purwaningsih Malang | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rohani ziarah ke Gua Maria Sendang Purwaningsih di Donomulyo, Kabupaten Malang. Ziarah sehari rombongan paroki tanpa perlu keluar kota.',
    heroImage: '/photos/ziarah/sendang-purwaningsih.jpg',
    intro:
      'Gua Maria Sendang Purwaningsih adalah salah satu tempat ziarah Maria tertua di Malang, berlokasi di Desa Purworejo, Kecamatan Donomulyo. Berdiri sejak 1958 dan diresmikan kembali pada 1990 setelah sempat rusak akibat longsor, tempat ini menjadi tujuan ziarah umat Katolik dari berbagai paroki di sekitar Malang tanpa perlu menempuh perjalanan jauh keluar kota.',
    highlights: [
      'Lokasi masih dalam wilayah Kabupaten Malang, ideal untuk ziarah sehari tanpa menginap',
      'Suasana rimbun dan sunyi, jauh dari keramaian kota',
      'Dua rute Jalan Salib, salah satunya menyatu dengan jalan desa menuju Gereja Paroki Donomulyo',
      'Fasilitas pendopo dan panti samadi untuk kegiatan rohani rombongan',
    ],
    idealFor:
      'Rombongan paroki, komunitas doa, keluarga besar yang mencari ziarah sehari tanpa keluar kota Malang',
    faq: [
      {
        q: 'Berapa jarak Gua Maria Sendang Purwaningsih dari pusat Kota Malang?',
        a: 'Lokasinya berada di Kecamatan Donomulyo, sekitar 2-3 jam perjalanan darat dari pusat Kota Malang tergantung kondisi lalu lintas, melewati kawasan Kepanjen dan Bendungan Karangkates.',
      },
      {
        q: 'Apakah Gua Maria ini cocok untuk ziarah singkat rombongan paroki?',
        a: 'Sangat cocok. Karena masih berada dalam wilayah Malang, banyak rombongan menjadikannya destinasi ziarah sehari tanpa perlu menginap.',
      },
    ],
  },
  {
    slug: 'gua-maria-pasionis',
    name: 'Gua Maria Pasionis, Kalisongo Malang',
    metaTitle: 'Paket Ziarah Gua Maria Pasionis Kalisongo Malang | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rohani ziarah ke Gua Maria Pasionis dan Taman Doa Bukit Golgota di Kalisongo, Kabupaten Malang. Ziarah dekat Malang dengan suasana khidmat.',
    heroImage: '/photos/ziarah/pasionis.jpg',
    intro:
      'Gua Maria Pasionis terletak di kawasan Kalisongo, Kabupaten Malang, dalam kompleks Biara Rubiah. Dikenal dengan arsitektur unik pada bagian langit-langitnya yang menggambarkan kisah Bunda Maria dan Yesus Kristus, tempat ini juga memiliki Taman Doa Bukit Golgota di sisi atasnya, lengkap dengan 14 perhentian Jalan Salib.',
    highlights: [
      'Arsitektur gua dengan detail langit-langit yang menggambarkan kisah Bunda Maria',
      'Dilengkapi Taman Doa Bukit Golgota dengan 14 perhentian Jalan Salib',
      'Tersedia bangunan tiga lantai untuk retret, rekoleksi, dan seminar rombongan',
      'Berada dalam kompleks yang tenang, cocok untuk doa dan renungan',
    ],
    idealFor: 'Rombongan paroki, kelompok retret/rekoleksi, komunitas muda Katolik',
    faq: [
      {
        q: 'Apakah Gua Maria Pasionis bisa digunakan untuk kegiatan retret rombongan?',
        a: 'Bisa. Kompleks ini memiliki bangunan tiga lantai yang biasa dipakai untuk retret, rekoleksi, dan seminar rohani.',
      },
      {
        q: 'Apa yang membuat Gua Maria Pasionis berbeda dari gua Maria lain di Malang?',
        a: 'Keunikannya ada pada arsitektur langit-langit gua serta keberadaan Taman Doa Bukit Golgota dengan jalan salib lengkap di area atasnya.',
      },
    ],
  },
  {
    slug: 'gua-maria-karmel-ngadireso',
    name: 'Gua Maria Sendang Retno Adi, Pertapaan Karmel Ngadireso',
    metaTitle: 'Paket Ziarah Gua Maria Karmel Ngadireso Tumpang Malang | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rohani ziarah ke Gua Maria Sendang Retno Adi di Pertapaan Karmel Ngadireso, Tumpang, Kabupaten Malang, di kaki Gunung Bromo.',
    heroImage: '/photos/ziarah/karmel-ngadireso.jpg',
    intro:
      'Gua Maria Sendang Retno Adi berada di kompleks Pertapaan Karmel, Biara Suster Putri Karmel Ngadireso, kawasan Tumpang/Poncokusumo, di kaki Gunung Bromo. Lokasinya jauh dari keramaian kota dengan sinyal telepon yang minim, menjadikannya tempat yang tepat untuk kontemplasi dan meditasi mendalam.',
    highlights: [
      'Berada di kaki Gunung Bromo dengan pemandangan alam yang menenangkan',
      'Pelataran dilengkapi altar, salib Yesus, patung Bunda Maria, dan tribune pengunjung',
      'Suasana sunyi jauh dari kota, ideal untuk kontemplasi dan meditasi',
      'Cocok untuk memperkenalkan anak-anak pada kesederhanaan hidup pertapaan',
    ],
    idealFor:
      'Rombongan yang mencari ziarah kontemplatif, kelompok retret, keluarga yang ingin pengalaman rohani mendalam jauh dari keramaian',
    faq: [
      {
        q: 'Apakah ada fasilitas makan di sekitar Pertapaan Karmel Ngadireso?',
        a: 'Karena ini kawasan pertapaan yang sengaja dijaga kesederhanaannya, fasilitas makan sangat terbatas. Sebaiknya rombongan membawa bekal sendiri, atau konsumsi bisa kami siapkan sesuai kebutuhan.',
      },
      {
        q: 'Apakah lokasi ini jauh dari Kota Malang?',
        a: 'Lokasinya berada di kawasan Tumpang/Poncokusumo di kaki Gunung Bromo, bisa ditempuh dalam sekitar 1,5-2 jam perjalanan darat dari pusat Kota Malang.',
      },
    ],
  },
  {
    slug: 'gua-maria-regina-pacis',
    name: 'Gua Maria Regina Pacis, Paroki Tidar Malang',
    metaTitle: 'Paket Ziarah Gua Maria Regina Pacis Tidar Malang | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rohani ziarah ke Gua Maria dan Taman Doa Regina Pacis di Paroki St. Andreas Tidar, Kota Malang. Ziarah singkat di dalam kota.',
    heroImage: '/photos/ziarah/regina-pacis.jpg',
    intro:
      'Gua Maria dan Taman Doa Regina Pacis berlokasi di Gereja St. Andreas Tidar, Kota Malang, dan diresmikan pada 30 November 2007. Tempat ini rutin menjadi lokasi misa ziarah setiap Jumat ketiga tiap bulan, serta doa rosario bersama pada bulan Mei dan Oktober sebagai bagian dari devosi kepada Bunda Maria.',
    highlights: [
      'Berada di dalam Kota Malang, mudah dijangkau tanpa perjalanan jauh keluar kota',
      'Rutin mengadakan misa ziarah setiap Jumat ketiga setiap bulan',
      'Cocok digabung dengan agenda ziarah singkat rombongan yang waktunya terbatas',
      'Suasana devosi yang hidup dengan tradisi doa rosario rutin dari umat sekitar',
    ],
    idealFor: 'Rombongan dengan waktu terbatas, komunitas lingkungan/paroki di dalam Kota Malang',
    faq: [
      {
        q: 'Apakah Gua Maria Regina Pacis buka untuk umum kapan saja?',
        a: 'Tempat ini terbuka untuk doa pribadi maupun rombongan, dengan misa ziarah rutin setiap Jumat ketiga tiap bulan. Untuk kunjungan rombongan besar, sebaiknya dikoordinasikan terlebih dahulu.',
      },
      {
        q: 'Apakah cocok digabung dengan ziarah ke gua Maria lain di Malang dalam satu hari?',
        a: 'Sangat cocok, karena lokasinya di dalam kota, banyak rombongan menjadikan Regina Pacis sebagai titik awal atau penutup ziarah sebelum/sesudah mengunjungi gua Maria lain di Kabupaten Malang.',
      },
    ],
  },
];

export function getZiarahBySlug(slug) {
  return ziarahDestinations.find((d) => d.slug === slug);
}
