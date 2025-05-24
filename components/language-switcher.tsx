"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

type Language = {
  code: string
  name: string
  flag: string
  rtl?: boolean
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ar", name: "العربية", flag: "🇸🇦", rtl: true },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
]

export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])

  // Load saved language preference on component mount
  useEffect(() => {
    const savedLang = localStorage.getItem("preferred-language")
    if (savedLang) {
      const lang = languages.find((l) => l.code === savedLang)
      if (lang) {
        setCurrentLanguage(lang)
        if (lang.rtl) {
          document.documentElement.dir = "rtl"
          document.documentElement.lang = lang.code
        } else {
          document.documentElement.dir = "ltr"
          document.documentElement.lang = lang.code
        }
      }
    }
  }, [])

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem("preferred-language", language.code)

    // Set RTL/LTR direction based on language
    if (language.rtl) {
      document.documentElement.dir = "rtl"
      document.documentElement.lang = language.code
    } else {
      document.documentElement.dir = "ltr"
      document.documentElement.lang = language.code
    }

    // In a real app, you would use a translation library like i18next
    // For example: i18n.changeLanguage(language.code)

    // Reload the page to apply language changes (in a real app, this would be handled by the translation library)
    // window.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language)}
            className={currentLanguage.code === language.code ? "bg-accent" : ""}
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
