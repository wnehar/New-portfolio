import HeroScrollVideo from "./components/HeroScrollVideo";
import IntroLoader from "./components/IntroLoader";

export default function Home() {
  return (
    <main className="relative z-10 bg-black min-h-screen text-white">
      {/* L'écran d'introduction avec le logo BMW */}
      <IntroLoader />

      {/* La vidéo qui défile au scroll */}
      <HeroScrollVideo />

      {/* 
        Conteneur vide et transparent qui donne la hauteur de défilement.
        Plus on met une grande valeur (ex: h-[400vh]), plus la vidéo défilera lentement/précisément.
      */}
      <div className="h-[400vh] pointer-events-none" />
      
    </main>
  );
}
