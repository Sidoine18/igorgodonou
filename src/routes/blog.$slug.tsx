import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { ARTICLES, SITE } from "@/lib/site";
import { PageHero } from "@/components/site/ui";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const a = ARTICLES.find((x) => x.slug === params.slug);
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData }) => loaderData ? seo(loaderData.title, loaderData.excerpt, "article") : { meta: [...seo("Article introuvable", "Cet article d’Igor Godonou n’est pas disponible.").meta, { name: "robots", content: "noindex" }] },
  component: Page,
});

function Page() {
  const a = Route.useLoaderData();
  const share = `${SITE.url}/blog/${encodeURIComponent(a.slug)}`;
  return (
    <main>
      <PageHero eyebrow={`${a.category} · ${new Date(a.date).toLocaleDateString("fr-FR")}`} title={a.title} intro={a.excerpt} />
      <article className="container-ed max-w-3xl space-y-6 py-16 text-lg leading-relaxed">
        {a.body.map((p, i) => <p key={i}>{p}</p>)}
        <div className="flex gap-5 border-t border-ink pt-6 text-sm font-bold uppercase tracking-widest">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(share)}`} target="_blank" rel="noopener noreferrer">Partager sur Facebook</a>
          <a href={`https://wa.me/?text=${encodeURIComponent(share)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
        <Link to="/blog" className="link-underline text-sm">← Tous les articles</Link>
      </article>
    </main>
  );
}
