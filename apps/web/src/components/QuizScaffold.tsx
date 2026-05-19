import type { ReactNode } from 'react'
import barImage from '../../../../content/bar.png'
import { LanguageToggle } from '@/components/LanguageToggle'

export type QuizCopy = {
  score: string
  progress: string
  returnHome: string
  returnHomeHanzi: string
}

const optionStateClass = ({
  showState,
  isCorrect,
  wasSelected
}: {
  showState: boolean
  isCorrect: boolean
  wasSelected: boolean
}) => {
  if (showState && isCorrect) {
    return 'bg-[#8c2f22] text-[#f5ead9]'
  }

  if (showState && wasSelected) {
    return 'bg-[#24384f] text-[#f5ead9]'
  }

  return 'bg-[#f7eedf] text-[#2b241e] hover:bg-[#ead9c1]'
}

interface QuizSessionHeaderProps {
  titleHanzi: string
  titleLabel: string
  score: number
  completedQuestions: number
  totalQuestions: number
  copy: QuizCopy
  onHome: () => void
}

export const QuizSessionHeader = ({
  titleHanzi,
  titleLabel,
  score,
  completedQuestions,
  totalQuestions,
  copy,
  onHome
}: QuizSessionHeaderProps) => {
  return (
    <div className="border border-[#30455f] bg-[#f7eedf] p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-start gap-3">
          <h1 className="inline-flex border border-[#1f2f44] bg-[#1f2f44] px-3 py-2 text-2xl font-semibold tracking-[0.04em] text-[#f7eedf]">
            {titleHanzi}
          </h1>
          <div className="flex flex-col gap-2">
            <p className="pt-1 text-[11px] uppercase tracking-[0.35em] text-[#5b6f84]">
              {titleLabel}
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
            onClick={onHome}
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
  )
}

interface QuizOptionGridProps<TOption extends { id: string }> {
  options: TOption[]
  selectedId?: string
  correctId?: string
  disabled: boolean
  onSelect: (optionId: string) => void
  renderOption: (option: TOption) => ReactNode
  renderAccessory?: (option: TOption) => ReactNode
}

export const QuizOptionGrid = <TOption extends { id: string }>({
  options,
  selectedId,
  correctId,
  disabled,
  onSelect,
  renderOption,
  renderAccessory
}: QuizOptionGridProps<TOption>) => {
  return (
    <div className="mt-6 grid gap-px border border-[#30455f] bg-[#30455f] sm:grid-cols-2">
      {options.map((option) => {
        const wasSelected = selectedId === option.id
        const isCorrect = correctId === option.id

        return (
          <div
            key={option.id}
            className={`px-3 py-3 text-left transition ${optionStateClass({
              showState: disabled,
              isCorrect,
              wasSelected
            })}`}
          >
            <div className="flex items-start justify-between gap-3">
              <button
                type="button"
                onClick={() => onSelect(option.id)}
                disabled={disabled}
                className="min-w-0 flex-1 text-left"
              >
                {renderOption(option)}
              </button>
              {renderAccessory ? (
                <div className="flex shrink-0 gap-2">{renderAccessory(option)}</div>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
