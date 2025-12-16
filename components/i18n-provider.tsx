"use client"

import type { ReactNode } from "react"
import { translations, type Language } from "@/lib/translations"

interface I18nContextType {
  t: (key: string) => string
  language: Language
}

export const I18nContext = React.createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = React.useState<Language>(() => {
    if (typeof window === "undefined") return "en"
    return (localStorage.getItem("language") as Language) || "en"
  })

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return <I18nContext.Provider value={{ t, language }}>{children}</I18nContext.Provider>
}

import React from "react"

export function useI18n() {
  const context = React.useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return context
}
