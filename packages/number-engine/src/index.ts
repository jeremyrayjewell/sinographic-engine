import type {
  NumberQuizAnswerValue,
  NumberQuizOption,
  NumberQuizQuestion,
  NumberQuizResult
} from '@sinographic-engine/shared-types'

export interface NumberSessionState {
  askedValues: NumberQuizAnswerValue[]
  score: number
  results: NumberQuizResult[]
}

export interface GenerateNumberQuestionOptions {
  excludeValues?: number[]
  min?: number
  max?: number
}

export interface GenerateMathQuestionOptions {
  excludeValues?: NumberQuizAnswerValue[]
  minResult?: number
  maxResult?: number
}

interface SyllableToken {
  hanzi: string
  pinyin: string
  bopomofo: string
}

const DIGITS: Record<number, SyllableToken> = {
  0: { hanzi: '零', pinyin: 'líng', bopomofo: 'ㄌㄧㄥˊ' },
  1: { hanzi: '一', pinyin: 'yī', bopomofo: 'ㄧ' },
  2: { hanzi: '二', pinyin: 'èr', bopomofo: 'ㄦˋ' },
  3: { hanzi: '三', pinyin: 'sān', bopomofo: 'ㄙㄢ' },
  4: { hanzi: '四', pinyin: 'sì', bopomofo: 'ㄙˋ' },
  5: { hanzi: '五', pinyin: 'wǔ', bopomofo: 'ㄨˇ' },
  6: { hanzi: '六', pinyin: 'liù', bopomofo: 'ㄌㄧㄡˋ' },
  7: { hanzi: '七', pinyin: 'qī', bopomofo: 'ㄑㄧ' },
  8: { hanzi: '八', pinyin: 'bā', bopomofo: 'ㄅㄚ' },
  9: { hanzi: '九', pinyin: 'jiǔ', bopomofo: 'ㄐㄧㄡˇ' }
}

const TEN: SyllableToken = {
  hanzi: '十',
  pinyin: 'shí',
  bopomofo: 'ㄕˊ'
}

const HUNDRED: SyllableToken = {
  hanzi: '百',
  pinyin: 'bǎi',
  bopomofo: 'ㄅㄞˇ'
}

const THOUSAND: SyllableToken = {
  hanzi: '千',
  pinyin: 'qiān',
  bopomofo: 'ㄑㄧㄢ'
}

const TEN_THOUSAND: SyllableToken = {
  hanzi: '萬',
  pinyin: 'wàn',
  bopomofo: 'ㄨㄢˋ'
}

const shuffleAnswers = <T>(items: T[]) => {
  const copy = [...items]

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]]
  }

  return copy
}

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const convertBelowTenThousand = (value: number): SyllableToken[] => {
  if (value === 0) {
    return [DIGITS[0]]
  }

  const digits = [
    Math.floor(value / 1000),
    Math.floor((value % 1000) / 100),
    Math.floor((value % 100) / 10),
    value % 10
  ]
  const units = [THOUSAND, HUNDRED, TEN, null] as const
  const tokens: SyllableToken[] = []
  let needsZero = false

  digits.forEach((digit, index) => {
    const unit = units[index]

    if (digit === 0) {
      if (
        tokens.length > 0 &&
        digits.slice(index + 1).some((nextDigit) => nextDigit !== 0)
      ) {
        needsZero = true
      }

      return
    }

    if (needsZero) {
      tokens.push(DIGITS[0])
      needsZero = false
    }

    if (unit === TEN && digit === 1 && tokens.length === 0) {
      tokens.push(TEN)
      return
    }

    tokens.push(DIGITS[digit])

    if (unit) {
      tokens.push(unit)
    }
  })

  return tokens
}

const convertNumberToTokens = (value: number): SyllableToken[] => {
  if (!Number.isInteger(value) || value < 1 || value > 1_000_000) {
    throw new Error('number-engine supports integer values from 1 to 1,000,000.')
  }

  if (value < 10_000) {
    return convertBelowTenThousand(value)
  }

  const high = Math.floor(value / 10_000)
  const low = value % 10_000
  const tokens = [...convertBelowTenThousand(high), TEN_THOUSAND]

  if (low === 0) {
    return tokens
  }

  if (low < 1000) {
    tokens.push(DIGITS[0])
  }

  return [...tokens, ...convertBelowTenThousand(low)]
}

