# -------------------------
# 1. Install dependencies
# -------------------------
FROM node:20-alpine AS deps

WORKDIR /app

# Install dependencies based on lockfile
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else npm install; \
  fi


# -------------------------
# 2. Build the app
# -------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js app
RUN npm run generate
RUN npm run build


# -------------------------
# 3. Run production server
# -------------------------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Create non-root user (best practice)
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Copy built assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Set permissions
RUN chown -R nextjs:nextjs /app
USER nextjs

EXPOSE 3000

# Start Next.js
CMD ["npm", "run", "start"]