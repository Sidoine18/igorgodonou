import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getFormation } from "@/lib/formations";
import type { RegistrationValues } from "@/lib/registration";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/ui";
import { RegistrationForm } from "@/components/site/RegistrationForm";

export const Route = createFileRoute("/inscription/$slug")({
  validateSearch: (search: Record<string, unknown>): { formule?: RegistrationValues["formule"]; sentAt?: number } => {
    const out: { formule?: RegistrationValues["formule"]; sentAt?: number } = {};
    if (search["formule"] === "autonome" || search["formule"] === "accompagnee" || search["formule"] === "partage-revenus") out.formule = search["formule"];
    return out;
  },
  loader: ({ params }) => { const f = getFormation(params.slug); if (!f) throw notFound(); return f; },
  head: ({ loaderData: f }) => ({ ...seo(f ? `Inscription · ${f.title}` : "Inscription introuvable", "Transmettre une demande d’inscription à Igor Godonou. Aucun paiement ni inscription définitive sur ce formulaire."), meta: [...seo(f ? `Inscription · ${f.title}` : "Inscription introuvable", "Transmettre une demande d’inscription à Igor Godonou. Aucun paiement ni inscription définitive sur ce formulaire.").meta, { name: "robots", content: "noindex" }] }),
  component: Page,
});
function Page() {
  const f = Route.useLoaderData();
  const { formule } = Route.useSearch();
  return <main><PageHero eyebrow="Demande d’inscription" title={f.title} intro="Une première étape pour échanger sur vos objectifs et les modalités de la formation. Votre inscription sera définitive après prise de contact et validation du paiement." /><section className="container-ed py-16"><div className="max-w-3xl"><Link to="/formations/$slug" params={{ slug: f.slug }} className="link-underline mb-10 inline-block text-sm">← Revoir le programme</Link><RegistrationForm key={f.slug} formation={f} initialFormule={f.formules ? formule : undefined} /></div></section></main>;
}