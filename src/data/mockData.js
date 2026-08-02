export const MOCK_PRODUCTS = [
  // --- FOOTBALL EQUIPMENT ---
  {
    id: "mock-fb-ball-pro",
    title: "Ballon Pro Ligue 1 Uber Eats",
    subtitle: "Football - Compétition",
    brand: "Kipsta",
    description: "<h3>Performance d'élite</h3><p>Conçu pour les plus grandes scènes, ce ballon offre une précision de trajectoire inégalée grâce à sa construction thermocollée sans couture.</p><ul><li><strong>Matériau:</strong> Cuir synthétique PU premium</li><li><strong>Technologie:</strong> Vessie butyle pour une rétention d'air maximale</li><li><strong>Usage:</strong> Matchs officiels sur herbe naturelle</li><li><strong>Certification:</strong> FIFA Quality Pro</li></ul>",
    image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?q=80&w=1000&auto=format&fit=crop",
    ribbon_text: "OFFICIEL",
    rating: 5,
    review_count: 124,
    variants: [{ 
      id: "v-fb-ball-pro", 
      title: "Taille 5", 
      price_formatted: "140.00 DT", 
      price_in_cents: 14000,
      sale_price_in_cents: null,
      sale_price_formatted: null,
      inventory_quantity: 50,
      manage_inventory: true
    }],
    images: [
        { url: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?q=80&w=1000&auto=format&fit=crop" },
        { url: "https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=1000&auto=format&fit=crop" }
    ],
    purchasable: true
  },
  {
    id: "mock-fb-cones",
    title: "Kit d'Entraînement Agilité",
    subtitle: "Football - Entraînement",
    brand: "PowerShot",
    description: "<p>Améliorez votre jeu de jambes, votre vitesse et votre coordination avec ce set complet de 50 cônes de marquage.</p><ul><li><strong>Contenu:</strong> 50 cônes (10x 5 couleurs)</li><li><strong>Matériau:</strong> Plastique souple LDPE incassable</li><li><strong>Accessoire:</strong> Support de transport inclus</li><li><strong>Avantage:</strong> Haute visibilité sur tous terrains</li></ul>",
    image: "https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?q=80&w=1000&auto=format&fit=crop",
    ribbon_text: "ESSENTIEL",
    rating: 4.8,
    review_count: 45,
    variants: [{ 
      id: "v-fb-cones", 
      title: "Standard", 
      price_formatted: "45.00 DT", 
      price_in_cents: 4500, 
      sale_price_in_cents: null,
      sale_price_formatted: null,
      inventory_quantity: 100,
      manage_inventory: true
    }],
    images: [
        { url: "https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?q=80&w=1000&auto=format&fit=crop" },
        { url: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1000&auto=format&fit=crop" }
    ],
    purchasable: true
  },
  {
    id: "mock-fb-ladder",
    title: "Échelle de Rythme Pro",
    subtitle: "Football - Physique",
    brand: "PowerShot",
    description: "<p>L'outil indispensable pour développer l'explosivité et la fréquence gestuelle.</p><ul><li><strong>Longueur:</strong> 6 mètres</li><li><strong>Réglable:</strong> Échelons plats ajustables</li><li><strong>Sac:</strong> Housse de transport incluse</li><li><strong>Usage:</strong> Échauffement et travail pliométrique</li></ul>",
    image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    review_count: 32,
    variants: [{ 
      id: "v-fb-ladder", 
      title: "6 Mètres", 
      price_formatted: "55.00 DT", 
      price_in_cents: 5500, 
      sale_price_in_cents: 4500,
      sale_price_formatted: "45.00 DT",
      inventory_quantity: 30,
      manage_inventory: true
    }],
    images: [{ url: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000&auto=format&fit=crop" }],
    purchasable: true
  },

  // --- FOOTBALL CLOTHING ---
  {
    id: "mock-fb-cleats",
    title: "Chaussures Predator Elite FG",
    subtitle: "Football - Chaussures",
    brand: "Adidas",
    description: "<p>Dominez le terrain avec une adhérence et un contrôle de balle supérieurs. Conçues pour les terrains secs.</p><ul><li><strong>Tige:</strong> Synthétique texturé ControlSkin</li><li><strong>Semelle:</strong> Plaque TPU légère avec crampons moulés</li><li><strong>Confort:</strong> Chausson intégré pour un maintien parfait</li></ul>",
    image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=1000&auto=format&fit=crop",
    ribbon_text: "TOP VENTE",
    rating: 4.9,
    review_count: 89,
    variants: [
      { id: "v-fb-c-41", title: "41", price_formatted: "320.00 DT", price_in_cents: 32000, sale_price_in_cents: null, inventory_quantity: 4 },
      { id: "v-fb-c-42", title: "42", price_formatted: "320.00 DT", price_in_cents: 32000, sale_price_in_cents: null, inventory_quantity: 8 },
      { id: "v-fb-c-43", title: "43", price_formatted: "320.00 DT", price_in_cents: 32000, sale_price_in_cents: null, inventory_quantity: 6 }
    ],
    images: [
        { url: "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=1000&auto=format&fit=crop" },
        { url: "https://images.unsplash.com/photo-1562077772-3bd305261997?q=80&w=1000&auto=format&fit=crop" }
    ],
    purchasable: true
  },
  {
    id: "mock-fb-jersey",
    title: "Maillot Officiel Academy 24/25",
    subtitle: "Football - Textile",
    brand: "Nike",
    description: "<p>Portez les couleurs de l'ESPOIRS ACADEMY. Tissu technique respirant pour rester au sec pendant l'effort.</p><ul><li><strong>Technologie:</strong> Dri-Fit évacuation transpiration</li><li><strong>Coupe:</strong> Slim fit athlétique</li><li><strong>Composition:</strong> 100% Polyester recyclé</li></ul>",
    image: "https://images.unsplash.com/photo-1577212017184-80cc0da11282?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    review_count: 210,
    variants: [
      { id: "v-fb-j-s", title: "S", price_formatted: "85.00 DT", price_in_cents: 8500, sale_price_in_cents: null, inventory_quantity: 20 },
      { id: "v-fb-j-m", title: "M", price_formatted: "85.00 DT", price_in_cents: 8500, sale_price_in_cents: null, inventory_quantity: 35 },
      { id: "v-fb-j-l", title: "L", price_formatted: "85.00 DT", price_in_cents: 8500, sale_price_in_cents: null, inventory_quantity: 25 }
    ],
    images: [
        { url: "https://images.unsplash.com/photo-1577212017184-80cc0da11282?q=80&w=1000&auto=format&fit=crop" },
        { url: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=1000&auto=format&fit=crop" }
    ],
    purchasable: true
  },

  // --- FOOTBALL PROTECTION ---
  {
    id: "mock-fb-gloves",
    title: "Gants Gardien Predator Pro",
    subtitle: "Football - Gardien",
    brand: "Adidas",
    description: "<p>Arrêtez tous les tirs avec un grip exceptionnel.</p><ul><li><strong>Grip:</strong> Latex URG 2.0 de 4mm</li><li><strong>Coupe:</strong> Négative pour un contact balle optimal</li><li><strong>Protection:</strong> Sans barrettes pour plus de flexibilité</li></ul>",
    image: "https://images.unsplash.com/photo-1564846064857-c479f7283d8d?q=80&w=1000&auto=format&fit=crop",
    rating: 4.5,
    review_count: 18,
    variants: [{ id: "v-fb-g-9", title: "Taille 9", price_formatted: "120.00 DT", price_in_cents: 12000, sale_price_in_cents: 9900, sale_price_formatted: "99.00 DT", inventory_quantity: 12 }],
    images: [{ url: "https://images.unsplash.com/photo-1564846064857-c479f7283d8d?q=80&w=1000&auto=format&fit=crop" }],
    purchasable: true
  },

  // --- BASKETBALL EQUIPMENT ---
  {
    id: "mock-bb-ball",
    title: "Ballon Evolution Indoor",
    subtitle: "Basketball - Ballon",
    brand: "Wilson",
    description: "<p>Le ballon préféré des lycées et universités. Un toucher doux unique.</p><ul><li><strong>Matériau:</strong> Cuir composite microfibre exclusif</li><li><strong>Grip:</strong> Canaux composites grainés</li><li><strong>Usage:</strong> Salle (Indoor) uniquement</li></ul>",
    image: "https://images.unsplash.com/photo-1519861531473-920026393112?q=80&w=1000&auto=format&fit=crop",
    ribbon_text: "PREMIUM",
    rating: 5.0,
    review_count: 340,
    variants: [{ id: "v-bb-b7", title: "Taille 7", price_formatted: "150.00 DT", price_in_cents: 15000, sale_price_in_cents: null, inventory_quantity: 40 }],
    images: [
        { url: "https://images.unsplash.com/photo-1519861531473-920026393112?q=80&w=1000&auto=format&fit=crop" },
        { url: "https://images.unsplash.com/photo-1546519638-68e109498ad9?q=80&w=1000&auto=format&fit=crop" }
    ],
    purchasable: true
  },
  {
    id: "mock-bb-hoop",
    title: "Filet Anti-Whip Pro",
    subtitle: "Basketball - Accessoire",
    brand: "Spalding",
    description: "<p>Filet de compétition épais qui ne remonte pas.</p><ul><li><strong>Matériau:</strong> Polyester haute densité</li><li><strong>Poids:</strong> 180g (Standard FIBA)</li><li><strong>Installation:</strong> 12 boucles standard</li></ul>",
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=1000&auto=format&fit=crop",
    rating: 4.2,
    review_count: 22,
    variants: [{ id: "v-bb-net", title: "Blanc", price_formatted: "35.00 DT", price_in_cents: 3500, sale_price_in_cents: null, inventory_quantity: 100 }],
    images: [{ url: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=1000&auto=format&fit=crop" }],
    purchasable: true
  },

  // --- BASKETBALL CLOTHING ---
  {
    id: "mock-bb-shoes",
    title: "Air Zoom G.T. Jump",
    subtitle: "Basketball - Chaussures",
    brand: "Nike",
    description: "<p>Défiez la gravité. Système d'amorti maximal pour les joueurs explosifs.</p><ul><li><strong>Amorti:</strong> Double unité Zoom Air</li><li><strong>Tige:</strong> Lenoweave respirant et solide</li><li><strong>Maintien:</strong> Système de câbles Flywire</li></ul>",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    ribbon_text: "NOUVEAU",
    rating: 4.8,
    review_count: 56,
    variants: [
      { id: "v-bb-s-43", title: "43", price_formatted: "420.00 DT", price_in_cents: 42000, sale_price_in_cents: null, inventory_quantity: 5 },
      { id: "v-bb-s-44", title: "44", price_formatted: "420.00 DT", price_in_cents: 42000, sale_price_in_cents: null, inventory_quantity: 10 },
      { id: "v-bb-s-45", title: "45", price_formatted: "420.00 DT", price_in_cents: 42000, sale_price_in_cents: null, inventory_quantity: 3 }
    ],
    images: [
        { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop" },
        { url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop" }
    ],
    purchasable: true
  },
  {
    id: "mock-bb-shorts",
    title: "Short Basketball Performance",
    subtitle: "Basketball - Textile",
    brand: "Jordan",
    description: "<p>Coupe large pour une liberté de mouvement totale.</p><ul><li><strong>Longueur:</strong> Au genou</li><li><strong>Tissu:</strong> Mesh aéré léger</li><li><strong>Détail:</strong> Poches latérales profondes</li></ul>",
    image: "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=1000&auto=format&fit=crop",
    rating: 4.4,
    review_count: 80,
    variants: [{ id: "v-bb-sh-l", title: "L", price_formatted: "65.00 DT", price_in_cents: 6500, sale_price_in_cents: 5000, sale_price_formatted: "50.00 DT", inventory_quantity: 40 }],
    images: [{ url: "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=1000&auto=format&fit=crop" }],
    purchasable: true
  },

  // --- TENNIS EQUIPMENT ---
  {
    id: "mock-tn-racket",
    title: "Pure Drive 300g",
    subtitle: "Tennis - Raquette",
    brand: "Babolat",
    description: "<p>La puissance légendaire pour tous les joueurs. La référence mondiale.</p><ul><li><strong>Poids:</strong> 300g (non cordée)</li><li><strong>Tamis:</strong> 645 cm²</li><li><strong>Plan de cordage:</strong> 16x19</li><li><strong>Technologie:</strong> FSI Power pour plus de spin</li></ul>",
    image: "https://images.unsplash.com/photo-1622163642998-1ea36b1adde3?q=80&w=1000&auto=format&fit=crop",
    ribbon_text: "BESTSELLER",
    rating: 4.9,
    review_count: 412,
    variants: [
      { id: "v-tn-r-2", title: "Grip 2", price_formatted: "450.00 DT", price_in_cents: 45000, sale_price_in_cents: null, inventory_quantity: 8 },
      { id: "v-tn-r-3", title: "Grip 3", price_formatted: "450.00 DT", price_in_cents: 45000, sale_price_in_cents: null, inventory_quantity: 15 }
    ],
    images: [
        { url: "https://images.unsplash.com/photo-1622163642998-1ea36b1adde3?q=80&w=1000&auto=format&fit=crop" },
        { url: "https://images.unsplash.com/photo-1617083934555-ac7d4fee8909?q=80&w=1000&auto=format&fit=crop" }
    ],
    purchasable: true
  },
  {
    id: "mock-tn-balls",
    title: "Balles US Open (Tube x4)",
    subtitle: "Tennis - Balles",
    brand: "Wilson",
    description: "<p>Balle officielle du tournoi du Grand Chelem. Performance premium sur dur.</p><ul><li><strong>Type:</strong> Pression</li><li><strong>Feutre:</strong> Extra Duty pour durabilité accrue</li><li><strong>Homologation:</strong> ITF & FFT</li></ul>",
    image: "https://images.unsplash.com/photo-1554068865-241318888476?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    review_count: 150,
    variants: [{ id: "v-tn-b4", title: "Tube x4", price_formatted: "28.00 DT", price_in_cents: 2800, sale_price_in_cents: null, inventory_quantity: 200 }],
    images: [
        { url: "https://images.unsplash.com/photo-1554068865-241318888476?q=80&w=1000&auto=format&fit=crop" },
        { url: "https://images.unsplash.com/photo-1592709823125-a191f07a2a5e?q=80&w=1000&auto=format&fit=crop" }
    ],
    purchasable: true
  },
  {
    id: "mock-tn-bag",
    title: "Sac RH12 Pure Aero",
    subtitle: "Tennis - Bagagerie",
    brand: "Babolat",
    description: "<p>Le sac des champions. Capacité 12 raquettes avec protection thermique.</p><ul><li><strong>Compartiments:</strong> 3 principaux dont 2 isothermes</li><li><strong>Poche:</strong> Chaussures ventilée séparée</li><li><strong>Portage:</strong> Bretelles sac à dos ergonomiques</li></ul>",
    image: "https://images.unsplash.com/photo-1601256506071-74dd30869218?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    review_count: 45,
    variants: [{ id: "v-tn-bag", title: "Jaune/Noir", price_formatted: "250.00 DT", price_in_cents: 25000, sale_price_in_cents: 22000, sale_price_formatted: "220.00 DT", inventory_quantity: 10 }],
    images: [{ url: "https://images.unsplash.com/photo-1601256506071-74dd30869218?q=80&w=1000&auto=format&fit=crop" }],
    purchasable: true
  }
];