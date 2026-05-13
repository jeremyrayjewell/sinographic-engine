import {
  getLocalizedClassifierById
} from '@sinographic-engine/classifier-content'
import barImage from '../../../../content/bar.png'
import { ActionButton, Panel, ScreenShell } from '@sinographic-engine/ui'
import { LanguageToggle } from '@/components/LanguageToggle'
import { getAppCopy } from '@/lib/i18n'
import { useQuizStore } from '@/store/quiz-store'

export const QuizScreen = () => {
  const language = useQuizStore((state) => state.language)
  const copy = getAppCopy(language)
  const currentQuestion = useQuizStore((state) => state.currentQuestion)
  const currentResult = useQuizStore((state) => state.currentResult)
  const score = useQuizStore((state) => state.score)
  const completedQuestions = useQuizStore((state) => state.completedQuestions)
  const totalQuestions = useQuizStore((state) => state.totalQuestions)
  const resetSession = useQuizStore((state) => state.resetSession)
  const submitAnswer = useQuizStore((state) => state.submitAnswer)
  const nextQuestion = useQuizStore((state) => state.nextQuestion)

  if (!currentQuestion) {
    return null
  }

  const correctClassifier = getLocalizedClassifierById(
    currentQuestion.correctClassifierId,
    language
  )

  return (
    <ScreenShell>
      <div className="mx-auto grid w-full max-w-5xl gap-4">
        <div className="border border-[#30455f] bg-[#f7eedf] p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-start gap-3">
              <h1 className="inline-flex border border-[#1f2f44] bg-[#1f2f44] px-3 py-2 text-2xl font-semibold tracking-[0.04em] text-[#f7eedf]">
                {copy.classifierPracticeHanzi}
              </h1>
              <div className="flex flex-col gap-2">
                <p className="pt-1 text-[11px] uppercase tracking-[0.35em] text-[#5b6f84]">
                  {copy.classifierPracticeLabel}
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
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex items-center justify-center">
              <p className="text-5xl font-semibold uppercase leading-none text-[#1f2f44] sm:text-6xl">
                {currentQuestion.prompt}
              </p>
            </div>
            <div className="flex flex-col justify-center gap-2 border-t border-[#30455f] pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
              <p className="text-sm uppercase tracking-[0.16em] text-[#8c2f22]">
                {currentQuestion.promptPinyin}
              </p>
              {currentQuestion.promptBopomofo ? (
                <p className="text-sm uppercase tracking-[0.16em] text-[#5b6f84]">
                  {currentQuestion.promptBopomofo}
                </p>
              ) : null}
              <p className="max-w-2xl text-base text-[#3e352c]">
                {currentQuestion.promptEnglish}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-px border border-[#30455f] bg-[#30455f] sm:grid-cols-2">
            {currentQuestion.options.map((option) => {
              const wasSelected =
                currentResult?.selectedClassifierId === option.id
              const isCorrect =
                currentResult?.correctClassifierId === option.id
              const showState = currentResult !== null

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => submitAnswer(option.id)}
                  disabled={showState}
                  className={`px-3 py-3 text-left transition ${
                    showState && isCorrect
                      ? 'bg-[#8c2f22] text-[#f5ead9]'
                      : showState && wasSelected
                        ? 'bg-[#24384f] text-[#f5ead9]'
                        : 'bg-[#f7eedf] text-[#2b241e] hover:bg-[#ead9c1]'
                  }`}
                >
                  <div className="flex items-end justify-between gap-3">
                    <p className="text-4xl font-semibold">{option.hanzi}</p>
                    <div className="text-right">
                      <p className="text-[11px] uppercase tracking-[0.18em] opacity-70">
                        {option.pinyin}
                      </p>
                      {option.bopomofo ? (
                        <p className="mt-1 text-[11px] uppercase tracking-[0.14em] opacity-70">
                          {option.bopomofo}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <p className="mt-3 text-sm uppercase tracking-[0.12em]">
                    {option.meaning}
                  </p>
                </button>
              )
            })}
          </div>

          {currentResult && correctClassifier ? (
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
                    {correctClassifier.hanzi} ({correctClassifier.pinyin.surface}
                    {correctClassifier.pinyin.bopomofo
                      ? ` / ${correctClassifier.pinyin.bopomofo}`
                      : ''}
                    ) {copy.usedHereFor} {correctClassifier.meanings[0]}.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#3e352c]">
                    {correctClassifier.usage}
                  </p>
                </div>

                <div className="flex flex-col justify-between gap-5 border-t border-[#30455f] pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                  {correctClassifier.compatibleNouns?.length ? (
                    <p className="text-sm uppercase tracking-[0.12em] text-[#7b4d32]">
                      {copy.oftenUsedWith}: {correctClassifier.compatibleNouns.join(' / ')}
                    </p>
                  ) : (
                    <div />
                  )}
                  <ActionButton onClick={nextQuestion} className="w-full">
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
