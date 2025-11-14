# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps and build
COPY package*.json next.config.ts tsconfig.json ./
COPY . .
RUN npm ci --silent && npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built app and necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install only production deps
RUN npm ci --only=production --silent

EXPOSE 3000
CMD ["npm", "run", "start"]
