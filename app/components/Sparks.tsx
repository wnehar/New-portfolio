"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Sparks({ position }: { position: THREE.Vector3 }) {
  const group = useRef<THREE.Group>(null);
  
  // Générer des étincelles avec des vitesses aléatoires
  const [particles] = useState(() => {
    return Array.from({ length: 12 }).map(() => ({
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        Math.random() * 5 + 2,
        (Math.random() - 0.5) * 8
      ),
      position: new THREE.Vector3(0, 0, 0),
      life: 1.0, 
    }));
  });

  useFrame((state, delta) => {
    if (!group.current) return;
    particles.forEach((p, i) => {
      p.life -= delta * 2; // Réduit la vie au fur et à mesure
      if (p.life > 0) {
        // Gravité
        p.velocity.y -= 15 * delta;
        p.position.addScaledVector(p.velocity, delta);
        
        const mesh = group.current!.children[i] as THREE.Mesh;
        mesh.position.copy(p.position);
        (mesh.material as THREE.MeshBasicMaterial).opacity = p.life;
        (mesh.material as THREE.MeshBasicMaterial).transparent = true;
        mesh.scale.setScalar(p.life);
      }
    });
  });

  return (
    <group position={position} ref={group}>
      {particles.map((_, i) => (
        <mesh key={i}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial color="#ffaa00" />
        </mesh>
      ))}
    </group>
  );
}
