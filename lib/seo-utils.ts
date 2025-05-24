// SEO utility functions

// Generate a sitemap entry
export function generateSitemapEntry(url: string, lastModified: Date, changeFrequency: string, priority: number) {
  return `
    <url>
      <loc>${url}</loc>
      <lastmod>${lastModified.toISOString().split("T")[0]}</lastmod>
      <changefreq>${changeFrequency}</changefreq>
      <priority>${priority.toFixed(1)}</priority>
    </url>
  `
}

// Generate canonical URL
export function getCanonicalUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://roadrescue.com"
  return `${baseUrl}${path}`
}

// Generate breadcrumb data for structured data
export function generateBreadcrumbData(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Generate FAQ structured data
export function generateFaqData(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  }
}

// Generate meta description with optimal length
export function generateMetaDescription(text: string, maxLength = 160) {
  if (text.length <= maxLength) return text

  // Try to cut at the end of a sentence
  const sentenceEnd = text.substring(0, maxLength).lastIndexOf(".")
  if (sentenceEnd > maxLength * 0.7) {
    return text.substring(0, sentenceEnd + 1)
  }

  // Otherwise cut at a word boundary
  const lastSpace = text.substring(0, maxLength).lastIndexOf(" ")
  return text.substring(0, lastSpace) + "..."
}
