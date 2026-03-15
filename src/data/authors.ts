export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  shortBio: string;
  credentials: string[];
  image?: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export const authors: Record<string, Author> = {
  'max-sandborg': {
    id: 'max-sandborg',
    name: 'Max Sandborg',
    slug: 'max-sandborg',
    role: 'Founder & Editor',
    bio: 'Max worked in the Swedish candy and FMCG industry before moving to the United States — where he quickly realized that most Americans had never heard of Swedish candy, and those who had couldn\'t find reliable information in English. That gap became SwedishCrave: honest reviews, real ratings, and buying guides written by someone with firsthand industry experience and a lifetime of lördagsgodis Saturdays behind him. Max has personally tasted and reviewed over 150 Swedish candy products for the site and maintains relationships with importers and retailers to ensure every recommendation is available and fairly priced.',
    shortBio: 'Former Swedish candy & FMCG professional turned US-based founder of SwedishCrave. Built the site to fill the gap he saw when he moved stateside.',
    credentials: [
      'Swedish candy & FMCG industry background',
      'Born and raised in Sweden',
      '150+ products reviewed',
      'Founder of SwedishCrave',
    ],
    image: '/images/authors/max-sandborg.jpg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/max-sandborg-53155ab5/',
    },
  },
  'kelci-napier': {
    id: 'kelci-napier',
    name: 'Kelci Napier',
    slug: 'kelci-napier',
    role: 'Health & Nutrition Contributor',
    bio: 'Kelci is a registered nurse who contributes SwedishCrave\'s health and ingredient-focused content. She breaks down what\'s actually in Swedish candy versus American alternatives, explains EU food regulations in plain English, and helps readers navigate allergens and dietary restrictions. Her goal is to give people the facts — not fear-mongering — so they can make their own informed choices about what they eat.',
    shortBio: 'Registered nurse covering health, ingredients, and food safety for SwedishCrave — facts over fear-mongering.',
    credentials: [
      'Registered Nurse (RN)',
    ],
    socials: {},
  },
};

export function getAuthorById(id: string): Author | undefined {
  return authors[id];
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return Object.values(authors).find((a) => a.slug === slug);
}

/** Map from old 'SwedishCrave' author string to the correct author ID */
export function resolveAuthorId(articleAuthor: string, silo: string): string {
  if (silo === 'health-ingredients') {
    return 'kelci-napier';
  }
  return 'max-sandborg';
}
