#!/bin/bash

set -x

sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common tmux sudo apt gnupg2 pass

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
sudo apt-get install -y httping
sudo apt-get install -y jq

curl -L https://github.com/docker/compose/releases/download/1.28.5/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# the username needs to be changed
while IFS= read -r line; do
  sudo usermod -aG docker $line
  sudo usermod -s /bin/bash $line
done < <( ls -l /users | grep 4096 | cut -d' ' -f3 )

sudo cp /local/repository/docker_config/daemon.json /etc/docker/daemon.json
sudo systemctl daemon-reload
sudo systemctl restart docker

sudo mv /etc/containerd/config.toml /etc/containerd/config.toml.backup
cp /local/repository/containerd/config.toml /etc/containerd/
systemctl restart containerd