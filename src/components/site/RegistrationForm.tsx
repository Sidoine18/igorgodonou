import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import type { FormationDetail } from "@/lib/formations";
import { FORMULES, RECEIPT_KEY, getRegistrationSummary, registrationSchema, submitRegistration, type RegistrationValues } from "@/lib/registration";
import { SITE } from "@/lib/site";
import { Arrow, SiteButton } from "./ui";

type Errors = Partial<Record<keyof RegistrationValues, string>>;
const field = "mt-2 w-full min-w-0 border-0 border-b border-ink bg-background py-3 text-base outline-none focus:border-terra";
function Field({ id, label, errors, children }: { id: keyof RegistrationValues; label: string; errors: Errors; children: ReactNode }) {
  return <div><label htmlFor={id} className="eyebrow">{label}</label>{children}{errors[id] && <p id={`${id}-err`} role="alert" className="mt-2 text-sm text-destructive">{errors[id]}</p>}</div>;
}

export function RegistrationForm({ formation: f, initialFormule }: { formation: FormationDetail; initialFormule?: RegistrationValues["formule"] }) {
  const navigate = useNavigate();
  const [formule, setFormule] = useState(initialFormule);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const busy = useRef(false);
  const started = useRef(Date.now());
  const summary = getRegistrationSummary(f.slug, formule);
  const aria = (id: keyof RegistrationValues) => ({ id, name: id, "aria-invalid": !!errors[id], "aria-describedby": errors[id] ? `${id}-err` : undefined });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const fd = new FormData(event.currentTarget);
    setStatus("idle");
    if (fd.get("website") || Date.now() - started.current < 2000) { setStatus("error"); return; }
    const parsed = registrationSchema.safeParse({ ...Object.fromEntries(fd), formation: f.title, formule,
      privacy: fd.get("privacy") === "on", terms: fd.get("terms") === "on",
      riskAck: f.riskNotice ? fd.get("riskAck") === "on" : undefined,
      revenueAck: formule === "partage-revenus" ? fd.get("revenueAck") === "on" : undefined,
    });
    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach((issue) => { next[issue.path[0] as keyof Errors] = issue.message; });
      setErrors(next); return;
    }
    setErrors({}); busy.current = true; setStatus("sending");
    try {
      const result = await submitRegistration(parsed.data);
      if (!result.success) { setStatus("error"); return; }
      const receipt = { slug: f.slug, formule, sentAt: Date.now() };
      try { sessionStorage.setItem(RECEIPT_KEY, JSON.stringify(receipt)); } catch { /* Navigate with receipt when tab storage is unavailable. */ }
      await navigate({ to: "/confirmation/$slug", params: { slug: f.slug }, search: { sentAt: receipt.sentAt, formule } });
    } catch { setStatus("error"); }
    finally { busy.current = false; }
  }

  const consent = (id: "riskAck" | "revenueAck" | "privacy" | "terms", text: ReactNode) => <div><label className="flex items-start gap-3 text-sm leading-relaxed"><input {...aria(id)} type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-ink" /><span>{text}</span></label>{errors[id] && <p id={`${id}-err`} role="alert" className="mt-2 text-sm text-destructive">{errors[id]}</p>}</div>;
  return <form onSubmit={onSubmit} noValidate aria-busy={status === "sending"} className="space-y-8">
    <div className="hidden" aria-hidden><label>Site web<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <fieldset disabled={status === "sending"} className="min-w-0 space-y-8">
      {f.formules && <Field id="formule" label="Votre formule" errors={errors}><select {...aria("formule")} className={field} value={formule ?? ""} onChange={(e) => { const selected = e.target.value; setFormule(selected === "autonome" || selected === "accompagnee" || selected === "partage-revenus" ? selected : undefined); setStatus("idle"); }}><option value="" disabled>Choisir une formule</option>{FORMULES.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}</select></Field>}
      {summary && <div className="border-y border-ink/20 py-5"><p className="eyebrow">{summary.formule}</p><p className="mt-2 text-2xl font-bold">{summary.amount}</p>{summary.duration && <p className="mt-2 text-sm">{summary.duration}</p>}<p className="mt-3 text-sm text-muted-foreground">Demande sans paiement en ligne. L’inscription devient définitive après prise de contact et validation du paiement.</p></div>}
      <div className="grid gap-8 sm:grid-cols-2"><Field id="name" label="Nom complet" errors={errors}><input {...aria("name")} className={field} autoComplete="name" required maxLength={100} /></Field><Field id="email" label="E-mail" errors={errors}><input {...aria("email")} type="email" className={field} autoComplete="email" required maxLength={255} /></Field><Field id="whatsapp" label="WhatsApp avec indicatif pays" errors={errors}><input {...aria("whatsapp")} type="tel" className={field} autoComplete="tel" required maxLength={25} /></Field><Field id="country" label="Pays de résidence" errors={errors}><input {...aria("country")} className={field} autoComplete="country-name" required maxLength={80} /></Field></div>
      <Field id="formation" label="Formation choisie" errors={errors}><input {...aria("formation")} className={field} value={f.title} readOnly /></Field>
      <Field id="level" label="Votre niveau" errors={errors}><select {...aria("level")} className={field} defaultValue="" required><option value="" disabled>Choisir un niveau</option><option value="debutant">Débutant</option><option value="intermediaire">Intermédiaire</option><option value="avance">Avancé</option></select></Field>
      <Field id="goal" label="Votre objectif principal" errors={errors}><textarea {...aria("goal")} className={`${field} resize-y`} rows={4} required maxLength={600} /></Field>
      <Field id="source" label="Comment avez-vous découvert la formation ?" errors={errors}><input {...aria("source")} className={field} required maxLength={120} /></Field>
      {f.riskNotice && consent("riskAck", "Je comprends que les cryptoactifs peuvent entraîner une perte partielle ou totale du capital et qu’aucun gain n’est garanti.")}
      {formule === "partage-revenus" && consent("revenueAck", "Je comprends le prix initial de 30 000 FCFA, plus 5 % des revenus pendant les trois premiers mois. Les conditions détaillées doivent m’être communiquées et être acceptées avant l’inscription définitive.")}
      {consent("privacy", <>J’accepte la <Link to="/confidentialite" className="underline">politique de confidentialité</Link> et la transmission de ma demande via Web3Forms.</>)}
      {consent("terms", <>J’ai lu les <Link to="/conditions-de-vente" className="underline">conditions de vente</Link> applicables à cette demande d’inscription.</>)}
      <SiteButton type="submit" disabled={status === "sending"} className="w-full whitespace-normal sm:w-auto">{status === "sending" ? "Envoi en cours…" : "Envoyer ma demande d’inscription"} <Arrow /></SiteButton>
    </fieldset>
    <div aria-live="polite">{status === "error" && <div className="border-l-4 border-destructive bg-destructive/10 p-4"><p>L’envoi n’a pas abouti. Vos informations sont conservées : réessayez ou contactez Igor.</p><a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex underline">Contacter Igor sur WhatsApp <Arrow /></a></div>}</div>
  </form>;
}