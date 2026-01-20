FROM node:22 AS builder

WORKDIR /app

ARG VITE_APP_API_URL
ARG VITE_APP_APP_URL

COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Final stage with just artifacts
FROM scratch
COPY --from=builder /app/dist /

# docker build \
# --build-arg VITE_APP_API_URL=http://localhost:8080/api/v1 \
# --build-arg VITE_APP_APP_URL=http://localhost:3000 \
# -o dist .

# docker build \
# --build-arg VITE_APP_API_URL=https://realworldapi.minhhoccode111.com/api/v1 \
# --build-arg VITE_APP_APP_URL=https://realworld.minhhoccode111.com \
# -o dist .
