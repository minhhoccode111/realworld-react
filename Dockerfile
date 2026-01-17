FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Final stage with just artifacts
FROM scratch
COPY --from=builder /app/dist /dist
