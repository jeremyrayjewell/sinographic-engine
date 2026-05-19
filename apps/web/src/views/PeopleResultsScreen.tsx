import { peopleVocabulary } from '@sinographic-engine/vocabulary-content'
import { ActionButton, Panel, ScreenShell } from '@sinographic-engine/ui'
import { LanguageToggle } from '@/components/LanguageToggle'
import { SpeakButton } from '@/components/SpeakButton'
import { useSpeech } from '@/hooks/useSpeech'
import { getAppCopy } from '@/lib/i18n'
import { useQuizStore } from '@/store/quiz-store'

export const PeopleResultsScreen = () => {
  const language = useQuizStore((state) => state.language)
  const copy = getAppCopy(language)
  const score = useQuizStore((state) => state.score)
  const totalQuestions = useQuizStore((state) => state.totalQuestions)
  const sessionHistory = useQuizStore((state) => state.vocabularySessionHistory)
  const resetSession = useQuizStore((state) => state.resetSession)
  const startPeopleSession = useQuizStore((state) => state.startPeopleSession)
  const { speak } = useSpeech()
  const accuracy = Math.round((score / totalQuestions) * 100)

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
            {copy.peopleMenuLabel}
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
                  {copy.peopleMenuHanzi}
                </p>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#5b6f84]">
                  {peopleVocabulary.length}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <ActionButton onClick={startPeopleSession}>
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
              const correctItem = peopleVocabulary.find(
                (item) => item.id === result.correctItemId
              )
              const selectedItem = peopleVocabulary.find(
                (item) => item.id === result.selectedItemId
              )

              return (
                <div
                  key={`${result.questionId}-${index}`}
                  className="bg-[#f7eedf] p-3"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-2xl font-semibold uppercase text-[#1f2f44]">
                        {result.prompt}
                      </p>
                      <div className="mt-2 flex flex-wrap items-start gap-2">
                        <p className="text-sm uppercase tracking-[0.14em] text-[#7b4d32]">
                          {copy.correct}: {correctItem?.hanzi}
                          {correctItem?.bopomofo
                            ? ` (${correctItem.bopomofo} / ${correctItem.pinyin})`
                            : correctItem?.pinyin
                              ? ` (${correctItem.pinyin})`
                              : ''}
                        </p>
                        {correctItem ? (
                          <SpeakButton
                            label={`${copy.speakLabel}: ${correctItem.hanzi}`}
                            icon="speak"
                            iconOnly
                            onClick={() => void speak(correctItem.hanzi)}
                          />
                        ) : null}
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
                        : copy.selectedAnswer(selectedItem?.hanzi ?? '?')}
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

