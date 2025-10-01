#!/bin/bash
set -euo pipefail

echo "Deploying timekeeper"

# frontend

cd /home/brig/code/timekeeper/
npm run build

# nginx

sudo cp /home/brig/code/timekeeper/deploy/nginx.conf /etc/nginx/conf.d/timekeeper.conf

sudo nginx -t
sudo systemctl reload nginx

echo "Deployment complete for timekeeper"
