#!/bin/bash

# Unofficial Bash strict mode
set -euo pipefail
IFS=$'\n\t'

echo " "
echo "===== Initial updates ====="
echo " "
sudo apt update
sudo apt upgrade -y

echo " "
echo "===== Install cURL latest stable ====="
echo " "
sudo apt install -y curl

echo " "
echo "===== Install git latest stable ====="
echo " "
sudo apt install -y git

echo " "
echo "===== Install Node.js latest ====="
echo " "
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt install -y nodejs

echo " "
echo "===== Install Yarn latest stable ====="
echo " "
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install -y yarn
yarn set version stable

echo " "
echo "===== Install Docker Compose v1.29.2 ====="
echo " "
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo " "
echo "===== Install Docker latest stable ====="
echo " "
sudo apt install ca-certificates curl gnupg lsb-release 
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
sudo usermod -aG docker $USER

echo " "
echo "===== Install Node.js modules ====="
echo " "
yarn install

echo " "
echo "===== REQUISITES SUCCESSFULLY INSTALLED ====="
echo "===== LOG OUT AND IN AGAIN TO RELOAD THE OS GROUPS FOR DOCKER ====="
echo " "



