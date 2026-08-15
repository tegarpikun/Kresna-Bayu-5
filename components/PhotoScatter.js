'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { galleryPhotos } from '@/lib/photoData';

// Fallback color per index, dipakai kalau foto gagal dimuat (mis. koneksi
// lambat, hotlink diblokir, dsb.) supaya galeri tetap tampil rapi dan
// TIDAK melempar error yang bisa menjatuhkan seluruh aplikasi.
const FALLBACK_COLORS = ['#8a6a4f', '#3f6b6c', '#6f5a3e', '#4a5568'];

// Loader manual pakai elemen <img> DOM SUNGGUHAN (bukan objek Image()
// lepas, bukan THREE.TextureLoader) - ditempel tersembunyi ke document.body
// supaya cara browser memperlakukan request ini 100% identik dengan tag
// <img> biasa yang sudah terbukti berhasil di grid "Destinasi Favorit".
// Sebelumnya dipakai `new Image()` yang TIDAK pernah nempel ke DOM - itu
// dicurigai jadi salah satu sebab request-nya gampang dibatalkan browser
// (NS_BINDING_ABORTED), terutama karena SEMUA foto ini diminta serentak.
//
// Untuk alasan yang sama, permintaan setiap foto sengaja DIBERI JEDA
// singkat berurutan (bukan ke-8 nya ditembak bersamaan dalam satu event
// loop) supaya tidak terjadi "ledakan" banyak request besar sekaligus.
//
// PENTING: proses loading disimpan di cache LEVEL MODULE (di luar React),
// bukan di dalam useEffect komponennya. Ini supaya kalau komponennya
// sempat dipasang-lepas-dipasang lagi dengan cepat (mount/unmount cycle)
// saat render pertama, proses download gambar yang sedang berjalan TIDAK
// ikut terputus/dibatalkan - dia jalan terus independen, dan komponen mana
// pun yang butuh hasilnya (termasuk instance yang baru dipasang ulang)
// tinggal "berlangganan" ke cache yang sama.
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 600;
const STAGGER_MS = 180;
const imageCache = new Map();
let staggerIndex = 0;

function getHiddenPreloadContainer() {
  if (typeof document === 'undefined') return null;
  let container = document.getElementById('__gallery-preload__');
  if (!container) {
    container = document.createElement('div');
    container.id = '__gallery-preload__';
    // Tersembunyi total dari layar & pembaca layar, TAPI tetap bagian sah
    // dari DOM - bukan display:none (beberapa browser menunda/tidak
    // memuat gambar yang display:none dari elemen yang baru dibuat).
    container.style.position = 'absolute';
    container.style.width = '1px';
    container.style.height = '1px';
    container.style.overflow = 'hidden';
    container.style.opacity = '0';
    container.style.pointerEvents = 'none';
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);
  }
  return container;
}

function getOrCreateImageEntry(url) {
  let entry = imageCache.get(url);
  if (entry) return entry;

  entry = { status: 'loading', image: null, listeners: new Set() };
  imageCache.set(url, entry);

  const delay = staggerIndex * STAGGER_MS;
  staggerIndex += 1;

  const attemptLoad = (attempt, initialDelay = 0) => {
    const startLoad = () => {
      const container = getHiddenPreloadContainer();
      const image = document.createElement('img');
      image.loading = 'eager';
      image.decoding = 'async';

      image.onload = () => {
        entry.status = 'loaded';
        entry.image = image;
        console.log('[PhotoScatter] loaded:', url, image.naturalWidth, 'x', image.naturalHeight);
        entry.listeners.forEach((cb) => cb());
      };

      image.onerror = (e) => {
        console.warn('[PhotoScatter] gagal load (percobaan', attempt, '):', url, e);
        if (attempt < MAX_RETRIES) {
          setTimeout(() => attemptLoad(attempt + 1), RETRY_DELAY_MS * attempt);
        } else {
          entry.status = 'failed';
          entry.listeners.forEach((cb) => cb());
        }
      };

      if (container) container.appendChild(image);
      image.src = url;
    };

    if (initialDelay > 0) {
      setTimeout(startLoad, initialDelay);
    } else {
      startLoad();
    }
  };

  attemptLoad(1, delay);
  return entry;
}

function useSafeTexture(url) {
  const [, forceRender] = useState(0);

  useEffect(() => {
    const entry = getOrCreateImageEntry(url);
    const onChange = () => forceRender((n) => n + 1);
    entry.listeners.add(onChange);
    // Kalau entry ini sudah selesai (loaded/failed) SEBELUM komponen ini
    // sempat berlangganan, langsung trigger render sekali supaya statusnya
    // ke-refresh dan tidak macet di kondisi loading selamanya.
    if (entry.status !== 'loading') onChange();

    return () => {
      entry.listeners.delete(onChange);
    };
  }, [url]);

  const entry = imageCache.get(url);
  if (!entry || entry.status === 'loading') {
    return { texture: null, failed: false };
  }
  if (entry.status === 'failed') {
    return { texture: null, failed: true };
  }

  if (!entry.texture) {
    entry.texture = new THREE.Texture(entry.image);
    entry.texture.colorSpace = THREE.SRGBColorSpace;
    entry.texture.anisotropy = 4;
    entry.texture.needsUpdate = true;
    console.log('[PhotoScatter] texture dibuat untuk:', url, entry.texture);
  }
  return { texture: entry.texture, failed: false };
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
