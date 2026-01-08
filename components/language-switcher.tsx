"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { LANGUAGES, type Language } from "@/lib/use-language"

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<Language>("en")
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as Language
      if (savedLang && LANGUAGES[savedLang]) {
        setCurrentLang(savedLang)
      }
    }
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang)
    localStorage.setItem("language", lang)
    window.location.reload()
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="gap-2">
        <Globe className="w-4 h-4" /> English
      </Button>
    )
  }

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="gap-2">
        <Globe className="w-4 h-4" /> {LANGUAGES[currentLang]}
      </Button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50">
          {(Object.entries(LANGUAGES) as [Language, string][]).map(([lang, name]) => (
            <button
              key={lang}
              onClick={() => {
                handleLanguageChange(lang)
                setIsOpen(false)
              }}
              className="block w-full text-left px-4 py-2 hover:bg-muted first:rounded-t-lg last:rounded-b-lg text-sm"
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
