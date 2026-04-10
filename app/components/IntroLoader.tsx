"use client";

import { useState, useEffect } from "react";

export default function IntroLoader() {
  const [isClicked, setIsClicked] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Bloquer le scroll tant que l'intro n'est pas passée
    if (!isClicked) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0); // Revenir tout en haut
    } else {
      document.body.style.overflow = "";
      // Démonter le composant après la transition (1500ms)
      const timer = setTimeout(() => setIsHidden(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isClicked]);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] transition-opacity duration-[1500ms] ease-in-out
        ${isClicked ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div
        onClick={() => setIsClicked(true)}
        className="group relative flex flex-col items-center justify-center cursor-pointer"
      >
        <div
          className={`transition-all duration-[1500ms] ease-[cubic-bezier(0.87,0,0.13,1)]
            ${
              isClicked
                ? "scale-[3] opacity-0 blur-xl"
                : "scale-100 opacity-100 group-hover:scale-110 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            }`}
        >
          {/* Logo animé : on utilise le logo BMW officiel propre */}
          {/* Note : L'utilisateur pourra remplacer par son image en locale */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg"
            alt="BMW Logo"
            className="w-40 h-40 md:w-56 md:h-56"
          />
        </div>

        <div
          className={`absolute -bottom-24 text-white/30 text-xs md:text-sm tracking-[0.6em] uppercase whitespace-nowrap transition-all duration-700
            ${
              isClicked
                ? "opacity-0 translate-y-4"
                : "opacity-100 animate-pulse group-hover:text-white/70"
            }`}
        >
          Cliquer pour démarrer
        </div>
      </div>
    </div>
  );
}
