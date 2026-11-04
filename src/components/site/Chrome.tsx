import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { NAV, SITE, waLink } from "@/lib/site";
import { btn, Arrow, SiteButton, useScrolled } from "./ui";
import { cn } from "@/lib/utils";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const scrolled = useScrolled();
  const last = useRef(0);
  const loc = useLocation();

  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    const f = () => { const y = window.scrollY; setHidden(y > 300 && y > last.current); last.current = y; };
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <>
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2">Aller au contenu</a>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", hidden && !open ? "-translate-y-full" : "translate-y-0", scrolled ? "bg-background/90 backdrop-blur-md border-b border-ink/10" : "")}>
        <div className="container-ed flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="font-display text-lg font-extrabold tracking-tight md:text-xl" aria-label="Igor Godonou — accueil">
            IGOR<span className="text-terra">.</span>GODONOU
          </Link>
          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-7 text-sm font-semibold">
              {NAV.slice(0, 7).map((n) => (
                <li key={n.to}><Link to={n.to} className="link-underline py-1" activeProps={{ className: "text-terra" }}>{n.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/contact" className={cn(btn({ variant: "primary" }), "hidden min-h-10 px-5 text-xs sm:inline-flex")}>Contact <Arrow /></Link>
            <SiteButton type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-ink lg:hidden">
              <span className={cn("absolute h-0.5 w-5 bg-ink transition-transform duration-300", open ? "rotate-45" : "-translate-y-1.5")} />
              <span className={cn("absolute h-0.5 w-5 bg-ink transition-transform duration-300", open ? "-rotate-45" : "translate-y-1.5")} />
            </SiteButton>
          </div>
        </div>
      </header>
      <div id="menu-mobile" className={cn("fixed inset-0 z-40 bg-accent transition-[clip-path] duration-700 lg:hidden", open ? "[clip-path:circle(150%_at_100%_0)]" : "pointer-events-none [clip-path:circle(0%_at_100%_0)]")} aria-hidden={!open} inert={!open}>
        <nav aria-label="Menu mobile" className="container-ed flex h-full flex-col justify-center pt-16">
          <ul className="space-y-1">
            {[{ to: "/", label: "Accueil" }, ...NAV, { to: "/faq", label: "FAQ" }].map((n, i) => (
              <li key={n.to} style={{ transitionDelay: open ? `${120 + i * 40}ms` : "0ms" }} className={cn("transition-all duration-500", open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
                <Link to={n.to} className="flex items-baseline gap-4 py-1 font-display text-4xl font-bold sm:text-5xl">
                  <span className="text-xs font-sans tracking-widest">{String(i).padStart(2, "0")}</span>{n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex gap-5 text-sm font-bold uppercase tracking-widest">
            <a href={SITE.facebook} {...ext}>Facebook</a><a href={SITE.tiktok} {...ext}>TikTok</a><a href={SITE.whatsapp} {...ext}>WhatsApp</a>
          </div>
        </nav>
      </div>
    </>
  );
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const f = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    }); };
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return <div ref={ref} aria-hidden className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left scale-x-0 bg-terra" />;
}

export function FloatingActions() {
  const scrolled = useScrolled(600);
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <SiteButton type="button" onClick={() => window.scrollTo({ top: 0 })} aria-label="Retour en haut" className={cn("flex h-11 w-11 items-center justify-center rounded-full border border-ink bg-background text-lg transition-all duration-300 hover:bg-ink hover:text-ivory", scrolled ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0")}>↑</SiteButton>
      <a href={waLink("Bonjour Igor, je vous contacte depuis votre site.")} {...ext} aria-label="Discuter sur WhatsApp" className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-accent shadow-lg transition-transform duration-300 hover:scale-110">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1 0-.3-.1-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" /></svg>
      </a>
    </div>
  );
}

export function Footer() {
  return <footer className="bg-ink text-ivory"><div className="container-ed py-12">
    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start"><div><p className="font-display text-2xl font-bold">Igor Godonou</p><a href={`mailto:${SITE.email}`} className="link-underline mt-4 inline-block">{SITE.email}</a></div><nav aria-label="Réseaux sociaux" className="flex flex-wrap gap-6 text-sm"><a href={SITE.whatsapp} {...ext} className="link-underline">WhatsApp ↗</a><a href={SITE.facebook} {...ext} className="link-underline">Facebook ↗</a><a href={SITE.tiktok} {...ext} className="link-underline">TikTok ↗</a></nav></div>
    <div className="mt-10 flex flex-col justify-between gap-5 border-t border-ivory/20 pt-6 text-xs"><p>© {new Date().getFullYear()} Igor Godonou. Tous droits réservés.</p><nav aria-label="Informations légales" className="flex flex-wrap gap-5"><Link to="/confidentialite" className="link-underline">Confidentialité</Link><Link to="/mentions-legales" className="link-underline">Mentions légales</Link><Link to="/conditions-de-vente" className="link-underline">Conditions de vente</Link><Link to="/faq" className="link-underline">FAQ</Link></nav></div>
  </div></footer>;
}
