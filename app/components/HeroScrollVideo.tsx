"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroScrollVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const durationRef = useRef(0);
  const targetProgressRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load the video entirely into memory as a Blob.
  // This prevents the browser from sending thousands of HTTP "206 Partial Content" 
  // range requests to Vercel when scrolling rapidly, which causes massive lag.
  useEffect(() => {
    fetch("/voiture-qui-roule.mp4")
      .then((res) => res.blob())
      .then((blob) => {
        const objectUrl = URL.createObjectURL(blob);
        setVideoSrc(objectUrl);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to fetch video blob:", err);
        // Fallback to direct URL if blob loading fails
        setVideoSrc("/voiture-qui-roule.mp4");
        setIsLoaded(true);
      });

    // Cleanup: revoke object URL to free memory when component unmounts
    return () => {
      setVideoSrc((currentSrc) => {
        if (currentSrc && currentSrc.startsWith("blob:")) {
          URL.revokeObjectURL(currentSrc);
        }
        return null;
      });
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

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

        // Skip small updates to prevent stuttering
        if (Math.abs(video.currentTime - next) > 0.04) {
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
    
    // Sometimes 'loadedmetadata' fires before the event listener is attached
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
  }, [videoSrc]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {videoSrc && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={videoSrc}
            muted
            playsInline
            preload="auto"
          />
        )}
      </div>
    </div>
  );
}

