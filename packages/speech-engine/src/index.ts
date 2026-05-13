export interface SpeakOptions {
  lang?: string
  rate?: number
  pitch?: number
  volume?: number
  voiceName?: string
}

export interface SpeechEngine {
  speak(text: string, options?: SpeakOptions): Promise<void>
  stop(): void
  pause(): void
  resume(): void
  getVoices(): Promise<SpeechSynthesisVoice[]>
  getPreferredTaiwanVoice(): Promise<SpeechSynthesisVoice | null>
}

const DEFAULT_OPTIONS: Required<Omit<SpeakOptions, 'voiceName'>> = {
  lang: 'zh-TW',
  rate: 0.9,
  pitch: 1,
  volume: 1
}

const TAIWAN_VOICE_MARKERS = [
  'taiwan',
  '臺灣',
  '台灣',
  '國語',
  'zh-tw',
  'hsiaochen',
  'hsiaoyu'
]

const CHINESE_VOICE_MARKERS = ['zh', 'cmn', 'chinese', 'mandarin', '國語', '中文']

const isBrowserSpeechSupported = () =>
  typeof window !== 'undefined' &&
  'speechSynthesis' in window &&
  'SpeechSynthesisUtterance' in window

const normalize = (value: string) => value.trim().toLowerCase()

const includesMarker = (target: string, markers: string[]) => {
  const normalizedTarget = normalize(target)
  return markers.some((marker) => normalizedTarget.includes(normalize(marker)))
}

const isTaiwanVoice = (voice: SpeechSynthesisVoice) =>
  includesMarker(voice.name, TAIWAN_VOICE_MARKERS) ||
  includesMarker(voice.lang, TAIWAN_VOICE_MARKERS)

const isChineseVoice = (voice: SpeechSynthesisVoice) =>
  includesMarker(voice.name, CHINESE_VOICE_MARKERS) ||
  includesMarker(voice.lang, CHINESE_VOICE_MARKERS)

const scoreVoice = (voice: SpeechSynthesisVoice) => {
  let score = 0

  if (isTaiwanVoice(voice)) {
    score += 100
  }

  if (normalize(voice.lang) === 'zh-tw') {
    score += 80
  }

  if (includesMarker(voice.name, ['hsiaochen'])) {
    score += 60
  }

  if (includesMarker(voice.name, ['hsiaoyu'])) {
    score += 50
  }

  if (includesMarker(voice.name, ['google 國語（台灣）', 'google 國語（臺灣）'])) {
    score += 40
  }

  if (isChineseVoice(voice)) {
    score += 20
  }

  if (voice.localService) {
    score += 5
  }

  if (voice.default) {
    score += 2
  }

  return score
}

class BrowserSpeechEngine implements SpeechEngine {
  private currentUtterance: SpeechSynthesisUtterance | null = null

  private async waitForVoices(): Promise<SpeechSynthesisVoice[]> {
    if (!isBrowserSpeechSupported()) {
      return []
    }

    const synth = window.speechSynthesis
    const immediateVoices = synth.getVoices()

    if (immediateVoices.length > 0) {
      return immediateVoices
    }

    return new Promise((resolve) => {
      let settled = false

      const settle = (voices: SpeechSynthesisVoice[]) => {
        if (settled) {
          return
        }

        settled = true
        cleanup()
        resolve(voices)
      }

      const handleVoiceChange = () => {
        const voices = synth.getVoices()

        if (voices.length > 0) {
          settle(voices)
        }
      }

      const pollInterval = window.setInterval(() => {
        const voices = synth.getVoices()

        if (voices.length > 0) {
          settle(voices)
        }
      }, 150)

      const timeout = window.setTimeout(() => {
        settle(synth.getVoices())
      }, 2000)

      const cleanup = () => {
        synth.removeEventListener('voiceschanged', handleVoiceChange)
        window.clearInterval(pollInterval)
        window.clearTimeout(timeout)
      }

      synth.addEventListener('voiceschanged', handleVoiceChange)
      handleVoiceChange()
    })
  }

  async getVoices(): Promise<SpeechSynthesisVoice[]> {
    return this.waitForVoices()
  }

  async getPreferredTaiwanVoice(): Promise<SpeechSynthesisVoice | null> {
    const voices = await this.getVoices()

    if (voices.length === 0) {
      return null
    }

    const taiwanVoices = voices.filter((voice) => isTaiwanVoice(voice))

    if (taiwanVoices.length > 0) {
      return taiwanVoices.sort((left, right) => scoreVoice(right) - scoreVoice(left))[0]
    }

    const zhTwVoices = voices.filter(
      (voice) => normalize(voice.lang) === 'zh-tw'
    )

    if (zhTwVoices.length > 0) {
      return zhTwVoices.sort((left, right) => scoreVoice(right) - scoreVoice(left))[0]
    }

    const chineseVoices = voices.filter((voice) => isChineseVoice(voice))

    if (chineseVoices.length > 0) {
      return chineseVoices.sort((left, right) => scoreVoice(right) - scoreVoice(left))[0]
    }

    return voices[0] ?? null
  }

  stop() {
    if (!isBrowserSpeechSupported()) {
      return
    }

    window.speechSynthesis.cancel()
    this.currentUtterance = null
  }

  pause() {
    if (!isBrowserSpeechSupported()) {
      return
    }

    window.speechSynthesis.pause()
  }

  resume() {
    if (!isBrowserSpeechSupported()) {
      return
    }

    window.speechSynthesis.resume()
  }

  async speak(text: string, options: SpeakOptions = {}): Promise<void> {
    if (!isBrowserSpeechSupported() || text.trim().length === 0) {
      return
    }

    const synth = window.speechSynthesis
    const voices = await this.getVoices()

    let selectedVoice: SpeechSynthesisVoice | null =
      options.voiceName !== undefined
        ? voices.find((voice) => voice.name === options.voiceName) ?? null
        : null

    if (!selectedVoice) {
      selectedVoice = await this.getPreferredTaiwanVoice()
    }

    this.stop()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = selectedVoice?.lang ?? options.lang ?? DEFAULT_OPTIONS.lang
    utterance.rate = options.rate ?? DEFAULT_OPTIONS.rate
    utterance.pitch = options.pitch ?? DEFAULT_OPTIONS.pitch
    utterance.volume = options.volume ?? DEFAULT_OPTIONS.volume
    utterance.voice = selectedVoice

    this.currentUtterance = utterance

    return new Promise((resolve, reject) => {
      utterance.onend = () => {
        if (this.currentUtterance === utterance) {
          this.currentUtterance = null
        }

        resolve()
      }

      utterance.onerror = (event) => {
        if (this.currentUtterance === utterance) {
          this.currentUtterance = null
        }

        reject(new Error(event.error || 'Speech synthesis failed.'))
      }

      synth.speak(utterance)
    })
  }
}

const defaultSpeechEngine = new BrowserSpeechEngine()

export const speak = (text: string, options?: SpeakOptions) =>
  defaultSpeechEngine.speak(text, options)

export const stop = () => defaultSpeechEngine.stop()

export const pause = () => defaultSpeechEngine.pause()

export const resume = () => defaultSpeechEngine.resume()

export const getVoices = () => defaultSpeechEngine.getVoices()

export const getPreferredTaiwanVoice = () =>
  defaultSpeechEngine.getPreferredTaiwanVoice()

export const createBrowserSpeechEngine = () => new BrowserSpeechEngine()

export { isBrowserSpeechSupported }
