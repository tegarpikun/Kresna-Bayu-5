'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import UIOverlay from '@/components/UIOverlay';
import WelcomeIntro from '@/components/WelcomeIntro';
import EndingSequence from '@/components/EndingSequence';
import WhatsAppButton from '@/components/WhatsAppButton';
import CanvasErrorBoundary from '@/components/CanvasErrorBoundary';
import JourneySection from '@/components/JourneySection';
import VideoBackground from '@/components/VideoBackground';
import NavBar from '@/components/NavBar'; // <--- TAMBAHKAN IMPOR NAVBAR
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
          // Toggle DUA ARAH - teks muncul (fade in) saat masuk layar, dan
          // memudar lagi (fade out) saat keluar layar - bukan cuma
          // muncul sekali lalu diam permanen.
          entry.target.classList.toggle('visible', entry.isIntersecting);
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
          // PENTING: pakai posisi sentinel relatif ke viewport (bukan
          // entry.isIntersecting mentah). Sebelumnya pakai isIntersecting
          // langsung - itu BUG: begitu discroll cukup jauh ke bawah,
          // sentinel yang sudah lama terlewati jadi "tidak intersecting"
          // LAGI (karena sudah keluar area deteksi dari ATAS), sehingga
          // status "sudah lewat bagian sinematik" keliru balik lagi ke
          // "belum" - membuat background sinematik nongol lagi di
          // belakang konten. Dengan bandingkan posisi top, begitu sudah
          // lewat titik itu, statusnya tidak akan pernah balik lagi
          // selama masih di bawahnya (cuma balik kalau scroll ke ATAS
          // sungguhan, yang memang seharusnya begitu).
          // PENTING: sebelumnya dibandingkan ke 40% tinggi layar - itu
          // BUG BARU. CameraRig.js (yang mengatur kapan kamera "selesai"
          // sampai ke foto terakhir) memakai patokan sentinel mencapai
          // PALING ATAS (0%) layar - endTrigger sentinelRef, end 'top
          // top'. Kalau di sini dipatok ke 40%, galeri jadi memudar/
          // hilang LEBIH DULU sebelum kamera sungguh-sungguh selesai
          // menempuh perjalanannya ke foto terakhir. Sekarang dipatok ke
          // titik yang SAMA PERSIS (0%) supaya galeri baru memudar tepat
          // setelah foto terakhir benar-benar sempat terlihat.
          const passedSentinel = entry.boundingClientRect.top <= 0;
          setCinematicActive(!passedSentinel);
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
      {/* NavBar - Fixed di kanan atas, berisi Language Switcher (aktif) */}
      <NavBar />

      {/* Logo - fixed di pojok kiri atas, tetap ada sepanjang halaman
          (bukan cuma di bagian sinematik), di atas lapisan apa pun. */}
      <div className="fixed left-4 top-4 z-[70] sm:left-6 sm:top-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo.png"
          alt={siteConfig.brandName}
          className="h-9 w-auto sm:h-11 drop-shadow-lg" // <--- TAMBAHKAN SHADOW
        />
      </div>

      <WelcomeIntro />

      <div
        className={`transition-opacity duration-500 ${
          cinematicActive
            ? 'opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!cinematicActive}
      >
        <VideoBackground endRef={sentinelRef} />
        <CanvasErrorBoundary>
          <CinematicCanvas
            endingRushRef={endingRushRef}
            active={cinematicActive}
            sentinelRef={sentinelRef}
          />
        </CanvasErrorBoundary>
        <UIOverlay />
      </div>

      <div className="relative z-20">
        {/* Babak pembuka - kini ikut mengalir bersama scroll, bukan kotak
            yang menempel permanen di layar. */}
        <div className="relative flex min-h-[100dvh] items-center justify-center px-4 sm:px-8">
          {/* Tanpa kotak/kartu di belakang lagi - supaya scene ilustrasi
              tetap kelihatan penuh. Eyebrow masuk dari KIRI, judul dari
              KANAN (sama-sama cepat di awal lalu melambat pas mendarat),
              deskripsi baru fade-in setelah keduanya mendarat. */}
          <div className="max-w-4xl px-2 text-center sm:px-0 sm:text-left">
            <p className="animate-on-scroll hero-slide-in slide-in-left mb-3 font-sans text-[10px] uppercase tracking-[0.3em] text-cinematic-amber text-shadow-cinematic sm:mb-4 sm:text-xs">
              {siteConfig.hero.eyebrow}
            </p>
            <h1 className="animate-on-scroll hero-slide-in slide-in-right mb-4 whitespace-pre-line font-serif text-[clamp(2rem,7vw,5rem)] font-bold leading-[1.05] text-cinematic-cream text-shadow-cinematic sm:mb-6">
              {siteConfig.hero.title}
            </h1>
            <p className="animate-on-scroll hero-fade-delayed mx-auto max-w-lg font-serif text-sm italic text-cinematic-cream text-shadow-cinematic sm:mx-0 sm:text-lg md:text-xl">
              {siteConfig.hero.subtitle}
            </p>
          </div>
        </div>

        {/* Spacer kosong (tanpa teks) - menggantikan tinggi 3 section teks
            yang dihapus. Kamera 3D & pergantian scene background dikontrol
            berdasarkan progres scroll SELAMA kanvas ini kelihatan (dari
            atas halaman sampai sentinelRef di bawah - lihat CameraRig.js),
            jadi kalau tinggi halaman DI BAWAH sentinel berubah (mis.
            JourneySection makin panjang), kecepatan kamera di sini TIDAK
            ikut berubah lagi. Spacer ini menjaga jarak scroll tetap
            panjang supaya foto-foto yang terbang & pergantian scene
            background bisa dinikmati lebih lama, tanpa teks apa pun di
            atasnya. */}
        {/* Dinaikkan lagi ke 900dvh (2x lipat dari 450dvh) - foto terakhir
            masih belum sempat kelihatan penuh sebelum galeri memudar,
            jadi jarak scroll-nya diperpanjang lebih jauh lagi. */}
        <div className="min-h-[900dvh]" aria-hidden="true" />

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
