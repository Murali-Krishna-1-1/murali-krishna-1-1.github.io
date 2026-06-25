# Murali Krishna — Portfolio

React + Vite + Tailwind CSS v4 + Framer Motion. Replaces the previous
single-file static HTML site.

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally to sanity-check it
```

## Deploying to GitHub Pages

This repo deploys automatically via GitHub Actions (`.github/workflows/deploy.yml`)
on every push to `main`. No manual build/upload step needed.

**One-time setup in GitHub (if not already done):**

1. Go to the repo → **Settings → Pages**.
2. Under "Build and deployment", set **Source** to **GitHub Actions**.
3. Push to `main` — the workflow builds the site and publishes it.

Since this repo is `Murali-Krishna-1-1.github.io` (a user/org Pages repo,
not a project repo), the site is served from the root domain
`https://murali-krishna-1-1.github.io/` — `vite.config.js` is already set
with `base: '/'` to match this. If you ever move this code into a
different (project) repo instead, change `base` to `'/repo-name/'`.

## Project structure

```
src/
  components/   one file per section (Hero, Skills, Projects, etc.)
  hooks/        useTypewriter, useMouseParallax, useTheme, useCustomCursor
  data/         content.js — all site copy/content lives here
  index.css     design tokens (colors, fonts) + global styles
```

To update content (projects, skills, experience, certifications), edit
`src/data/content.js` — no JSX changes needed for text/data updates.

## Notes

- Light/dark theme toggle persists via `localStorage` and respects the
  visitor's OS preference on first visit.
- The hero's dot-grid background reacts to mouse movement (desktop only,
  disabled under 1024px width) instead of a background video.
- The Projects carousel is touch/drag-friendly (Framer Motion drag, not a
  third-party carousel library).
