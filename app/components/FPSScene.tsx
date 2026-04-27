"use client";
import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Player from "./Player";
import Target from "./Target";
import Sparks from "./Sparks";

function Environment() {
  return (
    <group>
      {/* Sol */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#111" roughness={0.8} metalness={0.2} />
      </mesh>
      
      {/* Grille technique au sol */}
      <gridHelper args={[100, 100, "#333", "#222"]} position={[0, -0.99, 0]} />
      
      {/* Lumières */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
      <pointLight position={[0, 2, -5]} intensity={5} color="#ff4400" distance={10} />
      <pointLight position={[0, 5, 0]} intensity={2} color="#ffffff" distance={20} />
    </group>
  );
}

interface HitInfo {
  title: string;
  text: string;
}

export default function FPSScene({ setHitInfo }: { setHitInfo: React.Dispatch<React.SetStateAction<HitInfo | null>> }) {
  const [sparkEvents, setSparkEvents] = useState<{id: number, pos: THREE.Vector3}[]>([]);

  const addSparks = useCallback((pos: THREE.Vector3) => {
    const id = Date.now() + Math.random();
    setSparkEvents(prev => [...prev, { id, pos }]);
    setTimeout(() => {
      setSparkEvents(prev => prev.filter(e => e.id !== id));
    }, 1000); // Nettoie après 1 seconde
  }, []);

  return (
    <div id="canvas-container" className="w-full h-full absolute inset-0 bg-black cursor-crosshair">
      <Canvas shadows camera={{ fov: 75, position: [0, 0, 5] }}>
        <fog attach="fog" args={['#000', 5, 20]} />
        <Environment />
        <Player addSparks={addSparks} />
        
        {/* Cibles */}
        <Target 
          position={[-3, 0, -5]} 
          rotation={[0, 0.3, 0]} 
          id="left" 
          label="Profil" 
          info={{
            title: "Profil & Résumé",
            text: "Développeur créatif spécialisé en expériences immersives et interfaces 3D."
          }}
          setHitInfo={setHitInfo} 
        />
        
        <Target 
          position={[0, 0, -6]} 
          id="center" 
          label="Compétences" 
          info={{
            title: "Stack Technique",
            text: "Maîtrise de Next.js, Antigravity, Three.js et développement Full-Stack."
          }}
          setHitInfo={setHitInfo} 
        />

        <Target 
          position={[3, 0, -5]} 
          rotation={[0, -0.3, 0]} 
          id="right" 
          label="Contact" 
          info={{
            title: "Disponibilité",
            text: "Disponible pour de nouveaux projets. Contactez-moi pour collaborer."
          }}
          setHitInfo={setHitInfo} 
        />

        {/* Particules dynamiques */}
        {sparkEvents.map(e => <Sparks key={e.id} position={e.pos} />)}
      </Canvas>
    </div>
  );
}
