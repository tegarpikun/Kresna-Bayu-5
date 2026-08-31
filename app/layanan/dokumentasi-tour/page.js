import { buildWhatsappLink } from '@/lib/siteConfig';

export const metadata = {
  title: 'Jasa Dokumentasi Foto & Video Tour Rombongan Malang | Kresna Bayu Tour',
  description:
    'Jasa dokumentasi foto dan video profesional untuk tour rombongan di Malang dan sekitarnya. Gaya cinematic, tim berpengalaman, hasil bisa jadi kenang-kenangan rombongan Anda.',
  alternates: {
    canonical: 'https://www.kresnabayutour.co.id/layanan/dokumentasi-tour',
  },
  openGraph: {
    title: 'Jasa Dokumentasi Foto & Video Tour Rombongan Malang',
    description:
      'Dokumentasi cinematic untuk perjalanan rombongan Anda, dari fotografer & videografer berpengalaman.',
    type: 'website',
  },
};

const faq = [
  {
    q: 'Apakah jasa dokumentasi ini bisa dipesan terpisah tanpa paket tour?',
    a: 'Bisa. Meski biasanya jadi bagian dari paket tour rombongan, jasa dokumentasi foto/video juga bisa dipesan sebagai layanan tambahan terpisah untuk acara atau perjalanan yang sudah Anda atur sendiri.',
  },
  {
    q: 'Berapa lama proses hasil foto dan video selesai?',
    a: 'Umumnya hasil foto dan highlight video selesai dalam beberapa hari kerja setelah trip selesai, tergantung jumlah lokasi dan durasi perjalanan. Detail waktu pengerjaan kami sampaikan saat konsultasi.',
  },
  {
    q: 'Apakah tim dokumentasi ikut selama perjalanan penuh?',
    a: 'Tim dokumentasi bisa ikut mendampingi sepanjang itinerary rombongan, atau hanya di momen-momen tertentu sesuai kebutuhan dan anggaran Anda.',
  },
];

export default function DokumentasiTourPage() {
  const whatsappLink = buildWhatsappLink(
    'Halo Kresna Bayu Tour, saya tertarik dengan jasa dokumentasi foto/video untuk rombongan kami. Apakah bisa dibantu?'
  );

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Jasa Dokumentasi Foto dan Video Tour',
    areaServed: 'Malang, Jawa Timur',
    provider: {
      '@type': 'TravelAgency',
      name: 'Kresna Bayu Tour and Travel',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <nav className="text-sm text-white/50 mb-8">
        <a href="/">Beranda</a> / <span>Dokumentasi Tour</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Jasa Dokumentasi Foto &amp; Video Tour Rombongan
      </h1>

      <p className="text-lg text-white/80 leading-relaxed mb-10">
        Perjalanan rombongan yang berkesan layak didokumentasikan dengan baik.
        Kresna Bayu Tour menyediakan tim fotografer dan videografer
        berpengalaman dengan gaya cinematic, sehingga momen liburan atau
        acara rombongan Anda tersimpan sebagai kenang-kenangan berkualitas
        tinggi, bukan sekadar foto seadanya.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Yang Kami Tawarkan</h2>
        <ul className="list-disc list-inside space-y-2 text-white/80">
          <li>Foto dokumentasi rombongan di setiap destinasi utama</li>
          <li>Highlight video singkat bergaya cinematic</li>
          <li>Tim yang familiar dengan rute dan spot foto terbaik di setiap destinasi</li>
          <li>Bisa digabung dengan paket tour, atau dipesan terpisah</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Cocok Untuk</h2>
        <p className="text-white/80">
          Rombongan sekolah, gathering kantor, reuni keluarga besar, hingga
          komunitas yang ingin momen perjalanan mereka terekam dengan baik
          untuk kenangan maupun dokumentasi acara.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Pertanyaan Umum</h2>
        <div className="space-y-6">
          {faq.map((item) => (
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
        Konsultasi Jasa Dokumentasi via WhatsApp
      </a>
    </main>
  );
}
