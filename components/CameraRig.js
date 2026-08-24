'use client';
import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
// Rentang perjalanan kamera di sumbu Z. Dikembalikan ke -38 (dari -63) -
// -63 itu sisa kalibrasi untuk rencana "6 foto baru" yang ternyata tidak
// pernah benar-benar ditambahkan ke lib/photoData.js (masih 8 foto, foto
// terjauh di z = -33.4). -38 memberi sedikit jarak lebih setelah foto
// terakhir supaya terasa "sampai tujuan", tanpa kamera bablas jauh ke
// ruang kosong.
const CAMERA_START_Z = 6;
const CAMERA_END_Z = -38;
const CAMERA_DRIFT_X = 2.2;
const CAMERA_DRIFT_Y = -1.1;
export default function CameraRig({ endingRushRef, sentinelRef }) {
  const { camera } = useThree();
  const scrollProgress = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const mouseDamped = useRef({ x: 0, y: 0 });
  const rushOffset = useRef(0);
  useEffect(() => {
    camera.position.set(0, 0, CAMERA_START_Z);

    // PENTING: sebelumnya progress dihitung dari scroll SELURUH halaman
    // (trigger document.documentElement, end 'bottom bottom') - itu BUG.
    // Kanvas 3D/galeri foto ini cuma kelihatan di bagian AWAL halaman
    // (sebelum sentinelRef, tempat cinematicActive di page.js jadi
    // false dan kanvas ini dibekukan+disembunyikan). Tapi progress-nya
    // dihitung sampai ke DASAR HALAMAN PENUH (termasuk seluruh
    // JourneySection - About/Destinasi/FAQ/Testimoni/Footer - yang jauh
    // lebih panjang). Akibatnya, selama kanvas ini masih kelihatan di
    // layar, progress baru jalan sedikit sekali (misal baru ~15-20%),
    // jadi kamera nyaris tidak bergerak - KELIHATAN SEPERTI BEKU padahal
    // sebenarnya jalan, cuma sangat lambat.
    //
    // Sekarang end-nya dipatok ke posisi sentinelRef (pakai endTrigger),
    // jadi progress 0->1 pas sama dengan rentang scroll SELAMA kanvas
    // ini benar-benar kelihatan di layar - berapa pun nanti panjangnya
    // JourneySection di bawah, tidak akan mempengaruhi kecepatan kamera
    // di sini lagi.
    const scrollConfig = sentinelRef?.current
      ? { endTrigger: sentinelRef.current, end: 'top top' }
      : { end: 'bottom bottom' }; // fallback kalau sentinel belum siap

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      ...scrollConfig,
      scrub: 2,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });
    const handlePointerMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    // Dipanggil oleh EndingSequence saat CTA penutup diklik: kamera melesat
    // maju menembus batas, terlepas dari posisi scroll.
    const handleRush = () => {
      trigger.disable();
      gsap.to(rushOffset, {
        current: -60,
        duration: 2.6,
        ease: 'power4.in',
      });
    };
    if (endingRushRef) {
      endingRushRef.current = handleRush;
    }
    return () => {
      trigger.kill();
      window.removeEventListener('pointermove', handlePointerMove);
      gsap.killTweensOf(rushOffset);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera]);
  useFrame(() => {
    const p = scrollProgress.current;
    mouseDamped.current.x += (mouse.current.x - mouseDamped.current.x) * 0.04;
    mouseDamped.current.y += (mouse.current.y - mouseDamped.current.y) * 0.04;
    const baseZ =
      CAMERA_START_Z + (CAMERA_END_Z - CAMERA_START_Z) * p + rushOffset.current;
    const drift = Math.min(p / 0.6, 1);
    const baseX = CAMERA_DRIFT_X * drift;
    const baseY = CAMERA_DRIFT_Y * drift;
    camera.position.z += (baseZ - camera.position.z) * 0.08;
    camera.position.x +=
      (baseX + mouseDamped.current.x * 0.6 - camera.position.x) * 0.06;
    camera.position.y +=
      (baseY + mouseDamped.current.y * 0.35 - camera.position.y) * 0.06;
    camera.lookAt(0, 0, camera.position.z - 10);
  });
  return null;
}'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Rentang perjalanan kamera di sumbu Z. Disesuaikan agar kamera benar-benar
// "menembus" seluruh jajaran foto di lib/photoData.js (foto terjauh ada di
// sekitar z = -58.6, setelah 6 foto baru ditambahkan - sebelumnya cuma
// sampai -33.4 / kamera berhenti di -38).
const CAMERA_START_Z = 6;
const CAMERA_END_Z = -63;
const CAMERA_DRIFT_X = 2.2;
const CAMERA_DRIFT_Y = -1.1;

export default function CameraRig({ endingRushRef }) {
  const { camera } = useThree();
  const scrollProgress = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const mouseDamped = useRef({ x: 0, y: 0 });
  const rushOffset = useRef(0);

  useEffect(() => {
    camera.position.set(0, 0, CAMERA_START_Z);

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    const handlePointerMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Dipanggil oleh EndingSequence saat CTA penutup diklik: kamera melesat
    // maju menembus batas, terlepas dari posisi scroll.
    const handleRush = () => {
      trigger.disable();
      gsap.to(rushOffset, {
        current: -60,
        duration: 2.6,
        ease: 'power4.in',
      });
    };

    if (endingRushRef) {
      endingRushRef.current = handleRush;
    }

    return () => {
      trigger.kill();
      window.removeEventListener('pointermove', handlePointerMove);
      gsap.killTweensOf(rushOffset);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera]);

  useFrame(() => {
    const p = scrollProgress.current;

    mouseDamped.current.x += (mouse.current.x - mouseDamped.current.x) * 0.04;
    mouseDamped.current.y += (mouse.current.y - mouseDamped.current.y) * 0.04;

    const baseZ =
      CAMERA_START_Z + (CAMERA_END_Z - CAMERA_START_Z) * p + rushOffset.current;
    const drift = Math.min(p / 0.6, 1);
    const baseX = CAMERA_DRIFT_X * drift;
    const baseY = CAMERA_DRIFT_Y * drift;

    camera.position.z += (baseZ - camera.position.z) * 0.08;
    camera.position.x +=
      (baseX + mouseDamped.current.x * 0.6 - camera.position.x) * 0.06;
    camera.position.y +=
      (baseY + mouseDamped.current.y * 0.35 - camera.position.y) * 0.06;

    camera.lookAt(0, 0, camera.position.z - 10);
  });

  return null;
}
