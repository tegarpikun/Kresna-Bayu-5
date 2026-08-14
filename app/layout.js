import './globals.css';
import { siteConfig } from '@/lib/siteConfig';
import { galleryPhotos } from '@/lib/photoData';

export const metadata = {
  title: siteConfig.metaTitle,
  description: siteConfig.metaDescription,
  keywords: 'tour, travel, wisata, perjalanan, cinematic, 3D, gallery',
  openGraph: {
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#030305',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        {/* Preload semua foto galeri 3D supaya browser mulai download-nya
            dari awal (paralel dengan JS Three.js dimuat & dieksekusi),
            bukan menunggu kanvas 3D siap dulu baru mulai fetch foto. Ini
            yang bikin foto bisa langsung tampil begitu kanvas ter-mount,
            bukan nunggu load dari nol. */}
        {galleryPhotos.map((photo) => (
          <link
            key={photo.id}
            rel="preload"
            as="image"
            href={photo.url}
          />
        ))}
      </head>
      <body className="min-h-[100dvh] bg-cinematic-black antialiased">
        {children}
      </body>
    </html>
  );
}
