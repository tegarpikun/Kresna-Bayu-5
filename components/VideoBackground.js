'use client';

import { useEffect, useRef, useState } from 'react';

// Video ini dipasang di BELAKANG kanvas 3D (fog, foto, partikel debu tetap
// melayang di atasnya). Kalau video gagal dimuat / belum ada filenya,
// otomatis jatuh ke warna gelap solid (tidak pernah tampil putih polos
// atau rusak).
export default function VideoBackground({
  src = '/video/hero-bg.mp4',
  poster = '/video/hero-bg-poster.jpg',
  active = true,
}) {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!active) {
      video.pause();
      return undefined;
    }

    // Video sengaja mulai diputar dengan jeda singkat (bukan langsung
    // autoplay saat mount), supaya foto-foto galeri 3D dapat prioritas
    // bandwidth lebih dulu di detik-detik awal halaman dibuka - video
    // (400KB) dan 8 foto yang mulai download bersamaan sempat bikin
    // sebagian foto dibatalkan browser (NS_BINDING_ABORTED) karena
    // rebutan resource dengan video ini.
    const playTimeout = setTimeout(() => {
      video.play().catch(() => {});
    }, 900);

    return () => clearTimeout(playTimeout);
  }, [active]);

  return (
    <div className="fixed inset-0 z-0 bg-cinematic-black">
      {!failed && (
        <video
          ref={videoRef}
          className="h-full w-full object-cover opacity-90"
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      {/* Tint gelap supaya teks & foto di atasnya tetap terbaca, apa pun
          isi videonya. Naikkan/turunkan opacity sesuai selera. */}
      <div className="absolute inset-0 bg-cinematic-black/40" />
    </div>
  );
}
