import './globals.css';
import { siteConfig } from '@/lib/siteConfig';
import StructuredData from '@/components/StructuredData';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const metadata = {
  title: siteConfig.metaTitle,
  description: siteConfig.metaDescription,
  keywords: 'tour, travel, wisata, perjalanan, cinematic, 3D, gallery',
  alternates: {
    canonical: 'https://www.kresnabayutour.co.id',
    languages: {
      id: 'https://www.kresnabayutour.co.id',
      en: 'https://www.kresnabayutour.co.id/en',
    },
  },
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
        <StructuredData />
      </head>
      <body className="min-h-[100dvh] bg-cinematic-black antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
