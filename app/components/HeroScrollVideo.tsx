"use client";

import { useEffect, useRef } from "react";

export default function HeroScrollVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const durationRef = useRef(0);
  const targetProgressRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [showInfo, setShowInfo] = useState(false);
  const showInfoRef = useRef(false);

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

        // Display the info box if we pass 2 seconds
        const isPastThreshold = next >= 2;
        if (isPastThreshold !== showInfoRef.current) {
          showInfoRef.current = isPastThreshold;
          setShowInfo(isPastThreshold);
        }

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
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        src="/voiture-qui-roule.mp4"
        muted
        playsInline
        preload="auto"
      />

      {/* Info Card Overlay - Fades in passing 2 seconds */}
      <div 
        className={`absolute left-1/2 top-1/2 w-[90%] max-w-3xl rounded-3xl p-8 md:p-12 
          bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]
          transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col md:flex-row gap-8 md:gap-12 items-center
          ${showInfo ? 'opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2' : 'opacity-0 scale-95 -translate-x-1/2 -translate-y-[45%] pointer-events-none'}
        `}
      >
        {/* Profile Details */}
        <div className="w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden border border-white/20 flex-shrink-0 shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent z-10 pointer-events-none"></div>
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" 
            alt="Profile placeholder" 
            className="w-full h-full object-cover" 
          />
        </div>
        
        {/* Text Information */}
        <div className="flex flex-col text-center md:text-left gap-5 flex-1 relative z-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-2 text-white/90">
              <span className="font-semibold text-white">Ton</span> Prénom
            </h2>
            <div className="text-sm md:text-base text-white/60 font-medium tracking-[0.2em] uppercase">
              Développeur & Designer
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
            {/* Age/Date of birth */}
            <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors cursor-default rounded-full px-4 md:px-5 py-2 md:py-2.5 border border-white/5 shadow-inner backdrop-blur-md">
              <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm md:text-base text-white/90 font-medium">1 Janvier 2000</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors cursor-default rounded-full px-4 md:px-5 py-2 md:py-2.5 border border-white/5 shadow-inner backdrop-blur-md">
              <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm md:text-base text-white/90 font-medium">Paris, France</span>
            </div>
            
            {/* Contact */}
            <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors cursor-default rounded-full px-4 md:px-5 py-2 md:py-2.5 border border-white/5 shadow-inner backdrop-blur-md">
              <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm md:text-base text-white/90 font-medium">contact@portfolio.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

