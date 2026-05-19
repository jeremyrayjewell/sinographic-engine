import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import {
  evaluatePastAnswer,
  generatePastQuestion,
  getPastExampleById,
  getPastSectionById,
  getPastSectionsByKind,
  localizePastSection
} from '../apps/web/src/lib/past-forms.ts'

const assertUniqueOptions = (question) => {
  const optionIds = question.options.map((option) => option.id)

  assert.equal(
    new Set(optionIds).size,
    optionIds.length,
    `Expected unique options for ${question.correctExampleId}`
  )
}

const legacyQuestion = generatePastQuestion('le', [], 'en')
const legacyResult = evaluatePastAnswer(legacyQuestion, legacyQuestion.correctAnswerId)

assert.deepEqual(legacyQuestion.correctAnswerIds, ['le'])
assert.equal(legacyResult.isCorrect, true)
assert.deepEqual(legacyResult.correctAnswerIds, ['le'])
assertUniqueOptions(legacyQuestion)

const multiAnswerQuestion = generatePastQuestion('mei', [], 'en')

assert.deepEqual([...multiAnswerQuestion.correctAnswerIds].sort(), ['mei', 'meiyou'])
assert.equal(evaluatePastAnswer(multiAnswerQuestion, 'mei').isCorrect, true)
assert.equal(evaluatePastAnswer(multiAnswerQuestion, 'meiyou').isCorrect, true)
assertUniqueOptions(multiAnswerQuestion)

for (const answerId of multiAnswerQuestion.correctAnswerIds) {
  assert(
    multiAnswerQuestion.options.some((option) => option.id === answerId),
    `Expected authored correct answer ${answerId} to appear as a valid option`
  )
}

const distractorIds = multiAnswerQuestion.options
  .map((option) => option.id)
  .filter((answerId) => !multiAnswerQuestion.correctAnswerIds.includes(answerId))

for (const distractorId of distractorIds) {
  assert.equal(
    multiAnswerQuestion.correctAnswerIds.includes(distractorId),
    false,
    `Distractor ${distractorId} must not be a correct answer`
  )
}

const runtimeLegacyQuestion = generatePastQuestion('mei', [], 'en')
delete runtimeLegacyQuestion.correctAnswerIds

const runtimeLegacyResult = evaluatePastAnswer(
  runtimeLegacyQuestion,
  runtimeLegacyQuestion.correctAnswerId
)

assert.equal(runtimeLegacyResult.isCorrect, true)
assert.deepEqual([...runtimeLegacyResult.correctAnswerIds].sort(), ['mei', 'meiyou'])

const forcedLeContrastQuestion = generatePastQuestion(
  'le-vs-guo',
  [
    'le-vs-guo-yiqian-wo-chi-guo',
    'le-vs-guo-kan-le-dianying',
    'le-vs-guo-kan-guo-dianying'
  ],
  'en'
)

assert.equal(forcedLeContrastQuestion.sectionId, 'le-vs-guo')
assert.equal(forcedLeContrastQuestion.correctExampleId, 'le-vs-guo-zuotian-wo-chi-le')
assert.deepEqual(forcedLeContrastQuestion.correctAnswerIds, ['le'])
assert(
  forcedLeContrastQuestion.options.some((option) => option.id === 'guo'),
  'Expected authored 了 vs 過 distractor to appear'
)
assert(
  forcedLeContrastQuestion.feedbackHint?.includes('昨天'),
  'Expected authored feedbackHint to travel with the generated question'
)
assert(
  evaluatePastAnswer(forcedLeContrastQuestion, 'guo').feedbackHint?.includes('昨天'),
  'Expected feedbackHint to appear on incorrect results'
)
assertUniqueOptions(forcedLeContrastQuestion)

const forcedNegationContrastQuestion = generatePastQuestion(
  'bu-vs-mei',
  ['bu-vs-mei-zuotian-mei-chi', 'bu-vs-mei-ta-meiyou-lai'],
  'en'
)

