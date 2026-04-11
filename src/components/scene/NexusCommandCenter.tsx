import React from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Float,
  Html,
  PresentationControls,
  ScrollControls,
  Sparkles,
  Stars,
  useScroll,
} from '@react-three/drei';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Download, Home, Layers3, Mail, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

type FocusPoint = 'home' | 'projects' | 'skills';

type FocusConfig = {
  label: string;
  detail: string;
  camera: [number, number, number];
  look: [number, number, number];
};

const FOCUS_POINTS: Record<FocusPoint, FocusConfig> = {
  home: {
    label: 'Command Core',
    detail: 'Landing overview with profile and current role.',
    camera: [0, 2.7, 8.8],
    look: [0, 1.2, 0],
  },
  projects: {
    label: 'Project Relics',
    detail: 'Interactive data artifacts representing major builds.',
    camera: [5.3, 2.4, 7.2],
    look: [3.2, 1.4, -0.4],
  },
  skills: {
    label: 'Skill Orbit',
    detail: 'Systems, AI and full-stack strengths in one space.',
    camera: [-5.3, 2.4, 7.2],
    look: [-3.2, 1.4, -0.4],
  },
};

const useReducedMotionPreference = (): boolean => {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => setReduced(query.matches);
    update();

    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
};

const useMobileViewport = (): boolean => {
  const [mobile, setMobile] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia('(max-width: 1023px)');

    const update = () => setMobile(query.matches);
    update();

    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return mobile;
};

const NeonDesk: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const outlineRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!outlineRef.current || reducedMotion) return;
    outlineRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
  });

  return (
    <group position={[0, 0.65, 0]}>
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[5.4, 0.12, 2.6]} />
        <meshPhysicalMaterial color="#0a1226" roughness={0.35} metalness={0.48} transmission={0.24} transparent opacity={0.94} />
      </mesh>

      <mesh ref={outlineRef} position={[0, -0.2, 0]}>
        <boxGeometry args={[5.42, 0.125, 2.62]} />
        <meshBasicMaterial color="#67e8f9" wireframe transparent opacity={0.14} />
      </mesh>

      <mesh position={[0, 0.26, -0.45]}>
        <boxGeometry args={[1.65, 0.95, 0.08]} />
        <meshPhysicalMaterial color="#141d38" emissive="#3b82f6" emissiveIntensity={0.38} roughness={0.2} metalness={0.65} />
      </mesh>

      <mesh position={[-1.05, 0.02, 0.28]}>
        <boxGeometry args={[0.95, 0.04, 0.34]} />
        <meshPhysicalMaterial color="#111827" emissive="#818cf8" emissiveIntensity={0.22} roughness={0.35} metalness={0.4} />
      </mesh>

      <mesh position={[1.1, 0.02, 0.28]}>
        <boxGeometry args={[0.95, 0.04, 0.34]} />
        <meshPhysicalMaterial color="#111827" emissive="#2dd4bf" emissiveIntensity={0.2} roughness={0.35} metalness={0.4} />
      </mesh>

      <Sparkles count={reducedMotion ? 18 : 56} scale={5.2} size={1.7} speed={0.45} color="#67e8f9" />
    </group>
  );
};

const ArtifactPedestal: React.FC<{
  position: [number, number, number];
  title: string;
  subtitle: string;
  active: boolean;
  children: React.ReactNode;
}> = ({ position, title, subtitle, active, children }) => {
  return (
    <group position={position}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.8, 0.92, 0.7, 28]} />
        <meshPhysicalMaterial color="#0b1227" roughness={0.3} metalness={0.52} />
      </mesh>

      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[0.68, 0.68, 0.2, 36]} />
        <meshPhysicalMaterial color="#c4f1ff" roughness={0.08} metalness={0.15} transmission={0.92} transparent opacity={0.82} />
      </mesh>

      <group position={[0, 1.16, 0]}>{children}</group>

      <Html position={[0, -0.2, 0]} center distanceFactor={10}>
        <div className={`rounded-xl border px-3 py-2 text-center backdrop-blur-md transition-all duration-300 ${active ? 'border-cyan-200/45 bg-slate-950/80' : 'border-white/15 bg-slate-950/60'}`}>
          <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-100/80">{title}</p>
          <p className="text-[11px] text-white/65 mt-1">{subtitle}</p>
        </div>
      </Html>
    </group>
  );
};

