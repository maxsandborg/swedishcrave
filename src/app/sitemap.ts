import { MetadataRoute } from 'next';
import { candyItems } from '@/data/candy';
import { brands } from '@/data/brands';
import { categories } from '@/data/categories';
import { articles } from '@/data/articles';
import { stores } from '@/data/stores';

const baseUrl = 'https://www.swedishcrave.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const candyPages = candyItems.map((candy) => ({
    url: `${baseUrl}/candy/${candy.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const brandPages = brands.map((brand) => ({
    url: `${baseUrl}/brands/${brand.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const articlePages = articles.filter((article) => article.status === 'published').map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: article.priority === 'P1' ? 0.9 : article.priority === 'P2' ? 0.7 : 0.6,
  }));

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/where-to-buy`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  const storePages = stores.map((store) => ({
    url: `${baseUrl}/stores/${store.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: store.featured ? 0.8 : 0.7,
  }));

  return [...staticPages, ...candyPages, ...brandPages, ...categoryPages, ...articlePages, ...storePages];
}
