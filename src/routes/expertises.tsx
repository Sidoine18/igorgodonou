import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { EXPERTISES, waLink } from "@/lib/site";
import { PageHero, Reveal, btn, Arrow } from "@/components/site/ui";

export const Route = createFileRoute("/expertises")({
  head: () => seo("Expertises", "Les huit domaines d’Igor Godonou : e-commerce, business en ligne, cryptomonnaies, produits digitaux, coaching, formation, entrepreneuriat et ingénierie."),
  component: Page,
});

function Page() {
  return (
    <main>
      <PageHero eyebrow="Expertises" title="Huit domaines," accent="un même élan." num="08" intro="Du business en ligne à l’ingénierie : comprendre, construire et transmettre." />
      <div className="container-ed py-16">
        {EXPERTISES.map((e, i) => (
          <Reveal as="article" key={e.n} className={`grid gap-8 border-b border-ink py-14 md:grid-cols-12 md:py-20 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="md:col-span-4"><p className="giant-num" aria-hidden>{e.n}</p></div>
            <div className="md:col-span-8">
              <h2 className="text-4xl font-bold md:text-6xl">{e.title}</h2>
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{e.text}</p>
              {e.title === "Cryptomonnaies" && <p className="mt-4 max-w-2xl border-l-2 border-terra pl-4 text-sm text-muted-foreground">Les cryptomonnaies présentent un risque de perte en capital. Aucun rendement n’est garanti ; ces échanges ne constituent pas un conseil en investissement.</p>}
              <p className="eyebrow mt-8">Pour vous si vous voulez</p>
              <ul className="mt-4 flex flex-wrap gap-2">{e.needs.map((n) => <li key={n} className="rounded-full border border-ink px-4 py-2 text-sm">{n}</li>)}</ul>
              <a href={waLink(`Bonjour Igor, je souhaite échanger au sujet de : ${e.title}.`)} target="_blank" rel="noopener noreferrer" className={`${btn({ variant: i % 2 ? "outline" : "primary" })} mt-8`}>En parler <Arrow /></a>
            </div>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
