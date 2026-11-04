const p2p = "/images/formation-p2p.jpg";
const web3 = "/images/formation-web3.jpg";
const ecommerce = "/images/formation-ecommerce.jpg";
const creation = "/images/formation-creation.jpg";

export const formationVisuals: Record<string, { image: string; category: string; alt: string }> = {
  "trading-p2p": { image: p2p, category: "Trading P2P", alt: "Sculpture de deux arches reliées évoquant l'échange entre utilisateurs" },
  "crypto-blockchain-web3": { image: web3, category: "Crypto · Blockchain · Web3", alt: "Cubes de verre reliés en chaîne, illustration de la blockchain" },
  "ecommerce-produits-digitaux": { image: ecommerce, category: "E-commerce · Produits digitaux", alt: "Livres, carte et sac de verre évoquant les produits digitaux" },
  "creation-publicitaire": { image: creation, category: "UGC · Vidéo · Motion design", alt: "Objectif et clap de cinéma évoquant la création publicitaire" },
};