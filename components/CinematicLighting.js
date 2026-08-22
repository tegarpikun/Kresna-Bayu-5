'use client';

export default function CinematicLighting() {
  return (
    <>
      <ambientLight intensity={0.42} color="#3a3a52" />

      {/* Key light - hangat (amber), dari kanan atas */}
      <directionalLight
        position={[8, 6, 4]}
        intensity={2.1}
        color="#d4a574"
      />

      {/* Fill light - dingin (teal), dari kiri bawah */}
      <directionalLight
        position={[-6, -3, 3]}
        intensity={1.3}
        color="#2c7a7b"
      />

      {/* Rim light tipis dari belakang objek - satu titik cukup untuk
          kesan siluet, tanpa menambah beban shader terlalu banyak. */}
      <pointLight position={[0, 2, -14]} intensity={0.9} color="#ffffff" distance={30} />
    </>
  );
}
