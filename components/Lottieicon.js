'use client';

import { useEffect, useRef } from 'react';

// Player Lottie ringan pakai lottie-web. Animasinya baru dimuat & dimainkan
// saat elemen ini benar-benar masuk layar (IntersectionObserver) - supaya
// tidak ikut membebani loading awal halaman untuk animasi yang mungkin
// belum kelihatan (mis. kartu paling bawah).
export default function LottieIcon({ src, loop = true, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let animation;
    let cancelled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animation && !cancelled) {
          import('lottie-web').then(({ default: lottie }) => {
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
      { threshold: 0.2 }
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
