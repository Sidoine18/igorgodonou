// Contenu détaillé des formations — données validées par Igor.
// L'ordre et le contenu des modules sont modifiables ici (champ `modules`).

export type FormationModule = { title: string; points: string[] };
export type FormationFaq = { q: string; a: string };
export type Formule = {
  id: string;
  name: string;
  price: string;
  duration?: string;
  tagline: string;
  features: string[];
  cta: string;
  note?: string;
};

export type FormationDetail = {
  slug: string;
  title: string;
  badge?: string;
  price: string;
  duration?: string;
  heroIntro: string;
  audience: string[];
  skills: string[];
  modules: FormationModule[];
  faq: FormationFaq[];
  limits: string[];
  riskNotice?: string;
  formules?: Formule[];
  bonus?: { title: string; items: string[]; note: string };
};

export const FORMATION_DETAILS: FormationDetail[] = [
  {
    slug: "trading-p2p",
    title: "Maîtriser le trading P2P en Afrique — Binance & Bybit",
    badge: "Formation de 1 mois",
    price: "30 000 FCFA",
    duration: "1 mois",
    heroIntro:
      "Une formation pédagogique pour comprendre le fonctionnement du trading P2P, les mécanismes d'achat et de vente de cryptomonnaies entre utilisateurs et les précautions nécessaires pour exercer cette activité dans un contexte africain.",
    audience: [
      "Débutants souhaitant comprendre le trading P2P avant de s'y engager.",
      "Étudiants et jeunes actifs cherchant une activité en ligne structurée.",
      "Personnes ayant déjà perdu de l'argent sur des plateformes douteuses et voulant repartir sur des bases saines.",
      "Entrepreneurs souhaitant intégrer les paiements crypto à leur activité.",
    ],
    skills: [
      "Créer et sécuriser un compte Binance et Bybit.",
      "Lire et comparer les annonces P2P (prix, limites, moyens de paiement).",
      "Passer et exécuter des ordres d'achat et de vente en toute sécurité.",
      "Calculer les marges, les écarts de prix et les frais réels.",
      "Gérer un capital de départ et suivre ses opérations.",
      "Repérer les arnaques courantes et protéger ses comptes.",
      "Comprendre les obligations juridiques et fiscales selon son pays.",
    ],
    modules: [
      {
        title: "Présentation de la formation et fondamentaux du P2P",
        points: [
          "Qu'est-ce que le trading P2P et en quoi il diffère du trading classique.",
          "Le rôle des plateformes d'échange et du système d'entiercement (escrow).",
          "Le vocabulaire indispensable : annonce, ordre, marge, spread, liquidité.",
        ],
      },
      {
        title: "Fonctionnement de Binance P2P et Bybit P2P",
        points: [
          "Création et vérification de compte (KYC).",
          "Interface des annonces : filtres, prix, limites, moyens de paiement.",
          "Déroulé complet d'une transaction, côté acheteur et côté vendeur.",
          "Litiges et appels : que faire quand une transaction se passe mal.",
        ],
      },
      {
        title: "Ordres, annonces, prix et écarts de marché",
        points: [
          "Comment les prix P2P se forment et pourquoi ils diffèrent du prix spot.",
          "Lire les écarts entre acheteurs et vendeurs pour identifier une marge.",
          "Publier sa propre annonce : paramètres et bonnes pratiques.",
        ],
      },
      {
        title: "Gestion du capital et calcul des frais",
        points: [
          "Définir un capital de départ adapté à sa situation.",
          "Calculer les frais de plateforme, de retrait et de change.",
          "Tenir un journal de ses opérations et mesurer sa rentabilité réelle.",
        ],
      },
      {
        title: "Gestion des risques, prévention des arnaques et sécurité des comptes",
        points: [
          "Les arnaques les plus fréquentes en P2P et comment les éviter.",
          "Double authentification, mots de passe et hygiène numérique.",
          "Règles de prudence : ne jamais partager ses codes, vérifier les contreparties.",
        ],
      },
      {
        title: "Conformité juridique et fiscale selon le pays",
        points: [
          "Panorama des cadres juridiques en Afrique de l'Ouest et ailleurs.",
          "Déclarations et obligations fiscales possibles selon votre pays de résidence.",
          "Pourquoi se renseigner auprès des autorités compétentes avant de se lancer.",
        ],
      },
    ],
    faq: [
      {
        q: "Faut-il déjà connaître les cryptomonnaies pour suivre cette formation ?",
        a: "Non. La formation part des fondamentaux et explique chaque notion avant de passer à la pratique.",
      },
      {
        q: "Quel capital faut-il pour commencer ?",
        a: "La formation explique comment définir un capital adapté à votre situation. Il n'est jamais conseillé d'engager de l'argent que vous ne pouvez pas vous permettre de perdre.",
      },
      {
        q: "La formation garantit-elle des gains ?",
        a: "Non. Aucune formation sérieuse ne peut garantir des gains. Les résultats dépendent du capital, des frais, des conditions de marché, de la liquidité et des risques propres aux cryptoactifs.",
      },
      {
        q: "Comment se déroule la formation pendant le mois ?",
        a: "Les modalités précises (rythme, supports, échanges) sont communiquées lors de la prise de contact qui suit votre demande d'inscription.",
      },
    ],
    limits: [
      "Cette formation est pédagogique : elle ne constitue ni un conseil en investissement ni une promesse de gains.",
      "Le formateur a réalisé environ 110 millions FCFA de chiffre d'affaires lié à cette activité, soit un équivalent indicatif d'environ 2,22 BTC au moment de son estimation. Le chiffre d'affaires n'est pas un bénéfice, et ces résultats personnels ne préjugent en rien des vôtres.",
      "Les résultats dépendent du capital engagé, des frais, des conditions de marché, de la liquidité et des risques propres aux cryptoactifs.",
      "L'inscription n'est définitive qu'après prise de contact et validation du paiement.",
    ],
    riskNotice:
      "Les cryptoactifs sont des actifs volatils : leur négociation peut entraîner une perte partielle ou totale du capital engagé. N'engagez jamais de fonds dont vous auriez besoin pour vivre.",
  },
  {
    slug: "crypto-blockchain-web3",
    title: "Comprendre l'écosystème crypto — De la blockchain au Web3",
    price: "15 000 FCFA",
    heroIntro:
      "Une formation pour comprendre les cryptomonnaies, les blockchains, les applications décentralisées et les fondamentaux nécessaires pour examiner un projet avant de s'y intéresser.",
    audience: [
      "Curieux souhaitant comprendre la crypto au-delà des gros titres.",
      "Personnes approchées par des « projets » et voulant apprendre à les évaluer.",
      "Étudiants et professionnels cherchant une culture solide sur la blockchain et le Web3.",
    ],
    skills: [
      "Expliquer le fonctionnement d'une blockchain avec des mots simples.",
      "Distinguer les grandes catégories de cryptoactifs.",
      "Utiliser un wallet et comprendre clés privées, transactions et frais.",
      "Comprendre smart contracts, DeFi et Web3.",
      "Lire la tokenomics d'un projet et évaluer l'utilité d'un token.",
      "Mener une analyse fondamentale et vérifier ses sources.",
      "Repérer les signaux d'alerte : arnaques, promesses irréalistes, faux partenariats, projets opaques.",
    ],
    modules: [
      {
        title: "Introduction à l'écosystème crypto",
        points: [
          "D'où viennent les cryptomonnaies et à quels besoins elles répondent.",
          "Les acteurs de l'écosystème : plateformes, développeurs, communautés.",
        ],
      },
      {
        title: "Fonctionnement d'une blockchain",
        points: [
          "Blocs, validation, consensus : les mécanismes de base.",
          "Pourquoi une blockchain est (ou n'est pas) digne de confiance.",
        ],
      },
      {
        title: "Bitcoin, Ethereum et autres catégories de cryptoactifs",
        points: [
          "Bitcoin comme réserve de valeur, Ethereum comme plateforme.",
          "Stablecoins, tokens utilitaires, memecoins : comprendre les différences.",
        ],
      },
      {
        title: "Wallets, clés privées, transactions et frais",
        points: [
          "Wallet hébergé ou auto-détenu : avantages et responsabilités.",
          "Clés privées et phrase de récupération : les règles d'or.",
          "Frais de réseau : comment ils fonctionnent et comment les anticiper.",
        ],
      },
      {
        title: "Smart contracts, DeFi et Web3",
        points: [
          "Ce qu'est un smart contract et ce qu'il permet.",
          "Finance décentralisée : prêts, échanges, rendements — et leurs risques.",
          "Ce que recouvre réellement le terme « Web3 ».",
        ],
      },
      {
        title: "Tokenomics et utilité des tokens",
        points: [
          "Offre, émission, distribution : lire l'économie d'un token.",
          "Distinguer un token utile d'un token purement spéculatif.",
        ],
      },
      {
        title: "Analyse fondamentale des projets",
        points: [
          "Équipe, livre blanc, feuille de route, communauté : les points à examiner.",
          "Liquidité, distribution des tokens et risques associés.",
        ],
      },
      {
        title: "Signaux d'alerte et méthodologie de recherche",
        points: [
          "Arnaques, promesses irréalistes, faux partenariats, projets opaques : les reconnaître.",
          "Construire une méthode de recherche et vérifier ses sources avant toute décision.",
        ],
      },
    ],
    faq: [
      {
        q: "Cette formation apprend-elle à investir ?",
        a: "Elle apprend à comprendre et à analyser, pas à investir. Elle ne constitue pas un conseil en investissement.",
      },
      {
        q: "Faut-il un bagage technique ?",
        a: "Non. Chaque concept est expliqué simplement, sans prérequis informatique.",
      },
      {
        q: "Pourquoi insister sur les signaux d'alerte ?",
        a: "Parce que les arnaques sont nombreuses dans cet écosystème. Savoir les repérer est la compétence la plus protectrice que cette formation transmet.",
      },
    ],
    limits: [
      "Formation pédagogique : elle ne constitue ni un conseil en investissement ni une incitation à acheter des cryptoactifs.",
      "Aucun projet ni rendement n'est recommandé ou garanti.",
      "L'inscription n'est définitive qu'après prise de contact et validation du paiement.",
    ],
    riskNotice:
      "Les cryptoactifs sont des actifs volatils : ils peuvent entraîner une perte partielle ou totale du capital. Cette formation vise à comprendre, pas à inciter à investir.",
  },
  {
    slug: "ecommerce-produits-digitaux",
    title: "De la création à la vente de produits digitaux",
    price: "Dès 25 000 FCFA",
    heroIntro:
      "Une formation complète pour identifier une idée, concevoir un produit numérique et construire sa vente en ligne — disponible en trois formules selon le niveau d'accompagnement souhaité.",
    audience: [
      "Porteurs d'une idée de produit numérique (guide, formation, modèle, outil…).",
      "Entrepreneurs souhaitant ajouter une offre digitale à leur activité.",
      "Débutants cherchant une méthode structurée, de l'idée à la première vente.",
    ],
    skills: [
      "Identifier un problème et une audience.",
      "Trouver et valider une idée de produit numérique.",
      "Étudier le marché et la demande.",
      "Concevoir un produit digital et structurer une offre.",
      "Définir un prix et créer une page de vente.",
      "Choisir des moyens de paiement adaptés au marché cible.",
      "Construire un parcours client et organiser la livraison.",
      "Appliquer les bases du marketing digital et mesurer ses résultats.",
    ],
    modules: [
      {
        title: "Trouver et valider son idée",
        points: [
          "Identifier un problème et une audience.",
          "Trouver une idée de produit numérique.",
          "Étudier le marché et la demande.",
        ],
      },
      {
        title: "Concevoir le produit et l'offre",
        points: [
          "Concevoir un produit digital.",
          "Structurer une offre.",
          "Définir un prix.",
        ],
      },
      {
        title: "Mettre en vente",
        points: [
          "Créer une page de vente.",
          "Choisir des moyens de paiement adaptés au marché cible.",
          "Construire un parcours client.",
          "Organiser la livraison du produit.",
        ],
      },
      {
        title: "Faire connaître et améliorer",
        points: [
          "Découvrir les bases du marketing digital.",
          "Mesurer les résultats et améliorer son offre.",
        ],
      },
    ],
    formules: [
      {
        id: "autonome",
        name: "Formule Autonome",
        price: "25 000 FCFA",
        tagline: "Accès à la formation sans accompagnement individuel.",
        features: [
          "Accès à l'intégralité du contenu de la formation.",
          "Progression à votre rythme, en toute autonomie.",
          "Bonus Studio Créatif & Publicité Digitale inclus.",
        ],
        cta: "Choisir la formule autonome",
      },
      {
        id: "accompagnee",
        name: "Formule Accompagnée",
        price: "50 000 FCFA",
        duration: "3 mois",
        tagline: "La formation complète avec un suivi individuel pendant trois mois.",
        features: [
          "Deux appels par semaine.",
          "Accès à vie au contenu de la formation.",
          "Accès à une communauté privée.",
          "Accompagnement pendant trois mois : mise en pratique, retours et progression de votre projet.",
          "Bonus Studio Créatif & Publicité Digitale inclus.",
        ],
        cta: "Choisir la formule accompagnée",
      },
      {
        id: "partage-revenus",
        name: "Accompagnement avec partage de revenus",
        price: "30 000 FCFA",
        duration: "3 mois",
        tagline:
          "Les mêmes avantages que la formule accompagnée, avec un mécanisme de rémunération de 5 % des revenus pendant les trois premiers mois.",
        features: [
          "Tous les avantages de la formule accompagnée (appels, communauté, accès à vie).",
          "Prix initial réduit : 30 000 FCFA.",
          "Partage de revenus : 5 % des revenus pendant les trois premiers mois.",
          "Bonus Studio Créatif & Publicité Digitale inclus.",
        ],
        cta: "Choisir l'accompagnement avec partage de revenus",
        note:
          "Les conditions détaillées du partage de revenus sont communiquées et doivent être consultées et acceptées avant toute inscription définitive. Ce choix est explicite et distinct du paiement classique de 50 000 FCFA.",
      },
    ],
    bonus: {
      title: "Bonus : Studio Créatif & Publicité Digitale",
      items: [
        "Génération de vidéos publicitaires UGC.",
        "Montage vidéo pour débutants.",
        "Motion design avancé.",
        "Introduction à la gestion des campagnes publicitaires.",
      ],
      note: "Ce bonus est inclus gratuitement dans les formules e-commerce concernées, selon les conditions de l'offre.",
    },
    faq: [
      {
        q: "Quelle formule choisir ?",
        a: "La formule autonome convient si vous avancez bien seul. Les formules accompagnées conviennent si vous souhaitez un suivi, des retours réguliers et une communauté.",
      },
      {
        q: "Comment fonctionne le partage de revenus ?",
        a: "Vous payez 30 000 FCFA au lieu de 50 000 FCFA, et 5 % de vos revenus pendant les trois premiers mois. Les conditions détaillées vous sont communiquées et doivent être acceptées avant l'inscription définitive.",
      },
      {
        q: "Le bonus publicité est-il payant ?",
        a: "Non, il est inclus gratuitement dans les formules e-commerce concernées, selon les conditions de l'offre.",
      },
    ],
    limits: [
      "Aucun niveau de revenus n'est promis : les résultats dépendent du produit, du marché et du travail fourni.",
      "Le partage de revenus fait l'objet de conditions contractuelles à consulter et accepter avant l'inscription définitive.",
      "L'inscription n'est définitive qu'après prise de contact et validation du paiement.",
    ],
  },
  {
    slug: "creation-publicitaire",
    title: "Créer des publicités vidéo qui captent l'attention",
    price: "15 000 FCFA",
    heroIntro:
      "Une formation pratique pour apprendre à concevoir des publicités vidéo efficaces : création UGC, montage, motion design et bases de la gestion de campagnes.",
    audience: [
      "Créateurs de contenu souhaitant produire des publicités pour des marques.",
      "Entrepreneurs voulant promouvoir leurs propres produits en vidéo.",
      "Débutants en montage et motion design cherchant un parcours structuré.",
    ],
    skills: [
      "Créer des vidéos publicitaires au format UGC.",
      "Monter une vidéo de bout en bout, même en partant de zéro.",
      "Produire des animations en motion design.",
      "Appliquer les principes de conception publicitaire.",
      "Comprendre les bases de la gestion de campagnes publicitaires.",
    ],
    modules: [
      {
        title: "Création de vidéos publicitaires UGC",
        points: [
          "Ce qu'est le contenu UGC et pourquoi les marques l'achètent.",
          "Structurer un script court qui capte l'attention.",
          "Tourner avec un téléphone : cadrage, lumière, son.",
        ],
      },
      {
        title: "Montage vidéo pour débutants",
        points: [
          "Prendre en main un logiciel de montage.",
          "Rythme, transitions, sous-titres : les bases qui font la différence.",
          "Exporter aux bons formats pour chaque plateforme.",
        ],
      },
      {
        title: "Motion design avancé",
        points: [
          "Animer textes, formes et éléments graphiques.",
          "Créer des habillages et des animations de produit.",
        ],
      },
      {
        title: "Principes de conception publicitaire",
        points: [
          "Accroche, preuve, appel à l'action : la structure d'une publicité.",
          "Adapter le message à l'audience et à la plateforme.",
        ],
      },
      {
        title: "Bases de la gestion de campagnes publicitaires",
        points: [
          "Comprendre les objectifs de campagne et les indicateurs de suivi.",
          "Premiers pas dans la diffusion d'une publicité en ligne.",
        ],
      },
    ],
    faq: [
      {
        q: "Faut-il du matériel professionnel ?",
        a: "Non. Un téléphone suffit pour débuter ; la formation explique comment obtenir un rendu soigné avec du matériel simple.",
      },
      {
        q: "La formation garantit-elle des revenus ou des clients ?",
        a: "Non. Elle transmet des compétences de création ; les débouchés dépendent de votre pratique et de votre prospection.",
      },
      {
        q: "Quels projets vais-je réaliser ?",
        a: "Des projets pratiques : une publicité UGC complète, un montage court formaté pour les réseaux et une animation en motion design.",
      },
    ],
    limits: [
      "Formation de compétences créatives : aucune performance publicitaire chiffrée n'est promise.",
      "L'inscription n'est définitive qu'après prise de contact et validation du paiement.",
    ],
  },
];

export const getFormation = (slug: string) => FORMATION_DETAILS.find((f) => f.slug === slug);
