import type { AppLocale } from '@sinographic-engine/shared-types'
import { useQuizStore } from '@/store/quiz-store'

const locales: AppLocale[] = ['en', 'es-419']

export const LanguageToggle = () => {
  const language = useQuizStore((state) => state.language)
  const setLanguage = useQuizStore((state) => state.setLanguage)

  return (
    <div className="flex flex-col border border-[#30455f] bg-[#30455f] sm:flex-row">
      {locales.map((locale) => {
        const isActive = locale === language

        return (
          <button
            key={locale}
            type="button"
            onClick={() => setLanguage(locale)}
            className={`px-3 py-2 text-[11px] uppercase tracking-[0.22em] transition ${
              isActive
                ? 'bg-[#24384f] text-[#f5ead9]'
                : 'bg-[#f7eedf] text-[#24384f] hover:bg-[#ead9c1]'
            }`}
          >
            {locale === 'en' ? 'EN' : 'ES'}
          </button>
        )
      })}
    </div>
  )
}
