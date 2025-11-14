# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps and build
COPY package*.json tsconfig*.json ./
COPY src ./src
RUN npm ci --silent && npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only production files
COPY package*.json ./
COPY --from=builder /app/dist ./dist

# Install only production deps
RUN npm ci --only=production --silent

EXPOSE 3005
CMD ["node", "dist/index.js"]
