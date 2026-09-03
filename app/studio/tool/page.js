// app/studio/[[...tool]]/page.js
//
// Route ini yang bikin dashboard CMS bisa dibuka di
// https://www.kresnabayutour.co.id/studio — login pakai akun Sanity
// Anda (email/Google), lalu tulis/edit artikel blog lewat form,
// tanpa sentuh kode sama sekali.

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
