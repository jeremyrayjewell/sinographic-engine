# sinographic-engine

`sinographic-engine` is a modular monorepo for Traditional Chinese learning systems, starting with a Taiwan Mandarin classifier trainer. The repo is structured to keep pedagogy logic, content, and UI separate so future grammar, tone, semantic graph, corpus, and AI-assisted subsystems can plug in cleanly.

## Tech Stack

- TypeScript
- React
- Vite
- Tailwind CSS
- Zustand
- pnpm workspaces

## Structure

```txt
/apps
  /web

/content
  /classifiers
    index.ts
    ge.json
    wei.json
    ben.json
    ...

/packages
  /shared-types
  /learning-engine
  /classifier-content
  /speech-engine
  /ui
```

## Packages

- `@sinographic-engine/shared-types`: reusable domain types
- `@sinographic-engine/learning-engine`: pure quiz/session logic with no React dependency
- `@sinographic-engine/classifier-content`: typed runtime access layer for canonical repo-level classifier content
- `@sinographic-engine/speech-engine`: browser-native Taiwanese Mandarin speech synthesis abstraction built on the Web Speech API
- `@sinographic-engine/ui`: minimal shared UI primitives
- `@sinographic-engine/web`: the first local-first training app

## Development

```bash
corepack pnpm install
corepack pnpm dev
```

## Workspace Scripts

```bash
corepack pnpm dev
corepack pnpm build
corepack pnpm lint
```

## Architectural Notes

- `/content` is the human-authored learning data layer. It is where classifiers, grammar, dialogues, Taiwan corpora, semantic metadata, zhuyin, and future audio references should live.
- `/content/classifiers/*.json` are the canonical authored classifier entries, one classifier per file for maintainable manual editing.
- `/content/classifiers/index.ts` is the small typed aggregation layer for the classifier content pack.
- `@sinographic-engine/classifier-content` re-exports the canonical content layer and adds runtime validation plus a stable package API for future loaders, indexing, filtering, and search.
- `@sinographic-engine/learning-engine` stays framework-agnostic so pedagogy logic remains separate from React and can later support grammar drills, listening tasks, and semantic tools.
- `@sinographic-engine/speech-engine` stays separate from quiz and React logic so browser speech, Azure TTS, edge-tts, or future offline engines can be swapped without rewriting learner-facing components.
- The package boundaries leave room for future semantic visualization work, including a Three.js-based renderer, without entangling it with the quiz UI or content authoring layer.

## Speech Synthesis

The current speech system uses the browser-native Web Speech API through `window.speechSynthesis` and `SpeechSynthesisUtterance`. It is designed as an abstraction layer so the UI does not depend directly on browser TTS primitives.

- Default target language is `zh-TW`
- Default settings are `rate: 0.9`, `pitch: 1`, `volume: 1`
- Speech is generated in realtime in the browser
- No audio files are created or stored
- No backend, API keys, or third-party TTS services are required

### Voice Selection

The speech engine prefers Taiwanese Mandarin voices in this order of intent:

- voices whose name or language suggests Taiwan Mandarin
- voices containing markers such as `Taiwan`, `臺灣`, `國語`, `zh-TW`, `HsiaoChen`, or `HsiaoYu`
- any `zh-TW` voice
- any Chinese voice as a fallback

Suggested voices when available:

- `Microsoft HsiaoChen`
- `Microsoft HsiaoYu`
- `Google 國語（臺灣）`

### Browser Support Notes

Available voices vary significantly by:

- browser
- operating system
- installed system voices

Important behavior notes:

- voices may not be available immediately on page load
- the engine waits for asynchronous voice loading through `voiceschanged`
- fallback behavior is expected and normal when a dedicated Taiwan voice is not installed
- pronunciation quality depends on the underlying browser and OS voice inventory

### Development Utility

The web app includes a development-only `VoiceDebugger` component that can:

- list all available voices
- inspect `name`, `lang`, `localService`, and `default`
- test individual voices
- choose a preferred voice
- adjust persisted rate, pitch, volume, and autoplay settings
