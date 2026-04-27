"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HitInfo {
  title: string;
  text: string;
}

export default function UIOverlay({ hitInfo }: { hitInfo: HitInfo | null }) {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const handleLockChange = () => {
      setIsLocked(document.pointerLockElement === document.body);
    };
    document.addEventListener("pointerlockchange", handleLockChange);
    return () => document.removeEventListener("pointerlockchange", handleLockChange);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center font-sans tracking-wide">
      {/* Réticule (Crosshair) */}
      <div className={`relative flex items-center justify-center transition-opacity duration-300 ${isLocked ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white]"></div>
        <div className="absolute w-8 h-[2px] bg-white/50"></div>
        <div className="absolute h-8 w-[2px] bg-white/50"></div>
      </div>

      {/* Menu Principal / Lancement */}
      <AnimatePresence>
        {!isLocked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center pointer-events-auto cursor-pointer"
            onClick={() => document.body.requestPointerLock()}
          >
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-light text-white mb-4 tracking-[0.2em]">
                S T A N D   <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">D E   T I R</span>
              </h1>
              <div className="w-24 h-[1px] bg-white/20 mx-auto mb-8"></div>
              <p className="text-xl md:text-2xl text-white/80 uppercase tracking-widest font-light animate-pulse">
                Cliquez pour entrer
              </p>
              <p className="text-sm text-white/40 mt-12 tracking-wide">
                Utilisez votre souris pour viser et CLIQUEZ pour tirer sur les cibles.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fenêtre Modale d'Information (Glassmorphism) */}
      <AnimatePresence>
        {hitInfo && isLocked && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-xl p-8 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] text-white"
          >
            <h2 className="text-3xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 tracking-tight">
              {hitInfo.title}
            </h2>
            <p className="text-lg text-white/80 leading-relaxed font-light">
              {hitInfo.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
