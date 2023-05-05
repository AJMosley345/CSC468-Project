#!/bin/bash
set -x

namespaceStatus=$(kubectl get namespaces project -o json | jq .status.phase -r)

if [ $namespaceStatus == "Active" ]
then
     echo "Namespace project exists, need to clean up"
     kubectl delete namespaces project
fi

echo "Creating namespace project"
kubectl create namespace project

echo "Creating pods and services"
kubectl create -f db-deployment.yaml -n project
sleep 30
kubectl create -f webui-deployment.yaml -n project

kubectl expose deploy/webui --port=3000 --type=NodePort
export NODE_PORT=$(kubectl get --namespace project -o jsonpath="{.spec.ports[0].nodePort}" services webui)
export NODE_IP=$(kubectl get nodes --namespace project -o jsonpath="{.items[0].status.addresses[0].address}")
echo http://$NODE_IP:$NODE_PORT/login

kubectl get pods -n project
