"use client";

import { useMemo, useState } from "react";

type EmbeddedSiteProps = {
  src: string;
  title: string;
};

export default function EmbeddedSite({ src, title }: EmbeddedSiteProps) {
  const [loaded, setLoaded] = useState(false);
  const isSelfEmbed = useMemo(() => {
    if (typeof window === "undefined") return false;
    try {
      const current = window.location.href;
      const target = new URL(src, current).href;
      return current === target;
    } catch {
      return false;
    }
  }, [src]);

  return (
    <div className="relative w-full rounded-2xl border border-black/5 bg-white/60 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] overflow-hidden">
      {!isSelfEmbed ? (
        <iframe
          src={src}
          title={title}
          className="w-full h-[70vh] min-h-[420px] max-h-[780px] border-0 bg-white"
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
        />
      ) : (
        <div className="w-full h-[70vh] min-h-[420px] max-h-[780px] bg-white" />
      )}

      {!loaded || isSelfEmbed ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/85 backdrop-blur-sm p-6">
          <div className="max-w-xl text-center">
            <div className="text-zinc-900 font-semibold">
              {isSelfEmbed ? "Intégration bloquée pour éviter une boucle" : "Chargement du site intégré…"}
            </div>
            <div className="mt-2 text-sm text-zinc-600">
              {isSelfEmbed
                ? "Tu as mis la même URL que le portfolio. Envoie l’URL de ton vrai site de location."
                : "Si l’intégration est bloquée (X-Frame-Options / CSP), utilise le lien ci-dessous."}
            </div>
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-3 text-white font-medium hover:bg-zinc-800 transition-colors"
            >
              Ouvrir le site dans un nouvel onglet
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

