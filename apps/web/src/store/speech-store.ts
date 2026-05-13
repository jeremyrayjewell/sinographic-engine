import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SpeechSettingsStore {
  preferredVoiceName: string | null
  rate: number
  pitch: number
  volume: number
  autoplayEnabled: boolean
  setPreferredVoiceName: (voiceName: string | null) => void
  setRate: (rate: number) => void
  setPitch: (pitch: number) => void
  setVolume: (volume: number) => void
  setAutoplayEnabled: (enabled: boolean) => void
}

export const useSpeechStore = create<SpeechSettingsStore>()(
  persist(
    (set) => ({
      preferredVoiceName: null,
      rate: 0.9,
      pitch: 1,
      volume: 1,
      autoplayEnabled: false,
      setPreferredVoiceName: (preferredVoiceName) => set({ preferredVoiceName }),
      setRate: (rate) => set({ rate }),
      setPitch: (pitch) => set({ pitch }),
      setVolume: (volume) => set({ volume }),
      setAutoplayEnabled: (autoplayEnabled) => set({ autoplayEnabled })
    }),
    {
      name: 'sinographic-engine-speech-settings',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
