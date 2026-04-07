"use client";

import { useEffect, useRef } from "react";

export default function HeroScrollVideo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const durationRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const onLoadedMetadata = () => {
      durationRef.current = Number.isFinite(video.duration) ? video.duration : 0;
      video.currentTime = 0;
    };

    const updateByScroll = () => {
      if (rafRef.current !== null) return;

      rafRef.current = window.requestAnimationFrame(() => {
        const duration = durationRef.current;
        if (!duration) {
          rafRef.current = null;
          return;
        }

        const rect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const sectionHeight = section.offsetHeight;
        const scrollRange = Math.max(sectionHeight - window.innerHeight, 1);
        const raw = (window.scrollY - sectionTop) / scrollRange;
        const progress = Math.min(Math.max(raw, 0), 1);
        const targetTime = progress * duration;

        // Evite des seek inutiles pour garder un rendu plus fluide.
        if (Math.abs(video.currentTime - targetTime) > 0.016) {
          video.currentTime = targetTime;
        }

        rafRef.current = null;
      });
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    window.addEventListener("scroll", updateByScroll, { passive: true });
    window.addEventListener("resize", updateByScroll);
    updateByScroll();

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      window.removeEventListener("scroll", updateByScroll);
      window.removeEventListener("resize", updateByScroll);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[170vh] border-b border-white/10">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center text-center">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero-drive.mp4"
          muted
          playsInline
          preload="auto"
          poster="/hero-reference.png"
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 px-6">
          <p className="text-xs md:text-sm tracking-[0.45em] text-zinc-300">PORTFOLIO 2025</p>
          <h1 className="mt-5 text-6xl sm:text-7xl md:text-8xl font-black leading-[0.92] uppercase">
            William
            <span className="block text-red-500">Nehar</span>
          </h1>
          <p className="mt-6 text-zinc-300 text-lg max-w-3xl mx-auto">
            Etudiant a l&apos;Eugenia School - Expert Marketing Digital - Passionne d&apos;Automobile
          </p>
          <a
            href="#experience"
            className="mt-10 inline-flex rounded-xl bg-red-600 px-9 py-4 text-sm font-bold tracking-widest uppercase hover:bg-red-500 transition-colors"
          >
            Demarrer le moteur
          </a>
        </div>
      </div>
    </section>
  );
}

