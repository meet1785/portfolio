import React from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { useTheme } from '../../context/ThemeContext';

interface HeroOrbSceneProps {
  className?: string;
}

const detectWebGL = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
};

const useWebGLReady = (): boolean => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setReady(detectWebGL());
  }, []);

  return ready;
};

const useReducedMotion = (): boolean => {
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

const HeroCore: React.FC<{ accent: string; secondary: string; reducedMotion: boolean }> = ({
  accent,
  secondary,
  reducedMotion,
}) => {
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (reducedMotion) {
      groupRef.current.rotation.y = 0.3;
      groupRef.current.rotation.x = 0.15;
      groupRef.current.rotation.z = 0;
      return;
    }

    groupRef.current.rotation.y += delta * 0.35;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.65) * 0.2;
    groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.4) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <Float speed={reducedMotion ? 0 : 1.4} rotationIntensity={reducedMotion ? 0 : 0.8} floatIntensity={reducedMotion ? 0 : 1.1}>
        <mesh>
          <icosahedronGeometry args={[1.4, 2]} />
          <meshStandardMaterial
            color={accent}
            emissive={secondary}
            emissiveIntensity={0.4}
            roughness={0.15}
            metalness={0.58}
            transparent
            opacity={0.92}
          />
        </mesh>
      </Float>

      <mesh scale={1.65}>
        <torusGeometry args={[1.4, 0.03, 24, 120]} />
        <meshBasicMaterial color={secondary} transparent opacity={0.55} />
      </mesh>

      <Sparkles count={reducedMotion ? 20 : 70} scale={4.5} size={2.2} speed={0.7} color={accent} />
    </group>
  );
};

export const HeroOrbScene: React.FC<HeroOrbSceneProps> = ({ className = '' }) => {
  const webglReady = useWebGLReady();
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();

  const accent = theme === 'light' ? '#0369a1' : '#38bdf8';
  const secondary = theme === 'light' ? '#1d4ed8' : '#6366f1';

  if (!webglReady) {
    return (
      <div
        className={`relative w-full aspect-square rounded-full overflow-hidden border border-sky-300/20 ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(56,189,248,0.5),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.55),transparent_52%)]" />
        <div className="absolute inset-0 backdrop-blur-sm bg-slate-950/55" />
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-square rounded-full overflow-hidden border border-sky-300/20 ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 48 }} dpr={reducedMotion ? [1, 1.2] : [1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 3, 2]} intensity={1.3} color={accent} />
        <directionalLight position={[-2, -2, -2]} intensity={0.95} color={secondary} />
        <HeroCore accent={accent} secondary={secondary} reducedMotion={reducedMotion} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(56,189,248,0.2),transparent_44%),radial-gradient(circle_at_85%_80%,rgba(99,102,241,0.22),transparent_46%)] mix-blend-screen" />
    </div>
  );
};
