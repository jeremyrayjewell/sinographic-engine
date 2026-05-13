import fs from 'node:fs'
import path from 'node:path'

const toneChars = new Map([
  ['ā', ['a', 1]],
  ['á', ['a', 2]],
  ['ǎ', ['a', 3]],
  ['à', ['a', 4]],
  ['ē', ['e', 1]],
  ['é', ['e', 2]],
  ['ě', ['e', 3]],
  ['è', ['e', 4]],
  ['ī', ['i', 1]],
  ['í', ['i', 2]],
  ['ǐ', ['i', 3]],
  ['ì', ['i', 4]],
  ['ō', ['o', 1]],
  ['ó', ['o', 2]],
  ['ǒ', ['o', 3]],
  ['ò', ['o', 4]],
  ['ū', ['u', 1]],
  ['ú', ['u', 2]],
  ['ǔ', ['u', 3]],
  ['ù', ['u', 4]],
  ['ǖ', ['ü', 1]],
  ['ǘ', ['ü', 2]],
  ['ǚ', ['ü', 3]],
  ['ǜ', ['ü', 4]],
  ['ü', ['ü', 5]],
  ['ê', ['e', 5]]
])

const initialMap = {
  b: 'ㄅ',
  p: 'ㄆ',
  m: 'ㄇ',
  f: 'ㄈ',
  d: 'ㄉ',
  t: 'ㄊ',
  n: 'ㄋ',
  l: 'ㄌ',
  g: 'ㄍ',
  k: 'ㄎ',
  h: 'ㄏ',
  j: 'ㄐ',
  q: 'ㄑ',
  x: 'ㄒ',
  zh: 'ㄓ',
  ch: 'ㄔ',
  sh: 'ㄕ',
  r: 'ㄖ',
  z: 'ㄗ',
  c: 'ㄘ',
  s: 'ㄙ'
}

const finalMap = {
  a: 'ㄚ',
  o: 'ㄛ',
  e: 'ㄜ',
  ai: 'ㄞ',
  ei: 'ㄟ',
  ao: 'ㄠ',
  ou: 'ㄡ',
  an: 'ㄢ',
  en: 'ㄣ',
  ang: 'ㄤ',
  eng: 'ㄥ',
  ong: 'ㄨㄥ',
  er: 'ㄦ',
  i: 'ㄧ',
  ia: 'ㄧㄚ',
  ie: 'ㄧㄝ',
  iao: 'ㄧㄠ',
  iu: 'ㄧㄡ',
  iou: 'ㄧㄡ',
  ian: 'ㄧㄢ',
  in: 'ㄧㄣ',
  iang: 'ㄧㄤ',
  ing: 'ㄧㄥ',
  iong: 'ㄩㄥ',
  u: 'ㄨ',
  ua: 'ㄨㄚ',
  uo: 'ㄨㄛ',
  uai: 'ㄨㄞ',
  ui: 'ㄨㄟ',
  uei: 'ㄨㄟ',
  uan: 'ㄨㄢ',
  un: 'ㄨㄣ',
  uen: 'ㄨㄣ',
  uang: 'ㄨㄤ',
  ueng: 'ㄨㄥ',
  ü: 'ㄩ',
  üe: 'ㄩㄝ',
  üan: 'ㄩㄢ',
  ün: 'ㄩㄣ'
}

const toneSuffix = {
  1: '',
  2: 'ˊ',
  3: 'ˇ',
  4: 'ˋ'
}

const specialWhole = {
  zhi: 'ㄓ',
  chi: 'ㄔ',
  shi: 'ㄕ',
  ri: 'ㄖ',
  zi: 'ㄗ',
  ci: 'ㄘ',
  si: 'ㄙ',
  er: 'ㄦ',
  yi: 'ㄧ',
  ya: 'ㄧㄚ',
  yao: 'ㄧㄠ',
  ye: 'ㄧㄝ',
  you: 'ㄧㄡ',
  yan: 'ㄧㄢ',
  yin: 'ㄧㄣ',
  yang: 'ㄧㄤ',
  ying: 'ㄧㄥ',
  yong: 'ㄩㄥ',
  wu: 'ㄨ',
  wa: 'ㄨㄚ',
  wo: 'ㄨㄛ',
  wai: 'ㄨㄞ',
  wei: 'ㄨㄟ',
  wan: 'ㄨㄢ',
  wen: 'ㄨㄣ',
  wang: 'ㄨㄤ',
  weng: 'ㄨㄥ',
  yu: 'ㄩ',
  yue: 'ㄩㄝ',
  yuan: 'ㄩㄢ',
  yun: 'ㄩㄣ'
}

const genericInitials = [
  '',
  'b',
  'p',
  'm',
  'f',
  'd',
  't',
  'n',
  'l',
  'g',
  'k',
  'h',
  'z',
  'c',
  's',
  'zh',
  'ch',
  'sh',
  'r'
]

