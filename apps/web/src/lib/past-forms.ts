import type {
  AppLocale,
  PastQuizQuestion,
  PastQuizResult
} from '@sinographic-engine/shared-types'

export type PastAnswer = {
  id: string
  hanzi: string
  pinyin: string
  bopomofo: string
  english: string
}

export type PastExample = {
  id: string
  hanzi: string
  pinyin: string
  bopomofo: string
  english: string
  promptHanzi: string
  promptPinyin: string
  promptBopomofo: string
  answerId: string
  incorrect?: boolean
}

export type PastSection = {
  id: string
  hanzi: string
  label: string
  pinyin: string
  meaning: string
  concept: string
  examples: PastExample[]
  notes: string[]
}

const pastAnswers: PastAnswer[] = [
  { id: 'mei', hanzi: '沒', pinyin: 'méi', bopomofo: 'ㄇㄟˊ', english: 'did not / have not' },
  { id: 'meiyou', hanzi: '沒有', pinyin: 'méiyǒu', bopomofo: 'ㄇㄟˊ ㄧㄡˇ', english: 'did not / have not' },
  { id: 'bu', hanzi: '不', pinyin: 'bù', bopomofo: 'ㄅㄨˋ', english: 'not / will not' },
  { id: 'le', hanzi: '了', pinyin: 'le', bopomofo: 'ㄌㄜ˙', english: 'completed / changed' },
  { id: 'guo', hanzi: '過', pinyin: 'guò', bopomofo: 'ㄍㄨㄛˋ', english: 'have ever done' },
  { id: 'yiqian', hanzi: '以前', pinyin: 'yǐqián', bopomofo: 'ㄧˇ ㄑㄧㄢˊ', english: 'before' },
  { id: 'changchang', hanzi: '常常', pinyin: 'chángcháng', bopomofo: 'ㄔㄤˊ ㄔㄤˊ', english: 'often' },
  {
    id: 'yiqian-changchang',
    hanzi: '以前常常',
    pinyin: 'yǐqián chángcháng',
    bopomofo: 'ㄧˇ ㄑㄧㄢˊ ㄔㄤˊ ㄔㄤˊ',
    english: 'used to often'
  },
  { id: 'zai', hanzi: '在', pinyin: 'zài', bopomofo: 'ㄗㄞˋ', english: 'be doing' }
]

