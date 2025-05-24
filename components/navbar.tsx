"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { CurrencySwitcher } from "@/components/currency-switcher"
import { Menu, X, Phone } from "lucide-react"
import { useState } from "react"
import { ServiceRequestButton } from "@/components/service-request-button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">RoadAssist</span>
          </Link>
          <nav className="hidden md:flex gap-6 ml-6">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="/services" className="text-sm font-medium hover:underline underline-offset-4">
              Services
            </Link>
            <Link href="/membership" className="text-sm font-medium hover:underline underline-offset-4">
              Membership
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Link href="/service-request-detailed">
              <Button variant="outline" size="sm">
                Detailed Request
              </Button>
            </Link>
            <ServiceRequestButton size="sm" />
            <Link href="tel:+18001234567">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
            </Link>
            <LanguageSwitcher />
            <CurrencySwitcher />
            <ModeToggle />
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden py-4 border-t">
          <nav className="flex flex-col gap-4">
            <Link href="/" className="text-sm font-medium" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/services" className="text-sm font-medium" onClick={toggleMenu}>
              Services
            </Link>
            <Link href="/membership" className="text-sm font-medium" onClick={toggleMenu}>
              Membership
            </Link>
            <Link href="/about" className="text-sm font-medium" onClick={toggleMenu}>
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium" onClick={toggleMenu}>
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Link href="/service-request-detailed" onClick={toggleMenu}>
                <Button variant="outline" className="w-full">
                  Detailed Request
                </Button>
              </Link>
              <Link href="/service-request" onClick={toggleMenu}>
                <Button className="w-full">Request Service</Button>
              </Link>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t">
              <LanguageSwitcher />
              <CurrencySwitcher />
              <ModeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
