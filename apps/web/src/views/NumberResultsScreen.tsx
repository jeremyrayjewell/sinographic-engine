import { useRef } from 'react'
import type { NumbersSetId } from '@sinographic-engine/shared-types'
import { ActionButton, Panel, ScreenShell } from '@sinographic-engine/ui'
import { LanguageToggle } from '@/components/LanguageToggle'
import { SpeakButton } from '@/components/SpeakButton'
import { useSpeech } from '@/hooks/useSpeech'
import { getAppCopy } from '@/lib/i18n'
import { useQuizStore } from '@/store/quiz-store'

const getNumbersSetDisplay = (
  setId: NumbersSetId,
  copy: ReturnType<typeof getAppCopy>
) => {
  switch (setId) {
    case 'simple-numbers':
      return {
        hanzi: copy.numbersSetSimpleHanzi,
        label: copy.numbersSetSimpleLabel,
        detail: '1-100'
      }
    case 'hundreds':
      return {
        hanzi: copy.numbersSetHundredsHanzi,
        label: copy.numbersSetHundredsLabel,
        detail: '100-999'
      }
    case 'numbers':
      return {
        hanzi: copy.numbersSetCommonHanzi,
        label: copy.numbersSetCommonLabel,
        detail: '1-1,000,000'
      }
    case 'currency':
      return {
        hanzi: copy.numbersSetCurrencyHanzi,
        label: copy.numbersSetCurrencyLabel,
        detail: 'NTD'
      }
    case 'math':
      return {
        hanzi: copy.numbersSetMathHanzi,
        label: copy.numbersSetMathLabel,
        detail: '+ - x /'
      }
  }
}

export const NumberResultsScreen = () => {
  const language = useQuizStore((state) => state.language)
  const copy = getAppCopy(language)
  const selectedNumbersSet = useQuizStore((state) => state.selectedNumbersSet)
  const score = useQuizStore((state) => state.score)
  const totalQuestions = useQuizStore((state) => state.totalQuestions)
  const sessionHistory = useQuizStore((state) => state.numberSessionHistory)
  const resetSession = useQuizStore((state) => state.resetSession)
  const startNumbersSession = useQuizStore((state) => state.startNumbersSession)
  const { rate, speak } = useSpeech()
  const slowRate = Math.max(0.6, rate - 0.25)
  const lastReplayRef = useRef<{ key: string; at: number } | null>(null)

  const accuracy = Math.round((score / totalQuestions) * 100)
  const setDisplay = getNumbersSetDisplay(selectedNumbersSet, copy)

  const replayText = (key: string, text: string) => {
    const now = Date.now()
    const useSlowReplay =
      lastReplayRef.current?.key === key && now - lastReplayRef.current.at < 1400

    lastReplayRef.current = { key, at: now }

    return speak(text, useSlowReplay ? { rate: slowRate } : undefined)
  }

  return (
    <ScreenShell className="justify-center">
      <div className="mx-auto grid w-full max-w-5xl gap-4">
        <Panel className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="inline-flex border border-[#1f2f44] bg-[#1f2f44] px-3 py-2 text-2xl font-semibold tracking-[0.04em] text-[#f7eedf]">
                {copy.sessionResultsHanzi}
              </h1>
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#5b6f84]">
                {copy.sessionResults}
              </p>
            </div>
            <LanguageToggle />
          </div>
          <p className="mt-4 text-3xl font-semibold uppercase leading-none text-[#1f2f44] sm:text-4xl">
            {setDisplay.label}
          </p>
          <div className="mt-4 grid gap-px border border-[#30455f] bg-[#30455f] sm:grid-cols-3">
            <div className="bg-[#f7eedf] px-3 py-2">
              <div className="flex flex-wrap items-center gap-3">
                <p className="inline-flex border border-[#1f2f44] bg-[#1f2f44] px-2 py-1 text-sm font-semibold tracking-[0.04em] text-[#f7eedf]">
                  分
                </p>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#5b6f84]">
                  {copy.score}: {score}/{totalQuestions}
                </p>
              </div>
            </div>
            <div className="bg-[#f7eedf] px-3 py-2">
              <div className="flex flex-wrap items-center gap-3">
                <p className="inline-flex border border-[#1f2f44] bg-[#1f2f44] px-2 py-1 text-sm font-semibold tracking-[0.04em] text-[#f7eedf]">
                  {copy.accuracyHanzi}
                </p>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#5b6f84]">
                  {copy.accuracy}: {accuracy}%
                </p>
              </div>
            </div>
            <div className="bg-[#f7eedf] px-3 py-2">
              <div className="flex flex-wrap items-center gap-3">
                <p className="inline-flex border border-[#1f2f44] bg-[#1f2f44] px-2 py-1 text-sm font-semibold tracking-[0.04em] text-[#f7eedf]">
                  {setDisplay.hanzi}
                </p>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#5b6f84]">
                  {setDisplay.detail}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <ActionButton onClick={startNumbersSession}>
              <span className="flex items-center gap-3">
                <span>{copy.runAnotherSessionHanzi}</span>
                <span className="text-[11px] uppercase tracking-[0.28em]">
                  {copy.runAnotherSession}
                </span>
              </span>
            </ActionButton>
            <ActionButton
              onClick={resetSession}
              className="border-[#30455f] bg-transparent !text-[#24384f] hover:border-[#24384f] hover:bg-[#24384f] hover:!text-[#f5ead9]"
            >
              <span className="flex items-center gap-3">
                <span>{copy.returnHomeHanzi}</span>
                <span className="text-[11px] uppercase tracking-[0.28em]">
                  {copy.returnHome}
                </span>
              </span>
            </ActionButton>
          </div>
        </Panel>

        <Panel className="p-4 sm:p-5 lg:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <p className="inline-flex border border-[#1f2f44] bg-[#1f2f44] px-2 py-1 text-sm font-semibold tracking-[0.04em] text-[#f7eedf]">
              {copy.attemptHistoryHanzi}
            </p>
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#5b6f84]">
              {copy.attemptHistory}
            </p>
          </div>
          <div className="mt-4 grid gap-px border border-[#30455f] bg-[#30455f]">
            {sessionHistory.map((result, index) => {
              return (
                <div
                  key={`${result.questionId}-${index}`}
                  className="bg-[#f7eedf] p-3"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-3xl font-semibold uppercase text-[#1f2f44]">
                        {result.prompt}
                      </p>
                      <div className="mt-2 flex flex-wrap items-start gap-2">
                        <p className="text-sm uppercase tracking-[0.14em] text-[#7b4d32]">
                          {copy.correct}: {result.correctHanzi} ({result.correctBopomofo} /{' '}
                          {result.correctPinyin})
                        </p>
                        <SpeakButton
                          label={`${copy.speakLabel}: ${result.correctHanzi}`}
                          icon="speak"
                          iconOnly
                          onClick={() =>
                            void replayText(
                              `number-result:${result.questionId}`,
                              result.correctSpeechText ?? result.correctHanzi
                            )
                          }
                        />
                      </div>
                    </div>
                    <span
                      className={`border px-3 py-2 text-[11px] uppercase tracking-[0.24em] ${
                        result.isCorrect
                          ? 'border-[#8c2f22] text-[#8c2f22]'
                          : 'border-[#30455f] text-[#5b6f84]'
                      }`}
                    >
                      {result.isCorrect
                        ? copy.correct
                        : copy.selectedAnswer(result.selectedHanzi)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </Panel>
      </div>
    </ScreenShell>
  )
}
