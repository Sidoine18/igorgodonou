import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { PageHero, EmptyState } from "@/components/site/ui";

export const Route = createFileRoute("/realisations")({
  head: () => seo("Réalisations", "Les projets et réalisations documentés d'Igor Godonou."),
  component: Page,
});

function Page() {
  return (
    <main>
      <PageHero eyebrow="Réalisations" title="Des projets," accent="documentés." num="07" intro="Chaque projet présentera son contexte, son objectif, le rôle d'Igor, la démarche et un résultat vérifiable." />
      <section className="container-ed py-20">
        <EmptyState title="Études de cas en cours de rédaction" text="Aucun projet documenté n'est encore publié. Découvrez en attendant les activités d'Igor à travers ses ressources." cta={{ to: "/ressources", label: "Voir les ressources" }} />
      </section>
    </main>
  );
}
