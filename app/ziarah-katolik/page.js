import Link from 'next/link';
import { ziarahDestinations } from '@/lib/ziarahData';
import { buildWhatsappLink } from '@/lib/siteConfig';

// Halaman hub ini menargetkan kata kunci utama secara NASIONAL:
// "ziarah katolik", "ziarah maria", "tour rohani katolik"
// PENTING: title, H1, dan paragraf pembuka SENGAJA tidak lagi memaksakan
// "dari Malang" di posisi awal — itu menyempitkan relevansi ke query
// lokal saja. Malang tetap disebut sebagai basis operasional (baik untuk
// kepercayaan/E-E-A-T), tapi cakupan layanan ditulis eksplisit nasional.
export const metadata = {
  title: 'Ziarah Katolik & Ziarah Maria di Indonesia | Tour Rohani Rombongan - Kresna Bayu Tour',
  description:
    'Paket ziarah Katolik dan ziarah Maria untuk rombongan paroki, keluarga besar, dan sekolah Katolik ke berbagai gua Maria dan gereja ziarah di Indonesia. Melayani keberangkatan dari berbagai daerah di seluruh Indonesia.',
  alternates: {
    canonical: 'https://www.kresnabayutour.co.id/ziarah-katolik',
  },
  openGraph: {
    title: 'Ziarah Katolik & Ziarah Maria di Indonesia | Tour Rohani Rombongan',
    description:
      'Paket ziarah Maria dan tour rohani Katolik untuk rombongan dari berbagai kota di Indonesia ke destinasi ziarah populer di Indonesia.',
    type: 'website',
  },
};

const hubFaq = [
  {
    q: 'Apa itu ziarah Katolik dan ziarah Maria?',
    a: 'Ziarah Katolik adalah perjalanan rohani ke tempat-tempat yang dianggap suci atau bersejarah dalam iman Katolik, dilakukan untuk berdoa, merenung, dan memperdalam iman. Ziarah Maria secara khusus mengunjungi gua Maria atau gereja yang didedikasikan untuk penghormatan kepada Bunda Maria, seperti Gua Maria Lourdes Puhsarang, Sendangsono, atau Ganjuran.',
  },
  {
    q: 'Apa saja yang termasuk dalam paket tour rohani Katolik ini?',
    a: 'Paket ziarah Katolik kami umumnya mencakup transportasi rombongan, itinerary ke satu atau beberapa tempat ziarah, dan pendampingan selama perjalanan. Detail bisa disesuaikan dengan kebutuhan komunitas paroki atau keluarga Anda.',
  },
  {
    q: 'Apakah paket ziarah Maria bisa digabung ke beberapa lokasi sekaligus?',
    a: 'Bisa. Banyak rombongan menggabungkan kunjungan ke beberapa gua Maria atau gereja ziarah sekaligus dalam satu itinerary, tergantung jarak dan waktu yang tersedia.',
  },
  {
    q: 'Apakah tour rohani ini juga cocok untuk rombongan sekolah Katolik?',
    a: 'Sangat cocok. Kami melayani rombongan komunitas paroki, keluarga besar, maupun rombongan sekolah Katolik yang ingin mengadakan retret atau ziarah bersama.',
  },
];

const kotaKeberangkatan = [
  'Surabaya',
  'Yogyakarta',
  'Semarang',
  'Jakarta',
  'Kediri',
  'Solo',
  'Luar-Jawa',
];

