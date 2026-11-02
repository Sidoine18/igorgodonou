import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header, Footer, ScrollProgress, FloatingActions } from "@/components/site/Chrome";
import { btn, Arrow } from "@/components/site/ui";

function NotFoundComponent() {
  return (
    <main id="contenu" className="relative flex min-h-[90vh] items-center overflow-hidden pt-24">
      <div className="container-ed">
        <p className="giant-num" aria-hidden>404</p>
        <h1 className="display-lg mt-6">Cette page s'est <span className="serif-accent text-terra">égarée.</span></h1>
        <p className="mt-6 max-w-lg text-muted-foreground">La page demandée n'existe pas ou a été déplacée.</p>
        <Link to="/" className={`${btn()} mt-8`}>Retour à l'accueil <Arrow /></Link>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold">Cette page n'a pas pu se charger</h1>
        <p className="mt-3 text-muted-foreground">Une erreur est survenue. Réessayez ou revenez à l'accueil.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className={btn()}>Réessayer</button>
          <a href="/" className={btn({ variant: "outline" })}>Accueil</a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#F5F2EB" },
      { title: "Igor Godonou — Entrepreneuriat digital" },
      { name: "description", content: "Igor Godonou, entrepreneur digital et étudiant ingénieur." },
      { name: "author", content: "Igor Godonou" },
      { property: "og:site_name", content: "Igor Godonou" },
      { property: "og:locale", content: "fr_FR" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Instrument+Serif:ital@1&family=Manrope:wght@400;500;600;700&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/images/favicon.svg", type: "image/svg+xml" },
    ],
    scripts: [{ children: "document.documentElement.classList.add('js')" }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollProgress />
      <Header />
      <div id="contenu">
        <Outlet />
      </div>
      <Footer />
      <FloatingActions />
    </QueryClientProvider>
  );
}
