# Base image
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies separately
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# Build the app
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Proper environment variable
ENV NODE_ENV=production
ENV PORT=3000

# Create user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public and built files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Use non-root user
USER nextjs

EXPOSE 3000

# Proper CMD format
CMD ["node", "server.js"]







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