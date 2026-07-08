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

// ————— The crumb material: cellular alveoli, warm wheat walls, dark pockets —————
const WORLEY = `
  vec3 h3(vec3 p){ p=vec3(dot(p,vec3(127.1,311.7,74.7)),dot(p,vec3(269.5,183.3,246.1)),dot(p,vec3(113.5,271.9,124.6))); return fract(sin(p)*43758.5453); }
  float worley(vec3 p){ vec3 n=floor(p); vec3 f=fract(p); float md=8.0;
    for(int k=-1;k<=1;k++)for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){
      vec3 g=vec3(float(i),float(j),float(k)); vec3 o=h3(n+g); vec3 r=g+o-f; md=min(md,dot(r,r)); }
    return sqrt(md); }
`;
function useCrumbMaterial() {
  return useMemo(() => {
    return new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        uExit: { value: 0 },
        uScale: { value: 1.9 },
        uScale2: { value: 5.5 },
        uDepth: { value: 0.24 },
        uWall: { value: new THREE.Color('#ecd9a6') }, // pale wheat crumb wall
        uPocket: { value: new THREE.Color('#8a5b28') }, // warm hollow of an air pocket
      },
      vertexShader: `
        ${WORLEY}
        uniform float uScale; uniform float uDepth;
        varying vec3 vPos;
        void main(){
          vPos = position;
          float w = worley(position * uScale);
          float pocket = smoothstep(0.55, 0.10, w);          // defined air pockets
          vec3 disp = position + normal * pocket * uDepth;    // pockets recede — real holes
          gl_Position = projectionMatrix * modelViewMatrix * vec4(disp, 1.0);
        }
      `,
      fragmentShader: `
        ${WORLEY}
        uniform float uScale; uniform float uScale2; uniform float uExit;
        uniform vec3 uWall; uniform vec3 uPocket;
        varying vec3 vPos;
        void main(){
          float w1 = worley(vPos * uScale);
          float w2 = worley(vPos * uScale2 + 5.2);
          float hole = clamp(smoothstep(0.55,0.12,w1)*0.75 + smoothstep(0.42,0.08,w2)*0.4, 0.0, 1.0);
          vec3 col = mix(uWall, uPocket, hole * 0.9);          // pale walls, warm holes
          // a thin bright ridge where two pockets meet (the gluten wall catching light)
          float ridge = smoothstep(0.5, 0.62, w1) * (1.0 - smoothstep(0.62, 0.78, w1));
          col += vec3(0.10, 0.07, 0.03) * ridge;
          float toExit = smoothstep(0.0, 13.0, -vPos.z);
          float light = 0.6 + 0.5*toExit + 0.4*uExit*toExit;
          gl_FragColor = vec4(col * light, 1.0);
        }
      `,
    });
  }, []);
}

