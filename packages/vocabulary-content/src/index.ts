import type {
  AppLocale,
  VocabularyDeck,
  VocabularyDeckId,
  VocabularyItem
} from '@sinographic-engine/shared-types'

type SeedItem = Omit<VocabularyItem, 'category' | 'deckIds'> & {
  deckId: Exclude<VocabularyDeckId, 'all'>
}

const toneMarks: Record<string, { base: string; tone: string }> = {
  ā: { base: 'a', tone: '' },
  á: { base: 'a', tone: 'ˊ' },
  ǎ: { base: 'a', tone: 'ˇ' },
  à: { base: 'a', tone: 'ˋ' },
  ē: { base: 'e', tone: '' },
  é: { base: 'e', tone: 'ˊ' },
  ě: { base: 'e', tone: 'ˇ' },
  è: { base: 'e', tone: 'ˋ' },
  ī: { base: 'i', tone: '' },
  í: { base: 'i', tone: 'ˊ' },
  ǐ: { base: 'i', tone: 'ˇ' },
  ì: { base: 'i', tone: 'ˋ' },
  ō: { base: 'o', tone: '' },
  ó: { base: 'o', tone: 'ˊ' },
  ǒ: { base: 'o', tone: 'ˇ' },
  ò: { base: 'o', tone: 'ˋ' },
  ū: { base: 'u', tone: '' },
  ú: { base: 'u', tone: 'ˊ' },
  ǔ: { base: 'u', tone: 'ˇ' },
  ù: { base: 'u', tone: 'ˋ' },
  ǖ: { base: 'v', tone: '' },
  ǘ: { base: 'v', tone: 'ˊ' },
  ǚ: { base: 'v', tone: 'ˇ' },
  ǜ: { base: 'v', tone: 'ˋ' },
  ü: { base: 'v', tone: '' }
}

const initials: Record<string, string> = {
  zh: 'ㄓ',
  ch: 'ㄔ',
  sh: 'ㄕ',
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
  r: 'ㄖ',
  z: 'ㄗ',
  c: 'ㄘ',
  s: 'ㄙ'
}

const finals: Record<string, string> = {
  a: 'ㄚ',
  ai: 'ㄞ',
  an: 'ㄢ',
  ang: 'ㄤ',
  ao: 'ㄠ',
  e: 'ㄜ',
  ei: 'ㄟ',
  en: 'ㄣ',
  eng: 'ㄥ',
  er: 'ㄦ',
  i: 'ㄧ',
  ia: 'ㄧㄚ',
  ian: 'ㄧㄢ',
  iang: 'ㄧㄤ',
  iao: 'ㄧㄠ',
  ie: 'ㄧㄝ',
  in: 'ㄧㄣ',
  ing: 'ㄧㄥ',
  iong: 'ㄩㄥ',
  iu: 'ㄧㄡ',
  o: 'ㄛ',
  ong: 'ㄨㄥ',
  ou: 'ㄡ',
  u: 'ㄨ',
  ua: 'ㄨㄚ',
  uai: 'ㄨㄞ',
  uan: 'ㄨㄢ',
  uang: 'ㄨㄤ',
  ui: 'ㄨㄟ',
  un: 'ㄨㄣ',
  uo: 'ㄨㄛ',
  v: 'ㄩ',
  ve: 'ㄩㄝ'
}

const yFinals: Record<string, string> = {
  ya: 'ㄧㄚ',
  yan: 'ㄧㄢ',
  yang: 'ㄧㄤ',
  yao: 'ㄧㄠ',
  ye: 'ㄧㄝ',
  yi: 'ㄧ',
  yin: 'ㄧㄣ',
  ying: 'ㄧㄥ',
  yong: 'ㄩㄥ',
  you: 'ㄧㄡ',
  yu: 'ㄩ',
  yuan: 'ㄩㄢ',
  yue: 'ㄩㄝ',
  yun: 'ㄩㄣ'
}

const wFinals: Record<string, string> = {
  wa: 'ㄨㄚ',
  wai: 'ㄨㄞ',
  wan: 'ㄨㄢ',
  wang: 'ㄨㄤ',
  wei: 'ㄨㄟ',
  wen: 'ㄨㄣ',
  weng: 'ㄨㄥ',
  wo: 'ㄨㄛ',
  wu: 'ㄨ'
}

