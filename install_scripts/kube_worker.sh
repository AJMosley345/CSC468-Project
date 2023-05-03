#!/bin/bash

set -x
sudo apt-get install -y nfs-common
sudo mkdir -p /opt/keys

while [ ! -d /opt/keys/flagdir ]; do
  sudo mount 192.168.1.1:/opt/keys /opt/keys
  sleep 10
done

while [ ! -f /opt/keys/kube_done ]; do
  sleep 20
done

for mount_dir in home software scratch
do
  mkdir -p /opt/${mount_dir}
  mount 192.168.1.1:/opt/${mount_dir} /opt/${mount_dir}
done

command=`tail -n 2 /opt/keys/kube.log | tr -d '\\'`
echo $command
sudo $command