const AiHubArtifact: React.FC<{ highlighted: boolean; reducedMotion: boolean }> = ({ highlighted, reducedMotion }) => {
  const coreRef = React.useRef<THREE.Mesh>(null);
  const haloRef = React.useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (!coreRef.current || !haloRef.current) return;

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.08;
    coreRef.current.scale.setScalar(pulse);

    if (!reducedMotion) {
      haloRef.current.rotation.y += 0.012;
      haloRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <group>
      <mesh
        ref={coreRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[0.42, 3]} />
        <meshPhysicalMaterial
          color={highlighted ? '#93c5fd' : '#67e8f9'}
          emissive="#3b82f6"
          emissiveIntensity={highlighted ? 0.95 : 0.55}
          roughness={0.2}
          metalness={0.45}
          transmission={0.22}
          transparent
          opacity={0.95}
        />
      </mesh>

      <mesh ref={haloRef}>
        <torusGeometry args={[0.65, 0.02, 22, 160]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.55} />
      </mesh>

      <Sparkles count={reducedMotion ? 10 : 24} scale={2.3} size={1.6} speed={0.5} color="#38bdf8" />

      {hovered && (
        <Html position={[0, 0.92, 0]} center distanceFactor={12}>
          <div className="rounded-xl border border-cyan-200/35 bg-slate-950/80 px-3 py-2 text-xs backdrop-blur-md min-w-[180px]">
            <p className="text-cyan-200 font-semibold mb-1">AI Hub</p>
            <p className="text-white/70">Deepfake detection, NLP workflows, analytics signal.</p>
          </div>
        </Html>
      )}
    </group>
  );
};

const CommunicationArtifact: React.FC<{ highlighted: boolean; reducedMotion: boolean }> = ({ highlighted, reducedMotion }) => {
  const flapRef = React.useRef<THREE.Mesh>(null);
  const orbitRef = React.useRef<THREE.Group>(null);
  const [open, setOpen] = React.useState(false);

  useFrame(() => {
    if (!flapRef.current || !orbitRef.current) return;

    const target = open ? -2.15 : -1.38;
    flapRef.current.rotation.x += (target - flapRef.current.rotation.x) * 0.12;

    if (!reducedMotion) {
      orbitRef.current.rotation.y += 0.015;
    }
  });

  return (
    <group>
      <mesh onClick={() => setOpen((prev) => !prev)}>
        <boxGeometry args={[0.98, 0.58, 0.12]} />
        <meshPhysicalMaterial
          color={highlighted ? '#c4b5fd' : '#bfdbfe'}
          roughness={0.1}
          metalness={0.22}
          transmission={0.92}
          transparent
          opacity={0.86}
        />
      </mesh>

      <mesh ref={flapRef} position={[0, 0.26, 0.03]} rotation={[-1.38, 0, 0]}>
        <planeGeometry args={[0.97, 0.44]} />
        <meshPhysicalMaterial color="#dbeafe" roughness={0.06} transmission={0.9} transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>

      <group ref={orbitRef} visible={open}>
        {['Spring', 'React', 'TS'].map((stack, index) => {
          const angle = (index / 3) * Math.PI * 2;
          return (
            <group key={stack} position={[Math.cos(angle) * 0.8, 0.35 + (index - 1) * 0.08, Math.sin(angle) * 0.8]}>
              <mesh>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial emissive="#67e8f9" emissiveIntensity={0.5} color="#1f2937" />
              </mesh>
              <Html center distanceFactor={15}>
                <span className="text-[10px] text-cyan-100/80 font-mono">{stack}</span>
              </Html>
            </group>
          );
        })}
      </group>
    </group>
  );
};

