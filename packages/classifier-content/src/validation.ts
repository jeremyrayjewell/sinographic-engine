import type {
  Classifier,
  ExampleSentence
} from '@sinographic-engine/shared-types'

export interface ValidationIssue {
  path: string
  message: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === 'string')
}

function validatePinyinReading(
  value: unknown,
  path: string
): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  if (!isRecord(value)) {
    return [{ path, message: 'Expected a pinyin object.' }]
  }

  if (typeof value.surface !== 'string' || value.surface.length === 0) {
    issues.push({ path: `${path}.surface`, message: 'Expected a non-empty string.' })
  }

  if (
    value.underlying !== undefined &&
    typeof value.underlying !== 'string'
  ) {
    issues.push({
      path: `${path}.underlying`,
      message: 'Expected a string when provided.'
    })
  }

  if (value.bopomofo !== undefined && typeof value.bopomofo !== 'string') {
    issues.push({
      path: `${path}.bopomofo`,
      message: 'Expected a string when provided.'
    })
  }

  return issues
}

export function validateExampleSentence(
  value: unknown,
  path = 'exampleSentence'
): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  if (!isRecord(value)) {
    return [{ path, message: 'Expected an object.' }]
  }

  if (typeof value.id !== 'string' || value.id.length === 0) {
    issues.push({ path: `${path}.id`, message: 'Expected a non-empty string.' })
  }

  if (typeof value.hanzi !== 'string' || value.hanzi.length === 0) {
    issues.push({
      path: `${path}.hanzi`,
      message: 'Expected a non-empty string.'
    })
  }

  issues.push(...validatePinyinReading(value.pinyin, `${path}.pinyin`))

  if (typeof value.english !== 'string' || value.english.length === 0) {
    issues.push({
      path: `${path}.english`,
      message: 'Expected a non-empty string.'
    })
  }

  return issues
}

export function isExampleSentence(value: unknown): value is ExampleSentence {
  return validateExampleSentence(value).length === 0
}

function validateRegionalUsage(
  value: unknown,
  path: string
): ValidationIssue[] {
  if (value === undefined) {
    return []
  }

  if (!isRecord(value)) {
    return [{ path, message: 'Expected an object when provided.' }]
  }

  const issues: ValidationIssue[] = []

  for (const key of ['taiwan', 'mainland', 'hongkong'] as const) {
    const candidate = value[key]

    if (candidate !== undefined && typeof candidate !== 'boolean') {
      issues.push({
        path: `${path}.${key}`,
        message: 'Expected a boolean when provided.'
      })
    }
  }

  return issues
}

export function validateClassifier(
  value: unknown,
  path = 'classifier'
): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  if (!isRecord(value)) {
    return [{ path, message: 'Expected an object.' }]
  }

  if (typeof value.id !== 'string' || value.id.length === 0) {
    issues.push({ path: `${path}.id`, message: 'Expected a non-empty string.' })
  }

  if (typeof value.hanzi !== 'string' || value.hanzi.length === 0) {
    issues.push({
      path: `${path}.hanzi`,
      message: 'Expected a non-empty string.'
    })
  }

  issues.push(...validatePinyinReading(value.pinyin, `${path}.pinyin`))

  if (
    !Array.isArray(value.meanings) ||
    value.meanings.length === 0 ||
    !value.meanings.every((entry) => typeof entry === 'string' && entry.length > 0)
  ) {
    issues.push({
      path: `${path}.meanings`,
      message: 'Expected a non-empty array of strings.'
    })
  }

  if (typeof value.usage !== 'string' || value.usage.length === 0) {
    issues.push({
      path: `${path}.usage`,
      message: 'Expected a non-empty string.'
    })
  }

  if (!isStringArray(value.semanticTags)) {
    issues.push({
      path: `${path}.semanticTags`,
      message: 'Expected an array of strings.'
    })
  }

  if (
    value.compatibleNouns !== undefined &&
    !isStringArray(value.compatibleNouns)
  ) {
    issues.push({
      path: `${path}.compatibleNouns`,
      message: 'Expected an array of strings when provided.'
    })
  }

  if (
    value.relatedClassifiers !== undefined &&
    !isStringArray(value.relatedClassifiers)
  ) {
    issues.push({
      path: `${path}.relatedClassifiers`,
      message: 'Expected an array of strings when provided.'
    })
  }

  issues.push(...validateRegionalUsage(value.regionalUsage, `${path}.regionalUsage`))

  if (
    typeof value.difficulty !== 'number' ||
    !Number.isFinite(value.difficulty)
  ) {
    issues.push({
      path: `${path}.difficulty`,
      message: 'Expected a finite number.'
    })
  }

  if (
    typeof value.taiwanFrequency !== 'number' ||
    !Number.isFinite(value.taiwanFrequency)
  ) {
    issues.push({
      path: `${path}.taiwanFrequency`,
      message: 'Expected a finite number.'
    })
  }

  if (!Array.isArray(value.examples)) {
    issues.push({
      path: `${path}.examples`,
      message: 'Expected an array of example sentences.'
    })
  } else {
    value.examples.forEach((example, index) => {
      issues.push(...validateExampleSentence(example, `${path}.examples[${index}]`))
    })
  }

  return issues
}

export function isClassifier(value: unknown): value is Classifier {
  return validateClassifier(value).length === 0
}

function logValidationErrors(errors: ValidationIssue[], context: string) {
  if (errors.length === 0) {
    return
  }

  console.error(`Invalid ${context}:`)

  for (const issue of errors) {
    console.error(`- ${issue.path}: ${issue.message}`)
  }
}

export function assertClassifierDataset(
  value: unknown
): asserts value is Classifier[] {
  if (!Array.isArray(value)) {
    throw new Error(
      'Invalid classifier dataset: expected the canonical content file to export an array.'
    )
  }

  const issues = value.flatMap((entry, index) =>
    validateClassifier(entry, `classifiers[${index}]`)
  )

  if (issues.length > 0) {
    logValidationErrors(issues, 'classifier dataset')
    throw new Error('Invalid classifier dataset: malformed classifier entries detected.')
  }
}

export function parseClassifierDataset(value: unknown): Classifier[] {
  assertClassifierDataset(value)
  return value
}
