# Tic-Tac-Toe (React Frontend)

A small, retro-styled Tic-Tac-Toe game built with React. It renders a 3x3 grid for two players to take turns as **X** and **O**, detects a **winner** or a **draw**, and includes a one-click **Reset** to start a new game.

## Project overview

This app is a classic 3x3 Tic-Tac-Toe implementation with a lightweight “retro/pixel-ish” UI.

The gameplay includes:

- A 3x3 board with clickable squares.
- Alternating turns between player **X** and player **O**.
- Winner detection for rows, columns, and diagonals.
- Draw detection when the board is full and there is no winner.
- A Reset button that clears the board and sets the current player back to **X**.

The UI also includes accessible status messaging (win/draw/turn) and keyboard-friendly focus styles.

## Tech stack

The frontend is intentionally minimal:

- React 18
- Create React App tooling via `react-scripts` (CRA)
- Jest + React Testing Library for unit tests (via CRA defaults)
- Vanilla CSS (no UI framework)

## Prerequisites

You will need:

- Node.js (LTS recommended)
- npm (ships with Node.js)

To confirm:

```bash
node -v
npm -v
```

## Getting started

From the repository root:

```bash
git clone <your-repo-url>
cd minimal-tic-tac-toe-214277/tic_tac_toe_frontend
npm install
npm start
```

Then open:

- http://localhost:3000

## Available scripts

Scripts are defined in `package.json` and use CRA conventions.

### `npm start`

Starts the development server with hot reload:

```bash
cd minimal-tic-tac-toe-214277/tic_tac_toe_frontend
npm start
```

By default CRA uses port `3000` (unless overridden by `PORT` in the environment).

### `npm run build`

Creates a production build in `build/`:

```bash
npm run build
```

You can then serve it with any static server. For example:

```bash
npx serve -s build
```

### `npm test`

Runs tests using the CRA Jest runner (watch mode when a TTY is available):

```bash
npm test
```

### `npm run eject`

CRA eject (irreversible). This project does not require ejecting for typical development:

```bash
npm run eject
```

### Linting

This repository includes an `eslint.config.mjs`, but there is no dedicated `npm run lint` script in `package.json`.

You can still use CRA’s built-in lint-on-build and lint-in-dev-server behavior, or run ESLint manually if you add a script. If you choose to add one locally, a common option is:

```bash
npx eslint .
```

## Environment variables

This frontend does not require a backend to run. All environment variables listed below are optional; the game logic and UI work entirely in-browser.

Create a `.env` file in `minimal-tic-tac-toe-214277/tic_tac_toe_frontend/` if you want to provide values:

```bash
cat > .env <<'EOF'
REACT_APP_API_BASE=
REACT_APP_BACKEND_URL=
REACT_APP_FRONTEND_URL=
REACT_APP_WS_URL=
REACT_APP_NODE_ENV=
REACT_APP_NEXT_TELEMETRY_DISABLED=
REACT_APP_ENABLE_SOURCE_MAPS=
REACT_APP_PORT=
REACT_APP_TRUST_PROXY=
REACT_APP_LOG_LEVEL=
REACT_APP_HEALTHCHECK_PATH=
REACT_APP_FEATURE_FLAGS=
REACT_APP_EXPERIMENTS_ENABLED=
EOF
```

### Variable reference

Because this is a CRA app, only variables prefixed with `REACT_APP_` are embedded into the browser build.

- `REACT_APP_API_BASE`: Base URL for API requests (typical default: empty, or `http://localhost:8000`).
- `REACT_APP_BACKEND_URL`: Full backend base URL (typical default: empty, or `http://localhost:8000`).
- `REACT_APP_FRONTEND_URL`: Public URL where the frontend is hosted (typical default: empty, or `http://localhost:3000`).
- `REACT_APP_WS_URL`: WebSocket URL, if used (typical default: empty, or `ws://localhost:8000`).
- `REACT_APP_NODE_ENV`: Optional runtime environment hint (typical default: `development`). Note that CRA already provides `process.env.NODE_ENV`.
- `REACT_APP_NEXT_TELEMETRY_DISABLED`: Included for consistency with some stacks; not used by CRA by default (typical default: `1` to disable telemetry in Next.js projects).
- `REACT_APP_ENABLE_SOURCE_MAPS`: Whether to enable sourcemaps (typical default: `true` in development).
- `REACT_APP_PORT`: Desired port value if you consume it in app code (typical default: `3000`). For CRA’s dev server port, the standard env var is `PORT` (without the prefix).
- `REACT_APP_TRUST_PROXY`: Reverse proxy hint (typical default: empty/false).
- `REACT_APP_LOG_LEVEL`: Logging verbosity (typical default: `info`).
- `REACT_APP_HEALTHCHECK_PATH`: Healthcheck path if you add a health route (typical default: `/health`).
- `REACT_APP_FEATURE_FLAGS`: Feature flag configuration (typical default: empty or JSON string).
- `REACT_APP_EXPERIMENTS_ENABLED`: Toggle experimental features (typical default: `false`).

If these variables are not set, the app should still behave normally as a standalone game.

## Running tests

This project includes a basic test in `src/App.test.js` and configures `@testing-library/jest-dom` in `src/setupTests.js`.

Run tests locally:

```bash
cd minimal-tic-tac-toe-214277/tic_tac_toe_frontend
npm test
```

Run tests in CI mode (non-interactive, single run):

```bash
CI=true npm test
```

If you need to set environment variables reliably across platforms, this repo includes `cross-env` as a dev dependency. A cross-platform variant is:

```bash
npx cross-env CI=true npm test
```

## Project structure

Key files and what they do:

- `public/index.html`: HTML template used by CRA.
- `src/index.js`: App entry point that renders `<App />` into `#root`.
- `src/index.css`: Global styles (page background, typography, base element rules).
- `src/App.js`: Main Tic-Tac-Toe component, including:
  - Board state and turn management
  - Winner calculation (rows/columns/diagonals)
  - Draw detection and game-over behavior
  - Reset functionality
  - Accessible status messaging and grid semantics
- `src/App.css`: Retro-styled UI and component styling (board, squares, focus ring, status pill, reset button).
- `src/App.test.js`: Smoke test ensuring the title and Reset button render.
- `src/setupTests.js`: Jest DOM matchers setup.

## Development notes

The UI is designed to feel “retro” while still being modern and readable. The styling uses a light background with accent colors aligned to the style guide (`#3b82f6` primary and `#06b6d4` accent), plus a thicker “pixel-ish” border.

Accessibility and keyboard support are intentional:

- The status area uses `role="status"` with `aria-live="polite"` so screen readers announce turn/win/draw updates.
- The board uses `role="grid"` and squares use `role="gridcell"`.
- Squares are real `<button>` elements, so keyboard users can Tab to a square and press Enter/Space.
- A visible focus ring is provided via `:focus-visible` styles.

## Troubleshooting

### `npm start` fails or shows dependency errors

Try a clean install:

```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### Tests hang in watch mode (common in CI)

Use CI mode to force a single run:

```bash
CI=true npm test
```

### `react-scripts` not found

This usually means dependencies were not installed or `node_modules` is corrupted:

```bash
npm install
```

If it still fails:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Port already in use

CRA will often prompt to use a different port. In CI/non-interactive environments, explicitly choose a port using the standard `PORT` variable:

```bash
PORT=3001 npm start
```

## License

MIT (placeholder)