const MediaStreamArtifact: React.FC<{ highlighted: boolean; reducedMotion: boolean }> = ({ highlighted, reducedMotion }) => {
  const barsRef = React.useRef<Array<THREE.Mesh | null>>([]);

  useFrame((state) => {
    if (reducedMotion) return;

    barsRef.current.forEach((bar, index) => {
      if (!bar) return;
      const wave = 0.35 + (Math.sin(state.clock.elapsedTime * 2.4 + index * 0.45) + 1) * 0.22;
      bar.scale.y = wave;
      bar.position.y = wave / 2;
    });
  });

  return (
    <group>
      <mesh rotation={[0, Math.PI * 0.08, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.72, 48, 1, true, Math.PI * 0.65, Math.PI * 0.7]} />
        <meshPhysicalMaterial
          color={highlighted ? '#93c5fd' : '#60a5fa'}
          emissive="#3b82f6"
          emissiveIntensity={highlighted ? 0.7 : 0.35}
          roughness={0.2}
          metalness={0.25}
          transmission={0.62}
          transparent
          opacity={0.86}
          side={THREE.DoubleSide}
        />
      </mesh>

      <group position={[0, -0.24, 0.68]}>
        {Array.from({ length: 16 }, (_, index) => (
          <mesh
            key={`wave-${index}`}
            ref={(node) => {
              barsRef.current[index] = node;
            }}
            position={[(index - 7.5) * 0.08, 0.2, 0]}
          >
            <boxGeometry args={[0.04, 0.4, 0.04]} />
            <meshStandardMaterial color="#c4f1ff" emissive="#67e8f9" emissiveIntensity={0.65} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

const FloatingDataNodes: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const nodes = React.useMemo(
    () =>
      Array.from({ length: 9 }, (_, index) => ({
        id: index,
        x: (Math.random() - 0.5) * 6.5,
        y: 3 + Math.random() * 1.6,
        z: (Math.random() - 0.5) * 5.2,
        radius: 0.08 + Math.random() * 0.08,
      })),
    []
  );

  return (
    <Physics gravity={[0, reducedMotion ? -0.45 : -1.2, 0]}>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[5.5, 0.12, 4.2]} position={[0, 0.2, 0]} />
      </RigidBody>

      {nodes.map((node) => (
        <RigidBody
          key={node.id}
          colliders="ball"
          position={[node.x, node.y, node.z]}
          linearDamping={0.26}
          angularDamping={0.32}
          restitution={0.82}
          friction={0.18}
        >
          <mesh>
            <sphereGeometry args={[node.radius, 16, 16]} />
            <meshStandardMaterial emissive="#818cf8" emissiveIntensity={0.55} color="#1f2937" />
          </mesh>
        </RigidBody>
      ))}
    </Physics>
  );
};

const CameraPathRig: React.FC<{ focus: FocusPoint; reducedMotion: boolean }> = ({ focus, reducedMotion }) => {
  const { camera } = useThree();
  const scroll = useScroll();
  const camTarget = React.useMemo(() => new THREE.Vector3(), []);
  const lookTarget = React.useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const cfg = FOCUS_POINTS[focus];
    const t = scroll.offset;

    camTarget.set(
      cfg.camera[0] + Math.sin(t * Math.PI * 2) * 0.18,
      cfg.camera[1] + Math.sin(t * Math.PI) * 0.24,
      cfg.camera[2] - t * 2.25
    );

    lookTarget.set(cfg.look[0], cfg.look[1] + Math.sin(t * Math.PI) * 0.1, cfg.look[2]);

    camera.position.lerp(camTarget, reducedMotion ? 0.09 : 0.045);
    camera.lookAt(lookTarget);
  });

  return null;
};

const NexusSceneCore: React.FC<{ focus: FocusPoint; reducedMotion: boolean }> = ({ focus, reducedMotion }) => {
  return (
    <>
      <color attach="background" args={['#030712']} />
      <fog attach="fog" args={['#030712', 8, 20]} />

      <ambientLight intensity={0.45} />
      <directionalLight position={[2.2, 4.2, 2.6]} intensity={1.1} color="#67e8f9" />
      <pointLight position={[-2.8, 1.8, -1.2]} intensity={1.35} color="#818cf8" />
      <rectAreaLight position={[0, 2.5, 2.5]} width={4.2} height={2.4} intensity={7.5} color="#60a5fa" />

      <Environment preset="city" />

      <PresentationControls
        global
        enabled={!reducedMotion}
        polar={[-0.14, 0.16]}
        azimuth={[-0.44, 0.44]}
        config={{ mass: 2, tension: 230 }}
        snap={{ mass: 3, tension: 260 }}
      >
        <group>
          <NeonDesk reducedMotion={reducedMotion} />

          <ArtifactPedestal
            position={[3.65, 0, -0.35]}
            title="AI Hub"
            subtitle="ATS + NLP + Deep Learning"
            active={focus === 'projects'}
          >
            <AiHubArtifact highlighted={focus === 'projects'} reducedMotion={reducedMotion} />
          </ArtifactPedestal>

          <ArtifactPedestal
            position={[-3.75, 0, -0.35]}
            title="Communication Engine"
            subtitle="Spring Boot + React"
            active={focus === 'skills'}
          >
            <CommunicationArtifact highlighted={focus === 'skills'} reducedMotion={reducedMotion} />
          </ArtifactPedestal>

          <ArtifactPedestal
            position={[0, 0, 3.5]}
            title="Media Stream"
            subtitle="Video + Dynamic Surfaces"
            active={focus === 'home'}
          >
            <MediaStreamArtifact highlighted={focus === 'home'} reducedMotion={reducedMotion} />
          </ArtifactPedestal>

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.13, 0]}>
            <planeGeometry args={[18, 18]} />
            <meshStandardMaterial color="#020617" roughness={0.9} metalness={0.1} />
          </mesh>
        </group>
      </PresentationControls>

      <FloatingDataNodes reducedMotion={reducedMotion} />
      <CameraPathRig focus={focus} reducedMotion={reducedMotion} />

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.85} luminanceThreshold={0.2} luminanceSmoothing={0.85} mipmapBlur />
        <Noise opacity={0.055} />
      </EffectComposer>
    </>
  );
};

