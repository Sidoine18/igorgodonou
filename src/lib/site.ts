import { FORMATION_DETAILS } from "./formations";

// Identité et contenu central confirmés par Igor.

export const SITE = {
  url: "https://igorgodonou.com",
  name: "IGOR GODONOU",
  education: "Élève ingénieur en Génie Chimique et Procédés à l’École Polytechnique d’Abomey-Calavi",
  phoneDisplay: "+229 01 69 31 70 65",
  phoneTel: "+2290169317065",
  whatsapp: "https://wa.me/2290169317065",
  facebook: "https://www.facebook.com/igor.godonou",
  tiktok: "https://vm.tiktok.com/ZN9UG5qdafRPY-AFeaV/",
};

export const waLink = (text?: string) =>
  text ? `${SITE.whatsapp}?text=${encodeURIComponent(text)}` : SITE.whatsapp;

export const NAV = [
  { to: "/a-propos", label: "À propos" },
  { to: "/parcours", label: "Parcours" },
  { to: "/expertises", label: "Expertises" },
  { to: "/formations", label: "Formations" },
  { to: "/ressources", label: "Ressources" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export const EXPERTISES = [
  { n: "01", title: "E-commerce", text: "Explorer la vente en ligne, de la présentation des produits au parcours d’achat.", needs: ["Structurer une boutique", "Présenter ses produits", "Organiser la vente en ligne"] },
  { n: "02", title: "Business en ligne", text: "Réfléchir aux modèles d’activité numériques, au contenu et à la visibilité.", needs: ["Développer sa visibilité", "Clarifier son offre", "Construire une audience"] },
  { n: "03", title: "Cryptomonnaies", text: "Une expérience concrète du trading P2P — achat et vente entre utilisateurs — avec 2,22 BTC de chiffre d’affaires cumulé.", needs: ["Comprendre le P2P", "Identifier les risques", "Découvrir la blockchain"] },
  { n: "04", title: "Produits digitaux", text: "Transformer un savoir ou une idée en ressource numérique utile.", needs: ["Définir un format", "Structurer un contenu", "Préparer un lancement"] },
  { n: "05", title: "Coaching", text: "Un accompagnement fondé sur l’expérience : objectifs, obstacles et prochaines étapes d’un projet en ligne.", needs: ["Clarifier ses objectifs", "Prendre du recul", "Définir ses priorités"] },
  { n: "06", title: "Formation", text: "Formateur en trading P2P et en vente de produits numériques : transmettre des méthodes pour apprendre et progresser.", needs: ["Apprendre les bases", "Comprendre le marché", "Gagner en autonomie"] },
  { n: "07", title: "Entrepreneuriat", text: "Structurer une idée, examiner sa pertinence et construire un projet cohérent.", needs: ["Clarifier une idée", "Choisir un modèle d’activité", "Poser les premières étapes"] },
  { n: "08", title: "Ingénierie", text: "Un parcours d’élève ingénieur en Génie Chimique et Procédés à l’École Polytechnique d’Abomey-Calavi.", needs: ["Échanger sur le génie chimique", "Explorer les procédés", "Relier sciences et projets"] },
];

export type Formation = { slug: string; title: string; description: string; level: string; format: string; goals: string[]; duration?: string; price?: string };
export const FORMATIONS: Formation[] = FORMATION_DETAILS.map((f) => ({
  slug: f.slug, title: f.title, description: f.heroIntro,
  level: "Accessible aux débutants", format: "Formation", goals: f.skills,
  ...(f.duration ? { duration: f.duration } : {}), price: f.price,
}));

export type Article = { slug: string; title: string; excerpt: string; category: string; date: string; body: string[] };
// Aucun article publié pour l'instant.
export const ARTICLES: Article[] = [];

export type Faq = { q: string; a: string };
// N'ajouter que les questions/réponses validées par Igor.
export const FAQ: Faq[] = [];

export type Step = { period?: string; kind: string; title: string; text: string };
// Parcours confirmé par Igor — dates et étapes validées.
export const TIMELINE: Step[] = [
  { period: "2006", kind: "Origines", title: "Zoungamè, vallée de l’Ouémé", text: "Naissance le 5 juin 2006 à Zoungamè, dans la commune des Aguégués (Bénin) — un village lacustre où la pêche rythme le quotidien." },
  { period: "2016", kind: "Études primaires", title: "Certificat d’études primaires", text: "Entré à l’école à quatre ans et régulièrement parmi les trois meilleurs de sa classe, il obtient son CEP." },
  { period: "2020", kind: "Collège — CEG Atchoukpa, Avrankou", title: "BEPC : apprendre à se relever", text: "Treizième en sixième, puis premier de sa classe en cinquième et de sa promotion en quatrième : la preuve que le travail transforme une situation." },
  { period: "2023", kind: "Lycée — CEG Le Nokoué, Cotonou", title: "Baccalauréat série C", text: "Un parcours scientifique consolidé en seconde, première et terminale C." },
  { period: "Depuis 2023", kind: "Études supérieures", title: "Génie Chimique et Procédés — EPAC", text: "Cycle d’ingénieur à l’École Polytechnique d’Abomey-Calavi ; actuellement en quatrième année." },
  { kind: "Entrepreneuriat", title: "Trading P2P", text: "Après des pertes sur des plateformes d’investissement en ligne — une leçon marquante —, il se forme au trading P2P et cumule 2,22 BTC de chiffre d’affaires." },
  { kind: "Transmission", title: "Coach & formateur", text: "Il accompagne aujourd’hui d’autres jeunes dans le trading P2P et la vente de produits numériques." },
];
