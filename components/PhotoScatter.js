'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { galleryPhotos } from '@/lib/photoData';

// Fallback color per index, dipakai kalau foto gagal dimuat (mis. koneksi
// lambat, hotlink diblokir, dsb.) supaya galeri tetap tampil rapi dan
// TIDAK melempar error yang bisa menjatuhkan seluruh aplikasi.
const FALLBACK_COLORS = ['#8a6a4f', '#3f6b6c', '#6f5a3e', '#4a5568'];

// Loader manual pakai elemen Image() browser NATIVE (bukan THREE.TextureLoader
// sama sekali) supaya cara memuat foto ini 100% identik dengan tag <img>
// biasa yang sudah terbukti berhasil di grid "Destinasi Favorit" - tidak ada
// setting crossOrigin atau perilaku loader Three.js yang bisa beda sendiri.
//
// Ditambah retry otomatis: kalau request sempat gagal/dibatalkan browser
// (mis. NS_BINDING_ABORTED karena race condition saat halaman baru dimuat),
// dicoba ulang sampai 3x dengan jeda singkat sebelum benar-benar dianggap
// gagal dan jatuh ke warna fallback.
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 600;

function useSafeTexture(url) {
  const [texture, setTexture] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let retryTimeoutId;
    let attempt = 0;

    const tryLoad = () => {
      const image = new Image();
      // Sengaja TIDAK menyentuh image.crossOrigin sama sekali di sini.
      // fetchPriority 'high' supaya browser TIDAK membatalkan/menunda
      // request foto ini demi resource lain (mis. video background) yang
      // kebetulan mulai dimuat bersamaan di detik-detik awal halaman.
      if ('fetchPriority' in image) {
        image.fetchPriority = 'high';
      }

      image.onload = () => {
        if (!isMounted) return;
        const loadedTexture = new THREE.Texture(image);
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        loadedTexture.anisotropy = 4;
        loadedTexture.needsUpdate = true;
        setTexture(loadedTexture);
      };

      image.onerror = () => {
        if (!isMounted) return;
        attempt += 1;
        if (attempt < MAX_RETRIES) {
          retryTimeoutId = setTimeout(tryLoad, RETRY_DELAY_MS * attempt);
        } else {
          setFailed(true);
        }
      };

      image.src = url;
    };

    tryLoad();

    return () => {
      isMounted = false;
      if (retryTimeoutId) clearTimeout(retryTimeoutId);
    };
  }, [url]);

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
