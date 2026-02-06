# syntax=docker/dockerfile:1.4

########################
# 1️⃣ Build Stage
########################
FROM node:22 AS build

WORKDIR /app

# Build arguments
ARG VITE_APP_API_URL
ARG VITE_APP_APP_URL

# Expose them as env for build process
ENV VITE_APP_API_URL=$VITE_APP_API_URL
ENV VITE_APP_APP_URL=$VITE_APP_APP_URL

# Copy only dependency files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source
COPY . .

# Build static files
RUN yarn build

########################
# 2️⃣ Production Stage
########################
FROM nginx:alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React app
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

# docker build \
#   --build-arg VITE_APP_API_URL=https://realworldapi.minhhoccode111.com \
#   --build-arg VITE_APP_APP_URL=https://realworld.minhhoccode111.com \
#   -t minhhoccode111/realworld-react:latest .

# docker run -d \
#   --name realworld-react \
#   --restart unless-stopped \
#   -p 127.0.0.1:3000:80 \
#   minhhoccode111/realworld-react:latest