const specialSyllables: Record<string, string> = {
  zhi: 'ㄓ',
  chi: 'ㄔ',
  shi: 'ㄕ',
  ri: 'ㄖ',
  zi: 'ㄗ',
  ci: 'ㄘ',
  si: 'ㄙ'
}

const convertBaseSyllable = (syllable: string) => {
  if (specialSyllables[syllable]) {
    return specialSyllables[syllable]
  }

  if (yFinals[syllable]) {
    return yFinals[syllable]
  }

  if (wFinals[syllable]) {
    return wFinals[syllable]
  }

  const initial = Object.keys(initials)
    .sort((a, b) => b.length - a.length)
    .find((candidate) => syllable.startsWith(candidate))
  const final = initial ? syllable.slice(initial.length) : syllable

  if (!initial) {
    return finals[final]
  }

  if (['j', 'q', 'x'].includes(initial)) {
    if (final === 'u') return `${initials[initial]}ㄩ`
    if (final === 'uan') return `${initials[initial]}ㄩㄢ`
    if (final === 'ue') return `${initials[initial]}ㄩㄝ`
    if (final === 'un') return `${initials[initial]}ㄩㄣ`
  }

  return finals[final] ? `${initials[initial]}${finals[final]}` : undefined
}

const possibleSyllables = [
  ...Object.keys(specialSyllables),
  ...Object.keys(yFinals),
  ...Object.keys(wFinals),
  ...Object.keys(finals),
  ...Object.keys(initials).flatMap((initial) =>
    Object.keys(finals).map((final) => `${initial}${final}`)
  ),
  'jue',
  'juan',
  'jun',
  'qu',
  'que',
  'quan',
  'qun',
  'xu',
  'xue',
  'xuan',
  'xun'
]
  .filter((syllable) => convertBaseSyllable(syllable))
  .sort((a, b) => b.length - a.length)

const normalizePinyin = (chunk: string) => {
  let base = ''
  const tones: Record<number, string> = {}

  for (const character of chunk.toLowerCase()) {
    const marked = toneMarks[character]

    if (marked) {
      tones[base.length] = marked.tone
      base += marked.base
      continue
    }

    if (/[a-z]/.test(character)) {
      base += character
    }
  }

  return { base, tones }
}

const segmentPinyin = (base: string): string[] => {
  const memo = new Map<number, string[] | null>()

  const visit = (index: number): string[] | null => {
    if (index === base.length) return []
    if (memo.has(index)) return memo.get(index) ?? null

    let best: string[] | null = null

    for (const syllable of possibleSyllables) {
      if (!base.startsWith(syllable, index)) continue

      const rest = visit(index + syllable.length)

      if (!rest) continue

      const candidate = [syllable, ...rest]

      if (!best || candidate.length < best.length) {
        best = candidate
      }
    }

    memo.set(index, best)
    return best
  }

  return visit(0) ?? [base]
}

const pinyinToBopomofo = (pinyin: string) =>
  pinyin
    .split(/\s+/)
    .flatMap((chunk) => {
      const { base, tones } = normalizePinyin(chunk)
      let cursor = 0

      return segmentPinyin(base).map((syllable) => {
        const converted = convertBaseSyllable(syllable) ?? syllable
        const tone = Object.entries(tones).find(([position]) => {
          const numericPosition = Number(position)

          return numericPosition >= cursor && numericPosition < cursor + syllable.length
        })?.[1]

        cursor += syllable.length

        return `${converted}${tone ?? ''}`
      })
    })
    .join(' ')

