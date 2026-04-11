import React from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, ScrollControls, useScroll, Float, Stars, Text, Preload } from '@react-three/drei';
import { generateResumeData } from '../../utils/resumeGenerator';

const DATA = generateResumeData();
const CAR_IMAGE_URL = `${import.meta.env.BASE_URL}car.png`;

// Keep the same curvy road as the inspiration, just extended
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

const CarSprite = () => {
  const [texture, setTexture] = React.useState<THREE.Texture | null>(null);
  React.useEffect(() => {
    new THREE.TextureLoader().load(CAR_IMAGE_URL, (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      setTexture(t);
    });
  }, []);
  const edges = React.useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.8, 0.55, 2.55)), []);
  return (
    <group>
       <lineSegments geometry={edges} position={[0, 0.44, 0]}>
        <lineBasicMaterial color="#00ffff" transparent opacity={0.6} />
      </lineSegments>
      <mesh position={[0, 0.55, -0.1]} castShadow>
        <planeGeometry args={[1.75, 0.92]} />
        {texture ? <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} /> : <meshBasicMaterial color="#00ffff" opacity={0.5} transparent/>}
      </mesh>
      <mesh position={[0, 0.28, 0]} castShadow>
        <boxGeometry args={[1.6, 0.18, 2.2]} />
        <meshStandardMaterial color="#0f172a" emissive="#00ffff" emissiveIntensity={0.6} metalness={0.5} />
      </mesh>
    </group>
  );
};

