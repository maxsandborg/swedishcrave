/**
 * Physical Swedish candy store locations across the USA.
 * Used by /stores/near-me for the interactive Leaflet map.
 *
 * Every entry has been manually verified (March 2026) against
 * Yelp, Google Maps, and the store's own website.
 */

export interface PhysicalStore {
  /** Unique id — kebab-case, used as React key */
  id: string
  /** Display name */
  name: string
  /** Full street address */
  address: string
  /** City name (used for filtering) */
  city: string
  /** US state abbreviation */
  state: string
  /** Latitude */
  lat: number
  /** Longitude */
  lng: number
  /** Store website */
  website: string
  /** Online shop URL (null if no e-commerce) */
  shopUrl: string | null
  /** Affiliate link if we have one (null otherwise) */
  affiliateUrl: string | null
  /** Opening hours summary */
  hours: string
  /** Phone number */
  phone: string
  /** One-line store description */
  description: string
  /** What makes this store special */
  highlights: string[]
  /** Slug on SwedishCrave /stores/[slug] page, if one exists */
  storePageSlug: string | null
  /** Store status */
  status: 'open' | 'coming-soon'
  /** Type of candy experience */
  type: 'dedicated' | 'pick-and-mix' | 'specialty'
  /** Instagram handle (without @) */
  instagram: string | null
}

