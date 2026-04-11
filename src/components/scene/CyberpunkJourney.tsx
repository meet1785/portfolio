import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, Stars, Preload, useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { CarErrorBoundary } from "./CarErrorBoundary";
import { generateResumeData } from '../../utils/resumeGenerator';
import { motion, AnimatePresence } from 'framer-motion';

const DATA = generateResumeData();

// Load the locally stored 3D car model
const CarModel = () => {
  // We use the local car.glb downloaded directly into the public folder
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}car.glb`);
  return (
    <group position={[0, -0.2, 0]} rotation={[0, Math.PI, 0]}>
      <primitive object={scene} scale={[1, 1, 1]} />
      <pointLight position={[0, 0.5, -1.5]} color="#00ffff" intensity={2} distance={5} />
      <pointLight position={[0, 0.5, 2]} color="#ff00ff" intensity={3} distance={5} />
    </group>
  );
};

const JOURNEY_POINTS = [
  new THREE.Vector3(-8.8, 0, 4.2),
  new THREE.Vector3(-5.3, 0, 3.6),
  new THREE.Vector3(-2.1, 0, 2.6),
  new THREE.Vector3(0.4, 0, 1.0),
  new THREE.Vector3(2.9, 0, -1.8),
  new THREE.Vector3(5.6, 0, -3.2),
  new THREE.Vector3(8.6, 0, -2.9),
  new THREE.Vector3(12.6, 0, -1.9),
  new THREE.Vector3(15.6, 0, 1.9),
  new THREE.Vector3(18.6, 0, 4.9),
];

const STATION_PROGRESS = [0.05, 0.25, 0.50, 0.75, 0.95];
const STATION_LABELS = ['HOME_SECTOR', 'ABOUT_ARCHIVES', 'WORKS_NEXUS', 'NEURAL_SKILLS', 'COMMS_TERMINAL'];

// Tech Environment Components
const TechMonoliths = () => {
  const monolithCount = 40;
  const monoliths = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < monolithCount; i++) {
      const x = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 60;
      // Keep away from the road center slightly
      if (Math.abs(x) < 5 && Math.abs(z) < 5) continue;
      
      const height = Math.random() * 8 + 2;
      const isCyan = Math.random() > 0.5;
      temp.push({
        position: new THREE.Vector3(x, height / 2 - 1, z),
        scale: new THREE.Vector3(Math.random() * 1 + 0.5, height, Math.random() * 1 + 0.5),
        color: isCyan ? "#00ffff" : "#ff00ff",
        emissiveIntensity: Math.random() * 2 + 1,
      });
    }
    return temp;
  }, []);

  return (
    <group>
      {monoliths.map((m, i) => (
        <mesh key={i} position={m.position} scale={m.scale}>
          <boxGeometry />
          <meshStandardMaterial 
            color="#0a0a0a" 
            emissive={m.color} 
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.8}
            wireframe={Math.random() > 0.8}
          />
          {/* Glowing trim */}
          <mesh position={[0, 0, 0]} scale={[1.01, 1.01, 1.01]}>
            <boxGeometry />
            <meshBasicMaterial color={m.color} wireframe transparent opacity={0.15} />
          </mesh>
        </mesh>
      ))}
    </group>
  );
};

const FloatingData = () => {
  const meshRef = React.useRef<THREE.InstancedMesh>(null);
  const count = 150;
  
  const dummy = React.useMemo(() => new THREE.Object3D(), []);
  const particles = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        t: Math.random() * 100,
        factor: 0.1 + Math.random() * 0.5,
        speed: 0.05 + Math.random() * 0.1,
        xFactor: (Math.random() - 0.5) * 40,
        yFactor: (Math.random() - 0.5) * 20 + 5,
        zFactor: (Math.random() - 0.5) * 40,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      dummy.position.set(
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.6} />
    </instancedMesh>
  );
};

const JourneyScene = ({ onStationChange, onProgressChange }: { onStationChange: (i:number)=>void, onProgressChange: (p:number)=>void }) => {
  const scroll = useScroll();
  const carRef = React.useRef<THREE.Group>(null);

  const curve = React.useMemo(() => new THREE.CatmullRomCurve3(JOURNEY_POINTS.map(p => p.clone()), false, 'catmullrom', 0.2), []);
  const roadGeom = React.useMemo(() => new THREE.TubeGeometry(curve, 360, 0.6, 16, false), [curve]);
  const laneGeom = React.useMemo(() => new THREE.TubeGeometry(curve, 360, 0.35, 14, false), [curve]);
  
  useFrame((state) => {
    const t = THREE.MathUtils.clamp(scroll.offset, 0, 0.999);
    onProgressChange(t);
    
    let active = 0;
    for (let i = 0; i < STATION_PROGRESS.length; i++) {
        if (t >= STATION_PROGRESS[i] - 0.05) active = i;
    }
    onStationChange(active);

    const currentP = curve.getPointAt(t);
    const nextP = curve.getPointAt(Math.min(t + 0.01, 1));

    if (carRef.current) {
      if (currentP && nextP) {
          carRef.current.position.copy(currentP);
          carRef.current.position.y += 0.3;
          carRef.current.lookAt(nextP.x, currentP.y + 0.3, nextP.z);
      }
    }
    
    // Smooth camera following car slightly behind
    const camOffset = new THREE.Vector3(4, 2, -5).applyEuler(carRef.current?.rotation || new THREE.Euler());
    state.camera.position.lerp(currentP.clone().add(camOffset), 0.1);
    state.camera.lookAt(currentP);
  });

  return (
    <group>
      <group ref={carRef}>
         <CarErrorBoundary>
           <Suspense fallback={null}>
             <CarModel />
           </Suspense>
         </CarErrorBoundary>
      </group>
      
      {/* The Road */}
      <mesh geometry={roadGeom}>
        <meshStandardMaterial color="#020617" roughness={0.8} />
      </mesh>
      <mesh geometry={laneGeom} position={[0, 0.01, 0]}>
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Grid Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, -1, 0]}>
        <planeGeometry args={[150, 150]} />
        <meshStandardMaterial color="#01030d" roughness={0.9} metalness={0.8} />
      </mesh>
      {/* Cyberpunk Grid / Circuit Pattern overlay */}
      <gridHelper args={[150, 60, "#ff00ff", "#00ffff"]} position={[5, -0.9, 0]} />
      <gridHelper args={[150, 10, "#ffffff", "#ffffff"]} position={[5, -0.89, 0]} material-opacity={0.05} material-transparent />

      {/* Environment Detail Additions */}
      <TechMonoliths />
      <FloatingData />
    </group>
  )
}

export const CarJourneyLanding = () => {
  const [activeStation, setActiveStation] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const cards = [
    // 1. HERO_SECTOR
    <div key="0" className="bg-slate-900/90 border border-cyan-400/50 p-8 rounded-2xl text-white backdrop-blur shadow-[0_0_40px_rgba(0,255,255,0.15)] flex flex-col gap-2">
      <div className="text-cyan-400 text-sm font-mono tracking-widest mb-2 opacity-80 uppercase">Primary Directive</div>
      <h1 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-1">{DATA.personalInfo.name}</h1>
      <p className="text-xl font-medium text-cyan-100">{DATA.personalInfo.title}</p>
      <div className="w-12 h-1 bg-cyan-500 rounded my-3"></div>
      <p className="text-[15px] opacity-80 leading-relaxed font-light">{DATA.summary.substring(0, 180)}...</p>
    </div>,

    // 2. ABOUT & EXPERIENCE
    <div key="1" className="bg-slate-900/95 border-l-4 border-orange-500 p-8 rounded-2xl text-white backdrop-blur shadow-[0_0_40px_rgba(249,115,22,0.15)] flex flex-col gap-2">
      <div className="flex items-center gap-3 mb-2 border-b border-orange-500/20 pb-4">
        <div className="p-3 bg-orange-500/20 rounded-lg text-orange-400">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-0-2.5 2.5 2.5 0 0 0 0-5H20"/></svg>
        </div>
        <h2 className="text-3xl font-bold text-orange-400 tracking-wide">ABOUT & WORK</h2>
      </div>
      <p className="text-base opacity-80 mb-6 leading-relaxed">Discover my professional journey and experiences architecting scalable systems across various companies.</p>
      <button onClick={() => handleNavigate('/about')} className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-orange-500/30 w-full uppercase tracking-widest text-sm cursor-pointer pointer-events-auto flex justify-center items-center gap-2">
         Explore Work History
         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>,

    // 3. WORKS NEXUS (PROJECTS)
    <div key="2" className="bg-slate-950/95 border-l-4 border-violet-500 p-8 rounded-2xl text-white backdrop-blur shadow-[0_0_40px_rgba(139,92,246,0.15)]">
      <div className="flex items-center gap-3 mb-2 border-b border-violet-500/20 pb-4">
        <div className="p-3 bg-violet-500/20 rounded-lg text-violet-400">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        </div>
        <h2 className="text-3xl font-bold text-violet-400 tracking-wide">PROJECTS</h2>
      </div>
      <p className="text-base opacity-80 mb-6 leading-relaxed">A showcase of the sophisticated systems, high-traffic apps, and optimized platforms I have engineered.</p>
      <button onClick={() => handleNavigate('/projects')} className="bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-violet-500/30 w-full uppercase tracking-widest text-sm cursor-pointer pointer-events-auto flex justify-center items-center gap-2">
         View Portfolio
         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>,

    // 4. NEURAL SKILLS
    <div key="3" className="bg-slate-900/95 border-l-4 border-emerald-400 p-8 rounded-2xl text-white backdrop-blur shadow-[0_0_40px_rgba(52,211,153,0.15)]">
       <div className="flex items-center gap-3 mb-2 border-b border-emerald-400/20 pb-4">
        <div className="p-3 bg-emerald-500/20 rounded-lg text-emerald-400">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <h2 className="text-3xl font-bold text-emerald-400 tracking-wide">SKILLS & ARCHIVE</h2>
      </div>
       <p className="text-base opacity-80 mb-6 leading-relaxed">Dive deeper into my technical stack containing React, TypeScript, Node.js, and access my verified resume.</p>
       <button onClick={() => handleNavigate('/resume')} className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/30 w-full uppercase tracking-widest text-sm cursor-pointer pointer-events-auto flex justify-center items-center gap-2">
          Access Databank
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
       </button>
    </div>,

    // 5. COMMS TERMINAL
    <div key="4" className="bg-black/95 border border-magenta-500/50 p-8 rounded-2xl min-w-[400px] shadow-[0_0_60px_rgba(255,0,255,0.2)] backdrop-blur relative overflow-hidden">
       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-magenta-500 to-transparent"></div>
       <div className="flex justify-center mb-6 mt-2 relative">
          <div className="absolute inset-0 bg-magenta-500/20 blur-xl rounded-full"></div>
          <svg className="text-magenta-400 relative z-10 animate-pulse" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
       </div>
       <h2 className="text-3xl text-white font-bold text-center mb-2 tracking-wide uppercase">Initiate Uplink</h2>
       <p className="text-sm opacity-70 mb-8 text-center leading-relaxed">Establish a secure connection for collaborations, freelance inquiries, or network handshakes.</p>
       <button onClick={() => handleNavigate('/contact')} className="bg-magenta-600 hover:bg-magenta-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-magenta-500/40 w-full uppercase tracking-[0.2em] text-sm cursor-pointer pointer-events-auto filter drop-shadow">
           Connect
       </button>
    </div>
  ];

  return (
    <section className="relative h-[100svh] w-full bg-black overflow-hidden font-sans">
       <Canvas shadows gl={{ antialias: true, alpha: false }}>
          <color attach="background" args={['#020617']} />
          <fog attach="fog" args={['#020617', 2, 25]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 10, -5]} color="#00ffff" intensity={15} distance={30} />
          <pointLight position={[-5, 5, 5]} color="#ff00ff" intensity={15} distance={30} />
          <Stars radius={30} depth={20} count={3000} factor={6} saturation={0} fade speed={1} />
          <ScrollControls pages={6} damping={0.25}>
            <JourneyScene onStationChange={setActiveStation} onProgressChange={setProgress} />
          </ScrollControls>
          <Preload all />
       </Canvas>

       {/* Progress HUD */}
       <div className="absolute top-[80px] md:top-[100px] lg:top-6 right-6 pointer-events-none text-white font-mono z-50 text-right">
          <div className="border border-magenta-500/50 bg-black/50 backdrop-blur px-4 py-2 rounded text-sm">
             <div className="text-magenta-400 tracking-[0.2em] mb-1 opacity-70">PROGRESS</div>
             <div className="text-2xl font-bold">{Math.floor(progress * 100)}%</div>
          </div>
       </div>

       {/* ACTIVE STATION EXACT POPUP OVERLAY */}
       <div className="absolute bottom-[12%] sm:bottom-[15%] md:bottom-auto md:top-[25%] lg:top-[25%] left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[10%] lg:left-[5%] z-50 pointer-events-none w-[90vw] md:w-[450px] lg:w-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
               key={activeStation}
               initial={{ opacity: 0, x: -80, scale: 0.9 }}
               animate={{ opacity: 1, x: 0, scale: 1 }}
               exit={{ opacity: 0, x: -80, scale: 0.9 }}
               transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
               className="pointer-events-auto shadow-2xl"
            >
               {cards[activeStation]}
            </motion.div>
          </AnimatePresence>
       </div>
       
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-50">
          <div className="flex flex-col items-center">
             <div className="animate-bounce mb-2 font-mono text-[10px] tracking-widest text-cyan-200">SCROLL DOWN TO ADVANCE</div>
             <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent"></div>
          </div>
       </div>
    </section>
  );
};
