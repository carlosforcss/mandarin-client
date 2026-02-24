# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build (outputs to dist/)
npm run preview  # Preview production build locally
```

No lint or test scripts are configured.

## Environment

Copy `.env.example` to `.env` and set:
```
VITE_API_URL=http://localhost:8000
```

Production API: `https://mandarinapi.carlostoolkit.com` (set in `docker-compose.yml`).

## Architecture

**Stack:** React 18 + Vite, React Router v6, TanStack Query v4, Axios, Tailwind CSS.

### Data flow

All server state goes through TanStack Query hooks in `src/lib/hooks.js`. Components call hooks → hooks call Axios functions in `src/lib/api.js` → responses cached for 5 minutes. Mutations invalidate related query keys on success.

API base URL is the Axios instance in `api.js` configured from `VITE_API_URL`.

### Key library: `src/lib/pinyin.js`

Defines `INITIALS`, `VALID_FINALS` (a map of initial → allowed finals), `TONES`, `toAudioFinal()` (converts display finals to audio filename format), and `randomPinyin()`. Audio files are served as `/pinyin/{initial}{audioFinal}{tone}.mp3`.

### Routing (`src/App.jsx`)

| Route | Page | Purpose |
|---|---|---|
| `/` | `Pinyin` | Default landing — pinyin explorer |
| `/pinyin` | `Pinyin` | Pinyin grid with audio playback |
| `/play-pinyin` | `PlayPinyin` | Timed game (Bullet 60s / Rapid 120s / Classic 300s) |
| `/hanzi` | `HanziList` | Browse/filter/paginate Chinese characters |
| `/hanzi/:id` | `HanziDetail` | View/edit/delete a single hanzi |
| `/categories` | `Categories` | Manage categories |

### PlayPinyin game

Game modes are defined in the `MODES` array at the top of `PlayPinyin.jsx`. Each mode has a `key`, `label`, `seconds`, and `slug` (used for leaderboard API calls). Default mode is `rapid`. Scoring: +5 correct, -1 wrong (floor 0). Scores submitted via `scoresAPI.submit(slug, name, score)` at game end. Leaderboard shown in `ScoreModal` filtered by game slug.

### Forms and file uploads

`HanziForm` and `CategoryForm` render inline within their list pages (not as routes). `FileUpload` handles drag-and-drop image attachment via `multipart/form-data`.

## Deployment

Docker: multi-stage build (Node builder → nginx on port 3200) with SPA fallback configured. See `Dockerfile` and `docker-compose.yml`.