export const numberToTaiwanMandarin = (value: number) => {
  const tokens = convertNumberToTokens(value)

  return {
    value,
    hanzi: tokens.map((token) => token.hanzi).join(''),
    pinyin: tokens.map((token) => token.pinyin).join(' '),
    bopomofo: tokens.map((token) => token.bopomofo).join(' ')
  }
}

const buildCandidatePool = (value: number, min = 1, max = 1_000_000) => {
  const candidates = new Set<number>()
  const magnitude =
    value >= 100_000
      ? 10_000
      : value >= 10_000
        ? 1000
        : value >= 1000
          ? 100
          : value >= 100
            ? 10
            : 1

  const tryAdd = (candidate: number) => {
    if (candidate >= min && candidate <= max && candidate !== value) {
      candidates.add(candidate)
    }
  }

  ;[-2, -1, 1, 2].forEach((offset) => tryAdd(value + offset))
  ;[-magnitude, magnitude].forEach((offset) => tryAdd(value + offset))
  ;[-magnitude * 2, magnitude * 2].forEach((offset) =>
    tryAdd(value + offset)
  )

  const digits = String(value).split('')
  for (let index = 0; index < digits.length; index += 1) {
    for (const replacement of ['1', '2', '3', '4', '5', '6', '7', '8', '9']) {
      if (replacement === digits[index]) {
        continue
      }

      const copy = [...digits]
      copy[index] = replacement
      const nextValue = Number(copy.join(''))
      tryAdd(nextValue)
    }
  }

  if (digits.length > 1) {
    const reversed = Number([...digits].reverse().join(''))
    tryAdd(reversed)
  }

  return [...candidates]
}

const createOption = (value: number): NumberQuizOption => {
  const reading = numberToTaiwanMandarin(value)

  return {
    id: `number-${value}`,
    value,
    hanzi: reading.hanzi,
    pinyin: reading.pinyin,
    bopomofo: reading.bopomofo,
    speechText: reading.hanzi
  }
}

const getDistractors = (value: number, count = 3, min = 1, max = 1_000_000) => {
  const pool = shuffleAnswers(buildCandidatePool(value, min, max))
  const chosen = pool.slice(0, count)

  while (chosen.length < count) {
    const fallback = Math.max(
      min,
      Math.min(max, value + Math.floor(Math.random() * 5000) - 2500)
    )

    if (fallback !== value && !chosen.includes(fallback)) {
      chosen.push(fallback)
    }
  }

  return chosen
}

export const generateNumberQuestion = (
  options: GenerateNumberQuestionOptions = {}
): NumberQuizQuestion => {
  const min = options.min ?? 1
  const max = options.max ?? 1_000_000
  const excluded = options.excludeValues ?? []

  let value = 0

  for (let attempts = 0; attempts < 100; attempts += 1) {
    const candidate = Math.floor(Math.random() * (max - min + 1)) + min

    if (!excluded.includes(candidate)) {
      value = candidate
      break
    }
  }

  if (value === 0) {
    value = Math.floor(Math.random() * (max - min + 1)) + min
  }

  const correct = createOption(value)
  const distractors = getDistractors(value, 3, min, max).map(createOption)

  return {
    id: `number-${value}`,
    prompt: value.toLocaleString('en-US'),
    correctValue: value,
    correctHanzi: correct.hanzi,
    correctPinyin: correct.pinyin,
    correctBopomofo: correct.bopomofo,
    correctSpeechText: correct.speechText,
    options: shuffleAnswers([correct, ...distractors])
  }
}

type MathOperator = '+' | '−' | '×' | '÷'

interface MathExpression {
  id: string
  prompt: string
  left: number
  right: number
  operator: MathOperator
}

interface MathOperatorReading {
  hanzi: string
  pinyin: string
  bopomofo: string
}

interface WeightedMathOperatorReading extends MathOperatorReading {
  weight: number
}

const MATH_OPERATOR_READING_VARIANTS: Record<
  MathOperator,
  WeightedMathOperatorReading[]
