import type {
  Classifier,
  QuizOption,
  QuizQuestion,
  QuizResult
} from '@sinographic-engine/shared-types'

export interface SessionState {
  askedClassifierIds: string[]
  score: number
  results: QuizResult[]
}

export interface GenerateQuestionOptions {
  difficulty?: number
  excludeClassifierIds?: string[]
}

const pickRandom = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)]
}

const getPrimaryMeaning = (classifier: Classifier) => {
  return classifier.meanings[0] ?? 'classifier'
}

const normalizePinyinGap = (pinyin: string, classifierPinyin: string) => {
  return pinyin.replace(classifierPinyin, '___')
}

const normalizeBopomofoGap = (
  bopomofo: string,
  classifierBopomofo: string
) => {
  return bopomofo.replace(classifierBopomofo, '___')
}

const normalizeHanziGap = (hanzi: string, classifierHanzi: string) => {
  return hanzi.replace(classifierHanzi, '___')
}

export const shuffleAnswers = <T>(answers: T[]): T[] => {
  const copy = [...answers]

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]]
  }

  return copy
}

export const getDistractors = (
  classifiers: Classifier[],
  correct: Classifier,
  count = 3
): Classifier[] => {
  const similar = classifiers
    .filter((item) => item.id !== correct.id)
    .map((item) => {
      const sharedTags = item.semanticTags.filter((tag) =>
        correct.semanticTags.includes(tag)
      ).length
      const sharedNouns = (item.compatibleNouns ?? []).filter((noun) =>
        (correct.compatibleNouns ?? []).includes(noun)
      ).length
      const directlyRelated = (correct.relatedClassifiers ?? []).includes(item.id)
        ? 1
        : 0
      const difficultyDistance = Math.abs(item.difficulty - correct.difficulty)
      const frequencyDistance = Math.abs(
        item.taiwanFrequency - correct.taiwanFrequency
      )

      return {
        item,
        score:
          sharedTags * 12 +
          sharedNouns * 5 +
          directlyRelated * 16 -
          difficultyDistance * 2 -
          frequencyDistance / 25
      }
    })
    .sort((left, right) => right.score - left.score)
    .map(({ item }) => item)

  const chosen: Classifier[] = []

  for (const candidate of similar) {
    if (chosen.length === count) {
      break
    }

    chosen.push(candidate)
  }

  if (chosen.length < count) {
    const fillers = classifiers.filter(
      (item) =>
        item.id !== correct.id && !chosen.some((entry) => entry.id === item.id)
    )

    return [...chosen, ...shuffleAnswers(fillers).slice(0, count - chosen.length)]
  }

  return chosen
}

export const generateQuestion = (
  classifiers: Classifier[],
  options: GenerateQuestionOptions = {}
): QuizQuestion => {
  const filtered = classifiers.filter((classifier) => {
    const matchesDifficulty =
      options.difficulty === undefined ||
      classifier.difficulty <= options.difficulty
    const notExcluded =
      options.excludeClassifierIds === undefined ||
      !options.excludeClassifierIds.includes(classifier.id)

    return matchesDifficulty && notExcluded
  })

  const pool = filtered.length > 0 ? filtered : classifiers
  const correct = pickRandom(pool)
  const example = pickRandom(correct.examples)
  const distractors = getDistractors(classifiers, correct, 3)

  const optionsList: QuizOption[] = shuffleAnswers([
    correct,
    ...distractors
  ]).map((classifier) => ({
    id: classifier.id,
    hanzi: classifier.hanzi,
    pinyin: classifier.pinyin.surface,
    bopomofo: classifier.pinyin.bopomofo,
    meaning: getPrimaryMeaning(classifier)
  }))

  return {
    id: `${correct.id}-${example.id}`,
    prompt: normalizeHanziGap(example.hanzi, correct.hanzi),
    promptPinyin: normalizePinyinGap(
      example.pinyin.surface,
      correct.pinyin.surface
    ),
    promptBopomofo:
      example.pinyin.bopomofo && correct.pinyin.bopomofo
        ? normalizeBopomofoGap(
            example.pinyin.bopomofo,
            correct.pinyin.bopomofo
          )
        : example.pinyin.bopomofo,
    promptEnglish: example.english,
    correctClassifierId: correct.id,
    correctClassifierHanzi: correct.hanzi,
    options: optionsList,
    difficulty: correct.difficulty,
    semanticTags: correct.semanticTags
  }
}

export const evaluateAnswer = (
  question: QuizQuestion,
  selectedClassifierId: string
): QuizResult => {
  return {
    questionId: question.id,
    selectedClassifierId,
    correctClassifierId: question.correctClassifierId,
    isCorrect: selectedClassifierId === question.correctClassifierId,
    prompt: question.prompt
  }
}

export const createSessionState = (): SessionState => ({
  askedClassifierIds: [],
  score: 0,
  results: []
})

export const recordResult = (
  state: SessionState,
  result: QuizResult
): SessionState => ({
  askedClassifierIds: [...state.askedClassifierIds, result.correctClassifierId],
  score: state.score + (result.isCorrect ? 1 : 0),
  results: [...state.results, result]
})
