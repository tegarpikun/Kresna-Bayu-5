import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';

export const metadata = {
  title: 'Blog Tips & Panduan Tour Rombongan | Kresna Bayu Tour',
  description:
    'Kumpulan artikel tips, itinerary, dan panduan biaya tour rombongan ke berbagai destinasi di Indonesia.',
  alternates: {
    canonical: 'https://www.kresnabayutour.co.id/blog',
  },
};

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-cinematic-black text-white px-6 py-16 max-w-4xl mx-auto">
      <nav className="text-sm text-white/50 mb-8">
        <Link href="/">Beranda</Link> / <span>Blog</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-10">
        Tips & Panduan Tour Rombongan
      </h1>

      <div className="space-y-8">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block border border-white/10 rounded-2xl p-6 hover:border-amber-500/50 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-white/70">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