const JourneyScene = ({ onStationChange, onProgressChange }) => {
  const scroll = useScroll();
  const carRef = React.useRef<THREE.Group>(null);
  const roadRef = React.useRef<THREE.Mesh>(null);

  const curve = React.useMemo(() => new THREE.CatmullRomCurve3(JOURNEY_POINTS.map(p => p.clone()), false, 'catmullrom', 0.2), []);
  const roadGeom = React.useMemo(() => new THREE.TubeGeometry(curve, 360, 0.6, 16, false), [curve]);
  const laneGeom = React.useMemo(() => new THREE.TubeGeometry(curve, 360, 0.35, 14, false), [curve]);
  
  const stationPoints = React.useMemo(() => STATION_PROGRESS.map(t => curve.getPointAt(t)), [curve]);

  useFrame((state) => {
    const t = THREE.MathUtils.clamp(scroll.offset, 0, 0.999);
    onProgressChange(t);
    
    // Find active station index
    let active = 0;
    for (let i = 0; i < STATION_PROGRESS.length; i++) {
        if (t >= STATION_PROGRESS[i] - 0.05) active = i;
    }
    onStationChange(active);

    const currentP = curve.getPointAt(t);
    const nextP = curve.getPointAt(Math.min(t + 0.01, 1));

    if (carRef.current) {
      carRef.current.position.copy(currentP);
      carRef.current.position.y += 0.3;
      carRef.current.lookAt(nextP.x, currentP.y + 0.3, nextP.z);
    }
    
    // Smooth camera following car slightly behind
    const camOffset = new THREE.Vector3(3, 2, -4).applyEuler(carRef.current?.rotation || new THREE.Euler());
    state.camera.position.lerp(currentP.clone().add(camOffset), 0.1);
    state.camera.lookAt(currentP);
  });

  return (
    <group>
      <group ref={carRef}>
        <CarSprite />
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
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#01030d" />
      </mesh>
      <gridHelper args={[100, 50, "#ff00ff", "#00ffff"]} position={[5, -0.9, 0]} />

      {/* STATIONS INTEGRATION (3D Panels placed along the road) */}
      
      {/* 1. HERO_SECTOR */}
      <Html position={[stationPoints[0].x - 3, stationPoints[0].y + 1, stationPoints[0].z - 2]} transform distanceFactor={5} rotation={[0, Math.PI/4, 0]}>
        <div className="bg-slate-900/80 border border-cyan-400/50 p-6 rounded-xl text-white backdrop-blur min-w-[350px]">
          <h1 className="text-3xl font-bold text-cyan-400">{DATA.personalInfo.name}</h1>
          <p className="text-lg text-cyan-200">{DATA.personalInfo.title}</p>
          <p className="text-sm opacity-70 mt-2">{DATA.summary.substring(0, 120)}...</p>
        </div>
      </Html>

      {/* 2. ABOUT & EXPERIENCE */}
      <Html position={[stationPoints[1].x + 3, stationPoints[1].y + 2, stationPoints[1].z + 1]} transform distanceFactor={7} rotation={[0, -Math.PI/6, 0]}>
        <div className="bg-slate-900/90 border-2 border-orange-500/80 p-8 rounded-xl text-white backdrop-blur min-w-[600px] shadow-[0_0_30px_rgba(249,115,22,0.2)]">
          <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500/30 pb-2">WORK EXPERIENCE</h2>
          {DATA.experience.map((exp, i) => (
             <div key={i} className={i !== 0 ? "mt-4" : ""}>
                <h3 className="text-xl text-orange-200">{exp.title} <span className="opacity-60 text-sm">@ {exp.company}</span></h3>
                <p className="text-sm opacity-50 mb-2">{exp.startDate} - {exp.endDate}</p>
                <ul className="text-sm opacity-80 list-disc ml-4 space-y-1">
                   {exp.achievements.map((a, j) => <li key={j}>{a}</li>)}
                </ul>
             </div>
          ))}
        </div>
      </Html>

      {/* 3. WORKS NEXUS */}
      <Html position={[stationPoints[2].x - 4, stationPoints[2].y + 3, stationPoints[2].z - 4]} transform distanceFactor={9} rotation={[0, Math.PI/4, 0]}>
        <div className="bg-slate-950/90 border-2 border-violet-500/80 p-8 rounded-xl text-white backdrop-blur min-w-[700px] flex gap-4 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <div className="w-12 h-full flex items-center justify-center -rotate-90 text-2xl font-bold text-violet-500 tracking-widest whitespace-nowrap">PROJECTS</div>
          <div className="grid grid-cols-2 gap-4">
            {DATA.projects.map((proj, i) => (
              <div key={i} className="bg-white/5 p-4 rounded border border-white/10 hover:border-violet-400 transition-colors">
                <h3 className="text-lg font-bold text-violet-300">{proj.name.split("—")[0]}</h3>
                <p className="text-xs opacity-70 mt-1 mb-3">{proj.description}</p>
                <div className="flex flex-wrap gap-1">
                  {proj.technologies.slice(0, 4).map(t => <span key={t} className="text-[10px] bg-violet-900/40 text-violet-200 px-2 py-0.5 rounded">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Html>

      {/* 4. NEURAL SKILLS */}
      <Html position={[stationPoints[3].x + 4, stationPoints[3].y + 2, stationPoints[3].z + 3]} transform distanceFactor={6} rotation={[0, -Math.PI/4, 0]}>
        <div className="bg-slate-900/90 border-2 border-emerald-400 p-6 rounded-xl text-white min-w-[450px]">
           <h2 className="text-2xl font-bold text-emerald-400 mb-4 border-b border-emerald-400/30 pb-2">TECHNICAL STACK</h2>
           {Object.entries(DATA.skills).slice(0, 4).map(([cat, skills], i) => (
             <div key={i} className="mb-3">
               <h4 className="text-sm font-bold opacity-60 uppercase mb-1">{cat}</h4>
               <div className="flex flex-wrap gap-1">
                 {skills.map(s => <span key={s} className="px-2 py-1 bg-emerald-900/30 text-emerald-200 text-xs rounded border border-emerald-700/50">{s}</span>)}
               </div>
             </div>
           ))}
        </div>
      </Html>

      {/* 5. COMMS TERMINAL */}
      <Html position={[stationPoints[4].x, stationPoints[4].y + 5, stationPoints[4].z + 2]} transform distanceFactor={10} rotation={[0, Math.PI, 0]}>
        <div className="bg-black/90 border-4 border-magenta-500 p-10 rounded-2xl min-w-[600px] shadow-[0_0_50px_rgba(255,0,255,0.4)]">
           <h2 className="text-4xl text-magenta-400 font-mono text-center mb-6 tracking-widest uppercase">Contact Uplink</h2>
           <form className="flex flex-col gap-4">
             <input type="text" placeholder="Incoming Designation (Name)" className="bg-slate-900 border border-cyan-800 p-4 text-cyan-100 rounded focus:border-magenta-400 outline-none transition-colors" />
             <input type="email" placeholder="Frequency (Email)" className="bg-slate-900 border border-cyan-800 p-4 text-cyan-100 rounded focus:border-magenta-400 outline-none transition-colors" />
             <textarea placeholder="Message payload..." className="bg-slate-900 border border-cyan-800 p-4 h-32 resize-none text-cyan-100 rounded focus:border-magenta-400 outline-none transition-colors"></textarea>
             <button type="button" className="bg-magenta-600 hover:bg-magenta-500 py-4 font-bold text-white tracking-[0.2em] rounded uppercase mt-2">Transmit</button>
           </form>
           <div className="flex justify-center gap-6 mt-6">
             <a href={DATA.personalInfo.github} className="text-cyan-400 hover:text-white transition-colors">GITHUB</a>
             <a href={DATA.personalInfo.linkedin} className="text-cyan-400 hover:text-white transition-colors">LINKEDIN</a>
             <span className="text-white/40">{DATA.personalInfo.email}</span>
           </div>
        </div>
      </Html>

    </group>
  )
}

export const CarJourneyLanding = () => {
  const [activeStation, setActiveStation] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

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

       {/* HUD Overall Info */}
       <div className="absolute top-6 left-6 pointer-events-none text-white font-mono z-50">
          <div className="border border-cyan-500/50 bg-black/50 backdrop-blur px-4 py-2 rounded text-sm">
             <div className="text-cyan-400 tracking-[0.2em] mb-1 opacity-70">ZONE</div>
             <div className="text-xl font-bold animate-pulse">{STATION_LABELS[activeStation]}</div>
          </div>
       </div>

       <div className="absolute top-6 right-6 pointer-events-none text-white font-mono z-50 text-right">
          <div className="border border-magenta-500/50 bg-black/50 backdrop-blur px-4 py-2 rounded text-sm">
             <div className="text-magenta-400 tracking-[0.2em] mb-1 opacity-70">PROGRESS</div>
             <div className="text-2xl font-bold">{Math.floor(progress * 100)}%</div>
          </div>
       </div>
       
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-50">
          <div className="flex flex-col items-center">
             <div className="animate-bounce mb-2 font-mono text-[10px] tracking-widest text-cyan-200">SCROLL DOWN</div>
             <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent"></div>
          </div>
       </div>
    </section>
  );
};
