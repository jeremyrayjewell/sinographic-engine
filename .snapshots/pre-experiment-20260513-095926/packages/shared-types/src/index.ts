export type AppLocale = 'en' | 'es-419'

export interface PinyinReading {
  surface: string
  underlying?: string
  bopomofo?: string
}

export interface ExampleSentence {
  id: string
  hanzi: string
  pinyin: PinyinReading
  english: string
}

export interface RegionalUsage {
  taiwan?: boolean
  mainland?: boolean
  hongkong?: boolean
}

export interface Classifier {
  id: string
  hanzi: string
  pinyin: PinyinReading
  meanings: string[]
  usage: string
  semanticTags: string[]
  compatibleNouns?: string[]
  relatedClassifiers?: string[]
  regionalUsage?: RegionalUsage
  difficulty: number
  taiwanFrequency: number
  examples: ExampleSentence[]
}

export interface ClassifierDeck {
  id: string
  name: string
  description: string
  classifierHanzi: string[]
  plannedCount: number
}

export interface QuizOption {
  id: string
  hanzi: string
  pinyin: string
  bopomofo?: string
  meaning: string
}

export interface QuizQuestion {
  id: string
  prompt: string
  promptPinyin: string
  promptBopomofo?: string
  promptEnglish: string
  correctClassifierId: string
  correctClassifierHanzi: string
  options: QuizOption[]
  difficulty: number
  semanticTags: string[]
}

export interface QuizResult {
  questionId: string
  selectedClassifierId: string
  correctClassifierId: string
  isCorrect: boolean
  prompt: string
}