/** The loaf as portal: canon P-11, its score-aperture opening along the cut. */
function LoafPortal({ tRef }: { tRef: MutableRefObject<number> }) {
  const tex = useLoader(THREE.TextureLoader, P11);
  const uniforms = useMemo(() => ({ uTex: { value: tex }, uCut: { value: 0 }, uFade: { value: 1 } }), [tex]);
  useFrame(() => {
    const c = continuityAt(tRef.current);
    uniforms.uCut.value = c.cut;
    uniforms.uFade.value = Math.min(1, Math.max(0, (c.camZ + 0.4) / 1.0));
  });
  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[8.8, 4.95]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`}
        fragmentShader={`
          uniform sampler2D uTex; uniform float uCut; uniform float uFade; varying vec2 vUv;
          void main(){
            vec4 tex = texture2D(uTex, vUv);
            vec2 c = vUv - vec2(0.53, 0.45);
            float a = -0.5;                                  // tilt the slit to the score
            mat2 R = mat2(cos(a), -sin(a), sin(a), cos(a));
            c = R * c; c.y *= 2.2;                           // long along the score, narrow across
            float dist = length(c);
            float radius = uCut * 0.32;
            float m = smoothstep(radius - 0.05, radius + 0.02, dist);
            float rim = (1.0 - m) * smoothstep(radius - 0.12, radius, dist);
            vec3 rgb = mix(tex.rgb, vec3(0.82,0.55,0.24), rim * 0.6);
            float alpha = tex.a * m * uFade;
            if (alpha < 0.02) discard;
            gl_FragColor = vec4(rgb, alpha);
          }
        `}
      />
    </mesh>
  );
}

/** The crumb: a tapering tube funnelling toward the window, plus torn crumb chunks. */
function Crumb({ tRef }: { tRef: MutableRefObject<number> }) {
  const mat = useCrumbMaterial();
  useFrame(() => {
    mat.uniforms.uExit.value = continuityAt(tRef.current).exit;
  });
  const chunks = useMemo(() => {
    const rng = mulberry32(20260708);
    const out: { pos: [number, number, number]; s: number; rot: number }[] = [];
    for (let i = 0; i < 13; i++) {
      const th = rng() * Math.PI * 2;
      const z = -0.8 - rng() * 11;
      const r = 0.86 + rng() * 0.16;
      out.push({ pos: [Math.cos(th) * r, Math.sin(th) * r, z], s: 0.26 + rng() * 0.26, rot: rng() * 6.28 });
    }
    return out;
  }, []);
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -6.65]} material={mat}>
        {/* funnels from 1.2 (entrance) to 0.9 (the window end) */}
        <cylinderGeometry args={[0.9, 1.2, 12.7, 96, 40, true]} />
      </mesh>
      {chunks.map((c, i) => (
        <mesh key={i} position={c.pos} rotation={[c.rot, c.rot * 0.7, 0]} scale={c.s} material={mat}>
          <icosahedronGeometry args={[1, 3]} />
        </mesh>
      ))}
    </group>
  );
}

/** The window at the tunnel's end (registered to the bore), then the room beyond. */
function ExitAndRoom({ tRef }: { tRef: MutableRefObject<number> }) {
  const light = useRef<THREE.PointLight>(null);
  const roomTex = useMemo(() => makeRoomTexture(), []);
  useFrame(() => {
    if (light.current) light.current.intensity = 2 + continuityAt(tRef.current).exit * 6;
  });
  const bars: [number, number, number, number][] = [
    [0, 1.15, 2.35, 0.07],
    [0, -1.15, 2.35, 0.07],
    [-1.15, 0, 0.07, 2.37],
    [1.15, 0, 0.07, 2.37],
    [0, 0, 2.35, 0.05],
    [0, 0, 0.05, 2.35],
  ];
  return (
    <group>
      <pointLight ref={light} position={[0, 0, -12.4]} color={'#f4eee0'} distance={26} decay={1.4} />
      {/* the window — sits in the tunnel's end aperture, so the crumb hole IS the window */}
      <group position={[0, 0, -13.0]}>
        {bars.map((b, i) => (
          <mesh key={i} position={[b[0], b[1], 0]}>
            <boxGeometry args={[b[2], b[3], 0.06]} />
            <meshBasicMaterial color={'#3a2216'} toneMapped={false} />
          </mesh>
        ))}
      </group>
      {/* the morning room beyond — the camera passes through the window into it */}
      <mesh position={[0, 0, -17.0]}>
        <planeGeometry args={[12, 6.75]} />
        <meshBasicMaterial map={roomTex} toneMapped={false} />
      </mesh>
    </group>
  );
}

function CameraRig({ tRef }: { tRef: MutableRefObject<number> }) {
  const { camera, scene } = useThree();
  const fog = useMemo(() => new THREE.Fog('#5a3410', 2.2, 20), []);
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
    ref.current.position.set(camera.position.x, camera.position.y, camera.position.z - 0.35);
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
      camera={{ fov: 42, near: 0.1, far: 44, position: [0, 0.15, 6.4] }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#171009']} />
      <ambientLight intensity={0.3} color={'#c98a34'} />
      <CameraRig tRef={tRef} />
      <Suspense fallback={null}>
        <LoafPortal tRef={tRef} />
      </Suspense>
      <Crumb tRef={tRef} />
      <ExitAndRoom tRef={tRef} />
      <LinenWash tRef={tRef} />
    </Canvas>
  );
}

/** Placeholder Handover room — loaf + table centred so it reads at arrival. */
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
  x.fillRect(70, 30, 150, 165);
  x.strokeStyle = '#b7a274';
  x.lineWidth = 4;
  x.strokeRect(70, 30, 150, 165);
  x.beginPath();
  x.moveTo(145, 30); x.lineTo(145, 195); x.moveTo(70, 112); x.lineTo(220, 112); x.stroke();
  const spill = x.createRadialGradient(170, 130, 20, 170, 130, 320);
  spill.addColorStop(0, 'rgba(249,244,231,0.5)');
  spill.addColorStop(1, 'rgba(249,244,231,0)');
  x.fillStyle = spill;
  x.fillRect(0, 0, 1024, 576);
  // table across the middle, loaf centred
  x.fillStyle = '#5c4326';
  x.fillRect(0, 300, 1024, 276);
  x.fillStyle = '#6e4f2c';
  x.fillRect(0, 300, 1024, 12);
  const loaf = x.createRadialGradient(512, 300, 24, 512, 322, 160);
  loaf.addColorStop(0, '#e7c98f');
  loaf.addColorStop(0.6, '#b98f57');
  loaf.addColorStop(1, '#6e4a22');
  x.fillStyle = loaf;
  x.beginPath();
  x.ellipse(512, 336, 150, 70, 0, 0, Math.PI * 2);
  x.fill();
  x.strokeStyle = 'rgba(243,199,119,0.75)';
  x.lineWidth = 3.5;
  x.beginPath();
  x.moveTo(428, 326); x.quadraticCurveTo(512, 302, 596, 330); x.stroke();
  x.fillStyle = '#e7ddc6';
  x.beginPath();
  x.ellipse(760, 356, 46, 23, 0, 0, Math.PI * 2);
  x.fill();
  x.fillStyle = 'rgba(44,28,16,0.5)';
  x.beginPath();
  x.ellipse(760, 349, 32, 15, 0, 0, Math.PI * 2);
  x.fill();
  x.fillStyle = 'rgba(231,221,198,0.85)';
  x.fillRect(250, 352, 150, 42);
  const tex = new THREE.CanvasTexture(cnv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
