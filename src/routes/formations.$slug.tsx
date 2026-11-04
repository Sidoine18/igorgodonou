import { createFileRoute, notFound } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { getFormation } from "@/lib/formations";
import { FormationPage } from "@/components/site/FormationPage";

export const Route = createFileRoute("/formations/$slug")({
  loader: ({ params }) => {
    const f = getFormation(params.slug);
    if (!f) throw notFound();
    return f;
  },
  head: ({ loaderData }) => loaderData ? seo(loaderData.title, loaderData.heroIntro) : { meta: [...seo("Formation introuvable", "Cette formation d’Igor Godonou n’est pas disponible.").meta, { name: "robots", content: "noindex" }] },
  component: Page,
});

function Page() {
  const f = Route.useLoaderData();
  return <FormationPage formation={f} />;
}
