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

    const ZIGZAGS = 6; // berapa kali bolak-balik kiri-kanan sepanjang section

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        const wave = Math.sin(p * Math.PI * ZIGZAGS);
        const slope = Math.cos(p * Math.PI * ZIGZAGS);

        const xPercent = 50 + wave * 40; // 10% - 90% lebar layar
        const yPercent = p * 100;
        const bank = slope * 32; // derajat kemiringan saat berbelok

        plane.style.left = `${xPercent}%`;
        plane.style.top = `${yPercent}%`;
        // 90deg dasar supaya ikon (nose menghadap atas secara default)
        // menghadap ke KANAN sebagai arah maju, lalu dimiringkan (bank)
        // sesuai arah belok kiri/kanan.
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
      style={{ left: '50%', top: '0%' }}
    >
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