assert.equal(forcedNegationContrastQuestion.sectionId, 'bu-vs-mei')
assert.equal(
  forcedNegationContrastQuestion.correctExampleId,
  'bu-vs-mei-mingtian-bu-chi'
)
assert.deepEqual(forcedNegationContrastQuestion.correctAnswerIds, ['bu'])
assert(
  forcedNegationContrastQuestion.options.some((option) => option.id === 'mei'),
  'Expected authored 不 vs 沒 distractor to appear'
)
assertUniqueOptions(forcedNegationContrastQuestion)

const mixedReviewQuestion = generatePastQuestion('mixed-review', [], 'en')

assert.equal(mixedReviewQuestion.sectionId, 'mixed-review')
assert.equal(mixedReviewQuestion.options.length, 4)
assertUniqueOptions(mixedReviewQuestion)

const travelQuestion = generatePastQuestion('travel-places', [], 'en')
const travelExample = getPastExampleById(travelQuestion.correctExampleId)
const travelPool = localizePastSection(getPastSectionById('travel-places'), 'en')
const spanishTravelPool = localizePastSection(
  getPastSectionById('travel-places'),
  'es-419'
)

assert.equal(travelQuestion.sectionId, 'travel-places')
assert(
  travelExample?.example.tags?.includes('travel'),
  `Expected ${travelQuestion.correctExampleId} to come from the travel tag pool`
)
assert.equal(
  travelPool.goal,
  'Practice short sentences about travel, visits, and places.'
)
assert(
  travelPool.decisionPrompt?.includes('sentence sound natural'),
  'Expected practice pool metadata to include a semantic decision prompt'
)
assert.deepEqual(travelPool.lookFor, ['昨天', '以前', '沒有', '過'])
assert(
  travelPool.previewExamples?.slice(0, 2).includes('我去過台灣'),
  'Expected practice pool metadata to include preview examples'
)
assert.equal(
  spanishTravelPool.goal,
  'Practicar oraciones cortas sobre viajes, visitas y lugares.'
)

const foodPool = localizePastSection(getPastSectionById('food-daily-life'), 'en')
const happenedPool = localizePastSection(
  getPastSectionById('happened-or-experienced'),
  'en'
)

assert(
  foodPool.examples.some((example) => example.id === 'mixed-zuotian-wo-chi-le'),
  'Expected food practice to reuse the authored completed-action food example'
)
assert(
  happenedPool.examples.some((example) => example.id === 'mixed-zuotian-wo-chi-le'),
  'Expected happened-or-experienced practice to reuse the same authored example'
)

const learnSectionIds = getPastSectionsByKind('learn').map((section) => section.id)
const practiceSectionIds = getPastSectionsByKind('practice').map(
  (section) => section.id
)

assert.deepEqual(learnSectionIds, ['mei', 'le', 'guo', 'yiqian-changchang'])
assert.deepEqual(practiceSectionIds, [
  'travel-places',
  'food-daily-life',
  'before-vs-now',
  'past-or-not',
  'happened-or-experienced',
  'mixed-review'
])

const pastStudyScreen = readFileSync(
  'apps/web/src/views/PastStudyScreen.tsx',
  'utf8'
)
const homeScreen = readFileSync('apps/web/src/views/HomeScreen.tsx', 'utf8')

assert(
  !pastStudyScreen.includes('genericPracticeLabel'),
  'Active Past quiz should not render a generic practice label near the prompt'
)
assert(
  !pastStudyScreen.includes("section.kind === 'practice'"),
  'Active Past quiz should not render selected practice pool names near the prompt'
)
assert(
  !pastStudyScreen.includes('{section.hanzi}\n                </p>'),
  'Active Past prompt label should not render the selected answer-family Hanzi'
)
assert(
  pastStudyScreen.includes('currentResult.feedbackHint'),
  'Expected incorrect Past feedback to render authored feedbackHint'
)
assert(
  pastStudyScreen.includes('!currentResult.isCorrect'),
  'Expected feedbackHint to be gated behind incorrect answers'
)
assert(
  !homeScreen.includes('selectedPastPracticeSection'),
  'Home practice selection should not render a separate practice info card'
)
assert(
  homeScreen.includes('selectedPastSessionLength'),
  'Home practice selection should keep length selection available'
)

console.log('Past grammar multi-answer tests passed.')
