#!/bin/bash
set -euo pipefail

APP_NAME=realworld-react
SERVER=mhc
REMOTE_DIR=/opt/realworld-react

echo "== Building frontend..."
VITE_APP_API_URL=https://realworldapi.minhhoccode111.com/api/v1 \
VITE_APP_APP_URL=https://realworld.minhhoccode111.com \
  yarn build

echo "== Sending source to server..."
ssh "$SERVER" "sudo mkdir -p $REMOTE_DIR"
tar cz --exclude=node_modules --exclude=.git --exclude=dist . | ssh "$SERVER" "sudo tar xzf - -C $REMOTE_DIR"

echo "== Deploying..."
ssh "$SERVER" << ENDSSH
set -e

cd "$REMOTE_DIR"

docker stop "$APP_NAME" 2>/dev/null || true
docker rm "$APP_NAME" 2>/dev/null || true
docker build \
  --build-arg VITE_APP_API_URL=https://realworldapi.minhhoccode111.com/api/v1 \
  --build-arg VITE_APP_APP_URL=https://realworld.minhhoccode111.com \
  -t "$APP_NAME":latest .
docker run -d \
  --name "$APP_NAME" \
  --restart unless-stopped \
  -p 127.0.0.1:3000:80 \
  "$APP_NAME":latest

sleep 2
docker ps --filter "name=$APP_NAME" --filter "status=running" --format '{{.Status}}' | grep -q "Up" || {
  echo "ERROR: Container not running!"
  docker logs "$APP_NAME" --tail 20
  exit 1
}

if ! cmp -s deploy/Caddyfile /etc/caddy/snippets/realworld.minhhoccode111.com; then
  sudo cp deploy/Caddyfile /etc/caddy/snippets/realworld.minhhoccode111.com
  sudo systemctl reload caddy
fi

docker image prune -f
ENDSSH

echo "== Done."
