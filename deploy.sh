#!/bin/bash
set -euo pipefail

SERVER=mhc
REMOTE_DIR=/opt/realworld-react

echo "== Building frontend..."
yarn build

echo "== Syncing dist/ to server..."
ssh "$SERVER" "sudo mkdir -p $REMOTE_DIR/dist"
rsync -a --delete dist/ "$SERVER:$REMOTE_DIR/dist/"

echo "== Updating Caddy config..."
rsync deploy/Caddyfile "$SERVER:/tmp/realworld-caddy"
ssh "$SERVER" << ENDSSH
if ! cmp -s /tmp/realworld-caddy /etc/caddy/snippets/realworld.minhhoccode111.com; then
    sudo cp /tmp/realworld-caddy /etc/caddy/snippets/realworld.minhhoccode111.com
    sudo systemctl reload caddy
fi
rm -f /tmp/realworld-caddy
ENDSSH

echo "== Done."
