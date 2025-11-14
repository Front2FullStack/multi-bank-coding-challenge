# Docker setup

This repository contains two services:

- server: market-trading-service (Node + TypeScript) — exposes port 3005
- client: trading-dashboard (Next.js) — exposes port 3000

Prerequisites: Docker and docker-compose installed.

Build and run both services:

```bash
docker-compose build
docker-compose up
```

Open the client at: http://localhost:3000
The server REST API will be available at: http://localhost:3005/api

Notes:

- The server uses environment variable `ALLOWED_ORIGINS` to allow CORS from the client. Default in compose is `http://localhost:3000`.
- If you make TypeScript or source changes, rebuild the server image to pick up compiled output.
