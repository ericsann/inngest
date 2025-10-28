FROM node:20-alpine AS base

WORKDIR /app

# Copy workspace configuration files
COPY pnpm-workspace.yaml pnpm-lock.yaml ./

# Copy package files from workspace root and app
COPY package.json apps/dev-server-ui/package.json ./
COPY package*.json ./

# Install pnpm globally and install dependencies
RUN npm install -g pnpm@8.15.8 && pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Install all dependencies including workspace packages
RUN pnpm install

# Build the application
RUN pnpm --filter @inngest/dev-server-ui build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built application from base stage
COPY --from=base /app/apps/dev-server-ui/.next/standalone ./apps/dev-server-ui/
COPY --from=base /app/apps/dev-server-ui/.next/static ./apps/dev-server-ui/.next/static
COPY --from=base /app/apps/dev-server-ui/public ./apps/dev-server-ui/public

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "apps/dev-server-ui/apps/dev-server-ui/server.js"]