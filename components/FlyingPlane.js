'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Pesawat kecil dekoratif yang terbang zig-zag menyusuri bagian
// "welcoming" (Destinasi/FAQ/Testimoni/Footer) sambil discroll - biar
// halamannya berasa hidup, bukan cuma diam. Gerakannya sinus (kiri-kanan
// berulang) sepanjang tinggi section, dengan sedikit "banking" (miring ke
// arah belok) supaya berasa seperti terbang sungguhan, bukan geser datar.
export default function FlyingPlane({ containerRef }) {
  const planeRef = useRef(null);

  useEffect(() => {
    const plane = planeRef.current;
    const container = containerRef?.current;
    if (!plane || !container) return undefined;

    const ZIGZAGS = 4; // lebih sedikit bolak-balik = lebih tenang, tidak riuh

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: 1.1, // lebih besar = lebih smooth/tidak kaget mengikuti scroll
      onUpdate: (self) => {
        const p = self.progress;
        const wave = Math.sin(p * Math.PI * ZIGZAGS);
        const slope = Math.cos(p * Math.PI * ZIGZAGS);

        const xPercent = 50 + wave * 40; // 10% - 90% lebar layar
        // Sebelumnya 0%-100% (sampai ke footer, kejauhan ke bawah).
        // Sekarang ditahan di pita atas-tengah saja (8%-48%).
        const yPercent = 8 + p * 40;
        const bank = slope * 32; // derajat kemiringan saat berbelok

        plane.style.left = `${xPercent}%`;
        plane.style.top = `${yPercent}%`;
        plane.style.transform = `translate(-50%, -50%) rotate(${
          90 + bank
        }deg)`;
      },
    });

    return () => trigger.kill();
  }, [containerRef]);

  return (
    <div
      ref={planeRef}
      className="pointer-events-none absolute z-30 hidden sm:block"
      style={{ left: '50%', top: '8%' }}
    >
      {/* Ekor putus-putus pendek di belakang pesawat - posisinya di
          "bawah" ikon dalam koordinat lokal (sebelum rotasi), yang
          setelah wrapper diputar otomatis jadi "di belakang" arah
          terbangnya, seberapa pun kemiringan bank-nya. */}
      <svg
        width="34"
        height="60"
        viewBox="0 0 34 60"
        className="absolute left-0 top-0"
      >
        <line
          x1="17"
          y1="26"
          x2="17"
          y2="52"
          stroke="#E0A45C"
          strokeWidth="2"
          strokeDasharray="4 5"
          strokeLinecap="round"
          opacity="0.65"
        />
      </svg>
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        className="drop-shadow-[0_4px_10px_rgba(30,58,76,0.35)]"
      >
        <path
          d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z"
          fill="#E0A45C"
          stroke="#1E3A4C"
          strokeWidth="0.4"
        />
      </svg>
    </div>
  );
}
