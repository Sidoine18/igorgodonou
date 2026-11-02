import { describe, expect, it, vi } from "vitest";
import { formSchema, submitForm, type FormValues } from "@/lib/forms";

const values: FormValues = { name: "Test du site", contact: "test@example.com", subject: "Vérification", message: "Vérification du formulaire", consent: true, kind: "message" };

describe("Web3Forms submissions", () => {
  it("submits messages to Web3Forms", async () => {
    const request = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true })));
    expect(await submitForm(values, request)).toEqual({ success: true });
    expect(request.mock.calls[0]?.[0]).toBe("https://api.web3forms.com/submit");
    const payload = JSON.parse(request.mock.calls[0]?.[1].body);
    expect(payload.type_demande).toBe("message");
    expect(payload.replyto).toBe("test@example.com");
  });
  it("includes the selected formation in registration requests", async () => {
    const request = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true })));
    await submitForm({ ...values, kind: "inscription", formation: "Formation de test" }, request);
    const payload = JSON.parse(request.mock.calls[0]?.[1].body);
    expect(payload.type_demande).toBe("inscription");
    expect(payload.formation).toBe("Formation de test");
  });
  it("does not confirm delivery when the provider rejects it", async () => {
    expect(await submitForm(values, vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: false }))))).toEqual({ success: false });
    expect(await submitForm(values, vi.fn().mockResolvedValue(new Response("Unavailable", { status: 503 })))).toEqual({ success: false });
  });
  it("requires consent and validates contact details before sending", () => {
    expect(formSchema.safeParse({ ...values, consent: false }).success).toBe(false);
    expect(formSchema.safeParse({ ...values, contact: "not-an-email" }).success).toBe(false);
    expect(formSchema.safeParse({ ...values, contact: "+229 01 69 31 70 65" }).success).toBe(true);
  });
});