import { siteConfig } from '@/lib/siteConfig';

// Structured data ini ditanam sekali di layout.js (tampil di SEMUA halaman)
// supaya Google & AI generatif (ChatGPT, Gemini, Perplexity) langsung
// tahu: siapa bisnis ini, di mana lokasinya, bagaimana cara dihubungi,
// dan seberapa bagus reputasinya (rating). Ini fondasi paling penting
// untuk GEO (Generative Engine Optimization).
export default function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: siteConfig.brandName,
    description: siteConfig.metaDescription,
    url: 'https://www.kresnabayutour.co.id',
    telephone: `+${siteConfig.whatsappNumber}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Warinoi Timur V no.17',
      addressLocality: 'Kota Malang',
      addressRegion: 'Jawa Timur',
      addressCountry: 'ID',
    },
    // GANTI nilai ratingValue & reviewCount ini kalau rating di Google
    // Business Profile Anda berubah - sinkronkan manual sesekali.
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.1',
      reviewCount: '45',
    },
    sameAs: siteConfig.socialLinks.map((s) => s.url),
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
