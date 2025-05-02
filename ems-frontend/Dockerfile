# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.13.1

# --- Build Stage ---
FROM node:${NODE_VERSION}-slim AS builder
WORKDIR /app

# Install dependencies (npm ci is deterministic)
COPY --link package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm install

# Copy the rest of the app
COPY --link . .

# Build the React app for production
RUN --mount=type=cache,target=/root/.npm \
    npm run build

# --- Production Stage ---
FROM node:${NODE_VERSION}-slim AS final
WORKDIR /app

# Create a non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Copy only the build output and production dependencies
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"
USER appuser

# Serve the build with a simple static server (serve)
# Install 'serve' globally for static file serving
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
