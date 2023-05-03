#!/bin/bash 
set -x

sudo apt-get update
sudo apt-get install -y nfs-kernel-server
sudo mkdir -p /opt/keys/flagdir
sudo chown nobody:nogroup /opt/keys
sudo chmod -R a+rwx /opt/keys

# setup home and software directory
for list_dir in home software scratch
do
  sudo mkdir -p /opt/${list_dir}
  sudo chown nobody:nogroup /opt/${list_dir}
  sudo chmod -R a+rwx /opt/${list_dir}
done

for i in $(seq 2 $2)
do
  for nfs_dir in home software scratch keys
  do 
    echo "/opt/${nfs_dir} 192.168.1.$i(rw,sync,no_root_squash,no_subtree_check)" | sudo tee -a /etc/exports
  done
done
sudo systemctl restart nfs-kernel-server

# this subnet is to support flannel
kubeadm init --pod-network-cidr=10.244.0.0/16 > /opt/keys/kube.log

sudo cp /etc/kubernetes/manifests/kube-apiserver.yaml /local/repository/kube-apiserver.yaml.backup
sudo sed -i '/^    - --service-cluster-ip-range/a \ \ \ \ - --service-node-port-range=5000-50000' /etc/kubernetes/manifests/kube-apiserver.yaml

sleep 90

sudo touch /opt/keys/kube_done

while IFS= read -r line; do
  mkdir -p /users/$line/.kube
  sudo cp -i /etc/kubernetes/admin.conf /users/$line/.kube/config
  sudo chown $line: /users/$line/.kube/config
done < <( ls -l /users | grep 4096 | cut -d' ' -f3 )

# weave is not contactable
#sudo -H -u $1 kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"

sudo -H -u $1 kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml