'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import UIOverlay from '@/components/UIOverlay';
import EndingSequence from '@/components/EndingSequence';
import WhatsAppButton from '@/components/WhatsAppButton';
import CanvasErrorBoundary from '@/components/CanvasErrorBoundary';
import JourneySection from '@/components/JourneySection';
import VideoBackground from '@/components/VideoBackground';
import { siteConfig } from '@/lib/siteConfig';

const CinematicCanvas = dynamic(() => import('@/components/CinematicCanvas'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cinematic-black">
      <div className="text-center">
        <div className="mx-auto mb-4 h-14 w-14 animate-spin rounded-full border-4 border-cinematic-amber border-t-transparent" />
        <p className="font-serif text-lg text-cinematic-cream">
          Menyiapkan pengalaman sinematik...
        </p>
      </div>
    </div>
  ),
});

export default function Home() {
  const endingRushRef = useRef(null);
  const sentinelRef = useRef(null);
  const [cinematicActive, setCinematicActive] = useState(true);

  useEffect(() => {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => fadeObserver.observe(el));

    // Membekukan (bukan mematikan total) kanvas 3D begitu pengguna sampai
    // di bagian statis biru-emas. Kanvas TETAP ter-mount (WebGL context &
    // tekstur foto yang sudah dimuat tidak hilang), cuma render loop-nya
    // dijeda (frameloop="never") dan disembunyikan lewat CSS. Ini supaya
    // saat pengguna scroll balik ke atas, foto tidak perlu di-load ulang
    // dari nol (yang sebelumnya sempat bikin sebagian foto gagal muncul).
    //
    // Observer-nya sengaja BARU MULAI AKTIF setelah jeda 2 detik dari
    // mount, supaya proses loading foto di detik-detik awal halaman
    // dibuka tidak mungkin terganggu olehnya sama sekali.
    let cinematicObserver;
    const startObserverTimeout = setTimeout(() => {
      cinematicObserver = new IntersectionObserver(
        ([entry]) => {
          setCinematicActive(!entry.isIntersecting);
        },
        { threshold: 0, rootMargin: '0px 0px -60% 0px' }
      );

      if (sentinelRef.current) {
        cinematicObserver.observe(sentinelRef.current);
      }
    }, 2000);

    return () => {
      fadeObserver.disconnect();
      clearTimeout(startObserverTimeout);
      if (cinematicObserver) cinematicObserver.disconnect();
    };
  }, []);

  return (
    <main className="relative">
      <div
        className={`transition-opacity duration-500 ${
          cinematicActive
            ? 'opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!cinematicActive}
      >
        <VideoBackground active={cinematicActive} />
        <CanvasErrorBoundary>
          <CinematicCanvas endingRushRef={endingRushRef} active={cinematicActive} />
        </CanvasErrorBoundary>
        <UIOverlay />
      </div>

      <div className="relative z-20">
        {/* Babak pembuka - kini ikut mengalir bersama scroll, bukan kotak
            yang menempel permanen di layar. */}
        <div className="flex min-h-[100dvh] items-center justify-center px-4 sm:px-8">
          <div className="animate-on-scroll glass-card max-w-4xl p-6 text-center sm:p-10 sm:text-left md:p-12">
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.3em] text-cinematic-amber sm:mb-4 sm:text-xs">
              {siteConfig.hero.eyebrow}
            </p>
            <h1 className="mb-4 whitespace-pre-line font-serif text-[clamp(2rem,7vw,5rem)] font-bold leading-[1.05] text-cinematic-cream text-shadow-cinematic sm:mb-6">
              {siteConfig.hero.title}
            </h1>
            <p className="mx-auto max-w-lg font-serif text-sm italic text-cinematic-cream/80 sm:mx-0 sm:text-lg md:text-xl">
              {siteConfig.hero.subtitle}
            </p>
          </div>
        </div>

        {siteConfig.chapters.map((chapter) => (
          <div
            key={chapter.title}
            className="flex min-h-[100dvh] items-center justify-center px-4"
          >
            <div className="animate-on-scroll text-center">
              <p className="mb-4 font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-cinematic-amber">
                {chapter.eyebrow}
              </p>
              <h2 className="font-serif text-[clamp(2rem,7vw,4.5rem)] text-cinematic-cream text-shadow-cinematic">
                {chapter.title}
              </h2>
            </div>
          </div>
        ))}

        <EndingSequence
          onTriggerRush={() => {
            if (endingRushRef.current) endingRushRef.current();
          }}
        />

        <div ref={sentinelRef} />
      </div>

      <JourneySection />

      <WhatsAppButton />
    </main>
  );
}
