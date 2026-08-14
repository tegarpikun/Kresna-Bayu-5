'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DustParticles({ count = 500 }) {
  const pointsRef = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 45 - 10;

      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        colors[i3] = 0.83;
        colors[i3 + 1] = 0.65;
        colors[i3 + 2] = 0.45;
      } else if (colorChoice < 0.7) {
        colors[i3] = 0.7;
        colors[i3 + 1] = 0.55;
        colors[i3 + 2] = 0.35;
      } else {
        colors[i3] = 0.95;
        colors[i3 + 1] = 0.85;
        colors[i3 + 2] = 0.65;
      }
    }

    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0003;
    pointsRef.current.rotation.x += 0.00012;

    const time = state.clock.getElapsedTime();
    pointsRef.current.position.y = Math.sin(time * 0.2) * 0.5;
    pointsRef.current.position.x = Math.cos(time * 0.15) * 0.3;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}
