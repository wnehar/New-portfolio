import Image from "next/image";

const sections = [
  { id: "hero", src: "/section-hero.png", alt: "Hero William Nehar" },
  { id: "experience", src: "/section-experience.png", alt: "Section Experience" },
  { id: "projets", src: "/section-projets.png", alt: "Section Projets" },
  { id: "contact", src: "/section-contact.png", alt: "Section Contact" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] py-2 md:py-4">
      <div className="max-w-[1024px] mx-auto space-y-2 md:space-y-4">
        {sections.map((section) => (
          <section
            id={section.id}
            key={section.id}
            className="relative overflow-hidden rounded-[14px] border border-zinc-800"
          >
            <Image
              src={section.src}
              alt={section.alt}
              width={1024}
              height={680}
              className="w-full h-auto block"
              priority={section.id === "hero"}
            />
          </section>
        ))}
      </div>
    </main>
  );
}
