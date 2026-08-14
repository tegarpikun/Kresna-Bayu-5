'use client';

export default function CinematicLighting() {
  return (
    <>
      <ambientLight intensity={0.14} color="#1a1a2e" />

      {/* Key light - hangat (amber), dari kanan atas */}
      <directionalLight
        position={[8, 6, 4]}
        intensity={1.7}
        color="#d4a574"
      />

      {/* Fill light - dingin (teal), dari kiri bawah */}
      <directionalLight
        position={[-6, -3, 3]}
        intensity={1}
        color="#2c7a7b"
      />

      {/* Rim light tipis dari belakang objek - satu titik cukup untuk
          kesan siluet, tanpa menambah beban shader terlalu banyak. */}
      <pointLight position={[0, 2, -14]} intensity={0.7} color="#ffffff" distance={30} />
    </>
  );
}
