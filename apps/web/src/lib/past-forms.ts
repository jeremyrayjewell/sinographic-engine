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

export type PastExampleTag =
  | 'completed-action'
  | 'experience'
  | 'negation'
  | 'negated-experience'
  | 'habitual-past'
  | 'travel'
  | 'food'
  | 'routine'
  | 'daily-life'
  | 'before-vs-now'

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
  answerIds?: string[]
  distractorAnswerIds?: string[]
  feedbackHint?: string
  tags?: PastExampleTag[]
  incorrect?: boolean
}

export type PastSectionKind = 'learn' | 'practice' | 'content'

export type PastSection = {
  id: string
  kind: PastSectionKind
  hanzi: string
  label: string
  pinyin: string
  meaning: string
  concept: string
  goal?: string
  decisionPrompt?: string
  lookFor?: string[]
  previewExamples?: string[]
  examples: PastExample[]
  exampleTags?: PastExampleTag[]
  notes: string[]
}

type LocalizedPastSectionCopy = {
  label: string
  meaning: string
  concept: string
  notes: string[]
  goal?: string
  decisionPrompt?: string
  lookFor?: string[]
  previewExamples?: string[]
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
    'mei-wo-mei-qu': 'Ayer no fui.',
    'mei-wo-meiyou-chi': 'Ayer no comí.',
    'mei-ta-mei-lai': 'Ella no vino ayer.',
    'le-wo-chi-le': 'Acabo de comer / ya comí.',
    'le-wo-hui-jia-le': 'Me fui a casa / ya estoy en casa.',
    'le-jintian-xia-yu-le': 'Hoy empezó a llover.',
    'guo-wo-qu-guo-taiwan': 'He estado en Taiwán varias veces.',
    'guo-ni-kan-guo-ma': '¿Lo has visto antes?',
    'guo-wo-meiyou-kan-guo': 'No lo he visto antes.',
    'guo-wo-meiyou-guo': 'Incorrecto / incompleto por sí solo.',
    'yiqian-wo-yiqian-changchang-qu-canting':
      'Antes solía ir a este restaurante con frecuencia, pero ahora rara vez voy.',
    'yiqian-wo-yiqian-changchang-lai-dian':
      'Antes solía venir a esta tienda con frecuencia, pero ahora rara vez vengo.',
    'yiqian-wo-yiqian-qu':
      'Antes iba, pero ahora no.',
    'yiqian-wo-changchang-qu':
      'Voy a menudo.',
    'yiqian-wo-yiqian-changchang-qu': 'Antes solía ir a menudo, pero ahora no.',
    'contrast-wo-bu-qu': 'No voy mañana.',
    'contrast-wo-mei-qu': 'No fui ayer.',
    'contrast-wo-chi-le': 'Comí ayer.',
    'contrast-wo-chi-guo': 'Lo he comido antes.',
    'contrast-wo-zai-gongzuo':
      'Estoy trabajando / estaba trabajando, según el contexto.',
    'bu-vs-mei-mingtian-bu-chi': 'No voy a comer mañana.',
    'bu-vs-mei-zuotian-mei-chi': 'No comí ayer.',
    'bu-vs-mei-ta-meiyou-lai': 'Ella no vino.',
    'le-vs-guo-zuotian-wo-chi-le': 'Comí ayer.',
    'le-vs-guo-yiqian-wo-chi-guo': 'Lo he comido antes.',
    'le-vs-guo-kan-le-dianying': 'Vi esta película.',
    'le-vs-guo-kan-guo-dianying': 'He visto esta película antes.',
    'negexp-wo-meiyou-chi-guo': 'No lo he comido antes.',
    'negexp-ta-meiyou-qu-guo': 'Ella no ha ido antes.',
    'negexp-ni-meiyou-kan-guo-ma': '¿No lo has visto antes?',
    'mixed-zuotian-wo-chi-le': 'Comí ayer.',
    'mixed-yiqian-wo-chi-guo': 'Lo he comido antes.',
    'mixed-wo-meiyou-chi-guo': 'No lo he comido antes.',
    'mixed-mingtian-bu-chi': 'No voy a comer mañana.',
    'mixed-zuotian-mei-chi': 'No comí ayer.',
    'mixed-yiqian-changchang-qu': 'Antes solía ir a menudo, pero ahora no.'
  } as Record<string, string>,
  feedbackHints: {
    'bu-vs-mei-mingtian-bu-chi':
      '明天 apunta hacia adelante, así que la oración habla de un plan o intención.',
    'bu-vs-mei-zuotian-mei-chi':
      '昨天 apunta a algo que no ocurrió en el pasado.',
    'bu-vs-mei-ta-meiyou-lai':
      '昨天 hace que la oración sea sobre algo que no ocurrió.',
    'le-vs-guo-zuotian-wo-chi-le':
      '昨天 normalmente apunta a un evento completado, no a experiencia general.',
    'le-vs-guo-yiqian-wo-chi-guo':
      '以前 puede apuntar a experiencia cuando preguntas si algo ha ocurrido antes.',
    'le-vs-guo-kan-le-dianying':
      'Esta oración enfoca ver la película como un evento completado.',
    'le-vs-guo-kan-guo-dianying':
      '過 enfoca si ya tienes esa experiencia antes.',
    'negexp-wo-meiyou-chi-guo':
      '沒有 + verbo + 過 significa que no has tenido esa experiencia.',
    'negexp-ta-meiyou-qu-guo':
      '沒有去過 significa que ella no ha ido allí antes.',
    'negexp-ni-meiyou-kan-guo-ma':
      '沒有看過 pregunta por una experiencia que no ha ocurrido antes.',
    'mixed-zuotian-wo-chi-le':
      '昨天 te orienta hacia un evento completado.',
    'mixed-yiqian-wo-chi-guo':
      '以前 aquí apunta a experiencia previa, no solo a una acción de ayer.',
    'mixed-wo-meiyou-chi-guo':
      '沒有 + verbo + 過 es la forma básica para experiencia negada.',
    'mixed-mingtian-bu-chi':
      '明天 apunta al futuro, así que no es una acción pasada que no ocurrió.',
    'mixed-zuotian-mei-chi':
      '昨天 apunta al pasado, así que 沒 / 沒有 encaja mejor que 不.',
    'mixed-yiqian-changchang-qu':
      '以前常常 presenta una rutina anterior o costumbre pasada.'
  } as Record<string, string>,
  sections: {
    mei: {
      label: 'No ocurrió',
      meaning: 'no hizo / no ha hecho',
      concept: 'Se usa para acciones que no ocurrieron.',
      notes: [
        'Para acciones pasadas completadas, 不 normalmente no es la palabra que quieres.',
        '沒 y 沒有 son comunes; 沒 es más corto y muy natural al hablar.'
      ]
    },
    le: {
      label: 'Algo ocurrió',
      meaning: 'completado / ahora cambió',
      concept: 'Marca que algo ocurrió, terminó o ahora se volvió cierto.',
      notes: [
        'En esta etapa, piensa en 了 como una señal práctica de que la situación cambió.',
        'Puede coincidir con el pasado simple y el presente perfecto del inglés.'
      ]
    },
    guo: {
      label: 'Haber hecho antes',
      meaning: 'haber hecho alguna vez',
      concept: 'Se usa para experiencia vivida: algo ocurrió antes.',
      notes: [
        'El patrón negativo normal es 沒有 + verbo + 過.',
        '過 necesita una acción. 我沒有過 por sí solo no es un patrón completo para principiantes.'
      ]
    },
    'yiqian-changchang': {
      label: 'Solía hacer',
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
    },
    'bu-vs-mei': {
      label: 'Contraste: 不 vs 沒 / 沒有',
      meaning: 'no va a / no hizo',
      concept: 'Compara negación futura o general con acciones que no ocurrieron.',
      notes: [
        '不 suele apuntar a intención, futuro o negación general.',
        '沒 y 沒有 son la opción normal para acciones pasadas que no ocurrieron.'
      ]
    },
    'le-vs-guo': {
      label: 'Contraste: 了 vs 過',
      meaning: 'completado / experiencia',
      concept: 'Compara una acción completada con experiencia previa.',
      notes: [
        '了 enfoca que algo ocurrió o cambió.',
        '過 enfoca que tienes esa experiencia antes.'
      ]
    },
    'negated-experience': {
      label: 'Experiencia negada',
      meaning: 'no haber hecho',
      concept: 'Practica el patrón 沒有 + verbo + 過.',
      notes: [
        'Para “no haber hecho antes”, el patrón básico es 沒有 + verbo + 過.',
        'No trates 沒有過 solo como una frase completa.'
      ]
    },
    'travel-places': {
      label: 'Viajes y lugares',
      meaning: 'lugares, ir y experiencia',
      concept: 'Practica formas relacionadas con el pasado en contextos de viajes y lugares.',
      goal: 'Practicar oraciones cortas sobre viajes, visitas y lugares.',
      decisionPrompt:
        'Lee el contexto y elige la forma que hace que la oración suene natural.',
      lookFor: ['昨天', '以前', '沒有', '過'],
      previewExamples: ['我去過台灣', '我昨天去了台北', '我以前常常去那家店'],
      notes: [
        'Usa toda la oración para decidir si ocurrió, no ocurrió o fue una experiencia.',
        'Los lugares suelen mezclar 去, 過, 沒有 y 以前.'
      ]
    },
    'food-daily-life': {
      label: 'Comida y vida diaria',
      meaning: 'comida y acciones cotidianas',
      concept: 'Practica formas del pasado con acciones de todos los días.',
      goal: 'Practicar oraciones sobre comida y acciones cotidianas.',
      decisionPrompt:
        'Usa el contexto de la oración para decidir qué forma encaja.',
      lookFor: ['昨天', '明天', '以前', '沒有'],
      previewExamples: ['昨天我吃了', '我以前吃過', '我沒有吃過'],
      notes: [
        'Comida y vida diaria ayudan a contrastar 了, 過, 不 y 沒.',
        'Lee la palabra de tiempo antes de elegir.'
      ]
    },
    'before-vs-now': {
      label: 'Antes y ahora',
      meaning: 'antes, ahora y rutinas que cambiaron',
      concept: 'Practica hábitos anteriores, experiencia previa y cambios de rutina.',
      goal: 'Practicar rutinas, costumbres y cambios de situación.',
      decisionPrompt:
        'Observa si la oración suena como rutina, cambio o contexto anterior.',
      lookFor: ['以前', '常常', '現在', '了'],
      previewExamples: ['我以前常常去', '我以前去', '我常常去'],
      notes: [
        '以前, 常常 y 以前常常 pueden señalar hábitos pasados.',
        'Algunas oraciones dependen más del contexto que de una marca de tiempo verbal.'
      ]
    },
    'past-or-not': {
      label: 'Planes vs cosas que no ocurrieron',
      meaning: 'planes, hechos y cosas que no ocurrieron',
      concept: 'Decide si la oración habla de intención, negación general o algo que no ocurrió.',
      goal: 'Practicar planes, decisiones y cosas que no pasaron.',
      decisionPrompt:
        'Lee el marco temporal antes de elegir.',
      lookFor: ['明天', '昨天', '不', '沒'],
      previewExamples: ['我明天不吃', '我昨天沒吃', '她昨天沒有來'],
      notes: [
        '不 suele apuntar al futuro, intención o negación general.',
        '沒 y 沒有 suelen marcar acciones que no ocurrieron.'
      ]
    },
    'happened-or-experienced': {
      label: 'Un evento o experiencia de vida',
      meaning: 'eventos completados y experiencia previa',
      concept: 'Practica la diferencia entre algo que ocurrió y algo vivido antes.',
      goal: 'Practicar eventos, recuerdos y experiencia personal.',
      decisionPrompt:
        'Elige según lo que la oración intenta comunicar.',
      lookFor: ['昨天', '以前', '沒有', '過'],
      previewExamples: ['昨天我吃了', '我以前吃過', '我沒有吃過'],
      notes: [
        '了 enfoca un evento o cambio.',
        '過 enfoca experiencia, incluso 沒有 + verbo + 過.'
      ]
    },
    'mixed-review': {
      label: 'Sin pistas: pasado mixto',
      meaning: 'repaso mixto',
      concept: 'Practica formas básicas del pasado sin una pista de familia gramatical.',
      goal: 'Repasar formas básicas relacionadas con el pasado sin pistas de categoría.',
      decisionPrompt:
        'Lee toda la oración y elige la forma más natural.',
      lookFor: ['昨天', '明天', '以前', '沒有', '常常'],
      previewExamples: ['昨天我吃了', '我明天不吃', '我以前常常去'],
      notes: [
        'Lee primero la oración completa.',
        'La respuesta depende del contexto, no del nombre del conjunto.'
      ]
    }
  } as Record<string, LocalizedPastSectionCopy>
}

