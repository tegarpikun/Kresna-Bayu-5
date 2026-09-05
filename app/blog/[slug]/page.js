// app/blog/[slug]/page.js — GANTI file lama dengan ini
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlForImage } from '@/lib/sanity/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/sanity/queries';
import { getDestinationBySlug } from '@/lib/destinationsData';
import { siteConfig, buildWhatsappLink } from '@/lib/siteConfig';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
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

// Komponen kustom biar heading H2 di body dapat style yang sama
// dengan desain lama (font-semibold, dst).
const portableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-xl font-semibold mb-2 mt-8">{children}</h2>
    ),
    normal: ({ children }) => (
      <p className="text-white/80 leading-relaxed mb-4">{children}</p>
    ),
  },
};

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
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
    author: { '@type': 'Organization', name: siteConfig.brandName },
  };

  const faqSchema =
    post.faq && post.faq.length > 0
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

      {post.mainImage && (
        <div className="relative w-full aspect-video mb-8 rounded-2xl overflow-hidden">
          <Image
            src={urlForImage(post.mainImage).width(1200).height(675).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="space-y-2">
        <PortableText value={post.body} components={portableTextComponents} />
      </div>

      {post.faq && post.faq.length > 0 && (
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
