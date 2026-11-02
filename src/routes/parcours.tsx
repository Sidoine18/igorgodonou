import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { TIMELINE } from "@/lib/site";
import { PageHero, Reveal, btn, Arrow } from "@/components/site/ui";

export const Route = createFileRoute("/parcours")({
  head: () => seo("Parcours", "Formation, étapes entrepreneuriales et projets d'Igor Godonou."),
  component: Page,
});

function Page() {
  return (
    <main>
      <PageHero eyebrow="Parcours" title="De Zoungamè aux ambitions d'un" accent="jeune bâtisseur." num="03" intro="Des eaux de la vallée de l’Ouémé aux bancs de l’EPAC, des pertes aux premières réussites en ligne : un parcours fait d’études, de rebonds et de transmission." />
      <section className="container-ed py-20 md:py-28">
        <ol className="relative ml-3 border-l border-ink md:ml-0 md:border-none">
          <span className="absolute left-1/2 top-0 hidden h-full w-px bg-ink md:block" aria-hidden />
          {TIMELINE.map((s, i) => (
            <Reveal as="li" key={i} className={`relative mb-16 pl-8 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"}`}>
              <span className={`absolute top-2 h-4 w-4 rotate-45 border border-ink bg-accent -left-[9px] ${i % 2 ? "md:-left-2" : "md:-right-2 md:left-auto"}`} aria-hidden />
              <p className="eyebrow text-terra">{s.kind}{s.period ? ` · ${s.period}` : ""}</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </ol>
        <div className="text-center"><Link to="/expertises" className={btn()}>Découvrir les expertises <Arrow /></Link></div>
      </section>
    </main>
  );
}
