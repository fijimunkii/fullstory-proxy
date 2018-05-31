#!/usr/bin/env bash

set -e
set -u
set -o pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
mkdir -p $DIR/cert

certbot certonly --standalone -n --agree-tos \
  --email "$CERT_EMAIL" \
  -d "$PROXY_DOMAIN"

certbot renew --dry-run

echo "0 0,12 * * * python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew" > /etc/cron.d/renew_cert
