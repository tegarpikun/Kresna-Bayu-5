'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import CinematicLighting from './CinematicLighting';
import PhotoScatter from './PhotoScatter';
import DustParticles from './DustParticles';
import CameraRig from './CameraRig';

export default function CinematicCanvas({ endingRushRef, active = true }) {
  const [dustCount, setDustCount] = useState(500);

  useEffect(() => {
    // Kurangi jumlah partikel di layar kecil agar tetap ringan / mendekati 60fps.
    const isCompact = window.innerWidth < 768;
    setDustCount(isCompact ? 220 : 500);
  }, []);

  return (
    <div className="fixed inset-0 z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55, near: 0.1, far: 120 }}
        dpr={[1, 2]}
        // "never" menjeda render loop saat tidak aktif (hemat GPU) tanpa
        // membongkar kanvas/WebGL context, supaya tekstur yang sudah
        // dimuat tidak hilang dan tidak perlu di-reload saat aktif lagi.
        frameloop={active ? 'always' : 'never'}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        style={{ background: 'transparent' }}
      >
        {/* Densitas diturunkan (0.011 -> 0.007) menyesuaikan jangkauan
            kamera yang sekarang lebih jauh (sampai z=-63, sebelumnya
            cuma -38) setelah 6 foto baru ditambahkan - supaya foto-foto
            baru di ujung jalur tidak tertutup kabut berlebihan. */}
        <fogExp2 attach="fog" color="#030305" density={0.007} />

        <Suspense fallback={null}>
          <CinematicLighting />
          <PhotoScatter />
          <DustParticles count={dustCount} />
        </Suspense>

        <CameraRig endingRushRef={endingRushRef} />
      </Canvas>
    </div>
  );
}
