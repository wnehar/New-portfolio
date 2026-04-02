import type { Project } from "./components/ProjectsSection";

export const SITE = {
  name: "Portfolio Voitures",
  roleLine: "Location de voiture - expérience + propreté",
  heroTitleA: "Ton portfolio",
  heroTitleB: "voiture",
  heroTitleC: "avec des animations wahou.",
  heroSubtitle:
    "Une interface bright et dynamique centrée sur la route: hover ultra fluide, apparitions au scroll et une intégration directe de ton site.",
  embeddedSiteUrl: "https://wiloc-e7d716.webflow.io",
  heroImage: "/car-hero.jpg",
};

export const CONTACT = {
  email: "exemple@email.com",
  phoneE164: "+33000000000",
  whatsappE164: "",
  instagram: "",
};

export const PROJECTS: Project[] = [
  {
    title: "Stage - Actif Digital (2 semaines)",
    description:
      "Marketing Digital chez Actif Digital : montée en compétences rapide (comme un tachymètre qui grimpe).",
    stack: ["Marketing", "Digital", "Stage"],
    links: [],
    icon: "speed",
    imageSrc: "",
  },
  {
    title: "Boîte de location de voiture (premium)",
    description: "Projet phare : création complète d’un business de location premium.",
    stack: ["Business", "Premium", "Branding"],
    links: [],
    icon: "car",
    imageSrc: "",
  },
  {
    title: "BBD pour LVMH",
    description: "Gestion de base de données et analyse pour le secteur du luxe.",
    stack: ["Base de données", "Analyse", "Luxe"],
    links: [],
    icon: "db",
    imageSrc: "",
  },
  {
    title: "Hackathon Payfit",
    description: "Un sprint technique de haute intensité, orienté livrable rapide.",
    stack: ["Hackathon", "Sprint", "Tech"],
    links: [],
    icon: "bolt",
    imageSrc: "",
  },
];

