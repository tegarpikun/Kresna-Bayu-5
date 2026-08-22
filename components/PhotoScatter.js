'use client';

import { Suspense, useRef, useState, useEffect, Component } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { galleryPhotos } from '@/lib/photoData';

// Fallback color per index, dipakai kalau foto gagal dimuat (mis. koneksi
// lambat, hotlink diblokir, dsb.) supaya galeri tetap tampil rapi dan
// TIDAK melempar error yang bisa menjatuhkan seluruh aplikasi.
const FALLBACK_COLORS = ['#8a6a4f', '#3f6b6c', '#6f5a3e', '#4a5568'];

// Jeda antar-foto (ms) saat dimuat bertahap - lihat catatan panjang di
// PhotoScatter() di bawah kenapa ini dibutuhkan.
const STAGGER_MS = 220;

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
  // Foto-foto ini ditampilkan relatif kecil & dari kejauhan (bagian dari
  // galeri yang melayang, bukan close-up penuh layar), jadi mipmap
  // (piramida versi kecil dari tekstur yang dibuat otomatis oleh GPU
  // untuk tiap foto) tidak banyak menambah kehalusan visual di sini -
  // tapi lumayan menambah pemakaian memori GPU & waktu upload tekstur
  // per foto. Dimatikan di sini (BUKAN dengan mengecilkan/mengompres
  // file fotonya) supaya total beban GPU turun tanpa foto aslinya
  // disentuh sama sekali - ini salah satu penyebab galeri sempat
  // tersendat/macet saat banyak foto dimuat bersamaan.
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 1;
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
  // Sebelumnya SEMUA foto galeri (8 foto) langsung mulai di-load
  // bersamaan begitu Canvas mount - tiap foto men-trigger decode gambar +
  // upload tekstur ke GPU sendiri-sendiri, dan kalau semuanya numpuk di
  // waktu yang sama (apalagi berbarengan dengan latar "mental canvas" di
  // VideoBackground.js yang juga berat), thread utama & GPU jadi
  // kebanjiran kerja sekaligus - itulah yang bikin animasi galeri 3D
  // sering nyendat/macet pas web pertama dibuka.
  //
  // Foto di lib/photoData.js SUDAH diurutkan dari yang paling dekat ke
  // kamera (posisi Z paling kecil, kelihatan duluan) sampai paling jauh -
  // jadi di sini foto dimuat SATU-SATU menyusul urutan itu (bukan
  // dikompres/diperkecil filenya sama sekali), dengan jeda singkat
  // antar-foto. Foto yang belum kebagian giliran otomatis masih pakai
  // warna solid polos (LoadingPlaceholder di atas) sampai gilirannya
  // tiba - jadi tetap tidak ada kotak kosong/error yang tampak, cuma
  // "beban kerja"-nya yang disebar pelan-pelan, bukan diledakkan sekaligus.
  const [revealCount, setRevealCount] = useState(Math.min(2, galleryPhotos.length));

  useEffect(() => {
    if (revealCount >= galleryPhotos.length) return undefined;
    const timer = setTimeout(() => {
      setRevealCount((c) => Math.min(galleryPhotos.length, c + 1));
    }, STAGGER_MS);
    return () => clearTimeout(timer);
  }, [revealCount]);

  return (
    <group>
      {galleryPhotos.map((photo, index) =>
        index < revealCount ? (
          <PhotoMesh key={photo.id} photo={photo} index={index} />
        ) : (
          // Placeholder ringan (tanpa tekstur sama sekali) untuk foto yang
          // belum kebagian giliran load - posisinya tetap ada di galeri
          // (tidak "loncat" muncul tiba-tiba nanti) tapi tanpa beban
          // decode/upload tekstur dulu.
          <mesh key={photo.id} position={photo.position} rotation={photo.rotation}>
            <planeGeometry args={[2.6, 1.7]} />
            <meshStandardMaterial
              color={FALLBACK_COLORS[index % FALLBACK_COLORS.length]}
              roughness={0.6}
              metalness={0.05}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      )}
    </group>
  );
}
