import { candyItems } from '@/data/candy'
import { brands } from '@/data/brands'
import { categories } from '@/data/categories'
import { stores } from '@/data/stores'

export function getCandyBySlug(slug: string) {
  return candyItems.find((c) => c.slug === slug)
}

export function getCandyByBrand(brandSlug: string) {
  return candyItems.filter((c) => c.brandSlug === brandSlug)
}

export function getCandyByCategory(categorySlug: string) {
  return candyItems.filter((c) => c.category.includes(categorySlug))
}

export function getFeaturedCandy() {
  return candyItems.filter((c) => c.featured)
}

export function getTrendingCandy() {
  return candyItems.filter((c) => c.trending)
}

export function getBrandBySlug(slug: string) {
  return brands.find((b) => b.slug === slug)
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function getStoreBySlug(slug: string) {
  return stores.find((s) => s.slug === slug)
}

export function getAllCandySlugs() {
  return candyItems.map((c) => c.slug)
}

export function getAllBrandSlugs() {
  return brands.map((b) => b.slug)
}

export function getAllCategorySlugs() {
  return categories.map((c) => c.slug)
}

export function getRelatedCandy(slug: string, limit = 4) {
  const candy = getCandyBySlug(slug)
  if (!candy) return []
  return candyItems
    .filter(
      (c) =>
        c.slug !== slug &&
        (c.brandSlug === candy.brandSlug ||
          c.category.some((cat) => candy.category.includes(cat)))
    )
    .slice(0, limit)
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function getCategoryName(slug: string): string {
  const cat = categories.find((c) => c.slug === slug)
  return cat ? cat.name : slug.charAt(0).toUpperCase() + slug.slice(1)
}
