# multi-bank-coding-challenge

Full-stack real-time trading dashboard used for the Multi Bank coding challenge. This repository contains two main projects and supporting documentation.

Project layout

- `client/trading-dashboard` — Next.js frontend (UI, E2E + unit tests). See: `client/trading-dashboard/README.md` and `client/trading-dashboard/README.md` for developer instructions.
- `server/market-trading-service` — Node + TypeScript microservice that simulates market data and exposes a small REST API. See: `server/market-trading-service/README.md`.
- `docs/` — architecture and project-scope documentation.
- `docker-compose.yml` & `README.DOCKER.md` — Docker setup for running both services together.

Quick start (recommended: Docker)

1. From the repository root, build and start both services with docker-compose:

```bash
docker-compose build
docker-compose up
```

This will start:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3005 (health endpoint: `/health`)

Local development with Docker (hot reload)

Use the development compose file to run both services with live reload and all required env vars configured:

```bash
docker compose -f docker-compose.dev.yml up --build
```

This will start:

- Frontend (dev server): http://localhost:3000
- Backend API (dev): http://localhost:3005
- WebSocket (dev): ws://localhost:8080

Local development (without Docker)

- Frontend:

```bash
cd client/trading-dashboard
npm install
npm run dev
```

- Backend:

```bash
cd server/market-trading-service
npm install
npm run dev
```

Tests

- Frontend unit tests: run in `client/trading-dashboard` with `npm run test` (Jest)
- Frontend E2E: run Cypress after starting the frontend with `npm run cypress:open` for local `npm run cypress:run` for CI/CD pipelines
- Backend unit test run in `server/market-trading-service` with `npm run test` (Jest), `npm run test:watch`, `npm run test:coverage` also available if working on test and see the coverage

## Assumptions & Trade-offs

### Assumptions

- Data model: simplified ticker domain (price, change, volume, 24h high/low); no corporate actions, splits, multi-currency, or latency-sensitive guarantees.

- Simulation: price history and live ticks are synthetic for UX validation, not financial accuracy.

- Environment: single-node backend with in-memory storage is acceptable for this challenge; no cross-process persistence required.

- Client: no auth is required to view market data.

- Contracts: WebSocket message shapes are minimal and stable: `{"type":"connected","payload":{"clientId"}}` and `{"type":"data","payload":{"ticker"}}`. REST endpoints are reachable for initial bootstrap/fallback.

- CI/CD via github actions to run test on PR

- Used Code Rabbit to review

### Trade-offs

- Real-time delivery vs simplicity: WebSocket for live updates plus a one-time REST bootstrap for fast first paint (slight duplication accepted for responsiveness).

- Subscription scope: initial subscribe-to-all for clarity; future optimization could subscribe only to visible/selected symbols.

- Update cadence: immediate per-tick broadcasts, no batching/debouncing; simple but more frames under heavy load. Batching window (e.g., 50–150 ms) can be added later.

- State storage: in-memory repository and subscription registry (per-process); not horizontally scalable without a shared store/pub-sub or sticky sessions.

- Consistency vs responsiveness: values rounded for display and updated on each `data` frame; suited for UI, not for reconciliation.

- Error handling: if REST fails, fall back to mock data; if WS drops, auto-reconnect and keep last-known data. Prioritizes resilience for demos.

- Client architecture: Next.js app with a WebSocket Provider context and React Query; SSR of live data is out of scope to keep the real-time logic client-side and testable.

- Testing: REST fallback and provider no-op defaults keep unit tests stable; deep WS integration tests are limited and can be added with a small WS mock.

- Selection model: selection tracked by symbol and derived from the latest ticker list to ensure live updates without stale references.

- Some of the Bonus features aren't covered due to time constrain.

License

This project is available under the repository LICENSE file.
