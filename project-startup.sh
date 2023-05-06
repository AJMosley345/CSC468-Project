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
sleep 30 
kubectl expose deploy/webui --port=3000 --type=NodePort -n project

kubectl get pods -n project
