"use client";

import { useEffect, useRef } from "react";

export default function HeroScrollVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const durationRef = useRef(0);
  const targetProgressRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      durationRef.current = Number.isFinite(video.duration) ? video.duration : 0;
      video.currentTime = 0;
      currentTimeRef.current = 0;
      startLoop();
    };

    const updateTargetProgress = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      targetProgressRef.current = progress;
    };

    const tick = () => {
      const duration = durationRef.current;
      if (duration) {
        const targetTime = targetProgressRef.current * duration;
        const next = currentTimeRef.current + (targetTime - currentTimeRef.current) * 0.12;
        currentTimeRef.current = next;

        if (Math.abs(video.currentTime - next) > 0.008) {
          video.currentTime = next;
        }
      }
      rafRef.current = window.requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(tick);
      }
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    window.addEventListener("scroll", updateTargetProgress, { passive: true });
    window.addEventListener("resize", updateTargetProgress);
    updateTargetProgress();
    startLoop();

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      window.removeEventListener("scroll", updateTargetProgress);
      window.removeEventListener("resize", updateTargetProgress);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/voiture-qui-roule.mp4"
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-black/0" />
      <div className="absolute left-0 bottom-0 w-64 h-20 bg-black/95" />
    </div>
  );
}

