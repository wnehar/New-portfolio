"use client";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";

export default function Player({ addSparks }: { addSparks: (pos: THREE.Vector3) => void }) {
  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());

  useEffect(() => {
    const handleMouseClick = () => {
      // Ne tirer que si le curseur est verrouillé
      if (document.pointerLockElement !== document.body) return;

      // Créer un rayon depuis le centre de la caméra
      raycaster.current.setFromCamera(new THREE.Vector2(0, 0), camera);
      
      const intersects = raycaster.current.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        const hit = intersects.find(i => i.object.userData?.isTarget);
        if (hit) {
          hit.object.userData.hit();
          addSparks(hit.point);
        }
      }
    };

    document.addEventListener("mousedown", handleMouseClick);
    return () => document.removeEventListener("mousedown", handleMouseClick);
  }, [camera, scene, addSparks]);

  return <PointerLockControls selector="#canvas-container" />;
}
