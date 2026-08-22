'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Pesawat kecil dekoratif yang terbang menyusuri section sambil discroll -
// biar halamannya berasa hidup, bukan cuma diam. Gerakannya sinus
// (kiri-kanan berulang) sepanjang tinggi section, dengan sedikit "banking"
// (miring ke arah belok) supaya berasa seperti terbang sungguhan.
//
// yStart/yEnd: rentang posisi vertikal (dalam % tinggi container) dari
// awal sampai akhir scroll. JourneySection memakai rentang yang lebih
// panjang (containernya jauh lebih tinggi, sampai ke bagian testimoni)
// dibanding WelcomeIntro (cuma 1 layar).
export default function FlyingPlane({
  containerRef,
  zigzags = 3,
  yStart = 8,
  yEnd = 48,
}) {
  const planeRef = useRef(null);
  // PENTING: sebelumnya id gradient ini pakai useId() dari React, yang
  // menghasilkan string berisi karakter ":" (mis. ":r3:"). Karakter itu
  // bikin referensi `stroke="url(#...)"` gagal di-resolve oleh sebagian
  // browser walau elemen gradient-nya sendiri ada di DOM - efeknya SELURUH
  // garis (bukan cuma gradasinya) jadi tidak tergambar sama sekali, itu
  // sebabnya garis putus-putus ekor pesawat sempat hilang total. ID acak
  // tanpa karakter khusus di bawah ini aman dipakai di dalam url(#...).
  const gradientId = useRef(
    `plane-trail-${Math.random().toString(36).slice(2)}`
  ).current;

  useEffect(() => {
    const plane = planeRef.current;
    const container = containerRef?.current;
    if (!plane || !container) return undefined;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom bottom',
      // Scrub lebih besar dari sebelumnya (1.1 -> 1.8) supaya gerakannya
      // "mengejar" scroll lebih lamban & lembut, tidak terkesan buru-buru.
      scrub: 1.8,
      onUpdate: (self) => {
        const p = self.progress;
        const wave = Math.sin(p * Math.PI * zigzags);
        const slope = Math.cos(p * Math.PI * zigzags);

        const xPercent = 50 + wave * 38;
        const yPercent = yStart + p * (yEnd - yStart);
        // Bank sedikit dikurangi (32 -> 24) supaya belokannya terasa lebih
        // melengkung/lembut, bukan mematuk kaku tiap ganti arah.
        const bank = slope * 24;

        plane.style.left = `${xPercent}%`;
        plane.style.top = `${yPercent}%`;
        plane.style.transform = `translate(-50%, -50%) rotate(${
          90 + bank
        }deg)`;
      },
    });

    return () => trigger.kill();
  }, [containerRef, zigzags, yStart, yEnd]);

  return (
    <div
      ref={planeRef}
      className="plane-glide pointer-events-none absolute z-30 hidden sm:block"
      style={{ left: '50%', top: `${yStart}%` }}
    >
      {/* Ikon pesawat - sedikit diperbesar (34px -> 44px) supaya lebih
          jelas terlihat. */}
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        className="relative z-10 drop-shadow-[0_4px_10px_rgba(30,58,76,0.35)]"
      >
        <path
          d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z"
          fill="#E0A45C"
          stroke="#1E3A4C"
          strokeWidth="0.4"
        />
      </svg>

      {/* Ekor garis putus-putus - jauh lebih panjang dari sebelumnya (dulu
          cuma ~26px, sekarang ~160px) dan memudar transparan di ujungnya
          (gradient) supaya terkesan jejak terbang panjang, bukan garis
          tegas yang tiba-tiba terputus. */}
      <svg
        width="44"
        height="210"
        viewBox="0 0 44 210"
        className="absolute left-0 top-0 z-0"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0A45C" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#E0A45C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="22"
          y1="38"
          x2="22"
          y2="200"
          stroke={`url(#${gradientId})`}
          strokeWidth="2.4"
          strokeDasharray="5 7"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
