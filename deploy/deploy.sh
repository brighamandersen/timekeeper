#!/bin/bash
set -euo pipefail

echo "Deploying timekeeper"

# frontend

cd /home/brig/dev/timekeeper/
npm run build

# nginx

sudo cp /home/brig/dev/timekeeper/deploy/nginx.conf /etc/nginx/conf.d/timekeeper.conf

sudo nginx -t
sudo systemctl reload nginx

echo "Deployment complete for timekeeper"
