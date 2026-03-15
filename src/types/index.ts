export type CandyItem = {
  slug: string
  name: string
  brand: string
  brandSlug: string
  category: string[]
  rating: {
    sweetness: number
    saltiness: number
    texture: number
    uniqueness: number
    overall: number
  }
  flavorProfile: string[]
  description: string
  longDescription: string
  affiliateLinks: AffiliateLink[]
  image: string
  featured: boolean
  trending: boolean
  tags: string[]
  origin: string
  weight: string
  priceRange: string
}

export type AffiliateLink = {
  store: string
  storeSlug: string
  url: string
  price?: string
}

export type Brand = {
  slug: string
  name: string
  country: string
  description: string
  longDescription: string
  founded: string
  logo: string
  website: string
  candySlugs: string[]
}

export type Category = {
  slug: string
  name: string
  description: string
  longDescription: string
  image: string
  candySlugs: string[]
}

export type Store = {
  slug: string
  name: string
  url: string
  description: string
  longDescription: string
  shipsTo: string[]
  affiliateUrl: string
  commission: string
  rating: number
  featured?: boolean
  features: string[]
  founded?: string
  headquarters?: string
  storeType: 'online' | 'physical' | 'both' | 'marketplace'
  specialties: string[]
  pros: string[]
  cons: string[]
  shippingInfo: string
  priceRange: '$' | '$$' | '$$$'
  physicalLocations?: string[]
}

export type Comparison = {
  slug: string
  item1Slug: string
  item2Slug: string
  title: string
  description: string
  verdict: string
}

export type BestList = {
  slug: string
  title: string
  description: string
  candySlugs: string[]
}

export type ArticleSilo =
  | 'beginner-guides'
  | 'brand-deep-dives'
  | 'best-of'
  | 'vs-comparisons'
  | 'where-to-buy'
  | 'health-ingredients'
  | 'culture-lifestyle'
  | 'category-deep-dives'

export type ArticleStatus = 'draft' | 'published'

export type Article = {
  id: number
  slug: string
  title: string
  silo: ArticleSilo
  seoTitle: string
  metaDescription: string
  h1: string
  intro: string
  content: string
  heroImage: string
  heroImageAlt: string
  author: string
  publishedAt: string
  updatedAt: string
  estimatedReadTime: number
  tags: string[]
  relatedArticleSlugs: string[]
  relatedCandySlugs: string[]
  relatedBrandSlugs: string[]
  priority: 'P1' | 'P2' | 'P3'
  status: ArticleStatus
}
