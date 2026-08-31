// =============================================================
// DATA HALAMAN ZIARAH KATOLIK — pola sama seperti destinationsData.js
// slug -> URL: /ziarah-katolik/[slug]
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
    faq: [],
  },
];

export function getZiarahBySlug(slug) {
  return ziarahDestinations.find((d) => d.slug === slug);
}
