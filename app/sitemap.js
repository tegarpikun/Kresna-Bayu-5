import { destinations } from '@/lib/destinationsData';
import { blogPosts } from '@/lib/blogData';

export default function sitemap() {
  const baseUrl = 'https://www.kresnabayutour.co.id';

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];

  const destinationRoutes = destinations.map((d) => ({
    url: `${baseUrl}/tour/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.publishedDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...destinationRoutes, ...blogRoutes];
}