const genericFinals = [
  'a',
  'o',
  'e',
  'ai',
  'ei',
  'ao',
  'ou',
  'an',
  'en',
  'ang',
  'eng',
  'ong',
  'er',
  'i',
  'ia',
  'ie',
  'iao',
  'iu',
  'ian',
  'in',
  'iang',
  'ing',
  'u',
  'ua',
  'uo',
  'uai',
  'ui',
  'uan',
  'un',
  'uang'
]

const jqxFinals = [
  'i',
  'ia',
  'ie',
  'iao',
  'iu',
  'ian',
  'in',
  'iang',
  'ing',
  'iong',
  'u',
  'ue',
  'uan',
  'un'
]

const validSyllables = new Set(Object.keys(specialWhole))

for (const initial of genericInitials) {
  for (const final of genericFinals) {
    validSyllables.add(initial + final)
  }
}

for (const initial of ['j', 'q', 'x']) {
  for (const final of jqxFinals) {
    validSyllables.add(initial + final)
  }
}

for (const extra of ['lü', 'lüe', 'nü', 'nüe']) {
  validSyllables.add(extra)
}

function normalizeChar(char) {
  if (toneChars.has(char)) {
    return toneChars.get(char)
  }

  return [char.toLowerCase(), 0]
}

function normalizeWord(word) {
  let normalized = ''
  const tones = []

  for (const char of word) {
    const [base, tone] = normalizeChar(char)
    normalized += base
    tones.push(tone)
  }

  return { normalized, tones }
}

function toneForSlice(tones, start, end) {
  for (let index = start; index < end; index += 1) {
    if (tones[index] > 0) {
      return tones[index]
    }
  }

  return 5
}

function segmentWord(normalized) {
  const memo = new Map()

  const solve = (index) => {
    if (index === normalized.length) {
      return []
    }

    if (memo.has(index)) {
      return memo.get(index)
    }

    for (let end = normalized.length; end > index; end -= 1) {
      const candidate = normalized.slice(index, end)

      if (!validSyllables.has(candidate)) {
        continue
      }

      const rest = solve(end)

      if (rest) {
        const solution = [candidate, ...rest]
        memo.set(index, solution)
        return solution
      }
    }

    memo.set(index, null)
    return null
  }

  return solve(0)
}

function applyTone(symbols, tone) {
  if (tone === 5) {
    return `˙${symbols}`
  }

  return `${symbols}${toneSuffix[tone] ?? ''}`
}

function toBopomofoSyllable(base, tone) {
  if (specialWhole[base]) {
    return applyTone(specialWhole[base], tone)
  }

  const initial =
    ['zh', 'ch', 'sh'].find((value) => base.startsWith(value)) ??
    [
      'b',
      'p',
      'm',
      'f',
      'd',
      't',
      'n',
      'l',
      'g',
      'k',
      'h',
      'j',
      'q',
      'x',
      'r',
      'z',
      'c',
      's'
    ].find((value) => base.startsWith(value)) ??
    ''

  let final = base.slice(initial.length)

  if (['j', 'q', 'x'].includes(initial)) {
    if (final === 'u') final = 'ü'
    else if (final === 'ue') final = 'üe'
    else if (final === 'uan') final = 'üan'
    else if (final === 'un') final = 'ün'
  }

  const initialSymbols = initial ? initialMap[initial] : ''
  const finalSymbols = finalMap[final]

  if (!finalSymbols) {
    throw new Error(
      `No bopomofo final mapping for syllable "${base}" (final: "${final}")`
    )
  }

  return applyTone(`${initialSymbols}${finalSymbols}`, tone)
}

function convertReading(text) {
  if (!text) {
    return text
  }

  const words = text.split(/\s+/).filter(Boolean)

  return words
    .map((word) => {
      const { normalized, tones } = normalizeWord(word)
      const syllables = segmentWord(normalized)

      if (!syllables) {
        throw new Error(
          `Could not segment pinyin word "${word}" (normalized: "${normalized}")`
        )
      }

      let cursor = 0

      return syllables
        .map((syllable) => {
          const tone = toneForSlice(tones, cursor, cursor + syllable.length)
          cursor += syllable.length
          return toBopomofoSyllable(syllable, tone)
        })
        .join(' ')
    })
    .join(' ')
}

function updateReading(reading) {
  if (!reading || typeof reading.surface !== 'string') {
    return
  }

  reading.bopomofo = convertReading(reading.surface)
}

const classifiersDir = path.join(process.cwd(), 'content', 'classifiers')
const files = fs.readdirSync(classifiersDir).filter((file) => file.endsWith('.json'))

for (const file of files) {
  const target = path.join(classifiersDir, file)
  const raw = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '')
  const content = JSON.parse(raw)

  updateReading(content.pinyin)

  for (const example of content.examples ?? []) {
    updateReading(example.pinyin)
  }

  fs.writeFileSync(target, `${JSON.stringify(content, null, 2)}\n`, 'utf8')
}

console.log(`Updated bopomofo for ${files.length} classifier files.`)
