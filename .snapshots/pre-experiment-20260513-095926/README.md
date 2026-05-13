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
  /ui
```

## Packages

- `@sinographic-engine/shared-types`: reusable domain types
- `@sinographic-engine/learning-engine`: pure quiz/session logic with no React dependency
- `@sinographic-engine/classifier-content`: typed runtime access layer for canonical repo-level classifier content
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
- The package boundaries leave room for future semantic visualization work, including a Three.js-based renderer, without entangling it with the quiz UI or content authoring layer.
