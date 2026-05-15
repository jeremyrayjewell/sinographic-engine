import { useRef } from 'react'
import type { NumbersSetId } from '@sinographic-engine/shared-types'
import barImage from '../../../../content/bar.png'
import { ActionButton, Panel, ScreenShell } from '@sinographic-engine/ui'
import { LanguageToggle } from '@/components/LanguageToggle'
import { SpeakButton } from '@/components/SpeakButton'
import { getAppCopy } from '@/lib/i18n'
import { useSpeech } from '@/hooks/useSpeech'
import { useQuizStore } from '@/store/quiz-store'

const getNumbersSetDisplay = (
  setId: NumbersSetId,
  copy: ReturnType<typeof getAppCopy>
) => {
  switch (setId) {
    case 'simple-numbers':
      return { label: copy.numbersSetSimpleLabel }
    case 'hundreds':
      return { label: copy.numbersSetHundredsLabel }
    case 'numbers':
      return { label: copy.numbersSetCommonLabel }
    case 'currency':
      return { label: copy.numbersSetCurrencyLabel }
    case 'math':
      return { label: copy.numbersSetMathLabel }
  }
}

export const NumberQuizScreen = () => {
  const language = useQuizStore((state) => state.language)
  const copy = getAppCopy(language)
  const selectedNumbersSet = useQuizStore((state) => state.selectedNumbersSet)
  const currentQuestion = useQuizStore((state) => state.currentNumberQuestion)
  const currentResult = useQuizStore((state) => state.currentNumberResult)
  const score = useQuizStore((state) => state.score)
  const completedQuestions = useQuizStore((state) => state.completedQuestions)
  const totalQuestions = useQuizStore((state) => state.totalQuestions)
  const resetSession = useQuizStore((state) => state.resetSession)
  const submitNumberAnswer = useQuizStore((state) => state.submitNumberAnswer)
  const nextNumberQuestion = useQuizStore((state) => state.nextNumberQuestion)
  const { rate, speak } = useSpeech()
  const slowRate = Math.max(0.6, rate - 0.25)
  const lastReplayRef = useRef<{ key: string; at: number } | null>(null)

  const replayText = (key: string, text: string) => {
    const now = Date.now()
    const useSlowReplay =
      lastReplayRef.current?.key === key && now - lastReplayRef.current.at < 1400

    lastReplayRef.current = { key, at: now }

    return speak(text, useSlowReplay ? { rate: slowRate } : undefined)
  }

  if (!currentQuestion) {
    return null
  }

  const setDisplay = getNumbersSetDisplay(selectedNumbersSet, copy)

  return (
    <ScreenShell>
      <div className="mx-auto grid w-full max-w-5xl gap-4">
        <div className="border border-[#30455f] bg-[#f7eedf] p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-start gap-3">
              <h1 className="inline-flex border border-[#1f2f44] bg-[#1f2f44] px-3 py-2 text-2xl font-semibold tracking-[0.04em] text-[#f7eedf]">
                {copy.numbersMenuHanzi}
              </h1>
              <div className="flex flex-col gap-2">
                <p className="pt-1 text-[11px] uppercase tracking-[0.35em] text-[#5b6f84]">
                  {setDisplay.label}
                </p>
                <img
                  src={barImage}
                  alt=""
                  className="h-auto w-32 max-w-full object-contain sm:w-36"
                />
              </div>
            </div>
            <div className="flex items-start gap-2">
              <LanguageToggle />
              <button
                type="button"
                onClick={resetSession}
                className="inline-flex items-center justify-center border border-[#30455f] bg-[#f7eedf] px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-[#24384f] transition hover:bg-[#24384f] hover:text-[#f5ead9]"
              >
                <span className="flex items-center gap-2">
                  <span>{copy.returnHomeHanzi}</span>
                  <span>{copy.returnHome}</span>
                </span>
              </button>
            </div>
          </div>
          <div className="mt-4 grid gap-px border border-[#30455f] bg-[#30455f] sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-[#f7eedf] px-3 py-2">
              <div className="flex flex-wrap items-center gap-3">
                <p className="inline-flex border border-[#1f2f44] bg-[#1f2f44] px-2 py-1 text-sm font-semibold tracking-[0.04em] text-[#f7eedf]">
                  分
                </p>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#5b6f84]">
                  {copy.score}: {score}
                </p>
              </div>
            </div>
            <div className="bg-[#f7eedf] px-3 py-2 sm:col-span-1 lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3">
                <p className="inline-flex border border-[#1f2f44] bg-[#1f2f44] px-2 py-1 text-sm font-semibold tracking-[0.04em] text-[#f7eedf]">
                  行
                </p>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#5b6f84]">
                  {copy.progress}:{' '}
                  {Math.min(completedQuestions + 1, totalQuestions)}/{totalQuestions}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Panel className="p-4 sm:p-5 lg:p-6">
          <div className="flex items-center justify-center py-2 sm:py-4">
            <p className="text-center text-5xl font-semibold leading-none text-[#1f2f44] sm:text-6xl">
              {currentQuestion.prompt}
            </p>
          </div>

          <div className="mt-6 grid gap-px border border-[#30455f] bg-[#30455f] sm:grid-cols-2">
            {currentQuestion.options.map((option) => {
              const wasSelected = currentResult?.selectedValue === option.value
              const isCorrect = currentResult?.correctValue === option.value
              const showState = currentResult !== null

              return (
                <div
                  key={option.id}
                  className={`px-3 py-3 text-left transition ${
                    showState && isCorrect
                      ? 'bg-[#8c2f22] text-[#f5ead9]'
                      : showState && wasSelected
                        ? 'bg-[#24384f] text-[#f5ead9]'
                        : 'bg-[#f7eedf] text-[#2b241e] hover:bg-[#ead9c1]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => submitNumberAnswer(option.value)}
                      disabled={showState}
                      className="min-w-0 flex-1 text-left"
                    >
                      <div className="flex items-end justify-between gap-3">
                        <p className="text-4xl font-semibold">{option.hanzi}</p>
                        <div className="text-right">
                          {option.bopomofo ? (
                            <p className="text-sm tracking-[0.12em] opacity-85">
                              {option.bopomofo}
                            </p>
                          ) : null}
                          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] opacity-65">
                            {option.pinyin}
                          </p>
                        </div>
                      </div>
                    </button>
                    <div className="flex shrink-0 gap-2">
                      <SpeakButton
                        label={`${copy.speakLabel}: ${option.hanzi}`}
                        icon="speak"
                        iconOnly
                        className="px-2 py-2"
                        onClick={() =>
                          void replayText(
                            `number-option:${option.id}`,
                            option.speechText ?? option.hanzi
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {currentResult ? (
            <div className="mt-6 border border-[#30455f] bg-[#f3e6d1] p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-3">
                <p
                  className={`inline-flex border px-2 py-1 text-sm font-semibold tracking-[0.04em] ${
                    currentResult.isCorrect
                      ? 'border-[#8c2f22] bg-[#8c2f22] text-[#f7eedf]'
                      : 'border-[#24384f] bg-[#24384f] text-[#f7eedf]'
                  }`}
                >
                  {currentResult.isCorrect ? copy.correctHanzi : copy.reviewHanzi}
                </p>
                <p
                  className={`text-[11px] uppercase tracking-[0.35em] ${
                    currentResult.isCorrect ? 'text-[#8c2f22]' : 'text-[#5b6f84]'
                  }`}
                >
                  {currentResult.isCorrect ? copy.correct : copy.review}
                </p>
              </div>
              <div className="mt-4 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
                <div>
                  <p className="text-xl font-medium text-[#1f2f44]">
                    {currentQuestion.prompt} is {currentQuestion.correctHanzi} (
                    {currentQuestion.correctBopomofo} / {currentQuestion.correctPinyin}).
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <SpeakButton
                      label={`${copy.speakLabel}: ${currentQuestion.correctHanzi}`}
                      icon="speak"
                      iconOnly
                      onClick={() =>
                        void replayText(
                          `number-correct:${currentQuestion.id}`,
                          currentQuestion.correctSpeechText ?? currentQuestion.correctHanzi
                        )
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-end gap-5 border-t border-[#30455f] pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                  <ActionButton onClick={nextNumberQuestion} className="w-full">
                    <span className="flex items-center gap-3">
                      <span>
                        {completedQuestions >= totalQuestions
                          ? copy.viewResultsHanzi
                          : copy.nextQuestionHanzi}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.28em]">
                        {completedQuestions >= totalQuestions
                          ? copy.viewResults
                          : copy.nextQuestion}
                      </span>
                    </span>
                  </ActionButton>
                </div>
              </div>
            </div>
          ) : null}
        </Panel>
      </div>
    </ScreenShell>
  )
}
