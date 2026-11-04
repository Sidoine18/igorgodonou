import { createFileRoute } from "@tanstack/react-router";
import { FORMATIONS, SITE } from "@/lib/site";

const PATHS = ["/", "/a-propos", "/parcours", "/expertises", "/formations", "/contact", "/faq", "/confidentialite", "/mentions-legales", "/conditions-de-vente"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const origin = SITE.url;
        const all = [...PATHS, ...FORMATIONS.map((f) => `/formations/${f.slug}`)];
        const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${all.map((p) => `<url><loc>${origin}${p}</loc></url>`).join("")}</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
