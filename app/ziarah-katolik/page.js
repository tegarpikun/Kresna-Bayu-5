import Link from 'next/link';
import { ziarahDestinations } from '@/lib/ziarahData';
import { buildWhatsappLink } from '@/lib/siteConfig';

// Halaman hub ini yang menargetkan kata kunci utama:
// "ziarah maria", "ziarah katolik", "tour rohani", "tour rohani katolik"
// Judul, deskripsi, dan isi paragraf sengaja memuat variasi frasa itu
// secara alami (bukan diulang-ulang / keyword stuffing).
export const metadata = {
  title: 'Tour Rohani & Ziarah Katolik Rombongan dari Malang | Kresna Bayu Tour',
  description:
    'Paket tour rohani dan ziarah Katolik rombongan dari Malang: ziarah Maria ke Puhsarang, Sendangsono, Ganjuran, dan destinasi ziarah lainnya. Transportasi, itinerary, dan pendampingan untuk komunitas paroki.',
  alternates: {
    canonical: 'https://www.kresnabayutour.co.id/ziarah-katolik',
  },
  openGraph: {
    title: 'Tour Rohani & Ziarah Katolik Rombongan dari Malang',
    description:
      'Paket ziarah Maria dan tour rohani Katolik rombongan dari Malang ke berbagai destinasi ziarah di Jawa.',
    type: 'website',
  },
};

const hubFaq = [
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

  return (
    <main className="min-h-screen bg-cinematic-black text-white px-6 py-16 max-w-4xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="text-sm text-white/50 mb-8">
        <Link href="/">Beranda</Link> / <span>Ziarah Katolik</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Tour Rohani &amp; Ziarah Katolik Rombongan
      </h1>

      <p className="text-lg text-white/80 leading-relaxed mb-10">
        Kresna Bayu Tour melayani paket <strong>ziarah Katolik</strong> dan{' '}
        <strong>tour rohani</strong> rombongan dari Malang menuju berbagai
        tempat <strong>ziarah Maria</strong> di Jawa. Cocok untuk komunitas
        paroki, keluarga besar, maupun rombongan sekolah Katolik yang ingin
        mengadakan retret atau ziarah bersama dengan itinerary yang
        disesuaikan kebutuhan rombongan.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Destinasi Ziarah</h2>
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
          Kenapa Memilih Kresna Bayu Tour untuk Tour Rohani Katolik
        </h2>
        <ul className="list-disc list-inside space-y-2 text-white/80">
          <li>Pengalaman melayani rombongan sejak tahun 2010</li>
          <li>Itinerary fleksibel, bisa gabung beberapa lokasi ziarah</li>
          <li>Transportasi dan pendampingan sepanjang perjalanan</li>
          <li>Dukungan darurat 24 jam selama trip berlangsung</li>
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
