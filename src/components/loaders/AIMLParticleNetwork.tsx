// AIMLParticleNetwork.tsx
import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Effects } from "@react-three/drei";

type NetworkProps = {
  /** Number of particles (150–300 recommended) */
  count?: number;
  /** Radius of the particle cloud */
  radius?: number;
  /** Distance threshold for connecting lines */
  linkDistance?: number;
  /** Max links per node (keeps perf in check) */
  maxLinksPerNode?: number;
};

function useMouseAttractor() {
  const { size, viewport, camera } = useThree();
  const mouse3 = useRef(new THREE.Vector3());
  const onPointerMove = (e: THREE.Event & { clientX: number; clientY: number }) => {
    const x = (e.clientX / size.width) * 2 - 1;
    const y = -(e.clientY / size.height) * 2 + 1;
    // project into 3D space at z ~ 0
    const v = new THREE.Vector3(x, y, 0.5).unproject(camera);
    mouse3.current.copy(v);
  };
  return { mouse3, onPointerMove, viewport };
}

function ParticleNetwork({
  count = 200,
  radius = 6,
  linkDistance = 1.25,
  maxLinksPerNode = 6,
}: NetworkProps) {
  const group = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const velocities = useRef<THREE.Vector3[]>(
    Array.from({ length: count }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 0.0025,
      (Math.random() - 0.5) * 0.0025,
      (Math.random() - 0.5) * 0.0025
    ))
  );
  const { mouse3, onPointerMove } = useMouseAttractor();
  const [hovering, setHovering] = useState(false);

  // Generate initial positions in a sphere + colors
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorA = new THREE.Color("#60a5fa"); // indigo-cyan vibes
    const colorB = new THREE.Color("#22d3ee");
    for (let i = 0; i < count; i++) {
      // Fibonacci-ish sphere scatter
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = radius * Math.cbrt(Math.random()); // denser core
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const t = i / count;
      const c = colorA.clone().lerp(colorB, t);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count, radius]);

  // Allocate line buffer (worst case: count * maxLinksPerNode links → * 2 vertices)
  const linePositions = useMemo(
    () => new Float32Array(count * maxLinksPerNode * 2 * 3),
    [count, maxLinksPerNode]
  );

  useFrame((_, delta) => {
    const pts = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pts.array as Float32Array;

    // Gentle auto-rotation
    if (group.current) {
      group.current.rotation.y += delta * 0.1;
      group.current.rotation.x += delta * 0.02;
    }

    // Particle motion + soft attraction to mouse when hovering
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const p = new THREE.Vector3(arr[i3], arr[i3 + 1], arr[i3 + 2]);
      const v = velocities.current[i];

      if (hovering) {
        const dir = mouse3.current.clone().sub(p);
        const dist = Math.max(dir.length(), 0.0001);
        dir.normalize();
        // inverse-square-ish attraction, clamped
        const force = Math.min(0.0025 / (dist * dist), 0.0025);
        v.addScaledVector(dir, force);
      }

      // mild damping + boundary wrap
      v.multiplyScalar(0.985);
      p.add(v);

      const limit = radius * 1.15;
      if (p.length() > limit) {
        p.setLength(limit);
        v.reflect(p.clone().normalize()).multiplyScalar(0.7);
      }

      arr[i3] = p.x;
      arr[i3 + 1] = p.y;
      arr[i3 + 2] = p.z;
    }
    pts.needsUpdate = true;

    // Build dynamic links (local neighborhood)
    let lineCount = 0;
    const maxDist2 = linkDistance * linkDistance;
    // Simple grid skip: check every nth to lighten O(n^2)
    const stride = count > 220 ? 2 : 1;

    for (let i = 0; i < count; i += 1) {
      let links = 0;
      const ix = arr[i * 3], iy = arr[i * 3 + 1], iz = arr[i * 3 + 2];
      for (let j = i + stride; j < count && links < maxLinksPerNode; j += stride) {
        const jx = arr[j * 3], jy = arr[j * 3 + 1], jz = arr[j * 3 + 2];
        const dx = ix - jx, dy = iy - jy, dz = iz - jz;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 <= maxDist2) {
          // write segment i -> j
          const k = lineCount * 6;
          linePositions[k] = ix;
          linePositions[k + 1] = iy;
          linePositions[k + 2] = iz;
          linePositions[k + 3] = jx;
          linePositions[k + 4] = jy;
          linePositions[k + 5] = jz;
          lineCount++;
          links++;
          if (lineCount >= linePositions.length / 6) break;
        }
      }
      if (lineCount >= linePositions.length / 6) break;
    }

    const geo = linesRef.current.geometry as THREE.BufferGeometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    posAttr.array = linePositions;
    posAttr.needsUpdate = true;
    geo.setDrawRange(0, lineCount * 2); // each line uses 2 vertices
  });

  return (
    <group
      ref={group}
      onPointerMove={(e) => {
        setHovering(true);
        // @ts-ignore - pass clientX/Y
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
          size={0.05}
          vertexColors
          transparent
          opacity={0.95}
          depthWrite={false}
          // subtle glow via additive blending
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={linePositions}
            count={linePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={"#7dd3fc"}
          transparent
          opacity={0.25}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

export default function AIMLParticleNetwork() {
  return (
    <div className="relative w-full h-[420px] md:h-[520px] lg:h-[600px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(56,189,248,0.12),transparent_60%)]" />
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 12], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.6} />

        <ParticleNetwork count={220} radius={6.5} linkDistance={1.35} maxLinksPerNode={6} />

        {/* Nice, subtle controls (disable zoom for a tighter feel) */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.25} />

        {/* Subtle bloom to feel "AI" */}
        <Effects disableGamma>
          {/* @ts-ignore Drei wraps UnrealBloomPass */}
          <unrealBloomPass strength={0.6} radius={0.6} threshold={0.35} />
        </Effects>
      </Canvas>

      {/* Overlay label (optional) */}
      <div className="pointer-events-none absolute bottom-4 left-4 text-cyan-200/80 text-xs tracking-widest">
        AI/ML Particle Network
      </div>
    </div>
  );
}