const seedPeopleItems: SeedItem[] = [
  { id: 'ren', hanzi: '人', pinyin: 'rén', meaning: 'person', deckId: 'common' },
  { id: 'dajia', hanzi: '大家', pinyin: 'dàjiā', meaning: 'everyone', deckId: 'common' },
  { id: 'nanren', hanzi: '男人', pinyin: 'nánrén', meaning: 'man', deckId: 'common' },
  { id: 'nuren', hanzi: '女人', pinyin: 'nǚrén', meaning: 'woman', deckId: 'common' },
  { id: 'xiaohai', hanzi: '小孩', pinyin: 'xiǎohái', meaning: 'child', deckId: 'common' },
  { id: 'xuesheng', hanzi: '學生', pinyin: 'xuéshēng', meaning: 'student', deckId: 'common' },
  { id: 'laoshi', hanzi: '老師', pinyin: 'lǎoshī', meaning: 'teacher', deckId: 'common' },
  { id: 'pengyou', hanzi: '朋友', pinyin: 'péngyou', meaning: 'friend', deckId: 'common' },
  { id: 'baba', hanzi: '爸爸', pinyin: 'bàba', meaning: 'father', deckId: 'common' },
  { id: 'mama', hanzi: '媽媽', pinyin: 'māma', meaning: 'mother', deckId: 'common' },
  { id: 'xiansheng', hanzi: '先生', pinyin: 'xiānsheng', meaning: 'mister/husband', deckId: 'common' },
  { id: 'taitai', hanzi: '太太', pinyin: 'tàitai', meaning: 'wife/madam', deckId: 'common' },
  { id: 'yisheng', hanzi: '醫生', pinyin: 'yīshēng', meaning: 'doctor', deckId: 'common' },
  { id: 'laoban', hanzi: '老闆', pinyin: 'lǎobǎn', meaning: 'boss', deckId: 'common' },
  { id: 'tongxue', hanzi: '同學', pinyin: 'tóngxué', meaning: 'classmate', deckId: 'common' },
  { id: 'keren', hanzi: '客人', pinyin: 'kèrén', meaning: 'guest/customer', deckId: 'common' },
  { id: 'jiaren', hanzi: '家人', pinyin: 'jiārén', meaning: 'family member', deckId: 'common' },
  { id: 'gege', hanzi: '哥哥', pinyin: 'gēge', meaning: 'older brother', deckId: 'common' },
  { id: 'jiejie', hanzi: '姐姐', pinyin: 'jiějie', meaning: 'older sister', deckId: 'common' },
  { id: 'didi', hanzi: '弟弟', pinyin: 'dìdi', meaning: 'younger brother', deckId: 'common' },
  { id: 'meimei', hanzi: '妹妹', pinyin: 'mèimei', meaning: 'younger sister', deckId: 'common' },
  { id: 'erzi', hanzi: '兒子', pinyin: 'érzi', meaning: 'son', deckId: 'common' },
  { id: 'nuer', hanzi: '女兒', pinyin: 'nǚ’ér', meaning: 'daughter', deckId: 'common' },
  { id: 'tongshi', hanzi: '同事', pinyin: 'tóngshì', meaning: 'coworker', deckId: 'common' },
  { id: 'zhuren', hanzi: '主人', pinyin: 'zhǔrén', meaning: 'host/master', deckId: 'common' },

  { id: 'linju', hanzi: '鄰居', pinyin: 'línjū', meaning: 'neighbor', deckId: 'conversationally-solid' },
  { id: 'qinglu', hanzi: '情侶', pinyin: 'qínglǚ', meaning: 'couple', deckId: 'conversationally-solid' },
  { id: 'kehu', hanzi: '客戶', pinyin: 'kèhù', meaning: 'client/customer', deckId: 'conversationally-solid' },
  { id: 'dianyuan', hanzi: '店員', pinyin: 'diànyuán', meaning: 'shop employee', deckId: 'conversationally-solid' },
  { id: 'fuwuyuan', hanzi: '服務員', pinyin: 'fúwùyuán', meaning: 'server/staff', deckId: 'conversationally-solid' },
  { id: 'siji', hanzi: '司機', pinyin: 'sījī', meaning: 'driver', deckId: 'conversationally-solid' },
  { id: 'gongren', hanzi: '工人', pinyin: 'gōngrén', meaning: 'worker', deckId: 'conversationally-solid' },
  { id: 'gongchengshi', hanzi: '工程師', pinyin: 'gōngchéngshī', meaning: 'engineer', deckId: 'conversationally-solid' },
  { id: 'shejishi', hanzi: '設計師', pinyin: 'shèjìshī', meaning: 'designer', deckId: 'conversationally-solid' },
  { id: 'lushi', hanzi: '律師', pinyin: 'lǜshī', meaning: 'lawyer', deckId: 'conversationally-solid' },
  { id: 'jiaoshou', hanzi: '教授', pinyin: 'jiàoshòu', meaning: 'professor', deckId: 'conversationally-solid' },
  { id: 'xiaozhang', hanzi: '校長', pinyin: 'xiàozhǎng', meaning: 'principal', deckId: 'conversationally-solid' },
  { id: 'jingcha', hanzi: '警察', pinyin: 'jǐngchá', meaning: 'police officer', deckId: 'conversationally-solid' },
  { id: 'hushi', hanzi: '護士', pinyin: 'hùshì', meaning: 'nurse', deckId: 'conversationally-solid' },
  { id: 'bingren', hanzi: '病人', pinyin: 'bìngrén', meaning: 'patient', deckId: 'conversationally-solid' },
  { id: 'mishu', hanzi: '秘書', pinyin: 'mìshū', meaning: 'secretary', deckId: 'conversationally-solid' },
  { id: 'zhuren-supervisor', hanzi: '主任', pinyin: 'zhǔrèn', meaning: 'director/supervisor', deckId: 'conversationally-solid' },
  { id: 'jingli', hanzi: '經理', pinyin: 'jīnglǐ', meaning: 'manager', deckId: 'conversationally-solid' },
  { id: 'laoren', hanzi: '老人', pinyin: 'lǎorén', meaning: 'elderly person', deckId: 'conversationally-solid' },
  { id: 'nianqingren', hanzi: '年輕人', pinyin: 'niánqīngrén', meaning: 'young person', deckId: 'conversationally-solid' },
  { id: 'waiguoren', hanzi: '外國人', pinyin: 'wàiguórén', meaning: 'foreigner', deckId: 'conversationally-solid' },
  { id: 'taiwanren', hanzi: '台灣人', pinyin: 'Táiwān rén', meaning: 'Taiwanese person', deckId: 'conversationally-solid' },
  { id: 'wangyou', hanzi: '網友', pinyin: 'wǎngyǒu', meaning: 'internet friend', deckId: 'conversationally-solid' },
  { id: 'wanghong', hanzi: '網紅', pinyin: 'wǎnghóng', meaning: 'influencer', deckId: 'conversationally-solid' },
  { id: 'zhubo', hanzi: '主播', pinyin: 'zhǔbō', meaning: 'broadcaster/streamer', deckId: 'conversationally-solid' },
  { id: 'yanyuan', hanzi: '演員', pinyin: 'yǎnyuán', meaning: 'actor', deckId: 'conversationally-solid' },
  { id: 'geshou', hanzi: '歌手', pinyin: 'gēshǒu', meaning: 'singer', deckId: 'conversationally-solid' },
  { id: 'zuozhe', hanzi: '作者', pinyin: 'zuòzhě', meaning: 'author', deckId: 'conversationally-solid' },
  { id: 'jizhe', hanzi: '記者', pinyin: 'jìzhě', meaning: 'reporter', deckId: 'conversationally-solid' },
  { id: 'daoyan', hanzi: '導演', pinyin: 'dǎoyǎn', meaning: 'director', deckId: 'conversationally-solid' },
  { id: 'guanzhong', hanzi: '觀眾', pinyin: 'guānzhòng', meaning: 'audience member', deckId: 'conversationally-solid' },
  { id: 'chengke', hanzi: '乘客', pinyin: 'chéngkè', meaning: 'passenger', deckId: 'conversationally-solid' },
  { id: 'fangdong', hanzi: '房東', pinyin: 'fángdōng', meaning: 'landlord', deckId: 'conversationally-solid' },
  { id: 'fangke', hanzi: '房客', pinyin: 'fángkè', meaning: 'tenant', deckId: 'conversationally-solid' },
  { id: 'wangzhan-guanliyuan', hanzi: '網站管理員', pinyin: 'wǎngzhàn guǎnlǐyuán', meaning: 'website administrator', deckId: 'conversationally-solid' },
  { id: 'kaifazhe', hanzi: '開發者', pinyin: 'kāifāzhě', meaning: 'developer', deckId: 'conversationally-solid' },
  { id: 'shiyongzhe', hanzi: '使用者', pinyin: 'shǐyòngzhě', meaning: 'user', deckId: 'conversationally-solid' },
  { id: 'chuangzuozhe', hanzi: '創作者', pinyin: 'chuàngzuòzhě', meaning: 'creator', deckId: 'conversationally-solid' },
  { id: 'liuxuesheng', hanzi: '留學生', pinyin: 'liúxuéshēng', meaning: 'international student', deckId: 'conversationally-solid' },
  { id: 'daoshi', hanzi: '導師', pinyin: 'dǎoshī', meaning: 'mentor/tutor', deckId: 'conversationally-solid' },
  { id: 'zhuguan', hanzi: '主管', pinyin: 'zhǔguǎn', meaning: 'supervisor', deckId: 'conversationally-solid' },
  { id: 'mianshiguan', hanzi: '面試官', pinyin: 'miànshìguān', meaning: 'interviewer', deckId: 'conversationally-solid' },
  { id: 'yingzhengzhe', hanzi: '應徵者', pinyin: 'yìngzhēngzhě', meaning: 'applicant', deckId: 'conversationally-solid' },
  { id: 'wanglu-shiyongzhe', hanzi: '網路使用者', pinyin: 'wǎnglù shǐyòngzhě', meaning: 'internet user', deckId: 'conversationally-solid' },
  { id: 'xiaofeizhe', hanzi: '消費者', pinyin: 'xiāofèizhě', meaning: 'consumer', deckId: 'conversationally-solid' },
  { id: 'canjiazhe', hanzi: '參加者', pinyin: 'cānjiāzhě', meaning: 'participant', deckId: 'conversationally-solid' },
  { id: 'zhigong', hanzi: '志工', pinyin: 'zhìgōng', meaning: 'volunteer', deckId: 'conversationally-solid' },
  { id: 'huiyuan', hanzi: '會員', pinyin: 'huìyuán', meaning: 'member', deckId: 'conversationally-solid' },
  { id: 'guke', hanzi: '顧客', pinyin: 'gùkè', meaning: 'customer', deckId: 'conversationally-solid' },
  { id: 'zhuanjia', hanzi: '專家', pinyin: 'zhuānjiā', meaning: 'expert', deckId: 'conversationally-solid' },

  { id: 'qiyejia', hanzi: '企業家', pinyin: 'qǐyèjiā', meaning: 'entrepreneur', deckId: 'very-comfortable' },
  { id: 'touziren', hanzi: '投資人', pinyin: 'tóuzīrén', meaning: 'investor', deckId: 'very-comfortable' },
  { id: 'chuangyezhe', hanzi: '創業者', pinyin: 'chuàngyèzhě', meaning: 'founder/startup creator', deckId: 'very-comfortable' },
  { id: 'yanjiuyuan', hanzi: '研究員', pinyin: 'yánjiūyuán', meaning: 'researcher', deckId: 'very-comfortable' },
  { id: 'xuezhe', hanzi: '學者', pinyin: 'xuézhě', meaning: 'scholar', deckId: 'very-comfortable' },
  { id: 'zhexuejia', hanzi: '哲學家', pinyin: 'zhéxuéjiā', meaning: 'philosopher', deckId: 'very-comfortable' },
  { id: 'lishixuejia', hanzi: '歷史學家', pinyin: 'lìshǐxuéjiā', meaning: 'historian', deckId: 'very-comfortable' },
  { id: 'kexuejia', hanzi: '科學家', pinyin: 'kēxuéjiā', meaning: 'scientist', deckId: 'very-comfortable' },
  { id: 'yishujia', hanzi: '藝術家', pinyin: 'yìshùjiā', meaning: 'artist', deckId: 'very-comfortable' },
  { id: 'yinyuejia', hanzi: '音樂家', pinyin: 'yīnyuèjiā', meaning: 'musician', deckId: 'very-comfortable' },
  { id: 'zuoqujia', hanzi: '作曲家', pinyin: 'zuòqǔjiā', meaning: 'composer', deckId: 'very-comfortable' },
  { id: 'chengxu-shejishi', hanzi: '程式設計師', pinyin: 'chéngxù shèjìshī', meaning: 'programmer', deckId: 'very-comfortable' },
  { id: 'xitong-guanliyuan', hanzi: '系統管理員', pinyin: 'xìtǒng guǎnlǐyuán', meaning: 'systems administrator', deckId: 'very-comfortable' },
  { id: 'fenxishi', hanzi: '分析師', pinyin: 'fēnxīshī', meaning: 'analyst', deckId: 'very-comfortable' },
  { id: 'guwen', hanzi: '顧問', pinyin: 'gùwèn', meaning: 'consultant', deckId: 'very-comfortable' },
  { id: 'pinglunjia', hanzi: '評論家', pinyin: 'pínglùnjiā', meaning: 'critic/commentator', deckId: 'very-comfortable' },
  { id: 'zhuchiren', hanzi: '主持人', pinyin: 'zhǔchírén', meaning: 'host/presenter', deckId: 'very-comfortable' },
  { id: 'zhizuoren', hanzi: '製作人', pinyin: 'zhìzuòrén', meaning: 'producer', deckId: 'very-comfortable' },
  { id: 'bianji', hanzi: '編輯', pinyin: 'biānjí', meaning: 'editor', deckId: 'very-comfortable' },
  { id: 'fanyi', hanzi: '翻譯', pinyin: 'fānyì', meaning: 'translator', deckId: 'very-comfortable' },
  { id: 'dailiren', hanzi: '代理人', pinyin: 'dàilǐrén', meaning: 'agent/representative', deckId: 'very-comfortable' },
  { id: 'houxuanren', hanzi: '候選人', pinyin: 'hòuxuǎnrén', meaning: 'candidate', deckId: 'very-comfortable' },
  { id: 'guanyuan', hanzi: '官員', pinyin: 'guānyuán', meaning: 'official', deckId: 'very-comfortable' },
  { id: 'waijiaoguan', hanzi: '外交官', pinyin: 'wàijiāoguān', meaning: 'diplomat', deckId: 'very-comfortable' },
  { id: 'yimin', hanzi: '移民', pinyin: 'yímín', meaning: 'immigrant', deckId: 'very-comfortable' },
  { id: 'nanmin', hanzi: '難民', pinyin: 'nànmín', meaning: 'refugee', deckId: 'very-comfortable' },
  { id: 'luke', hanzi: '旅客', pinyin: 'lǚkè', meaning: 'traveler', deckId: 'very-comfortable' },
  { id: 'guanguangke', hanzi: '觀光客', pinyin: 'guānguāngkè', meaning: 'tourist', deckId: 'very-comfortable' },
  { id: 'guanlizhe', hanzi: '管理者', pinyin: 'guǎnlǐzhě', meaning: 'administrator', deckId: 'very-comfortable' },
  { id: 'lingdaozhe', hanzi: '領導者', pinyin: 'lǐngdǎozhě', meaning: 'leader', deckId: 'very-comfortable' },
  { id: 'zhichizhe', hanzi: '支持者', pinyin: 'zhīchízhě', meaning: 'supporter', deckId: 'very-comfortable' },
  { id: 'fanduizhe', hanzi: '反對者', pinyin: 'fǎnduìzhě', meaning: 'opponent', deckId: 'very-comfortable' },
  { id: 'shengchanzhe', hanzi: '生產者', pinyin: 'shēngchǎnzhě', meaning: 'producer', deckId: 'very-comfortable' },
  { id: 'laogong', hanzi: '勞工', pinyin: 'láogōng', meaning: 'laborer', deckId: 'very-comfortable' },
  { id: 'gongwuyuan', hanzi: '公務員', pinyin: 'gōngwùyuán', meaning: 'civil servant', deckId: 'very-comfortable' },
  { id: 'jishu-renyuan', hanzi: '技術人員', pinyin: 'jìshùrényuán', meaning: 'technical staff', deckId: 'very-comfortable' },
  { id: 'ux-shejishi', hanzi: '使用者體驗設計師', pinyin: 'shǐyòngzhě tǐyàn shèjìshī', meaning: 'UX designer', deckId: 'very-comfortable' },
  { id: 'ruanti-gongchengshi', hanzi: '軟體工程師', pinyin: 'ruǎntǐ gōngchéngshī', meaning: 'software engineer', deckId: 'very-comfortable' },
  { id: 'ziliao-fenxishi', hanzi: '資料分析師', pinyin: 'zīliào fēnxīshī', meaning: 'data analyst', deckId: 'very-comfortable' },
  { id: 'shequn-guanliyuan', hanzi: '社群管理員', pinyin: 'shèqún guǎnlǐyuán', meaning: 'community manager', deckId: 'very-comfortable' },
  { id: 'zhibozhu', hanzi: '直播主', pinyin: 'zhíbōzhǔ', meaning: 'livestream host', deckId: 'very-comfortable' },
  { id: 'neirong-chuangzuozhe', hanzi: '內容創作者', pinyin: 'nèiróng chuàngzuòzhě', meaning: 'content creator', deckId: 'very-comfortable' },
  { id: 'ziyou-gongzuozhe', hanzi: '自由工作者', pinyin: 'zìyóu gōngzuòzhě', meaning: 'freelancer', deckId: 'very-comfortable' },
  { id: 'mianshizhe', hanzi: '面試者', pinyin: 'miànshìzhě', meaning: 'interviewee', deckId: 'very-comfortable' },
  { id: 'hezuozhe', hanzi: '合作者', pinyin: 'hézuòzhě', meaning: 'collaborator', deckId: 'very-comfortable' },
  { id: 'shiyongzhe-yanjiuyuan', hanzi: '使用者研究員', pinyin: 'shǐyòngzhě yánjiūyuán', meaning: 'user researcher', deckId: 'very-comfortable' },
  { id: 'qiuzhizhe', hanzi: '求職者', pinyin: 'qiúzhízhě', meaning: 'job seeker', deckId: 'very-comfortable' },
  { id: 'zuke', hanzi: '租客', pinyin: 'zūkè', meaning: 'renter/tenant', deckId: 'very-comfortable' }
]

