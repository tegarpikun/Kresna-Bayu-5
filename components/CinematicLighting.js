'use client';

export default function CinematicLighting() {
  return (
    <>
      {/* Ambient dinaikkan (0.42 -> 0.85) dan warnanya dinetralkan (dari
          biru-ungu gelap #3a3a52 jadi abu-abu terang) supaya foto galeri
          tidak muram/gelap, tetap kelihatan warna aslinya. */}
      <ambientLight intensity={0.85} color="#cfd0da" />

      {/* Key light - hangat (amber), dari kanan atas */}
      <directionalLight
        position={[8, 6, 4]}
        intensity={2.4}
        color="#d4a574"
      />

      {/* Fill light - dingin (teal), dari kiri bawah */}
      <directionalLight
        position={[-6, -3, 3]}
        intensity={1.6}
        color="#2c7a7b"
      />

      {/* Rim light tipis dari belakang objek - satu titik cukup untuk
          kesan siluet, tanpa menambah beban shader terlalu banyak. */}
      <pointLight position={[0, 2, -14]} intensity={1.1} color="#ffffff" distance={30} />
    </>
  );
}
