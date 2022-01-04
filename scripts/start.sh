#!/bin/bash

# Unofficial Bash strict mode
set -euo pipefail
IFS=$'\n\t'

echo " "
echo "===== Start the MongoDB database ====="
echo " "
docker-compose up -d

echo " "
echo "===== Start the Node.js HTTP server for development ====="
echo " "
yarn start:dev