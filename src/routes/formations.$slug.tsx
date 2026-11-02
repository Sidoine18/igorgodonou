import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { FORMATIONS } from "@/lib/site";
import { PageHero } from "@/components/site/ui";
import { RequestForm } from "@/components/site/RequestForm";

export const Route = createFileRoute("/formations/$slug")({
  loader: ({ params }) => {
    const f = FORMATIONS.find((x) => x.slug === params.slug);
    if (!f) throw notFound();
    return f;
  },
  head: ({ loaderData }) => loaderData ? seo(loaderData.title, loaderData.description) : { meta: [...seo("Formation introuvable", "Cette formation d’Igor Godonou n’est pas disponible.").meta, { name: "robots", content: "noindex" }] },
  component: Page,
});

function Page() {
  const f = Route.useLoaderData();
  return (
    <main>
      <PageHero eyebrow={`${f.level} · ${f.format}`} title={f.title} intro={f.description} />
      <section className="container-ed grid gap-10 py-20 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 className="text-3xl font-bold">Objectifs</h2>
          <ul className="mt-6 space-y-3">{f.goals.map((g) => <li key={g} className="border-t border-ink pt-3">{g}</li>)}</ul>
        </div>
        <aside className="space-y-3 border border-ink bg-card p-8 md:col-span-4 md:col-start-9">
          {f.duration && <p><strong>Durée :</strong> {f.duration}</p>}
          {f.price && <p><strong>Prix :</strong> {f.price}</p>}
          <a href="#inscription" className="link-underline block font-semibold">Demander une inscription →</a>
          <Link to="/formations" className="link-underline block text-sm">← Toutes les formations</Link>
        </aside>
      </section>
      <section id="inscription" className="container-ed scroll-mt-24 border-t border-ink/15 py-16">
        <div className="max-w-3xl"><h2 className="mb-10 text-3xl font-bold">Demande d’inscription</h2><RequestForm formation={f.title} /></div>
      </section>
    </main>
  );
}
