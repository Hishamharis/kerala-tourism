# Kerala Tourism - showcase site

React + Vite single-page experience: interactive district map, AI itinerary generator (Gemini behind a Netlify Function), and curated content sections.

Live site: https://kerala-gods-own-country-app.netlify.app/

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Vite dev server (port 3000). **Itineraries use mock data** - `/api/generate-itinerary` is not available unless proxied. |
| `npm run build` | Production build -> `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | ESLint |
| `netlify dev` | Local Netlify environment with Functions (optional; requires [Netlify CLI](https://docs.netlify.com/cli/get-started/)) |

## Environment variables

| Variable | Where | Purpose |
|----------|--------|---------|
| `GEMINI_API_KEY` | **Netlify dashboard** (and optionally local `.env` for `netlify dev` only) | Used only by `netlify/functions/generate-itinerary.js`. **Never** expose as `VITE_*`. |

After cloning, copy `.env.example` to `.env` if you use `netlify dev`. For production, set `GEMINI_API_KEY` in Netlify -> Site configuration -> Environment variables.

If the key is missing or the model returns invalid JSON, the function falls back to a deterministic mock itinerary.

## Architecture

- **Frontend:** `src/` - React components, GSAP/Lenis/Three.js for motion where enabled.
- **API:** `POST /api/generate-itinerary` - rewritten on Netlify to `generate-itinerary` serverless function (`netlify.toml`).
- **Security:** Gemini calls run only on the server; the browser never sees the API key.

Production URL is already set in `index.html`, `public/robots.txt`, and `public/sitemap.xml` to `https://kerala-gods-own-country-app.netlify.app/`.

## Deployment (Netlify)

1. Connect the repo; build command `npm run build`, publish directory `dist`.
2. Add environment variable `GEMINI_API_KEY`.
3. Confirm `netlify.toml` redirects: `/api/generate-itinerary` -> function, SPA fallback for client routes.

## Scope note (demo portfolio)

This project intentionally omits automated tests, error monitoring, analytics, and CI pipelines - add them before a production launch beyond a portfolio demo.

## Rotate keys if exposed

If an API key was ever committed or exposed in the client, revoke it in Google AI Studio / Cloud Console and create a new key stored only as `GEMINI_API_KEY` on the server.
