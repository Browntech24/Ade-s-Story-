# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project overview

**Ade Goes to School** is an illustrated, interactive short story set in the village of Ilode, Western Nigeria. It is a single-page React app with an Express backend that proxies Google Gemini for story expansion and in-character dialogue.

- **Stack:** React 19, TypeScript, Vite 8, Tailwind CSS 4, Express 4, `@google/genai`
- **Runtime/tooling:** Bun lockfile (`bun.lock`), but npm scripts run through `tsx` / `vite`
- **Entry points:** `index.html` → `src/main.tsx` → `src/App.tsx`; backend is `server.ts`
- **Story content** lives entirely in `src/data/story.ts` (chapters, glossary, quiz)
- **Images** are static assets in `src/assets/images/`

## Commands

```bash
bun install          # install dependencies (bun.lock is authoritative)
npm run dev          # start Express + Vite middleware on port 3000
npm run build        # production build to dist/
npm start            # run server (in production serves dist/)
npm run lint         # type-check only: tsc --noEmit
npm run clean        # remove dist/ and server.js
npm run deploy       # Vercel production deploy (vercel --prod)
```

There is no test suite and no formatter configured. Use `npm run lint` as the verification step.

## Architecture

### Frontend (`src/`)
- `App.tsx` owns all top-level state: active tab, current chapter, completed chapters, audio narration state, modal state, and reader preferences (persisted to `localStorage` under `ade_reader_prefs`).
- Tabs: `story`, `chapters`, `glossary`, `comprehension`, `expand`.
- Components in `src/components/` are presentational and receive props from `App`; they do not use a router, context store, or global state library.
- `src/data/story.ts` exports typed constants (`STORY_CHAPTERS`, `STORY_METADATA`, `GLOSSARY_TERMS`, `REFLECTION_QUESTIONS`). Add or edit story content here, not in components.
- Styling is Tailwind utility classes inline. Custom fonts and theme variables are defined in `src/index.css` (`--font-display`, `--font-serif`, `--font-sans`). Dark mode uses a `.dark` class on `<html>`.

### Backend (`server.ts`)
- Express app with JSON body parsing on port `PORT` (default 3000).
- `GET /api/health` — returns status and whether `GEMINI_API_KEY` is set.
- `POST /api/story/expand` — expects `{ prompt, tone, focusCharacter }`; returns `{ text }`.
- `POST /api/story/character-qa` — expects `{ character, question }`; returns `{ answer }`.
- In development, Vite runs in middleware mode inside Express. In production (`NODE_ENV=production`), static files are served from `dist/`.
- Gemini calls use `model: 'gemini-3.8-flash'` and require `GEMINI_API_KEY`.

### Environment
Copy `.env.example` to `.env` and set `GEMINI_API_KEY`. Do not commit `.env*` except `.env.example` (already gitignored). The API returns a 400 with a helpful message when the key is missing, so the UI degrades gracefully.

## Conventions

- Keep TypeScript strict-friendly: the project uses `noEmit` type checking; avoid `any` where practical (existing catch blocks use `err: any`).
- Match existing component style: named exports, typed props interfaces, Tailwind classes, `lucide-react` icons.
- Use the `@/` path alias when importing from the repo root (configured in both `vite.config.ts` and `tsconfig.json`); relative imports are also used throughout `src/`.
- Preserve the editorial tone in user-facing copy: warm, literary, culturally specific, no filler.
- Story prose should remain consistent with established characters, setting, and glossary terminology. The expansion system prompt in `server.ts` is the canonical tone guide.

## Notes and gotchas

- **Vercel deployment:** `vercel.json` sets the Vite build plus an `npm install --legacy-peer-deps` install step (required because `vite@8`'s peer `esbuild` range conflicts with the pinned `esbuild@^0.25`). `api/[...path].ts` is a catch-all serverless function that exports the Express `app`. `server.ts` only calls `startServer()` when executed directly and not on Vercel (`process.env.VERCEL`), so importing it never opens a port.
- Set `GEMINI_API_KEY` in the Vercel project's Environment Variables; it is not read from a committed `.env`.
- Vite HMR is disabled when `DISABLE_HMR=true` (used by AI Studio to avoid flicker during agent edits). Do not remove that conditional.
- `src/data/story.ts` is the source of truth for chapter count. `App.tsx` progress and next/previous navigation derive from `STORY_CHAPTERS.length`, so adding a chapter automatically extends navigation.
- Glossary clicks from `ChapterReader` pass a glossary key; keys must match entries in `GLOSSARY_TERMS`.
- Images are referenced by path strings from the story data; if you add assets, place them in `src/assets/images/` and update the corresponding chapter `image` field.
- `npm run build` does not type-check; run `npm run lint` first.