const pastSpanish = {
  answers: {
    mei: 'no hizo / no ha hecho',
    meiyou: 'no hizo / no ha hecho',
    bu: 'no / no va a',
    le: 'acción completada / cambio',
    guo: 'haber hecho alguna vez',
    yiqian: 'antes',
    changchang: 'a menudo',
    'yiqian-changchang': 'solía hacer a menudo',
    zai: 'estar haciendo'
  } as Record<string, string>,
  examples: {
    'mei-wo-mei-qu': 'No fui.',
    'mei-wo-meiyou-chi': 'No comí.',
    'mei-ta-mei-lai': 'Él no vino.',
    'le-wo-chi-le': 'Comí / ya he comido.',
    'le-wo-hui-jia-le': 'Me fui a casa / ya estoy en casa.',
    'le-jintian-xia-yu-le': 'Hoy empezó a llover.',
    'guo-wo-qu-guo-taiwan': 'He estado en Taiwán.',
    'guo-ni-kan-guo-ma': '¿Lo has visto antes?',
    'guo-wo-meiyou-kan-guo': 'No lo he visto antes.',
    'guo-wo-meiyou-guo': 'Incorrecto / incompleto por sí solo.',
    'yiqian-wo-yiqian-changchang-qu-canting':
      'Antes solía ir a este restaurante con frecuencia.',
    'yiqian-wo-yiqian-changchang-lai-dian':
      'Antes solía venir a esta tienda con frecuencia.',
    'yiqian-wo-yiqian-qu':
      'Fui antes / solía ir, según el contexto.',
    'yiqian-wo-changchang-qu':
      'Voy a menudo / iba a menudo, según el contexto.',
    'yiqian-wo-yiqian-changchang-qu': 'Antes solía ir a menudo.',
    'contrast-wo-bu-qu': 'No voy.',
    'contrast-wo-mei-qu': 'No fui.',
    'contrast-wo-chi-le': 'Comí / ya he comido.',
    'contrast-wo-chi-guo': 'Lo he comido antes.',
    'contrast-wo-zai-gongzuo':
      'Estoy trabajando / estaba trabajando, según el contexto.'
  } as Record<string, string>,
  sections: {
    mei: {
      label: 'Negación de acciones pasadas',
      meaning: 'no hizo / no ha hecho',
      concept: 'Se usa para acciones que no ocurrieron.',
      notes: [
        'Para acciones pasadas completadas, 不 normalmente no es la palabra que quieres.',
        '沒 y 沒有 son comunes; 沒 es más corto y muy natural al hablar.'
      ]
    },
    le: {
      label: 'Acción completada / cambio de estado',
      meaning: 'completado / ahora cambió',
      concept: 'Marca que algo ocurrió, terminó o ahora se volvió cierto.',
      notes: [
        'En esta etapa, piensa en 了 como una señal práctica de que la situación cambió.',
        'Puede coincidir con el pasado simple y el presente perfecto del inglés.'
      ]
    },
    guo: {
      label: 'Experiencia pasada',
      meaning: 'haber hecho alguna vez',
      concept: 'Se usa para experiencia vivida: algo ocurrió antes.',
      notes: [
        'El patrón negativo normal es 沒有 + verbo + 過.',
        '過 necesita una acción. 我沒有過 por sí solo no es un patrón completo para principiantes.'
      ]
    },
    'yiqian-changchang': {
      label: 'Solía',
      meaning: 'solía / antes con frecuencia',
      concept:
        'Usa 以前 y 常常 juntos cuando quieres una sensación clara de "solía".',
      notes: [
        '以前 y 常常 son opcionales por separado.',
        'Juntos hacen que el sentido de hábito pasado sea mucho más claro.'
      ]
    },
    pitfalls: {
      label: 'Contrastes comunes y errores de principiante',
      meaning: 'contraste',
      concept:
        'El mandarín suele depender del contexto. No mapees el tiempo verbal del inglés demasiado rígidamente al mandarín.',
      notes: [
        'El mandarín no marca el tiempo verbal de la misma manera que el inglés.',
        'Busca palabras de tiempo, contexto y partículas como 了 y 過.'
      ]
    }
  } as Record<
    string,
    { label: string; meaning: string; concept: string; notes: string[] }
  >
}

const localizeAnswerMeaning = (answer: PastAnswer, locale: AppLocale) =>
  locale === 'es-419' ? pastSpanish.answers[answer.id] ?? answer.english : answer.english

const localizeExampleMeaning = (example: PastExample, locale: AppLocale) =>
  locale === 'es-419' ? pastSpanish.examples[example.id] ?? example.english : example.english

export const localizePastSection = (section: PastSection, locale: AppLocale) => {
  const sectionCopy = locale === 'es-419' ? pastSpanish.sections[section.id] : null

  return {
    ...section,
    label: sectionCopy?.label ?? section.label,
    meaning: sectionCopy?.meaning ?? section.meaning,
    concept: sectionCopy?.concept ?? section.concept,
    notes: sectionCopy?.notes ?? section.notes,
    examples: section.examples.map((example) => ({
      ...example,
      english: localizeExampleMeaning(example, locale)
    }))
  }
}

