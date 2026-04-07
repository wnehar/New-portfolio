import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "William NEHAR",
  description: "Portfolio centré sur la location de voitures, avec animations et intégration du site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900">{children}</body>
    </html>
  );
}
