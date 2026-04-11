import React from 'react';

export const CarFallback = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Chassis */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.8, 0.5, 4]} />
        <meshStandardMaterial color="#0f172a" emissive="#00ffff" emissiveIntensity={0.2} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0, 0.8, -0.4]} castShadow>
        <boxGeometry args={[1.4, 0.4, 2]} />
        <meshStandardMaterial color="#000000" emissive="#ff00ff" emissiveIntensity={0.3} metalness={1} roughness={0} />
      </mesh>
      {/* Light bars */}
      <mesh position={[0, 0.4, 2.01]}>
        <boxGeometry args={[1.6, 0.1, 0.1]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>
      <mesh position={[0, 0.4, -2.01]}>
        <boxGeometry args={[1.6, 0.1, 0.1]} />
        <meshBasicMaterial color="#ff00ff" />
      </mesh>
    </group>
  );
};
