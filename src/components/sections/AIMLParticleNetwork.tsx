import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

type NetworkProps = {
  count?: number;
  radius?: number;
  linkDistance?: number;
  maxLinksPerNode?: number;
};

function useMouseAttractor() {
  const { camera } = useThree();
  const mouse3 = useRef(new THREE.Vector3());

  const onPointerMove = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    const v = new THREE.Vector3(x, y, 0.5).unproject(camera);
    mouse3.current.copy(v);
  };

  return { mouse3, onPointerMove };
}

function ParticleNetwork({
  count = 280,
  radius = 10,
  linkDistance = 1.6,
  maxLinksPerNode = 6,
}: NetworkProps) {
  const group = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const velocities = useRef(
    Array.from(
      { length: count },
      () =>
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003
        )
    )
  );
  const { mouse3, onPointerMove } = useMouseAttractor();
  const [hovering, setHovering] = useState(false);

  // Particle positions + colors
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorA = new THREE.Color("#60a5fa");
    const colorB = new THREE.Color("#22d3ee");
    const colorC = new THREE.Color("#8b5cf6");

    for (let i = 0; i < count; i++) {
      // Bias distribution toward center
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = radius * Math.pow(Math.random(), 1.5);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const t = i / count;
      let c;
      if (t < 0.5) {
        c = colorA.clone().lerp(colorB, t * 2);
      } else {
        c = colorB.clone().lerp(colorC, (t - 0.5) * 2);
      }
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count, radius]);

  const linePositions = useMemo(
    () => new Float32Array(count * maxLinksPerNode * 2 * 3),
    [count, maxLinksPerNode]
  );

  useFrame((_, delta) => {
    if (!pointsRef.current || !linesRef.current || !group.current) return;

    const pts = pointsRef.current.geometry.attributes.position;
    const arr = pts.array as Float32Array;

    // Soft auto-rotation
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x += delta * 0.02;

    // Particle motion
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const p = new THREE.Vector3(arr[i3], arr[i3 + 1], arr[i3 + 2]);
      const v = velocities.current[i];

      if (hovering) {
        const dir = mouse3.current.clone().sub(p);
        const dist = Math.max(dir.length(), 0.0001);
        dir.normalize();
        const force = Math.min(0.002 / (dist * dist), 0.002);
        v.addScaledVector(dir, force);
      }

      v.multiplyScalar(0.985);
      p.add(v);

      // Keep particles softly within a sphere
      const limit = radius * 1.4;
      if (p.length() > limit) {
        p.setLength(limit);
        v.reflect(p.clone().normalize()).multiplyScalar(0.7);
      }

      arr[i3] = p.x;
      arr[i3 + 1] = p.y;
      arr[i3 + 2] = p.z;
    }
    pts.needsUpdate = true;

    // Build dynamic links
    let lineCount = 0;
    const maxDist2 = linkDistance * linkDistance;
    for (let i = 0; i < count; i++) {
      let links = 0;
      const ix = arr[i * 3],
        iy = arr[i * 3 + 1],
        iz = arr[i * 3 + 2];
      for (let j = i + 1; j < count && links < maxLinksPerNode; j++) {
        const jx = arr[j * 3],
          jy = arr[j * 3 + 1],
          jz = arr[j * 3 + 2];
        const dx = ix - jx,
          dy = iy - jy,
          dz = iz - jz;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 <= maxDist2) {
          const k = lineCount * 6;
          linePositions[k] = ix;
          linePositions[k + 1] = iy;
          linePositions[k + 2] = iz;
          linePositions[k + 3] = jx;
          linePositions[k + 4] = jy;
          linePositions[k + 5] = jz;
          lineCount++;
          links++;
        }
      }
    }

    const geo = linesRef.current.geometry;
    geo.setDrawRange(0, lineCount * 2);
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <group
      ref={group}
      scale={[1.2, 1.2, 1.2]} // overscale to avoid visible box
      onPointerMove={(e) => {
        setHovering(true);
        onPointerMove(e);
      }}
      onPointerLeave={() => setHovering(false)}
    >
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={colors}
            count={colors.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Connecting Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={linePositions}
            count={linePositions.length / 3}
            itemSize={3}
            usage={THREE.DynamicDrawUsage} // 👈 allows runtime updates
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#7dd3fc"
          transparent
          opacity={0.25}
        />
      </lineSegments>
    </group>
  );
}

export default function AIMLParticleNetwork() {
  return (
    <div className="relative w-full h-[600px] md:h-[700px]">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 20], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[12, 12, 12]} intensity={1.4} />
        <pointLight position={[-12, -12, -12]} intensity={0.8} />
        <pointLight position={[0, 12, -12]} intensity={0.6} color="#8b5cf6" />

        <ParticleNetwork />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.25}
        />
      </Canvas>
    </div>
  );
}