const localizeAnswerMeaning = (answer: PastAnswer, locale: AppLocale) =>
  locale === 'es-419' ? pastSpanish.answers[answer.id] ?? answer.english : answer.english

const localizeExampleMeaning = (example: PastExample, locale: AppLocale) =>
  locale === 'es-419' ? pastSpanish.examples[example.id] ?? example.english : example.english

const localizeFeedbackHint = (example: PastExample, locale: AppLocale) =>
  locale === 'es-419'
    ? pastSpanish.feedbackHints[example.id] ?? example.feedbackHint
    : example.feedbackHint

export const localizePastSection = (section: PastSection, locale: AppLocale) => {
  const sectionCopy = locale === 'es-419' ? pastSpanish.sections[section.id] : null
  const sectionExamples = getSectionExamples(section)

  return {
    ...section,
    label: sectionCopy?.label ?? section.label,
    meaning: sectionCopy?.meaning ?? section.meaning,
    concept: sectionCopy?.concept ?? section.concept,
    goal: sectionCopy?.goal ?? section.goal,
    decisionPrompt: sectionCopy?.decisionPrompt ?? section.decisionPrompt,
    lookFor: sectionCopy?.lookFor ?? section.lookFor,
    previewExamples: sectionCopy?.previewExamples ?? section.previewExamples,
    notes: sectionCopy?.notes ?? section.notes,
    examples: sectionExamples.map((example) => ({
      ...example,
      english: localizeExampleMeaning(example, locale),
      feedbackHint: localizeFeedbackHint(example, locale)
    }))
  }
}

