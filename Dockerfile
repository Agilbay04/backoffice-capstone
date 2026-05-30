# Stage 1: Build app using Node.js & pnpm
FROM node:24-alpine AS fe-builder

# Installing pnpm for global
RUN npm install -g pnpm

WORKDIR /app

# Copy package file
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./

# Install dependecy
RUN pnpm install --frozen-lockfile

# Copy all source code
COPY . .

# Build project
RUN pnpm build

# Stage 2: Install NGINX
FROM nginx:1.26.2-alpine3.18

# Copy project build to nginx
COPY --from=fe-builder /app/dist /usr/share/nginx/html

# Expose to port 80 in container
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
