// sanity.config.js — di root project, sejajar dengan next.config.js
//
// Ini konfigurasi Sanity Studio yang di-embed ke /studio di Next.js
// Anda. Bukan project/deploy terpisah — cukup 1x `npm run build` &
// deploy Vercel seperti biasa, studio-nya ikut jadi bagian dari
// aplikasi yang sama.

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Kresna Bayu Tour — CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
