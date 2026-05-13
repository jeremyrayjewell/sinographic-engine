import type { ClassifierDeck } from '../../packages/shared-types/src'

const dedupe = (entries: string[]) => [...new Set(entries)]

const survivalHanzi = dedupe([
  '個',
  '位',
  '本',
  '張',
  '台',
  '間',
  '家',
  '條',
  '件',
  '杯',
  '碗',
  '份',
  '塊',
  '支',
  '把',
  '次',
  '天',
  '年',
  '堂',
  '場'
])

const conversationalHanzi = dedupe([
  '部',
  '輛',
  '雙',
  '隻',
  '顆',
  '粒',
  '口',
  '封',
  '片',
  '套',
  '盒',
  '瓶',
  '罐',
  '盤',
  '棵',
  '座',
  '層',
  '戶',
  '名',
  '班',
  '節',
  '門',
  '種',
  '行',
  '篇',
  '首',
  '支',
  '句',
  '頁',
  '頭'
])

const comfortableHanzi = dedupe([
  '冊',
  '匹',
  '艘',
  '架',
  '尊',
  '幅',
  '則',
  '滴',
  '筆',
  '樓',
  '排',
  '列',
  '串',
  '團',
  '群',
  '叢',
  '疊',
  '疋',
  '筒',
  '管',
  '根',
  '莖',
  '面',
  '頂',
  '盞',
  '縷',
  '番',
  '回',
  '遍',
  '頓',
  '陣',
  '波',
  '股',
  '樣',
  '款',
  '型',
  '樁',
  '批',
  '發',
  '匙',
  '撮',
  '尾',
  '尊',
  '份',
  '管',
  '條',
  '支',
  '件',
  '種',
  '堆'
])

const allClassifierHanzi = dedupe([
  ...survivalHanzi,
  ...conversationalHanzi,
  ...comfortableHanzi
])

export const classifierDecks = [
  {
    id: 'survival',
    name: 'Common',
    description: 'High-frequency classifiers for immediate daily function.',
    classifierHanzi: survivalHanzi,
    plannedCount: survivalHanzi.length
  },
  {
    id: 'conversationally-solid',
    name: 'Conversationally Solid',
    description: 'A broader spoken inventory for ordinary conversational range.',
    classifierHanzi: conversationalHanzi,
    plannedCount: conversationalHanzi.length
  },
  {
    id: 'very-comfortable',
    name: 'Very Comfortable',
    description: 'A larger literary and nuanced working set for confident usage.',
    classifierHanzi: comfortableHanzi,
    plannedCount: comfortableHanzi.length
  },
  {
    id: 'all-classifiers',
    name: 'All Classifiers',
    description: 'Combined deck spanning the full classifier roadmap.',
    classifierHanzi: allClassifierHanzi,
    plannedCount: allClassifierHanzi.length
  }
] satisfies ClassifierDeck[]

export default classifierDecks
