'use client';

import { Suspense, useRef, Component } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { galleryPhotos } from '@/lib/photoData';

// Fallback color per index, dipakai kalau foto gagal dimuat (mis. koneksi
// lambat, hotlink diblokir, dsb.) supaya galeri tetap tampil rapi dan
// TIDAK melempar error yang bisa menjatuhkan seluruh aplikasi.
const FALLBACK_COLORS = ['#8a6a4f', '#3f6b6c', '#6f5a3e', '#4a5568'];

// Sebelumnya di sini dipakai loader manual (elemen <img> + THREE.Texture
// dibuat tangan sendiri) untuk menghindari dugaan masalah pembatalan
// request browser (NS_BINDING_ABORTED). Setelah ditelusuri, penyebab
// aslinya ternyata di header cache HTTP (sudah diperbaiki di
// next.config.js), BUKAN di cara loading gambarnya. Jadi sekarang kembali
// pakai THREE.TextureLoader resmi bawaan Three.js - lebih teruji dan
// menangani detail teknis (color space, source wiring, dst) dengan benar
// secara internal, dibanding bikin sendiri secara manual.
function PhotoPlane({ photo }) {
  const texture = useLoader(THREE.TextureLoader, photo.url);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return (
    <meshStandardMaterial
      map={texture}
      roughness={0.45}
      metalness={0.08}
      side={THREE.DoubleSide}
    />
  );
}

class PhotoErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.warn('[PhotoScatter] foto gagal dimuat, pakai warna fallback:', this.props.url, error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function LoadingPlaceholder() {
  return (
    <meshStandardMaterial color="#0a0a0c" roughness={0.6} metalness={0.05} side={THREE.DoubleSide} />
  );
}

function PhotoMesh({ photo, index }) {
  const meshRef = useRef();

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
      <PhotoErrorBoundary
        url={photo.url}
        fallback={
          <meshStandardMaterial
            color={FALLBACK_COLORS[index % FALLBACK_COLORS.length]}
            roughness={0.6}
            metalness={0.05}
            side={THREE.DoubleSide}
          />
        }
      >
        <Suspense fallback={<LoadingPlaceholder />}>
          <PhotoPlane photo={photo} />
        </Suspense>
      </PhotoErrorBoundary>
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
