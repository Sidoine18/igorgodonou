import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { FAQ } from "@/lib/site";
import { PageHero, EmptyState, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/faq")({
  head: () => seo("FAQ", "Questions fréquentes sur les activités et formations d'Igor Godonou."),
  component: Page,
});

function Page() {
  return (
    <main>
      <PageHero eyebrow="FAQ" title="Questions" accent="fréquentes." num="09" />
      <section className="container-ed max-w-4xl py-20">
        {FAQ.length === 0 ? (
          <EmptyState title="Réponses en cours de validation" text="Les questions fréquentes seront publiées une fois validées. Une question ? Écrivez directement." cta={{ to: "/contact", label: "Poser une question" }} />
        ) : (
          <div className="border-t border-ink">
            {FAQ.map((f) => (
              <Reveal key={f.q}><details className="group border-b border-ink py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold md:text-2xl">{f.q}<span className="transition-transform group-open:rotate-45" aria-hidden>+</span></summary>
                <p className="mt-4 text-muted-foreground">{f.a}</p>
              </details></Reveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
