import type {
  VocabularyItem,
  VocabularyQuizOption,
  VocabularyQuizQuestion,
  VocabularyQuizResult
} from '@sinographic-engine/shared-types'

export interface VocabularySessionState {
  askedItemIds: string[]
  score: number
  results: VocabularyQuizResult[]
}

export interface GenerateVocabularyQuestionOptions {
  excludeItemIds?: string[]
}

const shuffleAnswers = <T>(items: T[]) => {
  const copy = [...items]

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]]
  }

  return copy
}

const toOption = (item: VocabularyItem): VocabularyQuizOption => ({
  id: item.id,
  hanzi: item.hanzi,
  pinyin: item.pinyin,
  bopomofo: item.bopomofo,
  meaning: item.meaning
})

export const generateVocabularyQuestion = (
  items: VocabularyItem[],
  options: GenerateVocabularyQuestionOptions = {}
): VocabularyQuizQuestion => {
  const excluded = options.excludeItemIds ?? []
  const availableItems = items.filter((item) => !excluded.includes(item.id))
  const pool = availableItems.length >= 1 ? availableItems : items
  const correct = pool[Math.floor(Math.random() * pool.length)]
  const distractors = shuffleAnswers(
    items.filter((item) => item.id !== correct.id)
  )
    .slice(0, 3)
    .map(toOption)

  return {
    id: `vocab-${correct.id}`,
    prompt: correct.meaning,
    correctItemId: correct.id,
    correctHanzi: correct.hanzi,
    correctPinyin: correct.pinyin,
    correctBopomofo: correct.bopomofo,
    options: shuffleAnswers([toOption(correct), ...distractors])
  }
}

export const evaluateVocabularyAnswer = (
  question: VocabularyQuizQuestion,
  selectedItemId: string
): VocabularyQuizResult => ({
  questionId: question.id,
  selectedItemId,
  correctItemId: question.correctItemId,
  isCorrect: selectedItemId === question.correctItemId,
  prompt: question.prompt
})

export const createVocabularySessionState = (): VocabularySessionState => ({
  askedItemIds: [],
  score: 0,
  results: []
})

export const recordVocabularyResult = (
  state: VocabularySessionState,
  result: VocabularyQuizResult
): VocabularySessionState => ({
  askedItemIds: [...state.askedItemIds, result.correctItemId],
  score: state.score + (result.isCorrect ? 1 : 0),
  results: [...state.results, result]
})
