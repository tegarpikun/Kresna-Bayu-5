import Link from 'next/link';
import { destinations } from '@/lib/destinationsData';
import { buildWhatsappLink } from '@/lib/siteConfig';

export const metadata = {
  title: 'Kresna Bayu Tour | Indonesia Group Tour & Travel Operator',
  description:
    'Custom group tour packages across Indonesia: Bali, Yogyakarta, Labuan Bajo, and more. Full-service tour operator since 2000, based in Malang, Indonesia.',
  alternates: {
    canonical: 'https://www.kresnabayutour.co.id/en',
    languages: {
      id: 'https://www.kresnabayutour.co.id',
      en: 'https://www.kresnabayutour.co.id/en',
    },
  },
};

export default function EnglishHomePage() {
  const whatsappLink = buildWhatsappLink(
    "Hello Kresna Bayu Tour, I'm interested in planning a group trip in Indonesia. Could you help me?"
  );

  return (
    <main className="min-h-screen bg-cinematic-black text-white px-6 py-16 max-w-4xl mx-auto">
      <nav className="text-sm text-white/50 mb-8">
        <Link href="/">Bahasa Indonesia</Link> / <span>English</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Custom Group Tours Across Indonesia
      </h1>

      <p className="text-lg text-white/80 leading-relaxed mb-10">
        Kresna Bayu Tour has been organizing group trips across Indonesia
        since 2000 - from Bali and Yogyakarta to Komodo Island. We design
        itineraries around your group&apos;s interests and budget, with
        professional local guides and 24-hour support throughout the trip.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Popular Destinations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {destinations.map((d) => (
            <Link
              key={d.slug}
              href={`/tour/${d.slug}`}
              className="border border-white/10 rounded-xl p-4 hover:border-amber-500/50 transition-colors"
            >
              <p className="font-semibold">{d.name}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Kresna Bayu Tour</h2>
        <ul className="list-disc list-inside space-y-2 text-white/80">
          <li>Itineraries tailored to your group&apos;s interests and budget</li>
          <li>Professional photography and videography documentation</li>
          <li>End-to-end tour guide service with 24-hour emergency support</li>
          <li>Experience serving schools, companies, and large family groups</li>
        </ul>
      </section>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 hover:bg-green-500 transition-colors text-white font-semibold px-8 py-4 rounded-full"
      >
        Chat with us on WhatsApp
      </a>
    </main>
  );
}
