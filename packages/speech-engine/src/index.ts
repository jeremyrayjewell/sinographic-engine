export interface SpeakOptions {
  lang?: string
  rate?: number
  pitch?: number
  volume?: number
  voiceName?: string
}

export type SpeechDiagnosticType =
  | 'speech-start'
  | 'speech-end'
  | 'speech-error'
  | 'speech-cancelled'
  | 'missing-voice'
  | 'unsupported-browser'
  | 'voices-loaded'
  | 'voices-timeout'

export interface SpeechDiagnostic {
  type: SpeechDiagnosticType
  message: string
  error?: string
  voiceName?: string
  voiceLang?: string
}

export interface SpeechEngine {
  speak(text: string, options?: SpeakOptions): Promise<void>
  stop(): void
  pause(): void
  resume(): void
  preloadVoices(): Promise<SpeechSynthesisVoice[]>
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

const CHINESE_VOICE_MARKERS = [
  'zh',
  'cmn',
  'chinese',
  'mandarin',
  '國語',
  '中文'
]

const RECOVERABLE_SPEECH_ERRORS = new Set(['canceled', 'cancelled', 'interrupted'])

const diagnosticListeners = new Set<(diagnostic: SpeechDiagnostic) => void>()

export const subscribeSpeechDiagnostics = (
  listener: (diagnostic: SpeechDiagnostic) => void
) => {
  diagnosticListeners.add(listener)

  return () => {
    diagnosticListeners.delete(listener)
  }
}

const emitDiagnostic = (diagnostic: SpeechDiagnostic) => {
  diagnosticListeners.forEach((listener) => listener(diagnostic))

  if (diagnostic.type === 'speech-error' || diagnostic.type === 'unsupported-browser') {
    console.warn(`[speech-engine] ${diagnostic.message}`, diagnostic)
  }
}

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
  private cachedVoices: SpeechSynthesisVoice[] = []
  private cachedPreferredVoice: SpeechSynthesisVoice | null = null
  private preloadPromise: Promise<SpeechSynthesisVoice[]> | null = null

  // Cross-platform note:
  // iOS Safari and Chrome iOS can block playback if speechSynthesis.speak()
  // happens after awaited voice loading. Android Chrome is more forgiving, while
  // desktop Safari often loads voices late and may report cancelled utterances as
  // "interrupted". For reliability, speak() starts immediately with lang=zh-TW
  // and only applies a preferred voice when one is already cached.

  private updateVoiceCache(voices: SpeechSynthesisVoice[]) {
    this.cachedVoices = voices
    this.cachedPreferredVoice = this.selectPreferredVoice(voices)

    emitDiagnostic({
      type: voices.length > 0 ? 'voices-loaded' : 'voices-timeout',
      message:
        voices.length > 0
          ? `Loaded ${voices.length} speech voice(s).`
          : 'No speech voices were reported by the browser.',
      voiceName: this.cachedPreferredVoice?.name,
      voiceLang: this.cachedPreferredVoice?.lang
    })

    return voices
  }

  private selectPreferredVoice(voices: SpeechSynthesisVoice[]) {
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

    const regionalChineseVoices = voices.filter((voice) =>
      ['zh-hk', 'zh-cn'].includes(normalize(voice.lang))
    )

    if (regionalChineseVoices.length > 0) {
      return regionalChineseVoices.sort(
        (left, right) => scoreVoice(right) - scoreVoice(left)
      )[0]
    }

    const chineseVoices = voices.filter((voice) => isChineseVoice(voice))

    if (chineseVoices.length > 0) {
      return chineseVoices.sort((left, right) => scoreVoice(right) - scoreVoice(left))[0]
    }

    return voices[0] ?? null
  }

  private getCachedVoice(voiceName?: string) {
    if (voiceName !== undefined) {
      return this.cachedVoices.find((voice) => voice.name === voiceName) ?? null
    }

    return this.cachedPreferredVoice
  }

