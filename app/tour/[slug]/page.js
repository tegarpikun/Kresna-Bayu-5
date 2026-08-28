import { destinations, getDestinationBySlug } from '@/lib/destinationsData';
import { siteConfig, buildWhatsappLink } from '@/lib/siteConfig';
import { notFound } from 'next/navigation';

// Membuat satu halaman statis untuk setiap destinasi di destinationsData.js
// saat proses build (SSG) — jadi setiap URL /tour/bali, /tour/yogyakarta dst
// benar-benar ada sebagai halaman HTML terpisah yang bisa diindeks Google.
export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

// Metadata unik per halaman — ini yang membedakan dari halaman utama
// yang metanya generik.
export async function generateMetadata({ params }) {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) return {};

  return {
    title: destination.metaTitle,
    description: destination.metaDescription,
    alternates: {
      canonical: `https://www.kresnabayutour.co.id/tour/${destination.slug}`,
    },
    openGraph: {
      title: destination.metaTitle,
      description: destination.metaDescription,
      images: [destination.heroImage],
      type: 'website',
    },
  };
}

export default function DestinationPage({ params }) {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) notFound();

  const whatsappLink = buildWhatsappLink(
    `Halo Kresna Bayu Tour, saya tertarik dengan paket tour rombongan ke ${destination.name}. Apakah bisa dibantu?`
  );

  // Structured data (JSON-LD) — ini yang membantu Google Rich Snippet
  // dan AI generatif (ChatGPT, Gemini, dll) memahami halaman ini secara
  // terstruktur: FAQ resmi + informasi produk/layanan tour.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: destination.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const touristTripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: `Paket Tour Rombongan ${destination.name}`,
    description: destination.metaDescription,
    provider: {
      '@type': 'TravelAgency',
      name: siteConfig.brandName,
      telephone: `+${siteConfig.whatsappNumber}`,
    },
    touristType: destination.idealFor,
  };

  return (
    <main className="min-h-screen bg-cinematic-black text-white px-6 py-16 max-w-4xl mx-auto">
      {/* JSON-LD ditanam di halaman, tidak terlihat pengguna, tapi dibaca mesin */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripSchema) }}
      />

      <nav className="text-sm text-white/50 mb-8">
        <a href="/">Beranda</a> / <span>Tour {destination.name}</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Paket Tour Rombongan {destination.name}
      </h1>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={destination.heroImage}
        alt={`Destinasi wisata ${destination.name} - Kresna Bayu Tour`}
        className="w-full h-64 md:h-96 object-cover rounded-2xl mb-10"
      />

      <p className="text-lg text-white/80 leading-relaxed mb-10">
        {destination.intro}
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Highlight Destinasi</h2>
        <ul className="list-disc list-inside space-y-2 text-white/80">
          {destination.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Cocok Untuk</h2>
        <p className="text-white/80">{destination.idealFor}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Pertanyaan Umum</h2>
        <div className="space-y-6">
          {destination.faq.map((item) => (
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
        Chat WhatsApp untuk Paket {destination.name}
      </a>
    </main>
  );
}
