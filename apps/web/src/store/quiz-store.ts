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
import type {
  AppLocale,
  QuizQuestion,
  QuizResult
} from '@sinographic-engine/shared-types'

type ScreenStatus = 'home' | 'quiz' | 'results'
export type SessionLengthOption = 20 | 30 | 40 | 'max'

interface QuizStore {
  status: ScreenStatus
  language: AppLocale
  currentQuestion: QuizQuestion | null
  currentResult: QuizResult | null
  score: number
  completedQuestions: number
  selectedDeckId: string
  selectedSessionLength: SessionLengthOption
  sessionHistory: QuizResult[]
  totalQuestions: number
  setLanguage: (language: AppLocale) => void
  startSession: () => void
  setDeck: (deckId: string) => void
  setSessionLength: (length: SessionLengthOption) => void
  submitAnswer: (classifierId: string) => void
  nextQuestion: () => void
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

export const useQuizStore = create<QuizStore>((set, get) => ({
  status: 'home',
  language: 'en',
  currentQuestion: null,
  currentResult: null,
  score: 0,
  completedQuestions: 0,
  selectedDeckId: 'survival',
  selectedSessionLength: 'max',
  sessionHistory: [],
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
      currentQuestion: buildQuestion(
        selectedDeckId,
        session.askedClassifierIds,
        language
      ),
      currentResult: null,
      score: 0,
      completedQuestions: 0,
      sessionHistory: [],
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
  resetSession: () => {
    set({
      status: 'home',
      currentQuestion: null,
      currentResult: null,
      score: 0,
      completedQuestions: 0,
      sessionHistory: []
    })
  }
}))
