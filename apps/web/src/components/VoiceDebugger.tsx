import { useSpeech } from '@/hooks/useSpeech'
import { SpeakButton } from '@/components/SpeakButton'

const formatBoolean = (value: boolean) => (value ? 'yes' : 'no')

export const VoiceDebugger = () => {
  const {
    voices,
    supported,
    preferredVoiceName,
    setPreferredVoiceName,
    speak,
    stop,
    rate,
    pitch,
    volume,
    autoplayEnabled,
    setRate,
    setPitch,
    setVolume,
    setAutoplayEnabled
  } = useSpeech()

  if (!supported) {
    return (
      <div className="border border-[#30455f] bg-[#f7eedf] p-4 text-sm text-[#3e352c]">
        Speech synthesis is not supported in this browser.
      </div>
    )
  }

  return (
    <div className="space-y-4 border border-[#30455f] bg-[#f7eedf] p-4">
      <div className="flex flex-wrap items-center gap-3">
        <p className="inline-flex border border-[#1f2f44] bg-[#1f2f44] px-2 py-1 text-sm font-semibold tracking-[0.04em] text-[#f7eedf]">
          語音
        </p>
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#5b6f84]">
          Voice Debugger
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-[#3e352c]">
          Preferred voice
          <select
            value={preferredVoiceName ?? ''}
            onChange={(event) =>
              setPreferredVoiceName(event.target.value || null)
            }
            className="mt-2 w-full border border-[#30455f] bg-[#f7eedf] px-3 py-2 text-sm text-[#241f1a]"
          >
            <option value="">Automatic Taiwan preference</option>
            {voices.map((voice) => (
              <option key={`${voice.name}-${voice.lang}`} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-3 pt-7 text-sm text-[#3e352c]">
          <input
            type="checkbox"
            checked={autoplayEnabled}
            onChange={(event) => setAutoplayEnabled(event.target.checked)}
          />
          Autoplay quiz prompts
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-sm text-[#3e352c]">
          Rate {rate.toFixed(2)}
          <input
            type="range"
            min="0.5"
            max="1.3"
            step="0.05"
            value={rate}
            onChange={(event) => setRate(Number(event.target.value))}
            className="mt-2 w-full"
          />
        </label>
        <label className="text-sm text-[#3e352c]">
          Pitch {pitch.toFixed(2)}
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.05"
            value={pitch}
            onChange={(event) => setPitch(Number(event.target.value))}
            className="mt-2 w-full"
          />
        </label>
        <label className="text-sm text-[#3e352c]">
          Volume {volume.toFixed(2)}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="mt-2 w-full"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <SpeakButton
          label="Test"
          hanziLabel="讀"
          onClick={() => void speak('請用臺灣國語朗讀這句話。')}
        />
        <SpeakButton label="Stop" hanziLabel="停" onClick={stop} />
      </div>

      <div className="grid gap-px border border-[#30455f] bg-[#30455f]">
        {voices.map((voice) => (
          <div
            key={`${voice.name}-${voice.lang}`}
            className="grid gap-3 bg-[#f7eedf] px-3 py-3 md:grid-cols-[1.7fr_1fr_1fr_auto]"
          >
            <div className="text-sm text-[#241f1a]">
              <div className="font-medium">{voice.name}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#5b6f84]">
                {voice.lang}
              </div>
            </div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#5b6f84]">
              local: {formatBoolean(voice.localService)}
            </div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#5b6f84]">
              default: {formatBoolean(voice.default)}
            </div>
            <div className="flex flex-wrap gap-2">
              <SpeakButton
                label="Test"
                hanziLabel="讀"
                className="px-2 py-1"
                onClick={() =>
                  void speak('請用臺灣國語朗讀這句話。', {
                    voiceName: voice.name
                  })
                }
              />
              <button
                type="button"
                onClick={() => setPreferredVoiceName(voice.name)}
                className="inline-flex items-center justify-center border border-[#30455f] bg-[#f7eedf] px-2 py-1 text-[11px] uppercase tracking-[0.18em] text-[#24384f] transition hover:bg-[#24384f] hover:text-[#f5ead9]"
              >
                Use
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
