'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// "Mental canvas" - scene ilustrasi 2 lapisan (langit jauh + kota-dekat)
// yang bergerak dengan KECEPATAN BERBEDA saat discroll (parallax), supaya
// terasa berdimensi/3D walau bahannya gambar 2D datar. Lapisan dekat
// (kota + Tugu Jogja) bergerak lebih cepat daripada lapisan jauh (langit +
// bulan), persis seperti mata kita melihat objek dekat "lewat" lebih cepat
// daripada objek jauh saat kita bergerak.
//
// Nama file komponen ini masih "VideoBackground" (dipakai di banyak tempat)
// walau isinya sudah bukan video lagi - supaya tidak perlu ubah import di
// page.js. Ganti nama filenya kapan-kapan kalau sempat beres-beres.
export default function VideoBackground({ endRef }) {
  const skyRef = useRef(null);
  const cityRef = useRef(null);

  useEffect(() => {
    const sky = skyRef.current;
    const city = cityRef.current;
    if (!sky || !city) return undefined;

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      // Batas akhir mengikuti elemen sentinel akhir babak sinematik (dikirim
      // dari page.js), BUKAN akhir seluruh halaman - supaya pergerakan scene
      // ini selesai tepat saat babak sinematik berakhir.
      end: () =>
        `+=${
          endRef?.current ? endRef.current.offsetTop : window.innerHeight * 5
        }`,
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;
        // Lapisan jauh (langit+bulan): gerak pelan & sedikit membesar.
        sky.style.transform = `translate3d(0, ${p * -6}%, 0) scale(${
          1.08 + p * 0.05
        })`;
        // Lapisan dekat (kota+Tugu Jogja): gerak lebih cepat.
        city.style.transform = `translate3d(0, ${p * -14}%, 0) scale(${
          1.1 + p * 0.08
        })`;
      },
    });

    return () => trigger.kill();
  }, [endRef]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-cinematic-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={skyRef}
        src="/hero-scene/yogyakarta-sky.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-bottom will-change-transform"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={cityRef}
        src="/hero-scene/yogyakarta-city.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-bottom will-change-transform"
      />
      {/* Tint gelap supaya teks & foto 3D di atasnya tetap terbaca. */}
      <div className="absolute inset-0 bg-cinematic-black/45" />
    </div>
  );
}
