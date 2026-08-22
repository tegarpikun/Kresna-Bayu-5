'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// "Mental canvas" - 4 scene ilustrasi (masing-masing 2 lapisan: langit-jauh
// + landmark-dekat) yang BERGANTIAN mengikuti babak cerita saat discroll -
// bukan cuma satu kota, dan semuanya siang hari. Tiap scene aktif di 1/4
// bagian scroll (hero + 3 babak), saling menyilang (crossfade) di
// perbatasannya. Di dalam scene yang aktif, lapisan dekat bergerak lebih
// cepat dari lapisan jauh (parallax) supaya berasa berdimensi walau
// bahannya ilustrasi 2D datar.
const SCENES = [
  { sky: '/hero-scene/aceh-sky.png', near: '/hero-scene/aceh-near.png', label: 'Aceh' },
  { sky: '/hero-scene/borobudur-sky.png', near: '/hero-scene/borobudur-near.png', label: 'Borobudur' },
  { sky: '/hero-scene/padang-sky.png', near: '/hero-scene/padang-near.png', label: 'Padang' },
  { sky: '/hero-scene/banten-sky.png', near: '/hero-scene/banten-near.png', label: 'Banten' },
];

// Jeda antar-scene (ms) saat gambar latar dimuat bertahap - lihat catatan
// di komponen VideoBackground di bawah.
const SCENE_STAGGER_MS = 300;

export default function VideoBackground({ endRef }) {
  const sceneRefs = useRef([]);
  // Ke-8 gambar latar (4 scene x 2 lapisan) berukuran cukup besar
  // (2200x1237px). Sebelumnya semuanya dimuat SEKALIGUS begitu halaman
  // dibuka walau cuma scene pertama yang kelihatan - ini salah satu
  // sumber beban berat di awal yang bikin animasi galeri foto 3D
  // (PhotoScatter) ikut tersendat karena berebut waktu decode gambar di
  // thread utama. Sekarang scene pertama tetap dimuat langsung (supaya
  // background tidak kosong), sisanya menyusul bertahap satu-satu -
  // TANPA mengubah/mengompres file gambar itu sendiri sama sekali.
  const [readyCount, setReadyCount] = useState(1);

  useEffect(() => {
    if (readyCount >= SCENES.length) return undefined;
    const timer = setTimeout(() => {
      setReadyCount((c) => Math.min(SCENES.length, c + 1));
    }, SCENE_STAGGER_MS);
    return () => clearTimeout(timer);
  }, [readyCount]);

  useEffect(() => {
    const scenes = sceneRefs.current.filter(Boolean);
    if (scenes.length === 0) return undefined;

    const segment = 1 / SCENES.length;

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      // Batas akhir mengikuti elemen sentinel akhir babak sinematik (dikirim
      // dari page.js) - BUKAN akhir seluruh halaman.
      end: () =>
        `+=${
          endRef?.current ? endRef.current.offsetTop : window.innerHeight * 5
        }`,
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;

        scenes.forEach((scene, i) => {
          const center = segment * (i + 0.5);
          // Jendela segitiga: opacity 1 tepat di tengah babak scene ini,
          // turun ke 0 di tengah babak tetangga - jadi otomatis saling
          // menyilang (crossfade) di perbatasan, tanpa "patah".
          const distance = Math.abs(p - center);
          const opacity = Math.max(0, 1 - distance / segment);
          scene.wrapper.style.opacity = opacity;

          // Progress LOKAL di dalam jendela scene ini sendiri (0..1),
          // dipakai buat parallax supaya tiap scene selalu mulai & selesai
          // gerak dari titik yang sama, bukan ikut posisi scroll global.
          const localStart = segment * i;
          const local = Math.min(
            1,
            Math.max(0, (p - localStart) / segment)
          );

          // Lapisan jauh: gerak pelan, HAMPIR TANPA zoom - supaya seluruh
          // langit & landmark tetap kelihatan penuh, tidak kepotong.
          // Dijaga dengan pengecekan null karena gambar scene ke-2 dst
          // sengaja BELUM tentu ter-mount (masih menyusul giliran
          // dimuat) di detik-detik awal halaman dibuka.
          if (scene.sky) {
            scene.sky.style.transform = `translate3d(0, ${
              local * -3
            }%, 0) scale(${1.01 + local * 0.015})`;
          }
          // Lapisan dekat: gerak lebih cepat + sedikit geser horizontal -
          // inilah yang bikin kesan "mental canvas"/berdimensi. Zoom juga
          // ditekan seminim mungkin supaya bangunan utuh selalu penuh
          // kelihatan.
          if (scene.near) {
            scene.near.style.transform = `translate3d(${
              (i % 2 === 0 ? 1 : -1) * local * 1.5
            }%, ${local * -8}%, 0) scale(${1.02 + local * 0.02})`;
          }
        });
      },
    });

    return () => trigger.kill();
  }, [endRef]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-cinematic-black">
      {SCENES.map((scene, i) => (
        <div
          key={scene.label}
          ref={(el) => {
            // Wrapper-nya SELALU dipasang untuk semua 4 scene sejak awal
            // (supaya ScrollTrigger di atas selalu punya referensi yang
            // stabil untuk tiap scene, termasuk yang gambarnya masih
            // menyusul dimuat). Objeknya dipertahankan (bukan dibuat
            // ulang) supaya field sky/near yang diisi belakangan oleh ref
            // callback <img> di bawah tidak tertimpa balik ke null.
            if (el) {
              if (!sceneRefs.current[i]) sceneRefs.current[i] = {};
              sceneRefs.current[i].wrapper = el;
            }
          }}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          {i < readyCount && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={(el) => {
                  if (el) {
                    if (!sceneRefs.current[i]) sceneRefs.current[i] = {};
                    sceneRefs.current[i].sky = el;
                  }
                }}
                data-layer="sky"
                src={scene.sky}
                alt=""
                aria-hidden="true"
                fetchPriority={i === 0 ? 'high' : 'low'}
                className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={(el) => {
                  if (el) {
                    if (!sceneRefs.current[i]) sceneRefs.current[i] = {};
                    sceneRefs.current[i].near = el;
                  }
                }}
                data-layer="near"
                src={scene.near}
                alt=""
                aria-hidden="true"
                fetchPriority={i === 0 ? 'high' : 'low'}
                className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
              />
            </>
          )}
        </div>
      ))}
      {/* Tint tipis + gradasi atas-bawah - secukupnya supaya teks & foto 3D
          di atasnya tetap terbaca, TANPA membuat scene jadi gelap rata.
          Bagian tengah sengaja lebih terang (warna & bangunan tetap
          hidup), gelap hanya menumpuk di tepi atas/bawah tempat teks
          biasanya berada. */}
      <div className="absolute inset-0 bg-gradient-to-b from-cinematic-black/55 via-cinematic-black/10 to-cinematic-black/60" />
    </div>
  );
}
