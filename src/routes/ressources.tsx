import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { PageHero, Reveal, btn, Arrow } from "@/components/site/ui";

export const Route = createFileRoute("/ressources")({
  head: () => seo("Ressources", "Conseils, vidéos et publications d'Igor Godonou sur le business en ligne."),
  component: Page,
});

const SOURCES = [
  { k: "Vidéos", t: "TikTok", d: "Conseils courts et retours d'expérience sur le business en ligne.", href: SITE.tiktok },
  { k: "Publications", t: "Facebook", d: "Réflexions, actualités et partages autour de l'entrepreneuriat digital.", href: SITE.facebook },
];

function Page() {
  return (
    <main>
      <PageHero eyebrow="Ressources" title="Une bibliothèque" accent="qui grandit." num="06" intro="Les guides et contenus téléchargeables seront ajoutés ici dès leur publication. En attendant, retrouvez les contenus d'Igor sur ses réseaux." />
      <section className="container-ed grid gap-8 py-20 md:grid-cols-2">
        {SOURCES.map((s, i) => (
          <Reveal as="article" key={s.t} delay={i * 100} className={`group relative overflow-hidden border border-ink p-8 md:p-12 ${i ? "bg-ink text-ivory" : "bg-accent"}`}>
            <p className="eyebrow">{s.k}</p>
            <h2 className="mt-4 font-display text-5xl font-bold md:text-7xl">{s.t}</h2>
            <p className="mt-4 max-w-sm opacity-80">{s.d}</p>
            <a href={s.href} target="_blank" rel="noopener noreferrer" className={`${btn({ variant: i ? "accent" : "primary" })} mt-8`}>Voir sur {s.t} <Arrow /></a>
          </Reveal>
        ))}
      </section>
    </main>
  );
}
