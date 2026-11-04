import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { FORMATION_DETAILS } from "@/lib/formations";
import { formationVisuals } from "@/components/site/formationVisuals";
import { PageHero, Reveal, btn, Arrow } from "@/components/site/ui";

export const Route = createFileRoute("/formations/")({
  head: () => seo("Formations", "Le catalogue des formations d'Igor Godonou sur le business en ligne et les produits digitaux."),
  component: Page,
});

function Page() {
  return (
    <main>
      <PageHero eyebrow="Les quatre formations" title="Apprendre," accent="puis appliquer." num="04" intro="P2P, blockchain, produits digitaux ou création vidéo : choisissez le parcours adapté à votre projet, avec des prix visibles et des limites claires." />
      <section className="container-ed py-20">
          <ul className="grid gap-8 md:grid-cols-2">
            {FORMATION_DETAILS.map((f) => (
              <Reveal as="li" key={f.slug} className="flex min-w-0 flex-col border border-ink bg-card">
                <img src={formationVisuals[f.slug]?.image} alt={formationVisuals[f.slug]?.alt ?? ""} width={1536} height={1024} loading="lazy" className="aspect-[3/2] w-full object-cover" />
                <div className="flex flex-1 flex-col p-6 md:p-8"><p className="eyebrow text-terra">{formationVisuals[f.slug]?.category} · Débutants bienvenus</p>
                <h2 className="mt-3 text-2xl font-bold md:text-3xl">{f.title}</h2>
                <p className="mt-4 text-muted-foreground">{f.heroIntro}</p>
                <p className="mt-6 text-2xl font-bold">{f.price}</p><p className="mt-2 text-sm">{f.duration ?? (f.formules ? "Trois formules au choix" : "Modalités communiquées avant inscription")}</p>
                <Link to="/formations/$slug" params={{ slug: f.slug }} className={`${btn()} mt-6 whitespace-normal`}>Découvrir le programme <Arrow /></Link></div>
              </Reveal>
            ))}
          </ul>
        <p className="mt-10 max-w-3xl border-l-2 border-terra pl-4 text-sm text-muted-foreground">Aucun revenu n’est garanti. Les formations sont pédagogiques ; les cryptoactifs présentent un risque de perte en capital. Toute inscription est définitive après prise de contact et validation du paiement.</p>
      </section>
    </main>
  );
}
