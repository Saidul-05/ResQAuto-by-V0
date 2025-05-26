import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { OfflineBanner } from "@/components/offline-banner"
import SwRegister from "./sw-register"
import { MobileNavBar } from "@/components/mobile-nav-bar"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Roadside Assistance - 24/7 Emergency Services",
  description:
    "Professional roadside assistance services including towing, battery jump-start, flat tire change, and more. Available 24/7.",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <OfflineBanner />
            <Navbar />
            {children}
            <Footer />
            <MobileNavBar />
            <Toaster />
            <SwRegister />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
