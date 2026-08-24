'use client';

import { useEffect, useRef } from 'react';

export default function UIOverlay({ cinematicActive = true }) {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const isFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches;

    if (!isFinePointer) return undefined;

    document.body.classList.add('custom-cursor-active');
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    const handleMouseMove = (e) => {
      if (cursor && cursorDot) {
        cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
        cursorDot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
      }
    };

    const handleMouseEnter = () => {
      if (cursor) cursor.style.transform += ' scale(1.5)';
    };
    const handleMouseLeave = () => {
      if (cursor) cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // PENTING: sebelumnya daftar elemen interaktif ini cuma diambil SEKALI
    // saat komponen pertama mount (document.querySelectorAll dipanggil
    // sekali lalu tidak pernah diulang). Tombol/link yang baru muncul di
    // DOM belakangan (mis. link navigasi, tombol lightbox galeri, FAQ
    // accordion, dsb - apa pun yang dirender kondisional setelah mount
    // awal) jadi TIDAK PERNAH kebagian efek membesar saat di-hover. Di
    // bawah ini dipasang MutationObserver supaya daftar elemen interaktif
    // ini otomatis ikut diperbarui setiap kali ada elemen baru masuk ke
    // halaman, tanpa perlu reload.
    const attachedElements = new Set();
    const attachHoverEffect = (el) => {
      if (attachedElements.has(el)) return;
      attachedElements.add(el);
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    };

    document
      .querySelectorAll('a, button, [role="button"]')
      .forEach(attachHoverEffect);

    const mutationObserver = new MutationObserver(() => {
      document
        .querySelectorAll('a, button, [role="button"]')
        .forEach(attachHoverEffect);
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      mutationObserver.disconnect();
      attachedElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Cursor custom ini SENGAJA dirender di luar div yang di-toggle
          opacity oleh cinematicActive (lihat app/page.js) - supaya dia
          SELALU tampil di sepanjang halaman, baik pas scroll naik maupun
          turun, tidak peduli lagi di bagian mana pun posisi scroll-nya
          sekarang. Sebelumnya nempel di dalam div yang sama dengan
          galeri 3D, jadi ikut disembunyikan (opacity-0) setiap kali
          status cinematicActive berubah - itulah yang bikin cursor
          kadang hilang total (baik cursor custom ini MAUPUN cursor
          bawaan browser, karena cursor bawaan browser juga sengaja
          dimatikan lewat class "custom-cursor-active" di body). */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={cursorDotRef} className="custom-cursor-dot hidden md:block" />

      {/* Vignette & teks "Gulir untuk menjelajah" ini MASIH ikut fade
          sesuai cinematicActive (memang cuma relevan pas di bagian
          animasi 3D, tidak perlu tampil terus di seluruh halaman). */}
      <div
        className={`vignette-overlay transition-opacity duration-500 ${
          cinematicActive ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`fixed bottom-[calc(4vh+3vh)] left-4 sm:left-8 z-30 safe-bottom transition-opacity duration-500 ${
          cinematicActive ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex items-center space-x-3 sm:space-x-4 text-cinematic-cream/60">
          <div className="w-8 sm:w-12 h-[1px] bg-cinematic-amber/50" />
          <span className="font-sans text-[10px] sm:text-xs tracking-widest uppercase">
            Gulir untuk menjelajah
          </span>
        </div>
      </div>
    </>
  );
}
