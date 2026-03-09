# SWAPI Character Search

A Star Wars character search platform built with React 19 + TypeScript. Type a name into the search box and get live suggestions pulled from the [SWAPI](https://swapi.dev) API — click or keyboard-select one to see their details.

---

## What it does

- Suggestions appear after 2 characters, they debounced at 100ms so the API isn't hammered on every keystroke (this is configurable in the `useDebounce` hook and Ideally we would use 300ms in production but I have reduced it to 100ms to make the request cancellation in the network tab more visible when typing)
- In-flight requests are cancelled automatically when the query changes so no stale results overwriting fresh ones
- Full keyboard support: arrow keys to navigate, Enter to select, Escape to close
- Click outside the dropdown to dismiss it
- Matched text is bolded in each suggestion
- Character details show below the search box after selection
- Loading skeletons, empty state, and error messages are all handled

---

## Tech stack

- **React 19 + TypeScript** 
- **Vite 7** — dev server and production build with gzip compression
- **TanStack Query v5** — handles caching, deduplication, and passes the abort signal to Axios
- **TanStack Router** — client-side routing with a typed 404 fallback
- **Axios** — HTTP client; the abort signal from TanStack Query is forwarded straight through
- **Zod** — validates the API response at runtime so a SWAPI schema change surfaces immediately as an error rather than broken UI
- **Tailwind CSS v4** — custom brand theme defined in @theme
- **Biome** — linting and formatting in one tool
- **Vitest + Testing Library + MSW** — unit/integration tests with a mock API server (no real network calls in tests)
- **Playwright** — E2E smoke tests against the running dev server
- **Husky + lint-staged** — runs Biome on staged files before every commit

---

## Getting started

NB: You'll need Node 22.12.0+ and npm installed.

```bash
# Clone the repo and install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Running the tests

```bash
# Run the unit/integration test suite once
npm test

# Watch mode — reruns affected tests as you edit
npm run test:watch

# Coverage report
npm run test:coverage
```

For E2E tests you need the dev server running in a separate terminal first:

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run test:e2e
```

---

## A few implementation notes

**Request cancellation** — TanStack Query exposes a `signal` on the `QueryFunctionContext`. That signal gets passed directly to Axios, so when the debounced query key changes mid-flight, the previous HTTP request is cancelled at the network level. This prevents a slow response for `"lu"` from landing after a faster response for `"luk"` and overwriting it.

**Debounce placement** — The debounce sits between the raw input state and the query key, not inside the query itself. This means TanStack Query only registers a new query after the user pauses, which keeps the cache clean and avoids unnecessary re-renders.

**Zod validation** — Every API response goes through `SwapiPeopleResponseSchema.parse()` before any component touches the data. If SWAPI ever changes the shape of its response, the app throws an error that's caught by the error boundary rather than silently rendering `undefined` fields.

---

<img width="1438" height="860" alt="Screenshot 2026-03-04 at 01 00 30" src="https://github.com/user-attachments/assets/bca748e6-e628-4251-b030-916f94ab3bf0" />