const peopleMeaningsEs: Record<string, string> = {
  ren: 'persona',
  dajia: 'todos',
  nanren: 'hombre',
  nuren: 'mujer',
  xiaohai: 'niño; niña',
  xuesheng: 'estudiante',
  laoshi: 'maestro; profesor',
  pengyou: 'amigo; amiga',
  baba: 'papá',
  mama: 'mamá',
  xiansheng: 'señor; esposo',
  taitai: 'esposa; señora',
  yisheng: 'médico; doctora',
  laoban: 'jefe; dueño',
  tongxue: 'compañero de clase',
  keren: 'invitado; cliente',
  jiaren: 'familiar',
  gege: 'hermano mayor',
  jiejie: 'hermana mayor',
  didi: 'hermano menor',
  meimei: 'hermana menor',
  erzi: 'hijo',
  nuer: 'hija',
  tongshi: 'compañero de trabajo',
  zhuren: 'anfitrión; dueño',
  linju: 'vecino; vecina',
  qinglu: 'pareja',
  kehu: 'cliente',
  dianyuan: 'empleado de tienda',
  fuwuyuan: 'mesero; personal de servicio',
  siji: 'conductor',
  gongren: 'trabajador',
  gongchengshi: 'ingeniero',
  shejishi: 'diseñador',
  lushi: 'abogado',
  jiaoshou: 'profesor universitario',
  xiaozhang: 'director de escuela',
  jingcha: 'policía',
  hushi: 'enfermero; enfermera',
  bingren: 'paciente',
  mishu: 'secretario; secretaria',
  'zhuren-supervisor': 'director; supervisor',
  jingli: 'gerente',
  laoren: 'persona mayor',
  nianqingren: 'joven',
  waiguoren: 'extranjero',
  taiwanren: 'persona taiwanesa',
  wangyou: 'amigo de internet',
  wanghong: 'influencer',
  zhubo: 'presentador; streamer',
  yanyuan: 'actor; actriz',
  geshou: 'cantante',
  zuozhe: 'autor',
  jizhe: 'reportero; periodista',
  daoyan: 'director',
  guanzhong: 'miembro del público',
  chengke: 'pasajero',
  fangdong: 'arrendador',
  fangke: 'inquilino',
  'wangzhan-guanliyuan': 'administrador de sitio web',
  kaifazhe: 'desarrollador',
  shiyongzhe: 'usuario',
  chuangzuozhe: 'creador',
  liuxuesheng: 'estudiante internacional',
  daoshi: 'mentor; tutor',
  zhuguan: 'supervisor',
  mianshiguan: 'entrevistador',
  yingzhengzhe: 'postulante',
  'wanglu-shiyongzhe': 'usuario de internet',
  xiaofeizhe: 'consumidor',
  canjiazhe: 'participante',
  zhigong: 'voluntario',
  huiyuan: 'miembro',
  guke: 'cliente',
  zhuanjia: 'experto',
  qiyejia: 'empresario',
  touziren: 'inversionista',
  chuangyezhe: 'emprendedor; fundador',
  yanjiuyuan: 'investigador',
  xuezhe: 'académico',
  zhexuejia: 'filósofo',
  lishixuejia: 'historiador',
  kexuejia: 'científico',
  yishujia: 'artista',
  yinyuejia: 'músico',
  zuoqujia: 'compositor',
  'chengxu-shejishi': 'programador',
  'xitong-guanliyuan': 'administrador de sistemas',
  fenxishi: 'analista',
  guwen: 'consultor',
  pinglunjia: 'crítico; comentarista',
  zhuchiren: 'presentador',
  zhizuoren: 'productor',
  bianji: 'editor',
  fanyi: 'traductor',
  dailiren: 'agente; representante',
  houxuanren: 'candidato',
  guanyuan: 'funcionario',
  waijiaoguan: 'diplomático',
  yimin: 'inmigrante',
  nanmin: 'refugiado',
  luke: 'viajero',
  guanguangke: 'turista',
  guanlizhe: 'administrador',
  lingdaozhe: 'líder',
  zhichizhe: 'partidario',
  fanduizhe: 'opositor',
  shengchanzhe: 'productor',
  laogong: 'obrero',
  gongwuyuan: 'funcionario público',
  'jishu-renyuan': 'personal técnico',
  'ux-shejishi': 'diseñador de experiencia de usuario',
  'ruanti-gongchengshi': 'ingeniero de software',
  'ziliao-fenxishi': 'analista de datos',
  'shequn-guanliyuan': 'administrador de comunidad',
  zhibozhu: 'presentador de transmisión en vivo',
  'neirong-chuangzuozhe': 'creador de contenido',
  'ziyou-gongzuozhe': 'trabajador independiente',
  mianshizhe: 'entrevistado',
  hezuozhe: 'colaborador',
  'shiyongzhe-yanjiuyuan': 'investigador de usuarios',
  qiuzhizhe: 'persona que busca empleo',
  zuke: 'arrendatario; inquilino'
}

