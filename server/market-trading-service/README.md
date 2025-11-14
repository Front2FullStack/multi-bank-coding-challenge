# market-trading-service

Real-time market data microservice used by the trading-dashboard frontend.

Features

- Simulates live ticker price updates and exposes a small REST API.

Quick start (development)

```bash
cd server/market-trading-service
npm install
# run in dev with ts-node/nodemon
npm run dev
```

Build / run production

```bash
npm run build
npm start
```

Config / Environment

- The service uses `.env` for configuration. Main variables:
  - PORT (default: 3005)
  - NODE_ENV (development|production)
  - ALLOWED_ORIGINS (comma-separated CORS origins for the frontend)

Endpoints

- GET /health — returns a simple health payload
- All API routes are mounted under `/api` (e.g. `/api/tickers`)

Docker

The repository includes a `Dockerfile` for this service and a top-level `docker-compose.yml` to run both client and server.

```bash
# from repository root
docker-compose build
docker-compose up server
```

Notes

- The project compiles TypeScript into `dist/` — production Docker image copies the compiled files and installs production dependencies only.
