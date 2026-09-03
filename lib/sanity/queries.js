// lib/sanity/queries.js
import { client } from './client';

export async function getAllPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedDate desc){
      title,
      "slug": slug.current,
      excerpt,
      publishedDate,
      mainImage
    }`,
    {},
    { next: { revalidate: 60 } } // ISR: cek konten baru tiap 60 detik
  );
}

export async function getPostBySlug(slug) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      excerpt,
      metaDescription,
      publishedDate,
      relatedDestinationSlug,
      mainImage,
      body,
      faq
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export async function getAllPostSlugs() {
  return client.fetch(`*[_type == "post"]{ "slug": slug.current }`);
}
