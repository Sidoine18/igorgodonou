import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { ARTICLES } from "@/lib/site";
import { PageHero, EmptyState, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/blog/")({
  head: () => seo("Blog", "Articles d'Igor Godonou sur l'entrepreneuriat digital et le business en ligne."),
  component: Page,
});

function Page() {
  return (
    <main>
      <PageHero eyebrow="Blog" title="Notes," accent="idées & méthodes." num="10" />
      <section className="container-ed py-20">
        {ARTICLES.length === 0 ? (
          <EmptyState title="Premiers articles bientôt" text="Le blog est prêt à accueillir les premières publications." cta={{ to: "/ressources", label: "Voir les ressources" }} />
        ) : (
          <ul className="border-t border-ink">
            {ARTICLES.map((a) => (
              <Reveal as="li" key={a.slug} className="border-b border-ink">
                <Link to="/blog/$slug" params={{ slug: a.slug }} className="grid gap-2 py-8 hover:bg-accent md:grid-cols-[10rem_1fr] md:px-4">
                  <span className="eyebrow text-terra">{a.category} · <time dateTime={a.date}>{new Date(a.date).toLocaleDateString("fr-FR")}</time></span>
                  <span><span className="block font-display text-3xl font-bold">{a.title}</span><span className="mt-2 block text-muted-foreground">{a.excerpt}</span></span>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
