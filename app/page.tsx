import EmbeddedSite from "./components/EmbeddedSite";
import ParallaxBackdrop from "./components/ParallaxBackdrop";
import ProjectsSection from "./components/ProjectsSection";
import Reveal from "./components/Reveal";
import { CONTACT, PROJECTS, SITE } from "./content";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white font-bold shadow-[0_8px_25px_-15px_rgba(0,0,0,0.8)]">
              GT
            </span>
            <span className="font-semibold text-zinc-900">{SITE.name}</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-zinc-700">
            <a className="hover:text-zinc-900 transition-colors" href="#apropos">
              À propos
            </a>
            <a className="hover:text-zinc-900 transition-colors" href="#projets">
              Projets
            </a>
            <a className="hover:text-zinc-900 transition-colors" href="#integrer">
              Mon site
            </a>
            <a className="hover:text-zinc-900 transition-colors" href="#contact">
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors"
          >
            Me contacter
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <ParallaxBackdrop imageSrc={SITE.heroImage} />
        <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.7),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.55),transparent_40%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <Reveal>
                <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Passion auto + location premium
                </p>
              </Reveal>

              <Reveal delayMs={80}>
                <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight text-zinc-900 leading-[1.02]">
                  Un portfolio
                  <span className="block bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
                    100% passion automobile
                  </span>
                </h1>
              </Reveal>

              <Reveal delayMs={140} className="mt-4">
                <p className="text-lg md:text-xl leading-relaxed text-zinc-700">
                  Design inspire cockpit, vocabulaire route/piste, univers premium: ici, on sent immediatement
                  l&apos;amour des voitures.
                </p>
              </Reveal>

              <Reveal delayMs={170} className="mt-5">
                <div className="flex flex-wrap gap-2">
                  {["Cockpit UI", "Esprit GT", "Location Premium", "Motion Design"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-bold tracking-wide text-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Reveal delayMs={180}>
                  <a
                    href="#projets"
                    className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-6 py-3 text-white font-semibold hover:bg-zinc-800 transition-colors"
                  >
                    Découvrir mes projets
                  </a>
                </Reveal>
                <Reveal delayMs={240}>
                  <a
                    href="#integrer"
                    className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/70 px-6 py-3 text-zinc-900 font-semibold hover:bg-white transition-colors"
                  >
                    Voir l’intégration du site
                  </a>
                </Reveal>
              </div>
            </div>

            <div className="w-full lg:max-w-lg">
              <Reveal
                delayMs={120}
                className="rounded-3xl border border-black/5 bg-white/75 p-5 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)]"
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { k: "0 a 100", v: "Execution rapide des projets" },
                    { k: "Vibe", v: "Univers auto marque" },
                    { k: "Drive", v: "Parcours fluide et dynamique" },
                    { k: "Garage", v: "Projets presentes en mode atelier" },
                  ].map((item) => (
                    <div
                      key={item.k}
                      className="rounded-2xl border border-black/5 bg-white/80 p-4 hover:shadow-[0_18px_60px_-40px_rgba(0,0,0,0.5)] transition-shadow"
                    >
                      <div className="text-sm font-black text-zinc-900">{item.k}</div>
                      <div className="mt-1 text-sm text-zinc-700">{item.v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl bg-zinc-900 p-4 text-white">
                  <div className="text-sm font-semibold">Signature automobile</div>
                  <div className="mt-1 text-sm text-white/80">
                    Stage, business location premium, data luxe, hackathon: chaque section raconte ton ADN
                    automobile.
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* À PROPOS */}
      <section id="apropos" className="scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5">
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">Pourquoi un portfolio “voiture” ?</h2>
              </Reveal>
              <Reveal delayMs={80} className="mt-4">
                <p className="text-zinc-700 leading-relaxed">
                  Parce que tu es dans la location: tu peux raconter ton expérience, mettre tes projets en
                  valeur et diriger directement vers ton activité.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Propreté", desc: "Une image soignée, comme dans ta flotte." },
                  { title: "Confiance", desc: "Un design clair: parcours simple et CTA net." },
                  { title: "Rapidité", desc: "Cartes reactives + apparitions fluides." },
                  { title: "Dynamique", desc: "Hover, parallax léger et effets au scroll." },
                ].map((s, i) => (
                  <Reveal key={s.title} delayMs={i * 90}>
                    <div className="rounded-2xl border border-black/5 bg-white/70 p-6 hover:shadow-[0_26px_70px_-40px_rgba(0,0,0,0.45)] transition-all">
                      <div className="text-sm font-semibold tracking-wide text-zinc-600">0{i + 1}</div>
                      <div className="mt-2 text-lg font-bold text-zinc-900">{s.title}</div>
                      <div className="mt-2 text-sm text-zinc-700 leading-relaxed">{s.desc}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJETS */}
      <div className="bg-gradient-to-b from-zinc-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
          <ProjectsSection projects={PROJECTS} />
        </div>
      </div>

      {/* INTEGRATION DU SITE */}
      <section id="integrer" className="scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
          <Reveal>
            <div className="flex items-end justify-between gap-8 flex-wrap">
              <div>
                <p className="text-sm font-semibold tracking-wide text-zinc-600">Intégration directe</p>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-zinc-900">
                  Ton site de location dans le portfolio
                </h2>
              </div>
              <div className="text-sm text-zinc-600 max-w-lg">
                L’affichage dépend des règles de sécurité du site externe (iframe peut être bloquée). Dans ce
                cas, un lien “ouvrir le site” s’affichera.
              </div>
            </div>
          </Reveal>

          <div className="mt-10">
            <Reveal delayMs={80}>
              <EmbeddedSite
                title="Site de location intégré"
                src={SITE.embeddedSiteUrl}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5">
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">Contact</h2>
              </Reveal>
              <Reveal delayMs={90} className="mt-4">
                <p className="text-zinc-700 leading-relaxed">
                  Ajoute tes infos ici (mail, téléphone, WhatsApp). On pourra aussi ajouter un formulaire si tu
                  veux.
                </p>
              </Reveal>

              <div className="mt-6 flex flex-col gap-3">
                <Reveal delayMs={140}>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/70 px-6 py-3 text-zinc-900 font-semibold hover:bg-white transition-colors"
                  >
                    {CONTACT.email}
                  </a>
                </Reveal>
                <Reveal delayMs={200}>
                  <a
                    href={`tel:${CONTACT.phoneE164}`}
                    className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-6 py-3 text-white font-semibold hover:bg-zinc-800 transition-colors"
                  >
                    {CONTACT.phoneE164}
                  </a>
                </Reveal>
              </div>
            </div>

            <div className="md:col-span-7">
              <Reveal delayMs={100}>
                <div className="rounded-3xl border border-black/5 bg-white/70 p-6 md:p-8 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)]">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="text-sm font-semibold tracking-wide text-zinc-600">Disponible</div>
                      <div className="mt-2 text-2xl font-bold text-zinc-900">Réservation rapide</div>
                      <div className="mt-2 text-sm text-zinc-700 leading-relaxed">
                        Clique sur un des liens, ou remplace les coordonnées pour que ça marche direct.
                      </div>
                    </div>
                    <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3">
                      <div className="text-xs font-semibold text-emerald-800">Statut</div>
                      <div className="mt-1 text-sm font-bold text-emerald-900">Ouvert</div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { t: "Villes", v: "À préciser" },
                      { t: "Paiement", v: "À préciser" },
                      { t: "Délais", v: "À préciser" },
                    ].map((x) => (
                      <div
                        key={x.t}
                        className="rounded-2xl bg-white/70 border border-black/5 p-4 hover:shadow-[0_18px_60px_-40px_rgba(0,0,0,0.5)] transition-shadow"
                      >
                        <div className="text-xs font-semibold tracking-wide text-zinc-600">{x.t}</div>
                        <div className="mt-1 text-sm font-bold text-zinc-900">{x.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-zinc-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} {SITE.name}. Tous droits réservés.</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-zinc-900 transition-colors" href="#contact">
              Contact
            </a>
            <a className="hover:text-zinc-900 transition-colors" href="#projets">
              Projets
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