> = {
  '+': [
    { hanzi: '加', pinyin: 'jiā', bopomofo: 'ㄐㄧㄚ', weight: 5 },
    { hanzi: '加上', pinyin: 'jiā shàng', bopomofo: 'ㄐㄧㄚ ㄕㄤˋ', weight: 3 }
  ],
  '−': [
    { hanzi: '減', pinyin: 'jiǎn', bopomofo: 'ㄐㄧㄢˇ', weight: 5 },
    { hanzi: '減去', pinyin: 'jiǎn qù', bopomofo: 'ㄐㄧㄢˇ ㄑㄩˋ', weight: 2 },
    { hanzi: '減掉', pinyin: 'jiǎn diào', bopomofo: 'ㄐㄧㄢˇ ㄉㄧㄠˋ', weight: 1 }
  ],
  '×': [
    { hanzi: '乘以', pinyin: 'chéng yǐ', bopomofo: 'ㄔㄥˊ ㄧˇ', weight: 6 },
    { hanzi: '乘', pinyin: 'chéng', bopomofo: 'ㄔㄥˊ', weight: 3 }
  ],
  '÷': [{ hanzi: '除以', pinyin: 'chú yǐ', bopomofo: 'ㄔㄨˊ ㄧˇ', weight: 8 }]
}

const chooseWeightedVariant = <T extends { weight: number }>(items: T[]) => {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
  let threshold = Math.random() * totalWeight

  for (const item of items) {
    threshold -= item.weight

    if (threshold <= 0) {
      return item
    }
  }

  return items[items.length - 1]
}

const generateAdditionExpression = (
  minResult: number,
  maxResult: number
): MathExpression => {
  const result = randomInt(Math.max(2, minResult), maxResult)
  const left = randomInt(1, result - 1)
  const right = result - left

  return {
    id: `math-add-${left}-${right}`,
    prompt: `${left} + ${right}`,
    left,
    right,
    operator: '+'
  }
}

const generateSubtractionExpression = (
  minResult: number,
  maxResult: number
): MathExpression => {
  const result = randomInt(minResult, maxResult)
  const right = randomInt(1, Math.max(1, maxResult - result))
  const left = result + right

  return {
    id: `math-sub-${left}-${right}`,
    prompt: `${left} − ${right}`,
    left,
    right,
    operator: '−'
  }
}

const generateMultiplicationExpression = (
  minResult: number,
  maxResult: number
): MathExpression => {
  const candidates: Array<{ left: number; right: number; result: number }> = []

  for (let left = 2; left <= 12; left += 1) {
    for (let right = 2; right <= 12; right += 1) {
      const result = left * right

      if (result >= minResult && result <= maxResult) {
        candidates.push({ left, right, result })
      }
    }
  }

  const selected = candidates[randomInt(0, candidates.length - 1)]

  return {
    id: `math-mul-${selected.left}-${selected.right}`,
    prompt: `${selected.left} × ${selected.right}`,
    left: selected.left,
    right: selected.right,
    operator: '×'
  }
}

const generateDivisionExpression = (
  minResult: number,
  maxResult: number
): MathExpression => {
  const result = randomInt(minResult, Math.min(maxResult, 12))
  const divisor = randomInt(2, 12)
  const dividend = result * divisor

  return {
    id: `math-div-${dividend}-${divisor}`,
    prompt: `${dividend} ÷ ${divisor}`,
    left: dividend,
    right: divisor,
    operator: '÷'
  }
}

const buildMathExpression = (
  minResult: number,
  maxResult: number
): MathExpression => {
  const operators: MathOperator[] = ['+', '−', '×', '÷']
  const operator = operators[randomInt(0, operators.length - 1)]

  switch (operator) {
    case '+':
      return generateAdditionExpression(minResult, maxResult)
    case '−':
      return generateSubtractionExpression(minResult, maxResult)
    case '×':
      return generateMultiplicationExpression(minResult, maxResult)
    case '÷':
      return generateDivisionExpression(minResult, maxResult)
  }
}

