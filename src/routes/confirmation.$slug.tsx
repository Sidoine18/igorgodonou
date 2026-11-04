import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { getFormation } from "@/lib/formations";
import { getRegistrationSummary, RECEIPT_KEY, validReceipt, type RegistrationReceipt } from "@/lib/registration";
import { SITE, waLink } from "@/lib/site";
import type { RegistrationValues } from "@/lib/registration";
import { seo } from "@/lib/seo";
import { Arrow, btn } from "@/components/site/ui";

export const Route = createFileRoute("/confirmation/$slug")({
  validateSearch: (search: Record<string, unknown>): { formule?: RegistrationValues["formule"]; sentAt?: number } => {
    const out: { formule?: RegistrationValues["formule"]; sentAt?: number } = {};
    if (typeof search["sentAt"] === "number") out.sentAt = search["sentAt"];
    if (search["formule"] === "autonome" || search["formule"] === "accompagnee" || search["formule"] === "partage-revenus") out.formule = search["formule"];
    return out;
  },
  loader: ({ params }) => { const f = getFormation(params.slug); if (!f) throw notFound(); return f; },
  head: ({ loaderData: f }) => ({ meta: [...seo(`Suivi de demande · ${f?.title ?? "Formation"}`, "Récapitulatif de la demande de formation et prochaines étapes avec Igor Godonou.").meta, { name: "robots", content: "noindex, nofollow" }] }),
  component: Page,
});
function Page() {
  const f = Route.useLoaderData();
  const search = Route.useSearch();
  const [receipt, setReceipt] = useState<RegistrationReceipt>();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let stored: unknown;
    try { stored = JSON.parse(sessionStorage.getItem(RECEIPT_KEY) ?? "null"); } catch { stored = undefined; }
    setReceipt(validReceipt(stored, f.slug) ?? validReceipt({ slug: f.slug, ...search }, f.slug)); setReady(true);
  }, [f.slug, search["sentAt"], search["formule"]]);
  const summary = receipt ? getRegistrationSummary(f.slug, receipt.formule) : undefined;
  return <main className="container-ed pt-32 pb-20 md:pt-44"><div className="max-w-3xl">
    {!ready ? <p role="status">Chargement du récapitulatif…</p> : summary ? <><CheckCircle2 className="h-12 w-12 text-terra" aria-hidden /><p className="eyebrow mt-6">Demande transmise</p><h1 className="display-lg mt-4">Merci pour votre <span className="serif-accent text-terra">confiance.</span></h1><p className="mt-6 text-lg">Votre demande a été envoyée via Web3Forms. Igor vous recontactera pour échanger sur vos objectifs, le calendrier et le paiement.</p><dl className="mt-10 space-y-5 border-y border-ink/20 py-8"><div><dt className="eyebrow">Formation</dt><dd className="mt-2 text-xl font-bold">{summary.title}</dd></div><div><dt className="eyebrow">Formule</dt><dd className="mt-2">{summary.formule}</dd></div><div><dt className="eyebrow">Tarif</dt><dd className="mt-2 text-2xl font-bold">{summary.amount}</dd></div>{summary.duration && <div><dt className="eyebrow">Durée</dt><dd className="mt-2">{summary.duration}</dd></div>}</dl><h2 className="mt-10 text-2xl font-bold">Et maintenant ?</h2><ol className="mt-5 list-inside list-decimal space-y-4"><li>Prise de contact et échange sur votre demande.</li><li>Communication du calendrier, des accès et des conditions détaillées.</li><li>Validation du paiement puis confirmation de l’inscription.</li></ol><p className="mt-6 border-l-2 border-terra pl-4 font-semibold">Aucun paiement n’a été effectué ici. Cette demande ne garantit ni une place ni des revenus.</p><a href={waLink(`Bonjour Igor, je viens d’envoyer une demande pour ${summary.title}, ${summary.formule}.`)} target="_blank" rel="noopener noreferrer" className={`${btn({ variant: "accent" })} mt-8`}>Poursuivre sur WhatsApp <Arrow /></a><a href={`mailto:${SITE.email}`} className="mt-5 block underline">{SITE.email}</a></> : <><p className="eyebrow">Suivi de demande</p><h1 className="display-lg mt-4">Aucune demande récente.</h1><p className="mt-6 text-muted-foreground">Aucun récapitulatif n’est disponible dans cet onglet. Si vous avez déjà envoyé votre demande, contactez Igor sans la renvoyer.</p><Link to="/inscription/$slug" params={{ slug: f.slug }} search={{ formule: undefined }} className={`${btn()} mt-8`}>Ouvrir le formulaire <Arrow /></Link></>}
    <Link to="/formations" className="mt-10 block text-sm underline">← Toutes les formations</Link>
  </div></main>;
}