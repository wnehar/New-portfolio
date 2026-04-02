"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ParallaxBackdropProps = {
  imageSrc?: string;
};

export default function ParallaxBackdrop({ imageSrc }: ParallaxBackdropProps) {
  const [y, setY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const scrollY = window.scrollY || 0;
        // Limite la translation pour éviter des effets trop “agressifs”
        setY(Math.min(scrollY, 520));
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const translate = y * 0.12;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Overlay pour garder un rendu “bright” */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/95" />

      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
          style={{ transform: `translate3d(0, ${translate}px, 0) scale(1.06)` }}
        />
      ) : null}
    </div>
  );
}

