# ==========================================
# PHASE 4 — BUILD STAGE
# ==========================================

FROM node:22-bookworm-slim AS build

WORKDIR /app

# Prisma requires OpenSSL on Linux
RUN apt-get update \
    && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy package files first.
# This allows Docker to cache npm install
# when application source code changes.
COPY package*.json ./

RUN npm ci

# Copy TypeScript configuration
COPY tsconfig.json ./

# Copy Prisma schema
COPY prisma ./prisma

# Copy source code
COPY src ./src

# Generate Prisma Client
RUN npx prisma generate

# Compile TypeScript -> JavaScript
RUN npm run build


# ==========================================
# PHASE 4 — PRODUCTION STAGE
# ==========================================

FROM node:22-bookworm-slim AS production

WORKDIR /app

# Prisma also needs OpenSSL at runtime
RUN apt-get update \
    && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy compiled JavaScript
COPY --from=build /app/dist ./dist

# Copy generated Prisma files
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Copy Prisma Client package
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3000

CMD ["node", "dist/server.js"]