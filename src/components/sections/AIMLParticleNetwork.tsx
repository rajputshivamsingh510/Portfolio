import React, { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

type NetworkProps = {
  count?: number;
  radius?: number;
  linkDistance?: number;
  maxLinksPerNode?: number;
  isDark?: boolean;
};

function ParticleNetwork({
  count = 260,
  radius = 9,
  linkDistance = 1.8,
  maxLinksPerNode = 5,
  isDark = true,
}: NetworkProps) {
  const group = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const [isPointerOver, setIsPointerOver] = useState(false);

  // Initial target positions & current velocities
  const initialPositions = useRef<THREE.Vector3[]>([]);
  const velocities = useRef<THREE.Vector3[]>([]);

  // Particle positions + colors
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Aesthetic colors: vibrant sapphire & violet in light mode, luminous titanium in dark mode
    const colorA = isDark ? new THREE.Color("#e2e8f0") : new THREE.Color("#2563eb");
    const colorB = isDark ? new THREE.Color("#94a3b8") : new THREE.Color("#6366f1");
    const colorC = isDark ? new THREE.Color("#cbd5e1") : new THREE.Color("#8b5cf6");

    initialPositions.current = [];
    velocities.current = [];

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = radius * (0.3 + 0.7 * Math.pow(Math.random(), 0.8));

      const px = r * Math.sin(phi) * Math.cos(theta);
      const py = r * Math.sin(phi) * Math.sin(theta);
      const pz = r * Math.cos(phi);

      pos[i * 3] = px;
      pos[i * 3 + 1] = py;
      pos[i * 3 + 2] = pz;

      initialPositions.current.push(new THREE.Vector3(px, py, pz));
      velocities.current.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        )
      );

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
  }, [count, radius, isDark]);

  const linePositions = useMemo(
    () => new Float32Array(count * maxLinksPerNode * 2 * 3),
    [count, maxLinksPerNode]
  );

  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current || !group.current) return;

    const pts = pointsRef.current.geometry.attributes.position;
    const arr = pts.array as Float32Array;

    // Gentle ambient rotation
    group.current.rotation.y += delta * 0.05;
    group.current.rotation.x += delta * 0.012;

    // Convert screen pointer into 3D local coordinate
    const mouseWorld = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.2).unproject(
      state.camera
    );
    const mouseLocal = group.current.worldToLocal(mouseWorld);

    // Update particle positions
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const p = new THREE.Vector3(arr[i3], arr[i3 + 1], arr[i3 + 2]);
      const initP = initialPositions.current[i];
      const v = velocities.current[i];

      // Pull toward mouse if hovering within influence radius
      if (isPointerOver) {
        const distToMouse = p.distanceTo(mouseLocal);
        const influenceRadius = 7.5;

        if (distToMouse < influenceRadius) {
          const dir = mouseLocal.clone().sub(p);
          const pullStrength = (1 - distToMouse / influenceRadius) * 0.035;
          v.addScaledVector(dir.normalize(), pullStrength);
        }
      }

      // Spring force returning particle towards its original orbit anchor
      const springDir = initP.clone().sub(p);
      v.addScaledVector(springDir, 0.008);

      // Damping / Friction
      v.multiplyScalar(0.92);
      p.add(v);

      arr[i3] = p.x;
      arr[i3 + 1] = p.y;
      arr[i3 + 2] = p.z;
    }
    pts.needsUpdate = true;

    // Build dynamic link segments
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
      scale={[1.15, 1.15, 1.15]}
      onPointerOver={() => setIsPointerOver(true)}
      onPointerOut={() => setIsPointerOver(false)}
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
          size={0.075}
          vertexColors
          transparent
          opacity={isDark ? 0.85 : 0.75}
          depthWrite={false}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
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
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={isDark ? "#64748b" : "#6366f1"}
          transparent
          opacity={isDark ? 0.25 : 0.32}
        />
      </lineSegments>
    </group>
  );
}

export default function AIMLParticleNetwork() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();

    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ isDark: boolean }>;
      setIsDark(customEvent.detail?.isDark ?? document.documentElement.classList.contains('dark'));
    };

    window.addEventListener('theme-change', handler);
    return () => window.removeEventListener('theme-change', handler);
  }, []);

  return (
    <div className="relative w-full h-[540px] md:h-[640px]">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 20], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={isDark ? 0.6 : 0.9} />
        <pointLight position={[12, 12, 12]} intensity={isDark ? 1.2 : 1.5} color={isDark ? "#f8fafc" : "#1e293b"} />
        <pointLight position={[-12, -12, -12]} intensity={0.7} color={isDark ? "#94a3b8" : "#64748b"} />

        <ParticleNetwork isDark={isDark} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
}
