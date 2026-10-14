import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 180;

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Generate particle data
  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8
        ),
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        scale: 0.02 + Math.random() * 0.04,
      });
    }
    return data;
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particleData.forEach((particle, i) => {
      const { position, speed, offset, scale } = particle;

      // Organic sine-wave floating motion
      const x = position.x + Math.sin(time * speed + offset) * 0.5;
      const y = position.y + Math.cos(time * speed * 0.7 + offset) * 0.3 + Math.sin(time * 0.2) * 0.1;
      const z = position.z + Math.sin(time * speed * 0.5 + offset * 2) * 0.3;

      // Subtle parallax drift from mouse
      const mx = mouseRef.current.x * viewport.width * 0.05;
      const my = mouseRef.current.y * viewport.height * 0.05;

      dummy.position.set(x + mx * (z * 0.1 + 0.5), y + my * (z * 0.1 + 0.5), z);
      dummy.scale.setScalar(scale * (1 + Math.sin(time * 2 + offset) * 0.3));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color="#C28E3A"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

function FloatingDiamonds() {
  const groupRef = useRef<THREE.Group>(null);

  const diamonds = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 4 - 2,
        ] as [number, number, number],
        scale: 0.05 + Math.random() * 0.08,
        speed: 0.3 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      const d = diamonds[i];
      child.rotation.z = time * d.speed + d.offset;
      child.rotation.y = time * d.speed * 0.5;
      child.position.y = d.position[1] + Math.sin(time * d.speed + d.offset) * 0.5;
    });
  });

  return (
    <group ref={groupRef}>
      {diamonds.map((d, i) => (
        <mesh key={i} position={d.position} scale={d.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color="#C28E3A"
            transparent
            opacity={0.4}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

export const ParticleBackground = () => {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Particles />
        <FloatingDiamonds />
      </Canvas>
    </div>
  );
};