export const pastSections: PastSection[] = [
  {
    id: 'mei',
    kind: 'learn',
    hanzi: '沒 / 沒有',
    label: 'Did Not Happen',
    pinyin: 'méi / méiyǒu',
    meaning: 'did not / have not',
    concept: 'Use this for actions that did not happen.',
    examples: [
      {
        id: 'mei-wo-mei-qu',
        hanzi: '我昨天沒去',
        pinyin: 'wǒ zuótiān méi qù',
        bopomofo: 'ㄨㄛˇ ㄗㄨㄛˊ ㄊㄧㄢ ㄇㄟˊ ㄑㄩˋ',
        english: "I didn't go yesterday.",
        promptHanzi: '我昨天___去',
        promptPinyin: 'wǒ zuótiān ___ qù',
        promptBopomofo: 'ㄨㄛˇ ㄗㄨㄛˊ ㄊㄧㄢ ___ ㄑㄩˋ',
        answerId: 'mei',
        answerIds: ['mei', 'meiyou'],
        tags: ['negation', 'travel', 'daily-life']
      },
      {
        id: 'mei-wo-meiyou-chi',
        hanzi: '我昨天沒有吃',
        pinyin: 'wǒ zuótiān méiyǒu chī',
        bopomofo: 'ㄨㄛˇ ㄗㄨㄛˊ ㄊㄧㄢ ㄇㄟˊ ㄧㄡˇ ㄔ',
        english: "I didn't eat yesterday.",
        promptHanzi: '我昨天___吃',
        promptPinyin: 'wǒ zuótiān ___ chī',
        promptBopomofo: 'ㄨㄛˇ ㄗㄨㄛˊ ㄊㄧㄢ ___ ㄔ',
        answerId: 'meiyou',
        answerIds: ['mei', 'meiyou'],
        tags: ['negation', 'food', 'daily-life']
      },
      {
        id: 'mei-ta-mei-lai',
        hanzi: '她昨天沒來',
        pinyin: 'tā zuótiān méi lái',
        bopomofo: 'ㄊㄚ ㄗㄨㄛˊ ㄊㄧㄢ ㄇㄟˊ ㄌㄞˊ',
        english: "She didn't come yesterday.",
        promptHanzi: '她昨天___來',
        promptPinyin: 'tā zuótiān ___ lái',
        promptBopomofo: 'ㄊㄚ ㄗㄨㄛˊ ㄊㄧㄢ ___ ㄌㄞˊ',
        answerId: 'mei',
        answerIds: ['mei', 'meiyou'],
        tags: ['negation', 'daily-life']
      }
    ],
    notes: [
      'For completed past actions, 不 is usually not the word you want.',
      '沒 and 沒有 are both common; 沒 is shorter and very natural in speech.'
    ]
  },
  {
    id: 'le',
    kind: 'learn',
    hanzi: '了',
    label: 'Something Happened',
    pinyin: 'le',
    meaning: 'completed / now changed',
    concept: 'Marks that something happened, finished, or has now become true.',
    examples: [
      {
        id: 'le-wo-chi-le',
        hanzi: '我剛剛吃了',
        pinyin: 'wǒ gānggāng chī le',
        bopomofo: 'ㄨㄛˇ ㄍㄤ ㄍㄤ ㄔ ㄌㄜ˙',
        english: 'I just ate / I have just eaten.',
        promptHanzi: '我剛剛吃___',
        promptPinyin: 'wǒ gānggāng chī ___',
        promptBopomofo: 'ㄨㄛˇ ㄍㄤ ㄍㄤ ㄔ ___',
        answerId: 'le',
        tags: ['completed-action', 'food', 'daily-life']
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
        answerId: 'le',
        tags: ['completed-action', 'travel', 'daily-life', 'before-vs-now']
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
        answerId: 'le',
        tags: ['completed-action', 'daily-life', 'before-vs-now']
      }
    ],
    notes: [
      'At this stage, think of 了 as a practical signal that the situation changed.',
      'It can overlap with English simple past and present perfect.'
    ]
  },
  {
    id: 'guo',
    kind: 'learn',
    hanzi: '過',
    label: 'Have Done Before',
    pinyin: 'guò',
    meaning: 'have ever done',
    concept: 'Use this for lived experience: something has happened before.',
    examples: [
      {
        id: 'guo-wo-qu-guo-taiwan',
        hanzi: '我去過台灣好幾次',
        pinyin: 'wǒ qù guò táiwān hǎo jǐ cì',
        bopomofo: 'ㄨㄛˇ ㄑㄩˋ ㄍㄨㄛˋ ㄊㄞˊ ㄨㄢ ㄏㄠˇ ㄐㄧˇ ㄘˋ',
        english: "I've been to Taiwan several times.",
        promptHanzi: '我去___台灣好幾次',
        promptPinyin: 'wǒ qù ___ táiwān hǎo jǐ cì',
        promptBopomofo: 'ㄨㄛˇ ㄑㄩˋ ___ ㄊㄞˊ ㄨㄢ ㄏㄠˇ ㄐㄧˇ ㄘˋ',
        answerId: 'guo',
        tags: ['experience', 'travel']
      },
      {
        id: 'guo-ni-kan-guo-ma',
        hanzi: '你看過嗎？',
        pinyin: 'nǐ kàn guò ma?',
        bopomofo: 'ㄋㄧˇ ㄎㄢˋ ㄍㄨㄛˋ ㄇㄚ˙',
        english: 'Have you seen it before?',
        promptHanzi: '你以前看___嗎？',
        promptPinyin: 'nǐ yǐqián kàn ___ ma?',
        promptBopomofo: 'ㄋㄧˇ ㄧˇ ㄑㄧㄢˊ ㄎㄢˋ ___ ㄇㄚ˙',
        answerId: 'guo',
        tags: ['experience', 'daily-life']
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
        answerId: 'guo',
        tags: ['experience', 'negated-experience', 'daily-life']
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
        tags: ['negated-experience'],
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
    kind: 'learn',
    hanzi: '以前 + 常常',
    label: 'Used To',
    pinyin: 'yǐqián + chángcháng',
    meaning: 'used to / often before',
    concept:
      'Use 以前 and 常常 together when you want a clear "used to" feeling.',
    examples: [
      {
        id: 'yiqian-wo-yiqian-changchang-qu-canting',
        hanzi: '我以前常常去這家餐廳，現在很少去',
        pinyin: 'wǒ yǐqián chángcháng qù zhè jiā cāntīng, xiànzài hěn shǎo qù',
        bopomofo:
          'ㄨㄛˇ ㄧˇ ㄑㄧㄢˊ ㄔㄤˊ ㄔㄤˊ ㄑㄩˋ ㄓㄜˋ ㄐㄧㄚ ㄘㄢ ㄊㄧㄥ ㄒㄧㄢˋ ㄗㄞˋ ㄏㄣˇ ㄕㄠˇ ㄑㄩˋ',
        english: 'I used to go to this restaurant often, but now I rarely go.',
        promptHanzi: '我___去這家餐廳，現在很少去',
        promptPinyin: 'wǒ ___ qù zhè jiā cāntīng, xiànzài hěn shǎo qù',
        promptBopomofo:
          'ㄨㄛˇ ___ ㄑㄩˋ ㄓㄜˋ ㄐㄧㄚ ㄘㄢ ㄊㄧㄥ ㄒㄧㄢˋ ㄗㄞˋ ㄏㄣˇ ㄕㄠˇ ㄑㄩˋ',
        answerId: 'yiqian-changchang',
        answerIds: ['yiqian', 'yiqian-changchang'],
        tags: ['habitual-past', 'travel', 'routine', 'before-vs-now']
      },
      {
        id: 'yiqian-wo-yiqian-changchang-lai-dian',
        hanzi: '我以前常常來這家店，現在很少來',
        pinyin: 'wǒ yǐqián chángcháng lái zhè jiā diàn, xiànzài hěn shǎo lái',
        bopomofo:
          'ㄨㄛˇ ㄧˇ ㄑㄧㄢˊ ㄔㄤˊ ㄔㄤˊ ㄌㄞˊ ㄓㄜˋ ㄐㄧㄚ ㄉㄧㄢˋ ㄒㄧㄢˋ ㄗㄞˋ ㄏㄣˇ ㄕㄠˇ ㄌㄞˊ',
        english: 'I used to come to this shop often, but now I rarely come.',
        promptHanzi: '我___來這家店，現在很少來',
        promptPinyin: 'wǒ ___ lái zhè jiā diàn, xiànzài hěn shǎo lái',
        promptBopomofo:
          'ㄨㄛˇ ___ ㄌㄞˊ ㄓㄜˋ ㄐㄧㄚ ㄉㄧㄢˋ ㄒㄧㄢˋ ㄗㄞˋ ㄏㄣˇ ㄕㄠˇ ㄌㄞˊ',
        answerId: 'yiqian-changchang',
        answerIds: ['yiqian', 'yiqian-changchang'],
        tags: ['habitual-past', 'routine', 'daily-life', 'before-vs-now']
      },
      {
        id: 'yiqian-wo-yiqian-qu',
        hanzi: '我以前去，現在不去了',
        pinyin: 'wǒ yǐqián qù, xiànzài bú qù le',
        bopomofo: 'ㄨㄛˇ ㄧˇ ㄑㄧㄢˊ ㄑㄩˋ ㄒㄧㄢˋ ㄗㄞˋ ㄅㄨˊ ㄑㄩˋ ㄌㄜ˙',
        english: "I used to go, but I don't now.",
        promptHanzi: '我___去，現在不去了',
        promptPinyin: 'wǒ ___ qù, xiànzài bú qù le',
        promptBopomofo: 'ㄨㄛˇ ___ ㄑㄩˋ ㄒㄧㄢˋ ㄗㄞˋ ㄅㄨˊ ㄑㄩˋ ㄌㄜ˙',
        answerId: 'yiqian',
        tags: ['habitual-past', 'travel', 'routine', 'before-vs-now']
      },
      {
        id: 'yiqian-wo-changchang-qu',
        hanzi: '我常常去，差不多每個禮拜',
        pinyin: 'wǒ chángcháng qù, chàbùduō měi ge lǐbài',
        bopomofo: 'ㄨㄛˇ ㄔㄤˊ ㄔㄤˊ ㄑㄩˋ ㄔㄚˋ ㄅㄨˋ ㄉㄨㄛ ㄇㄟˇ ㄍㄜ˙ ㄌㄧˇ ㄅㄞˋ',
        english: 'I often go.',
        promptHanzi: '我___去，差不多每個禮拜',
        promptPinyin: 'wǒ ___ qù, chàbùduō měi ge lǐbài',
        promptBopomofo: 'ㄨㄛˇ ___ ㄑㄩˋ ㄔㄚˋ ㄅㄨˋ ㄉㄨㄛ ㄇㄟˇ ㄍㄜ˙ ㄌㄧˇ ㄅㄞˋ',
        answerId: 'changchang',
        tags: ['habitual-past', 'routine', 'before-vs-now']
      },
      {
        id: 'yiqian-wo-yiqian-changchang-qu',
        hanzi: '我以前常常去，現在不去了',
        pinyin: 'wǒ yǐqián chángcháng qù, xiànzài bú qù le',
        bopomofo: 'ㄨㄛˇ ㄧˇ ㄑㄧㄢˊ ㄔㄤˊ ㄔㄤˊ ㄑㄩˋ ㄒㄧㄢˋ ㄗㄞˋ ㄅㄨˊ ㄑㄩˋ ㄌㄜ˙',
        english: "I used to go often, but I don't now.",
        promptHanzi: '我___去，現在不去了',
        promptPinyin: 'wǒ ___ qù, xiànzài bú qù le',
        promptBopomofo: 'ㄨㄛˇ ___ ㄑㄩˋ ㄒㄧㄢˋ ㄗㄞˋ ㄅㄨˊ ㄑㄩˋ ㄌㄜ˙',
        answerId: 'yiqian-changchang',
        answerIds: ['yiqian', 'yiqian-changchang'],
        tags: ['habitual-past', 'routine', 'before-vs-now']
      }
    ],
    notes: [
      '以前 and 常常 are each optional.',
      'Together, they make the past habit meaning much clearer.'
    ]
  },
  {
    id: 'bu-vs-mei',
    kind: 'content',
    hanzi: '不 / 沒',
    label: 'Contrast: 不 vs 沒 / 沒有',
    pinyin: 'bù / méi',
    meaning: 'will not / did not',
    concept: 'Compare future or general negation with actions that did not happen.',
    examples: [
      {
        id: 'bu-vs-mei-mingtian-bu-chi',
        hanzi: '我明天不吃',
        pinyin: 'wǒ míngtiān bù chī',
        bopomofo: 'ㄨㄛˇ ㄇㄧㄥˊ ㄊㄧㄢ ㄅㄨˋ ㄔ',
        english: "I won't eat tomorrow.",
        promptHanzi: '我明天___吃。',
        promptPinyin: 'wǒ míngtiān ___ chī.',
        promptBopomofo: 'ㄨㄛˇ ㄇㄧㄥˊ ㄊㄧㄢ ___ ㄔ',
        answerId: 'bu',
        distractorAnswerIds: ['mei', 'meiyou'],
        feedbackHint:
          '明天 points forward, so this is a plan or intention rather than a past non-event.',
        tags: ['negation', 'food', 'daily-life']
      },
      {
        id: 'bu-vs-mei-zuotian-mei-chi',
        hanzi: '我昨天沒吃',
        pinyin: 'wǒ zuótiān méi chī',
        bopomofo: 'ㄨㄛˇ ㄗㄨㄛˊ ㄊㄧㄢ ㄇㄟˊ ㄔ',
        english: "I didn't eat yesterday.",
        promptHanzi: '我昨天___吃。',
        promptPinyin: 'wǒ zuótiān ___ chī.',
        promptBopomofo: 'ㄨㄛˇ ㄗㄨㄛˊ ㄊㄧㄢ ___ ㄔ',
        answerId: 'mei',
        answerIds: ['mei', 'meiyou'],
        distractorAnswerIds: ['bu'],
        feedbackHint: '昨天 points to something that did not happen in the past.',
        tags: ['negation', 'food', 'daily-life']
      },
      {
        id: 'bu-vs-mei-ta-meiyou-lai',
        hanzi: '她沒有來',
        pinyin: 'tā méiyǒu lái',
        bopomofo: 'ㄊㄚ ㄇㄟˊ ㄧㄡˇ ㄌㄞˊ',
        english: "She didn't come.",
        promptHanzi: '她昨天___來。',
        promptPinyin: 'tā zuótiān ___ lái.',
        promptBopomofo: 'ㄊㄚ ㄗㄨㄛˊ ㄊㄧㄢ ___ ㄌㄞˊ',
        answerId: 'meiyou',
        answerIds: ['mei', 'meiyou'],
        distractorAnswerIds: ['bu'],
        feedbackHint: '昨天 makes this about something that did not happen.',
        tags: ['negation', 'daily-life']
      }
    ],
    notes: [
      '不 often points to intention, future, or general negation.',
      '沒 and 沒有 are normal for past actions that did not happen.'
    ]
  },
  {
    id: 'le-vs-guo',
    kind: 'content',
    hanzi: '了 / 過',
    label: 'Contrast: 了 vs 過',
    pinyin: 'le / guò',
    meaning: 'completed / experienced',
    concept: 'Compare a completed event with prior experience.',
    examples: [
      {
        id: 'le-vs-guo-zuotian-wo-chi-le',
        hanzi: '昨天我吃了',
        pinyin: 'zuótiān wǒ chī le',
        bopomofo: 'ㄗㄨㄛˊ ㄊㄧㄢ ㄨㄛˇ ㄔ ㄌㄜ˙',
        english: 'I ate yesterday.',
        promptHanzi: '昨天我吃___。',
        promptPinyin: 'zuótiān wǒ chī ___.',
        promptBopomofo: 'ㄗㄨㄛˊ ㄊㄧㄢ ㄨㄛˇ ㄔ ___',
        answerId: 'le',
        distractorAnswerIds: ['guo'],
        feedbackHint:
          '昨天 usually points to a completed event, not general life experience.',
        tags: ['completed-action', 'food', 'daily-life']
      },
      {
        id: 'le-vs-guo-yiqian-wo-chi-guo',
        hanzi: '我以前吃過',
        pinyin: 'wǒ yǐqián chī guò',
        bopomofo: 'ㄨㄛˇ ㄧˇ ㄑㄧㄢˊ ㄔ ㄍㄨㄛˋ',
        english: "I've eaten it before.",
        promptHanzi: '我以前吃___。',
        promptPinyin: 'wǒ yǐqián chī ___.',
        promptBopomofo: 'ㄨㄛˇ ㄧˇ ㄑㄧㄢˊ ㄔ ___',
        answerId: 'guo',
        distractorAnswerIds: ['le'],
        feedbackHint:
          '以前 can point to experience when the sentence asks whether something has happened before.',
        tags: ['experience', 'food', 'daily-life', 'before-vs-now']
      },
      {
        id: 'le-vs-guo-kan-le-dianying',
        hanzi: '我看了這部電影',
        pinyin: 'wǒ kàn le zhè bù diànyǐng',
        bopomofo: 'ㄨㄛˇ ㄎㄢˋ ㄌㄜ˙ ㄓㄜˋ ㄅㄨˋ ㄉㄧㄢˋ ㄧㄥˇ',
        english: 'I watched this movie.',
        promptHanzi: '我看___這部電影。',
        promptPinyin: 'wǒ kàn ___ zhè bù diànyǐng.',
        promptBopomofo: 'ㄨㄛˇ ㄎㄢˋ ___ ㄓㄜˋ ㄅㄨˋ ㄉㄧㄢˋ ㄧㄥˇ',
        answerId: 'le',
        distractorAnswerIds: ['guo'],
        feedbackHint: 'This sentence treats watching the movie as a completed event.',
        tags: ['completed-action', 'daily-life']
      },
      {
        id: 'le-vs-guo-kan-guo-dianying',
        hanzi: '我看過這部電影',
        pinyin: 'wǒ kàn guò zhè bù diànyǐng',
        bopomofo: 'ㄨㄛˇ ㄎㄢˋ ㄍㄨㄛˋ ㄓㄜˋ ㄅㄨˋ ㄉㄧㄢˋ ㄧㄥˇ',
        english: "I've seen this movie before.",
        promptHanzi: '我看___這部電影。',
        promptPinyin: 'wǒ kàn ___ zhè bù diànyǐng.',
        promptBopomofo: 'ㄨㄛˇ ㄎㄢˋ ___ ㄓㄜˋ ㄅㄨˋ ㄉㄧㄢˋ ㄧㄥˇ',
        answerId: 'guo',
        distractorAnswerIds: ['le'],
        feedbackHint: '過 focuses on whether you have that experience before.',
        tags: ['experience', 'daily-life']
      }
    ],
    notes: [
      '了 focuses on what happened or changed.',
      '過 focuses on whether you have the experience before.'
    ]
  },
  {
    id: 'negated-experience',
    kind: 'content',
    hanzi: '沒過',
    label: 'Negated experience: 沒有 + V + 過',
    pinyin: 'méiyǒu + V + guò',
    meaning: 'have not done',
    concept: 'Practice the beginner pattern 沒有 + verb + 過.',
    examples: [
      {
        id: 'negexp-wo-meiyou-chi-guo',
        hanzi: '我沒有吃過',
        pinyin: 'wǒ méiyǒu chī guò',
        bopomofo: 'ㄨㄛˇ ㄇㄟˊ ㄧㄡˇ ㄔ ㄍㄨㄛˋ',
        english: "I haven't eaten it before.",
        promptHanzi: '我沒有吃___。',
        promptPinyin: 'wǒ méiyǒu chī ___.',
        promptBopomofo: 'ㄨㄛˇ ㄇㄟˊ ㄧㄡˇ ㄔ ___',
        answerId: 'guo',
        distractorAnswerIds: ['le'],
        feedbackHint:
          '沒有 + verb + 過 means you have not had that experience before.',
        tags: ['experience', 'negated-experience', 'food', 'daily-life']
      },
      {
        id: 'negexp-ta-meiyou-qu-guo',
        hanzi: '她沒有去過',
        pinyin: 'tā méiyǒu qù guò',
        bopomofo: 'ㄊㄚ ㄇㄟˊ ㄧㄡˇ ㄑㄩˋ ㄍㄨㄛˋ',
        english: "She hasn't been there before.",
        promptHanzi: '她沒有去___。',
        promptPinyin: 'tā méiyǒu qù ___.',
        promptBopomofo: 'ㄊㄚ ㄇㄟˊ ㄧㄡˇ ㄑㄩˋ ___',
        answerId: 'guo',
        distractorAnswerIds: ['le'],
        feedbackHint: '沒有去過 means she has not been there before.',
        tags: ['experience', 'negated-experience', 'travel']
      },
      {
        id: 'negexp-ni-meiyou-kan-guo-ma',
        hanzi: '你沒有看過嗎？',
        pinyin: 'nǐ méiyǒu kàn guò ma?',
        bopomofo: 'ㄋㄧˇ ㄇㄟˊ ㄧㄡˇ ㄎㄢˋ ㄍㄨㄛˋ ㄇㄚ˙',
        english: "Haven't you seen it before?",
        promptHanzi: '你沒有看___嗎？',
        promptPinyin: 'nǐ méiyǒu kàn ___ ma?',
        promptBopomofo: 'ㄋㄧˇ ㄇㄟˊ ㄧㄡˇ ㄎㄢˋ ___ ㄇㄚ˙',
        answerId: 'guo',
        distractorAnswerIds: ['le'],
        feedbackHint:
          '沒有看過 asks about an experience that has not happened before.',
        tags: ['experience', 'negated-experience', 'daily-life']
      }
    ],
    notes: [
      'For “have not done before,” the basic pattern is 沒有 + verb + 過.',
      '沒有過 alone is not a complete beginner sentence pattern.'
    ]
  },
  {
    id: 'mixed-content',
    kind: 'content',
    hanzi: '混合',
    label: 'Mixed Past Content',
    pinyin: 'hùnhé',
    meaning: 'mixed review',
    concept: 'Mix past-related forms so the sentence context decides the answer.',
    examples: [
      {
        id: 'mixed-zuotian-wo-chi-le',
        hanzi: '昨天我吃了',
        pinyin: 'zuótiān wǒ chī le',
        bopomofo: 'ㄗㄨㄛˊ ㄊㄧㄢ ㄨㄛˇ ㄔ ㄌㄜ˙',
        english: 'I ate yesterday.',
        promptHanzi: '昨天我吃___。',
        promptPinyin: 'zuótiān wǒ chī ___.',
        promptBopomofo: 'ㄗㄨㄛˊ ㄊㄧㄢ ㄨㄛˇ ㄔ ___',
        answerId: 'le',
        distractorAnswerIds: ['guo', 'mei', 'bu'],
        feedbackHint: '昨天 orients you toward a completed event.',
        tags: ['completed-action', 'food', 'daily-life']
      },
      {
        id: 'mixed-yiqian-wo-chi-guo',
        hanzi: '我以前吃過',
        pinyin: 'wǒ yǐqián chī guò',
        bopomofo: 'ㄨㄛˇ ㄧˇ ㄑㄧㄢˊ ㄔ ㄍㄨㄛˋ',
        english: "I've eaten it before.",
        promptHanzi: '我以前吃___。',
        promptPinyin: 'wǒ yǐqián chī ___.',
        promptBopomofo: 'ㄨㄛˇ ㄧˇ ㄑㄧㄢˊ ㄔ ___',
        answerId: 'guo',
        distractorAnswerIds: ['le', 'mei', 'bu'],
        feedbackHint:
          '以前 here points to prior experience, not just yesterday’s event.',
        tags: ['experience', 'food', 'daily-life', 'before-vs-now']
      },
      {
        id: 'mixed-wo-meiyou-chi-guo',
        hanzi: '我沒有吃過',
        pinyin: 'wǒ méiyǒu chī guò',
        bopomofo: 'ㄨㄛˇ ㄇㄟˊ ㄧㄡˇ ㄔ ㄍㄨㄛˋ',
        english: "I haven't eaten it before.",
        promptHanzi: '我沒有吃___。',
        promptPinyin: 'wǒ méiyǒu chī ___.',
        promptBopomofo: 'ㄨㄛˇ ㄇㄟˊ ㄧㄡˇ ㄔ ___',
        answerId: 'guo',
        distractorAnswerIds: ['le', 'mei', 'bu'],
        feedbackHint:
          '沒有 + verb + 過 is the basic shape for negated experience.',
        tags: ['experience', 'negated-experience', 'food', 'daily-life']
      },
      {
        id: 'mixed-mingtian-bu-chi',
        hanzi: '我明天不吃',
        pinyin: 'wǒ míngtiān bù chī',
        bopomofo: 'ㄨㄛˇ ㄇㄧㄥˊ ㄊㄧㄢ ㄅㄨˋ ㄔ',
        english: "I won't eat tomorrow.",
        promptHanzi: '我明天___吃。',
        promptPinyin: 'wǒ míngtiān ___ chī.',
        promptBopomofo: 'ㄨㄛˇ ㄇㄧㄥˊ ㄊㄧㄢ ___ ㄔ',
        answerId: 'bu',
        distractorAnswerIds: ['mei', 'meiyou'],
        feedbackHint:
          '明天 points to the future, so this is not a past action that failed to happen.',
        tags: ['negation', 'food', 'daily-life']
      },
      {
        id: 'mixed-zuotian-mei-chi',
        hanzi: '我昨天沒吃',
        pinyin: 'wǒ zuótiān méi chī',
        bopomofo: 'ㄨㄛˇ ㄗㄨㄛˊ ㄊㄧㄢ ㄇㄟˊ ㄔ',
        english: "I didn't eat yesterday.",
        promptHanzi: '我昨天___吃。',
        promptPinyin: 'wǒ zuótiān ___ chī.',
        promptBopomofo: 'ㄨㄛˇ ㄗㄨㄛˊ ㄊㄧㄢ ___ ㄔ',
        answerId: 'mei',
        answerIds: ['mei', 'meiyou'],
        distractorAnswerIds: ['bu', 'le', 'guo'],
        feedbackHint:
          '昨天 points to the past, so 沒 / 沒有 fits better than 不.',
        tags: ['negation', 'food', 'daily-life']
      },
      {
        id: 'mixed-yiqian-changchang-qu',
        hanzi: '我以前常常去',
        pinyin: 'wǒ yǐqián chángcháng qù',
        bopomofo: 'ㄨㄛˇ ㄧˇ ㄑㄧㄢˊ ㄔㄤˊ ㄔㄤˊ ㄑㄩˋ',
        english: "I used to go often, but I don't now.",
        promptHanzi: '我___去，現在不去了。',
        promptPinyin: 'wǒ ___ qù, xiànzài bú qù le.',
        promptBopomofo: 'ㄨㄛˇ ___ ㄑㄩˋ ㄒㄧㄢˋ ㄗㄞˋ ㄅㄨˊ ㄑㄩˋ ㄌㄜ˙',
        answerId: 'yiqian-changchang',
        answerIds: ['yiqian', 'yiqian-changchang'],
        distractorAnswerIds: ['changchang', 'mei'],
        feedbackHint: '以前常常 frames an older routine or former habit.',
        tags: ['habitual-past', 'routine', 'before-vs-now']
      }
    ],
    notes: [
      'Read the whole sentence first.',
      'The answer depends on contrast, not just one English keyword.'
    ]
  },
  {
    id: 'travel-places',
    kind: 'practice',
    hanzi: '旅行',
    label: 'Travel and Places',
    pinyin: 'lǚxíng',
    meaning: 'places, going, and experience',
    concept: 'Practice past-related forms in travel and place contexts.',
    goal: 'Practice short sentences about travel, visits, and places.',
    decisionPrompt:
      'Read the context and choose the form that makes the sentence sound natural.',
    lookFor: ['昨天', '以前', '沒有', '過'],
    previewExamples: ['我去過台灣', '我昨天去了台北', '我以前常常去那家店'],
    examples: [],
    exampleTags: ['travel'],
    notes: [
      'Use the whole sentence to decide whether it happened, did not happen, or was an experience.',
      'Place contexts often mix 去, 過, 沒有, and 以前.'
    ]
  },
  {
    id: 'food-daily-life',
    kind: 'practice',
    hanzi: '日常',
    label: 'Food and Daily Life',
    pinyin: 'rìcháng',
    meaning: 'food and daily actions',
    concept: 'Practice common past-related forms through everyday actions.',
    goal: 'Practice sentences about food and ordinary daily actions.',
    decisionPrompt:
      'Use the sentence context to decide which form fits.',
    lookFor: ['昨天', '明天', '以前', '沒有'],
    previewExamples: ['昨天我吃了', '我以前吃過', '我沒有吃過'],
    examples: [],
    exampleTags: ['food', 'daily-life'],
    notes: [
      'Food and daily-life sentences are good places to contrast 了, 過, 不, and 沒.',
      'Read the time word before choosing.'
    ]
  },
  {
    id: 'before-vs-now',
    kind: 'practice',
    hanzi: '今昔',
    label: 'Before vs Now',
    pinyin: 'jīnxí',
    meaning: 'before, now, and changed routines',
    concept: 'Practice older habits, prior experience, and changes in routine.',
    goal: 'Practice routines, habits, and changes in situation.',
    decisionPrompt:
      'Notice whether the sentence feels like routine, change, or earlier context.',
    lookFor: ['以前', '常常', '現在', '了'],
    previewExamples: ['我以前常常去', '我以前去', '我常常去'],
    examples: [],
    exampleTags: ['before-vs-now', 'habitual-past', 'routine'],
    notes: [
      '以前, 常常, and 以前常常 can point to past habits.',
      'Some sentences depend more on context than tense marking.'
    ]
  },
  {
    id: 'past-or-not',
    kind: 'practice',
    hanzi: '是否',
    label: "Plans vs Things That Didn't Happen",
    pinyin: 'shìfǒu',
    meaning: 'plans, facts, and things that did not happen',
    concept: 'Practice deciding whether a sentence is about intention, general negation, or a past non-event.',
    goal: "Practice plans, decisions, and things that didn't happen.",
    decisionPrompt:
      'Read the time frame before choosing.',
    lookFor: ['明天', '昨天', '不', '沒'],
    previewExamples: ['我明天不吃', '我昨天沒吃', '她昨天沒有來'],
    examples: [],
    exampleTags: ['negation'],
    notes: [
      '不 often points to future, intention, or general negation.',
      '沒 and 沒有 usually mark actions that did not happen.'
    ]
  },
  {
    id: 'happened-or-experienced',
    kind: 'practice',
    hanzi: '做過',
    label: 'One Event or Life Experience?',
    pinyin: 'zuòguò',
    meaning: 'completed events and prior experience',
    concept: 'Practice choosing between something that happened and something experienced before.',
    goal: 'Practice events, memories, and personal experience.',
    decisionPrompt:
      'Choose based on what the sentence is trying to communicate.',
    lookFor: ['昨天', '以前', '沒有', '過'],
    previewExamples: ['昨天我吃了', '我以前吃過', '我沒有吃過'],
    examples: [],
    exampleTags: ['completed-action', 'experience', 'negated-experience'],
    notes: [
      '了 focuses on an event or change.',
      '過 focuses on experience, including 沒有 + verb + 過.'
    ]
  },
  {
    id: 'mixed-review',
    kind: 'practice',
    hanzi: '混合',
    label: 'No Hints: Mixed Past',
    pinyin: 'hùnhé',
    meaning: 'mixed review',
    concept: 'Practice all beginner past-related forms without an answer-family cue.',
    goal: 'Review beginner past-related forms without category hints.',
    decisionPrompt:
      'Read the whole sentence and choose the most natural form.',
    lookFor: ['昨天', '明天', '以前', '沒有', '常常'],
    previewExamples: ['昨天我吃了', '我明天不吃', '我以前常常去'],
    examples: [],
    exampleTags: [
      'completed-action',
      'experience',
      'negation',
      'negated-experience',
      'habitual-past',
      'travel',
      'food',
      'routine',
      'daily-life',
      'before-vs-now'
    ],
    notes: [
      'Read the whole sentence first.',
      'The answer depends on context, not on the deck name.'
    ]
  },
  {
    id: 'pitfalls',
    kind: 'content',
    hanzi: '對比',
    label: 'Common contrasts and beginner pitfalls',
    pinyin: 'duìbǐ',
    meaning: 'contrast',
    concept:
      'Mandarin often relies on context. Do not map English tense too rigidly onto Mandarin.',
    examples: [
      {
        id: 'contrast-wo-bu-qu',
        hanzi: '我明天不去',
        pinyin: 'wǒ míngtiān bù qù',
        bopomofo: 'ㄨㄛˇ ㄇㄧㄥˊ ㄊㄧㄢ ㄅㄨˋ ㄑㄩˋ',
        english: "I'm not going tomorrow.",
        promptHanzi: '我明天___去',
        promptPinyin: 'wǒ míngtiān ___ qù',
        promptBopomofo: 'ㄨㄛˇ ㄇㄧㄥˊ ㄊㄧㄢ ___ ㄑㄩˋ',
        answerId: 'bu',
        tags: ['negation', 'travel', 'daily-life']
      },
      {
        id: 'contrast-wo-mei-qu',
        hanzi: '我昨天沒去',
        pinyin: 'wǒ zuótiān méi qù',
        bopomofo: 'ㄨㄛˇ ㄗㄨㄛˊ ㄊㄧㄢ ㄇㄟˊ ㄑㄩˋ',
        english: "I didn't go yesterday.",
        promptHanzi: '我昨天___去',
        promptPinyin: 'wǒ zuótiān ___ qù',
        promptBopomofo: 'ㄨㄛˇ ㄗㄨㄛˊ ㄊㄧㄢ ___ ㄑㄩˋ',
        answerId: 'mei',
        answerIds: ['mei', 'meiyou'],
        tags: ['negation', 'travel', 'daily-life']
      },
      {
        id: 'contrast-wo-chi-le',
        hanzi: '我昨天吃了',
        pinyin: 'wǒ zuótiān chī le',
        bopomofo: 'ㄨㄛˇ ㄗㄨㄛˊ ㄊㄧㄢ ㄔ ㄌㄜ˙',
        english: 'I ate yesterday.',
        promptHanzi: '我昨天吃___',
        promptPinyin: 'wǒ zuótiān chī ___',
        promptBopomofo: 'ㄨㄛˇ ㄗㄨㄛˊ ㄊㄧㄢ ㄔ ___',
        answerId: 'le',
        tags: ['completed-action', 'food', 'daily-life']
      },
      {
        id: 'contrast-wo-chi-guo',
        hanzi: '我以前吃過',
        pinyin: 'wǒ yǐqián chī guò',
        bopomofo: 'ㄨㄛˇ ㄧˇ ㄑㄧㄢˊ ㄔ ㄍㄨㄛˋ',
        english: "I've eaten it before.",
        promptHanzi: '我以前吃___',
        promptPinyin: 'wǒ yǐqián chī ___',
        promptBopomofo: 'ㄨㄛˇ ㄧˇ ㄑㄧㄢˊ ㄔ ___',
        answerId: 'guo',
        tags: ['experience', 'food', 'daily-life']
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
        answerId: 'zai',
        tags: ['daily-life', 'before-vs-now']
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

const getCorrectAnswerIds = (example: PastExample) =>
  Array.from(
    new Set(example.answerIds?.length ? example.answerIds : [example.answerId])
  )

const uniqueExamplesById = (examples: PastExample[]) =>
  Array.from(new Map(examples.map((example) => [example.id, example])).values())

const getAuthoredPastExamples = () =>
  pastSections.flatMap((section) => section.examples)

const getSectionExamples = (section: PastSection) => {
  if (section.kind !== 'practice' || !section.exampleTags?.length) {
    return section.examples
  }

  const tags = new Set(section.exampleTags)

  return uniqueExamplesById(
    getAuthoredPastExamples().filter((example) =>
      example.tags?.some((tag) => tags.has(tag))
    )
  )
}

const getQuizExamples = (sectionId: string) => {
  const section = getPastSectionById(sectionId)

  return getSectionExamples(section).filter((example) => !example.incorrect)
}

const uniqueAnswersById = (answers: PastAnswer[]) =>
  Array.from(new Map(answers.map((answer) => [answer.id, answer])).values())

const getDistractorAnswers = (correct: PastExample, sectionId: string) => {
  const correctAnswerIds = getCorrectAnswerIds(correct)
  const correctIds = new Set(correctAnswerIds)
  const authoredAnswers =
    correct.distractorAnswerIds?.map((answerId) => getAnswerById(answerId)) ?? []
  const sectionAnswerIds = new Set(
    getQuizExamples(sectionId).flatMap((example) => getCorrectAnswerIds(example))
  )
  const preferredAnswers = pastAnswers.filter((answer) =>
    sectionAnswerIds.has(answer.id)
  )
  const authoredPool = uniqueAnswersById(authoredAnswers).filter(
    (answer) => !correctIds.has(answer.id)
  )
  const authoredIds = new Set(authoredPool.map((answer) => answer.id))
  const fallbackPool = uniqueAnswersById([...preferredAnswers, ...pastAnswers]).filter(
    (answer) => !correctIds.has(answer.id) && !authoredIds.has(answer.id)
  )

  return [...shuffle(authoredPool), ...shuffle(fallbackPool)]
}

const getDisplayedCorrectAnswers = (correctAnswers: PastAnswer[]) => {
  if (correctAnswers.length <= 1) {
    return correctAnswers
  }

  return Math.random() < 0.5 ? shuffle(correctAnswers).slice(0, 1) : correctAnswers
}

const fillPastBlank = (template: string | undefined, value: string | undefined) =>
  template && value ? template.replace('___', value) : undefined

export const getPastSectionById = (sectionId: string) =>
  pastSections.find((section) => section.id === sectionId) ?? pastSections[0]

export const getPastSectionsByKind = (kind: PastSectionKind) =>
  pastSections.filter((section) => section.kind === kind)

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

export const localizePastQuestion = (
  question: PastQuizQuestion,
  locale: AppLocale
): PastQuizQuestion => {
  const section = localizePastSection(getPastSectionById(question.sectionId), locale)
  const correctExample = getPastExampleById(question.correctExampleId)?.example
  const correctAnswer = getAnswerById(question.correctAnswerId)

  return {
    ...question,
    sectionHanzi: section.hanzi,
    sectionLabel: section.label,
    correctEnglish: correctExample
      ? localizeExampleMeaning(correctExample, locale)
      : question.correctEnglish,
    feedbackHint: correctExample
      ? localizeFeedbackHint(correctExample, locale)
      : question.feedbackHint,
    correctMeaning: localizeAnswerMeaning(correctAnswer, locale),
    concept: section.concept,
    notes: section.notes,
    options: question.options.map((option) => {
      const answer = getAnswerById(option.id)

      return {
        ...option,
        english: localizeAnswerMeaning(answer, locale)
      }
    })
  }
}

export const localizePastResult = (
  result: PastQuizResult,
  locale: AppLocale
): PastQuizResult => {
  const correctExample = getPastExampleById(result.correctExampleId)?.example
  const correctAnswer = getAnswerById(result.correctAnswerId)

  return {
    ...result,
    correctEnglish: correctExample
      ? localizeExampleMeaning(correctExample, locale)
      : result.correctEnglish,
    feedbackHint: correctExample
      ? localizeFeedbackHint(correctExample, locale)
      : result.feedbackHint,
    correctMeaning: localizeAnswerMeaning(correctAnswer, locale)
  }
}

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
  const correctAnswerIds = getCorrectAnswerIds(correct)
  const correctAnswer = getAnswerById(correct.answerId)
  const correctAnswers = correctAnswerIds.map((answerId) => getAnswerById(answerId))
  const displayedCorrectAnswers = getDisplayedCorrectAnswers(correctAnswers)
  const distractors = getDistractorAnswers(correct, section.id).slice(
    0,
    Math.max(0, 4 - displayedCorrectAnswers.length)
  )
  const options = shuffle([...displayedCorrectAnswers, ...distractors]).map((answer) => ({
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
    correctAnswerIds,
    correctHanzi: correct.hanzi,
    correctPinyin: correct.pinyin,
    correctBopomofo: correct.bopomofo,
    correctEnglish: localizeExampleMeaning(correct, locale),
    feedbackHint: localizeFeedbackHint(correct, locale),
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
  const correctAnswerId = correctExample?.example.answerId ?? question.correctAnswerId
  const correctAnswerIds =
    question.correctAnswerIds?.length || !correctExample
      ? question.correctAnswerIds ?? [correctAnswerId]
      : getCorrectAnswerIds(correctExample.example)
  const isCorrect = correctAnswerIds.includes(selectedAnswerId)
  const reviewedHanzi =
    isCorrect && selectedOption
      ? fillPastBlank(question.prompt, selectedOption.hanzi) ?? question.correctHanzi
      : question.correctHanzi
  const reviewedPinyin =
    isCorrect && selectedOption
      ? fillPastBlank(question.promptPinyin, selectedOption.pinyin) ??
        question.correctPinyin
      : question.correctPinyin
  const reviewedBopomofo =
    isCorrect && selectedOption
      ? fillPastBlank(question.promptBopomofo, selectedOption.bopomofo) ??
        question.correctBopomofo
      : question.correctBopomofo

  return {
    questionId: question.id,
    selectedExampleId: selectedAnswerId,
    selectedAnswerId,
    correctExampleId: question.correctExampleId,
    correctAnswerId,
    correctAnswerIds,
    isCorrect,
    prompt: question.prompt,
    correctHanzi: reviewedHanzi,
    correctPinyin: reviewedPinyin,
    correctBopomofo: reviewedBopomofo,
    correctEnglish: question.correctEnglish,
    feedbackHint: question.feedbackHint,
    correctMeaning: question.correctMeaning,
    selectedHanzi: selectedOption?.hanzi ?? '?'
  }
}
