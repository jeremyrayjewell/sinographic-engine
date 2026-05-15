import { create } from 'zustand'
import {
  getClassifiersForDeck,
  getLocalizedClassifierById,
  getLocalizedClassifiers,
  getLocalizedClassifiersForDeck
} from '@sinographic-engine/classifier-content'
import {
  createSessionState,
  evaluateAnswer,
  generateQuestion,
  recordResult
} from '@sinographic-engine/learning-engine'
import {
  createNumberSessionState,
  evaluateNumberAnswer,
  generateMathQuestion,
  generateNumberQuestion,
  recordNumberResult
} from '@sinographic-engine/number-engine'
import type {
  AppLocale,
  AppModule,
  NumberQuizAnswerValue,
  NumberQuizQuestion,
  NumberQuizResult,
  NumbersSetId,
  QuizQuestion,
  QuizResult
} from '@sinographic-engine/shared-types'

type ScreenStatus = 'home' | 'quiz' | 'results'
export type SessionLengthOption = 20 | 30 | 40 | 'max'
type NumbersRange = { min: number; max: number; maxSessionLength: number }

interface QuizStore {
  status: ScreenStatus
  activeModule: AppModule
  language: AppLocale
  currentQuestion: QuizQuestion | null
  currentResult: QuizResult | null
  currentNumberQuestion: NumberQuizQuestion | null
  currentNumberResult: NumberQuizResult | null
  score: number
  completedQuestions: number
  selectedDeckId: string
  selectedSessionLength: SessionLengthOption
  selectedNumbersSet: NumbersSetId
  selectedNumbersSessionLength: SessionLengthOption
  sessionHistory: QuizResult[]
  numberSessionHistory: NumberQuizResult[]
  totalQuestions: number
  setLanguage: (language: AppLocale) => void
  startSession: () => void
  startNumbersSession: () => void
  setDeck: (deckId: string) => void
  setSessionLength: (length: SessionLengthOption) => void
  setNumbersSet: (setId: NumbersSetId) => void
  setNumbersSessionLength: (length: SessionLengthOption) => void
  submitAnswer: (classifierId: string) => void
  submitNumberAnswer: (value: NumberQuizAnswerValue) => void
  nextQuestion: () => void
  nextNumberQuestion: () => void
  resetSession: () => void
}

const buildQuestion = (
  deckId: string,
  askedClassifierIds: string[],
  language: AppLocale
) => {
  const deckClassifiers = getLocalizedClassifiersForDeck(deckId, language)
  const pool =
    deckClassifiers.length > 0
      ? deckClassifiers
      : getLocalizedClassifiers(language)

  return generateQuestion(pool, {
    excludeClassifierIds: askedClassifierIds
  })
}

const relocalizeQuestion = (
  question: QuizQuestion,
  language: AppLocale
): QuizQuestion => {
  const classifier = getLocalizedClassifierById(
    question.correctClassifierId,
    language
  )

  if (!classifier) {
    return question
  }

  const exampleId = question.id.replace(`${question.correctClassifierId}-`, '')
  const example = classifier.examples.find((entry) => entry.id === exampleId)

  return {
    ...question,
    promptEnglish: example?.english ?? question.promptEnglish,
    options: question.options.map((option) => {
      const localizedOption = getLocalizedClassifierById(option.id, language)

      return localizedOption
        ? {
            ...option,
            meaning: localizedOption.meanings[0] ?? option.meaning
          }
        : option
    }),
    semanticTags: classifier.semanticTags
  }
}

const resolveSessionLength = (
  deckId: string,
  selectedSessionLength: SessionLengthOption,
  language: AppLocale
) => {
  if (selectedSessionLength !== 'max') {
    return selectedSessionLength
  }

  const deckCount = getClassifiersForDeck(deckId).length

  if (deckCount > 0) {
    return deckCount
  }

  return getLocalizedClassifiers(language).length
}

const resolveNumbersSessionLength = (
  setId: NumbersSetId,
  selectedSessionLength: SessionLengthOption
) => {
  if (selectedSessionLength !== 'max') {
    return selectedSessionLength
  }

  return getNumbersRange(setId).maxSessionLength
}

const getNumbersRange = (setId: NumbersSetId): NumbersRange => {
  switch (setId) {
    case 'simple-numbers':
      return { min: 1, max: 100, maxSessionLength: 100 }
    case 'hundreds':
      return { min: 100, max: 999, maxSessionLength: 100 }
    case 'numbers':
      return { min: 1, max: 1_000_000, maxSessionLength: 50 }
    case 'currency':
    case 'math':
      return { min: 1, max: 100, maxSessionLength: 20 }
  }
}

