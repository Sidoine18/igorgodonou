import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { PageHero, Reveal, btn, Arrow } from "@/components/site/ui";
import { RequestForm } from "@/components/site/RequestForm";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact", "Contacter Igor Godonou par WhatsApp, Facebook, TikTok ou via le formulaire."),
  component: Page,
});

function Page() {
  return (
    <main>
      <PageHero eyebrow="Contact" title="Écrivons la" accent="suite ensemble." num="08" intro="Une idée, une question, une collaboration ? Le moyen le plus rapide reste WhatsApp." />
      <section className="container-ed grid gap-16 py-20 md:grid-cols-12">
        <Reveal className="space-y-4 md:col-span-4">
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className={`${btn({ variant: "accent" })} w-full`}>WhatsApp <Arrow /></a>
          <a href={`tel:${SITE.phoneTel}`} className={`${btn({ variant: "outline" })} w-full`}>{SITE.phoneDisplay}</a>
          <div className="flex gap-3">
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className={`${btn({ variant: "outline" })} flex-1`}>Facebook</a>
            <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer" className={`${btn({ variant: "outline" })} flex-1`}>TikTok</a>
          </div>
        </Reveal>
        <Reveal className="md:col-span-7 md:col-start-6">
          <RequestForm />
        </Reveal>
      </section>
    </main>
  );
}
