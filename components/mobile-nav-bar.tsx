"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Car, Phone, User, AlertTriangle } from "lucide-react"

export function MobileNavBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navItems = [
    { href: "/", icon: <Home size={24} />, label: "Home" },
    { href: "/services", icon: <Car size={24} />, label: "Services" },
    {
      href: "/emergency",
      icon: (
        <div className="relative">
          <AlertTriangle size={24} className="text-red-500" />
          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2 animate-pulse"></span>
        </div>
      ),
      label: "SOS",
      highlight: true,
    },
    { href: "/contact", icon: <Phone size={24} />, label: "Contact" },
    { href: "/dashboard", icon: <User size={24} />, label: "Account" },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="bg-background border-t px-2 py-3 flex justify-around items-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  } ${item.highlight ? "relative" : ""}`}
                >
                  {item.highlight ? (
                    <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
                      {item.icon}
                      <span className="text-xs mt-1 text-red-500 font-medium">{item.label}</span>
                    </motion.div>
                  ) : (
                    <>
                      {item.icon}
                      <span className="text-xs mt-1">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute -bottom-3 w-1 h-1 bg-primary rounded-full"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </>
                  )}
                </Link>
              )
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
