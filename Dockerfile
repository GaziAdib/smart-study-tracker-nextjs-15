# # Base image
# FROM node:20-slim AS base
# WORKDIR /app

# # Install dependencies
# FROM base AS deps
# RUN apt-get update && apt-get install -y libc6 openssl && rm -rf /var/lib/apt/lists/*
# COPY package.json package-lock.json ./
# COPY prisma ./prisma
# RUN npm ci --legacy-peer-deps
# RUN npx prisma generate

# # Build the app
# FROM base AS builder
# COPY --from=deps /app/node_modules ./node_modules
# COPY --from=deps /app/prisma ./prisma
# COPY . .
# RUN npm run build

# # Production image
# FROM node:20-slim AS runner
# WORKDIR /app

# ENV NODE_ENV=production
# ENV PORT=3000

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# # Copy everything needed to run the app
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next     
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/package.json ./package.json

# USER nextjs
# EXPOSE 3000
# CMD ["npm", "start"]








# Base image
FROM node:20-slim AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
RUN apt-get update && apt-get install -y libc6 openssl && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci --legacy-peer-deps
RUN npx prisma generate

# Build the app
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY . .
RUN npm run build

# Production image
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy everything needed to run the app
COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
CMD ["npm", "start"]














# # Base image
# FROM node:20-slim AS base
# WORKDIR /app

# # Install dependencies separately
# FROM base AS deps
# RUN apt-get update && apt-get install -y libc6 && rm -rf /var/lib/apt/lists/*
# COPY package.json package-lock.json ./
# RUN npm ci --legacy-peer-deps

# # Build the app
# FROM base AS builder
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# RUN npm run build

# # Production image
# FROM node:20-slim AS runner
# WORKDIR /app

# ENV NODE_ENV=production
# ENV PORT=3000

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000
# CMD ["node", "server.js"]







# # Base image
# FROM node:20-slim AS base
# WORKDIR /app

# # Install dependencies separately
# FROM base AS deps
# RUN apk add --no-cache libc6-compat
# COPY package.json package-lock.json ./
# RUN npm ci --legacy-peer-deps

# # Build the app
# FROM base AS builder
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# RUN npm run build

# # Production image
# FROM node:20-alpine AS runner
# WORKDIR /app

# # Proper environment variable
# ENV NODE_ENV=production
# ENV PORT=3000

# # Create user for security
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# # Copy public and built files
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static

# # Use non-root user
# USER nextjs

# EXPOSE 3000

# # Proper CMD format
# CMD ["node", "server.js"]







# # use Node.js base image
# FROM node:20

# #SET working directory

# WORKDIR /app

# # Copy package files and install dependencies

# COPY package.json package-lock.json* ./
# RUN npm install
# COPY . .


# # Build the nextjs app
# RUN npm run build

# # Expose the port 
# EXPOSE 3000


# # Start the app
# CMD ["npm", "start"]