export const pastSections: PastSection[] = [
  {
    id: 'mei',
    hanzi: '沒 / 沒有',
    label: 'Negation of past actions',
    pinyin: 'méi / méiyǒu',
    meaning: 'did not / have not',
    concept: 'Use this for actions that did not happen.',
    examples: [
      {
        id: 'mei-wo-mei-qu',
        hanzi: '我沒去',
        pinyin: 'wǒ méi qù',
        bopomofo: 'ㄨㄛˇ ㄇㄟˊ ㄑㄩˋ',
        english: "I didn't go.",
        promptHanzi: '我___去',
        promptPinyin: 'wǒ ___ qù',
        promptBopomofo: 'ㄨㄛˇ ___ ㄑㄩˋ',
        answerId: 'mei'
      },
      {
        id: 'mei-wo-meiyou-chi',
        hanzi: '我沒有吃',
        pinyin: 'wǒ méiyǒu chī',
        bopomofo: 'ㄨㄛˇ ㄇㄟˊ ㄧㄡˇ ㄔ',
        english: "I didn't eat.",
        promptHanzi: '我___吃',
        promptPinyin: 'wǒ ___ chī',
        promptBopomofo: 'ㄨㄛˇ ___ ㄔ',
        answerId: 'meiyou'
      },
      {
        id: 'mei-ta-mei-lai',
        hanzi: '他沒來',
        pinyin: 'tā méi lái',
        bopomofo: 'ㄊㄚ ㄇㄟˊ ㄌㄞˊ',
        english: "He didn't come.",
        promptHanzi: '他___來',
        promptPinyin: 'tā ___ lái',
        promptBopomofo: 'ㄊㄚ ___ ㄌㄞˊ',
        answerId: 'mei'
      }
    ],
    notes: [
      'For completed past actions, 不 is usually not the word you want.',
      '沒 and 沒有 are both common; 沒 is shorter and very natural in speech.'
    ]
  },
  {
    id: 'le',
    hanzi: '了',
    label: 'Completed action / change of state',
    pinyin: 'le',
    meaning: 'completed / now changed',
    concept: 'Marks that something happened, finished, or has now become true.',
    examples: [
      {
        id: 'le-wo-chi-le',
        hanzi: '我吃了',
        pinyin: 'wǒ chī le',
        bopomofo: 'ㄨㄛˇ ㄔ ㄌㄜ˙',
        english: 'I ate / I have eaten.',
        promptHanzi: '我吃___',
        promptPinyin: 'wǒ chī ___',
        promptBopomofo: 'ㄨㄛˇ ㄔ ___',
        answerId: 'le'
      },
      {
        id: 'le-wo-hui-jia-le',
        hanzi: '我回家了',
        pinyin: 'wǒ huí jiā le',
        bopomofo: 'ㄨㄛˇ ㄏㄨㄟˊ ㄐㄧㄚ ㄌㄜ˙',
        english: "I went home / I'm home now.",
        promptHanzi: '我回家___',
        promptPinyin: 'wǒ huí jiā ___',
        promptBopomofo: 'ㄨㄛˇ ㄏㄨㄟˊ ㄐㄧㄚ ___',
        answerId: 'le'
      },
      {
        id: 'le-jintian-xia-yu-le',
        hanzi: '今天下雨了',
        pinyin: 'jīntiān xià yǔ le',
        bopomofo: 'ㄐㄧㄣ ㄊㄧㄢ ㄒㄧㄚˋ ㄩˇ ㄌㄜ˙',
        english: 'It started raining today.',
        promptHanzi: '今天下雨___',
        promptPinyin: 'jīntiān xià yǔ ___',
        promptBopomofo: 'ㄐㄧㄣ ㄊㄧㄢ ㄒㄧㄚˋ ㄩˇ ___',
        answerId: 'le'
      }
    ],
    notes: [
      'At this stage, think of 了 as a practical signal that the situation changed.',
      'It can overlap with English simple past and present perfect.'
    ]
  },
  {
    id: 'guo',
    hanzi: '過',
    label: 'Past experience',
    pinyin: 'guò',
    meaning: 'have ever done',
    concept: 'Use this for lived experience: something has happened before.',
    examples: [
      {
        id: 'guo-wo-qu-guo-taiwan',
        hanzi: '我去過台灣',
        pinyin: 'wǒ qù guò táiwān',
        bopomofo: 'ㄨㄛˇ ㄑㄩˋ ㄍㄨㄛˋ ㄊㄞˊ ㄨㄢ',
        english: "I've been to Taiwan.",
        promptHanzi: '我去___台灣',
        promptPinyin: 'wǒ qù ___ táiwān',
        promptBopomofo: 'ㄨㄛˇ ㄑㄩˋ ___ ㄊㄞˊ ㄨㄢ',
        answerId: 'guo'
      },
      {
        id: 'guo-ni-kan-guo-ma',
        hanzi: '你看過嗎？',
        pinyin: 'nǐ kàn guò ma?',
        bopomofo: 'ㄋㄧˇ ㄎㄢˋ ㄍㄨㄛˋ ㄇㄚ˙',
        english: 'Have you seen it before?',
        promptHanzi: '你看___嗎？',
        promptPinyin: 'nǐ kàn ___ ma?',
        promptBopomofo: 'ㄋㄧˇ ㄎㄢˋ ___ ㄇㄚ˙',
        answerId: 'guo'
      },
      {
        id: 'guo-wo-meiyou-kan-guo',
        hanzi: '我沒有看過',
        pinyin: 'wǒ méiyǒu kàn guò',
        bopomofo: 'ㄨㄛˇ ㄇㄟˊ ㄧㄡˇ ㄎㄢˋ ㄍㄨㄛˋ',
        english: "I haven't seen it before.",
        promptHanzi: '我沒有看___',
        promptPinyin: 'wǒ méiyǒu kàn ___',
        promptBopomofo: 'ㄨㄛˇ ㄇㄟˊ ㄧㄡˇ ㄎㄢˋ ___',
        answerId: 'guo'
      },
      {
        id: 'guo-wo-meiyou-guo',
        hanzi: '我沒有過',
        pinyin: 'wǒ méiyǒu guò',
        bopomofo: 'ㄨㄛˇ ㄇㄟˊ ㄧㄡˇ ㄍㄨㄛˋ',
        english: 'Incorrect / incomplete by itself.',
        promptHanzi: '我沒有___',
        promptPinyin: 'wǒ méiyǒu ___',
        promptBopomofo: 'ㄨㄛˇ ㄇㄟˊ ㄧㄡˇ ___',
        answerId: 'guo',
        incorrect: true
      }
    ],
    notes: [
      'The normal negative pattern is 沒有 + verb + 過.',
      '過 needs an action. 我沒有過 by itself is not a complete beginner pattern.'
    ]
  },
  {
    id: 'yiqian-changchang',
    hanzi: '以前 + 常常',
    label: 'Used to',
    pinyin: 'yǐqián + chángcháng',
    meaning: 'used to / often before',
    concept:
      'Use 以前 and 常常 together when you want a clear "used to" feeling.',
    examples: [
      {
        id: 'yiqian-wo-yiqian-changchang-qu-canting',
        hanzi: '我以前常常去這家餐廳',
        pinyin: 'wǒ yǐqián chángcháng qù zhè jiā cāntīng',
        bopomofo: 'ㄨㄛˇ ㄧˇ ㄑㄧㄢˊ ㄔㄤˊ ㄔㄤˊ ㄑㄩˋ ㄓㄜˋ ㄐㄧㄚ ㄘㄢ ㄊㄧㄥ',
        english: 'I used to go to this restaurant often.',
        promptHanzi: '我___去這家餐廳',
        promptPinyin: 'wǒ ___ qù zhè jiā cāntīng',
        promptBopomofo: 'ㄨㄛˇ ___ ㄑㄩˋ ㄓㄜˋ ㄐㄧㄚ ㄘㄢ ㄊㄧㄥ',
        answerId: 'yiqian-changchang'
      },
      {
        id: 'yiqian-wo-yiqian-changchang-lai-dian',
        hanzi: '我以前常常來這家店',
        pinyin: 'wǒ yǐqián chángcháng lái zhè jiā diàn',
        bopomofo: 'ㄨㄛˇ ㄧˇ ㄑㄧㄢˊ ㄔㄤˊ ㄔㄤˊ ㄌㄞˊ ㄓㄜˋ ㄐㄧㄚ ㄉㄧㄢˋ',
        english: 'I used to come to this shop often.',
        promptHanzi: '我___來這家店',
        promptPinyin: 'wǒ ___ lái zhè jiā diàn',
        promptBopomofo: 'ㄨㄛˇ ___ ㄌㄞˊ ㄓㄜˋ ㄐㄧㄚ ㄉㄧㄢˋ',
        answerId: 'yiqian-changchang'
      },
      {
        id: 'yiqian-wo-yiqian-qu',
        hanzi: '我以前去',
        pinyin: 'wǒ yǐqián qù',
        bopomofo: 'ㄨㄛˇ ㄧˇ ㄑㄧㄢˊ ㄑㄩˋ',
        english: 'I went before / I used to go, depending on context.',
        promptHanzi: '我___去',
        promptPinyin: 'wǒ ___ qù',
        promptBopomofo: 'ㄨㄛˇ ___ ㄑㄩˋ',
        answerId: 'yiqian'
      },
      {
        id: 'yiqian-wo-changchang-qu',
        hanzi: '我常常去',
        pinyin: 'wǒ chángcháng qù',
        bopomofo: 'ㄨㄛˇ ㄔㄤˊ ㄔㄤˊ ㄑㄩˋ',
        english: 'I often go / I often went, depending on context.',
        promptHanzi: '我___去',
        promptPinyin: 'wǒ ___ qù',
        promptBopomofo: 'ㄨㄛˇ ___ ㄑㄩˋ',
        answerId: 'changchang'
      },
      {
        id: 'yiqian-wo-yiqian-changchang-qu',
        hanzi: '我以前常常去',
        pinyin: 'wǒ yǐqián chángcháng qù',
        bopomofo: 'ㄨㄛˇ ㄧˇ ㄑㄧㄢˊ ㄔㄤˊ ㄔㄤˊ ㄑㄩˋ',
        english: 'I used to go often.',
        promptHanzi: '我___去',
        promptPinyin: 'wǒ ___ qù',
        promptBopomofo: 'ㄨㄛˇ ___ ㄑㄩˋ',
        answerId: 'yiqian-changchang'
      }
    ],
    notes: [
      '以前 and 常常 are each optional.',
      'Together, they make the past habit meaning much clearer.'
    ]
  },
  {
    id: 'pitfalls',
    hanzi: '對比',
    label: 'Common contrasts and beginner pitfalls',
    pinyin: 'duìbǐ',
    meaning: 'contrast',
    concept:
      'Mandarin often relies on context. Do not map English tense too rigidly onto Mandarin.',
    examples: [
      {
        id: 'contrast-wo-bu-qu',
        hanzi: '我不去',
        pinyin: 'wǒ bù qù',
        bopomofo: 'ㄨㄛˇ ㄅㄨˋ ㄑㄩˋ',
        english: "I'm not going.",
        promptHanzi: '我___去',
        promptPinyin: 'wǒ ___ qù',
        promptBopomofo: 'ㄨㄛˇ ___ ㄑㄩˋ',
        answerId: 'bu'
      },
      {
        id: 'contrast-wo-mei-qu',
        hanzi: '我沒去',
        pinyin: 'wǒ méi qù',
        bopomofo: 'ㄨㄛˇ ㄇㄟˊ ㄑㄩˋ',
        english: "I didn't go.",
        promptHanzi: '我___去',
        promptPinyin: 'wǒ ___ qù',
        promptBopomofo: 'ㄨㄛˇ ___ ㄑㄩˋ',
        answerId: 'mei'
      },
      {
        id: 'contrast-wo-chi-le',
        hanzi: '我吃了',
        pinyin: 'wǒ chī le',
        bopomofo: 'ㄨㄛˇ ㄔ ㄌㄜ˙',
        english: "I ate / I've eaten.",
        promptHanzi: '我吃___',
        promptPinyin: 'wǒ chī ___',
        promptBopomofo: 'ㄨㄛˇ ㄔ ___',
        answerId: 'le'
      },
      {
        id: 'contrast-wo-chi-guo',
        hanzi: '我吃過',
        pinyin: 'wǒ chī guò',
        bopomofo: 'ㄨㄛˇ ㄔ ㄍㄨㄛˋ',
        english: "I've eaten it before.",
        promptHanzi: '我吃___',
        promptPinyin: 'wǒ chī ___',
        promptBopomofo: 'ㄨㄛˇ ㄔ ___',
        answerId: 'guo'
      },
      {
        id: 'contrast-wo-zai-gongzuo',
        hanzi: '我在工作',
        pinyin: 'wǒ zài gōngzuò',
        bopomofo: 'ㄨㄛˇ ㄗㄞˋ ㄍㄨㄥ ㄗㄨㄛˋ',
        english: 'I am working / I was working, depending on context.',
        promptHanzi: '我___工作',
        promptPinyin: 'wǒ ___ gōngzuò',
        promptBopomofo: 'ㄨㄛˇ ___ ㄍㄨㄥ ㄗㄨㄛˋ',
        answerId: 'zai'
      }
    ],
    notes: [
      'Mandarin does not mark tense the same way English does.',
      'Look for time words, context, and particles like 了 and 過.'
    ]
  }
]

