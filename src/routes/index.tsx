import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { SITE, FEATURED_EXPERTISES, FORMATIONS, TIMELINE } from "@/lib/site";
import { Reveal, btn, Arrow, PortraitFrame } from "@/components/site/ui";

export const Route = createFileRoute("/")({
  head: () => seo("Entrepreneuriat digital & ingénierie", `${SITE.education}. Découvrez ses domaines : entrepreneuriat, e-commerce, produits digitaux, cryptomonnaies, coaching et formation.`),
  component: Index,
});

function Index() {
  return (
    <main>
      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="grain pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div className="container-ed relative grid items-center gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal><p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1"><span className="h-px w-8 bg-ink" />Entreprendre · Apprendre · Transmettre</p></Reveal>
            <Reveal delay={100}><h1 className="display-xl mt-6">Igor <span className="serif-accent text-terra">Godonou.</span></h1><p className="mt-6 max-w-xl font-display text-2xl font-bold md:text-3xl">Construire avec méthode. Avancer avec lucidité.</p></Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                 {SITE.education}. Mon parcours entrepreneurial s’est construit avec des essais, des pertes et des apprentissages. Je transmets aujourd’hui des méthodes pour comprendre les risques et travailler sur un projet, sans promesse de réussite facile.
              </p>
            </Reveal>
            <Reveal delay={300} className="mt-10 flex flex-wrap gap-3">
              <Link to="/formations" className={btn({ variant: "accent" })}>Découvrir les formations <Arrow /></Link>
            </Reveal>
          </div>
          <Reveal delay={200} className="relative mx-auto w-full max-w-sm md:col-span-5 md:max-w-none md:pl-10">
            <PortraitFrame />
          </Reveal>
        </div>
        <a href="#manifeste" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex" aria-label="Défiler vers le manifeste">
          <span className="eyebrow text-[0.6rem]">Défiler</span>
          <span className="scroll-cue block h-10 w-px bg-ink" />
        </a>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-ink bg-ink py-4 text-ivory" aria-hidden>
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-2xl font-bold md:text-4xl">
          {Array.from({ length: 2 }).map((_, k) => (
             <span key={k} className="flex gap-10">{FEATURED_EXPERTISES.flatMap((e) => [e.title, "✦"]).map((w, i) => <span key={i} className={w === "✦" ? "text-accent" : ""}>{w}</span>)}</span>
          ))}
        </div>
      </div>

      {/* MANIFESTE */}
      <section id="manifeste" className="container-ed grid gap-10 py-24 md:grid-cols-12 md:py-36">
        <Reveal className="md:col-span-3"><p className="eyebrow">Manifeste</p><p className="giant-num mt-4" aria-hidden>01</p></Reveal>
        <div className="md:col-span-9">
          <Reveal><p className="font-display text-3xl font-bold leading-tight md:text-5xl">Le digital n'est pas un raccourci. C'est un <span className="serif-accent text-terra">atelier</span> où l'on construit, teste et apprend — <span className="bg-accent px-1">avec méthode</span>.</p></Reveal>
          <Reveal delay={120}><div className="mt-10 grid gap-6 text-muted-foreground md:grid-cols-2"><p>Une activité peut s’arrêter. Une décision peut coûter de l’argent. Mes premières pertes m’ont appris à questionner les promesses, vérifier les informations et mesurer les risques avant d’agir.</p><p>Progresser demande du temps, de la régularité et de l’adaptation. Ni une formation ni une méthode ne rendent les résultats automatiques. L’objectif : mieux comprendre, pratiquer et prendre des décisions réfléchies.</p></div></Reveal>
        </div>
      </section>

      {/* FEATURED_EXPERTISES */}
      <section className="border-t border-ink/15 bg-card py-24 md:py-32">
        <div className="container-ed">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal><p className="eyebrow">Domaines d'activité</p><h2 className="display-lg mt-4">Trois axes de <span className="serif-accent text-terra">pratique.</span></h2></Reveal>
            <Reveal><Link to="/expertises" className={btn({ variant: "outline" })}>Toutes les expertises <Arrow /></Link></Reveal>
          </div>
          <ul className="mt-14 border-t border-ink">
            {FEATURED_EXPERTISES.map((e, i) => (
              <Reveal as="li" key={e.n} delay={i * 60} className="group border-b border-ink">
                <Link to="/expertises" className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 transition-colors duration-300 hover:bg-accent md:grid-cols-[6rem_1fr_1.2fr_auto] md:px-4 md:py-8">
                  <span className="font-display text-sm font-bold text-terra md:text-base">{e.n}</span>
                  <span className="font-display text-2xl font-bold md:text-4xl">{e.title}</span>
                  <span className="hidden text-sm text-muted-foreground md:block">{e.text}</span>
                  <span aria-hidden className="text-2xl transition-transform duration-300 group-hover:-rotate-45">→</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* FORMATIONS + PARCOURS */}
      <section className="container-ed grid gap-16 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-5">
          <Reveal><p className="eyebrow">Formations</p><h2 className="mt-4 text-4xl font-bold md:text-6xl">Apprendre en <span className="serif-accent text-terra">faisant.</span></h2></Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-muted-foreground">{FORMATIONS.length ? `${FORMATIONS.length} parcours pour comprendre le P2P, la blockchain, les produits digitaux et la création vidéo. Des programmes et des prix transparents, avec ou sans accompagnement.` : "Le catalogue de formations est en préparation. Les premières offres seront publiées ici dès qu'elles seront validées."}</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link to="/formations" className={btn()}>Formations <Arrow /></Link></div>
          </Reveal>
        </div>
        <div className="relative md:col-span-6 md:col-start-7">
          <div className="absolute inset-0 -rotate-2 bg-terra" aria-hidden />
          <Reveal className="relative bg-ink p-8 text-ivory md:p-12">
            <p className="eyebrow text-accent">Parcours</p>
            <ol className="mt-6 space-y-6">
              {TIMELINE.map((s, i) => (
                <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-ivory/15 pt-5">
                  <span className="font-display text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div><p className="eyebrow opacity-60">{s.kind}</p><p className="mt-1 font-display text-xl font-bold">{s.title}</p></div>
                </li>
              ))}
            </ol>
            <Link to="/parcours" className={`${btn({ variant: "accent" })} mt-8`}>Voir le parcours <Arrow /></Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="container-ed py-24 md:py-36">
        <Reveal className="relative overflow-hidden bg-accent p-10 md:p-20">
          <div className="giant-num absolute -bottom-6 -right-4 opacity-30" aria-hidden>→</div>
          <p className="eyebrow">Collaboration</p>
          <h2 className="display-lg relative mt-4 max-w-4xl">Un projet, une question, une envie de <span className="serif-accent">collaborer</span> ?</h2>
          <Link to="/contact" className={`${btn()} relative mt-10`}>Entrer en contact <Arrow /></Link>
        </Reveal>
      </section>
    </main>
  );
}