const createMathOption = (
  expression: MathExpression,
  operatorReading = chooseWeightedVariant(
    MATH_OPERATOR_READING_VARIANTS[expression.operator]
  )
): NumberQuizOption => {
  const left = numberToTaiwanMandarin(expression.left)
  const right = numberToTaiwanMandarin(expression.right)

  return {
    id: expression.id,
    value: expression.id,
    hanzi: `${left.hanzi}${operatorReading.hanzi}${right.hanzi}`,
    pinyin: `${left.pinyin} ${operatorReading.pinyin} ${right.pinyin}`,
    bopomofo: `${left.bopomofo} ${operatorReading.bopomofo} ${right.bopomofo}`,
    speechText: `${left.hanzi}${operatorReading.hanzi}${right.hanzi}`
  }
}

const buildMathDistractorPool = (expression: MathExpression) => {
  const candidates = new Map<string, MathExpression>()
  const operators: MathOperator[] = ['+', '−', '×', '÷']
  const tryAdd = (candidate: MathExpression) => {
    if (candidate.id !== expression.id) {
      candidates.set(candidate.id, candidate)
    }
  }

  ;[-2, -1, 1, 2].forEach((offset) => {
    const nextLeft = Math.max(1, expression.left + offset)
    const nextRight = Math.max(1, expression.right + offset)

    tryAdd({
      ...expression,
      id: `math-${expression.operator}-${nextLeft}-${expression.right}`,
      left: nextLeft
    })
    tryAdd({
      ...expression,
      id: `math-${expression.operator}-${expression.left}-${nextRight}`,
      right: nextRight
    })
  })

  operators
    .filter((operator) => operator !== expression.operator)
    .forEach((operator) => {
      tryAdd({
        ...expression,
        id: `math-${operator}-${expression.left}-${expression.right}`,
        operator
      })
    })

  return [...candidates.values()]
}

export const generateMathQuestion = (
  options: GenerateMathQuestionOptions = {}
): NumberQuizQuestion => {
  const minResult = options.minResult ?? 1
  const maxResult = options.maxResult ?? 100
  const excluded = options.excludeValues ?? []

  let expression: MathExpression | null = null

  for (let attempts = 0; attempts < 100; attempts += 1) {
    const candidate = buildMathExpression(minResult, maxResult)

    if (!excluded.includes(candidate.id)) {
      expression = candidate
      break
    }
  }

  if (!expression) {
    expression = buildMathExpression(minResult, maxResult)
  }

  const correct = createMathOption(expression)
  const distractors = shuffleAnswers(buildMathDistractorPool(expression))
    .slice(0, 3)
    .map((candidate) => createMathOption(candidate))

  return {
    id: expression.id,
    prompt: expression.prompt,
    correctValue: expression.id,
    correctHanzi: correct.hanzi,
    correctPinyin: correct.pinyin,
    correctBopomofo: correct.bopomofo,
    correctSpeechText: correct.speechText,
    options: shuffleAnswers([correct, ...distractors])
  }
}

export const evaluateNumberAnswer = (
  question: NumberQuizQuestion,
  selectedValue: NumberQuizAnswerValue
): NumberQuizResult => {
  const selectedOption =
    question.options.find((option) => option.value === selectedValue) ??
    question.options[0]

  return {
    questionId: question.id,
    selectedValue,
    correctValue: question.correctValue,
    isCorrect: selectedValue === question.correctValue,
    prompt: question.prompt,
    correctHanzi: question.correctHanzi,
    correctPinyin: question.correctPinyin,
    correctBopomofo: question.correctBopomofo,
    correctSpeechText: question.correctSpeechText,
    selectedHanzi: selectedOption.hanzi,
    selectedPinyin: selectedOption.pinyin,
    selectedBopomofo: selectedOption.bopomofo,
    selectedSpeechText: selectedOption.speechText
  }
}

export const createNumberSessionState = (): NumberSessionState => ({
  askedValues: [],
  score: 0,
  results: []
})

export const recordNumberResult = (
  state: NumberSessionState,
  result: NumberQuizResult
): NumberSessionState => ({
  askedValues: [...state.askedValues, result.correctValue],
  score: state.score + (result.isCorrect ? 1 : 0),
  results: [...state.results, result]
})
