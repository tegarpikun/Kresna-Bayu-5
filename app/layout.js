import './globals.css';
import { siteConfig } from '@/lib/siteConfig';
import StructuredData from '@/components/StructuredData';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const metadata = {
  metadataBase: new URL('https://www.kresnabayutour.co.id'),

  title: {
    default: siteConfig.metaTitle,
    template: `%s | ${siteConfig.brandName || 'Kresna Bayu Tour'}`,
  },

  description: siteConfig.metaDescription,

  keywords: [
  'tour rombongan Malang',
  'travel Malang',
  'paket wisata Bali Jogja',
  'sewa bus pariwisata Malang',
  'tour sekolah kantor',
  'travel terpercaya Malang',
  'paket tour keluarga',
  'ziarah katolik',
  'paket wisata katolik',
  'ziarah katholik',
  'Indonesia Catholic Tour',
  'gua maria',
  'ziarah maria',
  'tour rohani katolik',
  'gua maria malang',
  'wisata',
  'perjalanan',
  'paket tour jakarta',
  'indonesia tour'
  ],

  authors: [{ name: 'Kresna Bayu Tour' }],
  creator: 'Kresna Bayu Tour',
  publisher: 'Kresna Bayu Tour',

  alternates: {
    canonical: 'https://www.kresnabayutour.co.id',
    languages: {
      id: 'https://www.kresnabayutour.co.id',
      en: 'https://www.kresnabayutour.co.id/en',
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  openGraph: {
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
    url: 'https://www.kresnabayutour.co.id',
    siteName: 'Kresna Bayu Tour',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://www.kresnabayutour.co.id/brand/logo.png',
        width: 1200,
        height: 630,
        alt: 'Kresna Bayu Tour',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
    images: ['https://www.kresnabayutour.co.id/brand/logo.png'],
  },

  icons: {
    icon: '/favicon.ico',
  },

  // Kalau nanti punya kode verifikasi Search Console tambahan, isi di sini:
  // verification: {
  //   google: 'kode-verifikasi-anda',
  // },
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
