"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Currency = {
  code: string
  name: string
  symbol: string
}

const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
]

// Exchange rates (relative to USD)
const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.21,
  CAD: 1.25,
  AUD: 1.35,
  INR: 74.38,
  BDT: 84.82,
  CNY: 6.45,
}

export function CurrencySwitcher() {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(currencies[0])

  // Load saved currency preference on component mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem("preferred-currency")
    if (savedCurrency) {
      const currency = currencies.find((c) => c.code === savedCurrency)
      if (currency) setCurrentCurrency(currency)
    }
  }, [])

  const changeCurrency = (currency: Currency) => {
    setCurrentCurrency(currency)
    localStorage.setItem("preferred-currency", currency.code)

    // In a real app, you would update all prices on the page
    // For this example, we'll just publish a custom event that other components can listen to
    const event = new CustomEvent("currency-changed", {
      detail: {
        currency: currency.code,
        symbol: currency.symbol,
        rate: exchangeRates[currency.code],
      },
    })
    window.dispatchEvent(event)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <span className="mr-1">{currentCurrency.symbol}</span>
          {currentCurrency.code}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {currencies.map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            onClick={() => changeCurrency(currency)}
            className={currentCurrency.code === currency.code ? "bg-accent" : ""}
          >
            <span className="mr-2">{currency.symbol}</span>
            {currency.name} ({currency.code})
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