const shuffle = <T>(items: T[]) => [...items].sort(() => Math.random() - 0.5)

const getAnswerById = (answerId: string) =>
  pastAnswers.find((answer) => answer.id === answerId) ?? pastAnswers[0]

const getQuizExamples = (sectionId: string) => {
  const section = getPastSectionById(sectionId)

  return section.examples.filter((example) => !example.incorrect)
}

const getDistractorAnswers = (correctAnswerId: string, sectionId: string) => {
  const sectionAnswerIds = new Set(
    getQuizExamples(sectionId).map((example) => example.answerId)
  )
  const preferredAnswers = pastAnswers.filter((answer) =>
    sectionAnswerIds.has(answer.id)
  )
  const pool =
    preferredAnswers.length >= 4
      ? preferredAnswers
      : [...preferredAnswers, ...pastAnswers]

  return shuffle(pool.filter((answer) => answer.id !== correctAnswerId))
}

export const getPastSectionById = (sectionId: string) =>
  pastSections.find((section) => section.id === sectionId) ?? pastSections[0]

export const getPastExampleById = (exampleId: string) => {
  for (const section of pastSections) {
    const example = section.examples.find((entry) => entry.id === exampleId)

    if (example) {
      return { example, section }
    }
  }

  return null
}

export const getPastQuizExampleCount = (sectionId: string) =>
  getQuizExamples(sectionId).length

