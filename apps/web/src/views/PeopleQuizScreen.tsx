import { useRef } from 'react'
import {
  getVocabularyMeaning,
  peopleVocabulary
} from '@sinographic-engine/vocabulary-content'
import barImage from '../../../../content/bar.png'
import { ActionButton, Panel, ScreenShell } from '@sinographic-engine/ui'
import { LanguageToggle } from '@/components/LanguageToggle'
import { SpeakButton } from '@/components/SpeakButton'
import { useSpeech } from '@/hooks/useSpeech'
import { getAppCopy } from '@/lib/i18n'
import { useQuizStore } from '@/store/quiz-store'

type PeoplePromptVisualKind =
  | 'person'
  | 'group'
  | 'man'
  | 'woman'
  | 'child'
  | 'mister'
  | 'father'
  | 'mother'
  | 'spouse'
  | 'family'
  | 'older-sibling'
  | 'younger-sibling'
  | 'son'
  | 'daughter'

const peoplePromptVisuals: Record<string, PeoplePromptVisualKind> = {
  ren: 'person',
  dajia: 'group',
  nanren: 'man',
  nuren: 'woman',
  xiaohai: 'child',
  baba: 'father',
  mama: 'mother',
  xiansheng: 'mister',
  taitai: 'spouse',
  jiaren: 'family',
  gege: 'older-sibling',
  jiejie: 'older-sibling',
  didi: 'younger-sibling',
  meimei: 'younger-sibling',
  erzi: 'son',
  nuer: 'daughter'
}

const PeoplePromptVisual = ({
  itemId,
  label
}: {
  itemId: string
  label: string
}) => {
  const kind = peoplePromptVisuals[itemId]

  if (!kind) {
    return (
      <p className="text-center text-4xl font-semibold uppercase leading-none text-[#1f2f44] sm:text-5xl">
        {label}
      </p>
    )
  }

  return (
    <div
      className="flex flex-col items-center gap-4 text-[#1f2f44]"
      aria-label={label}
      title={label}
    >
      <svg
        className="h-40 w-56 sm:h-48 sm:w-72"
        viewBox="0 0 240 160"
        role="img"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="5"
      >
        {kind === 'person' ? (
          <>
            <circle cx="120" cy="45" r="24" />
            <path d="M72 132c8-39 35-56 48-56s40 17 48 56" />
          </>
        ) : null}
        {kind === 'group' ? (
          <>
            <circle cx="108" cy="79" r="74" />
            <circle cx="73" cy="62" r="11" />
            <circle cx="108" cy="52" r="13" />
            <circle cx="143" cy="62" r="11" />
            <path d="M51 123c4-20 16-30 22-30s18 10 22 30" />
            <path d="M84 121c5-24 18-36 24-36s20 12 25 36" />
            <path d="M121 123c4-20 16-30 22-30s18 10 22 30" />
            <path d="M232 19l-49 36M190 37l-7 18 20-2" />
          </>
        ) : null}
        {kind === 'family' ? (
          <>
            <circle cx="82" cy="55" r="20" />
            <circle cx="138" cy="46" r="24" />
            <circle cx="170" cy="70" r="16" />
            <path d="M42 134c7-34 29-50 40-50s33 16 40 50" />
            <path d="M91 134c8-39 35-56 47-56s40 17 48 56" />
            <path d="M142 134c5-25 20-38 28-38s23 13 28 38" />
          </>
        ) : null}
        {kind === 'man' ? (
          <>
            <circle cx="120" cy="47" r="24" />
            <path d="M80 132c7-38 31-56 40-56s33 18 40 56" />
            <circle cx="174" cy="36" r="14" />
            <path d="M184 26l18-18M192 8h10v10" />
          </>
        ) : null}
        {kind === 'woman' ? (
          <>
            <circle cx="120" cy="47" r="24" />
            <path d="M80 132c7-38 31-56 40-56s33 18 40 56" />
            <circle cx="174" cy="36" r="14" />
            <path d="M174 50v28M160 64h28" />
          </>
        ) : null}
        {kind === 'child' ? (
          <>
            <circle cx="120" cy="58" r="18" />
            <path d="M90 132c5-30 22-44 30-44s25 14 30 44" />
            <path d="M94 45l-18-13M146 45l18-13" />
          </>
        ) : null}
        {kind === 'mister' ? (
          <>
            <circle cx="120" cy="44" r="23" />
            <path d="M78 132c7-38 31-56 42-56s35 18 42 56" />
            <path d="M92 24h56M104 15h32M96 24l7 16M144 24l-7 16" />
            <path d="M101 83l19 22 19-22M120 105v27" />
            <circle cx="184" cy="32" r="13" />
            <path d="M193 23l17-17M202 6h8v8" />
          </>
        ) : null}
        {kind === 'father' || kind === 'mother' ? (
          <>
            <circle cx="92" cy="45" r="24" />
            <circle cx="156" cy="72" r="17" />
            <path d="M48 134c8-38 31-56 44-56s36 18 44 56" />
            <path d="M126 134c5-27 21-40 30-40s25 13 30 40" />
            {kind === 'father' ? (
              <>
                <circle cx="184" cy="31" r="12" />
                <path d="M193 22l16-16M202 6h7v7" />
              </>
            ) : null}
            {kind === 'mother' ? (
              <>
                <circle cx="184" cy="31" r="12" />
                <path d="M184 43v24M172 55h24" />
              </>
            ) : null}
          </>
        ) : null}
        {kind === 'spouse' ? (
          <>
            <circle cx="92" cy="54" r="22" />
            <circle cx="148" cy="54" r="22" />
            <path d="M52 134c7-36 28-52 40-52s33 16 40 52" />
            <path d="M108 134c7-36 28-52 40-52s33 16 40 52" />
            <path d="M111 103h18" />
          </>
        ) : null}
        {kind === 'older-sibling' || kind === 'younger-sibling' ? (
          <>
            <circle cx="88" cy="50" r={kind === 'older-sibling' ? 25 : 17} />
            <circle cx="154" cy="64" r={kind === 'older-sibling' ? 17 : 25} />
            <path d="M45 134c7-38 30-56 43-56s36 18 43 56" />
            <path d="M118 134c6-33 25-49 36-49s30 16 36 49" />
          </>
        ) : null}
        {kind === 'son' ? (
          <>
            <circle cx="84" cy="43" r="23" />
            <path d="M44 132c7-38 29-56 40-56s34 18 40 56" />
            <circle cx="158" cy="73" r="17" />
            <path d="M128 132c5-27 21-40 30-40s25 13 30 40" />
            <path d="M111 82h24M129 76l8 6-8 6" />
            <circle cx="196" cy="43" r="13" />
            <path d="M205 34l17-17M214 17h8v8" />
          </>
        ) : null}
        {kind === 'daughter' ? (
          <>
            <circle cx="84" cy="43" r="23" />
            <path d="M44 132c7-38 29-56 40-56s34 18 40 56" />
            <circle cx="158" cy="73" r="17" />
            <path d="M128 132c5-27 21-40 30-40s25 13 30 40" />
            <path d="M111 82h24M129 76l8 6-8 6" />
            <circle cx="196" cy="43" r="13" />
            <path d="M196 56v27M183 69h26" />
          </>
        ) : null}
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  )
}