export default function ZiarahKatolikHubPage() {
  const whatsappLink = buildWhatsappLink(
    'Halo Kresna Bayu Tour, saya tertarik dengan paket tour rohani / ziarah Katolik rombongan. Apakah bisa dibantu?'
  );

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hubFaq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: 'https://www.kresnabayutour.co.id',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Ziarah Katolik',
        item: 'https://www.kresnabayutour.co.id/ziarah-katolik',
      },
    ],
  };

  // Schema Service terpisah dari TravelAgency global (di StructuredData.js)
  // supaya Google & AI generatif tahu ini adalah LAYANAN SPESIFIK (bukan
  // cuma bagian umum dari bisnis tour), dengan areaServed eksplisit
  // se-Indonesia, bukan Malang saja.
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Ziarah Katolik & Tour Rohani',
    name: 'Paket Ziarah Katolik & Ziarah Maria Rombongan',
    provider: {
      '@type': 'TravelAgency',
      name: 'Kresna Bayu Tour',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Komunitas paroki, keluarga besar, Perusahaan, sekolah Katolik',
    },
  };

  return (
    <main className="min-h-screen bg-cinematic-black text-white px-6 py-16 max-w-4xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <nav className="text-sm text-white/50 mb-8">
        <Link href="/">Beranda</Link> / <span>Ziarah Katolik</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Ziarah Katolik &amp; Ziarah Maria di Indonesia
      </h1>

      <p className="text-lg text-white/80 leading-relaxed mb-6">
        Kresna Bayu Tour melayani paket <strong>ziarah Katolik</strong> dan{' '}
        <strong>ziarah Maria</strong> untuk rombongan dari berbagai kota di
        Indonesia menuju sejumlah gua Maria dan gereja ziarah bersejarah di
        Jawa. Cocok untuk komunitas paroki, keluarga besar, maupun rombongan
        sekolah Katolik yang ingin mengadakan retret atau <strong>tour rohani
        Katolik</strong> bersama, dengan itinerary yang disesuaikan kebutuhan
        rombongan.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Apa itu Ziarah Katolik dan Ziarah Maria?
        </h2>
        <p className="text-white/80 leading-relaxed mb-4">
          Ziarah Katolik adalah perjalanan rohani ke tempat-tempat yang
          dianggap suci atau bersejarah dalam iman Katolik — dilakukan untuk
          berdoa, merenung, dan memperdalam iman bersama komunitas. Ziarah
          Maria secara khusus mengunjungi gua Maria atau gereja yang
          didedikasikan untuk penghormatan kepada Bunda Maria. Di Indonesia,
          tradisi ziarah Maria berkembang pesat terutama di Pulau Jawa, dengan
          gua-gua Maria yang berdiri sejak masa awal penyebaran Katolik dan
          tetap menjadi tujuan tour rohani hingga sekarang.
        </p>
        <p className="text-white/80 leading-relaxed">
          Banyak paroki, keluarga besar, perusahaan dan sekolah Katolik mengadakan ziarah
          rombongan sebagai bagian dari retret tahunan, bulan Maria (Mei dan
          Oktober), atau perayaan khusus lainnya yang biasanya dengan
          transportasi bersama, pendampingan, dan itinerary yang mencakup
          satu atau beberapa lokasi ziarah dan paket wisata sekaligus.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">
          Destinasi Ziarah Maria &amp; Gereja Ziarah Populer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {ziarahDestinations.map((d) => (
            <Link
              key={d.slug}
              href={`/ziarah-katolik/${d.slug}`}
              className="block border border-white/10 rounded-xl overflow-hidden hover:border-amber-500/50 transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={d.heroImage}
                alt={d.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <p className="font-semibold">{d.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Melayani Rombongan dari Berbagai Kota di Indonesia
        </h2>
        <p className="text-white/80 leading-relaxed mb-4">
          Basis operasional kami ada di Malang, tetapi paket ziarah Katolik
          dan tour rohani kami melayani rombongan dari berbagai daerah di seluruh Indonesia,
        </p>
        <div className="flex flex-wrap gap-2">
          {kotaKeberangkatan.map((kota) => (
            <span
              key={kota}
              className="px-4 py-2 rounded-full border border-white/10 text-white/80 text-sm"
            >
              {kota}
            </span>
          ))}
        </div>
        <p className="text-white/60 text-sm mt-4">
          Kota keberangkatan lain di luar daftar ini tetap bisa dilayani 
          hubungi kami untuk konsultasi rute dan estimasi biaya.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Kenapa Memilih Kresna Bayu Tour untuk Tour Rohani Katolik
        </h2>
        <ul className="list-disc list-inside space-y-2 text-white/80">
          <li>Pengalaman melayani rombongan sejak tahun 2000</li>
          <li>Tour Agen yang memahami liturgi sehingga dapat mempersiapkan paket tour ziarah yang memadai</li>
          <li>Memiliki koneksi dengan imam/pastur yang sangat luas</li>
          <li>Itinerary fleksibel, bisa gabung beberapa lokasi ziarah atau paket wisata umum jika dibutuhkan</li>
          <li>Transportasi dan pendampingan sepanjang perjalanan</li>
          <li>Dukungan darurat 24 jam selama trip berlangsung</li>
          <li>Fasilitas Asuransi perjalanan dan dokumentasi profesional membuat kegiatan tour lebih optimal</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Pertanyaan Umum</h2>
        <div className="space-y-6">
          {hubFaq.map((item) => (
            <div key={item.q}>
              <h3 className="font-medium mb-1">{item.q}</h3>
              <p className="text-white/70">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 hover:bg-green-500 transition-colors text-white font-semibold px-8 py-4 rounded-full"
      >
        Konsultasi Tour Rohani via WhatsApp
      </a>
    </main>
  );
}