const buildNumbersQuestion = (
  setId: NumbersSetId,
  excludedValues: NumberQuizAnswerValue[]
): NumberQuizQuestion => {
  const range = getNumbersRange(setId)

  if (setId === 'math') {
    return generateMathQuestion({
      excludeValues: excludedValues,
      minResult: range.min,
      maxResult: range.max
    })
  }

  return generateNumberQuestion({
    excludeValues: excludedValues.filter(
      (value): value is number => typeof value === 'number'
    ),
    min: range.min,
    max: range.max
  })
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  status: 'home',
  activeModule: 'classifiers',
  language: 'en',
  currentQuestion: null,
  currentResult: null,
  currentNumberQuestion: null,
  currentNumberResult: null,
  score: 0,
  completedQuestions: 0,
  selectedDeckId: 'survival',
  selectedSessionLength: 'max',
  selectedNumbersSet: 'simple-numbers',
  selectedNumbersSessionLength: 20,
  sessionHistory: [],
  numberSessionHistory: [],
  totalQuestions: 20,
  setLanguage: (language) => {
    const { currentQuestion } = get()

    set({
      language,
      currentQuestion: currentQuestion
        ? relocalizeQuestion(currentQuestion, language)
        : null
    })
  },
  startSession: () => {
    const session = createSessionState()
    const { selectedDeckId, selectedSessionLength, language } = get()
    const totalQuestions = resolveSessionLength(
      selectedDeckId,
      selectedSessionLength,
      language
    )

    set({
      status: 'quiz',
      activeModule: 'classifiers',
      currentQuestion: buildQuestion(
        selectedDeckId,
        session.askedClassifierIds,
        language
      ),
      currentResult: null,
      currentNumberQuestion: null,
      currentNumberResult: null,
      score: 0,
      completedQuestions: 0,
      sessionHistory: [],
      numberSessionHistory: [],
      totalQuestions
    })
  },
  startNumbersSession: () => {
    const session = createNumberSessionState()
    const { selectedNumbersSet, selectedNumbersSessionLength } = get()
    const totalQuestions = resolveNumbersSessionLength(
      selectedNumbersSet,
      selectedNumbersSessionLength
    )

    set({
      status: 'quiz',
      activeModule: 'numbers',
      currentQuestion: null,
      currentResult: null,
      currentNumberQuestion: buildNumbersQuestion(
        selectedNumbersSet,
        session.askedValues
      ),
      currentNumberResult: null,
      score: 0,
      completedQuestions: 0,
      sessionHistory: [],
      numberSessionHistory: [],
      totalQuestions
    })
  },
  setDeck: (deckId) => {
    set({ selectedDeckId: deckId })
  },
  setSessionLength: (length) => {
    const { selectedDeckId, language } = get()

    set({
      selectedSessionLength: length,
      totalQuestions: resolveSessionLength(selectedDeckId, length, language)
    })
  },
  setNumbersSet: (setId) => {
    const { selectedNumbersSessionLength } = get()

    set({
      selectedNumbersSet: setId,
      totalQuestions: resolveNumbersSessionLength(setId, selectedNumbersSessionLength)
    })
  },
  setNumbersSessionLength: (length) => {
    const { selectedNumbersSet } = get()

    set({
      selectedNumbersSessionLength: length,
      totalQuestions: resolveNumbersSessionLength(selectedNumbersSet, length)
    })
  },
  submitAnswer: (classifierId) => {
    const state = get()

    if (!state.currentQuestion || state.currentResult) {
      return
    }

    const result = evaluateAnswer(state.currentQuestion, classifierId)
    const session = recordResult(
      {
        askedClassifierIds: state.sessionHistory.map(
          (entry) => entry.correctClassifierId
        ),
        score: state.score,
        results: state.sessionHistory
      },
      result
    )

    set({
      currentResult: result,
      score: session.score,
      completedQuestions: session.results.length,
      sessionHistory: session.results
    })
  },
  submitNumberAnswer: (value) => {
    const state = get()

    if (!state.currentNumberQuestion || state.currentNumberResult) {
      return
    }

    const result = evaluateNumberAnswer(state.currentNumberQuestion, value)
    const session = recordNumberResult(
      {
        askedValues: state.numberSessionHistory.map((entry) => entry.correctValue),
        score: state.score,
        results: state.numberSessionHistory
      },
      result
    )

    set({
      currentNumberResult: result,
      score: session.score,
      completedQuestions: session.results.length,
      numberSessionHistory: session.results
    })
  },
  nextQuestion: () => {
    const state = get()

    if (!state.currentQuestion || !state.currentResult) {
      return
    }

    if (state.completedQuestions >= state.totalQuestions) {
      set({
        status: 'results',
        currentQuestion: null,
        currentResult: null
      })
      return
    }

    set({
      currentQuestion: buildQuestion(
        state.selectedDeckId,
        state.sessionHistory.map((entry) => entry.correctClassifierId),
        state.language
      ),
      currentResult: null
    })
  },
  nextNumberQuestion: () => {
    const state = get()

    if (!state.currentNumberQuestion || !state.currentNumberResult) {
      return
    }

    if (state.completedQuestions >= state.totalQuestions) {
      set({
        status: 'results',
        currentNumberQuestion: null,
        currentNumberResult: null
      })
      return
    }

    set({
      currentNumberQuestion: buildNumbersQuestion(
        state.selectedNumbersSet,
        state.numberSessionHistory.map((entry) => entry.correctValue)
      ),
      currentNumberResult: null
    })
  },
  resetSession: () => {
    set({
      status: 'home',
      currentQuestion: null,
      currentResult: null,
      currentNumberQuestion: null,
      currentNumberResult: null,
      score: 0,
      completedQuestions: 0,
      sessionHistory: [],
      numberSessionHistory: []
    })
  }
}))
