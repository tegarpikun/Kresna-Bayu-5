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

    // PENTING: preload="auto" tidak dipakai lagi di elemen <video> di bawah,
    // karena browser mulai MEN-DOWNLOAD videonya begitu elemen itu mount -
    // terlepas dari kapan .play() dipanggil. Delay .play() saja TIDAK
    // menunda proses download-nya, jadi video (400KB) tetap rebutan
    // bandwidth dengan 8 foto galeri 3D yang mulai download bersamaan, dan
    // itulah yang bikin sebagian foto dibatalkan browser (NS_BINDING_ABORTED).
    //
    // Sekarang video di-set preload="none" dan src-nya baru "dipasang" via
    // video.load() di sini, SETELAH jeda - jadi proses download video benar-
    // benar belum mulai sama sekali sampai foto-foto galeri sudah dapat
    // giliran lebih dulu.
    const loadTimeout = setTimeout(() => {
      video.load();
      video.play().catch(() => {});
    }, 900);

    return () => clearTimeout(loadTimeout);
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
          preload="none"
          fetchpriority="low"
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
