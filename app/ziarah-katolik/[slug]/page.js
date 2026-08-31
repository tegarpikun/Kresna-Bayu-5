import { ziarahDestinations, getZiarahBySlug } from '@/lib/ziarahData';
import { buildWhatsappLink } from '@/lib/siteConfig';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export function generateStaticParams() {
  return ziarahDestinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const dest = getZiarahBySlug(params.slug);
  if (!dest) return {};

  return {
    title: dest.metaTitle,
    description: dest.metaDescription,
    alternates: {
      canonical: `https://www.kresnabayutour.co.id/ziarah-katolik/${dest.slug}`,
    },
    openGraph: {
      title: dest.metaTitle,
      description: dest.metaDescription,
      images: [dest.heroImage],
      type: 'website',
    },
  };
}

export default function ZiarahDetailPage({ params }) {
  const dest = getZiarahBySlug(params.slug);
  if (!dest) notFound();

  const whatsappLink = buildWhatsappLink(
    `Halo Kresna Bayu Tour, saya tertarik dengan paket ziarah rohani ke ${dest.name}. Apakah bisa dibantu?`
  );

  const faqSchema =
    dest.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: dest.faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : null;

  const tripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: `Paket Ziarah ${dest.name}`,
    description: dest.metaDescription,
    provider: {
      '@type': 'TravelAgency',
      name: 'Kresna Bayu Tour and Travel',
    },
    touristType: dest.idealFor,
  };

  return (
    <main className="min-h-screen bg-cinematic-black text-white px-6 py-16 max-w-4xl mx-auto">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />

      <nav className="text-sm text-white/50 mb-8">
        <Link href="/">Beranda</Link> /{' '}
        <Link href="/ziarah-katolik">Ziarah Katolik</Link> /{' '}
        <span>{dest.name}</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Paket Ziarah {dest.name}
      </h1>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dest.heroImage}
        alt={dest.name}
        className="w-full h-64 md:h-96 object-cover rounded-2xl mb-10"
      />

      <p className="text-lg text-white/80 leading-relaxed mb-10">
        {dest.intro}
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Highlight</h2>
        <ul className="list-disc list-inside space-y-2 text-white/80">
          {dest.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Cocok Untuk</h2>
        <p className="text-white/80">{dest.idealFor}</p>
      </section>

      {dest.faq.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Pertanyaan Umum</h2>
          <div className="space-y-6">
            {dest.faq.map((item) => (
              <div key={item.q}>
                <h3 className="font-medium mb-1">{item.q}</h3>
                <p className="text-white/70">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 hover:bg-green-500 transition-colors text-white font-semibold px-8 py-4 rounded-full"
      >
        Konsultasi Ziarah via WhatsApp
      </a>
    </main>
  );
}
