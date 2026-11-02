import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { FORMATIONS, SITE } from "@/lib/site";
import { formSchema, submitForm, type FormValues } from "@/lib/forms";
import { Arrow, SiteButton } from "./ui";

type Errors = Partial<Record<keyof FormValues, string>>;
const field = "mt-2 w-full border-0 border-b border-ink bg-background py-3 text-lg outline-none transition-colors focus:border-terra focus-visible:shadow-none";

function FormField({ id, label, errors, children }: { id: keyof Errors; label: string; errors: Errors; children: ReactNode }) {
  return <div><label htmlFor={id} className="eyebrow">{label}</label>{children}{errors[id] && <p id={`${id}-err`} role="alert" className="mt-2 text-sm font-semibold text-destructive">{errors[id]}</p>}</div>;
}

export function RequestForm({ formation }: { formation?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [kind, setKind] = useState<FormValues["kind"]>(formation ? "inscription" : "message");
  const busy = useRef(false);
  const started = useRef(Date.now());

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const fd = new FormData(form);
    setStatus("idle");
    if (fd.get("website") || Date.now() - started.current < 2000) { setStatus("err"); return; }
    const parsed = formSchema.safeParse({ ...Object.fromEntries(fd), consent: fd.get("consent") === "on", kind, formation: formation ?? fd.get("formation") ?? undefined });
    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach((issue) => { next[issue.path[0] as keyof Errors] = issue.message; });
      setErrors(next);
      return;
    }
    if (kind === "inscription" && !FORMATIONS.some((item) => item.title === parsed.data.formation)) { setErrors({ formation: "Cette formation n’est pas disponible." }); return; }
    setErrors({});
    busy.current = true;
    setStatus("sending");
    try {
      const result = await submitForm(parsed.data);
      setStatus(result.success ? "ok" : "err");
      if (result.success) { form.reset(); started.current = Date.now(); }
    } catch { setStatus("err"); }
    finally { busy.current = false; }
  }

  const aria = (id: keyof Errors) => ({ id, name: id, "aria-invalid": !!errors[id], "aria-describedby": errors[id] ? `${id}-err` : undefined });

  return <form onSubmit={onSubmit} noValidate className="space-y-8" aria-busy={status === "sending"}>
    <div className="hidden" aria-hidden><label>Site web<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <fieldset disabled={status === "sending"} className="min-w-0 space-y-8">
      {!formation && FORMATIONS.length > 0 && <FormField id="kind" label="Votre demande" errors={errors}><select {...aria("kind")} value={kind} onChange={(event) => { setKind(event.target.value === "inscription" ? "inscription" : "message"); setStatus("idle"); setErrors({}); }} className={field}><option value="message">Message</option><option value="inscription">Inscription à une formation</option></select></FormField>}
      {kind === "inscription" && !formation && <FormField id="formation" label="Formation" errors={errors}><select {...aria("formation")} className={field} defaultValue=""><option value="" disabled>Choisir une formation</option>{FORMATIONS.map((item) => <option key={item.slug} value={item.title}>{item.title}</option>)}</select></FormField>}
      <div className="grid gap-8 sm:grid-cols-2">
        <FormField id="name" label="Nom" errors={errors}><input {...aria("name")} autoComplete="name" required className={field} maxLength={100} /></FormField>
        <FormField id="contact" label="E-mail ou téléphone" errors={errors}><input {...aria("contact")} required className={field} maxLength={150} /></FormField>
      </div>
      <FormField id="subject" label="Objet" errors={errors}><input {...aria("subject")} required defaultValue={formation ? `Inscription — ${formation}`.slice(0, 120) : ""} className={field} maxLength={120} /></FormField>
      <FormField id="message" label="Message" errors={errors}><textarea {...aria("message")} required rows={5} className={`${field} resize-y`} maxLength={1500} /></FormField>
      <div><label className="flex items-start gap-3 text-sm"><input {...aria("consent")} type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-ink" /><span>J’accepte que mes informations soient transmises via Web3Forms à Igor Godonou pour traiter ma demande et me recontacter.</span></label>{errors.consent && <p id="consent-err" role="alert" className="mt-2 text-sm text-destructive">{errors.consent}</p>}</div>
      <SiteButton type="submit" disabled={status === "sending"} className="w-full break-words disabled:cursor-wait disabled:opacity-60 sm:w-auto">{status === "sending" ? "Envoi en cours…" : kind === "inscription" ? "Envoyer ma demande" : "Envoyer le message"} <Arrow /></SiteButton>
    </fieldset>
    <div aria-live="polite" aria-atomic="true">
      {status === "ok" && <p className="border-l-4 border-accent bg-accent/30 p-4 font-semibold">{kind === "inscription" ? "Votre demande a été envoyée. L’inscription reste à confirmer par Igor." : "Votre message a été envoyé à Igor."}</p>}
      {status === "err" && <div className="border-l-4 border-destructive bg-destructive/10 p-4 font-semibold"><p>L’envoi n’a pas abouti. Vos informations sont conservées dans le formulaire : réessayez ou contactez Igor directement.</p><a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex underline">Contacter Igor sur WhatsApp <Arrow /></a></div>}
    </div>
  </form>;
}