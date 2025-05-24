import type { Metadata } from "next"

interface MetaTagsProps {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  ogType?: string
  twitterCard?: string
  canonicalUrl?: string
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage = "/images/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  canonicalUrl,
}: MetaTagsProps): Metadata {
  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [ogImage],
    },
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
  }
}
