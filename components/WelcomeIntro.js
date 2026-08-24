'use client';

import { useEffect, useRef, useState } from 'react';
import FlyingPlane from '@/components/FlyingPlane';

const HEADLINE = 'Melayani Sepenuh Hati';
const SUBLINE = 'Info selanjutnya scroll ke bawah.';

function useTypewriter(text, speed = 45, startDelay = 400) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let i = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setDisplay(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return display;
}

// PENTING: video ini masih PLACEHOLDER path - taruh file asli kamu di
// public/video/ dengan nama persis di bawah ini, atau ganti "src" sesuai
// nama file kamu. Selama file belum ada, kotaknya otomatis sembunyi rapi
// (tidak muncul kotak rusak/broken) berkat onError di bawah.
//
// Video "welcome-1" DIHAPUS (sesuai permintaan) - tersisa 2 kartu saja,
// dan posisinya sekarang dirapikan berdekatan dengan judul (bukan
// bertebaran ke pojok layar), serta digeser lebih ke atas supaya tidak
// pernah ketutupan shape divider di bagian bawah section.
//
// Setiap kartu punya "tilt" acak (kemiringan ringan, beda-beda tiap
// kartu tapi tidak berlebihan) dan durasi/delay animasi mengambang yang
// sedikit berbeda satu sama lain - supaya gerakannya terasa organik/acak,
// bukan serempak dan bukan diam kaku.
const VIDEO_CARDS = [
  {
    src: '/video/welcome-2.mp4',
    wrapClass:
      'left-[4%] top-[16%] w-40 h-24 sm:left-[8%] sm:top-[18%] sm:w-56 sm:h-36 lg:left-[13%] lg:top-[20%] lg:w-64 lg:h-40',
    animClass: 'slide-in-left',
    tilt: -6,
    floatDuration: 7.2,
    floatDelay: 0.3,
  },
  {
    src: '/video/welcome-3.mp4',
    wrapClass:
      'right-[4%] bottom-[20%] w-44 h-28 sm:right-[8%] sm:bottom-[22%] sm:w-60 sm:h-40 lg:right-[13%] lg:bottom-[24%] lg:w-72 lg:h-44',
    animClass: 'slide-in-right',
    tilt: 5,
    floatDuration: 6.4,
    floatDelay: 0.7,
  },
];

function VideoCard({ src, wrapClass, animClass, tilt, floatDuration, floatDelay }) {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return undefined;

    // Video hanya diputar saat kartunya benar-benar kelihatan di layar.
    // Begitu discroll menjauh (keluar viewport), video dijeda supaya
    // tidak membebani perangkat sia-sia; begitu discroll balik hingga
    // kelihatan lagi, otomatis lanjut main lagi dari posisi terakhir.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(videoEl);

    return () => observer.disconnect();
  }, []);

  if (failed) return null;

  return (
    <div
      className={`animate-on-scroll hero-slide-in ${animClass} pointer-events-none absolute hidden md:block ${wrapClass}`}
    >
      {/* Elemen luar mengurus animasi masuk (slide-in), elemen dalam ini
          yang mengurus kemiringan acak + gerakan mengambang terus-menerus
          - supaya keduanya tidak saling tabrakan/override. */}
      <div
        className="card-float h-full w-full overflow-hidden rounded-lg border-4 border-cinematic-black shadow-2xl"
        style={{
          '--tilt': `${tilt}deg`,
          animationDuration: `${floatDuration}s`,
          animationDelay: `${floatDelay}s`,
        }}
      >
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export default function WelcomeIntro() {
  const sectionRef = useRef(null);
  const typed = useTypewriter(HEADLINE);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="scroll-nav-target relative z-[55] flex min-h-[100dvh] items-center justify-center overflow-hidden bg-cinematic-black px-4 sm:px-8"
    >
      <FlyingPlane containerRef={sectionRef} />

      {/* Foto latar (ganti bg putih polos sebelumnya) + lapisan gelap
          gradasi di atasnya supaya judul & subjudul tetap terbaca jelas
          di atas foto yang ramai. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/welcome-bg.jpg"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cinematic-black/70 via-cinematic-black/45 to-cinematic-black/80" />
        <div className="absolute inset-0 bg-cinematic-black/10" />
        <div className="absolute -left-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-welcome-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-[26rem] w-[26rem] rounded-full bg-welcome-accent/15 blur-3xl" />
      </div>

      {VIDEO_CARDS.map((card) => (
        <VideoCard key={card.src} {...card} />
      ))}

      <div className="relative z-10 max-w-3xl text-center">
        <h1 className="min-h-[1.3em] font-display text-[clamp(1.6rem,5.5vw,3.4rem)] font-semibold leading-tight text-cinematic-cream text-shadow-cinematic">
          {typed}
          <span className="typewriter-cursor">|</span>
        </h1>

        {/* Sebelumnya bagian bawah headline kosong/terasa terlalu pendek -
            ditambah subjudul singkat + penanda scroll supaya section ini
            terasa lebih "penuh" dan mengarahkan pengunjung untuk lanjut
            scroll. */}
        <p className="mt-5 font-sans text-sm text-cinematic-cream/85 text-shadow-cinematic sm:text-base">
          {SUBLINE}
        </p>

        <div className="mt-10 flex justify-center sm:mt-14">
          <span
            aria-hidden="true"
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-cinematic-cream/40 p-1.5"
          >
            <span className="h-2 w-1 animate-bounce rounded-full bg-cinematic-amber/80" />
          </span>
        </div>
      </div>

      {/* Shape divider - transisi ke bagian sinematik di bawahnya. Diubah
          jadi "mengarah ke bawah" (lekukannya menjorok turun ke area
          gelap di bawah, bukan menonjol naik ke atas menutupi konten
          section ini) - sebelumnya salah satu puncak lengkungnya nyaris
          menyentuh batas paling atas divider sehingga ikut menutupi
          kartu video yang posisinya dekat bawah layar. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          className="h-14 w-full sm:h-20 lg:h-28"
        >
          <path
            d="M0,70 C180,110 360,60 540,85 C720,100 900,65 1080,90 C1260,105 1350,75 1440,95 L1440,110 L0,110 Z"
            fill="#030305"
          />
        </svg>
      </div>
    </section>
  );
}
