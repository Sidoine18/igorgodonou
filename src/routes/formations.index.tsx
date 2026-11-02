import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { FORMATIONS } from "@/lib/site";
import { PageHero, Reveal, EmptyState, btn, Arrow } from "@/components/site/ui";

export const Route = createFileRoute("/formations/")({
  head: () => seo("Formations", "Le catalogue des formations d'Igor Godonou sur le business en ligne et les produits digitaux."),
  component: Page,
});

function Page() {
  return (
    <main>
      <PageHero eyebrow="Formations" title="Apprendre," accent="puis appliquer." num="04" />
      <section className="container-ed py-20">
        {FORMATIONS.length === 0 ? (
          <EmptyState title="Catalogue en préparation" text="Aucune formation n'est encore publiée. Pour être informé des prochaines sessions, laissez un message." cta={{ to: "/contact", label: "Demander des informations" }} />
        ) : (
          <ul className="grid gap-8 md:grid-cols-2">
            {FORMATIONS.map((f) => (
              <Reveal as="li" key={f.slug} className="border border-ink bg-card p-8 transition-transform hover:-translate-y-1">
                <p className="eyebrow text-terra">{f.level} · {f.format}</p>
                <h2 className="mt-3 text-3xl font-bold">{f.title}</h2>
                <p className="mt-3 text-muted-foreground">{f.description}</p>
                <Link to="/formations/$slug" params={{ slug: f.slug }} className={`${btn()} mt-6`}>En savoir plus <Arrow /></Link>
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
