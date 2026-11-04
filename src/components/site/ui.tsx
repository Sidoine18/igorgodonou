import { useEffect, useRef, useState, type ReactNode, type ButtonHTMLAttributes } from "react";
import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" | "article" }) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export const btn = cva(
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary: "bg-ink text-ivory hover:bg-accent hover:text-ink",
        accent: "bg-accent text-ink hover:bg-ink hover:text-accent",
        outline: "border border-ink text-ink hover:bg-ink hover:text-ivory",
        ghostLight: "border border-ivory/40 text-ivory hover:bg-ivory hover:text-ink",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);
export type BtnVariant = VariantProps<typeof btn>["variant"];

export function SiteButton({ variant, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant }) {
  return <button {...props} className={cn(btn({ variant }), className)} />;
}

export const Arrow = () => (
  <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
);

export function PageHero({ eyebrow, title, accent, intro, num }: { eyebrow: string; title: string; accent?: string; intro?: ReactNode; num?: string }) {
  return (
    <header className="relative overflow-hidden border-b border-ink/15 pt-32 pb-16 md:pt-44 md:pb-24">
      <div className="grain pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="container-ed relative grid gap-8 md:grid-cols-12">
        <div className="md:col-span-9">
          <Reveal><p className="eyebrow flex items-center gap-3"><span className="h-px w-10 bg-ink" />{eyebrow}</p></Reveal>
          <Reveal delay={80}><h1 className="display-lg mt-6 break-words">{title} {accent && <span className="serif-accent text-terra">{accent}</span>}</h1></Reveal>
          {intro && <Reveal delay={160}><div className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</div></Reveal>}
        </div>
        {num && <div className="giant-num hidden self-end text-right md:col-span-3 md:block" aria-hidden>{num}</div>}
      </div>
    </header>
  );
}

export function Draft({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-start gap-2 rounded-sm border border-dashed border-terra bg-terra/10 px-3 py-2 text-xs font-semibold text-ink">
      <span aria-hidden className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-terra" />
      <span>{children}</span>
    </p>
  );
}

export function EmptyState({ title, text, cta }: { title: string; text: string; cta?: { to: string; label: string } }) {
  return (
    <Reveal className="relative overflow-hidden border border-ink bg-card p-8 md:p-14">
      <div className="absolute -right-6 -top-10 giant-num opacity-20" aria-hidden>∅</div>
      <p className="eyebrow text-terra">Bientôt disponible</p>
      <h2 className="mt-4 text-3xl font-bold md:text-5xl">{title}</h2>
      <p className="mt-4 max-w-xl text-muted-foreground">{text}</p>
      {cta && <Link to={cta.to} className={cn(btn(), "mt-8")}>{cta.label} <Arrow /></Link>}
    </Reveal>
  );
}

export function PortraitFrame({ label = "Portrait d'Igor Godonou", className }: { label?: string; className?: string }) {
  return (
    <figure className={cn("relative", className)}>
      <div className="absolute inset-0 translate-x-4 translate-y-4 bg-terra md:translate-x-6 md:translate-y-6" aria-hidden />
      <img src="/images/igor-godonou-portrait.jpg" alt={label} width={715} height={1073} fetchPriority="high" className="relative aspect-[715/1073] w-full border border-ink object-cover" />
      <figcaption className="eyebrow absolute -left-2 bottom-6 bg-accent px-3 py-1.5 md:-left-6">Igor Godonou</figcaption>
    </figure>
  );
}

export function useScrolled(threshold = 20) {
  const [s, set] = useState(false);
  useEffect(() => {
    const f = () => set(window.scrollY > threshold);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, [threshold]);
  return s;
}