export const PeopleQuizScreen = () => {
  const language = useQuizStore((state) => state.language)
  const copy = getAppCopy(language)
  const currentQuestion = useQuizStore((state) => state.currentVocabularyQuestion)
  const currentResult = useQuizStore((state) => state.currentVocabularyResult)
  const score = useQuizStore((state) => state.score)
  const completedQuestions = useQuizStore((state) => state.completedQuestions)
  const totalQuestions = useQuizStore((state) => state.totalQuestions)
  const resetSession = useQuizStore((state) => state.resetSession)
  const submitVocabularyAnswer = useQuizStore(
    (state) => state.submitVocabularyAnswer
  )
  const nextVocabularyQuestion = useQuizStore(
    (state) => state.nextVocabularyQuestion
  )
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

  const correctItem = peopleVocabulary.find(
    (item) => item.id === currentQuestion.correctItemId
  )
  const correctMeaning = correctItem
    ? getVocabularyMeaning(correctItem, language)
    : currentQuestion.prompt
  const meaningExplanation =
    language === 'es-419'
      ? `${currentQuestion.correctHanzi} significa ${correctMeaning}.`
      : `${currentQuestion.correctHanzi} means ${correctMeaning}.`

  return (
    <ScreenShell>
      <div className="mx-auto grid w-full max-w-5xl gap-4">
        <div className="border border-[#30455f] bg-[#f7eedf] p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-start gap-3">
              <h1 className="inline-flex border border-[#1f2f44] bg-[#1f2f44] px-3 py-2 text-2xl font-semibold tracking-[0.04em] text-[#f7eedf]">
                {copy.peopleMenuHanzi}
              </h1>
              <div className="flex flex-col gap-2">
                <p className="pt-1 text-[11px] uppercase tracking-[0.35em] text-[#5b6f84]">
                  {copy.peopleMenuLabel}
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
            <PeoplePromptVisual
              itemId={currentQuestion.correctItemId}
              label={currentQuestion.prompt}
            />
          </div>

          <div className="mt-6 grid gap-px border border-[#30455f] bg-[#30455f] sm:grid-cols-2">
            {currentQuestion.options.map((option) => {
              const wasSelected = currentResult?.selectedItemId === option.id
              const isCorrect = currentResult?.correctItemId === option.id
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
                      onClick={() => submitVocabularyAnswer(option.id)}
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
                    <SpeakButton
                      label={`${copy.speakLabel}: ${option.hanzi}`}
                      icon="speak"
                      iconOnly
                      className="px-2 py-2"
                      onClick={() =>
                        void replayText(`people-option:${option.id}`, option.hanzi)
                      }
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {currentResult ? (
            <div className="mt-6 border border-[#30455f] bg-[#f3e6d1] p-4 sm:p-5">
              <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
                <div>
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
                  </div>
                  <p className="mt-4 text-xl font-medium text-[#1f2f44]">
                    {currentQuestion.correctHanzi}
                    {currentQuestion.correctBopomofo ? (
                      <>
                        {' '}
                        ({currentQuestion.correctBopomofo} /{' '}
                        {currentQuestion.correctPinyin})
                      </>
                    ) : (
                      <> ({currentQuestion.correctPinyin})</>
                    )}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#5b6f84]">
                    {meaningExplanation}
                  </p>
                  <SpeakButton
                    label={`${copy.speakLabel}: ${currentQuestion.correctHanzi}`}
                    icon="speak"
                    iconOnly
                    className="mt-3"
                    onClick={() =>
                      void replayText(
                        `people-correct:${currentQuestion.id}`,
                        currentQuestion.correctHanzi
                      )
                    }
                  />
                </div>
                <div className="flex flex-col justify-end gap-5 border-t border-[#30455f] pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                  <ActionButton onClick={nextVocabularyQuestion} className="w-full">
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