const MobileAmbientScene: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 52 }} dpr={[1, 1.35]}>
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 2, 2]} intensity={1.2} color="#67e8f9" />
      <pointLight position={[1.5, -1.5, -1.5]} intensity={0.9} color="#818cf8" />
      <Float speed={1.1} floatIntensity={0.9} rotationIntensity={0.6}>
        <mesh>
          <torusKnotGeometry args={[1.25, 0.22, 140, 20]} />
          <meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={0.45} roughness={0.3} metalness={0.6} />
        </mesh>
      </Float>
      <Stars radius={40} depth={16} count={850} factor={2} fade speed={0.45} />
    </Canvas>
  );
};

interface NexusCommandCenterProps {
  displayedRole: string;
}

export const NexusCommandCenter: React.FC<NexusCommandCenterProps> = ({ displayedRole }) => {
  const reducedMotion = useReducedMotionPreference();
  const isMobile = useMobileViewport();
  const [focus, setFocus] = React.useState<FocusPoint>('home');

  const navItems: Array<{ key: FocusPoint; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'projects', label: 'Projects', icon: Briefcase },
    { key: 'skills', label: 'Skills', icon: Layers3 },
  ];

  return (
    <section className="relative min-h-[100svh] border-b border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(56,189,248,0.18),transparent_40%),radial-gradient(circle_at_82%_24%,rgba(129,140,248,0.16),transparent_42%),radial-gradient(circle_at_50%_88%,rgba(45,212,191,0.14),transparent_50%)]" />

      <div className="absolute inset-0 z-0">
        {isMobile ? (
          <MobileAmbientScene />
        ) : (
          <Canvas camera={{ position: [0, 2.7, 8.8], fov: 46 }} dpr={reducedMotion ? [1, 1.2] : [1, 1.7]}>
            <ScrollControls pages={2.4} damping={0.18}>
              <NexusSceneCore focus={focus} reducedMotion={reducedMotion} />
            </ScrollControls>
          </Canvas>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-12 min-h-[100svh] flex flex-col justify-between">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-7 lg:gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="rounded-3xl border border-white/12 bg-slate-950/45 backdrop-blur-xl p-6 sm:p-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 mb-5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-80" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-emerald-100/90 font-semibold">Available for work</span>
            </div>

            <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-100/75 mb-3 font-mono">THE DIGITAL ARCHITECT'S NEXUS</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white mb-4">
              Cyber-Zen portfolio environment with
              <span className="block text-gradient-accent">interactive 3D artifacts.</span>
            </h1>
            <p className="text-lg text-white/70 mb-2">Meet Shah</p>
            <p className="text-base sm:text-lg text-cyan-200 font-mono mb-5 min-h-[28px]">{displayedRole}</p>

            <p className="text-white/60 leading-relaxed max-w-2xl mb-6">
              Full Stack Developer and AI/ML Engineer with 20+ projects spanning deep learning,
              enterprise systems, and production-grade SaaS products.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/works" className="inline-flex items-center gap-2 rounded-full bg-white text-slate-950 px-6 py-3 text-sm font-semibold hover:bg-cyan-300 transition-colors">
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/resume" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors">
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-500/8 text-cyan-100 px-6 py-3 text-sm font-semibold hover:bg-cyan-500/16 transition-colors">
                <Send className="w-4 h-4" />
                <span>Contact</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="rounded-3xl border border-white/12 bg-slate-950/55 backdrop-blur-xl p-5 sm:p-6"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80 mb-4">Orbit Navigation</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setFocus(item.key)}
                  className={`rounded-xl border px-3 py-3 text-sm transition-all duration-300 flex flex-col items-center gap-1 ${
                    focus === item.key
                      ? 'border-cyan-200/45 bg-cyan-400/14 text-cyan-100'
                      : 'border-white/12 bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/45 mb-2">Current Focus</p>
              <p className="text-white font-semibold mb-1">{FOCUS_POINTS[focus].label}</p>
              <p className="text-sm text-white/60 leading-relaxed">{FOCUS_POINTS[focus].detail}</p>
            </div>

            <div className="mt-4 rounded-2xl border border-indigo-300/20 bg-indigo-500/10 p-4">
              <p className="text-xs text-indigo-100/90 leading-relaxed">
                Drag the 3D lab to orbit the environment. Scroll to fly deeper through project pedestals.
                Click the communication artifact to unfold its stack orbit.
              </p>
            </div>

            <a
              href="mailto:meetshah1785@gmail.com"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>meetshah1785@gmail.com</span>
            </a>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mt-6">
          {[
            { label: 'AI Hub', detail: 'ATS and NLP systems visualized as interactive relics.' },
            { label: 'Communication Engine', detail: 'Glass envelope object with unfolding stack orbit.' },
            { label: 'Media Stream', detail: 'Curved waveform screen for video-centric products.' },
          ].map((entry) => (
            <div key={entry.label} className="rounded-2xl border border-white/12 bg-slate-950/45 backdrop-blur-md p-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-200/75 mb-2">{entry.label}</p>
              <p className="text-sm text-white/70 leading-relaxed">{entry.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
