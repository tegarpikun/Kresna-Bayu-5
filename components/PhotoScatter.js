'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { galleryPhotos } from '@/lib/photoData';

// Fallback color per index, dipakai kalau foto gagal dimuat (mis. koneksi
// lambat, hotlink diblokir, dsb.) supaya galeri tetap tampil rapi dan
// TIDAK melempar error yang bisa menjatuhkan seluruh aplikasi.
const FALLBACK_COLORS = ['#8a6a4f', '#3f6b6c', '#6f5a3e', '#4a5568'];

// Loader manual (bukan drei's useTexture) supaya kegagalan load gambar
// ditangani dengan try/catch sendiri, bukan dilempar lewat React Suspense
// sebagai exception yang tidak tertangkap.
//
// "delayMs" menunda MULAI-nya loading tiap foto secara berjenjang, supaya
// decode + upload ke GPU untuk 8 foto tidak numpuk di frame yang sama
// persis (itu yang bikin sempat terasa "macet sesaat" sebelum semua foto
// muncul bersamaan). Foto pertama tetap langsung dimuat tanpa jeda.
function useSafeTexture(url, delayMs = 0) {
  const [texture, setTexture] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let timeoutId;
    const loader = new THREE.TextureLoader();
    // CATATAN: sengaja TIDAK di-set loader.setCrossOrigin('anonymous') di
    // sini. Foto-foto ini satu domain dengan situsnya sendiri (same-origin),
    // dan kita tidak butuh baca piksel mentahnya (tidak ada toDataURL /
    // readPixels), jadi crossOrigin tidak diperlukan. Menyetelnya justru
    // bisa memicu browser mengirim request dengan mode berbeda yang di
    // sebagian konfigurasi hosting/CDN malah membuat gambar gagal dimuat
    // (walau filenya sendiri valid dan bisa dibuka langsung di tab baru).

    const startLoad = () => {
      loader.load(
        url,
        (loaded) => {
          if (!isMounted) return;
          loaded.colorSpace = THREE.SRGBColorSpace;
          loaded.anisotropy = 4;
          loaded.needsUpdate = true;
          setTexture(loaded);
        },
        undefined,
        () => {
          if (isMounted) setFailed(true);
        }
      );
    };

    if (delayMs > 0) {
      timeoutId = setTimeout(startLoad, delayMs);
    } else {
      startLoad();
    }

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [url, delayMs]);

  return { texture, failed };
}

function PhotoMesh({ photo, index }) {
  const meshRef = useRef();
  const { texture, failed } = useSafeTexture(photo.url);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y =
      photo.rotation[1] + Math.sin(t * 0.15 + index) * 0.02;
    meshRef.current.position.y =
      photo.position[1] + Math.sin(t * 0.3 + index) * 0.08;
  });

  return (
    <mesh ref={meshRef} position={photo.position} rotation={photo.rotation}>
      <planeGeometry args={[2.6, 1.7, 16, 16]} />
      {texture ? (
        <meshStandardMaterial
          map={texture}
          roughness={0.45}
          metalness={0.08}
          side={THREE.DoubleSide}
        />
      ) : (
        <meshStandardMaterial
          color={failed ? FALLBACK_COLORS[index % FALLBACK_COLORS.length] : '#0a0a0c'}
          roughness={0.6}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      )}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[2.72, 1.82]} />
        <meshBasicMaterial color="#030305" side={THREE.DoubleSide} />
      </mesh>
    </mesh>
  );
}

export default function PhotoScatter() {
  return (
    <group>
      {galleryPhotos.map((photo, index) => (
        <PhotoMesh key={photo.id} photo={photo} index={index} />
      ))}
    </group>
  );
}
