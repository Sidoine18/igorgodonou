import { z } from "zod";

// Web3Forms access keys are public, designed for browser submissions.
export const WEB3FORMS_ACCESS_KEY = "8ea95919-9ee7-43ab-8097-de1d22d38fa1";
const email = z.string().email();
export const formSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom (2 caractères minimum).").max(100),
  contact: z.string().trim().max(150).refine((value) => email.safeParse(value).success || /^\+?[\d\s().-]{7,25}$/.test(value) && value.replace(/\D/g, "").length >= 7, "Indiquez une adresse e-mail ou un numéro de téléphone valide."),
  subject: z.string().trim().min(3, "Précisez l’objet.").max(120),
  message: z.string().trim().min(10, "Votre message doit faire au moins 10 caractères.").max(1500),
  consent: z.literal(true, { errorMap: () => ({ message: "Votre accord est nécessaire pour envoyer la demande." }) }),
  kind: z.enum(["message", "inscription"]),
  formation: z.string().trim().max(120).optional(),
}).superRefine((data, ctx) => {
  if (data.kind === "inscription" && !data.formation) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["formation"], message: "Choisissez une formation." });
});
export type FormValues = z.infer<typeof formSchema>;

export async function submitForm(input: FormValues, request: typeof fetch = fetch) {
  const data = formSchema.parse(input);
  const response = await request("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      from_name: "Site Igor Godonou",
      subject: `${data.kind === "inscription" ? "Demande d’inscription" : "Message"} — ${data.subject}`,
      name: data.name,
      contact: data.contact,
      ...(email.safeParse(data.contact).success ? { email: data.contact, replyto: data.contact } : {}),
      message: data.message,
      type_demande: data.kind,
      ...(data.formation ? { formation: data.formation } : {}),
      consentement: "Accord pour être recontacté au sujet de cette demande",
      botcheck: false,
    }),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) return { success: false as const };
  const result: unknown = await response.json();
  return { success: z.object({ success: z.literal(true) }).safeParse(result).success };
}