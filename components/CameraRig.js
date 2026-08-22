'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Rentang perjalanan kamera di sumbu Z. Disesuaikan agar kamera benar-benar
// "menembus" seluruh jajaran foto di lib/photoData.js (foto terjauh ada di
// sekitar z = -33).
const CAMERA_START_Z = 6;
const CAMERA_END_Z = -38;
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
