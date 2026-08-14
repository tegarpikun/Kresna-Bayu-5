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
    if (active) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  return (
    <div className="fixed inset-0 z-0 bg-cinematic-black">
      {!failed && (
        <video
          ref={videoRef}
          className="h-full w-full object-cover opacity-90"
          autoPlay
          muted
          loop
          playsInline
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
