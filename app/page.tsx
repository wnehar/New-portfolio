"use client";
import { useState } from "react";
import FPSScene from "./components/FPSScene";
import UIOverlay from "./components/UIOverlay";

interface HitInfo {
  title: string;
  text: string;
}

export default function Home() {
  const [hitInfo, setHitInfo] = useState<HitInfo | null>(null);

  return (
    <main className="w-screen h-screen overflow-hidden bg-black relative">
      <UIOverlay hitInfo={hitInfo} />
      <FPSScene setHitInfo={setHitInfo} />
    </main>
  );
}
