"use client"

import { useEffect, useState } from "react"
import { translations, type Language, type TranslationKey } from "@/lib/translations"

export function useTranslation() {
    const [language, setLanguage] = useState<Language>("en")

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedLang = localStorage.getItem("language") as Language
            if (savedLang && translations[savedLang]) {
                setLanguage(savedLang)
            }
        }
    }, [])

    const t = (key: TranslationKey): string => {
        return translations[language]?.[key] || translations.en[key] || key
    }

    return { t, language }
}
