# Trading Dashboard (Next.js)

Multi-bank trading dashboard with real-time ticker data, interactive charts, and market news.

Quick start

```bash
cd client/trading-dashboard
npm install
```

Config / Environment

- The service uses `.env` for configuration. Please check example.env for details
- see `example.env`

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Testing

- Unit (Jest): `npm run test` (watch: `npm run test:watch`)
- E2E (Cypress): start the app then `npm run cypress:open` or `npm run cypress:run`

Docker

- The repository root contains `docker-compose.yml` to build and run both services. Use `docker-compose up` from the root to start both client and server.