  private async waitForVoices(): Promise<SpeechSynthesisVoice[]> {
    if (!isBrowserSpeechSupported()) {
      emitDiagnostic({
        type: 'unsupported-browser',
        message: 'This browser does not support the Web Speech API.'
      })
      return []
    }

    const synth = window.speechSynthesis
    const immediateVoices = synth.getVoices()

    if (immediateVoices.length > 0) {
      return this.updateVoiceCache(immediateVoices)
    }

    return new Promise((resolve) => {
      let settled = false

      const cleanup = () => {
        synth.removeEventListener('voiceschanged', handleVoiceChange)
        window.clearInterval(pollInterval)
        window.clearTimeout(timeout)
      }

      const settle = (voices: SpeechSynthesisVoice[]) => {
        if (settled) {
          return
        }

        settled = true
        cleanup()
        resolve(this.updateVoiceCache(voices))
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

      synth.addEventListener('voiceschanged', handleVoiceChange)
      handleVoiceChange()
    })
  }

  async preloadVoices(): Promise<SpeechSynthesisVoice[]> {
    if (this.cachedVoices.length > 0) {
      return this.cachedVoices
    }

    if (!this.preloadPromise) {
      this.preloadPromise = this.waitForVoices().finally(() => {
        this.preloadPromise = null
      })
    }

    return this.preloadPromise
  }

  async getVoices(): Promise<SpeechSynthesisVoice[]> {
    return this.preloadVoices()
  }

  async getPreferredTaiwanVoice(): Promise<SpeechSynthesisVoice | null> {
    const voices = await this.preloadVoices()
    return this.selectPreferredVoice(voices)
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
      if (!isBrowserSpeechSupported()) {
        emitDiagnostic({
          type: 'unsupported-browser',
          message: 'Cannot speak because this browser does not support speech synthesis.'
        })
      }

      return
    }

    const synth = window.speechSynthesis
    const immediateVoices = synth.getVoices()

    if (immediateVoices.length > 0 && this.cachedVoices.length === 0) {
      this.updateVoiceCache(immediateVoices)
    } else {
      void this.preloadVoices()
    }

    const selectedVoice = this.getCachedVoice(options.voiceName)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = selectedVoice?.lang ?? options.lang ?? DEFAULT_OPTIONS.lang
    utterance.rate = options.rate ?? DEFAULT_OPTIONS.rate
    utterance.pitch = options.pitch ?? DEFAULT_OPTIONS.pitch
    utterance.volume = options.volume ?? DEFAULT_OPTIONS.volume
    utterance.voice = selectedVoice

    if (!selectedVoice) {
      emitDiagnostic({
        type: 'missing-voice',
        message:
          'Speaking with lang=zh-TW because no cached Chinese/Taiwan voice is available yet.'
      })
    }

    this.stop()
    this.currentUtterance = utterance

    return new Promise((resolve, reject) => {
      let settled = false

      const settle = (callback: () => void) => {
        if (settled) {
          return
        }

        settled = true
        callback()
      }

      utterance.onstart = () => {
        emitDiagnostic({
          type: 'speech-start',
          message: 'Speech playback started.',
          voiceName: utterance.voice?.name,
          voiceLang: utterance.lang
        })
      }

      utterance.onend = () => {
        if (this.currentUtterance === utterance) {
          this.currentUtterance = null
        }

        emitDiagnostic({
          type: 'speech-end',
          message: 'Speech playback ended.',
          voiceName: utterance.voice?.name,
          voiceLang: utterance.lang
        })

        settle(resolve)
      }

      utterance.onerror = (event) => {
        if (this.currentUtterance === utterance) {
          this.currentUtterance = null
        }

        if (RECOVERABLE_SPEECH_ERRORS.has(event.error)) {
          emitDiagnostic({
            type: 'speech-cancelled',
            message: `Speech playback was ${event.error}.`,
            error: event.error,
            voiceName: utterance.voice?.name,
            voiceLang: utterance.lang
          })

          settle(resolve)
          return
        }

        const error = event.error || 'Speech synthesis failed.'

        emitDiagnostic({
          type: 'speech-error',
          message: 'Speech playback failed.',
          error,
          voiceName: utterance.voice?.name,
          voiceLang: utterance.lang
        })

        settle(() => reject(new Error(error)))
      }

      try {
        synth.speak(utterance)
      } catch (error) {
        emitDiagnostic({
          type: 'speech-error',
          message: 'speechSynthesis.speak() threw before playback could start.',
          error: error instanceof Error ? error.message : String(error)
        })

        settle(() => reject(error instanceof Error ? error : new Error(String(error))))
      }
    })
  }
}

const defaultSpeechEngine = new BrowserSpeechEngine()

export const speak = (text: string, options?: SpeakOptions) =>
  defaultSpeechEngine.speak(text, options)

export const stop = () => defaultSpeechEngine.stop()

export const pause = () => defaultSpeechEngine.pause()

export const resume = () => defaultSpeechEngine.resume()

export const preloadVoices = () => defaultSpeechEngine.preloadVoices()

export const getVoices = () => defaultSpeechEngine.getVoices()

export const getPreferredTaiwanVoice = () =>
  defaultSpeechEngine.getPreferredTaiwanVoice()

export const createBrowserSpeechEngine = () => new BrowserSpeechEngine()

export { isBrowserSpeechSupported }
