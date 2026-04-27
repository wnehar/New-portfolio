"use client";

import { useEffect, useRef } from "react";

export default function HeroScrollVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const durationRef = useRef(0);
  const targetProgressRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Silently prefetch the video into the browser HTTP cache.
    // This allows the video to show immediately via standard streaming,
    // but rapidly improves seek performance on Vercel as it downloads.
    fetch("/voiture-qui-roule.mp4", { priority: 'low' }).catch(() => {});
  }, []);

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
        // Smoothing multiplier
        const next = currentTimeRef.current + (targetTime - currentTimeRef.current) * 0.08;
        currentTimeRef.current = next;

        // Skip small updates to prevent network stuttering on Vercel
        // 0.08 matches approx 2-3 frames at 30fps
        if (Math.abs(video.currentTime - next) > 0.08) {
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

    // If already loaded metadata
    if (video.readyState >= 1) {
      onLoadedMetadata();
    }

    updateTargetProgress();

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      window.removeEventListener("scroll", updateTargetProgress);
      window.removeEventListener("resize", updateTargetProgress);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/voiture-qui-roule.mp4"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}

