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

RUN yarn build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React app
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