const mergeSeedItems = () => {
  const byHanzi = new Map<string, VocabularyItem>()

  seedPeopleItems.forEach((item) => {
    const existing = byHanzi.get(item.hanzi)

    if (existing) {
      existing.deckIds = [...new Set([...existing.deckIds, item.deckId])]
      return
    }

    byHanzi.set(item.hanzi, {
      id: item.id,
      hanzi: item.hanzi,
      pinyin: item.pinyin,
      bopomofo: item.bopomofo ?? pinyinToBopomofo(item.pinyin),
      meaning: item.meaning,
      meaningTranslations: {
        en: item.meaning,
        'es-419': peopleMeaningsEs[item.id] ?? item.meaning
      },
      category: 'people',
      deckIds: [item.deckId]
    })
  })

  return [...byHanzi.values()]
}

export const peopleVocabulary = mergeSeedItems()

export const getVocabularyMeaning = (
  item: VocabularyItem,
  locale: AppLocale
) => item.meaningTranslations?.[locale] ?? item.meaning

export const peopleVocabularyDecks: VocabularyDeck[] = [
  {
    id: 'common',
    hanzi: '常用',
    label: 'Common',
    itemIds: peopleVocabulary
      .filter((item) => item.deckIds.includes('common'))
      .map((item) => item.id)
  },
  {
    id: 'conversationally-solid',
    hanzi: '會話',
    label: 'Conversationally Solid',
    itemIds: peopleVocabulary
      .filter((item) => item.deckIds.includes('conversationally-solid'))
      .map((item) => item.id)
  },
  {
    id: 'very-comfortable',
    hanzi: '熟練',
    label: 'Very Comfortable',
    itemIds: peopleVocabulary
      .filter((item) => item.deckIds.includes('very-comfortable'))
      .map((item) => item.id)
  },
  {
    id: 'all',
    hanzi: '全部',
    label: 'All People Nouns',
    itemIds: peopleVocabulary.map((item) => item.id)
  }
]

export const getPeopleVocabularyForDeck = (deckId: VocabularyDeckId) => {
  if (deckId === 'all') {
    return peopleVocabulary
  }

  return peopleVocabulary.filter((item) => item.deckIds.includes(deckId))
}

