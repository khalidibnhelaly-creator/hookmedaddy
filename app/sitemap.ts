import type { MetadataRoute } from 'next'

const BASE = 'https://hookmedaddy.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/what-is-hookmedaddy`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/schwartz-awareness-pyramid`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/best-ai-hook-generator`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/how-to-write-facebook-ad-hooks`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/compare/chatgpt-vs-hookmedaddy`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/compare/jasper-vs-hookmedaddy`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/compare/copy-ai-vs-hookmedaddy`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/refund`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
