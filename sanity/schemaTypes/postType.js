// sanity/schemaTypes/postType.js
//
// Skema ini sengaja dibuat mirip struktur lib/blogData.js yang lama
// (title, excerpt, metaDescription, publishedDate, faq, relatedDestinationSlug)
// supaya konsep di kepala Anda gak berubah, cuma cara nulisnya yang
// sekarang lewat form web (/studio) alih-alih edit file kode.

import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Artikel Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (bagian URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Gambar Utama',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan Singkat (tampil di listing /blog)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (untuk SEO, muncul di hasil Google)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Tanggal Terbit',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedDestinationSlug',
      title: 'Slug Destinasi Terkait (opsional, mis. "bali", "malang")',
      description:
        'Isi kalau artikel ini nyambung ke salah satu halaman /tour/[slug] supaya muncul link "Lihat paket ..." di akhir artikel.',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Isi Artikel',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Judul Bagian (H2)', value: 'h2' },
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }],
        },
        { type: 'image', options: { hotspot: true } },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'faq',
      title: 'Pertanyaan Umum (FAQ)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            { name: 'q', title: 'Pertanyaan', type: 'string' },
            { name: 'a', title: 'Jawaban', type: 'text', rows: 3 },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', subtitle: 'publishedDate' },
  },
});
