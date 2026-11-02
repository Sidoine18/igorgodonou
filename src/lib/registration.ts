import { z } from "zod";
import { FORMATION_DETAILS } from "@/lib/formations";
import { WEB3FORMS_ACCESS_KEY } from "@/lib/forms";

const ECOMMERCE_SLUG = "ecommerce-produits-digitaux";
const TRADING_SLUG = "trading-p2p";

export const FORMULES = [
  { id: "autonome", label: "Formule Autonome — 25 000 FCFA" },
  { id: "accompagnee", label: "Formule Accompagnée — 50 000 FCFA" },
  { id: "partage-revenus", label: "Accompagnement avec partage de revenus — 30 000 FCFA + 5 % des revenus (3 premiers mois)" },
] as const;

const phoneRegex = /^\+?[0-9][\d\s().-]{6,24}$/;

export const registrationSchema = z
  .object({
    name: z.string().trim().min(2, "Indiquez votre nom complet (2 caractères minimum).").max(100),
    email: z.string().trim().email("Indiquez une adresse e-mail valide.").max(255),
    whatsapp: z
      .string()
      .trim()
      .regex(phoneRegex, "Indiquez un numéro WhatsApp valide, avec l'indicatif pays (ex. +229 …).")
      .max(25)
      .refine((value) => value.replace(/\D/g, "").length >= 7, "Indiquez un numéro WhatsApp complet."),
    country: z.string().trim().min(2, "Indiquez votre pays de résidence.").max(80),
    formation: z.string().trim().min(1).max(120),
    level: z.enum(["debutant", "intermediaire", "avance"], {
      errorMap: () => ({ message: "Choisissez votre niveau d'expérience." }),
    }),
    goal: z.string().trim().min(10, "Décrivez votre objectif principal (10 caractères minimum).").max(600),
    source: z.string().trim().min(2, "Indiquez comment vous avez découvert la formation.").max(120),
    formule: z.enum(["autonome", "accompagnee", "partage-revenus"]).optional(),
    riskAck: z.literal(true, { errorMap: () => ({ message: "Vous devez confirmer avoir compris les risques." }) }).optional(),
    revenueAck: z.literal(true, { errorMap: () => ({ message: "Votre accord sur le principe du partage de revenus est nécessaire." }) }).optional(),
    privacy: z.literal(true, { errorMap: () => ({ message: "L'acceptation de la politique de confidentialité est requise." }) }),
    terms: z.literal(true, { errorMap: () => ({ message: "L'acceptation des conditions de vente est requise." }) }),
  })
  .superRefine((data, ctx) => {
    const detail = FORMATION_DETAILS.find((f) => f.title === data.formation);
    if (!detail) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["formation"], message: "Formation inconnue." });
      return;
    }
    if (detail.slug === ECOMMERCE_SLUG && !data.formule) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["formule"], message: "Choisissez une formule." });
    }
    if (detail.slug === TRADING_SLUG && data.riskAck !== true) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["riskAck"], message: "Vous devez confirmer avoir compris les risques." });
    }
    if (detail.slug === ECOMMERCE_SLUG && data.formule === "partage-revenus" && data.revenueAck !== true) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["revenueAck"], message: "Confirmez avoir compris le partage de revenus et la nécessité d'accepter les conditions détaillées avant l'inscription définitive." });
    }
    if (detail.slug !== ECOMMERCE_SLUG && data.formule) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["formule"], message: "Cette formation ne comporte pas de choix de formule." });
    }
  });

export type RegistrationValues = z.infer<typeof registrationSchema>;

export const LEVEL_LABELS: Record<RegistrationValues["level"], string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
};

export async function submitRegistration(input: RegistrationValues, request: typeof fetch = fetch) {
  const data = registrationSchema.parse(input);
  const detail = FORMATION_DETAILS.find((f) => f.title === data.formation);
  const formuleLabel = data.formule ? FORMULES.find((f) => f.id === data.formule)?.label : undefined;
  const response = await request("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      from_name: "Site Igor Godonou",
      subject: `Inscription — ${data.formation}${formuleLabel ? ` (${formuleLabel})` : ""}`,
      name: data.name,
      email: data.email,
      replyto: data.email,
      whatsapp: data.whatsapp,
      pays: data.country,
      formation: data.formation,
       prix: getRegistrationSummary(detail?.slug ?? "", data.formule)?.amount ?? "",
      ...(formuleLabel ? { formule: formuleLabel } : {}),
      niveau: LEVEL_LABELS[data.level],
      objectif: data.goal,
      decouverte: data.source,
      ...(detail?.slug === TRADING_SLUG ? { comprehension_risques: "Confirmée par l'inscrit" } : {}),
      ...(data.formule === "partage-revenus" ? { partage_revenus: "Principe compris : 5 % des revenus pendant les 3 premiers mois ; conditions détaillées à consulter et accepter avant inscription définitive" } : {}),
      consentements: "Politique de confidentialité et conditions de vente acceptées",
      botcheck: false,
    }),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) return { success: false as const };
  const result: unknown = await response.json();
  return { success: z.object({ success: z.literal(true) }).safeParse(result).success };
}

export function getRegistrationSummary(slug: string, formule?: RegistrationValues["formule"]) {
  const formation = FORMATION_DETAILS.find((f) => f.slug === slug);
  if (!formation) return undefined;
  const selected = formation.formules?.find((f) => f.id === formule);
  if (formation.formules && !selected) return undefined;
  return {
    title: formation.title,
    formule: selected?.name ?? "Formation complète",
    amount: selected ? `${selected.price}${selected.id === "partage-revenus" ? " + 5 % des revenus (3 premiers mois)" : ""}` : formation.price,
    duration: selected?.duration ?? formation.duration,
  };
}

// A short-lived, tab-scoped receipt contains no identity or contact details.
export const receiptSchema = z.object({
  slug: z.string(), formule: z.enum(["autonome", "accompagnee", "partage-revenus"]).optional(),
  sentAt: z.number(),
});
export type RegistrationReceipt = z.infer<typeof receiptSchema>;
export const RECEIPT_KEY = "igor-formation-receipt";
export function validReceipt(value: unknown, slug: string, now = Date.now()) {
  const parsed = receiptSchema.safeParse(value);
  if (!parsed.success || parsed.data.slug !== slug || parsed.data.sentAt > now || now - parsed.data.sentAt > 24 * 60 * 60 * 1000) return undefined;
  return getRegistrationSummary(slug, parsed.data.formule) ? parsed.data : undefined;
}
