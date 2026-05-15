export type AppLocale = 'en' | 'es-419'
export type AppModule = 'classifiers' | 'numbers'
export type NumbersSetId =
  | 'simple-numbers'
  | 'hundreds'
  | 'numbers'
  | 'currency'
  | 'math'
export type NumberQuizAnswerValue = number | string

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
  sourceSentence: ExampleSentence
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

export interface NumberQuizOption {
  id: string
  value: NumberQuizAnswerValue
  hanzi: string
  pinyin: string
  bopomofo?: string
  speechText?: string
}

export interface NumberQuizQuestion {
  id: string
  prompt: string
  correctValue: NumberQuizAnswerValue
  correctHanzi: string
  correctPinyin: string
  correctBopomofo?: string
  correctSpeechText?: string
  options: NumberQuizOption[]
}

export interface NumberQuizResult {
  questionId: string
  selectedValue: NumberQuizAnswerValue
  correctValue: NumberQuizAnswerValue
  isCorrect: boolean
  prompt: string
  correctHanzi: string
  correctPinyin: string
  correctBopomofo?: string
  correctSpeechText?: string
  selectedHanzi: string
  selectedPinyin: string
  selectedBopomofo?: string
  selectedSpeechText?: string
}
