"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Group } from "three";
import { Text } from "@react-three/drei";

interface Info {
  title: string;
  text: string;
}

interface TargetProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  id: string;
  label: string;
  info: Info;
  setHitInfo: React.Dispatch<React.SetStateAction<Info | null>>;
}

export default function Target({ position, rotation = [0, 0, 0], id, label, info, setHitInfo }: TargetProps) {
  const group = useRef<Group>(null);
  const [isHit, setIsHit] = useState(false);

  // Animation de bascule
  useFrame((state, delta) => {
    if (!group.current) return;
    const targetRotationX = isHit ? -Math.PI / 2 + 0.1 : 0;
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, targetRotationX, 10, delta);
  });

  const hit = () => {
    if (isHit) return;
    setIsHit(true);
    setHitInfo(info);
    
    // Auto reset après 3 secondes
    setTimeout(() => {
      setIsHit(false);
      // Supprime l'info de l'écran principal seulement si c'est encore la nôtre
      setHitInfo(prev => prev?.title === info.title ? null : prev);
    }, 3000);
  };

  return (
    <group position={position} rotation={rotation} name={`target-${id}`}>
      {/* Base du support */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[1, 0.2, 0.2]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.5} />
      </mesh>
      
      {/* Pivot de la cible */}
      <group ref={group} position={[0, -0.5, 0]}>
        {/* Panneau principal de la cible */}
        <mesh 
          position={[0, 0.5, 0]} 
          userData={{ isTarget: true, hit }}
        >
          <boxGeometry args={[1.5, 1, 0.1]} />
          <meshStandardMaterial color={isHit ? "#333" : "#ff3333"} metalness={0.3} roughness={0.4} />
        </mesh>
        
        {/* Texte imprimé sur la cible */}
        <Text 
          position={[0, 0.5, 0.06]} 
          fontSize={0.2} 
          color="white"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2"
        >
          {label}
        </Text>
      </group>
    </group>
  );
}
