const fs = require('fs');

const content = `import React, { useRef, useLayoutEffect, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload, Text, Html, Stars, Float, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { generateResumeData } from '../../utils/resumeGenerator';

gsap.registerPlugin(ScrollTrigger);

const DATA = generateResumeData();
const MAX_Z = -800; // The total distance of the journey
const SCROLL_WRAPPER_HEIGHT = "2500vh"; // Very long scrolling to give time to read

function Car() {
  const ref = useRef<THREE.Group>(null);
  
  useLayoutEffect(() => {
    if (!ref.current) return;
    
    const ctx = gsap.context(() => {
      // Linear drive forward
      gsap.to(ref.current!.position, {
        z: MAX_Z,
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll-wrapper",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });
      // Rotation logic for interest (bank slightly left/right/barrel roll for fun)
      gsap.to(ref.current!.rotation, {
        y: Math.PI * 4,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".scroll-wrapper",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group ref={ref} position={[0, 0.5, 0]}>
      {/* Fallback car block */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.8, 3]} />
        <meshStandardMaterial color="#00ffff" emissive="#0088ff" emissiveIntensity={0.8} />
      </mesh>
      {/* Tron lines */}
      <mesh position={[0, 0.41, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 3.1]} />
        <meshBasicMaterial color="#ff00ff" wireframe />
      </mesh>
      {/* Thruster exhaust */}
      <mesh position={[0, 0, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.1, 1, 16]} />
        <meshBasicMaterial color="#ff00ff" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function RetroGrid() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, MAX_Z / 2]} receiveShadow>
        <planeGeometry args={[400, Math.abs(MAX_Z) + 500]} />
        <meshStandardMaterial color="#020206" roughness={0.8} />
      </mesh>
      <gridHelper args={[400, 200, "#ff00ff", "#00ffff"]} position={[0, 0.01, MAX_Z / 2]} />
    </group>
  );
}

function StarField() {
  const ref = useRef<THREE.InstancedMesh>(null);
  
  useLayoutEffect(() => {
    if (!ref.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 3000; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 800,
        Math.random() * 400,
        (Math.random() - 0.5) * 1500 - 400
      );
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, 3000]}>
      <sphereGeometry args={[0.4, 4, 4]} />
      <meshBasicMaterial color="#ffffff" />
    </instancedMesh>
  );
}

function CameraFollow() {
  useFrame((state) => {
    const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    const scrollY = window.scrollY;
    
    let progress = 0;
    if (scrollHeight - window.innerHeight > 0) {
      progress = scrollY / (scrollHeight - window.innerHeight);
    }
    
    // As progress goes 0 -> 1, Z goes 0 -> MAX_Z
    const targetZ = progress * MAX_Z + 10;
    
    state.camera.position.lerp(new THREE.Vector3(0, 4, targetZ), 0.1);
    state.camera.lookAt(0, 1, targetZ - 30);
  });
  return null;
}

// ================= STATIONS =================

function HeroStation() {
  return (
    <group position={[0, 5, -20]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <Text position={[0, 3, 0]} fontSize={5} color="#00ffff" anchorX="center" anchorY="bottom" outlineWidth={0.1} outlineColor="#000">
          {DATA.personalInfo.name.toUpperCase()}
        </Text>
        <Text position={[0, 1, 0]} fontSize={1.5} color="#ff00ff" anchorX="center" anchorY="top">
          {DATA.personalInfo.title.toUpperCase()}
        </Text>
        <Text position={[0, -1, 0]} fontSize={0.8} color="#cccccc" anchorX="center" anchorY="top" maxWidth={20} textAlign="center">
          {DATA.personalInfo.location} | {DATA.personalInfo.email}
        </Text>
      </Float>
    </group>
  );
}

function AboutStation() {
  return (
    <group position={[-15, 6, -100]}>
      <Html transform distanceFactor={15} wrapperClass="glass-panel" rotation={[0, Math.PI / 6, 0]}>
        <div className="w-[600px] p-8 rounded-xl bg-black/60 border-2 border-cyan-500 backdrop-blur-xl text-white shadow-[0_0_30px_rgba(0,255,255,0.3)]">
          <h2 className="text-4xl font-bold mb-4 text-cyan-400 font-mono tracking-widest border-b border-cyan-500/50 pb-4">SYSTEM_SUMMARY</h2>
          <p className="text-xl leading-relaxed opacity-90">{DATA.summary}</p>
          <div className="mt-8 flex gap-4 text-sm font-mono text-cyan-300">
            <a href={DATA.personalInfo.github} target="_blank" rel="noreferrer" className="px-4 py-2 border border-cyan-600 hover:bg-cyan-900/50 rounded transition-colors">GITHUB_UPLINK</a>
            <a href={DATA.personalInfo.linkedin} target="_blank" rel="noreferrer" className="px-4 py-2 border border-cyan-600 hover:bg-cyan-900/50 rounded transition-colors">LINKEDIN_UPLINK</a>
          </div>
        </div>
      </Html>
    </group>
  );
}

function EducationStation() {
  return (
    <group position={[15, 6, -200]}>
      <Html transform distanceFactor={15} wrapperClass="glass-panel" rotation={[0, -Math.PI / 6, 0]}>
        <div className="w-[700px] p-8 rounded-xl bg-black/60 border-2 border-purple-500 backdrop-blur-xl text-white shadow-[0_0_30px_rgba(168,85,247,0.3)]">
          <h2 className="text-4xl font-bold mb-6 text-purple-400 font-mono tracking-widest border-b border-purple-500/50 pb-4">ACADEMIC_RECORDS</h2>
          <div className="space-y-6">
            {DATA.education.map((edu, i) => (
              <div key={i} className="pl-4 border-l-2 border-purple-500/50">
                <h3 className="text-2xl font-bold text-purple-200">{edu.degree}</h3>
                <p className="text-lg text-purple-400/80">{edu.institution}</p>
                <div className="flex justify-between text-sm opacity-60 mt-1 font-mono">
                  <span>{edu.graduation}</span>
                  <span>{edu.gpa}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}

function ExperienceStation() {
  return (
    <group position={[-15, 6, -350]}>
      <Html transform distanceFactor={15} wrapperClass="glass-panel" rotation={[0, Math.PI / 6, 0]}>
        <div className="w-[800px] p-8 rounded-xl bg-black/60 border-2 border-orange-500 backdrop-blur-xl text-white shadow-[0_0_30px_rgba(249,115,22,0.3)]">
          <h2 className="text-4xl font-bold mb-6 text-orange-400 font-mono tracking-widest border-b border-orange-500/50 pb-4">WORK_LOGS</h2>
          <div className="space-y-8">
            {DATA.experience.map((exp, i) => (
              <div key={i} className="pl-4 border-l-2 border-orange-500/50">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-2xl font-bold text-orange-200">{exp.title}</h3>
                  <span className="text-sm font-mono opacity-60">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-lg text-orange-400/80 mb-3">{exp.company} // {exp.location}</p>
                <ul className="list-disc list-inside space-y-2 opacity-80 pl-2">
                  {exp.achievements.map((achieve, j) => (
                    <li key={j} className="text-base">{achieve}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}

function ProjectsStation() {
  return (
    <group position={[0, 0, -450]}>
      <Text position={[0, 15, 0]} fontSize={5} color="#00ffff" anchorX="center" anchorY="bottom">
        PROJECT_ARCHIVES
      </Text>
      {DATA.projects.map((project, index) => {
        const xOffset = index === 1 ? -15 : (index === 0 ? 15 : 0);
        const zOffset = index * -40; // stagger them deeper
        const yOffset = 8 + (index % 2) * 2;
        
        return (
          <group key={index} position={[xOffset, yOffset, zOffset]}>
             <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
              <Html transform distanceFactor={15} wrapperClass="glass-panel" rotation={[0, xOffset < 0 ? Math.PI/8 : (xOffset > 0 ? -Math.PI/8 : 0), 0]}>
                <div className="w-[500px] h-auto min-h-[350px] p-8 rounded-xl bg-black/70 border border-cyan-400 backdrop-blur-md text-white hover:scale-105 transition-transform duration-500 hover:shadow-[0_0_40px_rgba(0,255,255,0.6)]">
                  <h3 className="text-3xl font-bold mb-2 font-mono text-cyan-300">{project.name.split('—')[0]}</h3>
                  <p className="text-sm opacity-60 mb-4">{project.name.split('—')[1]}</p>
                  <p className="text-lg opacity-90 mb-6">{project.description}</p>
                  
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((tech, tIdx) => (
                      <span key={tIdx} className="px-2 py-1 bg-cyan-900/30 border border-cyan-700/50 rounded text-xs font-mono text-cyan-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <ul className="text-sm space-y-2 opacity-70 mb-6 border-l border-cyan-800 pl-4">
                    {project.achievements.map((achieve, aIdx) => (
                      <li key={aIdx}>• {achieve}</li>
                    ))}
                  </ul>
                </div>
              </Html>
             </Float>
          </group>
        );
      })}
    </group>
  );
}

function SkillsStation() {
  const skillEntries = useMemo(() => Object.entries(DATA.skills), []);
  const zBase = -600;
  
  return (
    <group position={[0, 0, zBase]}>
       <Text position={[0, 20, 0]} fontSize={6} color="#ff00ff" anchorX="center" anchorY="bottom">
        NEURAL_CAPABILITIES
      </Text>
      {skillEntries.map(([category, skills], i) => {
        // distribute skill groups in a wide ring
        const angle = (i / skillEntries.length) * Math.PI * 2;
        const radius = 25;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * 10 + 10;
        const z = - (i * 15);
        
        return (
          <group key={i} position={[x, y, z]}>
            <Float speed={3} rotationIntensity={1} floatIntensity={2}>
              <mesh>
                <icosahedronGeometry args={[4, 1]} />
                <meshStandardMaterial color="#ff00ff" wireframe emissive="#ff00ff" emissiveIntensity={0.5} />
              </mesh>
              <Text position={[0, 6, 0]} fontSize={2.5} color="#ffffff" anchorX="center" anchorY="middle">
                {category}
              </Text>
              {skills.slice(0, 4).map((skill, j) => (
                <Text key={j} position={[0, 3 - j*1.2, 0]} fontSize={1} color="#00ffff" anchorX="center" anchorY="middle">
                  {skill}
                </Text>
              ))}
            </Float>
          </group>
        );
      })}
    </group>
  );
}

function ContactStation() {
  return (
    <group position={[0, 8, MAX_Z]}>
      <mesh rotation={[-Math.PI/6, 0, 0]} position={[0, -2, 0]}>
        <boxGeometry args={[20, 15, 2]} />
        <meshStandardMaterial color="#0a0a1a" metalness={0.9} roughness={0.1} />
        {/* Glow behind terminal */}
        <pointLight position={[0, 0, 2]} color="#ff00ff" intensity={5} distance={30} />
      </mesh>
      
      <Html position={[0, -2, 1.01]} transform distanceFactor={20} rotation={[-Math.PI/6, 0, 0]}>
        <div className="w-[900px] h-[600px] bg-slate-950/90 border-4 border-magenta-500 p-12 rounded-lg text-cyan-400 font-mono shadow-[0_0_60px_rgba(255,0,255,0.4)] flex flex-col justify-between">
          <div>
            <h2 className="text-5xl text-magenta-400 mb-2 tracking-[0.2em] animate-pulse">ESTABLISH_UPLINK</h2>
            <p className="text-cyan-600 mb-8 tracking-widest">AWAITING_INPUT_TRANSMISSION...</p>
            
            <form className="flex flex-col space-y-6">
              <input type="text" placeholder="Designation (Name)" className="bg-black border border-cyan-800 p-5 rounded text-2xl text-cyan-100 outline-none focus:border-magenta-400 focus:shadow-[0_0_15px_rgba(255,0,255,0.4)] transition-all" />
              <input type="email" placeholder="Frequency (Email)" className="bg-black border border-cyan-800 p-5 rounded text-2xl text-cyan-100 outline-none focus:border-magenta-400 focus:shadow-[0_0_15px_rgba(255,0,255,0.4)] transition-all" />
              <textarea placeholder="Message payload..." className="bg-black border border-cyan-800 p-5 rounded h-40 resize-none text-2xl text-cyan-100 outline-none focus:border-magenta-400 focus:shadow-[0_0_15px_rgba(255,0,255,0.4)] transition-all"></textarea>
            </form>
          </div>
          <button type="button" className="bg-magenta-600 hover:bg-magenta-400 text-white font-bold py-6 text-2xl rounded transition-colors tracking-[0.3em] uppercase w-full shadow-[0_0_20px_rgba(255,0,255,0.6)]">TRANSMIT PAYLOAD</button>
        </div>
      </Html>
    </group>
  );
}

// ================= MAIN COMPONENT =================

export default function CyberpunkJourney() {
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [currentZone, setCurrentZone] = useState("HERO");

  useEffect(() => {
    let lastScroll = window.scrollY;
    
    const onScroll = () => {
      const currentScroll = window.scrollY;
      
      const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
      
      let progress = 0;
      if (scrollHeight - window.innerHeight > 0) {
        progress = currentScroll / (scrollHeight - window.innerHeight);
      }
      
      // Calculate Zone Based on Progress
      if (progress < 0.1) setCurrentZone("HERO_GATE");
      else if (progress < 0.2) setCurrentZone("ABOUT_SECTOR");
      else if (progress < 0.4) setCurrentZone("ARCHIVES_HUB");
      else if (progress < 0.6) setCurrentZone("PROJECT_NEXUS");
      else if (progress < 0.8) setCurrentZone("NEURAL_FIELD");
      else setCurrentZone("COMMS_TERMINAL");

      setSpeed(Math.abs(currentScroll - lastScroll));
      setDistance(Math.floor(progress * 100));
      
      lastScroll = currentScroll;
    };
    
    window.addEventListener('scroll', onScroll);
    // Initial call
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={\`scroll-wrapper w-full h-[\${SCROLL_WRAPPER_HEIGHT}] bg-black font-sans m-0 p-0 overflow-x-hidden\`}>
      
      {/* Dynamic HUD */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-[100] flex flex-col justify-between p-8">
        <div className="flex justify-between w-full items-start">
          <div className="flex flex-col gap-4">
            <div className="border border-cyan-500 bg-black/60 backdrop-blur px-8 py-5 rounded shadow-[0_0_15px_rgba(0,255,255,0.2)]">
              <div className="text-cyan-400 text-sm tracking-[0.3em] mb-2 font-mono">VELOCITY</div>
              <div className="text-white text-4xl font-mono font-bold">{(speed*10).toFixed(0).padStart(3, '0')} <span className="text-sm text-cyan-600 ml-1">KMPH</span></div>
            </div>
            
            <div className="border border-yellow-500 bg-black/60 backdrop-blur px-6 py-3 rounded shadow-[0_0_15px_rgba(255,255,0,0.2)]">
              <div className="text-yellow-400 text-xs tracking-[0.3em] mb-1 font-mono">CURRENT_ZONE</div>
              <div className="text-white text-xl font-mono animate-pulse">{currentZone}</div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-4">
            <div className="border border-magenta-500 bg-black/60 backdrop-blur px-8 py-5 rounded text-right shadow-[0_0_15px_rgba(255,0,255,0.2)]">
              <div className="text-magenta-400 text-sm tracking-[0.3em] mb-2 font-mono">PROGRESS</div>
              <div className="text-white text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-purple-600">{distance}%</div>
            </div>
            
            <div className="text-cyan-400 font-mono text-sm bg-black/80 p-3 border border-cyan-900 rounded">
              <div className="mb-1 opacity-70">COORDINATES:</div>
              X: 000 | Y: 004 | Z: -{(distance/100 * Math.abs(MAX_Z)).toFixed(0).padStart(3, '0')}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center w-full pb-10">
          <div className="flex flex-col items-center opacity-80">
             <div className="text-xs text-white tracking-widest mb-3 animate-pulse font-mono">SCROLL_DOWN_TO_PROCEED</div>
             <div className="w-0.5 h-24 bg-gradient-to-b from-cyan-400 to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Canvas shadows gl={{ antialias: true }} camera={{ position: [0, 6, 12], fov: 60 }}>
          <color attach="background" args={['#020206']} />
          <fog attach="fog" args={['#020206', 20, 200]} />
          
          <ambientLight intensity={0.2} />
          
          {/* Cyberpunk Neon Lighting travelling with the scene mostly */}
          <pointLight position={[0, 20, 0]} color="#00ffff" intensity={20} distance={200} />
          <pointLight position={[0, 20, -200]} color="#ff00ff" intensity={20} distance={200} />
          <pointLight position={[0, 20, -400]} color="#00ffff" intensity={20} distance={200} />
          <pointLight position={[0, 20, -600]} color="#ff00ff" intensity={20} distance={200} />
          <pointLight position={[0, 20, -800]} color="#00ffff" intensity={20} distance={200} />

          <CameraFollow />
          
          <group>
            <Car />
            <RetroGrid />
            <StarField />
            
            {/* The Stations Array */}
            <HeroStation />
            <AboutStation />
            <EducationStation />
            <ExperienceStation />
            <ProjectsStation />
            <SkillsStation />
            <ContactStation />
          </group>
          
        </Canvas>
      </div>
    </div>
  );
}
\`

fs.writeFileSync('src/components/scene/CyberpunkJourney.tsx', content);
console.log('File successfully generated');
