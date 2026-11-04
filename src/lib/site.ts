import { FORMATION_DETAILS } from "./formations";

// Identité et contenu central confirmés par Igor.

export const SITE = {
  url: "https://igorgodonou.com",
  name: "IGOR GODONOU",
  email: "igorgodonou@gmail.com",
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

// Selected public axes; the complete confirmed domain list remains documented above.
export const FEATURED_EXPERTISES = [
  { n: "01", title: "Trading P2P & culture crypto", text: "Comprendre les échanges entre utilisateurs, comparer les prix et les frais, sécuriser ses comptes et reconnaître les risques avant d’engager un capital.", needs: ["Lire une annonce P2P", "Calculer une marge réelle", "Identifier les arnaques"] },
  { n: "02", title: "E-commerce & produits digitaux", text: "Passer d’un problème identifié à une offre numérique : étudier la demande, structurer le produit, préparer sa vente et suivre les résultats.", needs: ["Valider une idée", "Structurer une offre", "Organiser un parcours client"] },
  { n: "03", title: "Formation & accompagnement", text: "Transmettre les méthodes tirées de l’expérience en P2P et en vente de produits numériques. Selon la formule, avancer en autonomie ou bénéficier de retours réguliers sur son projet.", needs: ["Comprendre les fondamentaux", "Mettre en pratique", "Prendre du recul"] },
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
export const FAQ: Faq[] = [
  { q: "À qui s’adressent les formations ?", a: "Les quatre parcours sont accessibles aux débutants. Chaque page détaille son public, ses compétences et son programme pour vous aider à choisir." },
  { q: "Une inscription en ligne garantit-elle une place ?", a: "Non. Le formulaire transmet une demande via Web3Forms. L’inscription devient définitive uniquement après prise de contact et validation du paiement." },
  { q: "Quel accompagnement choisir en e-commerce ?", a: "La formule autonome coûte 25 000 FCFA sans suivi individuel. La formule accompagnée coûte 50 000 FCFA : trois mois de suivi, deux appels par semaine, accès à vie et communauté privée. L’option à 30 000 FCFA ajoute 5 % des revenus pendant les trois premiers mois ; ses conditions détaillées doivent être consultées et acceptées avant l’inscription définitive." },
  { q: "Les formations garantissent-elles des revenus ?", a: "Non. La progression dépend du travail fourni, du marché et de votre situation. Les cryptoactifs peuvent entraîner une perte partielle ou totale du capital. Les formations ne constituent pas un conseil en investissement." },
];

export type Step = { period?: string; kind: string; title: string; text: string };
// Parcours confirmé par Igor — dates et étapes validées.
export const TIMELINE: Step[] = [
  { period: "2006", kind: "Origines", title: "Zoungamè, vallée de l’Ouémé", text: "Naissance le 5 juin 2006 à Zoungamè, dans la commune des Aguégués (Bénin) — un village lacustre où la pêche rythme le quotidien." },
  { period: "2016", kind: "Études primaires", title: "Certificat d’études primaires", text: "Entré à l’école à quatre ans et régulièrement parmi les trois meilleurs de sa classe, il obtient son CEP." },
  { period: "2020", kind: "Collège — CEG Atchoukpa, Avrankou", title: "BEPC : apprendre à se relever", text: "Treizième en sixième, puis premier de sa classe en cinquième et de sa promotion en quatrième : la preuve que le travail transforme une situation." },
  { period: "2023", kind: "Lycée — CEG Le Nokoué, Cotonou", title: "Baccalauréat série C", text: "Un parcours scientifique consolidé en seconde, première et terminale C." },
  { period: "Depuis 2023", kind: "Études supérieures", title: "Génie Chimique et Procédés — EPAC", text: "Cycle d’ingénieur à l’École Polytechnique d’Abomey-Calavi ; actuellement en quatrième année." },
  { kind: "Entrepreneuriat", title: "Trading P2P", text: "Des pertes sur des plateformes d’investissement et de paris, puis la fermeture d’une activité en ligne après environ cinq mois, l’amènent à revoir ses décisions. Formé au P2P sur Binance auprès d’une mentor, il cumule 2,22 BTC de chiffre d’affaires : un volume d’échanges, pas un bénéfice. Cette expérience nourrit une attention aux frais, aux contreparties et à la protection du capital." },
  { kind: "Transmission", title: "Coach & formateur", text: "La découverte des produits numériques auprès de Raphaël Botoyiye et Aimé Acakpo élargit son parcours entrepreneurial. Il accompagne aujourd’hui d’autres jeunes dans le P2P et la vente de produits numériques, en reliant expérience de terrain, discipline et transmission." },
];
