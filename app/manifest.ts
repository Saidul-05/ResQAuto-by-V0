import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RoadRescue - 24/7 Road Side Assistance",
    short_name: "RoadRescue",
    description: "Professional road side assistance services available 24/7. Emergency help when you need it most.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ED1C24",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  }
}
