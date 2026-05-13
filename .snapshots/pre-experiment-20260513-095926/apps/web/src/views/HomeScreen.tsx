import {
  getLocalizedClassifierDecks
} from '@sinographic-engine/classifier-content'
import { useState } from 'react'
import barImage from '../../../../content/bar.png'
import { ActionButton, Panel, ScreenShell } from '@sinographic-engine/ui'
import { LanguageToggle } from '@/components/LanguageToggle'
import { getAppCopy } from '@/lib/i18n'
import { useQuizStore, type SessionLengthOption } from '@/store/quiz-store'

export const HomeScreen = () => {
  const [grammarOpen, setGrammarOpen] = useState(false)
  const [classifierOpen, setClassifierOpen] = useState(false)
  const language = useQuizStore((state) => state.language)
  const copy = getAppCopy(language)
  const decks = getLocalizedClassifierDecks(language)
  const startSession = useQuizStore((state) => state.startSession)
  const selectedDeckId = useQuizStore((state) => state.selectedDeckId)
  const selectedSessionLength = useQuizStore(
    (state) => state.selectedSessionLength
  )
  const setDeck = useQuizStore((state) => state.setDeck)
  const setSessionLength = useQuizStore((state) => state.setSessionLength)
  const sessionLengthOptions: SessionLengthOption[] = [20, 30, 40, 'max']
  const deckHanziLabels: Record<string, string> = {
    survival: '常用',
    'conversationally-solid': '會話',
    'very-comfortable': '熟練',
    'all-classifiers': '全部'
  }

  return (
    <ScreenShell className="gap-4">
      <header className="border border-[#30455f] bg-[#f7eedf] p-6 sm:p-8 lg:p-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
              <h1 className="inline-flex w-fit max-w-4xl border border-[#1f2f44] bg-[#1f2f44] px-3 py-2 text-4xl font-semibold uppercase leading-none text-[#f7eedf] sm:text-5xl lg:text-6xl">
                {copy.homeTitle}
              </h1>
              <div className="flex flex-col gap-2">
                <p className="pt-1 text-[11px] uppercase tracking-[0.35em] text-[#5b6f84]">
                  {copy.appLabel}
                </p>
                <img
                  src={barImage}
                  alt=""
                  className="h-auto w-40 max-w-full object-contain sm:w-44"
                />
              </div>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main>
        <Panel className="overflow-hidden p-0">
          <button
            type="button"
            onClick={() => setGrammarOpen((value) => !value)}
            className="flex w-full items-center justify-between border-0 border-b border-[#30455f] bg-[#f3e6d1] px-6 py-5 text-left transition hover:bg-[#ead9c1] sm:px-8"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="inline-flex border border-[#1f2f44] bg-[#1f2f44] px-3 py-2 text-2xl font-semibold uppercase tracking-[0.04em] text-[#f7eedf]">
                  {copy.grammarMenuHanzi}
                </h2>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#5b6f84]">
                  {copy.grammarMenuLabel}
                </p>
              </div>
            </div>
            <span className="text-3xl leading-none text-[#7b4d32]">
              {grammarOpen ? '−' : '+'}
            </span>
          </button>

          {grammarOpen ? (
            <div className="p-4 sm:p-6">
              <div className="overflow-hidden border border-[#30455f]">
                <button
                  type="button"
                  onClick={() => setClassifierOpen((value) => !value)}
                  className="flex w-full items-center justify-between border-0 border-b border-[#30455f] bg-[#f7eedf] px-6 py-5 text-left transition hover:bg-[#ead9c1] sm:px-8"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="inline-flex border border-[#1f2f44] bg-[#1f2f44] px-3 py-2 text-2xl font-semibold uppercase tracking-[0.04em] text-[#f7eedf]">
                        {copy.classifierPracticeHanzi}
                      </h3>
                      <p className="text-[11px] uppercase tracking-[0.35em] text-[#5b6f84]">
                        {copy.classifierPracticeLabel}
                      </p>
                    </div>
                  </div>
                  <span className="text-3xl leading-none text-[#7b4d32]">
                    {classifierOpen ? '−' : '+'}
                  </span>
                </button>

                {classifierOpen ? (
                  <div className="grid gap-px border-0 bg-[#30455f] lg:grid-cols-[1.08fr_0.92fr]">
                    <div className="bg-[#f7eedf] p-4 sm:p-5 lg:p-6">
                      <div className="grid gap-px border border-[#30455f] bg-[#30455f]">
                        {decks.map((deck) => {
                          const isActive = selectedDeckId === deck.id

                          return (
                            <button
                              key={deck.id}
                              type="button"
                              onClick={() => setDeck(deck.id)}
                              className={`px-3 py-3 text-left transition ${
                                isActive
                                  ? 'bg-[#24384f] text-[#f5ead9]'
                                  : 'bg-[#f7eedf] text-[#2b241e] hover:bg-[#ead9c1]'
                              }`}
                            >
                              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                                <div className="flex min-w-0 flex-wrap items-center gap-3">
                                  <span
                                    className={`inline-flex border px-2 py-1 text-sm font-semibold tracking-[0.04em] ${
                                      isActive
                                        ? 'border-[#f5ead9] bg-[#f5ead9] text-[#24384f]'
                                        : 'border-[#1f2f44] bg-[#1f2f44] text-[#f7eedf]'
                                    }`}
                                  >
                                    {deckHanziLabels[deck.id] ?? deck.name}
                                  </span>
                                  <span
                                    className={`min-w-0 break-words text-sm uppercase tracking-[0.16em] sm:tracking-[0.22em] ${
                                      isActive ? 'text-[#d2c4af]' : 'text-[#5b6f84]'
                                    }`}
                                  >
                                    {deck.name}
                                  </span>
                                </div>
                                <span
                                  className={`shrink-0 text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.3em] ${
                                    isActive ? 'text-[#d2c4af]' : 'text-[#5b6f84]'
                                  }`}
                                >
                                  {deck.availableCount}
                                </span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-5 bg-[#f7eedf] p-4 sm:p-5 lg:p-6">
                      <div className="grid gap-px border border-[#30455f] bg-[#30455f]">
                        <div className="bg-[#f7eedf] px-3 py-2">
                          <div className="flex flex-wrap items-center gap-3">
                            <p className="inline-flex border border-[#1f2f44] bg-[#1f2f44] px-2 py-1 text-sm font-semibold tracking-[0.04em] text-[#f7eedf]">
                              {copy.lengthLabelHanzi}
                            </p>
                            <p className="text-[11px] uppercase tracking-[0.35em] text-[#5b6f84]">
                              {copy.lengthLabel}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-px bg-[#30455f]">
                          {sessionLengthOptions.map((length) => {
                          const isActive = selectedSessionLength === length

                          return (
                            <button
                              key={length}
                              type="button"
                              onClick={() => setSessionLength(length)}
                              className={`px-3 py-3 text-center transition ${
                                isActive
                                  ? 'bg-[#24384f] text-[#f5ead9]'
                                  : 'bg-[#f7eedf] text-[#2b241e] hover:bg-[#ead9c1]'
                              }`}
                            >
                              <span
                                className={`text-sm uppercase tracking-[0.22em] ${
                                  isActive ? 'text-[#d2c4af]' : 'text-[#5b6f84]'
                                }`}
                              >
                                {length === 'max' ? 'MAX' : length}
                              </span>
                            </button>
                          )
                        })}
                        </div>
                      </div>
                      <ActionButton
                        onClick={startSession}
                        className="w-full sm:w-auto"
                      >
                        <span className="flex items-center gap-3">
                          <span>{copy.beginHanzi}</span>
                          <span className="text-[11px] uppercase tracking-[0.28em]">
                            {copy.beginLabel}
                          </span>
                        </span>
                      </ActionButton>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </Panel>
      </main>
    </ScreenShell>
  )
}
