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
- Frontend E2E: run Cypress after starting the frontend (see `client/trading-dashboard/cypress.config.ts`)

Notes

- Each subproject includes its own README with more detailed developer and testing instructions. If you plan to contribute, please follow the subproject README before opening a PR.
- If you want CI/CD integration, I can add GitHub Actions workflows that run unit tests and optional Cypress E2E tests.

License

This project is available under the repository LICENSE file.
