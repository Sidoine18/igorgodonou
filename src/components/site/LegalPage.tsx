import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { PageHero } from "./ui";

export type LegalSection = { title: string; paragraphs: string[] };
export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return <main><PageHero eyebrow="Informations légales" title={title} intro={intro} /><article className="container-ed max-w-4xl space-y-12 py-16">{sections.map((s, i) => <section key={s.title} className="border-t border-ink/20 pt-6"><p className="eyebrow text-terra">{String(i + 1).padStart(2, "0")}</p><h2 className="mt-3 text-2xl font-bold">{s.title}</h2>{s.paragraphs.map((p) => <p key={p} className="mt-4 leading-relaxed text-muted-foreground">{p}</p>)}</section>)}<p>Pour toute question : <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>.</p><nav aria-label="Informations légales" className="flex flex-wrap gap-5 border-t border-ink/20 pt-6 text-sm"><Link to="/confidentialite" className="underline">Confidentialité</Link><Link to="/mentions-legales" className="underline">Mentions légales</Link><Link to="/conditions-de-vente" className="underline">Conditions de vente</Link></nav></article></main>;
}