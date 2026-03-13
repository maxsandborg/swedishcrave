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
  shipsTo: string[]
  affiliateUrl: string
  commission: string
  rating: number
  features: string[]
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
