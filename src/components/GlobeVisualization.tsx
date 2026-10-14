import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GLOBE_RADIUS = 2.5;
const POINT_COUNT = 120;
const CONNECTION_DISTANCE = 1.2;

function GlobeWireframe() {
  const globeRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const glowPointsRef = useRef<THREE.Points>(null);

  // Generate points on sphere surface
  const { positions, glowPositions, lineGeom } = useMemo(() => {
    const pts: number[] = [];
    const glow: number[] = [];

    // Distribute points on sphere using fibonacci
    for (let i = 0; i < POINT_COUNT; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / POINT_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
      const y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
      const z = GLOBE_RADIUS * Math.cos(phi);

      pts.push(x, y, z);

      // Some glowing points (distribution hubs)
      if (i % 5 === 0) {
        glow.push(x, y, z);
      }
    }

    // Create connection lines
    const linePositions: number[] = [];
    for (let i = 0; i < pts.length / 3; i++) {
      for (let j = i + 1; j < pts.length / 3; j++) {
        const dx = pts[i * 3] - pts[j * 3];
        const dy = pts[i * 3 + 1] - pts[j * 3 + 1];
        const dz = pts[i * 3 + 2] - pts[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          linePositions.push(
            pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 2],
            pts[j * 3], pts[j * 3 + 1], pts[j * 3 + 2]
          );
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

    return {
      positions: new Float32Array(pts),
      glowPositions: new Float32Array(glow),
      lineGeom: lineGeo,
    };
  }, []);

  useFrame((state) => {
    if (!globeRef.current) return;
    const time = state.clock.getElapsedTime();

    // Auto-rotate slowly
    globeRef.current.rotation.y = time * 0.15;
    globeRef.current.rotation.x = Math.sin(time * 0.1) * 0.1 + 0.3;

    // Pulse glow points
    if (glowPointsRef.current) {
      const material = glowPointsRef.current.material as THREE.PointsMaterial;
      material.size = 0.12 + Math.sin(time * 2) * 0.04;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Wireframe sphere shell */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 24, 24]} />
        <meshBasicMaterial
          color="#C28E3A"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeom}>
        <lineBasicMaterial
          color="#C28E3A"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Distribution points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          {/* @ts-ignore */}
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#C28E3A"
          size={0.05}
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Glow hub points */}
      <points ref={glowPointsRef}>
        <bufferGeometry>
          {/* @ts-ignore */}
          <bufferAttribute
            attach="attributes-position"
            count={glowPositions.length / 3}
            array={glowPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#E8C87A"
          size={0.12}
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Outer atmosphere ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[GLOBE_RADIUS + 0.1, GLOBE_RADIUS + 0.15, 64]} />
        <meshBasicMaterial
          color="#C28E3A"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export const GlobeVisualization = () => {
  return (
    <div className="w-full h-[300px] md:h-[400px] relative">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <GlobeWireframe />
      </Canvas>
      {/* Glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(194,142,58,0.05) 0%, transparent 60%)',
        }}
      />
    </div>
  );
};
