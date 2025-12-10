import React, { useState, useRef, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { Language } from '../utils/i18n'
import { useLanguage } from '../contexts/LanguageContext'

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
]

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find((lang) => lang.code === language)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/10 backdrop-blur-md text-white px-4 py-2 h-10 rounded-lg flex items-center gap-2 hover:bg-white/20 transition-all border border-white/20">
        <Globe className="w-4 h-4" />
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline">{currentLanguage?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-800 backdrop-blur-md rounded-lg shadow-xl border border-white/20 overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-all ${
                language === lang.code ? 'bg-white/20' : ''
              }`}>
              <span className="text-xl">{lang.flag}</span>
              <span className="text-white">{lang.name}</span>
              {language === lang.code && (
                <span className="ml-auto text-purple-400">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
