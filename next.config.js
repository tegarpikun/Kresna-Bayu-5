/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Default Next.js untuk file di /public adalah
  // "public, max-age=0, must-revalidate" - artinya SETIAP kali halaman
  // dibuka, browser wajib "tanya ulang" ke server untuk SEMUA foto/video
  // sekaligus (walau server selalu jawab 304/sama saja). Ledakan belasan
  // permintaan revalidasi bersamaan inilah yang memicu NS_BINDING_ABORTED
  // saat browser gagal menuntaskan pembacaan ulang dari cache lokalnya,
  // meski server tidak pernah bermasalah.
  //
  // Foto & video di /public/photos dan /public/videos tidak pernah
  // berubah tanpa deploy baru, jadi aman di-cache PERMANEN (immutable) -
  // browser tidak perlu tanya ulang ke server sama sekali setelah
  // pemuatan pertama.
  async headers() {
    return [
      {
        source: '/photos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/video/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/hero-scene/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/brand/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/lottie/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