export const physicalStores: PhysicalStore[] = [
  // ═══════════════════════════════════════════════
  // NEW YORK CITY
  // ═══════════════════════════════════════════════

  // CandyKing — West Village
  {
    id: 'candyking-nyc',
    name: 'CandyKing NYC',
    address: '306 Bleecker St, New York, NY 10014',
    city: 'New York',
    state: 'NY',
    lat: 40.7321,
    lng: -74.0035,
    website: 'https://candyking.com/en_us/',
    shopUrl: null,
    affiliateUrl: null,
    hours: 'Mon–Tue 12–7pm · Wed–Fri 12–8pm · Sat 11am–8pm · Sun 11am–7pm',
    phone: '',
    description: "Europe's largest pick-and-mix brand. First US flagship store with a 27-foot candy wall and 200+ varieties.",
    highlights: ['27-foot candy wall', '200+ varieties', 'First US store', 'Pick-and-mix by weight', 'Owned by Cloetta'],
    storePageSlug: null,
    status: 'open',
    type: 'pick-and-mix',
    instagram: 'candyking_nyc',
  },

  // BonBon — LES (Allen St)
  {
    id: 'bonbon-allen',
    name: 'BonBon NYC — Lower East Side',
    address: '130 Allen St, New York, NY 10002',
    city: 'New York',
    state: 'NY',
    lat: 40.7198,
    lng: -73.9898,
    website: 'https://bonbonnyc.com',
    shopUrl: 'https://bonbonnyc.com',
    affiliateUrl: null,
    hours: 'Daily 10am–12am',
    phone: '',
    description: 'TikTok-famous Swedish candy store with stunning pick-and-mix walls. The original flagship.',
    highlights: ['Pick-and-mix walls', 'TikTok-famous', 'Open until midnight', '100% Swedish imports'],
    storePageSlug: 'bonbon-nyc',
    status: 'open',
    type: 'pick-and-mix',
    instagram: 'bonbonnyc_',
  },

  // BonBon — Greenwich Ave
  {
    id: 'bonbon-greenwich',
    name: 'BonBon NYC — Greenwich Village',
    address: '119 Greenwich Ave, New York, NY 10014',
    city: 'New York',
    state: 'NY',
    lat: 40.7366,
    lng: -73.9998,
    website: 'https://bonbonnyc.com',
    shopUrl: 'https://bonbonnyc.com',
    affiliateUrl: null,
    hours: 'Daily 10am–12am',
    phone: '',
    description: 'BonBon\'s Greenwich Village location with the full pick-and-mix experience.',
    highlights: ['Pick-and-mix walls', 'Open until midnight', 'Greenwich Village location'],
    storePageSlug: 'bonbon-nyc',
    status: 'open',
    type: 'pick-and-mix',
    instagram: 'bonbonnyc_',
  },

  // BonBon — Washington St
  {
    id: 'bonbon-washington',
    name: 'BonBon NYC — Financial District',
    address: '9 Washington St, New York, NY 10004',
    city: 'New York',
    state: 'NY',
    lat: 40.7033,
    lng: -74.0134,
    website: 'https://bonbonnyc.com',
    shopUrl: 'https://bonbonnyc.com',
    affiliateUrl: null,
    hours: 'Daily 10am–12am',
    phone: '',
    description: 'BonBon\'s Financial District location near the Staten Island Ferry terminal.',
    highlights: ['Pick-and-mix walls', 'Open until midnight', 'Near Battery Park'],
    storePageSlug: 'bonbon-nyc',
    status: 'open',
    type: 'pick-and-mix',
    instagram: 'bonbonnyc_',
  },

  // BonBon — Upper East Side
  {
    id: 'bonbon-ues',
    name: 'BonBon NYC — Upper East Side',
    address: '1220 Lexington Ave, New York, NY 10028',
    city: 'New York',
    state: 'NY',
    lat: 40.7793,
    lng: -73.9567,
    website: 'https://bonbonnyc.com',
    shopUrl: 'https://bonbonnyc.com',
    affiliateUrl: null,
    hours: 'Daily 10am–12am',
    phone: '',
    description: 'BonBon\'s Upper East Side location on Lexington Ave.',
    highlights: ['Pick-and-mix walls', 'Open until midnight', 'Upper East Side'],
    storePageSlug: 'bonbon-nyc',
    status: 'open',
    type: 'pick-and-mix',
    instagram: 'bonbonnyc_',
  },

  // BonBon — Driggs Ave, Brooklyn
  {
    id: 'bonbon-driggs',
    name: 'BonBon NYC — Williamsburg',
    address: '705 Driggs Ave, Brooklyn, NY 11211',
    city: 'Brooklyn',
    state: 'NY',
    lat: 40.7155,
    lng: -73.9535,
    website: 'https://bonbonnyc.com',
    shopUrl: 'https://bonbonnyc.com',
    affiliateUrl: null,
    hours: 'Daily 10am–12am',
    phone: '',
    description: 'BonBon\'s Williamsburg Brooklyn location on Driggs Ave.',
    highlights: ['Pick-and-mix walls', 'Open until midnight', 'Williamsburg Brooklyn'],
    storePageSlug: 'bonbon-nyc',
    status: 'open',
    type: 'pick-and-mix',
    instagram: 'bonbonnyc_',
  },

  // BonBon — Degraw St, Red Hook
  {
    id: 'bonbon-redhook',
    name: 'BonBon NYC — Red Hook Warehouse',
    address: '66 Degraw St, Brooklyn, NY 11231',
    city: 'Brooklyn',
    state: 'NY',
    lat: 40.6836,
    lng: -73.9988,
    website: 'https://bonbonnyc.com',
    shopUrl: 'https://bonbonnyc.com',
    affiliateUrl: null,
    hours: 'Fri–Sun 11am–7pm (weekends only)',
    phone: '',
    description: 'BonBon\'s Red Hook warehouse and candy library. Weekend-only pop-up experience.',
    highlights: ['Warehouse candy library', 'Weekend-only', 'Unique experience'],
    storePageSlug: 'bonbon-nyc',
    status: 'open',
    type: 'pick-and-mix',
    instagram: 'bonbonnyc_',
  },

  // Lil Sweet Treat — West Village
  {
    id: 'lilsweettreat-wv',
    name: 'Lil Sweet Treat — West Village',
    address: '184 7th Ave S, New York, NY 10014',
    city: 'New York',
    state: 'NY',
    lat: 40.7350,
    lng: -74.0010,
    website: 'https://lilsweettreat.com',
    shopUrl: 'https://lilsweettreat.com',
    affiliateUrl: null,
    hours: 'Daily 11am–11pm',
    phone: '',
    description: 'Viral candy shop with globally sourced sweets including a curated Swedish candy section.',
    highlights: ['Swedish candy section', 'Viral on social media', 'Open late', 'Nationwide shipping'],
    storePageSlug: 'lil-sweet-treat',
    status: 'open',
    type: 'specialty',
    instagram: 'lil.sweet.treat',
  },

  // Lil Sweet Treat — Rockefeller Center
  {
    id: 'lilsweettreat-rock',
    name: 'Lil Sweet Treat — Rockefeller Center',
    address: '30 Rockefeller Plz, New York, NY 10112',
    city: 'New York',
    state: 'NY',
    lat: 40.7587,
    lng: -73.9787,
    website: 'https://lilsweettreat.com',
    shopUrl: 'https://lilsweettreat.com',
    affiliateUrl: null,
    hours: 'Daily 11am–8pm',
    phone: '',
    description: 'Lil Sweet Treat\'s Rockefeller Center location at the Rink level.',
    highlights: ['Rockefeller Center', 'Tourist-friendly', 'Swedish candy section'],
    storePageSlug: 'lil-sweet-treat',
    status: 'open',
    type: 'specialty',
    instagram: 'lil.sweet.treat',
  },

  // ═══════════════════════════════════════════════
  // LOS ANGELES / CALIFORNIA
  // ═══════════════════════════════════════════════

  // Sockerbit — LA
  {
    id: 'sockerbit-la',
    name: 'Sockerbit',
    address: '7922 W 3rd St, Los Angeles, CA 90048',
    city: 'Los Angeles',
    state: 'CA',
    lat: 34.0716,
    lng: -118.3615,
    website: 'https://sockerbit.com',
    shopUrl: 'https://sockerbit.com',
    affiliateUrl: null,
    hours: 'Sun–Thu 11am–9pm · Fri–Sat 11am–11pm',
    phone: '(323) 951-0402',
    description: 'The OG Swedish candy store in LA. Pick-and-mix since 2010, founded by Swedish husband-and-wife team.',
    highlights: ['Pick-and-mix', 'Founded 2010', 'Online shop available', 'Swedish-owned'],
    storePageSlug: 'sockerbit',
    status: 'open',
    type: 'pick-and-mix',
    instagram: 'sockerbit',
  },

  // Kändi — Studio City
  {
    id: 'kandi-studio-city',
    name: 'Kändi — Studio City',
    address: '12188 Ventura Blvd, Studio City, CA 91604',
    city: 'Los Angeles',
    state: 'CA',
    lat: 34.1427,
    lng: -118.3926,
    website: 'https://www.swedishkandi.com',
    shopUrl: 'https://www.swedishkandi.com',
    affiliateUrl: null,
    hours: 'Mon–Thu 11am–9pm · Fri–Sat 11am–10pm · Sun 11am–9pm',
    phone: '(818) 358-2009',
    description: 'Trendy Swedish pick-and-mix in Studio City on Ventura Blvd. TikTok-viral lösgodis experience.',
    highlights: ['Pick-and-mix lösgodis', 'TikTok-viral', 'Delivery via Grubhub', 'Open late'],
    storePageSlug: 'kandi',
    status: 'open',
    type: 'pick-and-mix',
    instagram: 'kandistudiocity',
  },

  // Kändi — Santa Monica (coming soon)
  {
    id: 'kandi-santa-monica',
    name: 'Kändi — Santa Monica',
    address: '1230 Montana Ave, Suite 103, Santa Monica, CA 90403',
    city: 'Santa Monica',
    state: 'CA',
    lat: 34.0340,
    lng: -118.4990,
    website: 'https://www.swedishkandi.com',
    shopUrl: 'https://www.swedishkandi.com',
    affiliateUrl: null,
    hours: 'Coming soon — Spring 2026',
    phone: '',
    description: 'Kändi\'s second location on Montana Avenue. Opening Spring 2026.',
    highlights: ['Second location', 'Montana Ave retail corridor', 'Opening Spring 2026'],
    storePageSlug: 'kandi',
    status: 'coming-soon',
    type: 'pick-and-mix',
    instagram: 'kandistudiocity',
  },

  // Swedish Candy Factory — Solvang
  {
    id: 'swedish-candy-factory-solvang',
    name: 'Swedish Candy Factory',
    address: '485 Alisal Rd, Ste 125, Solvang, CA 93463',
    city: 'Solvang',
    state: 'CA',
    lat: 34.5957,
    lng: -120.1376,
    website: 'https://www.swedishcandyfactory.com',
    shopUrl: 'https://www.swedishcandyfactory.com',
    affiliateUrl: null,
    hours: 'Sun–Mon & Wed–Sat 10am–5pm · Closed Tue',
    phone: '(805) 697-7479',
    description: 'The only Polkagris bakery in the USA. Hand-made Swedish candy using a 150-year-old method in Solvang\'s Danish village.',
    highlights: ['Only US Polkagris bakery', 'Hand-made on-site', '150-year-old method', 'Historic Solvang'],
    storePageSlug: null,
    status: 'open',
    type: 'specialty',
    instagram: null,
  },

  // ═══════════════════════════════════════════════
  // SAN FRANCISCO
  // ═══════════════════════════════════════════════

  // The Candy Store — Russian Hill
  {
    id: 'candy-store-sf',
    name: 'The Candy Store',
    address: '1507 Vallejo St, San Francisco, CA 94109',
    city: 'San Francisco',
    state: 'CA',
    lat: 37.7967,
    lng: -122.4223,
    website: 'https://www.thecandystoresf.com',
    shopUrl: 'https://www.thecandystoresf.com',
    affiliateUrl: null,
    hours: 'Tue–Sat 11am–5pm · Closed Sun–Mon',
    phone: '(415) 921-8000',
    description: 'Boutique candy shop in Russian Hill with a dedicated Swedish candy section. Known for hard-to-find imports and Swedish licorice.',
    highlights: ['Dedicated Swedish section', 'Hard-to-find imports', 'Swedish licorice specialist', 'Boutique experience'],
    storePageSlug: null,
    status: 'open',
    type: 'specialty',
    instagram: null,
  },

  // ═══════════════════════════════════════════════
  // FLORIDA
  // ═══════════════════════════════════════════════

  // The Pirate Candy Shop — Tampa
  {
    id: 'pirate-candy-tampa',
    name: 'The Pirate Candy Shop',
    address: '716 S Village Cir, Tampa, FL 33606',
    city: 'Tampa',
    state: 'FL',
    lat: 27.9365,
    lng: -82.4733,
    website: 'https://www.thepiratecandyshop.com',
    shopUrl: 'https://www.thepiratecandyshop.com',
    affiliateUrl: null,
    hours: 'Mon–Thu 10am–8pm · Fri–Sat 10am–9pm · Sun 11am–6pm',
    phone: '(813) 957-5286',
    description: 'Tampa Bay\'s first Swedish candy shop in Hyde Park Village. Pick-and-mix, BUBS candy, and Swedish beverages.',
    highlights: ['First Swedish candy shop in Tampa Bay', 'BUBS candy', 'Hyde Park Village', 'Pick-and-mix'],
    storePageSlug: 'pirate-candy-shop',
    status: 'open',
    type: 'pick-and-mix',
    instagram: 'thepiratecandyshop',
  },

  // ScandyCandy — Coral Gables
  {
    id: 'scandycandy-coral-gables',
    name: 'ScandyCandy',
    address: '241 Miracle Mile, Coral Gables, FL 33134',
    city: 'Coral Gables',
    state: 'FL',
    lat: 25.7492,
    lng: -80.2592,
    website: 'https://scandycandy.store',
    shopUrl: 'https://scandycandy.store',
    affiliateUrl: null,
    hours: 'Check website for current hours',
    phone: '',
    description: '100% Swedish candy store on Miracle Mile. Founded by Swedish brothers Calle and Wille Olsen. Pick-and-mix wall plus online exclusives.',
    highlights: ['100% Swedish candy', 'Pick-and-mix wall', 'Swedish-owned', 'Miracle Mile location'],
    storePageSlug: 'scandycandy',
    status: 'open',
    type: 'pick-and-mix',
    instagram: 'scandycandystore',
  },

  // ═══════════════════════════════════════════════
  // MASSACHUSETTS
  // ═══════════════════════════════════════════════

  // Nantasket Sweets — Hull (main)
  {
    id: 'nantasket-hull',
    name: 'Nantasket Sweets by Swedes — Hull',
    address: '165 Nantasket Ave, Hull, MA 02045',
    city: 'Hull',
    state: 'MA',
    lat: 42.2750,
    lng: -70.8620,
    website: 'https://www.nantasketsweets.com',
    shopUrl: 'https://www.nantasketsweets.com',
    affiliateUrl: null,
    hours: 'Check website for seasonal hours',
    phone: '(781) 490-0500',
    description: 'The original Nantasket Sweets location. Swedish candy, baked goods, and a beach-town vibe.',
    highlights: ['Original location', 'Swedish baked goods', 'Beachside location', 'Online shop'],
    storePageSlug: 'nantasket-sweets',
    status: 'open',
    type: 'dedicated',
    instagram: null,
  },

  // Nantasket Sweets — Hingham
  {
    id: 'nantasket-hingham',
    name: 'Nantasket Sweets by Swedes — Hingham',
    address: '79 Water St, Hingham, MA 02043',
    city: 'Hingham',
    state: 'MA',
    lat: 42.2424,
    lng: -70.8876,
    website: 'https://www.nantasketsweets.com',
    shopUrl: 'https://www.nantasketsweets.com',
    affiliateUrl: null,
    hours: 'Daily 8am–7pm',
    phone: '',
    description: 'Nantasket Sweets\' Hingham location on Water Street.',
    highlights: ['Daily hours', 'Water Street location'],
    storePageSlug: 'nantasket-sweets',
    status: 'open',
    type: 'dedicated',
    instagram: null,
  },

  // Nantasket Sweets — Milton
  {
    id: 'nantasket-milton',
    name: 'Nantasket Sweets by Swedes — Milton',
    address: '10 Bassett St, Milton, MA 02186',
    city: 'Milton',
    state: 'MA',
    lat: 42.2498,
    lng: -71.0662,
    website: 'https://www.nantasketsweets.com',
    shopUrl: 'https://www.nantasketsweets.com',
    affiliateUrl: null,
    hours: 'Daily 8am–7pm',
    phone: '',
    description: 'Nantasket Sweets\' Milton location on Bassett Street.',
    highlights: ['Daily hours', 'Convenient location'],
    storePageSlug: 'nantasket-sweets',
    status: 'open',
    type: 'dedicated',
    instagram: null,
  },

  // Nantasket Sweets — Cohasset
  {
    id: 'nantasket-cohasset',
    name: 'Nantasket Sweets by Swedes — Cohasset',
    address: '50 S Main St, Cohasset, MA 02025',
    city: 'Cohasset',
    state: 'MA',
    lat: 42.2406,
    lng: -70.8063,
    website: 'https://www.nantasketsweets.com',
    shopUrl: 'https://www.nantasketsweets.com',
    affiliateUrl: null,
    hours: 'Daily 10am–7pm',
    phone: '',
    description: 'Nantasket Sweets\' Cohasset location on South Main Street.',
    highlights: ['South Shore location', 'Daily hours'],
    storePageSlug: 'nantasket-sweets',
    status: 'open',
    type: 'dedicated',
    instagram: null,
  },

  // Nantasket Sweets — West Newton
  {
    id: 'nantasket-west-newton',
    name: 'Nantasket Sweets by Swedes — West Newton',
    address: '206 Waltham St, West Newton, MA 02465',
    city: 'West Newton',
    state: 'MA',
    lat: 42.3486,
    lng: -71.2262,
    website: 'https://www.nantasketsweets.com',
    shopUrl: 'https://www.nantasketsweets.com',
    affiliateUrl: null,
    hours: 'Check website for hours',
    phone: '',
    description: 'Nantasket Sweets\' West Newton location.',
    highlights: ['Greater Boston area', 'Swedish candy and treats'],
    storePageSlug: 'nantasket-sweets',
    status: 'open',
    type: 'dedicated',
    instagram: null,
  },

  // ═══════════════════════════════════════════════
  // PENNSYLVANIA
  // ═══════════════════════════════════════════════

  // Sweetish — Lancaster
  {
    id: 'sweetish-lancaster',
    name: 'Sweetish Candy',
    address: '301 N Queen St, Lancaster, PA 17603',
    city: 'Lancaster',
    state: 'PA',
    lat: 40.0426,
    lng: -76.3055,
    website: 'https://www.sweetishcandy.com',
    shopUrl: 'https://www.sweetishcandy.com',
    affiliateUrl: null,
    hours: 'Tue–Sat 10am–6pm · Sun 11am–5pm · Closed Mon',
    phone: '(717) 621-2920',
    description: 'Pick-and-mix candy wall with 70+ Swedish varieties plus Scandinavian grocery items in downtown Lancaster.',
    highlights: ['70+ varieties', 'Pick-and-mix wall', 'Scandinavian groceries', 'Downtown Lancaster'],
    storePageSlug: 'sweetish-candy',
    status: 'open',
    type: 'pick-and-mix',
    instagram: 'sweetishcandystore',
  },

  // ═══════════════════════════════════════════════
  // TEXAS
  // ═══════════════════════════════════════════════

  // Swedish Candy Culture — Fort Worth (coming soon)
  {
    id: 'swedish-candy-culture-ftworth',
    name: 'Swedish Candy Culture',
    address: '3613 W Vickery Blvd, Fort Worth, TX 76107',
    city: 'Fort Worth',
    state: 'TX',
    lat: 32.7321,
    lng: -97.3619,
    website: '',
    shopUrl: null,
    affiliateUrl: null,
    hours: 'Coming soon — Spring 2026',
    phone: '',
    description: 'Fort Worth\'s first Swedish candy store. 200+ varieties imported directly from Sweden. Founded by Swedish-American couple Crimson & Lukas Nathanson.',
    highlights: ['200+ varieties', 'Direct Sweden imports', 'Swedish-American owned', 'Opening Spring 2026'],
    storePageSlug: null,
    status: 'coming-soon',
    type: 'pick-and-mix',
    instagram: null,
  },
]

