import { describe, expect, it } from "vitest";
import { EXPERTISES, SITE, TIMELINE } from "@/lib/site";

describe("Confirmed information", () => {
  it("uses the domain chosen by Igor", () => {
    expect(SITE.url).toBe("https://igorgodonou.com");
  });
  it("retains Igor’s school, specialty and student status", () => {
    expect(SITE.education).toBe("Élève ingénieur en Génie Chimique et Procédés à l’École Polytechnique d’Abomey-Calavi");
    expect(TIMELINE.some((s) => s.title.includes("EPAC") && s.period === "Depuis 2023")).toBe(true);
  });

  it("traces the confirmed journey from Zoungamè to coaching, without placeholders", () => {
    expect(TIMELINE[0]).toMatchObject({ period: "2006", title: "Zoungamè, vallée de l’Ouémé" });
    expect(TIMELINE.some((s) => s.period === "2023" && s.title.includes("Baccalauréat série C"))).toBe(true);
    expect(TIMELINE.some((s) => s.title === "Trading P2P" && s.text.includes("2,22 BTC"))).toBe(true);
    expect(TIMELINE.at(-1)?.title).toBe("Coach & formateur");
    expect(TIMELINE.every((s) => !/confirmer|préciser|provisoire/i.test(`${s.title} ${s.text}`))).toBe(true);
  });

  it("lists exactly the eight domains provided by Igor", () => {
    expect(EXPERTISES.map((item) => item.title)).toEqual([
      "E-commerce", "Business en ligne", "Cryptomonnaies", "Produits digitaux",
      "Coaching", "Formation", "Entrepreneuriat", "Ingénierie",
    ]);
  });
});