export const generatePastQuestion = (
  sectionId: string,
  excludeExampleIds: string[] = [],
  locale: AppLocale = 'en'
): PastQuizQuestion => {
  const section = getPastSectionById(sectionId)
  const localizedSection = localizePastSection(section, locale)
  const examples = getQuizExamples(section.id)
  const eligibleExamples = examples.filter(
    (example) => !excludeExampleIds.includes(example.id)
  )
  const correct =
    shuffle(eligibleExamples.length > 0 ? eligibleExamples : examples)[0] ??
    pastSections[0].examples[0]
  const correctAnswer = getAnswerById(correct.answerId)
  const distractors = getDistractorAnswers(correct.answerId, section.id).slice(0, 3)
  const options = shuffle([correctAnswer, ...distractors]).map((answer) => ({
    id: answer.id,
    hanzi: answer.hanzi,
    pinyin: answer.pinyin,
    bopomofo: answer.bopomofo,
    english: localizeAnswerMeaning(answer, locale),
    sectionId: section.id
  }))

  return {
    id: `${section.id}-${correct.id}-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`,
    prompt: correct.promptHanzi,
    promptPinyin: correct.promptPinyin,
    promptBopomofo: correct.promptBopomofo,
    sectionId: section.id,
    sectionHanzi: localizedSection.hanzi,
    sectionLabel: localizedSection.label,
    correctExampleId: correct.id,
    correctAnswerId: correct.answerId,
    correctHanzi: correct.hanzi,
    correctPinyin: correct.pinyin,
    correctBopomofo: correct.bopomofo,
    correctEnglish: localizeExampleMeaning(correct, locale),
    correctMeaning: localizeAnswerMeaning(correctAnswer, locale),
    concept: localizedSection.concept,
    notes: localizedSection.notes,
    options
  }
}

export const evaluatePastAnswer = (
  question: PastQuizQuestion,
  selectedAnswerId: string
): PastQuizResult => {
  const selectedOption = question.options.find(
    (option) => option.id === selectedAnswerId
  )
  const correctExample = getPastExampleById(question.correctExampleId)
  const correctAnswerId = correctExample?.example.answerId

  return {
    questionId: question.id,
    selectedExampleId: selectedAnswerId,
    selectedAnswerId,
    correctExampleId: question.correctExampleId,
    correctAnswerId: correctAnswerId ?? question.correctAnswerId,
    isCorrect: selectedAnswerId === correctAnswerId,
    prompt: question.prompt,
    correctHanzi: question.correctHanzi,
    correctPinyin: question.correctPinyin,
    correctBopomofo: question.correctBopomofo,
    correctEnglish: question.correctEnglish,
    correctMeaning: question.correctMeaning,
    selectedHanzi: selectedOption?.hanzi ?? '?'
  }
}
