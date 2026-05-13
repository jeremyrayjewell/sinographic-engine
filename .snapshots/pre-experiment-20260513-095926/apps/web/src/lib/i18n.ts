import type { AppLocale } from '@sinographic-engine/shared-types'

type SessionLengthCopy = Record<number, string>

type AppCopy = {
  languageLabel: string
  languageEnglish: string
  languageSpanish: string
  appLabel: string
  homeTitle: string
  homeIntro: string
  subsystemLabel: string
  subsystemTitle: string
  subsystemIntro: string
  grammarMenuHanzi: string
  grammarMenuLabel: string
  classifierPracticeHanzi: string
  classifierPracticeLabel: string
  lengthLabelHanzi: string
  lengthLabel: string
  sessionLength: string
  questions: string
  activeDeck: string
  libraryTotal: (count: number) => string
  trainingSetup: string
  chooseDeck: string
  deckCategories: string
  classifiersCount: (count: number) => string
  beginHanzi: string
  beginLabel: string
  chooseLongerRun: string
  selected: string
  preset: string
  sessionLengthCopy: SessionLengthCopy
  activeSession: string
  fillMissingClassifier: string
  score: string
  progress: string
  prompt: string
  promptHanzi: string
  correct: string
  correctHanzi: string
  review: string
  reviewHanzi: string
  usedHereFor: string
  oftenUsedWith: string
  viewResults: string
  viewResultsHanzi: string
  nextQuestion: string
  nextQuestionHanzi: string
  datasetLoaded: (count: number) => string
  sessionResults: string
  sessionResultsHanzi: string
  classifierReview: string
  accuracy: string
  accuracyHanzi: string
  dataset: string
  datasetHanzi: string
  runAnotherSession: string
  runAnotherSessionHanzi: string
  returnHome: string
  returnHomeHanzi: string
  attemptHistory: string
  attemptHistoryHanzi: string
  selectedAnswer: (hanzi: string) => string
}

