import { destinations } from '@/lib/destinationsData';

// Next.js otomatis mengubah file ini jadi /sitemap.xml yang bisa
// disubmit ke Google Search Console. Setiap kali Anda tambah destinasi
// baru di lib/destinationsData.js, sitemap ini otomatis ikut bertambah
// tanpa perlu diedit manual.
export default function sitemap() {
  const baseUrl = 'https://www.kresnabayutour.co.id';

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  const destinationRoutes = destinations.map((d) => ({
    url: `${baseUrl}/tour/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...destinationRoutes];
}
