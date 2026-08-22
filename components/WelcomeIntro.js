'use client';

import { useEffect, useRef, useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import FlyingPlane from '@/components/FlyingPlane';

const HEADLINE = 'Selamat Datang di Situs Kresna Bayu Tour!';

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
const VIDEO_CARDS = [
  {
    src: '/videos/welcome-1.mp4',
    wrapClass:
      'left-[2%] top-[12%] w-40 h-52 -rotate-6 sm:left-[6%] sm:w-48 sm:h-64 lg:w-56 lg:h-72',
    animClass: 'slide-in-left',
  },
  {
    src: '/videos/welcome-2.mp4',
    wrapClass:
      'right-[2%] top-[8%] w-36 h-48 rotate-6 sm:right-[8%] sm:w-44 sm:h-56 lg:w-52 lg:h-64',
    animClass: 'slide-in-right',
  },
  {
    src: '/videos/welcome-3.mp4',
    wrapClass:
      'bottom-[6%] right-[10%] w-32 h-44 rotate-3 sm:right-[16%] sm:w-40 sm:h-52 lg:w-48 lg:h-60',
    animClass: 'slide-in-right',
  },
];

function VideoCard({ src, wrapClass, animClass }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <div
      className={`animate-on-scroll hero-slide-in ${animClass} pointer-events-none absolute hidden overflow-hidden rounded-lg border-4 border-cinematic-black shadow-2xl md:block ${wrapClass}`}
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
  );
}

export default function WelcomeIntro() {
  const sectionRef = useRef(null);
  const typed = useTypewriter(HEADLINE);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-welcome-bg px-4 sm:px-8"
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
      </div>
    </section>
  );
}