const appCopy: Record<AppLocale, AppCopy> = {
  en: {
    languageLabel: 'Language',
    languageEnglish: 'English',
    languageSpanish: 'Español',
    appLabel: 'Sinographic Engine',
    homeTitle: '華文引擎',
    homeIntro:
      'A modular local-first workspace for classifier training, grammar study, semantic systems, tone work, handwriting, sentence mining, and future corpus tools.',
    subsystemLabel: 'Classifier Training',
    subsystemTitle: 'Taiwan Mandarin classifier contrast.',
    subsystemIntro:
      'This subsystem stays deliberately spare. It should feel like a working linguistic instrument, not a study toy.',
    grammarMenuHanzi: '語法',
    grammarMenuLabel: 'Grammar',
    classifierPracticeHanzi: '量詞',
    classifierPracticeLabel: 'Classifiers',
    lengthLabelHanzi: '長度',
    lengthLabel: 'Length',
    sessionLength: 'Session Length',
    questions: 'Questions',
    activeDeck: 'Active Deck',
    libraryTotal: (count) => `Library: ${count} total`,
    trainingSetup: 'Training Setup',
    chooseDeck: 'Choose deck',
    deckCategories: 'Deck Categories',
    classifiersCount: (count) => `${count} classifiers`,
    beginHanzi: '開始',
    beginLabel: 'Begin',
    chooseLongerRun: 'Choose a longer run',
    selected: 'Selected',
    preset: 'Preset',
    sessionLengthCopy: {
      20: 'Default extended session',
      30: 'Longer contrastive review',
      40: 'Deep repetition run'
    },
    activeSession: 'Active Session',
    fillMissingClassifier: 'Fill the missing classifier',
    score: 'Score',
    progress: 'Progress',
    prompt: 'Prompt',
    promptHanzi: '題',
    correct: 'Correct',
    correctHanzi: '正',
    review: 'Review',
    reviewHanzi: '析',
    usedHereFor: 'is used here for',
    oftenUsedWith: 'Often used with',
    viewResults: 'View Results',
    viewResultsHanzi: '結果',
    nextQuestion: 'Next Question',
    nextQuestionHanzi: '下一題',
    datasetLoaded: (count) =>
      `Dataset loaded: ${count} classifiers from the starter Taiwan Mandarin content pack.`,
    sessionResults: 'Session Results',
    sessionResultsHanzi: '結果',
    classifierReview: 'Classifier review',
    accuracy: 'Accuracy',
    accuracyHanzi: '準',
    dataset: 'Dataset',
    datasetHanzi: '庫',
    runAnotherSession: 'Run Another Session',
    runAnotherSessionHanzi: '再來',
    returnHome: 'Return Home',
    returnHomeHanzi: '返回',
    attemptHistory: 'Attempt History',
    attemptHistoryHanzi: '記錄',
    selectedAnswer: (hanzi) => `Selected ${hanzi}`
  },
  'es-419': {
    languageLabel: 'Idioma',
    languageEnglish: 'Inglés',
    languageSpanish: 'Español',
    appLabel: 'Sinographic Engine',
    homeTitle: '華文引擎',
    homeIntro:
      'Un espacio de trabajo modular y local-first para entrenamiento con clasificadores, gramática, sistemas semánticos, trabajo tonal, caligrafía, minería de oraciones y futuras herramientas de corpus.',
    subsystemLabel: 'Entrenamiento de clasificadores',
    subsystemTitle: 'Contraste de clasificadores del mandarín taiwanés.',
    subsystemIntro:
      'Este subsistema se mantiene deliberadamente sobrio. Debe sentirse como un instrumento lingüístico de trabajo, no como un juguete de estudio.',
    grammarMenuHanzi: '語法',
    grammarMenuLabel: 'Gramática',
    classifierPracticeHanzi: '量詞',
    classifierPracticeLabel: 'Clasificadores',
    lengthLabelHanzi: '長度',
    lengthLabel: 'Duración',
    sessionLength: 'Duración de la sesión',
    questions: 'Preguntas',
    activeDeck: 'Mazo activo',
    libraryTotal: (count) => `Biblioteca: ${count} en total`,
    trainingSetup: 'Configuración de entrenamiento',
    chooseDeck: 'Elegir mazo',
    deckCategories: 'Categorías de mazos',
    classifiersCount: (count) => `${count} clasificadores`,
    beginHanzi: '開始',
    beginLabel: 'Iniciar',
    chooseLongerRun: 'Elegir una sesión más larga',
    selected: 'Seleccionado',
    preset: 'Preajuste',
    sessionLengthCopy: {
      20: 'Sesión extendida por defecto',
      30: 'Repaso contrastivo más largo',
      40: 'Sesión profunda de repetición'
    },
    activeSession: 'Sesión activa',
    fillMissingClassifier: 'Completa el clasificador faltante',
    score: 'Puntaje',
    progress: 'Progreso',
    prompt: 'Enunciado',
    promptHanzi: '題',
    correct: 'Correcto',
    correctHanzi: '正',
    review: 'Revisar',
    reviewHanzi: '析',
    usedHereFor: 'se usa aquí para',
    oftenUsedWith: 'Se usa con frecuencia con',
    viewResults: 'Ver resultados',
    viewResultsHanzi: '結果',
    nextQuestion: 'Siguiente pregunta',
    nextQuestionHanzi: '下一題',
    datasetLoaded: (count) =>
      `Conjunto cargado: ${count} clasificadores del paquete inicial de contenido de mandarín taiwanés.`,
    sessionResults: 'Resultados de la sesión',
    sessionResultsHanzi: '結果',
    classifierReview: 'Repaso de clasificadores',
    accuracy: 'Precisión',
    accuracyHanzi: '準',
    dataset: 'Conjunto',
    datasetHanzi: '庫',
    runAnotherSession: 'Iniciar otra sesión',
    runAnotherSessionHanzi: '再來',
    returnHome: 'Volver al inicio',
    returnHomeHanzi: '返回',
    attemptHistory: 'Historial de intentos',
    attemptHistoryHanzi: '記錄',
    selectedAnswer: (hanzi) => `Elegiste ${hanzi}`
  }
}

export const getAppCopy = (locale: AppLocale) => appCopy[locale]
