'use client';

import { useEffect, useRef } from 'react';

// Modul lottie-web di-cache di level module (bukan per komponen) supaya
// SEKALI di-import, dipakai bareng oleh semua ikon Lottie di halaman -
// tidak diunduh ulang tiap kartu.
let lottieModulePromise;
function getLottie() {
  if (!lottieModulePromise) {
    lottieModulePromise = import('lottie-web').then((mod) => mod.default);
  }
  return lottieModulePromise;
}

// Player Lottie ringan pakai lottie-web.
//
// Sebelumnya modul lottie-web baru MULAI diunduh setelah elemen benar-benar
// masuk layar - jadi user sempat menunggu lama melihat kotak kosong sampai
// unduhan modulnya selesai baru animasi muncul. Sekarang unduhan modulnya
// dimulai lebih awal (begitu komponen mount, tanpa menunggu terlihat -
// filenya kecil jadi aman), dan area deteksi "terlihat" diperlebar
// (rootMargin) supaya animasi dimainkan begitu section MENDEKATI layar,
// bukan menunggu sampai benar-benar penuh terlihat dulu.
export default function LottieIcon({ src, loop = true, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let animation;
    let cancelled = false;
    const lottieReady = getLottie();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animation && !cancelled) {
          lottieReady.then((lottie) => {
            if (cancelled) return;
            animation = lottie.loadAnimation({
              container,
              renderer: 'svg',
              loop,
              autoplay: true,
              path: src,
            });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '400px 0px' }
    );

    observer.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (animation) animation.destroy();
    };
  }, [src, loop]);

  return <div ref={containerRef} className={className} />;
}
