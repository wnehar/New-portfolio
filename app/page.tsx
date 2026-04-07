import HeroScrollVideo from "./components/HeroScrollVideo";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#060606] text-white">
      <HeroScrollVideo />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060606]/85 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="text-sm font-black tracking-wider">
            <span>W</span>
            <span className="text-red-500">N</span>
          </div>
          <nav className="flex items-center gap-7 text-sm text-zinc-300">
            <a href="#experience" className="hover:text-white transition-colors">Expérience</a>
            <a href="#projets" className="hover:text-white transition-colors">Projets</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      <section className="relative min-h-[90vh] flex items-center justify-center text-center px-6">
        <div className="relative z-10">
          <p className="text-xs md:text-sm tracking-[0.45em] text-zinc-300">PORTFOLIO 2025</p>
          <h1 className="mt-5 text-6xl sm:text-7xl md:text-8xl font-black leading-[0.92] uppercase">
            William
            <span className="block text-red-500">Nehar</span>
          </h1>
          <p className="mt-6 text-zinc-300 text-lg max-w-3xl mx-auto">
            Étudiant à l&apos;Eugenia School - Expert Marketing Digital - Passionné d&apos;Automobile
          </p>
          <a
            href="#experience"
            className="mt-10 inline-flex rounded-xl bg-red-600 px-9 py-4 text-sm font-bold tracking-widest uppercase hover:bg-red-500 transition-colors"
          >
            Démarrer le moteur
          </a>
        </div>
      </section>

      <section id="experience" className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-red-500 text-xs tracking-[0.35em] text-center uppercase font-semibold">L&apos;accélération</p>
        <h2 className="mt-2 text-center text-5xl md:text-6xl font-black">Expérience</h2>

        <div className="mt-10 rounded-3xl border border-red-500/30 bg-zinc-950/85 backdrop-blur-[1px] p-7 md:p-9 shadow-[0_0_50px_-20px_rgba(239,68,68,0.85)]">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3 className="text-3xl font-bold">Actif Digital</h3>
              <p className="text-red-500 font-semibold mt-1">Marketing Digital</p>
            </div>
            <span className="text-zinc-400 text-sm">Stage · 2 semaines</span>
          </div>
          <p className="mt-5 text-zinc-300 leading-relaxed">
            Immersion complète en marketing digital : création de campagnes, analyse de performances, optimisation SEO
            et gestion des réseaux sociaux. Une montée en compétences à la vitesse d&apos;un 0 à 100.
          </p>

          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {[
              { k: "+45%", v: "Campagnes optimisées" },
              { k: "20+", v: "Contenus créés" },
              { k: "MAX", v: "Vitesse d'adaptation" },
            ].map((item) => (
              <div key={item.k} className="rounded-xl border border-white/10 bg-zinc-900 p-4">
                <div className="text-2xl font-black text-red-500">{item.k}</div>
                <div className="text-sm text-zinc-400">{item.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-7 grid md:grid-cols-2 gap-4">
            {[
              ["Marketing Digital", 90],
              ["Analyse de Données", 75],
              ["Stratégie de Contenu", 85],
              ["SEO & SEA", 70],
            ].map(([label, value]) => (
              <div key={label as string} className="rounded-xl border border-white/10 bg-zinc-950 p-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span>{label as string}</span>
                  <span className="text-red-500 font-semibold">{value as number}%</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${value as number}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projets" className="max-w-6xl mx-auto px-6 py-4 pb-20">
        <p className="text-red-500 text-xs tracking-[0.35em] text-center uppercase font-semibold">Le Garage</p>
        <h2 className="mt-2 text-center text-5xl md:text-6xl font-black">Mes Projets</h2>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {[
            {
              t: "Boîte de Location de Voiture",
              d: "Création complète d'un business de location premium. De la stratégie de marque au lancement, en passant par le positionnement luxe et la gestion opérationnelle.",
              badge: "PROJET PHARE",
            },
            {
              t: "WiLoc - Site de Location",
              d: "Site web de location de voitures ouvert au public. Les clients peuvent parcourir le catalogue, consulter les tarifs et réserver leur véhicule en ligne en toute simplicité.",
              badge: "SITE CLIENT",
              highlight: true,
            },
            {
              t: "BBD pour LVMH",
              d: "Gestion de base de données et analyse approfondie pour le secteur du luxe. Traitement de données clients et insights stratégiques pour l'un des plus grands groupes mondiaux.",
              badge: "DATA & LUXE",
            },
            {
              t: "Hackathon Payfit",
              d: "Un sprint technique de haute intensité. Développement d'une solution innovante en temps limité, démontrant capacité d'adaptation et esprit de compétition.",
              badge: "SPRINT TECHNIQUE",
            },
          ].map((p) => (
            <article
              key={p.t}
              className={`rounded-2xl border bg-zinc-950/85 backdrop-blur-[1px] p-6 transition-all hover:-translate-y-0.5 ${
                p.highlight
                  ? "border-red-500/40 shadow-[0_0_35px_-16px_rgba(239,68,68,0.85)]"
                  : "border-white/10"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-3xl font-bold leading-tight">{p.t}</h3>
                <span className="text-[10px] font-semibold tracking-widest text-red-500">{p.badge}</span>
              </div>
              <p className="mt-4 text-zinc-300 leading-relaxed">{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-center text-5xl md:text-6xl font-black">Contact</h2>

        <div className="mt-10 max-w-4xl mx-auto rounded-2xl border border-white/10 bg-zinc-950/85 backdrop-blur-[1px] p-8">
          <form className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-300">Nom</label>
                <input
                  placeholder="Votre nom"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-300">Email</label>
                <input
                  placeholder="votre@email.com"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:border-red-500"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-zinc-300">Message</label>
              <textarea
                rows={5}
                placeholder="Votre message..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:border-red-500"
              />
            </div>
            <button
              type="button"
              className="inline-flex rounded-xl bg-red-600 px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-red-500 transition-colors"
            >
              Envoyer
            </button>
          </form>
          <div className="mt-9 flex justify-center gap-3 text-zinc-400">
            {["in", "x", "ig", "mail"].map((s) => (
              <span
                key={s}
                className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 px-2 text-xs"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
