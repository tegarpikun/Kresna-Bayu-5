// scripts/migrate-blog-to-sanity.js
//
// Sekali jalan: mindahin 6 artikel yang sudah ada di lib/blogData.js
// (format lama: content: [{heading, body}]) jadi dokumen Sanity
// (format baru: body sebagai Portable Text dengan style h2/normal).
//
// CARA PAKAI (dari root project, setelah `npm install` sudah beres):
//   SANITY_API_TOKEN=xxxx node scripts/migrate-blog-to-sanity.js
//
// SANITY_API_TOKEN didapat dari sanity.io/manage -> project Anda ->
// API -> Tokens -> Add API token, pilih permission "Editor".
// Token ini CUMA dipakai sekali di terminal Anda sendiri, jangan
// commit ke git / taruh di kode.

const { createClient } = require('@sanity/client');
const { blogPosts } = require('../lib/blogData');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function toPortableText(contentSections) {
  const blocks = [];
  for (const section of contentSections) {
    blocks.push({
      _type: 'block',
      style: 'h2',
      children: [{ _type: 'span', text: section.heading }],
    });
    blocks.push({
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: section.body }],
    });
  }
  return blocks;
}

async function migrate() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('SANITY_API_TOKEN belum di-set. Lihat komentar di atas file ini.');
    process.exit(1);
  }

  for (const post of blogPosts) {
    const doc = {
      _type: 'post',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      excerpt: post.excerpt,
      metaDescription: post.metaDescription,
      publishedDate: post.publishedDate,
      relatedDestinationSlug: post.relatedDestinationSlug || undefined,
      body: toPortableText(post.content),
      faq: (post.faq || []).map((item) => ({
        _type: 'faqItem',
        _key: item.q.slice(0, 40),
        q: item.q,
        a: item.a,
      })),
    };

    // pakai slug sebagai _id supaya kalau script dijalankan ulang,
    // artikel yang sama di-update bukan dobel.
    doc._id = `post-${post.slug}`;

    await client.createOrReplace(doc);
    console.log(`✓ Migrated: ${post.title}`);
  }

  console.log('\nSelesai. Cek hasilnya di /studio.');
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
