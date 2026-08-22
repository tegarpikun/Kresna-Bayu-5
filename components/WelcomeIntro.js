'use client';

import { useEffect, useRef, useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import FlyingPlane from '@/components/FlyingPlane';

const HEADLINE = 'Selamat Datang di Situs Kresna Bayu Tour!';
const SUBLINE = 'Gulir ke bawah untuk memulai perjalanan sinematik kami.';

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
// public/videos/ dengan nama persis di bawah ini, atau ganti "src" sesuai
// nama file kamu. Selama file belum ada, kotaknya otomatis sembunyi rapi
// (tidak muncul kotak rusak/broken) berkat onError di bawah.
//
// Setiap kartu punya "tilt" acak (kemiringan ringan, beda-beda tiap
// kartu tapi tidak berlebihan) dan durasi/delay animasi mengambang yang
// sedikit berbeda satu sama lain - supaya gerakannya terasa organik/acak,
// bukan serempak dan bukan diam kaku.
const VIDEO_CARDS = [
  {
    src: '/video/welcome-1.mp4',
    wrapClass:
      'right-[3%] top-[8%] w-56 h-32 sm:right-[6%] sm:w-72 sm:h-44 lg:w-[26rem] lg:h-60',
    animClass: 'slide-in-right',
    tilt: 5,
    floatDuration: 5.6,
    floatDelay: 0,
  },
  {
    src: '/video/welcome-2.mp4',
    wrapClass:
      'left-[3%] bottom-[8%] w-44 h-28 sm:left-[6%] sm:w-56 sm:h-36 lg:w-64 lg:h-40',
    animClass: 'slide-in-left',
    tilt: -6,
    floatDuration: 6.4,
    floatDelay: 0.5,
  },
  {
    src: '/video/welcome-3.mp4',
    wrapClass:
      'left-[34%] bottom-[3%] w-48 h-28 sm:left-[38%] sm:w-64 sm:h-40 lg:w-72 lg:h-44',
    animClass: 'slide-in-left',
    tilt: 4,
    floatDuration: 5,
    floatDelay: 0.9,
  },
];

function VideoCard({ src, wrapClass, animClass, tilt, floatDuration, floatDelay }) {
  const [failed, setFailed] = useState(false);
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
      ref={sectionRef}
      className="relative z-[55] flex min-h-[100dvh] items-center justify-center overflow-hidden bg-welcome-bg px-4 sm:px-8"
    >
      <FlyingPlane containerRef={sectionRef} />

      {/* BG putih dengan gradasi warna lembut (bukan flat polos). */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-welcome-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-[26rem] w-[26rem] rounded-full bg-welcome-accent/15 blur-3xl" />
      </div>

      <div className="absolute right-4 top-4 z-40 sm:right-6 sm:top-6">
        <LanguageSwitcher variant="light" />
      </div>

      {VIDEO_CARDS.map((card) => (
        <VideoCard key={card.src} {...card} />
      ))}

      <div className="relative z-10 max-w-3xl text-center">
        <h1 className="min-h-[1.3em] font-display text-[clamp(1.6rem,5.5vw,3.4rem)] font-semibold leading-tight text-welcome-text">
          {typed}
          <span className="typewriter-cursor">|</span>
        </h1>

        {/* Sebelumnya bagian bawah headline kosong/terasa terlalu pendek -
            ditambah subjudul singkat + penanda scroll supaya section ini
            terasa lebih "penuh" dan mengarahkan pengunjung untuk lanjut
            scroll. */}
        <p className="mt-5 font-sans text-sm text-welcome-textSoft sm:text-base">
          {SUBLINE}
        </p>

        <div className="mt-10 flex justify-center sm:mt-14">
          <span
            aria-hidden="true"
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-welcome-primary/40 p-1.5"
          >
            <span className="h-2 w-1 animate-bounce rounded-full bg-welcome-primary/70" />
          </span>
        </div>
      </div>

      {/* Shape divider - transisi ke bagian sinematik di bawahnya dibuat
          melengkung/organik, bukan garis kotak lurus. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          className="h-14 w-full sm:h-20 lg:h-28"
        >
          <path
            d="M0,32 C180,90 360,0 540,28 C720,56 900,100 1080,60 C1260,20 1350,70 1440,40 L1440,110 L0,110 Z"
            fill="#030305"
          />
        </svg>
      </div>
    </section>
  );
}
