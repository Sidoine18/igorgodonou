import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { PageHero, Reveal, PortraitFrame, btn, Arrow } from "@/components/site/ui";

export const Route = createFileRoute("/a-propos")({
  head: () => seo("À propos", "L'histoire, l'identité et la vision d'Igor Godonou, entrepreneur digital et étudiant ingénieur."),
  component: Page,
});

const BLOCKS = [
  { n: "01", t: "Biographie", c: "Né le 5 juin 2006 à Zoungamè, village de la vallée de l’Ouémé (commune des Aguégués, Bénin), Igor Godonou grandit au cœur d’une communauté lacustre où la pêche rythme le quotidien. Très tôt, son attention se tourne vers les cahiers, les livres et les possibilités offertes par l’éducation." },
  { n: "02", t: "Parcours académique", c: "Entré à l’école à quatre ans, il obtient son CEP en 2016, puis son BEPC au CEG Atchoukpa (Avrankou) en 2020 — passant de la treizième place en sixième à la tête de sa promotion en quatrième. En 2023, il décroche son baccalauréat série C au CEG Le Nokoué (Cotonou). Il est aujourd’hui élève ingénieur en Génie Chimique et Procédés à l’École Polytechnique d’Abomey-Calavi, en quatrième année du cycle d’ingénieur." },
  { n: "03", t: "Le déclic entrepreneurial", c: "À l’université, Igor explore les opportunités d’Internet. Après des pertes sur des plateformes d’investissement et de paris en ligne — une leçon difficile —, il découvre le trading P2P et se forme auprès d’une mentor. Il y cumule 2,22 BTC de chiffre d’affaires, puis s’oriente vers la vente de produits numériques, découverte grâce à Raphaël Botoyiye et Aimé Acakpo." },
  { n: "04", t: "Vision du numérique", c: "Le business en ligne n’est ni un raccourci ni une solution magique : Igor croit à l’apprentissage, à la discipline, à la stratégie et à l’intégrité. Sa conviction profonde : le milieu dans lequel on naît ne doit pas déterminer jusqu’où l’on peut aller." },
  { n: "05", t: "Objectifs professionnels", c: "Atteindre la liberté financière par des activités entrepreneuriales légales, structurées et durables — et contribuer à l’émergence d’une jeunesse africaine plus autonome et mieux formée, en accompagnant ceux qui, comme lui, partent de peu." },
];
const VALUES = ["Intégrité", "Discipline", "Transmission", "Persévérance"];

function Page() {
  return (
    <main>
      <PageHero eyebrow="À propos" title="Igor Godonou," accent="entre sciences et digital." num="IG" intro={`${SITE.education}.`} />
      <section className="container-ed grid gap-16 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5"><div className="md:sticky md:top-28"><PortraitFrame /></div></div>
        <div className="space-y-14 md:col-span-6 md:col-start-7">
          {BLOCKS.map((b) => (
            <Reveal key={b.n} as="article" className="border-t border-ink pt-6">
              <p className="font-display text-sm font-bold text-terra">{b.n}</p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">{b.t}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{b.c}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-ink py-20 text-ivory md:py-28">
        <div className="container-ed">
          <p className="eyebrow text-accent">Valeurs & principes</p>
          <ul className="mt-10 grid gap-px bg-ivory/15 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal as="li" key={v} delay={i * 80} className="bg-ink p-8 transition-colors hover:bg-terra">
                <span className="font-display text-sm text-accent">0{i + 1}</span>
                <p className="mt-6 font-display text-3xl font-bold">{v}</p>
              </Reveal>
            ))}
          </ul>
          <Link to="/parcours" className={`${btn({ variant: "accent" })} mt-10`}>Voir le parcours <Arrow /></Link>
        </div>
      </section>
    </main>
  );
}
