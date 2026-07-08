'use client';

import * as THREE from 'three';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { Suspense, useMemo, useRef, type MutableRefObject } from 'react';
import { continuityAt } from '@/lib/continuity';

const P11 = '/assets/plates/p11-canon.png';

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The loaf as portal: canon P-11 on a plane, with a score-aperture that
 *  grows with the cut and lets the camera through into the crumb. */
function LoafPortal({ tRef }: { tRef: MutableRefObject<number> }) {
  const tex = useLoader(THREE.TextureLoader, P11);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uTex: { value: tex }, uCut: { value: 0 }, uFade: { value: 1 } }),
    [tex],
  );
  useFrame(() => {
    const c = continuityAt(tRef.current);
    uniforms.uCut.value = c.cut;
    // fade the loaf plane out as we pass through it, so we never see its back
    uniforms.uFade.value = Math.min(1, Math.max(0, (c.camZ + 0.4) / 1.0));
  });
  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[8.8, 4.95]} />
      <shaderMaterial
        ref={mat}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`}
        fragmentShader={`
          uniform sampler2D uTex; uniform float uCut; uniform float uFade; varying vec2 vUv;
          void main(){
            vec4 tex = texture2D(uTex, vUv);
            vec2 c = vUv - vec2(0.52, 0.47);
            c.y *= 2.3;                                  // lens wider along the score
            float dist = length(c);
            float radius = uCut * 0.34;
            float m = smoothstep(radius - 0.05, radius + 0.02, dist);   // 0 = open hole
            float rim = (1.0 - m) * smoothstep(radius - 0.12, radius, dist);
            vec3 rgb = mix(tex.rgb, vec3(0.80,0.52,0.22), rim * 0.6);    // warm cut edge
            float alpha = tex.a * m * uFade;
            if (alpha < 0.02) discard;
            gl_FragColor = vec4(rgb, alpha);
          }
        `}
      />
    </mesh>
  );
}

/** The crumb: a warm tube the camera falls through, walls porous with cells. */
function CrumbTunnel() {
  const cells = useMemo(() => {
    const rng = mulberry32(20260708);
    const N = 720;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const inst: { m: THREE.Matrix4; c: THREE.Color }[] = [];
    for (let i = 0; i < N; i++) {
      const theta = rng() * Math.PI * 2;
      const z = -0.4 - rng() * 13; // behind the loaf plane, down the tunnel
      const r = 1.0 + rng() * 0.06;
      const s = 0.05 + rng() * 0.11;
      const pos = new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, z);
      m.compose(pos, q, new THREE.Vector3(s, s, s * 0.7));
      const c = new THREE.Color().setHSL(0.095 + rng() * 0.02, 0.5, 0.42 + rng() * 0.16);
      inst.push({ m: m.clone(), c });
    }
    return inst;
  }, []);
  return (
    <group>
      {/* the tube wall — faintly emissive so the crumb reads as a warm surface */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -6.9]}>
        <cylinderGeometry args={[1.14, 1.14, 13.2, 48, 1, true]} />
        <meshStandardMaterial color={'#7a4a16'} emissive={'#3a2109'} side={THREE.BackSide} roughness={1} metalness={0} />
      </mesh>
      {/* porous crumb cells on the wall */}
      <instancedMesh
        ref={(node) => {
          if (!node) return;
          cells.forEach((c, i) => {
            node.setMatrixAt(i, c.m);
            node.setColorAt(i, c.c);
          });
          node.instanceMatrix.needsUpdate = true;
          if (node.instanceColor) node.instanceColor.needsUpdate = true;
        }}
        args={[undefined, undefined, cells.length]}
      >
        <sphereGeometry args={[1, 10, 10]} />
        <meshStandardMaterial roughness={1} metalness={0} />
      </instancedMesh>
    </group>
  );
}

/** The exit: the morning growing ahead, a window hinge, and the room beyond. */
function ExitAndRoom({ tRef }: { tRef: MutableRefObject<number> }) {
  const light = useRef<THREE.PointLight>(null);
  const roomTex = useMemo(() => makeRoomTexture(), []);
  useFrame(() => {
    const c = continuityAt(tRef.current);
    if (light.current) light.current.intensity = 2 + c.exit * 6;
  });
  return (
    <group>
      <pointLight ref={light} position={[0, 0, -12.6]} color={'#f4eee0'} distance={26} decay={1.4} />
      {/* the window hinge — the crumb aperture becomes a window (the match-cut) */}
      <group position={[0, 0, -13.5]}>
        {[
          [0, 1.5, 3.0, 0.08],
          [0, -1.5, 3.0, 0.08],
          [-1.5, 0, 0.08, 3.08],
          [1.5, 0, 0.08, 3.08],
          [0, 0, 3.0, 0.06],
          [0, 0, 0.06, 3.0],
        ].map((b, i) => (
          <mesh key={i} position={[b[0], b[1], 0]}>
            <boxGeometry args={[b[2], b[3], 0.06]} />
            <meshBasicMaterial color={'#3a2216'} toneMapped={false} />
          </mesh>
        ))}
      </group>
      {/* the morning room — the Handover (placeholder home, dissolved in light) */}
      <mesh position={[0, 0, -14.6]}>
        <planeGeometry args={[7.4, 4.15]} />
        <meshBasicMaterial map={roomTex} toneMapped={false} />
      </mesh>
    </group>
  );
}

function CameraRig({ tRef }: { tRef: MutableRefObject<number> }) {
  const { camera, scene } = useThree();
  const fog = useMemo(() => new THREE.Fog('#5a3410', 1.6, 17), []);
  useFrame(() => {
    const c = continuityAt(tRef.current);
    camera.position.set(0, c.camY, c.camZ);
    camera.lookAt(0, c.camY * 0.5, c.camZ - 5);
    scene.fog = fog;
    fog.color.setRGB(c.fog[0], c.fog[1], c.fog[2]);
  });
  return null;
}

function LinenWash({ tRef }: { tRef: MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ camera }) => {
    const c = continuityAt(tRef.current);
    if (!ref.current) return;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = c.linen;
    ref.current.position.set(camera.position.x, camera.position.y, camera.position.z - 0.4);
    ref.current.quaternion.copy(camera.quaternion);
  });
  return (
    <mesh ref={ref}>
      <planeGeometry args={[40, 24]} />
      <meshBasicMaterial color={'#f4eee0'} transparent opacity={0} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

export default function ContinuityScene({ tRef }: { tRef: MutableRefObject<number> }) {
  return (
    <Canvas
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ fov: 42, near: 0.1, far: 40, position: [0, 0.15, 6.4] }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#171009']} />
      <ambientLight intensity={0.32} color={'#c98a34'} />
      <CameraRig tRef={tRef} />
      <Suspense fallback={null}>
        <LoafPortal tRef={tRef} />
      </Suspense>
      <CrumbTunnel />
      <ExitAndRoom tRef={tRef} />
      <LinenWash tRef={tRef} />
    </Canvas>
  );
}

/** Placeholder Handover room, drawn to a canvas — implied, universal, in light. */
function makeRoomTexture(): THREE.CanvasTexture {
  const cnv = document.createElement('canvas');
  cnv.width = 1024;
  cnv.height = 576;
  const x = cnv.getContext('2d')!;
  const bg = x.createLinearGradient(0, 0, 400, 576);
  bg.addColorStop(0, '#efe6d3');
  bg.addColorStop(1, '#cbba91');
  x.fillStyle = bg;
  x.fillRect(0, 0, 1024, 576);
  // window, upper-left — the room's single source
  x.fillStyle = '#f9f4e7';
  x.fillRect(80, 40, 170, 190);
  x.strokeStyle = '#b7a274';
  x.lineWidth = 4;
  x.strokeRect(80, 40, 170, 190);
  x.beginPath();
  x.moveTo(165, 40); x.lineTo(165, 230); x.moveTo(80, 135); x.lineTo(250, 135); x.stroke();
  const spill = x.createRadialGradient(190, 150, 20, 190, 150, 340);
  spill.addColorStop(0, 'rgba(249,244,231,0.5)');
  spill.addColorStop(1, 'rgba(249,244,231,0)');
  x.fillStyle = spill;
  x.fillRect(0, 0, 1024, 576);
  // table — top near the vertical centre so the loaf reads at arrival
  x.fillStyle = '#5c4326';
  x.fillRect(0, 300, 1024, 276);
  x.fillStyle = '#6e4f2c';
  x.fillRect(0, 300, 1024, 12);
  // the same cut loaf, a cooling cup, a fold of linen — centred
  const loaf = x.createRadialGradient(512, 318, 20, 512, 335, 140);
  loaf.addColorStop(0, '#e7c98f');
  loaf.addColorStop(0.6, '#b98f57');
  loaf.addColorStop(1, '#6e4a22');
  x.fillStyle = loaf;
  x.beginPath();
  x.ellipse(512, 348, 132, 62, 0, 0, Math.PI * 2);
  x.fill();
  x.strokeStyle = 'rgba(243,199,119,0.7)';
  x.lineWidth = 3;
  x.beginPath();
  x.moveTo(438, 340); x.quadraticCurveTo(512, 318, 586, 342); x.stroke();
  x.fillStyle = '#e7ddc6';
  x.beginPath();
  x.ellipse(742, 366, 44, 22, 0, 0, Math.PI * 2);
  x.fill();
  x.fillStyle = 'rgba(44,28,16,0.5)';
  x.beginPath();
  x.ellipse(742, 359, 31, 14, 0, 0, Math.PI * 2);
  x.fill();
  x.fillStyle = 'rgba(231,221,198,0.85)';
  x.fillRect(250, 360, 150, 42);
  const tex = new THREE.CanvasTexture(cnv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
