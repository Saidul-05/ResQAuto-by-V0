"use client"

import { useEffect } from "react"

interface LocalBusinessData {
  name: string
  description: string
  url: string
  telephone?: string
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo?: {
    latitude: number
    longitude: number
  }
  openingHours?: string[]
  priceRange?: string
}

export function LocalBusinessStructuredData({ data }: { data: LocalBusinessData }) {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "AutoRepair",
      "@id": data.url,
      name: data.name,
      description: data.description,
      url: data.url,
      telephone: data.telephone,
      address: data.address
        ? {
            "@type": "PostalAddress",
            streetAddress: data.address.streetAddress,
            addressLocality: data.address.addressLocality,
            addressRegion: data.address.addressRegion,
            postalCode: data.address.postalCode,
            addressCountry: data.address.addressCountry,
          }
        : undefined,
      geo: data.geo
        ? {
            "@type": "GeoCoordinates",
            latitude: data.geo.latitude,
            longitude: data.geo.longitude,
          }
        : undefined,
      openingHours: data.openingHours,
      priceRange: data.priceRange,
    }

    // Add the structured data to the page
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [data])

  return null
}

interface ServiceData {
  name: string
  description: string
  provider: {
    name: string
    url: string
  }
  serviceType: string
  areaServed?: string[]
  offers?: {
    price: number
    priceCurrency: string
    availability?: string
  }
}

export function ServiceStructuredData({ data }: { data: ServiceData }) {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: data.name,
      description: data.description,
      provider: {
        "@type": "Organization",
        name: data.provider.name,
        url: data.provider.url,
      },
      serviceType: data.serviceType,
      areaServed: data.areaServed?.map((area) => ({
        "@type": "State",
        name: area,
      })),
      offers: data.offers
        ? {
            "@type": "Offer",
            price: data.offers.price,
            priceCurrency: data.offers.priceCurrency,
            availability: data.offers.availability || "https://schema.org/InStock",
          }
        : undefined,
    }

    // Add the structured data to the page
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [data])

  return null
}
