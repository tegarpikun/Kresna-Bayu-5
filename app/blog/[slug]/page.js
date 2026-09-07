import { PortableText } from '@portabletext/react';
import ExpandableImage from '@/components/ExpandableImage';
import { urlForImage } from '@/lib/sanity/image';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import NavBar from '@/components/NavBar';
import SocialIcons from '@/components/SocialIcons';
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/sanity/queries';
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
  const [post, allPosts] = await Promise.all([
    getPostBySlug(params.slug),
    getAllPosts(),
  ]);
  if (!post) notFound();

  const relatedDestination = post.relatedDestinationSlug
    ? getDestinationBySlug(post.relatedDestinationSlug)
    : null;

  // Artikel terkait: post lain (bukan artikel yang sedang dibaca),
  // diurutkan dari yang terbaru, maksimal 4 untuk sidebar.
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 4);

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
    <div className="min-h-screen bg-cinematic-black text-white">
      {/* NavBar situs (sama seperti di halaman utama) supaya pengunjung
          tetap bisa navigasi ke bagian lain situs dari halaman artikel. */}
      <NavBar />

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

      <main className="px-6 pb-16 pt-28 sm:pt-32 max-w-6xl mx-auto">
        {/* Breadcrumb — tracking & tipografi disamakan dengan NavBar.js
            (font-sans, huruf kecil, tracking lebar, hover amber) supaya
            terasa satu sistem navigasi, bukan dua gaya berbeda. */}
        <nav className="font-sans text-[11px] tracking-[0.15em] uppercase text-white/50 mb-8">
          <Link href="/" className="transition-colors hover:text-amber-400">
            Beranda
          </Link>{' '}
          /{' '}
          <Link href="/blog" className="transition-colors hover:text-amber-400">
            Blog
          </Link>{' '}
          / <span className="normal-case text-white/70">{post.title}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
          {/* Kolom konten utama */}
          <article className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
              {post.title}
            </h1>

            {post.mainImage && (
              <div className="relative w-full aspect-video mb-8 rounded-2xl overflow-hidden">
                <ExpandableImage
                  src={urlForImage(post.mainImage).width(1200).height(675).url()}
                  alt={post.title}
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

            {/* Byline penulis + tanggal terbit + media sosial resmi
                Kresna Bayu Tour, ditampilkan di bagian paling bawah
                artikel. */}
            <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-white/60">
                Ditulis oleh{' '}
                <span className="text-white/85 font-medium">
                  {post.author || 'Kresna Bayu Tour Team'}
                </span>
                {post.publishedDate && (
                  <>
                    {' '}
                    &middot; Diterbitkan{' '}
                    {new Date(post.publishedDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </>
                )}
              </p>

              <SocialIcons variant="dark" />
            </div>
          </article>

          {/* Sidebar: Artikel Terkait */}
          {relatedPosts.length > 0 && (
            <aside className="mt-14 lg:mt-0">
              <h2 className="text-lg font-semibold mb-5 font-sans tracking-[0.1em] uppercase text-white/80">
                Artikel Terkait
              </h2>
              <div className="space-y-5">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="flex gap-3 group"
                  >
                    {related.mainImage ? (
                      <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={urlForImage(related.mainImage).width(160).height(128).url()}
                          alt={related.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-16 flex-shrink-0 rounded-lg bg-white/5" />
                    )}
                    <p className="text-sm text-white/80 leading-snug group-hover:text-amber-400 transition-colors">
                      {related.title}
                    </p>
                  </Link>
                ))}
              </div>

              <Link
                href="/blog"
                className="inline-block mt-6 text-xs font-sans tracking-[0.15em] uppercase text-amber-400 hover:text-amber-300 transition-colors"
              >
                Lihat Semua Artikel →
              </Link>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}
