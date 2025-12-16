"use client"

import { useCallback } from "react"

export type Language = "en" | "yo"

export const LANGUAGES: Record<Language, string> = {
  en: "English",
  yo: "Yorùbá",
}

export function useLanguage() {
  const getLanguage = useCallback((): Language => {
    if (typeof window === "undefined") return "en"
    return (localStorage.getItem("language") as Language) || "en"
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang)
      window.location.reload()
    }
  }, [])

  return { getLanguage, setLanguage }
}
