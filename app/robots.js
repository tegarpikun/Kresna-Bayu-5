// Next.js otomatis mengubah file ini jadi /robots.txt
// Ini yang tadi muncul "Tidak ada file robots.txt" di GSC.
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.kresnabayutour.co.id/sitemap.xml',
  };
}
