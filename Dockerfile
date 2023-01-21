FROM node:lts AS deps
WORKDIR ~/app

# Install dependencies
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
COPY package.json package-lock.json ./
RUN pnpm install --frozen-lockfile

FROM node:lts AS builder
WORKDIR ~/app

# Copy dependencies
COPY --from=deps ~/app/node_modules ./node_modules
COPY . .

# Build
RUN pnpm run build

FROM nginx:stable-alpine AS runner
WORKDIR ~/app

# Copy dist
COPY --from=builder ~/app/dist /usr/share/nginx/html

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
