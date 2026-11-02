export const seo = (title: string, description: string, type = "website") => ({
  meta: [
    { title: `${title} — Igor Godonou` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — Igor Godonou` },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `${title} — Igor Godonou` },
    { name: "twitter:description", content: description },
  ],
});