// ─── Helper functions ───

/** Get all open stores */
export function getOpenStores(): PhysicalStore[] {
  return physicalStores.filter((s) => s.status === 'open')
}

/** Get all stores including coming-soon */
export function getAllPhysicalStores(): PhysicalStore[] {
  return physicalStores
}

/** Get unique states that have stores */
export function getStoreStates(): string[] {
  return Array.from(new Set(physicalStores.map((s) => s.state))).sort()
}

/** Get unique cities that have stores */
export function getStoreCities(): string[] {
  return Array.from(new Set(physicalStores.map((s) => s.city))).sort()
}

/** Get stores by state */
export function getStoresByState(state: string): PhysicalStore[] {
  return physicalStores.filter((s) => s.state === state)
}

/** Get stores that have online shops (monetizable) */
export function getStoresWithShop(): PhysicalStore[] {
  return physicalStores.filter((s) => s.shopUrl !== null)
}

/** Count unique brands (deduplicated by first segment of id) */
export function getUniqueBrandCount(): number {
  const brands = new Set(physicalStores.map((s) => {
    // BonBon has multiple, Nantasket has multiple, etc.
    if (s.id.startsWith('bonbon-')) return 'bonbon'
    if (s.id.startsWith('nantasket-')) return 'nantasket'
    if (s.id.startsWith('lilsweettreat-')) return 'lilsweettreat'
    if (s.id.startsWith('kandi-')) return 'kandi'
    return s.id
  }))
  return brands.size
}
