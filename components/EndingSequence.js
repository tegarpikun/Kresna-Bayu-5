'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { siteConfig, buildWhatsappLink } from '@/lib/siteConfig';

export default function EndingSequence({ onTriggerRush }) {
  const [phase, setPhase] = useState('idle'); // idle -> rushing -> done -> revealing
  const overlayRef = useRef(null);
  const creditRef = useRef(null);

  const handleClick = () => {
    if (phase !== 'idle') return;
    setPhase('rushing');

    if (onTriggerRush) onTriggerRush();

    const tl = gsap.timeline();

    // Fade ke PUTIH agar menyatu dengan JourneySection yang putih
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 2.2,
      ease: 'power2.inOut',
    }).call(() => setPhase('done'));

    tl.fromTo(
      creditRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
      '-=0.4'
    );

    // Tahan sebentar di layar putih, lalu buka kembali (reveal) supaya
    // pengguna bisa lanjut scroll ke bagian statis di bawahnya — bukan
    // jalan buntu permanen.
    tl.to(creditRef.current, {
      opacity: 0,
      duration: 0.6,
      delay: 2.2,
    });
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 1.4,
      ease: 'power2.inOut',
    }).call(() => setPhase('idle'));
  };

  return (
    <>
      {/* Konten utama sekarang menggunakan background putih */}
      <div className="relative z-20 flex min-h-[100dvh] flex-col items-center justify-center bg-white px-4 sm:px-8 text-center">
        <div className="text-panel-light animate-on-scroll max-w-2xl p-8 sm:p-14">
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.3em] text-amber-600 uppercase mb-4">
            Perusahaan Anda perlu Outing?
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,6vw,4rem)] text-slate-900 mb-5 sm:mb-6 leading-tight text-shadow-light">
            {siteConfig.endingHeadline}
          </h2>
          <p className="font-serif italic text-sm sm:text-lg text-slate-600 mb-8 sm:mb-10 max-w-md mx-auto">
            {siteConfig.endingSub}
          </p>

          <button
            type="button"
            onClick={handleClick}
            disabled={phase !== 'idle'}
            className="group relative inline-flex items-center gap-3 rounded-sm border border-amber-600/60 bg-gradient-to-r from-[#D4A574] to-[#C9A96E] px-7 sm:px-10 py-3.5 sm:py-4 font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-cinematic-black shadow-[0_10px_40px_rgba(212,165,116,0.25)] transition-transform duration-300 hover:scale-[1.03] disabled:opacity-70"
          >
            {siteConfig.ctaLabel}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </button>
        </div>
      </div>

      {/* Layar fade-to-white (sebelumnya fade-to-black) */}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[200] bg-white opacity-0"
        style={{ pointerEvents: phase === 'done' ? 'auto' : 'none' }}
      >
        <div
          ref={creditRef}
          className="flex h-full w-full flex-col items-center justify-center px-6 text-center opacity-0"
        >
          <p className="font-serif italic text-lg sm:text-2xl text-slate-900 mb-3">
            {siteConfig.creditLine}
          </p>
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.3em] text-amber-600 uppercase mb-10">
            2002-2026.
          </p>
          <a
            href={buildWhatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-cinematic-whatsapp px-8 py-3.5 font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-transform hover:scale-[1.03]"
          >
            Chat via WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
