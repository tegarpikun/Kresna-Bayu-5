// app/blog/page.js — GANTI file lama dengan ini
import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '@/lib/sanity/image';
import { getAllPosts } from '@/lib/sanity/queries';

export const metadata = {
  title: 'Blog Tips & Panduan Tour Rombongan | Kresna Bayu Tour',
  description:
    'Kumpulan artikel tips, itinerary, dan panduan biaya tour rombongan ke berbagai destinasi di Indonesia.',
  alternates: { canonical: 'https://www.kresnabayutour.co.id/blog' },
};

export const revalidate = 60;

export default async function BlogListPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-cinematic-black text-white px-6 py-16 max-w-4xl mx-auto">
      <nav className="text-sm text-white/50 mb-8">
        <Link href="/">Beranda</Link> / <span>Blog</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-10">
        Tips &amp; Panduan Tour Rombongan
      </h1>

      <div className="space-y-8">
        {posts.map((post) => (
           <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block border-b border-white/10 pb-6 hover:opacity-80 transition-opacity"
            >
           {post.mainImage && (
                <div className="relative w-40 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={urlForImage(post.mainImage).width(400).height(280).url()}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-white/70">{post.excerpt}</p>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-white/50">
            Belum ada artikel. Tulis artikel pertama di{' '}
            <Link href="/studio" className="underline">
              /studio
            </Link>
            .
          </p>
        )}
      </div>
    </main>
  );
}
