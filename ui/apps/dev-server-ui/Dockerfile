FROM node:20-alpine

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

# Expose port
EXPOSE 3000

# Start the application
CMD ["pnpm", "--filter", "@inngest/dev-server-ui", "start"]