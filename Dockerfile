FROM node:22-alpine AS base

# =========================
# Dependencies
# =========================
FROM base AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci


# =========================
# Build
# =========================
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ARG NEXT_PUBLIC_PATH
ARG BASEPATH_PREFIX
ARG ASSET_PREFIX
ARG API_DOMAIN_NAME
ARG FRONTEND_TOKEN_KEY
ARG NEXT_PUBLIC_DOMAIN_NAME

ENV NEXT_PUBLIC_PATH=$NEXT_PUBLIC_PATH
ENV BASEPATH_PREFIX=$BASEPATH_PREFIX
ENV ASSET_PREFIX=$ASSET_PREFIX
ENV API_DOMAIN_NAME=$API_DOMAIN_NAME
ENV FRONTEND_TOKEN_KEY=$FRONTEND_TOKEN_KEY
ENV NEXT_PUBLIC_DOMAIN_NAME=$NEXT_PUBLIC_DOMAIN_NAME

RUN npm run build


# =========================
# Production
# =========================
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=2964
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 2964

CMD ["node", "server.js"]