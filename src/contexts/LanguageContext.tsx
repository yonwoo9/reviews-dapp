import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import {
  Language,
  Translations,
  getTranslation,
  detectLanguageFromIP,
} from '../utils/i18n'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Check if user has a saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language

    if (savedLanguage) {
      setLanguageState(savedLanguage)
      setIsInitialized(true)
    } else {
      // Auto-detect language from IP
      detectLanguageFromIP().then((detectedLang) => {
        setLanguageState(detectedLang)
        setIsInitialized(true)
      })
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('preferredLanguage', lang)
  }

  const t = getTranslation(language)

  if (!isInitialized) {
    // Show a minimal loading screen while detecting language
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
