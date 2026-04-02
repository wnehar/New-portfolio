import Reveal from "./Reveal";

export type Project = {
  title: string;
  description: string;
  stack: string[];
  links?: { label: string; href: string }[];
  imageSrc?: string;
  icon?: "speed" | "turbo" | "car" | "db" | "bolt";
};

function Icon({ name }: { name: NonNullable<Project["icon"]> }) {
  const base = "h-5 w-5";
  switch (name) {
    case "speed":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none" aria-hidden="true">
          <path
            d="M12 4a9 9 0 0 0-9 9v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1a9 9 0 0 0-9-9Z"
            stroke="currentColor"
            strokeWidth="1.8"
            opacity="0.9"
          />
          <path
            d="M12 12l4.6-2.6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M7.5 13.7h.01M16.5 13.7h.01M12 8.4h.01"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "turbo":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none" aria-hidden="true">
          <path
            d="M7 15a7 7 0 1 1 13-3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M7 15h7a3 3 0 0 0 0-6H9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M5.4 16.6 4 18m2.8-.3L6 20"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "car":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none" aria-hidden="true">
          <path
            d="M6.5 14.5h11l-1.2-4a3 3 0 0 0-2.9-2.1H10.6A3 3 0 0 0 7.7 10.5l-1.2 4Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M6 14.5v2a1.5 1.5 0 0 0 1.5 1.5h.5M18 14.5v2A1.5 1.5 0 0 1 16.5 18h-.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M8.5 18.2a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Zm7 0a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Z"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
      );
    case "db":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none" aria-hidden="true">
          <path
            d="M12 4c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M4 7v5c0 1.7 3.6 3 8 3s8-1.3 8-3V7"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M4 12v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
    case "bolt":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none" aria-hidden="true">
          <path
            d="M13 2 4 14h7l-1 8 10-13h-7l0-7Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projets" className="scroll-mt-24">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="text-sm font-semibold tracking-wide text-zinc-600">
            {projects.length} projets
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-zinc-900">
            Le Garage (mes projets)
          </h2>
        </div>
        <div className="text-sm text-zinc-600 max-w-md">
          Hover pour découvrir, et scroll pour déclencher les animations.
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, idx) => (
          <Reveal key={p.title} delayMs={idx * 80} className="h-full">
            <article className="h-full group rounded-2xl border border-black/5 bg-white/70 p-6 shadow-[0_10px_35px_-25px_rgba(0,0,0,0.35)] hover:shadow-[0_26px_70px_-40px_rgba(0,0,0,0.5)] transition-shadow duration-300">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2">
                    {p.icon ? (
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white">
                        <Icon name={p.icon} />
                      </span>
                    ) : null}
                    <h3 className="text-xl font-semibold text-zinc-900">{p.title}</h3>
                  </div>
                  <p className="mt-2 text-zinc-700 leading-relaxed">{p.description}</p>
                </div>
                {p.imageSrc ? (
                  <div className="hidden sm:block w-24 h-24 shrink-0 rounded-xl overflow-hidden border border-black/5 bg-white/60 group-hover:scale-[1.06] transition-transform duration-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.imageSrc} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ) : (
                  <div className="hidden sm:block w-24 h-24 shrink-0 rounded-xl border border-black/5 bg-gradient-to-br from-zinc-100 to-zinc-200" />
                )}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-semibold tracking-wide px-2.5 py-1 rounded-full bg-zinc-900 text-white/90 group-hover:bg-zinc-800 transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {(p.links ?? []).slice(0, 2).map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-white transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
                {(p.links?.length ?? 0) > 2 ? (
                  <span className="text-sm text-zinc-600 self-center">
                    +{(p.links?.length ?? 0) - 2} autres liens
                  </span>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

