// =============================================================
// DATA HALAMAN ZIARAH KATOLIK — pola sama seperti destinationsData.js
// slug -> URL: /ziarah-katolik/[slug]
//
// CATATAN: 4 entri "DESTINASI BARU — Gua Maria di Malang" (Sendang
// Purwaningsih, Pasionis, Karmel Ngadireso, Regina Pacis) ditambahkan
// untuk menargetkan keyword lokal "gua maria Malang" / "ziarah dekat
// Malang" — ini destinasi yang secara lokasi ada di Kabupaten/Kota
// Malang sendiri, jadi persaingan SEO-nya lebih rendah dibanding
// keyword nasional seperti "ziarah katolik" yang sudah dikuasai
// spesialis ziarah lama.
//
// CATATAN: 3 entri "DESTINASI BARU — foto dokumentasi asli tersedia"
// (Ratu Damai Banyuwangi, Kerep Ambarawa, Tritis Gunungkidul)
// ditambahkan karena foto dokumentasi asli sudah ada di
// /public/photos/ziarah/dokumentasi/ (ratudamaibanyuwangi.jpg,
// kerep.jpg, tritis_gunungkidul.jpg).
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

  // =============================================================
  // DESTINASI BARU — foto dokumentasi asli sudah tersedia
  // di /public/photos/ziarah/dokumentasi/
  // =============================================================
  {
    slug: 'gereja-ratu-damai-banyuwangi',
    name: 'Gereja Katolik Maria Ratu Damai, Banyuwangi',
    metaTitle: 'Paket Ziarah Gereja Maria Ratu Damai Banyuwangi dari Malang | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rohani ziarah ke Gereja Katolik Maria Ratu Damai di Penganjuran, Banyuwangi dari Malang. Bisa digabung dengan wisata Banyuwangi dan penyeberangan ke Bali.',
    heroImage: '/photos/ziarah/dokumentasi/ratudamaibanyuwangi.jpg',
    intro:
      'Gereja Katolik Maria Ratu Damai berlokasi di Jalan Jaksa Agung Suprapto, Kelurahan Penganjuran, Kota Banyuwangi. Lokasinya strategis dan dekat dengan Pelabuhan Ketapang, menjadikannya titik ziarah yang sering disinggahi rombongan yang sedang dalam perjalanan Banyuwangi menuju Bali atau sebaliknya.',
    highlights: [
      'Berlokasi strategis di Kelurahan Penganjuran, mudah dijangkau dari pusat Kota Banyuwangi',
      'Sering jadi titik ziarah rombongan yang menggabungkan rute Banyuwangi–Bali',
      'Jemaat yang besar dan aktif, suasana ibadah yang hidup',
      'Bisa digabung dengan kunjungan ke De Djawatan atau destinasi Banyuwangi lainnya',
    ],
    idealFor:
      'Rombongan yang sedang dalam rute ziarah/wisata Banyuwangi–Bali, komunitas paroki, keluarga besar',
    faq: [
      {
        q: 'Apakah ziarah ke Gereja Maria Ratu Damai bisa digabung dengan penyeberangan ke Bali?',
        a: 'Sangat bisa. Karena lokasinya dekat Pelabuhan Ketapang, banyak rombongan menjadikan gereja ini titik ziarah sebelum atau sesudah menyeberang ke Bali.',
      },
      {
        q: 'Apakah gereja ini cocok untuk rombongan besar?',
        a: 'Cocok. Gereja ini biasa menampung jemaat dalam jumlah besar, baik untuk perayaan hari besar maupun kunjungan rombongan ziarah.',
      },
    ],
  },
  {
    slug: 'gua-maria-kerep-ambarawa',
    name: 'Gua Maria Kerep Ambarawa, Kabupaten Semarang',
    metaTitle: 'Paket Ziarah Gua Maria Kerep Ambarawa dari Malang | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rohani ziarah ke Gua Maria Kerep Ambarawa, Kabupaten Semarang dari Malang. Ikon patung Bunda Maria setinggi 42 meter, cocok untuk rombongan paroki besar.',
    heroImage: '/photos/ziarah/dokumentasi/kerep.jpg',
    intro:
      'Gua Maria Kerep Ambarawa (GMKA) terletak di Jalan Tentara Pelajar, Kelurahan Panjang, Kecamatan Ambarawa, Kabupaten Semarang. Diberkati dan diresmikan pada 15 Agustus 1954 oleh Mgr. Albertus Soegijapranata, tempat ini menjadi salah satu tujuan ziarah Maria paling dikenal di Jawa Tengah, dengan kompleks seluas 5 hektare berisi diorama perjalanan hidup Yesus.',
    highlights: [
      'Ikon Patung Maria Assumpta setinggi 42 meter, salah satu patung Bunda Maria tertinggi di Asia Tenggara',
      'Kawasan seluas 5 hektare dengan diorama perjalanan hidup Yesus',
      'Berada di kawasan perbukitan dengan udara sejuk dan pemandangan hijau',
      'Salah satu tempat ziarah Maria tertua dan ternama di Jawa Tengah, diresmikan sejak 1954',
    ],
    idealFor:
      'Komunitas paroki, rombongan besar, keluarga yang ingin ziarah sekaligus menikmati suasana perbukitan',
    faq: [
      {
        q: 'Berapa lama perjalanan dari Malang ke Gua Maria Kerep Ambarawa?',
        a: 'Karena jaraknya cukup jauh melewati wilayah Jawa Tengah, perjalanan darat biasanya memakan waktu 8-10 jam, sehingga umumnya dijadwalkan sebagai paket ziarah 2 hari 1 malam.',
      },
      {
        q: 'Apa yang membuat Gua Maria Kerep berbeda dari tempat ziarah lain?',
        a: 'Ikon utamanya adalah Patung Maria Assumpta setinggi 42 meter serta kawasan seluas 5 hektare berisi diorama kisah hidup Yesus, menjadikannya salah satu destinasi ziarah paling megah di Jawa Tengah.',
      },
    ],
  },
  {
    slug: 'gua-maria-tritis-gunungkidul',
    name: 'Gua Maria Tritis, Gunungkidul',
    metaTitle: 'Paket Ziarah Gua Maria Tritis Gunungkidul dari Malang | Kresna Bayu Tour',
    metaDescription:
      'Paket tour rohani ziarah ke Gua Maria Tritis di Dusun Bulu, Paliyan, Gunungkidul, Yogyakarta dari Malang. Berdoa di dalam gua karst alami dengan stalaktit dan stalagmit.',
    heroImage: '/photos/ziarah/dokumentasi/tritis_gunungkidul.jpg',
    intro:
      'Gua Maria Tritis berlokasi di Dusun Bulu, Desa Giring, Kecamatan Paliyan, Kabupaten Gunungkidul, dan merupakan bagian dari Paroki Wonosari, paroki terbesar di Gunungkidul. Keunikannya, peziarah berdoa langsung di dalam gua karst alami lengkap dengan stalaktit dan stalagmit, memberi suasana hening yang berbeda dari gua Maria buatan pada umumnya.',
    highlights: [
      'Berdoa langsung di dalam gua karst alami, lengkap dengan stalaktit dan stalagmit',
      'Bagian dari Paroki Wonosari, paroki terbesar di Gunungkidul',
      'Suasana hening dan alami, cocok untuk retret atau perenungan mendalam',
      'Bisa digabung dengan ziarah ke Sendangsono atau Ganjuran dalam satu rute Yogyakarta',
    ],
    idealFor:
      'Rombongan yang mencari pengalaman ziarah alami di dalam gua, kelompok retret, komunitas paroki dalam rute Yogyakarta',
    faq: [
      {
        q: 'Apakah Gua Maria Tritis bisa digabung dengan ziarah Yogyakarta lain seperti Sendangsono atau Ganjuran?',
        a: 'Bisa. Karena masih dalam wilayah DIY, banyak rombongan menggabungkan Tritis dengan Sendangsono dan/atau Ganjuran dalam satu paket ziarah Yogyakarta.',
      },
      {
        q: 'Apa keunikan berdoa di Gua Maria Tritis dibanding gua Maria lain?',
        a: 'Peziarah berdoa langsung di dalam gua karst yang terbentuk secara alami, lengkap dengan stalaktit dan stalagmit, memberi suasana berbeda dari gua Maria buatan pada umumnya.',
      },
    ],
  },
];

export function getZiarahBySlug(slug) {
  return ziarahDestinations.find((d) => d.slug === slug);
}
