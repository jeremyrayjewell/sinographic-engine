import { useRef } from 'react'
import { ActionButton, Panel, ScreenShell } from '@sinographic-engine/ui'
import { QuizSessionHeader } from '@/components/QuizScaffold'
import { SpeakButton } from '@/components/SpeakButton'
import { useSpeech } from '@/hooks/useSpeech'
import { getAppCopy } from '@/lib/i18n'
import { getPastSectionById, localizePastSection } from '@/lib/past-forms'
import { useQuizStore } from '@/store/quiz-store'

export const PastStudyScreen = () => {
  const language = useQuizStore((state) => state.language)
  const copy = getAppCopy(language)
  const currentQuestion = useQuizStore((state) => state.currentPastQuestion)
  const currentResult = useQuizStore((state) => state.currentPastResult)
  const selectedPastSectionId = useQuizStore((state) => state.selectedPastSectionId)
  const score = useQuizStore((state) => state.score)
  const completedQuestions = useQuizStore((state) => state.completedQuestions)
  const totalQuestions = useQuizStore((state) => state.totalQuestions)
  const resetSession = useQuizStore((state) => state.resetSession)
  const submitPastAnswer = useQuizStore((state) => state.submitPastAnswer)
  const nextPastQuestion = useQuizStore((state) => state.nextPastQuestion)
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

  const section = localizePastSection(
    getPastSectionById(selectedPastSectionId),
    language
  )

  return (
    <ScreenShell>
      <div className="mx-auto grid w-full max-w-5xl gap-4">
        <QuizSessionHeader
          titleHanzi="過去"
          titleLabel="Past / Past-related Forms"
          score={score}
          completedQuestions={completedQuestions}
          totalQuestions={totalQuestions}
          copy={copy}
          onHome={resetSession}
        />

        <Panel className="p-4 sm:p-5 lg:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex items-center justify-center">
              <p className="text-center text-5xl font-semibold uppercase leading-none text-[#1f2f44] sm:text-6xl">
                {currentQuestion.prompt}
              </p>
            </div>
            <div className="flex flex-col justify-center gap-2 border-t border-[#30455f] pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
              {currentQuestion.promptBopomofo ? (
                <p className="text-base tracking-[0.12em] text-[#1f2f44]">
                  {currentQuestion.promptBopomofo}
                </p>
              ) : null}
              <p className="text-xs uppercase tracking-[0.18em] text-[#8c2f22]">
                {currentQuestion.promptPinyin}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <p className="inline-flex border border-[#1f2f44] bg-[#1f2f44] px-2 py-1 text-sm font-semibold tracking-[0.04em] text-[#f7eedf]">
                  {section.hanzi}
                </p>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#5b6f84]">
                  {section.label}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <SpeakButton
                  label={copy.speakLabel}
                  icon="speak"
                  iconOnly
                  onClick={() =>
                    void replayText(
                      `past-prompt:${currentQuestion.id}`,
                      currentQuestion.prompt.replace('___', '......')
                    )
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-px border border-[#30455f] bg-[#30455f] sm:grid-cols-2">
            {currentQuestion.options.map((option) => {
              const wasSelected = currentResult?.selectedAnswerId === option.id
              const isCorrect = currentQuestion.correctAnswerId === option.id
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
                      onClick={() => submitPastAnswer(option.id)}
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
                          void replayText(`past-option:${option.id}`, option.hanzi)
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
                    {currentResult.correctHanzi}{' '}
                    {currentResult.correctBopomofo ? (
                      <>
                        ({currentResult.correctBopomofo} / {currentResult.correctPinyin})
                      </>
                    ) : (
                      <>({currentResult.correctPinyin})</>
                    )}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#3e352c]">
                    {currentResult.correctEnglish}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#3e352c]">
                    {currentQuestion.concept}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <SpeakButton
                      label={`${copy.speakLabel}: ${currentResult.correctHanzi}`}
                      icon="speak"
                      iconOnly
                      onClick={() =>
                        void replayText(
                          `past-correct:${currentQuestion.id}`,
                          currentResult.correctHanzi
                        )
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-5 border-t border-[#30455f] pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                  <p className="text-sm uppercase tracking-[0.12em] text-[#7b4d32]">
                    {section.meaning}
                  </p>
                  <ActionButton onClick={nextPastQuestion} className="w-full">
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

              <div className="mt-5 grid gap-px border border-[#30455f] bg-[#30455f]">
                {section.examples.map((example) => (
                  <div
                    key={example.id}
                    className={`flex flex-col gap-3 px-3 py-3 sm:flex-row sm:items-start sm:justify-between ${
                      example.incorrect ? 'bg-[#ead9c1]' : 'bg-[#f7eedf]'
                    }`}
                  >
                    <div>
                      <p
                        className={`text-2xl font-semibold ${
                          example.incorrect ? 'text-[#8c2f22]' : 'text-[#1f2f44]'
                        }`}
                      >
                        {example.hanzi}
                      </p>
                      <p className="mt-2 text-sm tracking-[0.12em] text-[#1f2f44]">
                        {example.bopomofo}
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#8c2f22]">
                        {example.pinyin}
                      </p>
                      <p className="mt-2 text-sm text-[#3e352c]">
                        {example.english}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <SpeakButton
                        label={`${copy.speakLabel}: ${example.hanzi}`}
                        icon="speak"
                        iconOnly
                        onClick={() =>
                          void replayText(`past-example:${example.id}`, example.hanzi)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </Panel>
      </div>
    </ScreenShell>
  )
}
