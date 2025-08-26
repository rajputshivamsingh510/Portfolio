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
  const { size, viewport, camera } = useThree();
  const mouse3 = useRef(new THREE.Vector3());
  
  const onPointerMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    const v = new THREE.Vector3(x, y, 0.5).unproject(camera);
    mouse3.current.copy(v);
  };
  
  return { mouse3, onPointerMove, viewport };
}

function ParticleNetwork({
  count = 250,
  radius = 7,
  linkDistance = 1.4,
  maxLinksPerNode = 7,
}: NetworkProps) {
  const group = useRef(null);
  const pointsRef = useRef(null);
  const linesRef = useRef(null);
  const velocities = useRef(
    Array.from({ length: count }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 0.003,
      (Math.random() - 0.5) * 0.003,
      (Math.random() - 0.5) * 0.003
    ))
  );
  const { mouse3, onPointerMove } = useMouseAttractor();
  const [hovering, setHovering] = useState(false);

  // Generate initial positions and colors
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorA = new THREE.Color("#60a5fa");
    const colorB = new THREE.Color("#22d3ee");
    const colorC = new THREE.Color("#8b5cf6");
    
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = radius * Math.cbrt(Math.random());
      
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
    const arr = pts.array;

    // Gentle auto-rotation with slight variation
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x += delta * 0.025;
    group.current.rotation.z += delta * 0.01;

    // Particle motion
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const p = new THREE.Vector3(arr[i3], arr[i3 + 1], arr[i3 + 2]);
      const v = velocities.current[i];

      if (hovering) {
        const dir = mouse3.current.clone().sub(p);
        const dist = Math.max(dir.length(), 0.0001);
        dir.normalize();
        const force = Math.min(0.003 / (dist * dist), 0.003);
        v.addScaledVector(dir, force);
      }

      v.multiplyScalar(0.988);
      p.add(v);

      const limit = radius * 1.2;
      if (p.length() > limit) {
        p.setLength(limit);
        v.reflect(p.clone().normalize()).multiplyScalar(0.75);
      }

      arr[i3] = p.x;
      arr[i3 + 1] = p.y;
      arr[i3 + 2] = p.z;
    }
    pts.needsUpdate = true;

    // Build dynamic links
    let lineCount = 0;
    const maxDist2 = linkDistance * linkDistance;
    const stride = count > 220 ? 2 : 1;

    for (let i = 0; i < count; i += 1) {
      let links = 0;
      const ix = arr[i * 3], iy = arr[i * 3 + 1], iz = arr[i * 3 + 2];
      
      for (let j = i + stride; j < count && links < maxLinksPerNode; j += stride) {
        const jx = arr[j * 3], jy = arr[j * 3 + 1], jz = arr[j * 3 + 2];
        const dx = ix - jx, dy = iy - jy, dz = iz - jz;
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
          if (lineCount >= linePositions.length / 6) break;
        }
      }
      if (lineCount >= linePositions.length / 6) break;
    }

    const geo = linesRef.current.geometry;
    const posAttr = geo.attributes.position;
    posAttr.array = linePositions;
    posAttr.needsUpdate = true;
    geo.setDrawRange(0, lineCount * 2);
  });

  return (
    <group
      ref={group}
      onPointerMove={(e) => {
        setHovering(true);
        onPointerMove(e);
      }}
      onPointerLeave={() => setHovering(false)}
    >
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
          opacity={0.98}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

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
          color="#7dd3fc"
          transparent
          opacity={0.3}
        />
      </lineSegments>
    </group>
  );
}

export default function AIMLParticleNetwork() {
  return (
    <div className="relative w-90 h-80 md:w-96 md:h-96"> {/* Larger, responsive container */}
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 14], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[12, 12, 12]} intensity={1.4} />
        <pointLight position={[-12, -12, -12]} intensity={0.8} />
        <pointLight position={[0, 12, -12]} intensity={0.6} color="#8b5cf6" />

        <ParticleNetwork
          count={280}
          radius={7.5}
          linkDistance={1.45}
          maxLinksPerNode={7}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}
