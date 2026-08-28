import { blogPosts, getBlogPostBySlug } from '@/lib/blogData';
import { getDestinationBySlug } from '@/lib/destinationsData';
import { siteConfig, buildWhatsappLink } from '@/lib/siteConfig';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: {
      canonical: `https://www.kresnabayutour.co.id/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.publishedDate,
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const relatedDestination = post.relatedDestinationSlug
    ? getDestinationBySlug(post.relatedDestinationSlug)
    : null;

  const whatsappLink = buildWhatsappLink(
    `Halo Kresna Bayu Tour, saya baca artikel "${post.title}" dan tertarik untuk konsultasi paket tour rombongan. Apakah bisa dibantu?`
  );

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedDate,
    author: {
      '@type': 'Organization',
      name: siteConfig.brandName,
    },
  };

  const faqSchema =
    post.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : null;

  return (
    <main className="min-h-screen bg-cinematic-black text-white px-6 py-16 max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <nav className="text-sm text-white/50 mb-8">
        <Link href="/">Beranda</Link> / <Link href="/blog">Blog</Link> /{' '}
        <span>{post.title}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
        {post.title}
      </h1>

      <div className="space-y-8">
        {post.content.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>
            <p className="text-white/80 leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>

      {post.faq.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Pertanyaan Umum</h2>
          <div className="space-y-4">
            {post.faq.map((item) => (
              <div key={item.q}>
                <h3 className="font-medium mb-1">{item.q}</h3>
                <p className="text-white/70">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12 border-t border-white/10 pt-8">
        {relatedDestination && (
          <p className="text-white/70 mb-4">
            Tertarik ke {relatedDestination.name}? Lihat{' '}
            <Link
              href={`/tour/${relatedDestination.slug}`}
              className="text-amber-400 underline"
            >
              paket tour {relatedDestination.name}
            </Link>
            .
          </p>
        )}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 hover:bg-green-500 transition-colors text-white font-semibold px-8 py-4 rounded-full"
        >
          Konsultasi via WhatsApp
        </a>
      </div>
    </main>
  );
}
