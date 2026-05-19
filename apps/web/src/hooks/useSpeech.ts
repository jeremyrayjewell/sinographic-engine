import { useCallback, useEffect, useMemo, useState } from 'react'
import type {
  SpeakOptions
} from '@sinographic-engine/speech-engine'
import {
  getPreferredTaiwanVoice,
  isBrowserSpeechSupported,
  pause as pauseSpeech,
  preloadVoices,
  resume as resumeSpeech,
  speak as speakWithEngine,
  stop as stopSpeech
} from '@sinographic-engine/speech-engine'
import { useSpeechStore } from '@/store/speech-store'

export const useSpeech = () => {
  const preferredVoiceName = useSpeechStore((state) => state.preferredVoiceName)
  const rate = useSpeechStore((state) => state.rate)
  const pitch = useSpeechStore((state) => state.pitch)
  const volume = useSpeechStore((state) => state.volume)
  const autoplayEnabled = useSpeechStore((state) => state.autoplayEnabled)
  const setPreferredVoiceName = useSpeechStore(
    (state) => state.setPreferredVoiceName
  )
  const setRate = useSpeechStore((state) => state.setRate)
  const setPitch = useSpeechStore((state) => state.setPitch)
  const setVolume = useSpeechStore((state) => state.setVolume)
  const setAutoplayEnabled = useSpeechStore((state) => state.setAutoplayEnabled)

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [preferredTaiwanVoice, setPreferredTaiwanVoice] =
    useState<SpeechSynthesisVoice | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    let active = true

    const loadVoices = async () => {
      const availableVoices = await preloadVoices()
      const preferredVoice = await getPreferredTaiwanVoice()

      if (!active) {
        return
      }

      setVoices(availableVoices)
      setPreferredTaiwanVoice(preferredVoice)
    }

    loadVoices()

    return () => {
      active = false
    }
  }, [])

  const resolvedVoice = useMemo(() => {
    if (preferredVoiceName) {
      return voices.find((voice) => voice.name === preferredVoiceName) ?? null
    }

    return preferredTaiwanVoice
  }, [preferredTaiwanVoice, preferredVoiceName, voices])

  const speak = useCallback(async (text: string, options: SpeakOptions = {}) => {
    setIsSpeaking(true)

    try {
      await speakWithEngine(text, {
        lang: 'zh-TW',
        rate,
        pitch,
        volume,
        voiceName: resolvedVoice?.name ?? undefined,
        ...options
      })
    } catch (error) {
      console.warn('[speech] Playback failed.', error)
    } finally {
      setIsSpeaking(false)
    }
  }, [pitch, rate, resolvedVoice?.name, volume])

  const stop = useCallback(() => {
    stopSpeech()
    setIsSpeaking(false)
  }, [])

  return {
    speak,
    stop,
    pause: pauseSpeech,
    resume: resumeSpeech,
    voices,
    preferredTaiwanVoice,
    preferredVoiceName,
    selectedVoice: resolvedVoice,
    rate,
    pitch,
    volume,
    autoplayEnabled,
    setPreferredVoiceName,
    setRate,
    setPitch,
    setVolume,
    setAutoplayEnabled,
    supported: isBrowserSpeechSupported(),
    isSpeaking
  }
}
