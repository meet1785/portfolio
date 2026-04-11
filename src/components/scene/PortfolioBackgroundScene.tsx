import React from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';
import { useTheme } from '../../context/ThemeContext';

interface SceneCapabilities {
  ready: boolean;
  webgl: boolean;
  reducedMotion: boolean;
  lowPerformance: boolean;
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

const useSceneCapabilities = (): SceneCapabilities => {
  const [capabilities, setCapabilities] = React.useState<SceneCapabilities>({
    ready: false,
    webgl: false,
    reducedMotion: false,
    lowPerformance: false,
  });

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      const lowPerformance = typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4;

      setCapabilities({
        ready: true,
        webgl: detectWebGL(),
        reducedMotion: query.matches,
        lowPerformance,
      });
    };

    update();
    query.addEventListener('change', update);

    return () => query.removeEventListener('change', update);
  }, []);

  return capabilities;
};

const FluxRing: React.FC<{ reducedMotion: boolean; colors: string[] }> = ({ reducedMotion, colors }) => {
  const ringRef = React.useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!ringRef.current || reducedMotion) return;

    ringRef.current.rotation.x += delta * 0.1;
    ringRef.current.rotation.z += delta * 0.08;
    ringRef.current.rotation.y = state.clock.elapsedTime * 0.12;
  });

  return (
    <Float speed={reducedMotion ? 0 : 0.9} rotationIntensity={0.6} floatIntensity={0.7}>
      <mesh ref={ringRef} position={[0, 0.2, 0]}>
        <torusKnotGeometry args={[1.4, 0.35, 180, 24]} />
        <meshStandardMaterial
          color={colors[0]}
          emissive={colors[1]}
          emissiveIntensity={0.35}
          metalness={0.55}
          roughness={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
};

const OrbitalCluster: React.FC<{ reducedMotion: boolean; colors: string[] }> = ({ reducedMotion, colors }) => {
  const groupRef = React.useRef<THREE.Group>(null);

  const points = React.useMemo(() => {
    return Array.from({ length: 36 }, (_, index) => {
      const angle = (index / 36) * Math.PI * 2;
      const radius = 2.3 + (index % 5) * 0.08;
      const y = Math.sin(index * 0.8) * 0.45;

      return [
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius,
      ] as [number, number, number];
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;

    groupRef.current.rotation.y += delta * 0.15;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {points.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[0.06 + (index % 3) * 0.015, 10, 10]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? colors[0] : colors[1]}
            emissive={index % 2 === 0 ? colors[0] : colors[2]}
            emissiveIntensity={0.45}
            roughness={0.2}
            metalness={0.35}
          />
        </mesh>
      ))}
    </group>
  );
};

const CameraRig: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  useFrame((state) => {
    if (reducedMotion) return;

    const x = state.pointer.x * 0.25;
    const y = state.pointer.y * 0.18;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y, 0.03);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
};

const SceneCore: React.FC<{ reducedMotion: boolean; lowPerformance: boolean; colors: string[] }> = ({
  reducedMotion,
  lowPerformance,
  colors,
}) => {
  const starCount = reducedMotion ? 700 : lowPerformance ? 1100 : 2200;
  const sparkleCount = reducedMotion ? 25 : lowPerformance ? 55 : 90;

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[2, 4, 3]} color={colors[0]} intensity={1.3} />
      <directionalLight position={[-3, 2, -2]} color={colors[1]} intensity={0.95} />
      <pointLight position={[0, -1.5, 1.2]} color={colors[2]} intensity={0.8} />

      <FluxRing reducedMotion={reducedMotion} colors={colors} />
      <OrbitalCluster reducedMotion={reducedMotion} colors={colors} />

      <Stars radius={80} depth={20} count={starCount} factor={2} fade speed={0.4} />
      <Sparkles count={sparkleCount} scale={8} size={2.2} speed={0.5} color={colors[0]} />

      <CameraRig reducedMotion={reducedMotion} />
    </>
  );
};

export const PortfolioBackgroundScene: React.FC = () => {
  const { theme } = useTheme();
  const { ready, webgl, reducedMotion, lowPerformance } = useSceneCapabilities();

  const palette = React.useMemo(() => {
    if (theme === 'light') {
      return ['#0891b2', '#2563eb', '#f97316'];
    }

    return ['#38bdf8', '#6366f1', '#14b8a6'];
  }, [theme]);

  if (!ready || !webgl) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(14,165,233,0.2),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.22),transparent_48%),radial-gradient(circle_at_50%_80%,rgba(20,184,166,0.18),transparent_46%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(15,23,42,0.55),rgba(2,6,23,0.8)_45%,rgba(3,7,18,0.94))]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6.4], fov: 46 }}
        dpr={lowPerformance ? [1, 1.2] : [1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />
        <SceneCore reducedMotion={reducedMotion} lowPerformance={lowPerformance} colors={palette} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.16),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.18),transparent_40%)] mix-blend-screen" />
    </div>
  );
};
